import { useState, useEffect } from "react";
import GameBoard from "./GameBoard";

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fetchData() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${getRandomNumber(1, 100)}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    const formattedData = result.results.map((pokemon) => ({
      name: pokemon.name,
      url: pokemon.url,
    }));
    return formattedData;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
function App(){
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const abcd = await fetchData();
      console.log("dog",abcd);
      setData(abcd);
    }
  getData();
  }, []);
  
  console.log("cat",data);


  return (
    <div className="min-w-full min-h-screen bg-slate-700 flex flex-col justify-center items-center pr-16">
      <h1 className="header absolute top-0 text-center text-6xl font-bold text-white">Pokemon Guessing Game</h1>
      <p className="absolute top-5 right-10 text-center text-lg font-bold space-x-10 text-white">
        <span>Score: {score}</span>
        <span>Best Score: {bestScore}</span>
      </p>
      <GameBoard data={data} score={score} setScore={setScore} bestScore={bestScore} setBestScore={setBestScore} />
    </div>
  );
}
export default App;
