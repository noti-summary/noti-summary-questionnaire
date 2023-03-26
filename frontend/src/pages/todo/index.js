import { useContext } from 'react';
import { useRouter } from "next/router";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../components/context/AuthContext';
import styles from '../../styles/Home.module.css';
import SummaryList from '../../components/SummaryList';


export default function ShowSummaryList() {

    const context = useContext(AuthContext);
    const router = useRouter();

    if(!context.isUserLoggedIn()){
        router.push('/login');
    }
    
    return(
        <div className={styles.container}>
            {context.isUserLoggedIn() &&
              <SummaryList userId={context.user}/>
            }
        </div>
    );

}