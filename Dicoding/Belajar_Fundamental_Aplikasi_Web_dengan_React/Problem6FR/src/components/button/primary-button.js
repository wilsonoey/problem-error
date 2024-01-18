import React from 'react'

import PropTypes from 'prop-types'

import './primary-button.css'
import { Link } from 'react-router-dom'

const PrimaryButton = (props) => {
  return (
    <Link to={props.link}>
      <div className={`primary-button-container ${props.rootClassName} `}>
        <button className="primary-button-button button TextXS">
          {props.button}
        </button>
      </div>
    </Link>
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

export default PrimaryButton
