import { useRouter } from 'next/router'
import NotiList from '../../../components/notiList';
import Quest from '../../../components/questionnaire';

export default function Questionnaire() {

    const router = useRouter();
    const {userId, summaryId} = router.query

    return(
        <div>
            <h1>This is /{userId}/{summaryId}</h1>
            <div className="grid gap-x-96 grid-cols-2">
                <NotiList/>
                <Quest/>
            </div>
        </div>
    )
}

