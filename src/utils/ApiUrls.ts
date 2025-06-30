import CryptoJS from "crypto-js";

export function getAudioDevicesApiUrl(): string {
    return getBaseApiUrl() + '/AudioDevices';
}

export function getInfoApiUrl(): string {
    return getBaseApiUrl() + '/Info';
}


// Cache for dev mode API URL
let cachedDevModeApiUrl: string | null = null;

export function getBaseApiUrl(): string {

    const isDevMode = import.meta.env.MODE === 'development';
    let apiUrl = '';
    if (isDevMode) {
        if (cachedDevModeApiUrl !== null) {
            return cachedDevModeApiUrl;
        }
        const encryptedDeviceApiUrlFromEnv = import.meta.env.VITE_API_URL_DEV_MODE;
        if (encryptedDeviceApiUrlFromEnv && encryptedDeviceApiUrlFromEnv !== ``) {
            console.log('Dev Mode: Api URL read out of environment as a secret, possibly encrypted,: ', encryptedDeviceApiUrlFromEnv);
            const bytes = CryptoJS.AES.decrypt(encryptedDeviceApiUrlFromEnv, `32-characters-long-secure-key-12`);
            try {
                apiUrl = bytes.toString(CryptoJS.enc.Utf8);
            } catch (error) {
                console.log('Failed to decode apiUrl:', error);
                apiUrl = '';
            }
            if (apiUrl === '') {
                apiUrl = encryptedDeviceApiUrlFromEnv;
                console.log('Dev Mode: Api URL is unlikely encrypted, use it as-is');
            } else {
                console.log('Dev Mode: Api URL is decrypted: ', apiUrl);
            }
        } else {
            apiUrl = `http://localhost:5027/api`;
            console.log('Dev Mode: No encrypted secret found in environment, set it to the local one: ', apiUrl);
        }
        cachedDevModeApiUrl = apiUrl;
    } else {
        apiUrl = 'https://probable-space-computing-machine-x5vwx5vxr959cvq6j-5027.app.github.dev/api';
        console.log('Prod Mode: GitHub infrastructure Api URL: ', apiUrl);
    }

    return apiUrl;
}