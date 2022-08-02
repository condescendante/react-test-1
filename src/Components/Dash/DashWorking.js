import { Stat, StatLabel, StatNumber, HStack, Box } from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon, WarningTwoIcon } from '@chakra-ui/icons';
import React from 'react';

const DashWorking = props => {
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
        {props.number == 1 && (
          <HStack>
            <CheckCircleIcon color="green.500" />
            <StatNumber>Working</StatNumber>
          </HStack>
        )}

        {props.number == 0 && (
          <HStack>
            <WarningIcon color="red.500" />
            <StatNumber>Not Working</StatNumber>
          </HStack>
        )}

        {props.number == 2 && (
          <HStack>
            <WarningTwoIcon color="yellow.500" />
            <StatNumber>Warning</StatNumber>
          </HStack>
        )}
      </Stat>
    </Box>
  );
};

export default DashWorking;
