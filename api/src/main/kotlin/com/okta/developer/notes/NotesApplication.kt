package com.okta.developer.notes

import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.rest.core.annotation.HandleBeforeCreate
import org.springframework.data.rest.core.annotation.RepositoryEventHandler
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id


@SpringBootApplication
class NotesApplication

fun main(args: Array<String>) {
    SpringApplication.run(NotesApplication::class.java, *args)
}

@Entity
data class Note(@Id @GeneratedValue var id: Long? = null,
                var text: String? = null,
                @JsonIgnore var user: String? = null)

@RepositoryRestResource
interface NotesRepository : JpaRepository<Note, Long> {
    fun findAllByUser(name: String): List<Note>
}

@Component
class DataInitializer(val repository: NotesRepository) : ApplicationRunner {

    @Throws(Exception::class)
    override fun run(args: ApplicationArguments) {
        listOf("Note 1", "Note 2", "Note 3").forEach {
            repository.save(Note(text = it, user = "user"))
        }
        repository.findAll().forEach { println(it) }
    }
}

@Component
@RepositoryEventHandler(Note::class)
class AddUserToNote {

    @HandleBeforeCreate
    fun handleCreate(note: Note) {
        val username: String = SecurityContextHolder.getContext().getAuthentication().name
        println("Creating note: $note with user: $username")
        note.user = username
    }
}

@RestController
class HomeController(val repository: NotesRepository) {

    @GetMapping("/")
    fun home(principal: Principal): List<Note> {
        println("Fetching notes for user: ${principal.name}")
        return repository.findAllByUser(principal.name)
    }
}