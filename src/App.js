import React, { useState, useEffect, Fragment } from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import axios from 'axios';
import Informacion from './components/Informacion';

function App() {

   const [ artista, setArtista ] = useState('');
   const [ letra, setLetra ] = useState([]);
   const [ info, setInfo ] = useState({});

   //metodo para consultar la api de letras
   const obtenerLetras = async busqueda => {
      const url = `https://api.lyrics.ovh/v1/${busqueda.artista}/${busqueda.cancion}`;

      let resultado = await axios(url);

      setArtista(busqueda.artista);
      setLetra(resultado.data.lyrics);
   }

   //metodo para consultar la api de artista
   const obtenerInfo = async () => {
      if (artista) {
         const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
         let resultado = await axios(url);
         setInfo(resultado.data.artists[0]);
      }
   }

   useEffect(() => {
      obtenerInfo();
   }, [artista])

   return (
      <Fragment>
         <Formulario 
            obtenerLetras={obtenerLetras}
         />

         <div className="container mt-5">
            <div className="row">
               <div className="col-md-6">
                  <Informacion 
                     info={info}
                  />
               </div>
               <div className="col-md-6">
                  <Cancion 
                     letra={letra}
                  />
               </div>
            </div>
         </div>
      </Fragment>
   );
}

export default App;

