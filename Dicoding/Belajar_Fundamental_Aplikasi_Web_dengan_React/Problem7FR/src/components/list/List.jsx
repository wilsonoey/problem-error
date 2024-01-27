import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ArticleCard from '../card/article-card';
import { showFormattedDateTime } from '../../utils/date';
import { getServicebyID } from '../../utils/api';
 
function List({ services }) {
  const [UserService, setUserService] = useState('');
  if (services.length >= 0) {
    return (
      <>
        {
          services.map((service) => (
            // getServicebyID(service.idservice).then(({ data }) => {
            //   setUserService(data);
            // }),
            <ArticleCard
              key={service.idservice}
              id={service.idservice}
              title={service.nameservice}
              category={service.categoryservice}
              image_src={service.avatarservice}
              image_alt={service.nameservice}
              // name={UserService.username}
              // avatar_src={UserService.avataruser}
              // avatar_alt={UserService.username}
              time={showFormattedDateTime(service.createdatservice)}
              createdAt={service.createdAt}
            />
          ))
        }
      </>
    );
  }
}

export default List;