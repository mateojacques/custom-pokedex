import React from "react";

const Header = ({ setSearchQuery }) => {
  return (
    <header className="header">
      <a href="/" className="logo">
        Custom <span>Pokedex</span>
      </a>

      <form
        id="search-form"
        onSubmit={(e) => setSearchQuery(e.target[0].value)}
      >
        <input
          type="text"
          placeholder="Enter a Pokemon name..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </header>
  );
};

export default Header;
