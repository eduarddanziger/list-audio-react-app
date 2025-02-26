#!/bin/bash

cd /workspaces/list-audio-react-app
git pull

nohup dotnet run --project ./DeviceRepoAspNetCore/DeviceRepoAspNetCore.csproj --launch-profile http &

# Wait for the service to start
until $(curl --output /dev/null --silent --head --fail http://localhost:5027); do
  sleep 1
done

# Set port visibility to public
gh codespace ports visibility 5027:public -c $CODESPACE_NAME