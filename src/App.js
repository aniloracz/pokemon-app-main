import React, { useState } from "react";
import PokemonCard from "./components/PokemonCard";
import FormularioIngreso from "./components/FormularioIngreso";
import axios from "axios";

import "./App.scss";

function App() {
  let pokémon = [
    { id: 1, name: "Bulbasaur", types: ["poison", "grass"] },
    { id: 5, name: "Charmeleon", types: ["fire"] },
    { id: 9, name: "Blastoise", types: ["water"] },
    { id: 12, name: "Butterfree", types: ["bug", "flying"] },
    { id: 16, name: "Pidgey", types: ["normal", "flying"] },
    { id: 23, name: "Ekans", types: ["poison"] },
    { id: 24, name: "Arbok", types: ["poison"] },
    { id: 25, name: "Pikachu", types: ["electric"] },
    { id: 37, name: "Vulpix", types: ["fire"] },
    { id: 52, name: "Meowth", types: ["normal"] },
    { id: 63, name: "Abra", types: ["psychic"] },
    { id: 67, name: "Machamp", types: ["fighting"] },
    { id: 72, name: "Tentacool", types: ["water", "poison"] },
    { id: 74, name: "Geodude", types: ["rock", "ground"] },
    { id: 87, name: "Dewgong", types: ["water", "ice"] },
    { id: 98, name: "Krabby", types: ["water"] },
    { id: 115, name: "Kangaskhan", types: ["normal"] },
    { id: 122, name: "Mr. Mime", types: ["psychic"] },
    { id: 133, name: "Eevee", types: ["normal"] },
    { id: 144, name: "Articuno", types: ["ice", "flying"] },
    { id: 145, name: "Zapdos", types: ["electric", "flying"] },
    { id: 146, name: "Moltres", types: ["fire", "flying"] },
    { id: 148, name: "Dragonair", types: ["dragon"] },
  ];

  let tipos = [
    { types: "poison", color: "#a5c383" },
    { types: "grass", color: "#a5c383" },
    { types: "fire", color: "#ca4a40" },
    { types: "water", color: "#3f51b5" },
    { types: "bug", color: "white" },
    { types: "flying", color: "white" },
    { types: "normal", color: "white" },
    { types: "electric", color: "yellow" },
    { types: "psychic", color: "#abcede" },
    { types: "fighting", color: "brown" },
    { types: "rock", color: "brown" },
    { types: "ground", color: "brown" },
    { types: "ice", color: "#3f51b5" },
  ];
  let uniqid = require("uniqid");

  // State para un Pokemon
  const [contentpoke, setContentpoke] = useState([]);

  const [estadopoke, setEstadopoke] = useState(false);

  const [cartasPoke1, setCartasPoke1] = useState([]);
  const [cartasPoke2, setCartasPoke2] = useState([]);

  /* useEffect(()=> {
     fetchData();
 }, [data]);*/

  // page will reload whenever data is updated.

  const [newPokemon, setNewPokemon] = useState({
    id: "",
    name: "",
    types: "",
  });

  const guardarPokemon = () => {
    let objetoPokemon = {
      id: parseInt(newPokemon.id),
      name: newPokemon.name,
      types: newPokemon.types.split(","),
    };
    pokémon.push(objetoPokemon);
    //manejo de api
    //
    /* const api = axios
       .get(`https://pokeapi.co/api/v2/pokemon/${objetoPokemon.id}`)
       .then((response) => {
         console.log(response);
       });*/
  };
  /*  useEffect(() => {
      let mounted = true;
      getList()
        .then(items => {
          if(mounted) {
            setList(items)
          }
        })
      return () => mounted = false;*/

  const repartirPokemon = () => {
    //    useEffect(() => {
    //controlar pokemon repetidos para un jugador.
    //890 pokemones
    const listaPokemonesId = [];
    const listaPokemonCards = [];
    for (let i = 0; i < 10; i++) {
      listaPokemonesId.push(Math.floor(Math.random() * 890));
    }
    listaPokemonesId.map((pokeid) => {
      const api = axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokeid}`)
        .then((response) => {
          const tipos = response.data.types.map((item) => item.type.name);
          listaPokemonCards.push({
            id: response.data.id,
            name: response.data.name,
            types: tipos,
          });
          console.log(tipos.toString());
          if (listaPokemonCards.length === 10) {
            setCartasPoke1(listaPokemonCards.slice(0, 5)); // ACA ESTABA EL ERROR
            setCartasPoke2(listaPokemonCards.slice(5, 10));
          }
        });
    });
    //  }, [])
  };

  let poke = {
    id: contentpoke[0],
    name: contentpoke[1],
    tipo: contentpoke[2],
    bg: contentpoke[3],
    url: contentpoke[4],
  };

  return (
    <>
      {estadopoke ? (
        <div className="PokeContainer__card-select">
          <h3>
            {poke.name} Nº {poke.id}
          </h3>
          <div
            className={`PokeContainer__card-circle`}
            style={{ background: poke.bg }}
          >
            <img src={poke.url} alt={poke.name} />
          </div>
          <h5>Tipo: {poke.tipo}</h5>
        </div>
      ) : null}

      <div className="PokeContainer">
        <div className="Jugador1 PokeContainer">
          Jugador1
          {cartasPoke1.map((unPokemon) => (
            <PokemonCard
              key={uniqid()}
              id={unPokemon.id}
              name={unPokemon.name}
              types={unPokemon.types.toString()}
              bg={tipos
                .filter((unTipo) => unTipo.types === unPokemon.types[0])
                .map((tipoElegido) => tipoElegido.color)}
              unPokemon={unPokemon}
              selectPokemon={
                // Se manda una props que contiene una funcion ( Arrow function )
                (contentpoke) => setContentpoke(contentpoke)
              }
              onOff={(estadopoke) => setEstadopoke(estadopoke)}
            />
          ))}
        </div>
        <button onClick={repartirPokemon}>Repartir Cartas</button>

        <div className="Jugador2 PokeContainer">
          Jugador2
          {cartasPoke2.map((unPokemon) => (
            <PokemonCard
              key={uniqid()}
              id={unPokemon.id}
              name={unPokemon.name}
              types={unPokemon.types.toString()}
              bg={tipos
                .filter((unTipo) => unTipo.types === unPokemon.types[0])
                .map((tipoElegido) => tipoElegido.color)}
              unPokemon={unPokemon}
              selectPokemon={
                // Se manda una props que contiene una funcion ( Arrow function )
                (contentpoke) => setContentpoke(contentpoke)
              }
              onOff={(estadopoke) => setEstadopoke(estadopoke)}
            />
          ))}
        </div>
        {/* <FormularioIngreso
          guardarPokemon={guardarPokemon}
          newPokemon={newPokemon}
          setNewPokemon={setNewPokemon}
        /> */}
        {console.log(cartasPoke1)}
      </div>
    </>
  );
}

export default App;
