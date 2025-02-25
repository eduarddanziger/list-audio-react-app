import React, { useState, useEffect } from 'react';
import { AudioDevice } from '../types/AudioDevice.ts';

const AudioDeviceListComp: React.FC = () => {
    const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);
    const [error, setError] = useState<string | null>(null);

    /*
        const [audioDevices] = useState<AudioDevice[]>([
            { pnpId: 'USB\\VID_1234&PID_5678', name: 'Speakers (High Definition Audio)', volume: 75 },
            { pnpId: 'USB\\VID_8765&PID_4321', name: 'Microphone (USB Audio)', volume: 50 },
        ]);
    */

    useEffect(() => {
        const UNIVERSAL_PAT = import.meta.env.UNIVERSAL_PAT;

        fetch('https://studious-bassoon-7vp9wvpw7rxjf4wg-5027.app.github.dev/api/AudioDevices', {
            headers: {
                'Authorization': `Bearer ${UNIVERSAL_PAT}`
            }
        })
            .then(response => response.json())
            .then(data => setAudioDevices(data))
            .catch(error => {
                console.error('Error fetching audio devices:', error);
                setError(`Error fetching audio devices: ${error.message}`);
            });
    }, []);

    const [selectedDevice, setSelectedDevice] = useState<AudioDevice | null>(null);

    return (
        <div>
            <h2>Audio Devices</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {audioDevices.map((device) => (
                    <li key={device.pnpId}>
                        <button onClick={() => setSelectedDevice(device)}>
                            {device.name}
                        </button>
                    </li>
                ))}
            </ul>

            {selectedDevice && (
                <div>
                    <h3>Selected Device: {selectedDevice.name}</h3>
                    <p><strong>PnP ID:</strong> {selectedDevice.pnpId}</p>
                    <p><strong>Volume:</strong> {selectedDevice.volume}%</p>
                </div>
            )}
        </div>
    );
};

export default AudioDeviceListComp;