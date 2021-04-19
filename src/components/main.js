import { Box } from '@chakra-ui/layout';
import React from 'react';

function Main(props) {
  return (
    <Box w="80%" pt={20} mx="auto">
      {props.children}
    </Box>
  );
}

export default Main;
