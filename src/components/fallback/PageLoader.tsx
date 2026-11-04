import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface PageLoaderProps {
    message?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ message }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh', // ارتفاع مناسب ليتوسط الصفحة
                width: '100%',
                gap: 2,
            }}
        >
            <CircularProgress color="primary" size={48} thickness={4} />

            {message && (
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontWeight: 500, animation: 'pulse 1.5s infinite' }}
                >
                    {message}
                </Typography>
            )}
        </Box>
    );
};