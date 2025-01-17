import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';
import Card from './Card';

async function fetchImage(url){
    try{
        const response=await fetch(url);
        if(!response.ok){
            throw new Error('Network repsonse during image retreival was not ok');
        }
        else{
            const data=await response.json();   
            console.log(data);
            return data.sprites.front_default;
        }
    }
    catch(error){
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function GameBoard({data, score, setScore, bestScore, setBestScore}){

    console.log("elephant", data);

    const [images, setImages]=useState([]);
    const [clicked, setClicked]=useState([]);  

    function handleClick(index){
        if(clicked.includes(index)){
            if(bestScore<score){
                setBestScore(score);
            }
            setScore(0);
            setClicked([]);
        }
        else{
            setScore(score+1);
            setClicked(c=>[...c, index]);
        }
    }

    useEffect(() => {
        const fetchAllImages = async () => {
            const images = await Promise.all(data.map((item) => fetchImage(item.url)));
            setImages(images);
        };

        if (data.length > 0) {
            fetchAllImages();
        }
    }, [data]);
    
    
    return ( <div className="game-board w-[90vw] grid grid-cols-5 gap-x-28 gap-y-10 h-[80vh]"> {images.length === data.length && data.length > 0 && data.map((item, index) => ( <Card onClick={() => handleClick(index)} key={index} name={item.name} image={images[index]} id={index + 1} /> ))} </div> );
    
}
GameBoard.propTypes={
    data:propTypes.array.isRequired,
    score: propTypes.number.isRequired,
    setScore: propTypes.func.isRequired,
    bestScore: propTypes.number.isRequired,
    setBestScore: propTypes.func.isRequired
}
export default GameBoard;