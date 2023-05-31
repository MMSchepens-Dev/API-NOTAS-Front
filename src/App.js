import './App.css';
import {useState} from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const[titulo,setTitulo]=useState("");
  const[autor,setAutor]=useState("");
  const[nota,setNota]=useState("");
  const[fecha,setFecha]=useState("");
  const[id,setId]=useState();

  const[editar,setEditar]=useState(false);

  const [listaNotas,setNotas]= useState([]) //[crea lista vacia para guardar las notas al traerlas]


  //funcion "guardar" del boton del form para guardar nota 
  
  const guardar = ()=>{
    Axios.post("https://sitio-notas.onrender.com/notas",{ //http://localhost:3001/crear
      titulo:titulo,
      autor:autor,
      nota:nota,
      fecha:fecha
    })
    .then((res)=>{
      alert("Nota agregada");
      getNotas();
      cancelar();
    });
  }

  const update = ()=>{
    Axios.put("https://sitio-notas.onrender.com/update",{ //http://localhost:3001/update
      id:id,
      titulo:titulo,
      autor:autor,
      nota:nota,
      fecha:fecha
    })
    .then((res)=>{
      getNotas();
      cancelar();
      alert("Nota editada");
    });
  }
  

  const eliminarNota = (id)=>{

    let alerta = `Estas seguro de que queres borrar la nota ${id}?`;
    if (window.confirm(alerta) == true) {
      Axios.delete(`https://sitio-notas.onrender.com/delete/${id}`).then(()=>{//http://localhost:3001/delete/${id}
        getNotas();
        cancelar();
        alert("Nota eliminada.")
    })
    }else{
      alert("Eliminacion cancelada.")
    }
  }

  const cancelar = ()=>{
    setTitulo("");
    setAutor("");
    setNota("");
    setFecha("");
    setEditar(false);
  }

  const editarNota = (val)=>{
      setEditar(true);

      setTitulo(val.titulo);
      setAutor(val.autor);
      setNota(val.nota);
      setFecha(val.fecha);
      setId(val.id);
  }

  //funcion para traer info de la DB
  const getNotas = ()=>{
    Axios.get("https://sitio-notas.onrender.com/notas").then((res)=>{setNotas(res.data)}); //http://localhost:3001/notas
  }

  return (
  <div className="container"> 
    <div className="card text-center">
      <div className="card-header">
        <h2>Sitio Notas</h2>
      </div>
    <div className="card-body">
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Titulo: </span>
        <input type="text" 
        onChange={(event)=>{
          setTitulo(event.target.value);
        }} className="form-control" value={titulo} placeholder="Titulo de la nota" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
  
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Autor: </span>
         <input type="text" 
          onChange={(event)=>{
          setAutor(event.target.value);
          }} className="form-control" value={autor} placeholder="Su nombre" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Nota: </span>
        <input type="text" 
         onChange={(event)=>{
         setNota(event.target.value);
         }} className="form-control" value={nota} placeholder="Escriba su nota aquí..." aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Fecha: </span>
        <input type="date" 
         onChange={(event)=>{
         setFecha(event.target.value);
         }} className="form-control" value={fecha} placeholder="" aria-describedby="basic-addon1"/>
      </div>
    </div>

    <div className="card-footer text-body-secondary">

      {
        editar? 
        <div>
         <button className='boton warning' onClick={update}>Actualizar</button> 
         <button className='boton' onClick={cancelar}>Cancelar</button>
        </div>
        :<button className='boton' onClick={guardar}>Guardar Nota</button>
      }
      
      <br></br>
      <button className='boton' onClick={getNotas}>Ver Notas</button>
    </div>
  </div>

  <table className="table table-striped">

      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody>
        {
          listaNotas.map((val,key)=>{
            return <tr key={val.id}>
                      <th>{val.id}</th>
                      <td>{val.fecha}</td>
                      <td>{val.autor}</td>
                      <td>{val.titulo}</td>
                      <td>{val.nota}</td>
                      <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          
                          <button type="button"
                          onClick={()=>{
                            editarNota(val);
                          }} className="btn btn-info">Editar</button>

                          <button type="button" 
                          onClick={()=>{
                            eliminarNota(val.id);
                          }} className="btn btn-danger">Eliminar</button>
                        </div>
                      </td>
                    </tr>
          })
        }
        
    </tbody>
  </table>
  </div>
  );
}

export default App;
