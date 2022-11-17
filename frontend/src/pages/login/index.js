import { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';
import QRCode from '../../components/qrcode';
import SummaryList from '../../components/summaryList';


export default function Login() {

    const [accessToken, setAccessToken] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);

        ws.onopen = () => {
            ws.send("connecting");
        };

        ws.onmessage = (event) => {
            const receive = JSON.parse(event.data);

            if(receive.type == "token"){
                setAccessToken(receive.message);
            }
            else if(receive.type == "login"){ 
                setLoggedIn(true);
                setUserId(receive.message.slice(0, 3));
            }
        };

        return () => {
            if(ws.readyState === 1){ 
                ws.close();
            }
        }

    }, []);

    
    return(
        <div className={styles.container}>
            {loggedIn
              ? <SummaryList userId={userId}/>
              : <QRCode token={accessToken} />
            }
        </div>
    );

}