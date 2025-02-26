import axios from 'axios';
import CryptoJS from 'crypto-js';

const GITHUB_API_URL = 'https://api.github.com';
const CODESPACE_DISPLAY_NAME = 'CodeSpaceMain';

export const startCodespace = async (): Promise<void> =>
{
    const encryptedSecret = import.meta.env.VITE_UNIVERSAL_PAT;
    const bytes = CryptoJS.AES.decrypt(encryptedSecret, '32-characters-long-secure-key-12');
    const universalPat = bytes.toString(CryptoJS.enc.Utf8);

    const headers = {
        'Authorization': `token ${universalPat}`,
        'Accept': 'application/vnd.github+json'
    };


    try {
        const response = await axios.get(`${GITHUB_API_URL}/user/codespaces`, { headers });

        const codespaces = response.data.codespaces;
        if (!codespaces || codespaces.length === 0) {
            throw new Error('No Codespaces found.');
        }

        const codespace = codespaces.find((cs: any) => cs.display_name === CODESPACE_DISPLAY_NAME);
        if (!codespace) {
            throw new Error(`Codespace '${CODESPACE_DISPLAY_NAME}' not found.`);
        }

        const startUrl = `${GITHUB_API_URL}/user/codespaces/${codespace.name}/start`;
        await axios.post(startUrl, {}, { headers });

        console.log('Codespace started successfully.');
    } catch (error) {
        console.error('Error starting Codespace:', error);
        throw error;
    }
};