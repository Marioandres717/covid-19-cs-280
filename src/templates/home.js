import React from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import Layout from '../components/layout';

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
          data from the sources mentioned in the footer
        </p>

        <Flex w="100%" pt={20} justify="space-between">
          <p>Active: {active}</p>
          <p>Confirmed: {confirmed}</p>
          <p>Recoveries: {recoveries}</p>
          <p>Deaths: {deaths}</p>
        </Flex>
      </Flex>
    </Layout>
  );
}
