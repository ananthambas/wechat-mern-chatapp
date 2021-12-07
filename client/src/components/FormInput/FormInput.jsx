import { useState } from "react";
import "./formInput.scss"

const FormInput = (props) => {

    const [blurred, setBlurred] = useState(false);
    const {label, errorMessage, onChange, id, ...inputProps} = props;
    return ( 
        <div className="formInput">
            <label>{label}</label>
            <input {...inputProps} onChange={onChange} onBlur={() => setBlurred(true)} blurred={blurred.toString()}/>
            <span>{errorMessage}</span>
        </div>
     );
}
 
export default FormInput;