import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [personajes, setPersonajes] = useState([])
  const [persVivos, setPersVivos] = useState([])
  const [persMuertos, setPersMuertos] = useState([])
  const [persDesconocido, setPersDesconocido] = useState([])

  const obtenerPersonajes = async () => {
    const response = await axios.get('https://rickandmortyapi.com/api/character')
    setPersonajes(response.data.results)
  }

  // const personajesVivos = () => {
  //   setPersMuertos([])
  //   setPersDesconocido([])
  //   const vivos = personajes.filter(personaje => personaje.status === "Alive")
  //   setPersVivos(vivos)
  // }

  const statusPersonaje = (estado) => {
    if(estado === "Alive"){
      setPersMuertos([])
      setPersDesconocido([])
      const vivos = personajes.filter(personaje => personaje.status === "Alive")
      setPersVivos(vivos)
    } else if (estado === "Dead") {
      setPersVivos([])
      setPersDesconocido([])
      const muertos = personajes.filter(personaje => personaje.status === "Dead")
      setPersMuertos(muertos)
    } else {
      setPersMuertos([])
      setPersVivos([])
      const desconocidos = personajes.filter(personaje => personaje.status === "unknown")
      setPersDesconocido(desconocidos)
    }
  }

  // const personajesMuertos = () => {
  //   setPersVivos([])
  //   setPersDesconocido([])
  //   const muertos = personajes.filter(personaje => personaje.status === "Dead")
  //   setPersMuertos(muertos)
  // }

  // const personajesDesconocidos = () => {
  //   setPersMuertos([])
  //   setPersVivos([])
  //   const desconocidos = personajes.filter(personaje => personaje.status === "unknown")
  //   setPersDesconocido(desconocidos)
  // }

  const verTodos = () => {
    setPersMuertos([])
    setPersVivos([])
    setPersDesconocido([])
  }

  useEffect(() => {
    obtenerPersonajes()
  }, [])

  // TAREA: REALIZAR EL BUSCADOR!!!!

  return (
    <div className="container">
      <h1>Rick and Morty</h1>
      <input type="text" className="form-control mb-3 w-50" placeholder='Busca tu personaje' />
      <div className='d-flex mb-3'>
        <button className='btn btn-primary me-3' onClick={verTodos}>Ver todos</button>
        <button className='btn btn-primary me-3' onClick={() => statusPersonaje('Alive')}>Vivos</button>
        <button className='btn btn-primary me-3' onClick={() => statusPersonaje('Dead')}>Muertos</button>
        <button className='btn btn-primary' onClick={() => statusPersonaje('unknown')}>Desconocido</button>
      </div>

      {
        persVivos.length > 0  ?
          persVivos.map(vivo => (
            <p key={vivo.id}>{vivo.name} - {vivo.status}</p>
          ))
        :
        persMuertos.length > 0 ?
          persMuertos.map(muerto => (
            <p key={muerto.id}>{muerto.name} - {muerto.status}</p>
          ))
        :
        persDesconocido.length > 0 ?
          persDesconocido.map(desconocido => (
            <p key={desconocido.id}>{desconocido.name} - {desconocido.status}</p>
          ))
        :
        personajes.length > 0 ?
          personajes.map(personaje => (
            <p key={personaje.id}>{personaje.name} - {personaje.status}</p>
          ))
        :
          <p>Cargando...</p>
      }
    </div>
  );
}

export default App;
