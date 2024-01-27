import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './inputs.css';

const DropdownInput = (props) => {
  return (
    <main className="inputs">
      <span className="edit-service-text2 TextXS">{props.objectinput}</span>
      <Dropdown
        options={props.options}
        value={props.value}
        onChange={props.onChange}
        placeholder="Pilih salah satu"
      />
    </main>
  );
};

export default DropdownInput;
