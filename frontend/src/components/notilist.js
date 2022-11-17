import axios from 'axios';
import Noticard from './noticard';
import React, { useState, useEffect } from 'react';

const dataURL = "http://0.0.0.0:8000/summary/000/123";

const testData = [
    {
        "appName": "Messenger",
        "category": "msg",
        "content": "👍",
        "notificationId": "000_1667459329893",
        "time": "15:08",
        "title": "Message",
        "userId": "000"
    },
    {
        "appName": "Messenger",
        "category": "msg",
        "content": "👍",
        "notificationId": "000_1667459329893",
        "time": "15:08",
        "title": "Message",
        "userId": "000"
    }
];

function Notilist() {
    // const [notiData, setNoti] = useState(null);
    // useEffect(() => {
    //     axios.get(dataURL).then((res) => {
    //         setNoti(res['notification']);
    //     })
    // }, []);

    // if (!notiData)  return null;
    
    return (
        <div>
            {testData.map(noti => <Noticard {...noti} key={noti.notificationId}/>)}
        </div>
    );
}

export default Notilist;
