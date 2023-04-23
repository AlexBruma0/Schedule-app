import "./App.css";
import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import {
  Heading,
  Box,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import { Input } from "@chakra-ui/react";
const remote = "https://myproject-382821.uc.r.appspot.com/";

//const local = "http://localhost:8081/"
var uri = remote;
function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({ start: "", end: "", date: "" , id: "", hours:0});

  const get = async () => {
    const response = await fetch(uri);
    const json = await response.json();
    return json.result
  };

  useEffect(() => {
    get().then((data) => {
      data.forEach(item => {
        item.hours = (Number(item.end.split(':')[0] )+12 - Number(item.start.split(':')[0])) + (Number(item.end.split(':')[1] ) - Number(item.start.split(':')[1]))/60
        console.log(item.hours)
      })
      setItems(data)
    })
    
  });

  const post = async (e) => {
    e.preventDefault();
    console.log(item);
    await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        start: item.start,
        end: item.end,
        date: item.date,
      }),
    });
    setItem({ start: "", end: "", date: "", id: "", hours:0});
  };
  const Delete = async (id) => {
    await fetch(`${uri}${id}`, {
      method: "DELETE",
    });
  };
  return (
    <div className="App">
      <Box className="App-header" border='1px'>
        <Heading float='left' textAlign='left'>Add</Heading>
        <Box  float='left'>
        <form onSubmit={post}>
          <Box display="flex" >
            <Input
              placeholder="From"
              variant="unstyled"
              colorScheme="blue"
              onChange={(e) => {
                setItem({
                  start: e.target.value,
                  end: item.end,
                  date: item.date,
                });
                console.log(item);
              }}
            ></Input>
            <Input
              placeholder="To"
              variant="unstyled"
              onChange={(e) => {
                setItem({
                  start: item.start,
                  end: e.target.value,
                  date: item.date,
                });
              }}
            ></Input>
            <Input
              placeholder="Date"
              variant="unstyled"
              onChange={(e) => {
                setItem({
                  start: item.start,
                  end: item.end,
                  date: e.target.value,
                });
              }}
            ></Input>
            <Button colorScheme="whiteAlpha" variant="unstyled" type="submit">
              ✅
            </Button>
          </Box>
        </form>
        </Box>
        

        <Heading mt = '3%' textAlign='left' >Pay period: April 24 - May 8</Heading>
        <TableContainer >
          <Table variant="striped" colorScheme="blackAlpha" size="md">
            <Thead color="red">
              <Tr color="red" fontSize="md">
                <Th>From</Th>
                <Th>To</Th>
                <Th>Hours</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item, i) => {
                return (
                  <Tr color="gray.400" fontSize="md">
                    <Td>{item.start}</Td>
                    <Td>{item.end}</Td>
                    <Td>{item.hours}</Td>

                    <Td>{item.date}</Td>
                    <Td>
                      <Button colorScheme="linkedin " onClick= {() => Delete(item._id)}
                      
                      >❌</Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Heading mt = '3%' textAlign='left'>Total</Heading>
        <TableContainer >
          <Table variant="striped" colorScheme="blackAlpha" size="md">
            <Thead color="red">
              <Tr color="red" fontSize="md">
                <Th>Hours</Th>
                <Th>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr color="gray.400" fontSize="md">
                <Td>0</Td>
                <Td>0</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      
    </div>
  );
}

export default App;
