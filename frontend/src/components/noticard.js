import styles from '../styles/Home.module.css'

function Noticard(props) {
    return (
        <div className={styles.card} style={{width:"10000px"}}>
            <div className={styles.grid}
                 style={{justifyContent:"space-between",
                         verticalAlign:"middle"}}>
                <h2>{props.title}</h2>
                <p>{props.time}</p>
            </div>
            <p>{props.content}</p>
        </div>
    );
}

export default Noticard;