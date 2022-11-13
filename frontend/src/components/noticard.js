function Noticard(props) {
    return (
        <div class="flex flex-col w-80 bg-slate-800 rounded-lg">
            <div>
                <p class="m-1">{props.appName}</p>
            </div>
            <div class="flex justify-between">
                <p class="m-1 font-semibold">{props.title}</p>
                <p class="m-1 text-slate-400">{props.time}</p>
            </div>
            <p class="m-1">{props.content}</p>
        </div>
    );
}

export default Noticard;
