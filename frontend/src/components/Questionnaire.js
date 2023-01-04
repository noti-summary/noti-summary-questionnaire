import Likert from "./Likert";

function Quest(props) {
    return (
        <div className="flex flex-col">
            <Likert question="Q1" reg={props.register("q1")}/>
            <Likert question="Q2" reg={props.register("q2")}/>
        </div>
    );
}

export default Quest;
