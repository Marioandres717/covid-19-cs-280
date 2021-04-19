import React from 'react';
import { Flex, Heading, Box, Text } from '@chakra-ui/layout';
import Layout from '../components/layout';

const Stats = ({ value, label }) => (
  <Box>
    <Text fontSize="2em">{value}</Text>
    <Text color="tomato">{label}</Text>
  </Box>
);

export default function Home({ pageContext }) {
  const { active, confirmed, deaths, recoveries } = pageContext;
  return (
    <Layout>
      <Flex direction="column" alignItems="center">
        <Heading as="h1" size="2xl" mb={5}>
          Tracking Coronavirus
        </Heading>
        <p>
          This website was created for a project in the CS 280 class offer at
          the University of Regina. The purpose of it is for people to have a
          website that they can rely on accurated information about the covid-19
          pandemic. This application shows the near real-time status based on
          data from the sources mentioned in the footer.
        </p>

        <Box w="100%" my={4} p={2} bg="lightgray">
          Last Updated on HERE GOES DATE
        </Box>

        <Flex w="100%" my={4} justify="space-between">
          <Stats value={active} label="Active" />
          <Stats value={confirmed} label="Confirmed" />
          <Stats value={recoveries} label="Recoveries" />
          <Stats value={deaths} label="Deaths" />
        </Flex>
      </Flex>
    </Layout>
  );
}
