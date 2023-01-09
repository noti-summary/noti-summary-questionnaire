import Likert from "./Likert";

function Quest(props) {
    return (
        <>
            <Likert question="Q1" reg={props.register("q1", { required: true })}/>
            <Likert question="Q2" reg={props.register("q2", { required: true })}/>
        </>
    );
}

export default Quest;