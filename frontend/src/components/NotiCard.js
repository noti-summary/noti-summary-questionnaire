function NotiCard(props) {
    const time = new Date(props.postTime);
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row content-center h-6 w-full">
                <img src={`data:image/png;base64,${props.iconString}`} className="h-6" />
                <p className="mx-2 self-center normal-case">{props.appName}</p>
                <p className="mx-1 self-center">
                    {(time.getMonth() + 1).toString().padStart(2, '0')}/
                    {time.getDate().toString().padStart(2, '0')} {time.getHours().toString().padStart(2, '0')}
                    :{time.getMinutes().toString().padStart(2, '0')}
                </p>
            </div>
            <div>
                <p className="text-left leading-5 my-1 font-semibold normal-case break-words">{props.title}</p>
            </div>
            <p className="text-left leading-4 m-0 normal-case font-normal break-words">{props.content}</p>
        </div>
    );
}

export default NotiCard;
