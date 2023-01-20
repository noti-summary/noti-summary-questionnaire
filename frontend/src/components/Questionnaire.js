import Likert from "./Likert";

function Quest(props) {
    return (
        <div className="flex flex-col">
            <Likert question="Q1" reg={props.register("q1", { required: true })}/>
            <Likert question="Q2" reg={props.register("q2", { required: true })}/>
        </div>
    );
}

export default Quest;
