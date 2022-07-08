import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FormControl,
  FormLabel,
  SliderTrack,
  SliderFilledTrack,
  Tooltip,
  SliderThumb,
  Slider,
  SliderMark,
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

const InitSlider = () => {
  // Slider Settings
  const [sliderValue1, setSliderValue1] = React.useState(5);
  const [showTooltip1, setShowTooltip1] = React.useState(false);
  const [sliderValue2, setSliderValue2] = React.useState(5);
  const [showTooltip2, setShowTooltip2] = React.useState(false);
  const [sliderValue3, setSliderValue3] = React.useState(5);
  const [showTooltip3, setShowTooltip3] = React.useState(false);

  // Slider Data
  const [velocity, setVelocity] = useState();
  const [angle, setAngle] = useState();

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
    if (!velocity || !angle) {
      setLoading(true);
      toast({
        title: 'Slider values not set!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }

    // Try to PUT to database
    await axios
      .put('http://127.0.0.1:5000/radar/1', {
        radarid: 1,
        startaziangleip: angle,
        vertiangleip: angle,
        angveloip: velocity,
        timestampip: 50,
      })
      .then(response => {
        toast({
          title: 'Information Sent Successfully',
          status: 'success',
          duration: 5000,
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
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
        console.log(error);
      });

    setLoading(false);

    //Try to POST to ESP32
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://127.0.0.1:5000/publishparameter',
        {
          topic: 'Capstone_S39',
          msg: JSON.stringify({
            horiangle: angle,
            vertiangle: angle,
            angvelo: velocity,
          }),
        },
        config
      );
      toast({
        title: 'Information Sent Successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  // Try to post to database
  //   try {
  //     const config = {
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //     };

  //     const { data } = await axios.post(
  //       'http://127.0.0.1:5000/radar/1',
  //       {
  //         radarid: 1,
  //         horiangleip: angle,
  //         vertiangleip: angle,
  //         angveloip: velocity,
  //         timestampip: 50,
  //       },
  //       config
  //     );
  //     toast({
  //       title: 'Information Sent Successfully',
  //       status: 'success',
  //       duration: 5000,
  //       isClosable: true,
  //       position: 'bottom',
  //     });

  //     setLoading(false);
  //   } catch (error) {
  //     toast({
  //       title: 'Error Occurred!',
  //       description: error.response.data.message,
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //       position: 'bottom',
  //     });
  //     setLoading(false);
  //   }
  // };

  // Slider Display
  return (
    <Container>
      <VStack>
        <FormControl
          id="velocity-slider"
          display="flex"
          alignItems="center"
          py={10}
        >
          <FormLabel>Velocity</FormLabel>
          <Slider
            id="v-slider"
            defaultValue={5}
            min={0}
            max={100}
            colorScheme="teal"
            onChange={v => setSliderValue1(v)}
            //onChangeEnd={val => console.log(val)}
            onChangeEnd={val => setVelocity(val)}
            onMouseEnter={() => setShowTooltip1(true)}
            onMouseLeave={() => setShowTooltip1(false)}
          >
            <SliderMark value={0} mt="1" ml="-2.5" fontSize="sm">
              0°/s
            </SliderMark>
            <SliderMark value={100} mt="1" ml="-2.5" fontSize="sm">
              90°/s
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="teal.500"
              color="white"
              placement="top"
              isOpen={showTooltip1}
              label={`${sliderValue1}°/s`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </FormControl>

        <FormControl
          id="angle-slider"
          display="flex"
          alignItems="center"
          py={10}
        >
          <FormLabel>Angle</FormLabel>
          <Slider
            id="a-slider"
            defaultValue={5}
            min={0}
            max={100}
            colorScheme="teal"
            onChange={v => setSliderValue2(v)}
            //onChangeEnd={val => console.log(val)}
            onChangeEnd={val => setAngle(val)}
            onMouseEnter={() => setShowTooltip2(true)}
            onMouseLeave={() => setShowTooltip2(false)}
          >
            <SliderMark value={0} mt="1" ml="-2.5" fontSize="sm">
              0°
            </SliderMark>
            <SliderMark value={45} mt="1" ml="-2.5" fontSize="sm">
              45°
            </SliderMark>
            <SliderMark value={100} mt="1" ml="-2.5" fontSize="sm">
              90°
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="teal.500"
              color="white"
              placement="top"
              isOpen={showTooltip2}
              label={`${sliderValue2}°`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </FormControl>

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

export default InitSlider;
