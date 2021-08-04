import React,{useState} from "react";


const PokemonCard = ({id,name,types,bg,selectPokemon,onOff}) => {

  const [activo,setActivo]= useState('Inactivo');
  const [background,setBackground]= useState('grey');

  const PokeStyles = {
    backgroundColor: "" +bg+ ""
  };

  const pokeImgname =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/";
  const pokeImgNumber =id;
  const pokeImg = pokeImgname + pokeImgNumber + ".png";
 

  const handleSwitch = () =>{

    if( activo === "Activo" ) {
      setActivo('Inactivo')
      setBackground('grey')
    
    } else {
      setActivo('Activo')
      setBackground('')

    }

    activePoke()
    // console.log('objetos-->',objetos)
   
  }

  const activePoke = () =>{

    let objetos =[id,name,types,bg,pokeImg]
    selectPokemon(objetos);
    onOff(true)

  }


  return (
    <div className="PokeContainer__row-4">
      <div className={`PokeContainer__card ${background}`}>
        <h3>{name} Nº {id}</h3>
        
        <div className={`PokeContainer__card-circle ${background}`} style={PokeStyles}>
          <img src={pokeImg} alt={name}/>
        </div>
        <h5>Tipo: {types}</h5>
        <button className={`on${activo}`} onClick={handleSwitch}>{activo}</button>

      </div>
    </div>
  );
};

export default PokemonCard;
