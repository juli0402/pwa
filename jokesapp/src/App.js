import React, { useEffect, useState } from "react";
import card from "./card";
import "./App.css";

function App() {
  const [marvelCharacters, setCharacters] = useState();
  useEffect(() => {
    const url = `https://gateway.marvel.com/v1/public/characters/?page=1`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let info = data.results;
        setCharacters(info);
        localStorage.setItem("characters", info);
      });
  }, []);

  if (marvelCharacters) {
    let elements = marvelCharacters.map((character) => <card id={character.id} />);
    return (
      <div className="App">
        <header className="App-header">
          {elements}
        </header>
      </div>
    );
  }
}

export default App;
