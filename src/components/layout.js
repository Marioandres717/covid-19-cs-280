import React from 'react';
import { Grid } from '@chakra-ui/react';
import Navigation from './navigation';
import Footer from './footer';
import Main from './main';

function Layout(props) {
  return (
    <Grid
      h="100vh"
      templateRows="minmax(auto, 64px) 1fr minmax(auto, 64px)"
      templateColumns="1fr"
    >
      <Navigation />
      <Main>{props.children}</Main>
      <Footer />
    </Grid>
  );
}

export default Layout;
