import CryptoJS from "crypto-js";

export function getDeviceApiUrl(
    isDevMode: boolean
): string {
    return getApiUrl(isDevMode) + '/AudioDevices';
}

export function getInfoApiUrl(
    isDevMode: boolean
): string {
    return getApiUrl(isDevMode) + '/Info';
}


export function getApiUrl(
    isDevMode: boolean
): string {
    let apiUrl: string;
    if (isDevMode) {
        const encryptedDeviceApiUrlFromEnv = import.meta.env.VITE_API_URL_DEV_MODE;
        if (encryptedDeviceApiUrlFromEnv && encryptedDeviceApiUrlFromEnv !== ``) {
            console.log('Dev Mode: Api URL read out of environment as a secret, possibly encrypted,: ', encryptedDeviceApiUrlFromEnv);
            const bytes = CryptoJS.AES.decrypt(encryptedDeviceApiUrlFromEnv, `32-characters-long-secure-key-12`);
            apiUrl = bytes.toString(CryptoJS.enc.Utf8);
            if (apiUrl === '') {
                apiUrl = encryptedDeviceApiUrlFromEnv;
                console.log('Dev Mode: Api URL is unlikely encrypted, use it as-is');
            } else {
                console.log('Dev Mode: Api URL is deviceApiUrl: ', apiUrl);
            }
        } else {
            apiUrl = `http://localhost:5027/api`;
            console.log('Dev Mode: No encrypted secret found in environment, set it to the local one: ', apiUrl);
        }
    } else {
        apiUrl = 'https://probable-space-computing-machine-x5vwx5vxr959cvq6j-5027.app.github.dev/api';
// https://crispy-system-wrxg596p5wrrh9wg9-5027.app.github.dev/api/AudioDevices
        console.log('Prod Mode: Use hardcoded Api URL: ', apiUrl);
    }
    return apiUrl;
}