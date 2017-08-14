#!/bin/bash

cf d -f notes-server
cf d -f notes-client

cf delete-orphaned-routes
