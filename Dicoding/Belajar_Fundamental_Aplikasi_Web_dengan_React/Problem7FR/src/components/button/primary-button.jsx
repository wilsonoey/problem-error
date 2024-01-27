import React from 'react';
import PropTypes from 'prop-types';
import './primary-button.css';

const PrimaryButton = (props) => {
  return (
    <div className={`primary-button-container ${props.rootClassName}`}>
      <button className="primary-button-button button TextXS">
        {props.button}
      </button>
    </div>
  )
}

PrimaryButton.defaultProps = {
  button: 'Button',
  rootClassName: '',
}

PrimaryButton.propTypes = {
  button: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default PrimaryButton;
