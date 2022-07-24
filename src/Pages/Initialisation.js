import {
  Container,
  Box,
  Center,
  Grid,
  Divider,
  Text,
  Heading,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import radarpic from '../Radar Gimbal Picture.jpg';
import logo from '../Thales_Logo.svg.png';
import InitValue from '../Components/Init/InitValue';
import { useIntervalWhen } from 'rooks';
import axios from 'axios';
import PastUserInputs from '../Components/Init/PastUserInputs';

const Initialisation = () => {
  const [getData, setGetData] = useState([]);
  let [delay, setDelay] = useState(1000);

  // GET User Inputs with Polling
  useIntervalWhen(async () => {
    await axios
      .get('http://192.168.4.39:5000/radars')
      .then(response => {
        const items = response.data.items;
        setGetData(items);
        console.log('SUCCESS', response);
      })
      .catch(error => {
        console.log(error);
      });
  }, delay);

  return (
    <Container
      maxW="10xl"
      centerContent
      style={{
        backgroundColor: 'lightblue',
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
      }}
    >
      <Box p={3} w="50%" m="40px 0 15px 0">
        <img src={logo} alt="Thales Logo" />
      </Box>

      {/* <Box p={3} w="50%" m="40px 0 15px 0">
        <img src={radarpic} width={50} height={50} alt="Radar" />
      </Box> */}

      <Divider orientation="horizontal" />

      <Center>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={10}
          w="300%"
          m="40px 0 15px 0"
        >
          <Box
            d="flex"
            justifyContent="right"
            p={3}
            w="100%"
            m="0px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
            boxShadow="md"
            boxSize="xl"
            bg="white"
          >
            <Heading as="h2" size="xl">
              Gimbal Initialisation
            </Heading>
            <Text>Please set the gimbal initialisation parameters.</Text>
            <Divider orientation="horizontal" />

            <InitValue />
          </Box>

          <Box
            d="flex"
            justifyContent="right"
            p={3}
            w="100%"
            m="0px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
            boxShadow="md"
            boxSize="xl"
            bg="white"
          >
            <Heading as="h2" size="xl">
              Past Initialisation Settings
            </Heading>
            <Text>
              These values are the past 5 initialisation settings used.
            </Text>
            <Divider orientation="horizontal" />

            {getData.map(item => {
              console.log(item);
              return (
                <div> Past User Inputs </div>
                // <PastUserInputs
                //   scanrate={item.scan_rateip}
                //   leftlimit={item.left_limitip}
                //   rightlimit={item.right_limitip}
                //   eleangle={item.eleangleip}
                // />
              );
            })}
          </Box>
        </Grid>
      </Center>
    </Container>
  );
};

export default Initialisation;
