import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
};

const toastifyService = {
    success: (message, options = {}) => {
        toast.success(message, { ...defaultOptions, ...options });
    },
    error: (message, options = {}) => {
        toast.error(message, { ...defaultOptions, ...options });
    },
    info: (message, options = {}) => {
        toast.info(message, { ...defaultOptions, ...options });
    },
    warning: (message, options = {}) => {
        toast.warning(message, { ...defaultOptions, ...options });
    },
    default: (message, options = {}) => {
        toast(message, { ...defaultOptions, ...options });
    },

    promise:(promiseFunction,messages,options)=>{
        return toast.promise(
            promiseFunction,{
                pending: messages.pending,
                success: messages.success,
                error: messages.error
            },
            {...defaultOptions,...options}

        )
    },
    errorOption: (errorType, options = {}) => {
        let message = "something went wrong"
        if(errorType === 500){
            message = "something went wrong, please try again"
        }else{
            message = "something went wrong, please Login"
        }
        toast.error(message, { ...defaultOptions, ...options });
    },
};

export default toastifyService;