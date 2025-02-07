import React from 'react';
import AudioDeviceList from '../components/AudioDeviceListComp';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Audio Device Manager</h1>
            <AudioDeviceList />
        </div>
    );
};

export default HomePage;