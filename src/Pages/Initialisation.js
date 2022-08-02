import {
  Container,
  Box,
  Center,
  Divider,
  Text,
  Heading,
  Flex,
  Image,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import logo from '../spire.png';
import InitValue from '../Components/Init/InitValue';
import { useIntervalWhen } from 'rooks';
import axios from 'axios';
import PastUserInputs from '../Components/Init/PastUserInputs';

const Initialisation = () => {
  const [getRadars, setGetRadars] = useState([]);
  let [delay, setDelay] = useState(1000);

  const scanrate = 'scan_rateip';
  const leftlimit = 'left_limitip';
  const rightlimit = 'right_limitip';
  const eleangle = 'eleangleip';

  // GET Past 5 User Inputs with Polling
  useIntervalWhen(async () => {
    await axios
      .get('http://192.168.4.39:5000/radars')
      .then(response => {
        const radars = response.data.radars;
        setGetRadars(radars);
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
      <Box p={3} w="50%" m="0px 0 15px 0">
        <Image src={logo} alt="Thales Logo" />
      </Box>

      <Divider orientation="horizontal" />

      <Center>
        <Flex w="100%" gap="6" direction={{ base: 'column', md: 'row' }}>
          <Box
            d="flex"
            justifyContent="right"
            p={3}
            w="100%"
            m="10px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
            boxShadow="lg"
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
            m="10px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
            boxShadow="lg"
            boxSize="xl"
            bg="white"
          >
            <Heading as="h2" size="xl">
              Past Initialisation Settings
            </Heading>
            <Text>
              These values are the past 2 initialisation settings used.
            </Text>
            <Divider orientation="horizontal" />

            {getRadars.map((item, index) => {
              console.log(item);
              return (
                <PastUserInputs
                  number={index + 1}
                  scanrate={item[scanrate]}
                  leftlimit={item[leftlimit]}
                  rightlimit={item[rightlimit]}
                  eleangle={item[eleangle]}
                />
              );
            })}
          </Box>
        </Flex>
      </Center>
    </Container>
  );
};

export default Initialisation;
