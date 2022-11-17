import Toast from './toast.js';

export default function SummaryList(props) {

    return(
        <div>
            <Toast />
            <h2>{props.userId} 待填摘要問卷</h2>
        </div>

    );

}