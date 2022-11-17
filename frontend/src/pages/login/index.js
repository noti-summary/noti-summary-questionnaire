import { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';
import QRCode from '../../components/qrcode';


export default function login() {

    const [accessToken, setAccessToken] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

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
                console.log(`userId = ${receive.message.slice(0, 3)}`);
            }
        };

        return () => ws.close();

    }, []);

    
    return(
        <div className={styles.container}>
            {loggedIn
              ? <h3>登入成功</h3>
              : <QRCode token={accessToken} />
            }
        </div>
    );

}