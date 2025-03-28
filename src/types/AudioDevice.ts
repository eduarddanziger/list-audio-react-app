export class AudioDevice {
    constructor(
        public pnpId: string,
        public name: string,
        public volume: number,
        public lastSeen: string,
        public hostName: string,
    ) {}

    // Dynamic getter for 'key' (calculated on access)
    get key(): string {
        return `${this.pnpId}_${this.hostName}`; // Example: Combine with a delimiter
    }
}
