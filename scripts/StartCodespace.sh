#!/bin/bash

# Variables
CODESPACE_NAME="your-codespace-name"
PAT="your_personal_access_token"

# Check Codespace status
STATUS=$(curl -s -H "Authorization: token $PAT" \
              -H "Accept: application/vnd.github+json" \
              https://api.github.com/user/codespaces | \
              jq -r --arg NAME "$CODESPACE_NAME" \
              '.codespaces[] | select(.name == $NAME) | .state')

# Start Codespace if stopped
if [ "$STATUS" == "Stopped" ]; then
  echo "Codespace is stopped. Starting..."
  curl -X POST -H "Authorization: token $PAT" \
       -H "Accept: application/vnd.github+json" \
       https://api.github.com/user/codespaces/$CODESPACE_NAME/start
  echo "Codespace started."
else
  echo "Codespace is already running."
fi
