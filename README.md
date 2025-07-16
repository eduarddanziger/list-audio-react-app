# Audio Device Repository Client, React / TypeScript 

Visualizes an audio devices repository using React.
The respective backend is ASP.Net Core Server.

## Latest Release

### The backend starts automatically on-demand:
- The backend ASP.Net Core Server primary instance is hosted on Azure. The second instance is hosted on GitHub Codespace.
 
### Start the client application: [Audio Device Repository Client](https://eduarddanziger.github.io/list-audio-react-app/)
- The application frontend resides on GitHub Pages
- Which backend is used depends on the `VITE_API_HOSTED_ON` environment variable (AZURE or CODESPACE).


## Development Environment

### Start the backend locally:

- Check out a git repository [audio-device-repo-server](https://github.com/eduarddanziger/audio-device-repo-server/) and install dotnet tools

- Start the ASP.NET Core Web API Server via Terminal using the following command:

```powershell or bash
cd DeviceRepoAspNetCore
dotnet run --launch-profile http
```

### Start the client application:
- In the development environment, set the `VITE_API_HOSTED_ON`' and `VITE_API_GITHUB_URL` environment variables
to `COFDESPACE` and `http://localhost:5027/api`, respectively. *This will allow
the client application to communicate with the ASP.NET Core Web API Server running locally*
- Start the static development web server via Terminal:

```powershell or bash
# bash:
VITE_API_HOSTED_ON=CODESPACE
VITE_API_GITHUB_URL=http://localhost:5027/api
# powershell:
$env:VITE_API_HOSTED_ON="CODESPACE"
$env:VITE_API_GITHUB_URL="http://localhost:5027/api"

npm run dev
```

- Open a browser and navigate to [https://localhost:5173/](https://localhost:5173/)


