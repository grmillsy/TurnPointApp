import {FormSectionProps} from "../utils/types.ts";

const FormSection = ({title, description, children}: FormSectionProps) => (
        <div className="flex flex-wrap -mx-3 mb-6 gap-3">
            <div className="flex flex-col gap-1">
                <p className="w-full px-3 text-2xl"> {title} </p>
                <p className="w-full px-3 text-base"> {description} </p>
            </div>
            {children}
        </div>
    )
;

export default FormSection