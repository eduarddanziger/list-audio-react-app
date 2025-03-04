// src/pages/HomePage.tsx
import React from 'react';
import { Container } from '@mui/material';
import AudioDeviceList from '../components/AudioDeviceListComponent.tsx';

const HomePage: React.FC = () => {
    return (
        <Container>
            <AudioDeviceList />
        </Container>
    );
};

export default HomePage;
