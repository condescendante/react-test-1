import {
  Box,
  Table,
  TableContainer,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Heading,
  Center,
  Divider,
} from '@chakra-ui/react';
import React from 'react';

const PastUserInputs = ({
  number,
  scanrate,
  leftlimit,
  rightlimit,
  eleangle,
}) => {
  return (
    <Box
      d="flex"
      justifyContent="center"
      p={3}
      bg="blue.50"
      w="100%"
      m="20px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
      boxShadow="md"
    >
      <Center>
        <Heading as="h2" size="md" m="0px 0 15px 0">
          Setting {number}
        </Heading>
      </Center>
      <Divider orientation="horizontal" />
      <TableContainer>
        <Table variant="striped" colorScheme="blue" size="sm">
          <Thead>
            <Tr>
              <Th>Parameters</Th>
              <Th>Value Set</Th>
              <Th isNumeric>Unit</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Scan Rate</Td>
              <Td>{scanrate}</Td>
              <Td isNumeric>degrees/sec (°/s)</Td>
            </Tr>
            <Tr>
              <Td>Left Limit</Td>
              <Td>{leftlimit}</Td>
              <Td isNumeric>degrees (°)</Td>
            </Tr>
            <Tr>
              <Td>Right Limit</Td>
              <Td>{rightlimit}</Td>
              <Td isNumeric>degrees (°)</Td>
            </Tr>
            <Tr>
              <Td>Elevation Angle</Td>
              <Td>{eleangle}</Td>
              <Td isNumeric>degrees (°)</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PastUserInputs;
