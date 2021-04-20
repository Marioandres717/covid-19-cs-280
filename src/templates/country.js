import React from 'react';
import { Flex, Heading, Grid } from '@chakra-ui/layout';
import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import Layout from '../components/layout';
import Stats from '../components/stats';

export default function Country({ pageContext }) {
  const { country } = pageContext;

  const {
    Country_Region: name,
    totalActive,
    totalConfirmed,
    totalRecoveries,
    totalDeaths,
    Provinces_States: states,
  } = country;

  return (
    <Layout>
      <Flex direction="column" alignItems="center">
        <Heading>{name}</Heading>
        <Flex w="100%" my={8} justify="space-between">
          <Stats value={totalActive} label="Active" />
          <Stats value={totalConfirmed} label="Confirmed" />
          <Stats value={totalRecoveries} label="Recoveries" />
          <Stats value={totalDeaths} label="Deaths" />
        </Flex>

        {states.length > 1 && (
          <Grid w="100%" my={8} templateColumns="repeat(4, 1fr)" gap={8}>
            {states.map(
              ({
                Province_State: stateName,
                Active,
                Confirmed,
                Recovered,
                Deaths,
              }) => (
                <Stat bg="#d3d3d399" p={2} borderRadius={8}>
                  <StatLabel fontSize={18}>{stateName}</StatLabel>
                  <StatNumber>{Active}</StatNumber>
                  <StatHelpText>Active</StatHelpText>
                  <StatNumber>{Confirmed}</StatNumber>
                  <StatHelpText>Confirmed</StatHelpText>
                  <StatNumber>{Recovered}</StatNumber>
                  <StatHelpText>Recoveries</StatHelpText>
                  <StatNumber>{Deaths}</StatNumber>
                  <StatHelpText>Deaths</StatHelpText>
                </Stat>
              )
            )}
          </Grid>
        )}
      </Flex>
    </Layout>
  );
}
