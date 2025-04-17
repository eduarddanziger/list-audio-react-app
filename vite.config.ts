import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/list-audio-react-app', // Replace with your repository name
    build: {
        sourcemap: true,
    },
    server: {
        port: 5173,
    },
})
