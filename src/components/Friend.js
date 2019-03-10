import React from 'react';

const Friend = ({
  id,
  selected,
  first_name,
  last_name,
  photo_50,
  moveFriend
}) => {
  const onMoveFriend = (id) => {
    moveFriend(id);
  };
  return (
    <li className='friends__item'>
      <img
        className='friends__img'
        src={photo_50}
        alt={`${first_name} ${first_name}`}
      />
      <h4 className='friends__name'>
        {first_name} {last_name}
      </h4>
      <button
        onClick={() => onMoveFriend(id)}
        className={selected ? 'friends__remove-btn' : 'friends__add-btn'}
      />
    </li>
  );
};

export default Friend;
