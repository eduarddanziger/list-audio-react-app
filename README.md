# Audio Device Repository Client, React / TypeScript

Visualizes an audio devices repository using Next.js / React, deployed on Vercel,
[https://list-audio-react-app.vercel.app](https://list-audio-react-app.vercel.app). The backend is a ASP.Net Core Server with RESTful API.

## Web Hosting

### Backend
- The backend ASP.NET Core Server is hosted on GitHub Codespaces.
It starts automatically on-demand.

### Frontend
- The Next.js / React frontend is deployed on Vercel at https://list-audio-react-app.vercel.app, connecting to the ASP.NET Core backend.

*Notes*:
- *The backend server's second instance is hosted on Azure and has to be manually started*

## Development Environment

### 1. Start the backend locally

- Check out the backend repo [audio-device-repo-server](https://github.com/eduarddanziger/audio-device-repo-server/) and install .NET tools
- Start the ASP.NET Core Web API Server:

```powershell
cd DeviceRepoAspNetCore
dotnet run --launch-profile http
```

### 2. Start the frontend locally (Next.js)

Configure environment variables so the frontend points to your local backend.
You can edit `.env.development` file or set the environment variables directly: 

- PowerShell

```powershell
$env:NEXT_PUBLIC_API_GITHUB_URL = "http://localhost:5027/api"
```

- cmd.exe

```bat
set NEXT_PUBLIC_API_GITHUB_URL=http://localhost:5027/api
```

Then run the dev server:

```bash
npm run dev
```

Open a browser at http://localhost:3000.

*Notes*:
- *The app also supports Azure as a target by setting `NEXT_PUBLIC_API_HOSTED_ON=AZURE` and providing `NEXT_PUBLIC_API_AZURE_URL`, see `.env.development` file*.
- *The values can be plain URLs or encrypted strings (the app will attempt to decrypt and fall back to plaintext if decryption fails)*.

## Deployment

- Build for production:

```bash
npm run build
```

- Start the production server:

```bash
npm start
```

## Changelog (tooling)
- Migrated from a Vite-based SPA to Next.js (App Router).
- Removed Vite-specific files and updated imports and configuration accordingly.
