import React from "react";
import PokemonCard from "./PokemonCard";
import { Puff } from "react-loader-spinner";

const PokemonsGallery = ({ pokemons, setSearchUrl, pokemonsAPICallData }) => {
  return (
    <section id="pokemons">
      <div className={`pokemons__container ${pokemons.length === 0 && 'is_empty'}`}>
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemonUrl={pokemon.url} />
          ))
        ) : (
          <Puff color="#ebebeb" height={50} width={50} />
        )}
      </div>

      <div className="pokemons__controls">
        {pokemonsAPICallData.previous ? (
          <button
            className="button prev-btn"
            onClick={() => setSearchUrl(pokemonsAPICallData.previous)}
          >
            {"<"}
          </button>
        ) : (
          ""
        )}
        {pokemonsAPICallData.next ? (
          <button
            className="button next-btn"
            onClick={() => setSearchUrl(pokemonsAPICallData.next)}
          >
            {">"}
          </button>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default PokemonsGallery;
