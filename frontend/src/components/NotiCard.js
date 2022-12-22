function NotiCard(props) {
    const time = new Date(props.postTime);
    return (
        <div className="flex flex-col w-80 rounded-lg">
            <div>
                <p className="m-1">{props.appName}</p>
            </div>
            <div className="flex justify-between">
                <p className="m-1 font-semibold">{props.title}</p>
                <p className="m-1 text-slate-400">
                    {time.getMonth().toString().padStart(2, '0')}/
                    {time.getDate().toString().padStart(2, '0')} {time.getHours().toString().padStart(2, '0')}
                    :{time.getMinutes().toString().padStart(2, '0')}
                </p>
            </div>
            <p className="m-1">{props.content}</p>
        </div>
    );
}

export default NotiCard;
