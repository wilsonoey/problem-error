import React from 'react';
import './inputs.css';

const Inputs = (props) => {
  return (
    <main className="inputs">
      <span className="edit-service-text2 TextXS">{props.objectinput}</span>
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className="edit-service-textinput TextSM input"
      />
    </main>
  );
};

export default Inputs;
