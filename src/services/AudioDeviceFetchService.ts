import {AudioDevice} from '../types/AudioDevice';
import {ApiAudioDevice} from '../types/ApiAudioDevice';
import {startCodespace} from './startCodespace.ts';

export interface FetchProgress {
    progress: number;
    error: string | null;
}

export class AudioDeviceFetchService {
    private readonly retryCount = 32;
    private readonly pauseDuration = 2000;

    constructor(
        private readonly apiUrl: string,
        private readonly onProgress: (progress: FetchProgress) => void,
        private readonly translateError: (key: string) => string
    ) {}

    private calculateProgress(attempt: number): number {
        return (attempt + 1) * 100 / this.retryCount;
    }

    private async delay(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, this.pauseDuration));
    }

    private async fetchDevices(): Promise<ApiAudioDevice[]> {
        const response = await fetch(this.apiUrl);
        return await response.json();
    }

    private async searchDevices(query: string): Promise<ApiAudioDevice[]> {
        const params = new URLSearchParams();
        params.append('query', query);

        const response = await fetch(`${this.apiUrl}/search?${params}`);
        return await response.json();
    }

    private handleDevModeError(err: unknown): void {
        console.error('Device fetch error in dev mode:', err);
        this.onProgress({
            progress: 100,
            error: this.translateError('audioDevicesErrorDevMode')
        });
    }

    private handleProdModeErrorAttemptsExhausted(err: unknown): void {
        console.error('Device fetch error in dev mode, start-codespace-attempts exhausted:', err);
        this.onProgress({
            progress: 100,
            error: this.translateError('audioDevicesErrorProdModeCodespaceStartAttemptsExhausted')
        });
    }

    private async handleProdModeErrorInStaringCodespaceAsync(err: unknown, attempt: number): Promise<void> {
        console.log(`Device fetch error in prod mode (attempt ${attempt + 1}):`, err);
        this.onProgress({
            progress: this.calculateProgress(attempt),
            error: this.translateError('audioDevicesErrorProdMode')
        });
        await startCodespace();
        await this.delay();
    }

    async fetchAudioDevices(): Promise<AudioDevice[]> {
        let attempts = 0;

        while (attempts < this.retryCount) {
            try {
                const apiDevices = await this.fetchDevices();
                const audioDevices = apiDevices.map(AudioDevice.fromApiData);

                this.onProgress({ progress: 100, error: null });
                return audioDevices;
            } catch (err) {
                if(process.env.NODE_ENV === 'development')
                {
                    this.handleDevModeError(err);
                    return [];
                }
                if (++attempts === this.retryCount) {
                    this.handleProdModeErrorAttemptsExhausted(err);
                    return [];
                }
                await this.handleProdModeErrorInStaringCodespaceAsync(err, attempts);
            }
        }

        return [];
    }

    async searchAudioDevices(query: string): Promise<AudioDevice[]> {
        const apiDevices = await this.searchDevices(query);
        const audioDevices = apiDevices.map(AudioDevice.fromApiData);
        this.onProgress({ progress: 100, error: null });
        return audioDevices;
    }

}