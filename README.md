# Audio Device Repository Client, React / TypeScript

Visualizes an audio devices repository using React. The respective backend is ASP.NET Core Server.

## Latest Release

### The backend starts automatically on-demand
- The backend ASP.NET Core Server primary instance is hosted on Azure. The second instance is hosted on GitHub Codespaces.

### Start the client application
- This repository now uses Next.js (App Router) for the frontend.
- Locally, the app runs on http://localhost:3000 when using the Next.js dev server.

## Development Environment

### Start the backend locally

- Check out the backend repo [audio-device-repo-server](https://github.com/eduarddanziger/audio-device-repo-server/) and install .NET tools
- Start the ASP.NET Core Web API Server:

```powershell
cd DeviceRepoAspNetCore
dotnet run --launch-profile http
```

### Start the frontend locally (Next.js)

Configure environment variables so the frontend points to your local backend:

- PowerShell

```powershell
$env:NEXT_PUBLIC_API_HOSTED_ON = "CODESPACE"
$env:NEXT_PUBLIC_API_GITHUB_URL = "http://localhost:5027/api"
```

- cmd.exe

```bat
set NEXT_PUBLIC_API_HOSTED_ON=CODESPACE
set NEXT_PUBLIC_API_GITHUB_URL=http://localhost:5027/api
```

Then run the dev server:

```bash
npm run dev
```

Open a browser at http://localhost:3000.

Notes:
- The app also supports Azure as a target by setting `NEXT_PUBLIC_API_HOSTED_ON=AZURE` and providing `NEXT_PUBLIC_API_AZURE_URL`.
- The values can be plain URLs or encrypted strings (the app will attempt to decrypt and fall back to plaintext if decryption fails).

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
