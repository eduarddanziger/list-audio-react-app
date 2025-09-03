import CryptoJS from "crypto-js";

export function getAudioDevicesApiUrl(): string {
    return getBaseApiUrl() + '/AudioDevices';
}

export function getInfoApiUrl(): string {
    return getBaseApiUrl() + '/Info';
}


export function getBaseApiUrl(): string {
    const azureOrCodespace = import.meta.env.VITE_API_HOSTED_ON === 'AZURE';
    console.log('API hosting environment is', azureOrCodespace ? 'Azure' : 'GitHub Codespace');

    const encryptedDeviceApiUrlFromEnv = azureOrCodespace ? import.meta.env.VITE_API_AZURE_URL : import.meta.env.VITE_API_GITHUB_URL;

    let apiUrl = '';
    if (encryptedDeviceApiUrlFromEnv && encryptedDeviceApiUrlFromEnv !== ``) {
        console.log('Api URL read out of environment as a secret, possibly encrypted:', encryptedDeviceApiUrlFromEnv);
        const bytes = CryptoJS.AES.decrypt(encryptedDeviceApiUrlFromEnv, `32-characters-long-secure-key-12`);

        try {
            apiUrl = bytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.log('Failed to decode Api URL:', error);
            apiUrl = '';
        }
        if (apiUrl === '') {
            apiUrl = encryptedDeviceApiUrlFromEnv;
            console.log('Api URL is unlikely encrypted, use it as-is');
        } else {
            console.log('Api URL is decrypted: ', apiUrl);
        }
    }
    else
    {
        console.log('No encrypted secret found in environment');
    }

    if (apiUrl === '') {
        apiUrl = `http://localhost:5027/api`;
        console.log('Api URL set to local: ', apiUrl);
    }

    return apiUrl;
}