import './App.css'
import axios from "axios";
import {useState} from "react";
// tijdelijke button maken
// Maak een request naar de backend om alle posts op te halen
function App() {
const [result,setResult]= useState([])
    async function posts(){

        try {

            const result1 = await axios.get('http://localhost:3000/posts');
            debugger;
            setResult(result1);
            console.log(result);
        } catch (e) {
            console.error(e);
        }
    }

  return (
    <>
      <button type= 'button' onClick={posts}>Alle posts</button>
    </>
  )
}

export default App
