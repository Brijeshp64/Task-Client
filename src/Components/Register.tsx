import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, type SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'

interface RegisterProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
function Register() {
    const [age, setAge] = React.useState('');
    const [data,setData] = useState<RegisterProps | []>([]);
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    const  response ={
       role : age
    }
    const handlesubmit = ()=>{
           console.log("response",response);
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
                <h2 style={{color:"#4a4af3"}}>Register</h2>
            <TextField id="outlined-basic" label="First_Name" variant="outlined" />
            <TextField id="outlined-basic" label="Last_Name" variant="outlined" />
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField id="outlined-basic" label="Password" variant="outlined" />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" >Age</InputLabel>
                <Select sx={{width:150}}
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
            <Button  variant="contained" onClick={handlesubmit} >Register</Button>
        </Box>
    )
}

export default Register