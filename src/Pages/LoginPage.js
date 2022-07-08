import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Center,
} from '@chakra-ui/react';
import React from 'react';
import Login from '../Components/Authentication/Login';
import Signup from '../Components/Authentication/Signup';
import logo from '../Thales_Logo.svg.png';

const LoginPage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box p={3} w="100%" m="40px 0 15px 0">
        <img src={logo} alt="Thales Logo" />
      </Box>

      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="blue.100"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Center>
          <Text>Gimbal Control System</Text>
        </Center>
      </Box>

      <Box bg="blue.100" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb="1em">
            <Tab width="50%">Log In</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default LoginPage;
