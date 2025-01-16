import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';
import Card from './Card';

const CARDSINROW=5;

async function fetchImage(url){
    try{
        const response=await fetch(url);
        if(!response.ok){
            throw new Error('Network repsonse during image retreival was not ok');
        }
        else{
            const data=await response.json();
            return data.sprites.front_default;
        }
    }
    catch(error){
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function GameBoard(props){
    const names=props.names;
    const urls=props.urls;
    const score=props.score;
    const setScore=props.setScore;
    const bestScore=props.bestScore;
    const setBestScore=props.setBestScore;

    const [images, setImages]=useState([]);

    const handleClick= ()=>{
        console.log("Card clicked");
        setScore(s=>s+1);
        if(score>=bestScore){
            setBestScore(_=>score);
        }
    }

    useEffect(() => {
        const fetchAllImages = async () => {
          const images = await Promise.all(urls.map((url) => fetchImage(url)));
          setImages(images); 
        };
      
        fetchAllImages();
      }, [urls]);
      
    return(
            <div className={`game-board w-[90vw] grid grid-cols-5 gap-x-28 gap-y-10 h-[80vh]`}>
            {names.map((name, index)=>(
                <Card key={index} name={name} image={images[index]}/>
            ))}
            </div>
    );
}
GameBoard.propTypes={
    names: propTypes.array.isRequired,
    urls: propTypes.array.isRequired,
    score: propTypes.number.isRequired,
    setScore: propTypes.func.isRequired,
    bestScore: propTypes.number.isRequired,
    setBestScore: propTypes.func.isRequired
}
export default GameBoard;