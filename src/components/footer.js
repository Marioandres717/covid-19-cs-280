import React from 'react';
import { Flex, Link } from '@chakra-ui/layout';
import { ExternalLinkIcon } from '@chakra-ui/icons';

function Footer() {
  return (
    <Flex
      as="nav"
      direction="column"
      h="100%"
      alignItems="center"
      backgroundColor="tomato"
    >
      <span>
        Data Source:{' '}
        <Link
          href="https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/README.md"
          isExternal
        >
          JHU CSSE <ExternalLinkIcon mx="2px" />
        </Link>
      </span>

      <span>&copy; 2021 - Mario Andres Rendon</span>
    </Flex>
  );
}

export default Footer;
