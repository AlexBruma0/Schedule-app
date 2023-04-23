import './App.css';
import {useState} from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
const remote = "https://myproject-382821.uc.r.appspot.com/"
//const local = "http://localhost:8081/"
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
          <Input placeholder='start'
          onChange={(e) =>{
            setItem({start: e.target.value, end: item.end, date: item.date})
            console.log(item)
          }}
          ></Input>
          <Input placeholder='end'
          onChange={(e) =>{
            setItem({start: item.start, end: e.target.value, date: item.date})
          }}
          ></Input>
          <Input placeholder='Date'
          onChange={(e) =>{
            setItem({start: item.start, end: item.end, date: e.target.value})
          }}
          ></Input>
          <Button colorScheme='white' variant='outline' type='submit'>Add</Button>
        </form>
        <Button colorScheme='white' variant='outline'onClick= {get}>
          get
        </Button>
        <Button colorScheme='white' variant='outline'onClick= {Delete}>
          delete all
        </Button>
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
