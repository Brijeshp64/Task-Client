import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, type SelectChangeEvent } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
function Register() {
    const [age, setAge] = React.useState('');
    const [data, setData] = useState<RegisterProps | []>({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    const payload = {
        first_name: data?.firstName,
        last_name: data?.lastName,
        email: data?.email,
        password: data?.password,
        role: age
    }
    const handlesubmit = async() => {
        const response = await axios.post("https://localhost:7011/api/User/RegisterUser", payload);
        navigate('/login');
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: 1000,
                maxWidth: 400,
                mx: 'auto',
                mt: 4,
                p: 3,
                boxShadow: 3,
                borderRadius: 2,
                border: '1px solid #black',
                bgcolor: 'background.paper',
            }}>
            <h2 style={{ color: "#4a4af3" }}>Register</h2>
            <TextField id="outlined-basic" label="First_Name" variant="outlined" name='firstName' onChange={handlechange} />
            <TextField id="outlined-basic" label="Last_Name" variant="outlined" name='lastName' onChange={handlechange} />
            <TextField id="outlined-basic" label="Email" variant="outlined" name='email' onChange={handlechange} />
            <TextField id="outlined-basic" label="Password" variant="outlined" name='password' onChange={handlechange} />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" >Age</InputLabel>
                <Select sx={{ width: 150 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>Admin</MenuItem>
                    <MenuItem value={2}>User</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" onClick={handlesubmit} >Register</Button>
        </Box>
    )
}

export default Register