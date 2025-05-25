import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/list-audio-react-app',
    build: {
        sourcemap: true,
    },
    server: {
        host: true,
        port: 5173,
    },
})
