import {ButtonProps} from "../utils/types.ts";

const Button = ({children, type, onClick, disabled}: ButtonProps) =>  (
        <button
            className="disabled:bg-slate-400 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type={type ? type : "button"}
            onClick={onClick}
            disabled={disabled}
        > {children} </button>
    )
;

export default Button