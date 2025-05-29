import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AddTask from './Components/AddTask';
import UpdateTask from './Components/UpdateTask';
interface Forecast {
    id: string;
    title: string;
    description: string;
    isCompleted: string;
}

function App() {




    return (
        <div className='vishnusapp'>
             <BrowserRouter>
             <Routes>
                <Route path="/home" element={< Home/>} />
                <Route path="/addTask" element={< AddTask/>} />
                <Route path="/UpdateTask/:id" element={< UpdateTask/>} />
              </Routes>
             </BrowserRouter>
        </div>
    );
}

export default App;