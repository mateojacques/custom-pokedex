import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Puff } from "react-loader-spinner";

const SinglePokemonView = () => {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);

  async function fetchSinglePokemon(id) {
    await axios
      .get(
        `${
          id
            ? `https://pokeapi.co/api/v2/pokemon/${id}`
            : `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        }`
      )
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchSinglePokemon();
  }, []);

  return (
    <section id="pokemon-details">
      <a href="/" className="button home-btn">
        <img src="https://img.icons8.com/material-outlined/24/000000/home--v2.png" />
      </a>
      {pokemon ? (
        <article
          className="pokemon-details__container pokemon-card"
          pokemontype={pokemon.types[0].type.name}
        >
          <div className="pokemon-details__header pokemon-card__info-wrapper">
            <h1 className="pokemon-details__title">{pokemon.name}</h1>
          </div>
          <div className="pokemon-details__info">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
            />
            <div className="pokemon-details__info__table">
              <div>
                <h4>Height</h4>
                <p>{pokemon.height}''</p>
              </div>
              <div>
                <h4>Weight</h4>
                <p>{pokemon.weight}kg</p>
              </div>
              <div>
                <h4>Type</h4>
                <p>{pokemon.types[0].type.name}</p>
              </div>
              <div>
                <h4>Base Exp</h4>
                <p>{pokemon.base_experience}</p>
              </div>
              <div>
                <h4>Species</h4>
                <p>{pokemon.species.name}</p>
              </div>
              <div>
                <h4>Special move</h4>
                <p>{pokemon.moves[0].move.name}</p>
              </div>
            </div>
          </div>
        </article>
      ) : (
        <Puff color="#ebebeb" height={50} width={50} />
      )}

      <div className="pokemon-details__controls">
        {pokemon && pokemon.id !== 1 && (
          <button
            className="button prev-btn"
            onClick={() => fetchSinglePokemon(pokemon.id - 1)}
          >
            {"<"}
          </button>
        )}
        {pokemon && pokemon.id !== 1118 && (
          <button
            className="button next-btn"
            onClick={() => fetchSinglePokemon(pokemon.id + 1)}
          >
            {">"}
          </button>
        )}
      </div>
    </section>
  );
};

export default SinglePokemonView;
