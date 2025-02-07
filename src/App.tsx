import React from 'react';
import AudioDeviceList from './components/AudioDeviceListComp.tsx';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Audio Device Manager</h1>
            <AudioDeviceList />
        </div>
    );
};

export default App;
