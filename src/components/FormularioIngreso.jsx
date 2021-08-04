import React from 'react'



function FormularioIngreso({newPokemon, setNewPokemon,guardarPokemon}) {

    const handleNewPokemon = (event) =>{
        event.preventDefault();
        setNewPokemon({
            ...newPokemon,
            [event.target.name]:event.target.value
        })
    }

    const clickGuardar = (e) =>{
        e.preventDefault();
        guardarPokemon();
    }

    return (
        <div>
            <form onSubmit={clickGuardar}>
                <label htmlFor="id">id</label>
                <input type="number" name="id" placeholder="Ingresa ID"  onChange={handleNewPokemon} />
                <label htmlFor="name">Nombre</label>
                <input type="text" name="name" placeholder="Ingresa un Nombre" onChange={handleNewPokemon}/>
                <label htmlFor="types">Tipo</label>
                <input type="text" name="types" placeholder="Ingresa el Tipo de un pokemon" onChange={handleNewPokemon}/>
                <button type="submit">Guardar Pokemon</button>
            </form>
        </div>
    )
}

export default FormularioIngreso
