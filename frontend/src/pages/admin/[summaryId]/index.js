import React from 'react';
import axios from 'axios';

import NotiList from '../../../components/NotiList';


export async function getServerSideProps(context) {
    const {summaryId} = context.query
    const dataURL = `${process.env.NEXT_PUBLIC_SERVER_IP}/summary/${summaryId}`;

    const response = await axios.get(dataURL);

    return { props: {summary: response.data} }
}

export default function Finish(props) {

    return(
        <div>
            <h2>{props.summary.userId} {props.summary.summaryId} {props.summary.notifications.length} {props.summary.summary}</h2>
            <NotiList notis={props.summary.notifications}/>
        </div>
    )
}

