import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Link } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/layout';
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/table';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Layout from '../components/layout';

export default function countries({ pageContext }) {
  const { countriesData } = pageContext;
  console.log(`countriesData`, countriesData);
  return (
    <Layout>
      <Heading>Data By Countries</Heading>
      <Table variant="striped" colorScheme="orange" mb={5}>
        <TableCaption placement="top">
          Covid 19 Daily Countries Data
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Ranking</Th>
            <Th>Name</Th>
            <Th isNumeric>Active</Th>
            <Th isNumeric>Confirmed</Th>
            <Th isNumeric>Recovered</Th>
            <Th isNumeric>Deaths</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {countriesData.map(
            (
              { Country_region: name, active, confirmed, deaths, recovered },
              index
            ) => (
              <Tr key={name}>
                <Td isNumeric>{index}</Td>
                <Td>{name}</Td>
                <Td isNumeric>{active}</Td>
                <Td isNumeric>{confirmed}</Td>
                <Td isNumeric>{recovered}</Td>
                <Td isNumeric>{deaths}</Td>
                <Td>
                  <Link as={GatsbyLink} to={`/countries/${name}`}>
                    <ChevronRightIcon size="sm" />
                  </Link>
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </Layout>
  );
}
