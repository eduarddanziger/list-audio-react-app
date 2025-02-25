#!/bin/bash

cd /workspaces/list-audio-react-app
git pull
dotnet run --project ./DeviceRepoAspNetCore/DeviceRepoAspNetCore.csproj --launch-profile http

# Wait for the service to start
sleep 5

# Set port visibility to public
gh codespace ports visibility 5027:public -c $CODESPACE_NAME