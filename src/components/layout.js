import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import Navigation from './navigation';
import Footer from './footer';

function Layout() {
  return (
    <Grid
      h="100vh"
      templateRows="minmax(auto, 64px) 1fr minmax(auto, 64px)"
      templateColumns="1fr"
    >
      <Navigation />
      <GridItem bg="papayawhip">HOW</GridItem>
      <Footer />
    </Grid>
  );
}

export default Layout;
