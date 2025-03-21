import axios from 'axios';
import CryptoJS from 'crypto-js';

const GITHUB_API_URL = 'https://api.github.com';
const CODESPACE_DISPLAY_NAME = 'CodeSpaceMain';

interface Codespace {
    display_name: string;
    name: string;
}

export const startCodespace = async (): Promise<void> => {
    try {
        const encryptedSecret = import.meta.env.VITE_UNIVERSAL_PAT;
        const bytes = CryptoJS.AES.decrypt(encryptedSecret, '32-characters-long-secure-key-12');
        const universalPat = bytes.toString(CryptoJS.enc.Utf8);

        const headers = {
            'Authorization': `token ${universalPat}`,
            'Accept': 'application/vnd.github+json'
        };
        const infoResponse
            = await axios.get(`${GITHUB_API_URL}/user/codespaces`, { headers });

        const codespaces: Codespace[] = infoResponse.data.codespaces;
        if (!codespaces || codespaces.length === 0) {
            console.error('No Codespaces found.');
            return;
        }

        const codespace = codespaces.find((cs) => cs.display_name === CODESPACE_DISPLAY_NAME);
        if (!codespace) {
            console.error(`Codespace '${CODESPACE_DISPLAY_NAME}' not found.`);
            return;
        }

        const startUrl = `${GITHUB_API_URL}/user/codespaces/${codespace.name}/start`;
        const startResponse
            = await axios.post(startUrl, {}, { headers });
        console.log('Codespace started successfully:', startResponse.data);
    } catch (error) {
        console.error('Starting Codespace workflow error:', error);
    }
};