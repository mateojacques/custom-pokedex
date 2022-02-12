import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    let isMounted = true;

    async function fetchSinglePokemon() {
      await axios
        .get(pokemonUrl)
        .then((res) => {
          if (isMounted) setPokemon(res.data);
        })
        .catch((err) => console.log(err));
    }

    fetchSinglePokemon();

    return () => {
      isMounted = false;
    };
  }, []); //eslint-disable-line

  return (
    <>
      {pokemon.sprites ? (
        <article
          className="pokemon-card"
          pokemontype={pokemon.types[0].type.name}
        >
          <a href={`/pokemon/${pokemon.name}`}>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="pokemon-card__img"
            />
          </a>
          <div className="pokemon-card__info-wrapper">
            <p className="pokemon-card__id">#{pokemon.id}</p>
            <Link to={`/pokemon/${pokemon.name}`} className="pokemon-card__name">{pokemon.name}</Link>
          </div>
        </article>
      ) : (
        ""
      )}
    </>
  );
};

export default PokemonCard;
