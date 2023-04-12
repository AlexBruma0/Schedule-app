import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'

const remote = "https://myproject-382821.uc.r.appspot.com/"
const local = "http://localhost:8081/"
var uri = remote
function App() {
  const [items, setItems] = useState([])
  const [item,setItem] = useState({start: "", end: "", date: ""})

  const get = async() =>{
    const response = await fetch(uri)
    const json = await response.json()
    console.log(json)
    setItems(json.result)
  }
  const post = async(e) =>{
    e.preventDefault()
    console.log(item)
    await fetch(uri, {
      method: "POST", 
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({
        start: item.start,
        end: item.end,
        date: item.date,
      })
    })
    setItem({start: "", end: "", date: ""})
  } 
  const Delete = async() =>{
    await fetch(uri,{
      method: "DELETE",})
  }
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={post}>
          <label>Start:</label>
          <input
          onChange={(e) =>{
            setItem({start: e.target.value, end: item.end, date: item.date})
            console.log(item)
          }}
          ></input>
          <label>End:</label>
          <input
          onChange={(e) =>{
            setItem({start: item.start, end: e.target.value, date: item.date})
          }}
          ></input>
          <label>Date:</label>
          <input
          onChange={(e) =>{
            setItem({start: item.start, end: item.end, date: e.target.value})
          }}
          ></input>
          <button type='submit'>Add</button>
        </form>
        <button onClick= {get}>
          get
        </button>
        <button onClick= {Delete}>
          delete all
        </button>
        <ul>
          {items.map((item,i) =>{
            return(
              <li key={i}>Start: {item.start} End: {item.end} Date: {item.date} </li>
            )
            
          })}
        </ul>

      </header>
    </div>
  );
}

export default App;
