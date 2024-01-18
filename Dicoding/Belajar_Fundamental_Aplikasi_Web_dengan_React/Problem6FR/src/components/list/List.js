import React from 'react';
import PropTypes from 'prop-types';
import ArticleCard from '../card/article-card';
 
function List({ services }) {
  if (services.length >= 0) {
    return (
      <>
        {
          services.map((service) => (
            <ArticleCard
              key={service.id}
              id={service.idservice}
              title={service.nameservice}
              description={service.descriptionservice}
              image_src={service.avatarservice}
              createdAt={service.createdAt}
            />
          ))
        }
      </>
    );
  }
}

export default List;