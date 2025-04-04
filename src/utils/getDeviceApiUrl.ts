import CryptoJS from "crypto-js";

export function getDeviceApiUrl(
    isDevMode: boolean
): string {
    let deviceApiUrl: string;
    if (isDevMode) {
        const encryptedDeviceApiUrlFromEnv = import.meta.env.VITE_API_URL_DEV_MODE;
        if (encryptedDeviceApiUrlFromEnv && encryptedDeviceApiUrlFromEnv !== ``) {
            console.log('Dev Mode: Api URL read out of environment as a secret, possibly encrypted,: ', encryptedDeviceApiUrlFromEnv);
            const bytes = CryptoJS.AES.decrypt(encryptedDeviceApiUrlFromEnv, `32-characters-long-secure-key-12`);
            deviceApiUrl = bytes.toString(CryptoJS.enc.Utf8);
            if (deviceApiUrl === '') {
                deviceApiUrl = encryptedDeviceApiUrlFromEnv;
                console.log('Dev Mode: Api URL is unlikely encrypted, use it as-is');
            } else {
                console.log('Dev Mode: Api URL is deviceApiUrl: ', deviceApiUrl);
            }
        } else {
            deviceApiUrl = `http://localhost:5027/api/AudioDevices`;
            console.log('Dev Mode: No encrypted secret found in environment, set it to the local one: ', deviceApiUrl);
        }
    } else {
        deviceApiUrl = 'https://probable-space-computing-machine-x5vwx5vxr959cvq6j-5027.app.github.dev/api/AudioDevices';
// https://crispy-system-wrxg596p5wrrh9wg9-5027.app.github.dev/api/AudioDevices
        console.log('Prod Mode: Use hardcoded Api URL: ', deviceApiUrl);
    }
    return deviceApiUrl;
}