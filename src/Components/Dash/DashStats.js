import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
} from '@chakra-ui/react';
import React from 'react';

function DashStats(props) {
  return (
    <Box
      d="flex"
      justifyContent="center"
      p={3}
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
      boxShadow="md"
    >
      <Stat>
        <StatLabel>{props.label}</StatLabel>
        <StatNumber>
          {props.number}
          {props.unit}
        </StatNumber>
        <StatHelpText>{props.text}</StatHelpText>
      </Stat>
    </Box>
  );
}

export default DashStats;
