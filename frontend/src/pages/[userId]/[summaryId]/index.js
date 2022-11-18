import { useRouter } from 'next/router'

export default function Questionnaire() {

    const router = useRouter();
    const {userId, summaryId} = router.query

    return(
        <div>
            <h1>This is /{userId}/{summaryId}</h1>
        </div>
    )
}

