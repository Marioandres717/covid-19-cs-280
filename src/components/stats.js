import { Box, Text } from '@chakra-ui/layout';
import React from 'react';

const Stats = ({ value, label }) => (
  <Box>
    <Text fontSize="2em">{value}</Text>
    <Text color="tomato">{label}</Text>
  </Box>
);

export default Stats;
