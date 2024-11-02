import { useState } from "react";
import { first151Pokemon, getFullPokedexNumber } from "../utils";

export default function SideNav(props) {
  const {
    selectedPokemon,
    setSelectedPokemon,
    handleToggleMenu,
    showSideMenu,
  } = props;

  const [searchValue, setSearchValue] = useState("");

  const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
    // if full pokedex number includes current search value, return true
    if (getFullPokedexNumber(eleIndex).includes(searchValue)) {
      return true;
    }

    // if pokemon name includes the current search value, also return true
    if (ele.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }

    // otherwise exclude value from the array
    return false;
  });

  return (
    <nav className={"" + (showSideMenu ? " open" : "")}>
      <div className={"header" + (showSideMenu ? " open" : "")}>
        <button onClick={handleToggleMenu} className="open-nav-button">
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        <h1 className="text-gradient">Pokédex</h1>
      </div>
      <input
        placeholder="e.g 006, Char..."
        value={searchValue}
        // e = event
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      {filteredPokemon.map((pokemon, pokemonIndex) => {
        const truePokedexNumber = first151Pokemon.indexOf(pokemon);

        return (
          <button
            onClick={() => {
              setSelectedPokemon(truePokedexNumber);
              handleToggleMenu();
            }}
            key={pokemonIndex}
            className={
              `nav-card ` +
              (pokemonIndex === selectedPokemon ? "nav-card-selected" : " ")
            }
          >
            <p>{getFullPokedexNumber(truePokedexNumber)}</p>
            <p>{pokemon}</p>
          </button>
        );
      })}
    </nav>
  );
}
