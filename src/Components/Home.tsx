import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import AddTask from './AddTask';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import RestoreIcon from '@mui/icons-material/Restore';
import CryptoJS from 'crypto-js';
import { styled, alpha } from '@mui/material/styles';

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
}));

const HeaderSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
}));

const PageTitle = styled(Typography)(({ theme }) => ({
    fontSize: '2rem',
    fontWeight: 600,
    color: theme.palette.primary.main,
    letterSpacing: '-0.5px',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(3),
    overflow: 'hidden',
    '& .MuiTable-root': {
        minWidth: 650,
    },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
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

const ActionIconWrapper = styled(Box)(({ theme }) => ({
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

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
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

const AddButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1, 3),
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontWeight: 600,
    transition: 'all 0.2s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
}));

const EmptyStateMessage = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
    fontSize: '1.1rem',
    fontStyle: 'italic',
}));

interface Forecast {
    id: string;
    title: string;
    description: string;
    isCompleted: string;
}
function Home() {

    const [forecasts, setForecasts] = useState<Forecast[]>() || [];
    const [open, setOpen] = useState(false);
    const [alignment, setAlignment] = useState('Existing');

    const toggleDrawer = () => {
        setOpen(!open);
    };
    const navigate = useNavigate();
    const populateWeatherData = async () => {
        const response = await axios.get(`https://localhost:7011/api/Task/GetAllTask`);
        console.log("response", response);
        setForecasts(response.data);
    };

    const SECRET_KEY = "your-secret-key-123";
    const encryption = (id: string, secretKey: string) => {
        try {
            if (!id || !secretKey) {
                return id;
            }
            const encrypted = CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
            return encrypted;
        } catch (error) {
            return id;
        }
    }
    const GetAllDeleted = async () => {
        const response = await axios.get(`https://localhost:7011/api/Task/GetAllDeleted`);
        console.log("response", response);
        setForecasts(response.data);
    };
    const handeldeleteclick = (id: string) => {
        deleteTask(id);
    }
    const deleteTask = async (id: string) => {
        if(alignment === 'Existing'){
        const response = await axios.delete(`https://localhost:7011/api/Task/DeleteTask/${id}`);
        console.log("response", response);
        populateWeatherData();}
        else{
            const response = await axios.delete(`https://localhost:7011/api/Task/DeletePamenetly/${id}`);
            GetAllDeleted();
        }
    };
    useEffect(() => {
        if (alignment === 'Existing') {
            populateWeatherData();
        } else {
            GetAllDeleted()
        }

    }, [alignment]);
    const handleNavigate = () => {
        navigate('/addTask');
    }
    const handelupdateclick = (id: string) => {
        getById(id);
    }
    const getById = async (id: string) => {
        try {
            console.log("Fetching task with ID:", id);
            const response = await axios.get(`https://localhost:7011/api/Task/GetById/${id}`);

            if (response.data) {
                localStorage.setItem("task", JSON.stringify(response.data));

                navigate(`/UpdateTask/${id}`);
            } else {
                console.error("No task data received");
            }
        } catch (error) {
            console.error("Error fetching task:", error);
        }
    }

    const handelcompleteclick = (id: string) => {
        completeTask(id);
    }
    const completeTask = async (id: string) => {
        const response = await axios.patch(`https://localhost:7011/api/Task/CompleteTask/${id}`);
        console.log("response", response);
        populateWeatherData();
    };

    const handelrestoreclick = (id: string) => {
        restoreTask(id);
    }
    const restoreTask = async (id: string) => {
        const response = await axios.patch(`https://localhost:7011/api/Task/RestoreTask/${id}`);
        console.log("response", response);
        GetAllDeleted()
    };

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <StyledContainer>
            <HeaderSection>
                <PageTitle variant="h4">
                    Task Management
                </PageTitle>
            </HeaderSection>
            
            <HeaderSection>
                <StyledToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    <ToggleButton value="Existing">Existing Tasks</ToggleButton>
                    <ToggleButton value="Deleted">Deleted Tasks</ToggleButton>
                </StyledToggleButtonGroup>
                <AddButton 
                    variant="contained" 
                    onClick={handleNavigate}
                    startIcon={<AddIcon />}
                >
                    Add New Task
                </AddButton>
            </HeaderSection>

            <StyledTableContainer>
                <Table aria-labelledby="tableLabel">
                    <StyledTableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="center">Delete</TableCell>
                            {alignment === 'Deleted' && (
                                <TableCell align="center">Restore</TableCell>
                            )}
                            {alignment === 'Existing' && (
                                <>
                                    <TableCell align="center">Update</TableCell>
                                    <TableCell align="center">Complete</TableCell>
                                </>
                            )}
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {forecasts && forecasts.map(item => (
                            <StyledTableRow key={item.id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell align="center">
                                    <ActionIconWrapper>
                                        <DeleteIcon color="error" onClick={() => handeldeleteclick(item.id)} />
                                    </ActionIconWrapper>
                                </TableCell>
                                {alignment === 'Deleted' && (
                                    <TableCell align="center">
                                        <ActionIconWrapper>
                                            <RestoreIcon color="primary" onClick={() => handelrestoreclick(item.id)} />
                                        </ActionIconWrapper>
                                    </TableCell>
                                )}
                                {alignment === 'Existing' && (
                                    <>
                                        <TableCell align="center">
                                            <ActionIconWrapper>
                                                <ModeEditOutlineIcon color="primary" onClick={() => handelupdateclick(item.id)} />
                                            </ActionIconWrapper>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ActionIconWrapper>
                                                <CheckIcon color="success" onClick={() => handelcompleteclick(item.id)} />
                                            </ActionIconWrapper>
                                        </TableCell>
                                    </>
                                )}
                            </StyledTableRow>
                        ))}
                        {(!forecasts || forecasts.length === 0) && (
                            <TableRow>
                                <TableCell colSpan={alignment === 'Existing' ? 5 : 3} align="center">
                                    <EmptyStateMessage>
                                        No tasks found
                                    </EmptyStateMessage>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </StyledContainer>
    );
}

export default Home