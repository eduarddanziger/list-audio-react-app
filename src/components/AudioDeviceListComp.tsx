import React, { useState, useEffect } from 'react';
import { AudioDevice } from '../types/AudioDevice.ts';
import { handleError } from '../utils/errorHandler';

const AudioDeviceListComp: React.FC = () => {
    const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    /*
        const [audioDevices] = useState<AudioDevice[]>([
            { pnpId: 'USB\\VID_1234&PID_5678', name: 'Speakers (High Definition Audio)', volume: 75 },
            { pnpId: 'USB\\VID_8765&PID_4321', name: 'Microphone (USB Audio)', volume: 50 },
        ]);
    */

    useEffect(() => {
        const isDevMode = process.env.NODE_ENV === 'development';
        const apiUrl = isDevMode
            ? 'http://localhost:5027/api/AudioDevices'
            : 'https://studious-bassoon-7vp9wvpw7rxjf4wg-5027.app.github.dev/api/AudioDevices';

        setLoading(true);
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setAudioDevices(data);
                setLoading(false);
            })
            .catch(error => {
                handleError('Audio devices are not yet available. Try refreshing in 15 sec.', error, setError);
                setLoading(false);
            });
    }, []);

    const [selectedDevice, setSelectedDevice] = useState<AudioDevice | null>(null);

    return (
        <div>
            <h2>Audio Devices</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error && <p style={{ color: 'darkorange' }}>{error}</p>}
                    <ul>
                        {audioDevices.map((device) => (
                            <li key={device.pnpId}>
                                <button onClick={() => setSelectedDevice(device)}>
                                    {device.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
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