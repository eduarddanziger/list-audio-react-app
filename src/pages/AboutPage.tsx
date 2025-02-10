// src/pages/AboutPage.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';

const AboutPage: React.FC = () => {
    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                About Us
            </Typography>
            <Typography variant="body1">
                This is the about page.
            </Typography>
        </Container>
    );
};

export default AboutPage;