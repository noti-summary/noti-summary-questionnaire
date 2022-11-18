import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Toast() {

    toast.success('登入成功', {
        toastId: "login_success",
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
    });

    return(
        <div>
            <ToastContainer />
        </div>
    );
}