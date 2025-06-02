import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddIcon from '@mui/icons-material/Add';
import { Table, TableBody, TableCell, TableRow, ToggleButton } from '@mui/material';
import AddTask from './AddTask';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import RestoreIcon from '@mui/icons-material/Restore';
import CryptoJS from 'crypto-js';
import {
    StyledContainer,
    HeaderSection,
    PageTitle,
    StyledTableContainer,
    StyledTableHead,
    StyledTableRow,
    ActionIconWrapper,
    StyledToggleButtonGroup,
    AddButton,
    EmptyStateMessage
} from '../styles/HomeStyles';

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

export default Home;