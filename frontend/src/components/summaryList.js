import { useState, useEffect } from 'react';
import Link from 'next/link'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SummarizeIcon from '@mui/icons-material/Summarize';
import axios from 'axios';


export default function SummaryList({userId}) {

    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/summary/undone/${userId}`;
    const [summaryIds, setSummaryIds] = useState(null);

    useEffect(() => {
        axios.get(url).then((res) => {
            setSummaryIds(res.data);
        })
    }, []);

    if(!summaryIds) return null;

    return(
        <div>
            <h2>待完成摘要問卷</h2>

            <List>
                {summaryIds.map((sid) => (
                    <Link key={sid} href={`/${sid}`} passHref>
                        <ListItemButton> 
                            <ListItemIcon>
                                <SummarizeIcon color="primary" fontSize="large"/>
                            </ListItemIcon>
                            <ListItemText primary={`Go to questionnaire ${sid}`} />
                        </ListItemButton>
                    </Link>
                )).reverse()}
            </List>
            
        </div>

    );

}