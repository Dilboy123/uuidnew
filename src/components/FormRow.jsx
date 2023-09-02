import React,{useState} from "react";

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  horizontal,
  placeholder,
  id
}) => {
  return (
    <div className="form-row">
      {!horizontal && (
        <label htmlFor={name} className="form-label">
          {name}
        </label>
      )}
      <input
       id={id}
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormRow;
