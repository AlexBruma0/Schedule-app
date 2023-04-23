import "./App.css";
import { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import { Input } from "@chakra-ui/react";
const remote = "https://myproject-382821.uc.r.appspot.com/";

//const local = "http://localhost:8081/"
var uri = remote;
function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({ start: "", end: "", date: "" });

  const get = async () => {
    const response = await fetch(uri);
    const json = await response.json();
    console.log(json);
    setItems(json.result);
  };

  useEffect(() => {
    get();
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
    setItem({ start: "", end: "", date: "" });
  };
  const Delete = async () => {
    await fetch(uri, {
      method: "DELETE",
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <Heading ml = '-23%'>Add Hours</Heading>
        <Box ml = '-4%'>
        <form onSubmit={post}>
          <Box display="flex" m="7%">
            <Input
              placeholder="start"
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
              placeholder="end"
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
        
        {/* <Button colorScheme='white' variant='outline'onClick= {Delete}>
          delete all
        </Button> */}
        <Heading ml = '-23%'>Data table</Heading>
        <TableContainer>
          <Table variant="striped" colorScheme="blackAlpha" size="md">
            <Thead color="red">
              <Tr color="red" fontSize="md">
                <Th>Start</Th>
                <Th>End</Th>
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
                    <Td>8</Td>

                    <Td>{item.date}</Td>
                    <Td>
                      <Button colorScheme="linkedin ">❌</Button>
                    </Td>
                    <Td>
                      <Button colorScheme="linkedin ">✏️</Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Heading ml = '-27.5%'>Total</Heading>
        <TableContainer ml = '-23%'>
          <Table variant="striped" colorScheme="blackAlpha" size="md">
            <Thead color="red">
              <Tr color="red" fontSize="md">
                <Th>Hours</Th>
                <Th>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr color="gray.400" fontSize="md">
                <Td>40</Td>
                <Td>2000</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </header>
    </div>
  );
}

export default App;
