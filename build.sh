#!/bin/bash

start=`pwd`

# set origin for client on server
sed -i -e "s|http://localhost:4200|https://notes-with-typescript.cfapps.io|g" $start/server/src/main/kotlin/com/okta/developer/notes/NotesApplication.kt

mvn clean package -f $start/server/pom.xml

cd $start/client
rm -rf dist
# set API URL
sed -i -e "s|http://localhost:8080|https://notes-by-kotlin.cfapps.io|g" $start/client/src/app/shared/note/note.service.ts
# set redirectURI to client URI
sed -i -e "s|http://localhost:4200|https://notes-with-typescript.cfapps.io|g" $start/client/src/app/shared/okta/okta.service.ts
yarn && ng build -prod --aot
touch dist/Staticfile
# enable pushstate so no 404s on refresh
echo 'pushstate: enabled' > dist/Staticfile

cd $start
cf push

# reset and remove changed files
git checkout $start
rm -rf $start/server/src/main/kotlin/com/okta/developer/notes/NotesApplication.kt-e
rm -rf $start/client/src/app/shared/note/note.service.ts-e
rm -rf $start/client/src/app/shared/okta/okta.service.ts-e
