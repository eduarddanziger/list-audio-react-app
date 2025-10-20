'use client';

import React from 'react';
import { Container } from '@mui/material';
import AudioDeviceListComponent from '../components/AudioDeviceListComponent';

export default function HomePage() {
    return (
        <Container>
            <AudioDeviceListComponent />
        </Container>
    );
}

