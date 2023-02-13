import { useState, useEffect } from 'react';
import Link from 'next/link'
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2';
import SummarizeIcon from '@mui/icons-material/Summarize';
import axios from 'axios';
import Moment from 'moment';

export default function SummaryList({userId}) {

    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/summary/undone/${userId}`;
    const [summaryIds, setSummaryIds] = useState(null);

    useEffect(() => {
        axios.get(url).then((res) => {
            setSummaryIds(res.data);
        })
    }, []);

    if(!summaryIds) return null;

    function toDateStr(unixTime) {
        return Moment(unixTime).format('MM月DD日 HH:mm')
    }

    return(
        <div className="flex flex-col items-center">
            <h2>待完成摘要問卷</h2>

            <Grid2 container justifyContent="center" spacing={2} className="w-[70vw]">
                {summaryIds.map((sid) => (
                    <Grid2 item xs="auto">
                        <Button variant="outlined" key={sid} href={`/${sid}`} passHref className="flex flex-col text-center">
                        <SummarizeIcon color="primary" fontSize="large"/>
                          填寫摘要問卷<br/>{`${toDateStr(parseInt(sid.substring(4)))}`}
                        </Button>
                    </Grid2>
                )).reverse()}
            </Grid2>
            
        </div>

    );

}