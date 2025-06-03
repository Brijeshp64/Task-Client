import { Box, Button, Fade, Snackbar, TextField } from '@mui/material'
import type { TransitionProps } from '@mui/material/transitions'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'


interface LoginProps {
    email: string,
    password: string
}

function Login() {

    const [data, setData] = useState<LoginProps>({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }


    const handleSubmit = async () => {
        setIsLoading(true);
        const payload = {
            email: data.email,
            password: data.password
        }
        console.log("payload", payload);
        const response = await axios.post("https://localhost:7011/api/User/LoginUser", payload);
        console.log("response", response)
        if (response.status === 200) {
            localStorage.setItem("Token", response.data.token);
            localStorage.setItem("Role", response.data.roleId);
            setIsLoading(false);
            navigate('/home');
        }
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
            <Loader open={isLoading} message="Loading..." />
            <h2 style={{ color: "#4a4af3" }}>Login</h2>
            <TextField id="outlined-basic" label="Email" variant="outlined" name='email' onChange={handlechange} />
            <TextField id="outlined-basic" label="Password" variant="outlined" name='password' onChange={handlechange} />



            <Button variant="contained" onClick={handleSubmit} >Login</Button>
        </Box>
    )
}

export default Login    