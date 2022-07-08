import {
  Container,
  Box,
  Center,
  Grid,
  Divider,
  Text,
  Spacer,
  Heading,
} from '@chakra-ui/react';
import React from 'react';
import radarpic from '../Radar Gimbal Picture.jpg';
import logo from '../Thales_Logo.svg.png';
import InitValue from '../Components/Init/InitValue';

const Initialisation = () => {
  return (
    <Container maxW="8xl" centerContent>
      <Box p={3} w="50%" m="40px 0 15px 0">
        <img src={logo} alt="Thales Logo" />
      </Box>

      <Divider orientation="horizontal" />

      <Center>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={0}
          w="300%"
          m="40px 0 15px 0"
        >
          <Box boxSize="sm">
            <img src={radarpic} alt="Radar" />
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
          >
            <Heading as="h2" size="xl">
              Gimbal Initialisation
            </Heading>
            <Text>Please set the gimbal initialisation parameters.</Text>
            <Divider orientation="horizontal" />

            <InitValue />
          </Box>
        </Grid>
      </Center>
    </Container>
  );
};

export default Initialisation;
