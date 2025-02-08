// src/pages/HomePage.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import AudioDeviceList from '../components/AudioDeviceListComp';

const HomePage: React.FC = () => {
    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Audio Device Manager
            </Typography>
            <AudioDeviceList />
        </Container>
    );
};

export default HomePage;
