import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';

function Card(props){
    const name=props.name;
    const image=props.image;
    const handleClick=props.onClick;

    return(
        <div onClick={handleClick}  className='card w-[17vw] bg-green-600 rounded-lg p-4 cursor-pointer active:bg-green-800'>
            <img className='w-[85vw]' src={image} alt={`Image of ${name}`} />
            <span className='name font-medium text-lg text-center'>{name}</span>
        </div>
    );
}
Card.propTypes={
    name: propTypes.string.isRequired,
    image: propTypes.string.isRequired,
    onClick: propTypes.func.isRequired
}

export default Card;