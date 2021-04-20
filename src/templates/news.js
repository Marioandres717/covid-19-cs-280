import React from 'react';
import { Image } from '@chakra-ui/image';
import { Flex, Grid, Heading, Text, Box } from '@chakra-ui/layout';
import Layout from '../components/layout';
export default function News({ pageContext }) {
  const { news } = pageContext;
  const { articles, totalResults } = news;
  return (
    <Layout>
      <Flex direction="column" alignItems="center">
        <Heading as="h1" size="2xl" mb={5}>
          Breaking News
        </Heading>
        <Text>Catch the breaking news on Coronavirus.</Text>
        <Text>{totalResults} Total results</Text>
        <Grid w="100%" my={8} templateColumns="repeat(3, 1fr)" gap={8}>
          {articles.map((article) => (
            <Flex
              direction="column"
              justify="flex-end"
              maxWidth="sm"
              h="300px"
              p={2}
              borderRadius="lg"
              backgroundImage={`url('${article.urlToImage}')`}
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              boxShadow="dark-lg"
              key={article.url}
            >
              <Text fontWeight={700} color="white">
                {article.title}
              </Text>
              <Text as="cite" color="white">
                {article.author}
              </Text>
              <Text as="samp" color="white">
                {new Date(article.publishedAt).toGMTString()}
              </Text>
            </Flex>
          ))}
        </Grid>
      </Flex>
    </Layout>
  );
}
