// src/utils/encryption.ts
import * as sodium from 'libsodium-wrappers';

export async function initializeSodium(): Promise<void> {
    await sodium.ready;
}

export async function decryptWithXChaCha20Poly1305(encryptedData: string, password: string): Promise<string> {
    try {
        // Ensure sodium is ready
        await sodium.ready;

        // Decode base64 string
        const data = sodium.from_base64(encryptedData);

        // Get key from password using sodium's key derivation
        const key = deriveKeyFromPassword(password);

        // Split into nonce and ciphertext
        const nonce = data.slice(0, sodium.crypto_secretbox_NONCEBYTES);
        const ciphertext = data.slice(sodium.crypto_secretbox_NONCEBYTES);

        // Decrypt using XChaCha20-Poly1305
        const decrypted = sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);

        // Convert to string
        return sodium.to_string(decrypted);
    } catch (e) {
        console.error('Decryption failed:', e);
        throw new Error('Failed to decrypt data');
    }
}

export function deriveKeyFromPassword(password: string): Uint8Array {
    // Convert password to bytes
    const passwordBytes = sodium.from_string(password);

    // Use a deterministic salt based on the password
    const salt = sodium.crypto_generichash(sodium.crypto_pwhash_SALTBYTES, passwordBytes);

    // Derive key using Argon2
    return sodium.crypto_pwhash(
        sodium.crypto_secretbox_KEYBYTES,
        passwordBytes,
        salt,
        sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
        sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
        sodium.crypto_pwhash_ALG_DEFAULT
    );
}