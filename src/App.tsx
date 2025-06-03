import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import AddTask from './Components/AddTask';
import UpdateTask from './Components/UpdateTask';
import Register from './Components/Register';
import Login from './Components/Login';
import { Switch } from '@mui/material';
import Protected from './Components/Protected';
import Loader from './Components/Loader';
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
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Protected> < Home/> </Protected>} />
                    <Route path="/addTask" element={< AddTask />} />
                    <Route path="/UpdateTask/:id" element={< UpdateTask />} />
                    <Route path="/register" element={< Register />} />
                    <Route path="/login" element={< Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;