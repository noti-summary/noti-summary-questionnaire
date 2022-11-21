import { useContext } from 'react';
import { AuthContext } from '../../components/context/authContext';
import styles from '../../styles/Home.module.css';
import SummaryList from '../../components/summaryList';


export default function ShowSummaryList() {

    const context = useContext(AuthContext);
    
    return(
        <div className={styles.container}>
            {context.isUserLoggedIn()
              ? <SummaryList userId={context.user.userId}/>
              : <h2>使用本系統前，請先登入</h2>
            }
        </div>
    );

}