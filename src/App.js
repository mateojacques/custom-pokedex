import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  Header,
  PokemonsGallery,
  SinglePokemonView,
  ThemeSwitch,
} from "./components";

function App() {
  const [pokemonsFullList, setPokemonsFullList] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsAPICallData, setPokemonsAPICallData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUrl, setSearchUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [themeSwitchOpen, setThemeSwitchOpen] = useState(false);

  function setThemeColors(
    themeName,
    primary,
    secondary,
    background = "#fff",
    text = "#222"
  ) {
    const root = document.documentElement;

    root.style.setProperty("--primaryColor", primary);
    root.style.setProperty("--secondaryColor", secondary);
    root.style.setProperty("--backgroundColor", background);
    root.style.setProperty("--textColor", text);

    localStorage.setItem("theme", themeName);
  }

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
      //If we are in the Single Pokemon view and we try to make a search, bring us back to the homepage where the input will be autofocused on load
      const location = window.location.href;
      if (searchQuery && location.includes("/pokemon"))
        window.location.href = "/";

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

  useEffect(() => {
    // Set the current theme based on the localStorage item 'theme'
    function setUserTheme() {
      const themeName = localStorage.getItem("theme");

      if (themeName) {
        switch (themeName) {
          case "light":
            setThemeColors("light", "#222", "#ccc", "#fff", "#888");
            break;
          case "dark":
            setThemeColors("dark", "#b8b8b8", "#999", "#222", "#fff");
            break;
          case "grass":
            setThemeColors("grass", "#9bcc50", "#378e8e", "#2a513f", "#cef79f");
            break;
          case "fire":
            setThemeColors("fire", "#e53800", "#fbc204", "#5a1a09", "#fff");
            break;
          case "water":
            setThemeColors("water", "#93c8d0", "#5a9ca4", "#e9f4f5", "#000");
            break;
          case "rock":
            setThemeColors("rock", "#C0B8B8", "#867878", "#544C4C", "#fff");
            break;
          case "fairy":
            setThemeColors("fairy", "#E3ABB5", "#F5D9E2", "#fff", "#040405");
            break;
          default:
            return;
        }
      } else return;
    }

    setUserTheme();
  }, []);

  return (
    <div className="App container">
      <button
        className="theme-switch__open"
        onClick={() => {
          setThemeSwitchOpen(!themeSwitchOpen);
        }}
      >
        <i className="bi-palette"></i>
      </button>
      <ThemeSwitch isOpen={themeSwitchOpen} setThemeColors={setThemeColors} />
      <Header setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PokemonsGallery
                pokemons={pokemons}
                setSearchUrl={setSearchUrl}
                pokemonsAPICallData={pokemonsAPICallData}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
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
