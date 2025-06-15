// src/pages/HomePage.tsx
import React from 'react';
import { Container } from '@mui/material';
import AudioDeviceListComponent from '../components/AudioDeviceListComponent';

const HomePage: React.FC = () => {
    return (
        <Container>
            <AudioDeviceListComponent />
        </Container>
    );
};

export default HomePage;
