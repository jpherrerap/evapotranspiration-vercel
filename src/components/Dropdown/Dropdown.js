import React from 'react';

const Dropdown = ({ value, onChange, options }) => {
  return (
    <div className="mb-3">
      <select 
        className="form-select"
        value={value} 
        onChange={onChange}
        aria-label="Selecciona tu cultivo"
      >
        <option value="">Selecciona tu cultivo</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;