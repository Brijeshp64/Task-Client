import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import {AES} from 'crypto-js';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface updateprops {
    id:string,
    title: string,
    description: string,
    dueDate: string,
    createdDate:string,
    isCompleted:string
}

const initialstate: updateprops = {
    id:"",
    title: "",
    description: "",
    dueDate: "",
    createdDate: "",
    isCompleted: "false"
}

function UpdateTask() {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const [task, setTask] = useState<updateprops>(initialstate);
    const navigate = useNavigate();
    // const {id} = useParams<{ id: string }>();
    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value })
    }

    useEffect(() => {
        var data = localStorage.getItem("task");
        console.log()
        var result = data ? JSON.parse(data) : null;
        if (result && Array.isArray(result) && result.length > 0) {
            setTask(result[0]);
        }
    }, []);

    useEffect(() => {
        console.log("task", task);
    }, [task]);

    const handleBack = () => {
        navigate('/home');
    };

    const handleDateChange = (newValue: Dayjs | null) => {
        setTask(prev => ({
            ...prev,
            dueDate: newValue ? newValue.format('YYYY-MM-DD') : ''
        }));
    };

    const payload = {
        title: task.title,
        description: task.description,
        duedate: task.dueDate
    }

    const handelsubmit = () => {
        updateTask(payload);
    }

    const updateTask = async (payload: any) => {
        const response = await axios.put(`https://localhost:7171/api/Task/UpdateTask/${task.id}`, payload);
        console.log("data", response)
        if (response.status === 200) {
            navigate('/home');
        }
    }

    return (
        <>
            <TextField
                fullWidth
                margin="normal"
                label="title"
                variant="standard"
                name='title'
                value={task.title}
                onChange={handlechange}
            />
            <TextField
                fullWidth
                margin="normal"
                label="description"
                variant="standard"
                name='description'
                value={task.description}
                onChange={handlechange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Select Date"
                    value={task.dueDate ? dayjs(task.dueDate) : null}
                    onChange={handleDateChange}
                    format="DD/MM/YYYY"
                    minDate={dayjs()}
                    disablePast={true}
                />
            </LocalizationProvider>
            <div style={{ textAlign: 'right', marginTop: '16px' }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleBack}
                    style={{ marginRight: '8px' }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handelsubmit}
                >
                    Update
                </Button>
            </div>
        </>
    );
}

export default UpdateTask;
