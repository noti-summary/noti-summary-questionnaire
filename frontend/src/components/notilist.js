import axios from 'axios';
import NotiCard from './notiCard';

function NotiList(props) {
    return (
        <div>
            {props.notis.map(noti => <NotiCard {...noti} key={noti.notificationId}/>)}
        </div>
    );
}

export default NotiList;
