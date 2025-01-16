import { useState, useEffect } from "react";
import GameBoard from "./GameBoard";

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fetchData(setNames, setUrls) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${getRandomNumber(1, 100)}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      const data = await response.json();
      data.results.forEach((pokemon) => {
        setNames((n) => [...n, pokemon.name]);
        setUrls((u) => [...u, pokemon.url]);
      });
    }
  } catch (error) {
    console.error(
      "There has been a problem with your fetch operation:",
      error
    );
  }
}

function App() {
  const [names, setNames] = useState([]);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetchData(setNames, setUrls);

    return () => {
      setNames([]);
      setUrls([]);
    };
  }, []);

  return (
    <body className="min-w-full min-h-screen bg-slate-700 flex flex-col justify-center items-center pr-16">
      <h1 className="header absolute top-0 text-center text-6xl font-bold">Pokemon Guessing Game</h1>
      <p className="absolute top-5 right-10 text-center text-lg font-bold space-x-10">
        <span>Score:{}</span>
        <span>Best Score:{}</span>
      </p>
      <GameBoard names={names} urls={urls} />
    </body>
  );
}

export default App;
