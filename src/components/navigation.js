import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Flex, Link } from '@chakra-ui/react';
import { HomeIcon, GlobalIcon, NewsIcon } from './icons';

function Navigation() {
  return (
    <Flex
      justify="space-around"
      h="100%"
      as="nav"
      padding="20px"
      borderBottom="2px"
      backgroundColor="tomato"
    >
      <Link as={GatsbyLink} to="/" title="Home" fontWeight={700}>
        <HomeIcon boxSize={18} /> Home
      </Link>
      <Link as={GatsbyLink} to="/countries" fontWeight={700}>
        <GlobalIcon boxSize={18} /> Countries
      </Link>
      <Link as={GatsbyLink} to="/news" fontWeight={700}>
        <NewsIcon boxSize={18} /> News
      </Link>
    </Flex>
  );
}

export default Navigation;
