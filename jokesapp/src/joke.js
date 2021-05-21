import { useEffect, useState } from "react";

const Joke = () => {
  const [joke, setJoke] = useState();

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("joke") === null) setJoke("Loading...");
      else setJoke(localStorage.getItem("joke"));
    }

    fetch(
      "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=6e4bb7752b5ce5f9dc18439e08ad03b0&hash=94db9c9fbe60d225ae6c05e8fe0cb19d"
    )
      .then((res) => res.json())
      .then((res) => {
        setJoke(res.data.results);
        localStorage.setItem("joke", "Revisa tu conexión a internet.");
        console.log("Response", res.data.results);
      });
  }, []);

  return (
    <div>
      <h1>Personajes de Marvel</h1>
      <div>
        {Array.isArray(joke) ? (
          joke.map((personaje) => (
            <div>
              <h4>Nombre: {personaje.name}</h4>
              <img
                alt="marvel"
                src={personaje.thumbnail.path + "." + personaje.thumbnail.extension}
                height="auto"
                width="30%"
              />
              {personaje.description !== "" ? (
                <p style={{ fontSize: "medium" }}> Descripción: {personaje.description}</p>
              ) : (
                <p style={{ fontSize: "medium" }}>No tiene descripción</p>
              )}
              <p style={{ fontSize: "medium" }}>Número de Cómics Disponibles: {personaje.comics.available}</p>
            </div>
          ))
        ) : joke !== null ? (
          <p style={{ fontSize: "medium" }}>{joke}</p>
        ) : (
          <>Cargando...</>
        )}
      </div>
    </div>
  );
};
export default Joke;
