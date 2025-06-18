# Audio Device Repository Client, React / TypeScript 

Visualizes an audio devices repository utilizing React. The backend ASP.Net Core Server resides in a repository [audio-device-repo-server](https://github.com/eduarddanziger/audio-device-repo-server/).

### Latest rollout on GitHub Infrastructure
- [https://eduarddanziger.github.io/list-audio-react-app/](https://eduarddanziger.github.io/list-audio-react-app/)

## Development environment

### Starting ASP.NET Core Web API Server

- Check out a git repository [audio-device-repo-server](https://github.com/eduarddanziger/audio-device-repo-server/) and install dotnet tools

- Start via Terminal using the following command:

```powershell or bash
cd DeviceListServer
dotnet run --launch-profile http
```

### Starting a client application
- In development environment, start the static development web server via Terminal::

```powershell or bash
npm run dev
```

- Open a browser and navigate to [https://localhost:5173/](https://localhost:5173/)
''

