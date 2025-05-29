import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Drawer,
    List,
    Modal
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { DateCalendar, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface AddTaskProps {
    open: boolean;
    onClose: () => void;
}

interface TaskState {
    title: string;
    description: string;
    duedate: string;
}

interface TaskError {
    Title?: string;
    Description?: string;
    DueDate?: string;
}

function AddTask() {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const [task, setTask] = useState<TaskState>({
        title: "",
        description: "",
        duedate: ""
    });
    
    const [exeption, setExeption] = useState<TaskError>({});

    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    }
   
    const location = useLocation();
    const navigate = useNavigate();
    const isupdate = location.pathname.startsWith("/UpdateTask/");
    const handleBack = () => {
        navigate('/home')
    };

    const handleDateChange = (newValue: Dayjs | null) => {
        setTask(prev => ({
            ...prev,
            duedate: newValue ? newValue.format('YYYY-MM-DD') : ''
        }));
    }

    const payload = {
        title: task.title,
        description: task.description,
        isCompleted: false,
        duedate: task.duedate
    }

    const handelsubmit = () => {
        addTask(payload);
    }

    const addTask = async (payload: TaskState & { isCompleted: boolean }) => {
        try {
            const response = await axios.post("https://localhost:7171/api/Task", payload);
            console.log("data", response);
            if (response.data.error) {
                setExeption(response.data.error);
                return; 
            }
            if (response.status === 200) {
                navigate('/home');
            }
        } catch (error: any) {
            if (error.response?.data) {
                console.log("error", error.response.data.error);
                setExeption(error.response.data.error);
            } else {
                console.error("Error adding task:", error);
            }
        }
    }

    return (
        <Box style={{}}>
            <h3>Add Task</h3>
           <TextField 
            fullWidth 
            margin="normal"
            label="title" 
            variant="standard" 
            name='title' 
            error={!!exeption?.Title}
            helperText={exeption?.Title || ""}
            value={task.title} 
            onChange={handlechange} 
           />

            <TextField 
            fullWidth 
            margin="normal"
            label="description" 
            variant="standard" 
            name='description'
            error={!!exeption?.Description}
            helperText={exeption?.Description || ""} 
            value={task.description} 
            onChange={handlechange} 
            />

            

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Select Date"
                    name='duedate'
                    value={task.duedate ? dayjs(task.duedate) : null}
                    onChange={handleDateChange}
                    format='DD/MM/YYYY'
                    minDate={dayjs()}
                    disablePast={true}
                    slotProps={{
                        textField: {
                            error: !!exeption?.DueDate,
                            helperText: exeption?.DueDate || ""
                        }
                    }}
                />
            </LocalizationProvider>

            <div style={{ textAlign: 'right', marginTop: '16px' }}>
                <Button variant="contained" color="secondary" onClick={handleBack} style={{ marginRight: '8px' }}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handelsubmit}>
                    Submit
                </Button>
            </div>
        </Box>
    );
}

export default AddTask;
