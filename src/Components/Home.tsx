import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup } from '@mui/material';
import AddTask from './AddTask';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import RestoreIcon from '@mui/icons-material/Restore';
import CryptoJS from 'crypto-js';


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
        const response = await axios.get(`https://localhost:7171/api/Task`);
        console.log("response", response);
        setForecasts(response.data.data);
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
        const response = await axios.get(`https://localhost:7171/api/Task/GetAllDeleted`);
        console.log("response", response);
        setForecasts(response.data.data);
    };
    const handeldeleteclick = (id: string) => {
        deleteTask(id);
    }
    const deleteTask = async (id: string) => {
        const response = await axios.delete(`https://localhost:7171/api/Task/${id}`, { data: { flag: true } });
        console.log("response", response);
        populateWeatherData();
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
            const response = await axios.get(`https://localhost:7171/api/Task/${id}`);

            if (response.data.data) {
                localStorage.setItem("task", JSON.stringify(response.data.data));

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
        const response = await axios.patch(`https://localhost:7171/api/Task/${id}`, { isCompleted: true });
        console.log("response", response);
        populateWeatherData();
    };

    const handelrestoreclick = (id: string) => {
        restoreTask(id);
    }
    const restoreTask = async (id: string) => {
        const response = await axios.patch(`https://localhost:7171/api/Task/restore/${id}`, { flag: false });
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
        <div>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    <ToggleButton value="Existing">Existing</ToggleButton>
                    <ToggleButton value="Deleted">Deleted</ToggleButton>
                </ToggleButtonGroup>
                <Button variant="contained" onClick={handleNavigate}>Add Task</Button>
            </div>
            <TableContainer >
                <Table className="table table-striped" aria-labelledby="tableLabel">
                    <TableHead >
                        <TableRow className='table-header'>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>{alignment === 'Existing' ? "Deleted" : "Restore"}</TableCell>

                            {
                                alignment === 'Existing' &&
                                <>
                                    <TableCell>Edit</TableCell>
                                    <TableCell>Complete</TableCell>
                                </>
                            }
                        </TableRow>
                    </TableHead >
                    <TableBody >

                        {forecasts && forecasts.map(item =>
                            <TableRow key={item.id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{alignment === 'Existing' ? <DeleteIcon onClick={() => handeldeleteclick(item.id)} /> : <RestoreIcon onClick={() => handelrestoreclick(item.id)} />} </TableCell>
                                {alignment === 'Existing' &&
                                    <>
                                        <TableCell><ModeEditOutlineIcon onClick={() => handelupdateclick(item.id)} /></TableCell>
                                        <TableCell><CheckIcon onClick={() => handelcompleteclick(item.id)} /></TableCell>
                                    </>
                                }

                            </TableRow >
                        )}
                    </TableBody >
                </Table >
            </TableContainer>
            <div>



            </div>
        </div>
    )
}

export default Home