import { useState, useEffect } from 'react';
import Link from 'next/link'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SummarizeIcon from '@mui/icons-material/Summarize';
import axios from 'axios';
import Toast from './toast.js';

export default function SummaryList({userId}) {

    const url = `http://localhost:5000/summary/undone/${userId}`;
    const [summaryIds, setSummaryIds] = useState(null);

    useEffect(() => {
        axios.get(url).then((res) => {
            setSummaryIds(res.data);
        })
    }, []);

    if(!summaryIds) return null;

    return(
        <div>
            <Toast />
            <h2>待完成摘要問卷</h2>

            <List>
                {summaryIds.map((sid) => (
                    <Link key={sid} href={`/${userId}/${sid}`} passHref>
                        <ListItemButton> 
                            <ListItemIcon>
                                <SummarizeIcon color="primary" fontSize="large"/>
                            </ListItemIcon>
                            <ListItemText primary={`Go to questionnaire /${userId}/${sid}`} />
                        </ListItemButton>
                    </Link>
                ))}
            </List>
            
        </div>

    );

}