import { Box, Container, Text, Flex } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box as="footer" bg="gray.50" borderTop="1px" borderColor="gray.200" mt="auto" py={4}>
      <Container maxW="container.xl">
        <Flex justify="center" align="center">
          <Text color="gray.600" fontSize="sm">
            Challenge Version: v1.0
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}
