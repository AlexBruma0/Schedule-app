import './App.css';
import {useState, useEffect} from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Stack, StackDivider, Box, Text } from '@chakra-ui/react'


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

  useEffect(() =>{
    get()
  }
  )

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
    <div className="App" >
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
        <Button colorScheme='white' variant='outline'onClick= {Delete}>
          delete all
        </Button>
        <Card w='30%'>

  <CardBody bg='gray.600' borderRadius = 'md' color='white' w >
    <Stack divider={<StackDivider />} spacing='4'>
    {items.map((item,i) =>{
            return(
              <Box>
              <Heading size='xs' textTransform='uppercase' >
                {item.date}
              </Heading>
              <Box display='flex'>

                <Box pt='2' fontSize='sm' float="left" display='flex'>
                  <Text color='gray.400'>Start:</Text>{item.start}
                </Box>
                
                <Box pt='2' fontSize='sm' ml='80% ' display='flex' position='absolute'>
                < Text color='gray.400'>End:</Text> {item.end} 
                </Box>
              </Box>


            </Box>
            )
            
          })}
   
    </Stack>
  </CardBody>
</Card>

      </header>
    </div>
  );
}

export default App;
