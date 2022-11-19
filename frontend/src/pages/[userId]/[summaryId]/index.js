import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import NotiList from '../../../components/notiList';
import Quest from '../../../components/questionnaire';

export default function Questionnaire() {

    const router = useRouter();
    const {userId, summaryId} = router.query

    

    const [notiData, setNoti] = useState(null);
    const [summary, setSum] = useState(null);
    
    useEffect(() => {
        const dataURL = `http://0.0.0.0:8000/summary/001/123`; // unable to use userId & summaryId directly
        console.log(dataURL);
        axios.get(dataURL).then((res) => {
            setNoti(res['data']['notification']);
            setSum(res['data']);
        })
    }, [userId, summaryId]);

    if (!notiData)  return null;

    return(
        <div>
            <h1>This is /{userId}/{summaryId}</h1>
            <div className="grid gap-x-96 grid-cols-2">
                <NotiList notis={notiData}/>
                <Quest/>
            </div>
        </div>
    )
}

