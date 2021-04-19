import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Grid, GridItem, Flex, Spacer, Box, Link } from '@chakra-ui/react';

function Layout() {
  return (
    <Grid
      h="100vh"
      templateRows="0.1fr 1fr 0.1fr"
      templateColumns="1fr"
      gap={4}
    >
      <GridItem as="header" bg="tomato">
        <Flex h="100%" as="nav">
          <Link as={GatsbyLink} to="/" bg="red.200">
            Home
          </Link>
          <Spacer />
          <Link as={GatsbyLink} to="/countries" bg="red.200">
            Countries
          </Link>
          <Spacer />
          <Link as={GatsbyLink} to="/news" bg="red.200">
            News
          </Link>
        </Flex>
      </GridItem>
      <GridItem bg="papayawhip">HOW</GridItem>
      <GridItem bg="tomato">HOWDY</GridItem>
    </Grid>
  );
}

export default Layout;
