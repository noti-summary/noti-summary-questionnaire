import { useState, useEffect } from 'react';
import Link from 'next/link'
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
            <h2>{userId} 待填摘要問卷</h2>
    
            {summaryIds.map((sid) => {
                return (
                    <div key={sid}>
                        <Link href={`/${userId}/${sid}`}> Go to pages /{userId}/{sid} </Link>
                        <br />
                    </div>
                )
            })}
            
        </div>

    );

}