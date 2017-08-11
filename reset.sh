#!/bin/bash

cf d -f notes-by-kotlin
cf d -f notes-with-typescript

cf delete-orphaned-routes
