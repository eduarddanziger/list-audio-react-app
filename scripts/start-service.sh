#!/bin/bash

gh codespace ports visibility 5027:public -c "$CODESPACE_NAME"

dotnet run --project ./DeviceRepoAspNetCore/DeviceRepoAspNetCore.csproj --launch-profile http
