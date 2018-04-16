## Kotlin and TypeScript Notes Example

This example app shows how to build a basic notes app with Kotlin, Spring Boot, Spring Data, TypeScript, and Angular.

Please read [Build a Secure Notes Application with Kotlin, TypeScript, and Okta](https://developer.okta.com/blog/2017/09/19/build-a-secure-notes-application-with-kotlin-typescript-and-okta) to see how this app was created.

**Prerequisites:** [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) and [Node.js](https://nodejs.org/).

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To install this example application, run the following commands:

```bash
git clone https://github.com/oktadeveloper/okta-kotlin-typescript-notes-example.git
cd okta-kotlin-typescript-notes-example
```

This will get a copy of the project installed locally. To install all of its dependencies and start each app, follow the instructions below.

To run the server, cd into the `server` folder and run:
 
```bash
./mvnw
```

To run the client, cd into the `client` folder and run:
 
```bash
yarn && yarn start
```

### Create an OIDC App in Okta

You will need to [create an OIDC App in Okta](https://developer.okta.com/blog/2017/09/19/build-a-secure-notes-application-with-kotlin-typescript-and-okta#add-an-openid-connect-application) to get a `clientId`. 

Log in to your Okta Developer account (or [sign up](https://developer.okta.com/signup/) if you don’t have an account) and navigate to **Applications** and click on **Add Application**. Select Single Page App (SPA) and click **Next**. Give the application a name (e.g. “My OIDC App”) and specify `http://localhost:4200` as a Login redirect URI. Click **Done** and admire your handiwork!

<img src="https://developer.okta.com/assets/blog/kotlin-secure-notes/my-oidc-app-c43537ed7e9849672107f00ceff8577ed3e6a11390a3184286a827e96f30a524.png" alt="My OIDC App" width="700"/>

#### Server Configuration

Set the `issuer` and copy the `clientId` into `server/src/main/resources/application.properties`. 

**NOTE:** The value of `{yourOktaDomain}` should be something like `dev-123456.oktapreview`. Make sure you don't include `-admin` in the value!

```properties
okta.oauth.issuer=https://{yourOktaDomain}.com/oauth2/default
okta.oauth.clientId={clientId}
```

#### Client Configuration

For the client, set the `issuer` and copy the `clientId` into `client/src/app/shared/okta.service.ts`.

```typescript
signIn = new OktaSignIn({
  baseUrl: 'https://{yourOktaDomain}.com',
  clientId: '{clientId}',
  redirectUri: 'http://localhost:4200',
  authParams: {
    issuer: 'default',
    responseType: ['id_token', 'token'],
    scopes: ['openid', 'email', 'profile']
  }
});
```

**NOTE:** There’s one issue with Okta’s Sign-In Widget I still haven’t fully figured out. Not every time, but everyone once it in a while, it requires me to move my mouse or click on the screen to make the notes list load after logging in. I opened [an issue](https://github.com/okta/okta-signin-widget/issues/268) for this, and tried the suggested solution, but it doesn’t work 100% of the time.

## Links

This example uses the following libraries provided by Okta:

* [Okta Spring Boot Starter](https://github.com/okta/okta-spring-boot)
* [Okta Sign-In Widget](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-angular)

## Help

Please post any questions as comments on the [blog post](https://developer.okta.com/blog/2017/12/04/basic-crud-angular-and-spring-boot), or visit our [Okta Developer Forums](https://devforum.okta.com/). You can also email developers@okta.com if would like to create a support ticket.

## License

Apache 2.0, see [LICENSE](LICENSE).
