import { useForm } from "react-hook-form";
import Likert from "./likert";

function Quest() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data)
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}> 
            <Likert question="Q1" reg={register("q1")}/>
            <Likert question="Q2" reg={register("q2")}/>

            <input type="submit" className="bg-blue-500 active:bg-blue-600"/>
        </form>
    );
}

export default Quest;