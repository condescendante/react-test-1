import {
  Container,
  Box,
  Grid,
  Divider,
  Button,
  Heading,
  useToast,
  Center,
  HStack,
  Flex,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useIntervalWhen } from 'rooks';
import axios from 'axios';
import DashStats from '../Components/Dash/DashStats';
import UserInputs from '../Components/Dash/UserInputs';
import logo from '../Thales_Logo.svg.png';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [getData, setGetData] = useState([]);
  const [getData2, setGetData2] = useState([]);
  const navigate = useNavigate();
  let [delay, setDelay] = useState(100);

  // Sending Data
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // GET Display Data without Polling
  // useEffect(() => {
  //   const callAxios = async () => {
  //     await axios
  //       .get('http://127.0.0.1:5000/radar/1')
  //       .then(response => {
  //         const radar = response.data.radar;
  //         setGetData2(radar);
  //         console.log('SUCCESS', response);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   };
  //   callAxios();
  // }, []);

  // GET User Inputs with Polling
  useIntervalWhen(async () => {
    await axios
      .get('http://192.168.4.39:5000/items')
      .then(response => {
        const items = response.data.items;
        setGetData(items);
        console.log('SUCCESS', response);
      })
      .catch(error => {
        console.log(error);
      });
    await axios
      .get('http://192.168.4.39:5000/radar/1')
      .then(response => {
        const radar = response.data.radar;
        setGetData2(radar);
        console.log('SUCCESS', response);
      })
      .catch(error => {
        console.log(error);
      });
  }, delay);

  const submitStopHandler = async () => {
    // POST Trigger Stop (ESP32)
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      axios.post(
        'http://192.168.4.39:5000/publishparameter',
        {
          topic: 'IP',
          msg: JSON.stringify({
            triggerip: 0,
          }),
        },
        config
      );
      toast({
        title: 'Gimbal Stopped',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'bottom',
      });

      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: error.response.data.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  const submitStartHandler = async () => {
    // POST Trigger Stop (ESP32)
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      axios.post(
        'http://192.168.4.39:5000/publishparameter',
        {
          topic: 'IP',
          msg: JSON.stringify({
            triggerip: 1,
          }),
        },
        config
      );
      toast({
        title: 'Gimbal Started',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'bottom',
      });

      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: error.response.data.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  const submitChangeSettingsHandler = async () => {
    // POST Trigger Stop (ESP32)
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      axios.post(
        'http://192.168.4.39:5000/publishparameter',
        {
          topic: 'IP',
          msg: JSON.stringify({
            triggerip: 0,
          }),
        },
        config
      );
      toast({
        title: 'Gimbal Stopped',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'bottom',
      });

      // Navigate back to init page
      navigate('../init', { replace: true });

      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: error.response.data.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  // Dashboard Page Design
  if (getData.length > 0) {
    return getData.map((item, index) => {
      console.log(item);
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

          <Divider orientation="horizontal" />

          <Box
            d="flex"
            justifyContent="center"
            p={3}
            bg="blue.100"
            w="40%"
            m="40px 0 15px 0"
            borderRadius="lg"
            boxShadow="md"
          >
            <Center>
              <Heading as="h2" size="md">
                Current Time: {item.logtimestamp}
              </Heading>
            </Center>
          </Box>

          <HStack>
            <Button
              borderRadius="lg"
              boxShadow="lg"
              colorScheme="blue"
              onClick={() => {
                submitChangeSettingsHandler();
              }}
            >
              Change Settings
            </Button>

            <Button
              borderRadius="lg"
              boxShadow="lg"
              colorScheme="red"
              onClick={() => {
                submitStopHandler();
              }}
              ml={3}
            >
              Stop Gimbal
            </Button>

            <Button
              borderRadius="lg"
              boxShadow="lg"
              colorScheme="green"
              onClick={() => {
                submitStartHandler();
              }}
              ml={3}
            >
              Start Gimbal
            </Button>
          </HStack>

          <Flex w="90%" direction={{ base: 'column' }}>
            <Box
              d="flex"
              justifyContent="center"
              p={3}
              bg="white"
              w="100%"
              m="40px 0 15px 0"
              borderRadius="lg"
              borderWidth="1px"
              boxShadow="lg"
            >
              <Heading as="h2" size="lg">
                Current User Settings
              </Heading>

              {getData2.map(item2 => {
                console.log(item2);
                return (
                  <UserInputs
                    scanrate={item2.scan_rateip}
                    leftlimit={item2.left_limitip}
                    rightlimit={item2.right_limitip}
                    eleangle={item2.eleangleip}
                  />
                );
              })}
            </Box>

            <Box
              d="flex"
              justifyContent="center"
              p={3}
              bg="white"
              w="100%"
              m="0px 0 15px 0"
              borderRadius="lg"
              borderWidth="1px"
              boxShadow="lg"
            >
              <Heading as="h2" size="lg">
                Gimbal Status
              </Heading>
              <Grid templateColumns="repeat(5,1fr)" gap={6}>
                <DashStats label="Temperature" number={item.temp} unit="°C" />
                <DashStats
                  label="Scan Rate"
                  number={item.scan_rate}
                  unit="m/s"
                />
                <DashStats
                  label="Left Limit"
                  number={item.left_limit}
                  unit="°"
                />
                <DashStats
                  label="Right Limit"
                  number={item.right_limit}
                  unit="°"
                />

                <DashStats
                  label="Elevation Angle"
                  number={item.eleangle}
                  unit="°"
                />
              </Grid>
            </Box>

            <Box
              d="flex"
              justifyContent="center"
              p={3}
              bg="white"
              w="100%"
              m="0px 0 60px 0"
              borderRadius="lg"
              borderWidth="1px"
              boxShadow="lg"
            >
              <Heading as="h2" size="lg">
                System Status
              </Heading>
              <Grid templateColumns="repeat(4,1fr)" gap={6}>
                <DashStats label="Raspberry Pi" number={item.rpi} unit="°C" />
                <DashStats label="ESP32" number={item.esp32} unit="°C" />
                <DashStats
                  label="Horizontal Motor"
                  number={item.hori_motor}
                  unit="°"
                />
                <DashStats
                  label="Vertical Motor"
                  number={item.verti_motor}
                  unit="°"
                />
              </Grid>
            </Box>
          </Flex>
        </Container>
      );
    });
  }
};

export default Dashboard;
