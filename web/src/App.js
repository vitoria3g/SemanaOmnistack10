import React, {useState, useEffect} from 'react'; 
import api from './services/api';
import DevItem from './components/DevItem'
import DevForm from './components/DevForm';
import './global.css';
import './App.css';
import './sidebar.css';
import './main.css';


function App() { 
  
  const [devs, setDevs] = useState([]); 
  useEffect(()=>{

      async function loadDevs(){ 
            const response = await api.get('/devs'); 
            setDevs(response.data);
      }
      loadDevs();

  },[]);


  async function handAddDev(data){

    const response = await api.post('/devs',data)
    setDevs([...devs, response.data]); 
  }

  return (
      <div id="app">
          <aside>
            <strong>Cadastrar</strong>
                <DevForm onSubmit={handAddDev}/>         
          </aside>
          <main>
            <ul>
              {devs.map(dev=>(
                  <DevItem key={dev._id} dev={dev}/>                 
              ))}
            </ul>
            
          </main>
      </div>
  );
}

export default App;
