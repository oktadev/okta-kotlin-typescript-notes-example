## Kotlin and TypeScript Notes Example

Uses Spring Boot on the backend with the Okta Spring Security Starter. Uses the Okta Sign-In Widget on the front end. 

[Build a Secure Notes Application with Kotlin, TypeScript, and Okta](https://developer.okta.com/blog/2017/09/19/build-a-secure-notes-application-with-kotlin-typescript-and-okta) shows how this application was built.

To run this app, run the commands below in separate terminal windows:

**Spring Boot**
```
cd server
mvnw
```

**Angular**
```
cd client
yarn && yarn start
```

**NOTE:** There’s one issue with Okta’s Sign-In Widget I still haven’t fully figured out. Not every time, but everyone once it in a while, it requires me to move my mouse or click on the screen to make the notes list load after logging in. I opened [an issue](https://github.com/okta/okta-signin-widget/issues/268) for this, and tried the suggested solution, but it doesn’t work 100% of the time.
