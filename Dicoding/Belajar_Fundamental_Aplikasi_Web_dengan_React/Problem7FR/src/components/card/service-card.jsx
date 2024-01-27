import React from 'react'
import PropTypes from 'prop-types'
import './service-card.css'

const ServiceCard = (props) => {
  return (
    <div className="service-card-container">
      <div className="service-card-container1">
        {props.icon}
      </div>
      <h1 className="service-card-text TextXL">{props.heading}</h1>
      <span className="service-card-text1">{props.text}</span>
    </div>
  )
}

ServiceCard.defaultProps = {
  text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  heading: 'Excelent services',
}

ServiceCard.propTypes = {
  text: PropTypes.string,
  heading: PropTypes.string,
  icon: PropTypes.element,
}

export default ServiceCard;
