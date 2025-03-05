import React from 'react';
import { Box, Button, CircularProgress, Typography, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface LoadingComponentProps {
    progress: number;
    error: string | null;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ progress, error }) => {
    const { t } = useTranslation();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, mt: 1}}>
            <Button
                variant="contained"
                color="primary"
                disabled
                sx={{ position: 'relative', width: '200px' }}
            >
                <CircularProgress
                    size={24}
                    sx={{
                        color: 'white',
                        position: 'absolute',
                        left: '50%',
                        marginLeft: '-12px',
                    }}
                />
                <Typography variant="button" sx={{ opacity: 0 }}>
                    {t('loading')}
                </Typography>
            </Button>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ width: '200px', mt: -0.5 }}
            />
            {error && <Typography variant="body2" color="info" sx={{ mt: 1 }}>{error}</Typography>}
        </Box>
    );
};

export default LoadingComponent;