import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from '../../components/context/authContext';

export default function Admin() {

    const url = "http://localhost:8000/summary/finish";
    const [summaryIds, setSummaryIds] = useState(null);
    const context = useContext(AuthContext);


    useEffect(() => {
        if(context.adminInfo.username!="" && context.adminInfo.password!=""){
            axios.get(url, {auth: context.adminInfo}).then((res) => {
                setSummaryIds(res.data);
            });
        }
    }, []);


    const handleInput = e => {
        const id = e.target.name;
        const newValue = e.target.value;

        context.setAdminInfo(prevState => ({
            ...prevState,
            [id]: newValue
        }));
    };


    const handleSubmit = e => {
        e.preventDefault();

        axios.get(url, {auth: context.adminInfo}).then((res) => {
            setSummaryIds(res.data)
        });
    };


    return(
        <div>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
                autoComplete="on"
            >
                <TextField
                    required
                    label="User Id"
                    name="username"
                    value={context.adminInfo.username}
                    onChange={handleInput}
                    InputLabelProps={{shrink: true}}
                />
                <TextField
                    required
                    label="Password"
                    name="password"
                    value={context.adminInfo.password}
                    onChange={handleInput}
                    InputLabelProps={{shrink: true}}
                />

                <Button variant="contained" endIcon={<SendIcon/>} type="submit">Search</Button> 
            </Box>


            <h2>已完成摘要問卷</h2>

            {summaryIds &&
                <List>
                    {summaryIds.map((sid) => (
                        <Link key={sid} href={`/admin/${context.adminInfo.username}/${sid}`} passHref>
                            <ListItemButton> 
                                <ListItemIcon>
                                    <CheckCircleIcon color="success" fontSize="medium"/>
                                </ListItemIcon>
                                <ListItemText primary={`Go to finished questionnaire /${context.adminInfo.username}/${sid}`} />
                            </ListItemButton>
                        </Link>
                    )).reverse()}
                </List>
            }
            
        </div>

    );

}