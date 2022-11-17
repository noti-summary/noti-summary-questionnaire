function Likert(props) {
    return (
        <div>
            <h3 className="text-lg">{props.question}</h3>
            <ul className="likert flex">
                <li> Strongly Disagree </li>
                <li><input className="flex-auto" type="radio" name={props.question} value="-2"/></li>
                <li><input className="flex-auto" type="radio" name={props.question} value="-1"/></li>
                <li><input className="flex-auto" type="radio" name={props.question} value="0"/></li>
                <li><input className="flex-auto" type="radio" name={props.question} value="1"/></li>
                <li><input className="flex-auto" type="radio" name={props.question} value="2"/></li>
                <li> Strongly Agree </li>
            </ul>
        </div>
    );
}

export default Likert;