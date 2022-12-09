import { useContext } from 'react';
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../components/context/authContext';
import styles from '../../styles/Home.module.css';
import SummaryList from '../../components/summaryList';


export default function ShowSummaryList() {

    const context = useContext(AuthContext);
    const router = useRouter();

    if(!context.isUserLoggedIn()){
        toast.warn('您尚未登入', {
            toastId: "not_login",
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
                    router.push('/login');
                }, 2000);
            }
        });
    }
    
    return(
        <div className={styles.container}>
            {context.isUserLoggedIn() &&
              <SummaryList userId={context.user}/>
            }
        </div>
    );

}