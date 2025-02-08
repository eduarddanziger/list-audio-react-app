// src/pages/ContactPage.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';

const ContactPage: React.FC = () => {
    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Contact Us
            </Typography>
            <Typography variant="body1">
                This is the contact page.
            </Typography>
        </Container>
    );
};

export default ContactPage;