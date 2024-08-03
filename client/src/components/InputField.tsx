import { useId, useState } from "react";
import "../styles/form.css";

type TInputFieldProps = {label: string, value: string, type: React.HTMLInputTypeAttribute, onChange: React.ChangeEventHandler<HTMLInputElement> };

const InputField = ({ label, value, onChange, type }: TInputFieldProps) => {
  const id = useId();
  const [focus, setFocus] = useState(false);
    const valid = value.length > 0 ? true : false;


  return (
    <div className={"input-container" + (focus ? " focus" : "") + (valid ? " valid": "")}>
      <label htmlFor={id} className={"" +(focus ? "focus" : "") + (valid ? " valid": "")} >
        {label}
      </label>
      <input
        id={id}
        value={value}
        type={type}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
};

export default InputField;
