import React from 'react';
import axios from 'axios';

import NotiList from '../../../components/notilist';
import Quest from '../../../components/questionnaire';


export async function getServerSideProps(context) {
    const {userId, summaryId} = context.query
    const dataURL = `http://0.0.0.0:5000/summary/${userId}/${summaryId}`;

    const response = await axios.get(dataURL);

    return { props: {summary: response.data} }
}

export default function Questionnaire(props) {

    return(
        <div>
            <h1>This is /{props.summary.userId}/{props.summary.summaryId}</h1>
            <div className="grid gap-x-96 grid-cols-2">
                <NotiList notis={props.summary.notification}/>
                <Quest/>
            </div>
        </div>
    )
}

