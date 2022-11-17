import Toast from './toast.js';

export default function SummaryList({userId}) {

    return(
        <div>
            <Toast />
            <h2>{userId} 待填摘要問卷</h2>
        </div>

    );

}