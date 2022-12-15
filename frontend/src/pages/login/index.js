import { useState, useEffect, useContext } from 'react';
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../components/context/authContext';
import QRCode from '../../components/qrcode';

import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

// import styles from '../../styles/Home.module.css';


export default function Login() {

    const [accessToken, setAccessToken] = useState("");
    const context = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);

        ws.onopen = () => {
            ws.send("connecting");
        };

        ws.onmessage = (event) => {
            const receive = JSON.parse(event.data);

            if(receive.type === "token"){
                setAccessToken(receive.message);
            }
            else if(receive.type === "login"){
                context.setUser(receive.message.slice(0, 3));

                toast.success('登入成功', {
                    toastId: "login_success",
                    position: "top-center",
                    autoClose: 800,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "dark",
                    onClose: () => {
                        setTimeout(() => {
                            ws.close();                  
                            router.push('/todo');
                        }, 1800);
                    }
                });
            }
        };

        return () => {
            if(ws.readyState === 1){ 
                ws.close();
            }
        }

    }, []);


    return(
        // <div className={styles.container}>
        <Container component="main">
            <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
                <QRCode token={accessToken} />
            </Paper>
        </Container>
        // </div>
    );

}