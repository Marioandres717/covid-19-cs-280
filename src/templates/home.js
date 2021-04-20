import React from 'react';
import { Flex, Heading, Box } from '@chakra-ui/layout';
import Layout from '../components/layout';
import Stats from '../components/stats';

export default function Home({ pageContext }) {
  const { active, confirmed, deaths, recoveries, lastUpdate } = pageContext;
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

        <Box
          w="100%"
          my={4}
          p={4}
          bg="lightgray"
          color="tomato"
          fontWeight={700}
          fontSize={18}
          align="center"
        >
          Last Updated on {lastUpdate}
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
