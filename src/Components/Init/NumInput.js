import React from 'react';
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';

function NumInput({
  identity,
  value,
  handleChange,
  title,
  numPrecision,
  numStep,
  sliderMark1,
  sliderMark2,
}) {
  return (
    <FormControl id={identity} display="flex" alignItems="center" py={5}>
      <FormLabel>{title}</FormLabel>
      <NumberInput
        maxW="100px"
        mr="2rem"
        value={value}
        onChange={handleChange}
        precision={numPrecision}
        step={numStep}
        defaultValue={50}
        min={0}
        max={120}
        clampValueOnBlur={false}
        keepWithinRange={false}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider
        flex="1"
        focusThumbOnChange={false}
        value={value}
        onChange={handleChange}
        precision={numPrecision}
        step={numStep}
        clampValueOnBlur={false}
        keepWithinRange={false}
      >
        <SliderMark value={0} mt="1" ml="-2.5" fontSize="sm">
          {sliderMark1}
        </SliderMark>
        <SliderMark value={100} mt="1" ml="-2.5" fontSize="sm">
          {sliderMark2}
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" children={value} />
      </Slider>
    </FormControl>
  );
}

export default NumInput;
