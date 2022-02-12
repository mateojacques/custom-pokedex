import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Header, PokemonsGallery, SinglePokemonView } from "./components";

function App() {
  const [pokemonsFullList, setPokemonsFullList] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsAPICallData, setPokemonsAPICallData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUrl, setSearchUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  useEffect(() => {
    // Fetch the pokemons from the API based on if the search URL changes
    async function fetchPokemons() {
      // Fetch the pokemons with a limit for pagination on the homepage
      await axios
        .get(searchUrl)
        .then((res) => {
          setPokemons(res.data.results);
          setPokemonsAPICallData(res.data);
        })
        .catch((err) => err);

      // Fetch the entire list of pokemons available, which will be used later to filter out by name or id on search
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=1118`)
        .then((res) => {
          setPokemonsFullList(res.data.results);
        })
        .catch((err) => err);
    }

    fetchPokemons();
  }, [searchUrl]);

  useEffect(() => {
    // Search function
    async function searchPokemons() {
      //If we are in the Single Pokemon view and we try to make a search, bring us back to the homepage
      const location = window.location.href;
      if (searchQuery && location.includes("/pokemon")) window.location.href = "http://localhost:3000";
        
      // Check and execute based on if the query is a number, a string or empty.
      // Make the correspondant API call and set the state to match the results
      if (!isNaN(searchQuery) && searchQuery > 0 && searchQuery <= 898) {
        await axios
          .get(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`)
          .then((res) =>
            setPokemons([
              {
                name: res.data.name,
                url: `https://pokeapi.co/api/v2/pokemon/${searchQuery}`,
              },
            ])
          )
          .catch((err) => err);
      } else if (isNaN(searchQuery)) {
        const updatedPokemonList = pokemonsFullList.filter((pokemon) =>
          pokemon.name.includes(searchQuery.toLowerCase())
        );
        setPokemons(updatedPokemonList);
      } else {
        axios
          .get(searchUrl)
          .then((res) => {
            setPokemons(res.data.results);
            setPokemonsAPICallData(res.data);
          })
          .catch((err) => err);
      }
    }

    searchPokemons();
  }, [searchQuery]); //eslint-disable-line

  return (
    <div className="App container">
      <Header setSearchQuery={setSearchQuery} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PokemonsGallery
                pokemons={pokemons}
                setSearchUrl={setSearchUrl}
                pokemonsAPICallData={pokemonsAPICallData}
              />
            </>
          }
        />
        <Route path="/pokemon/:pokemonName" element={<SinglePokemonView />} />
      </Routes>
    </div>
  );
}

export default App;
