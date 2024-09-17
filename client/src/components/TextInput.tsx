import { useState} from "react";
import {InputProps} from "../utils/types.ts";

const TextInput = ({title, id, placeholder, onChange}: InputProps) => {
    const [value, setValue] = useState('')

    const _handleChange = (e: { target: { value: string }; }) => {
        setValue(e.target.value)
        onChange({name: id, value: e.target.value})
    }

    return (
        <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                   htmlFor={id}>
                {title}
            </label>
            <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id={id}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={_handleChange}
                required
            />
        </div>
    )
}
export default TextInput;