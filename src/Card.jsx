import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';

function Card(props){
    const key=props.key;
    const name=props.name;
    const image=props.image;
    return(
        <div className='card w-[17vw] bg-green-600 rounded-lg p-4 cursor-pointer active:bg-green-800' id={key}>
            <img className='w-[85vw]' src={image} alt={`Image of ${name}`} />
            <span className='name font-medium text-lg text-center'>{name}</span>
        </div>
    );
}
Card.propTypes={
    key: propTypes.number,
    name: propTypes.string,
    image: propTypes.string
}

export default Card;