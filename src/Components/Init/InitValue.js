import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NumInput from './NumInput';
import {
  VStack,
  Container,
  useToast,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  useDisclosure,
} from '@chakra-ui/react';

const InitValue = () => {
  // Slider Data
  const [scanrate, setScanRate] = useState(50);
  const handleChangeScanRate = scanrate => setScanRate(scanrate);

  const [leftlimit, setLeftLimit] = useState(50);
  const handleChangeLeftLimit = leftlimit => setLeftLimit(leftlimit);

  const [rightlimit, setRightLimit] = useState(50);
  const handleChangeRightLimit = rightlimit => setRightLimit(rightlimit);

  const [eleangle, setEleAngle] = useState(50);
  const handleChangeEleAngle = eleangle => setEleAngle(eleangle);

  // Modal Settings
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  // Sending Data
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [post, setPost] = React.useState(null);

  function submitNav() {
    navigate('../dash', { replace: true });
  }

  // Upon clicking submit, this function validates fields and posts to database
  const submitHandler = async () => {
    if (!scanrate || !leftlimit || !rightlimit || !eleangle) {
      setLoading(true);
      toast({
        title: 'Values not set!',
        status: 'warning',
        duration: 500,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }

    // POST Input Parameters (Database)
    // try {
    //   const config = {
    //     headers: {
    //       'Content-type': 'application/json',
    //     },
    //   };

    //   axios.post(
    //     'http://192.168.4.39:5000/radar/1',
    //     {
    //       topic: 'IP',
    //       msg: JSON.stringify({
    //         radarid: 1,
    //         left_limitip: leftlimit,
    //         right_limitip: rightlimit,
    //         eleangleip: eleangle,
    //         scan_rateip: scanrate,
    //       }),
    //     },
    //     config
    //   );
    //   toast({
    //     title: 'Information Sent Successfully To Database',
    //     status: 'success',
    //     duration: 500,
    //     isClosable: true,
    //     position: 'bottom',
    //   });

    //   submitNav();
    // } catch (error) {
    //   toast({
    //     title: 'Error Occurred!',
    //     description: error.response.data.message,
    //     status: 'error',
    //     duration: 500,
    //     isClosable: true,
    //     position: 'bottom',
    //   });
    // }

    // PUT Input Parameters (Database)
    await axios
      .post('http://192.168.4.39:5000/radar/1', {
        radarid: 1,
        left_limitip: leftlimit,
        right_limitip: rightlimit,
        eleangleip: eleangle,
        scan_rateip: scanrate,
      })
      .then(response => {
        toast({
          title: 'Information Sent Successfully To Database',
          status: 'success',
          duration: 500,
          isClosable: true,
          position: 'bottom',
        });
        setPost(response.data);
        submitNav();
      })
      .catch(error => {
        toast({
          title: 'Error Occurred!',
          description: error.response.data.message,
          status: 'error',
          duration: 500,
          isClosable: true,
          position: 'bottom',
        });
        console.log(error);
      });

    // POST Input Parameters (ESP32)
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
            left_limitip: leftlimit,
            right_limitip: rightlimit,
            eleangleip: eleangle,
            scan_rateip: scanrate,
            triggerip: 1,
          }),
        },
        config
      );
      toast({
        title: 'Information Sent Successfully To Gimbal',
        status: 'success',
        duration: 500,
        isClosable: true,
        position: 'bottom',
      });

      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: error.response.data.message,
        status: 'error',
        duration: 500,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  return (
    <Container>
      <VStack>
        <NumInput
          identity="scan-rate"
          value={scanrate}
          handleChange={handleChangeScanRate}
          title="Scan Rate (m/s)"
          numPrecision={1}
          numStep={0.1}
          sliderMark1={0}
          sliderMark2={120}
        />

        <NumInput
          identity="left-limit"
          value={leftlimit}
          handleChange={handleChangeLeftLimit}
          title="Left Limit (°)"
          numPrecision={2}
          numStep={0.01}
          sliderMark1={-60}
          sliderMark2={60}
        />

        <NumInput
          identity="right-limit"
          value={rightlimit}
          handleChange={handleChangeRightLimit}
          title="Right Limit (°)"
          numPrecision={2}
          numStep={0.01}
          sliderMark1={-60}
          sliderMark2={60}
        />

        <NumInput
          identity="ele-angle"
          value={eleangle}
          handleChange={handleChangeEleAngle}
          title="Elevation Angle (°)"
          numPrecision={2}
          numStep={0.01}
          sliderMark1={-45}
          sliderMark2={45}
        />

        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={onOpen}
        >
          Start Gimbal
        </Button>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Start
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    submitHandler();
                  }}
                  ml={3}
                >
                  Start
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </VStack>
    </Container>
  );
};

export default InitValue;
