import React from 'react';
import axios from 'axios';

import NotiList from '../../../../components/notilist';


export async function getServerSideProps(context) {
    const {userId, summaryId} = context.query
    const dataURL = `http://0.0.0.0:5000/summary/${userId}/${summaryId}`;

    const response = await axios.get(dataURL);

    return { props: {summary: response.data} }
}

export default function Finish(props) {

    return(
        <div>
            <h2>{props.summary.userId} {props.summary.summaryId} {props.summary.notification.length} {props.summary.summary}</h2>
            <NotiList notis={props.summary.notification}/>
        </div>
    )
}

