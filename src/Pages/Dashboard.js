import {
  Container,
  Box,
  Grid,
  Center,
  Divider,
  Button,
  GridItem,
  Heading,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useIntervalWhen } from 'rooks';
import axios from 'axios';
import DashStats from '../Components/Dash/DashStats';
import UserInputs from '../Components/Dash/UserInputs';
import logo from '../Thales_Logo.svg.png';
import { useNavigate } from 'react-router-dom';

// Replace this with gimbal frame
import gimbalpic from '../Radar Gimbal Picture.jpg';

const Dashboard = () => {
  const [getData, setGetData] = useState([]);
  const [getData2, setGetData2] = useState([]);
  const navigate = useNavigate();
  let [delay, setDelay] = useState(100);

  // GET Display Data without Polling
  // useEffect(() => {
  //   const callAxios = async () => {
  //     await axios
  //       .get('http://127.0.0.1:5000/items')
  //       .then(response => {
  //         const items = response.data.items;
  //         setGetData(items);
  //         console.log('SUCCESS', response);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   };
  //   callAxios();
  // }, []);

  // GET User Inputs with Polling
  // Change the endpoint based on Wei Yang's
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

  // GET Display Data with Polling
  // useIntervalWhen(async () => {
  //   await axios
  //     .get('http://192.168.4.39:5000/radar/1')
  //     .then(response => {
  //       const items = response.data.items;
  //       setGetData(items);
  //       console.log('SUCCESS', response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, delay);

  // Dashboard Page Design
  if (getData.length > 0) {
    return getData.map((item, index) => {
      console.log(item);
      return (
        <div
          style={{
            backgroundColor: 'lightblue',
            backgroundRepeat: 'repeat',
            backgroundSize: 'cover',
            width: '100vw',
            height: '300vh',
          }}
        >
          <Container maxW="8xl" centerContent>
            <Box p={3} w="50%" m="40px 0 15px 0">
              <img src={logo} alt="Thales Logo" />
            </Box>

            <Divider orientation="horizontal" />
            <Grid
              templateColumns="repeat(10, 1fr)"
              templateRows="repeat(10, 1fr)"
              w="100%"
              gap={6}
              p={3}
              m="0px 0 15px 0"
            >
              <GridItem colSpan={7} rowSpan={4} bg="lightblue">
                <Box
                  d="flex"
                  justifyContent="center"
                  p={3}
                  bg="white"
                  w="100%"
                  m="40px 0 15px 0"
                  borderRadius="lg"
                  borderWidth="1px"
                >
                  <Box
                    d="flex"
                    justifyContent="center"
                    p={3}
                    bg="blue.100"
                    w="50%"
                    m="40px 0 15px 0"
                    borderRadius="lg"
                    borderWidth="1px"
                  >
                    Time ID: {item.logtimestamp}
                  </Box>
                  <Heading as="h2" size="xl">
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

                  <Button
                    onClick={() => navigate('../init', { replace: true })}
                  >
                    Change Settings
                  </Button>
                </Box>
              </GridItem>
              <GridItem colSpan={3} rowSpan={8} bg="lightblue">
                <Box
                  d="flex"
                  justifyContent="center"
                  p={3}
                  bg="white"
                  w="100%"
                  m="40px 0 15px 0"
                  borderRadius="lg"
                  borderWidth="1px"
                >
                  <Heading as="h2" size="xl">
                    Gimbal Status
                  </Heading>
                  <DashStats
                    label="Temperature"
                    number={item.temp}
                    unit="°C"
                    text="Warning! Exceeded temperature recommendation. Please cool down."
                  />
                  <DashStats
                    label="Scan Rate"
                    number={item.scan_rate}
                    unit="m/s"
                    text="Gimbal is operating normally."
                  />
                  <DashStats
                    label="Left Limit"
                    number={item.left_limit}
                    unit="°"
                    text="Gimbal is operating normally."
                  />
                  <DashStats
                    label="Right Limit"
                    number={item.right_limit}
                    unit="°"
                    text="Gimbal is operating normally."
                  />

                  <DashStats
                    label="Elevation Angle"
                    number={item.eleangle}
                    unit="°"
                    text="Gimbal is operating normally."
                  />
                </Box>
              </GridItem>
              <GridItem colSpan={7} rowSpan={4} bg="lightblue">
                <Box
                  d="flex"
                  justifyContent="center"
                  p={3}
                  bg="white"
                  w="100%"
                  m="0px 0 15px 0"
                  borderRadius="lg"
                  borderWidth="1px"
                >
                  <Heading as="h2" size="xl">
                    Radar Animation
                  </Heading>
                  <Box
                    d="flex"
                    justifyContent="center"
                    p={3}
                    bg="blue.100"
                    w="50%"
                    m="40px 0 15px 0"
                    borderRadius="lg"
                    borderWidth="1px"
                    boxShadow="md"
                  >
                    <img src={gimbalpic} alt="Gimbal Frame" />
                  </Box>
                </Box>
              </GridItem>
              <GridItem colSpan={10} rowSpan={2} bg="lightblue">
                <Box
                  d="flex"
                  justifyContent="center"
                  p={3}
                  bg="white"
                  w="100%"
                  m="40px 0 15px 0"
                  borderRadius="lg"
                  borderWidth="1px"
                >
                  <Heading as="h2" size="xl">
                    System Status
                  </Heading>
                  <Grid templateColumns="repeat(4,1fr)" gap={6}>
                    <DashStats
                      label="Raspberry Pi"
                      number={item.rpi}
                      unit="°C"
                      text="Warning! Exceeded temperature recommendation. Please cool down."
                    />
                    <DashStats
                      label="ESP32"
                      number={item.esp32}
                      unit="m/s"
                      text="Gimbal is operating normally."
                    />
                    <DashStats
                      label="Horizontal Motor"
                      number={item.hori_motor}
                      unit="°"
                      text="Gimbal is operating normally."
                    />
                    <DashStats
                      label="Vertical Motor"
                      number={item.verti_motor}
                      unit="°"
                      text="Gimbal is operating normally."
                    />
                  </Grid>
                </Box>
              </GridItem>
            </Grid>
          </Container>
        </div>
      );
    });
  }
};

export default Dashboard;
