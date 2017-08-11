## Kotlin and TypeScript Notes Example

Uses Spring Boot on the backend with the Okta Spring Security Starter. Uses the Okta Sign-In Widget on the front end. 

It *mostly* works, except for logout where a `window.location.reload()` seems to be the only solution.

To run this app, run the commands below in separate terminal windows:

Spring Boot:
```
cd server
mvnw
```

Angular
```
cd client
yarn && yarn start
```
