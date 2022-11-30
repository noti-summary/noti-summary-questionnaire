import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


export default function Finish() {

    const router = useRouter();
    const {userId, summaryId} = router.query
    const [summary, setSummary] = useState(null);
    const dataURL = `http://0.0.0.0:5000/summary/${userId}/${summaryId}`;

    useEffect(() => {
        if(!router.isReady) return;

        axios.get(dataURL).then((res) => {
            setSummary(res.data)
        });
    }, [userId, summaryId]);


    if(!summary) return null; 

    return(
        <div>
            <h2>{summary.userId} {summary.summaryId} {summary.notification.length} {summary.summary}</h2>
        </div>
    )
}

