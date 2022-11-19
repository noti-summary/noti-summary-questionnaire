function NotiCard(props) {
    return (
        <div className="flex flex-col w-80 bg-slate-800 rounded-lg">
            <div>
                <p className="m-1">{props.appName}</p>
            </div>
            <div className="flex justify-between">
                <p className="m-1 font-semibold">{props.title}</p>
                <p className="m-1 text-slate-400">{props.time}</p>
            </div>
            <p className="m-1">{props.content}</p>
        </div>
    );
}

export default NotiCard;
