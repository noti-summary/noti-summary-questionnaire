import { useRouter } from 'next/router'

export default function UndoSummary() {

    const router = useRouter();
    const {userId} = router.query

    return(
        <div>
            <h1>This is /{userId}</h1>
        </div>
    )
}

