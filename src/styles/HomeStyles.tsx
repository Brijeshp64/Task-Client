import { styled, alpha, keyframes } from '@mui/material/styles';
import { Box, Button, Container, Typography, TableContainer, TableHead, TableRow, ToggleButtonGroup, CircularProgress } from '@mui/material';

export const StyledContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
}));

export const HeaderSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
    fontSize: '2rem',
    fontWeight: 600,
    color: theme.palette.primary.main,
    letterSpacing: '-0.5px',
}));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(3),
    overflow: 'hidden',
    '& .MuiTable-root': {
        minWidth: 650,
    },
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
    '& .MuiTableCell-root': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight: 600,
        fontSize: '0.95rem',
        padding: theme.spacing(2),
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: alpha(theme.palette.primary.light, 0.05),
    },
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.light, 0.1),
        transition: 'background-color 0.2s ease',
    },
    '& .MuiTableCell-root': {
        padding: theme.spacing(2),
        fontSize: '0.95rem',
    },
}));

export const ActionIconWrapper = styled(Box)(({ theme }) => ({
    display: 'inline-flex',
    padding: theme.spacing(1),
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: alpha(theme.palette.action.hover, 0.8),
        transform: 'scale(1.1)',
    },
}));

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    '& .MuiToggleButton-root': {
        padding: theme.spacing(1, 3),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        },
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
    },
}));

export const AddButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1, 3),
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontWeight: 600,
    transition: 'all 0.2s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
}));

export const EmptyStateMessage = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
    fontSize: '1.1rem',
    fontStyle: 'italic',
}));

export const LoadingOverlay = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(4px)',
}));

export const LoaderWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
}));

export const LoadingText = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
    fontSize: '1.1rem',
    fontWeight: 500,
    marginTop: theme.spacing(2),
}));

export const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
    color: theme.palette.common.white,
})); 