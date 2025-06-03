import { styled, alpha } from '@mui/material/styles';
import { Box, Paper, TextField, Button, Typography, Container } from '@mui/material';

export const LoginContainer = styled(Container)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.dark, 0.2)} 100%)`,
    padding: theme.spacing(3),
}));

export const LoginCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    width: '100%',
    maxWidth: '400px',
    borderRadius: theme.spacing(2),
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
    background: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
    },
}));

export const LoginHeader = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(4),
}));

export const LoginTitle = styled(Typography)(({ theme }) => ({
    fontSize: '2rem',
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
}));

export const LoginSubtitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '1rem',
}));

export const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.spacing(1),
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
        },
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '1.5px',
    },
}));

export const LoginButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(1),
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    '&:hover': {
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
    },
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
    fontSize: '0.875rem',
    marginTop: theme.spacing(1),
    textAlign: 'center',
}));

export const ForgotPassword = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: '0.875rem',
    textAlign: 'right',
    cursor: 'pointer',
    marginTop: theme.spacing(1),
    '&:hover': {
        textDecoration: 'underline',
    },
})); 