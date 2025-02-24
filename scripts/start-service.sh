#!/bin/bash

cd /workspaces/list-audio-react-app
git pull
dotnet run --project ./DeviceRepoAspNetCore/DeviceRepoAspNetCore.csproj --launch-profile http
