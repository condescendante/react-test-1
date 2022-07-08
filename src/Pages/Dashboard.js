import {
  Container,
  Box,
  Grid,
  Center,
  Divider,
  Button,
  GridItem,
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
  const [getData, setGetData] = useState('');
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
      .get('http://127.0.0.1:5000/items')
      .then(response => {
        const items = response.data.items;
        setGetData(items);
        console.log('SUCCESS', response);
      })
      .catch(error => {
        console.log(error);
      });
  }, delay);

  // GET Display Data with Polling
  useIntervalWhen(async () => {
    await axios
      .get('http://127.0.0.1:5000/items')
      .then(response => {
        const items = response.data.items;
        setGetData(items);
        console.log('SUCCESS', response);
      })
      .catch(error => {
        console.log(error);
      });
  }, delay);

  // Dashboard Page Design
  if (getData.length > 0) {
    return getData.map((item, index) => {
      console.log(item);
      return (
        <Container maxW="8xl" centerContent>
          <Box p={3} w="50%" m="40px 0 15px 0">
            <img src={logo} alt="Thales Logo" />
          </Box>

          <Divider orientation="horizontal" />

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

          <UserInputs
            scanrate={50}
            leftlimit={20}
            rightlimit={30}
            eleangle={40}
          />
          <Button onClick={() => navigate('../init', { replace: true })}>
            Change Settings
          </Button>

          <Center>
            <Grid
              templateColumns="repeat(5, 1fr)"
              templateRows="repeat(2, 1fr)"
              gap={6}
              p={3}
              w="300%"
              color="blue.700"
              m="40px 0 15px 0"
              borderRadius="lg"
              borderWidth="1px"
            >
              <GridItem colSpan={5} rowSpan={1} bg="tomato">
                <Button>HELLOOOO</Button>
              </GridItem>
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
                number={item.startaziangle}
                unit="°"
                text="Gimbal is operating normally."
              />
              <DashStats
                label="Right Limit"
                number={item.endaziangle}
                unit="°"
                text="Gimbal is operating normally."
              />

              <DashStats
                label="Elevation Angle"
                number={item.eleangle}
                unit="°"
                text="Gimbal is operating normally."
              />
            </Grid>
          </Center>

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
          {/* <Button onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button> */}
        </Container>
      );
    });
  }
};

export default Dashboard;
