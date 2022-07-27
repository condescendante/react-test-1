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
  sliderLeft,
  sliderRight,
  max,
  min,
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
        max={max}
        min={min}
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
        max={max}
        min={min}
      >
        <SliderMark value={sliderLeft} mt="1" ml="-2.5" fontSize="sm">
          {sliderMark1}
        </SliderMark>
        <SliderMark value={sliderRight} mt="1" ml="-2.5" fontSize="sm">
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
