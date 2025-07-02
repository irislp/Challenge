'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  Card,
  CardBody,
  HStack,
  Badge,
  Link,
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import { GET_REACT_FINLAND_DATA } from '../../graphql/queries';
import Image from 'next/image';

const API_URL = 'https://api.react-finland.fi/graphql';

interface Social {
  type: string;
  link: string;
}

interface Speaker {
  name: string;
  about: string;
  image?: { url: string };
  socials?: Social[];
}

interface Session {
  title: string;
  description: string;
  speakers: Speaker[];
}

interface Conference {
  name: string;
  year: number;
  startDate: string;
  endDate: string;
  organizers: { name: string }[];
  sessions: Session[];
}

interface Series {
  name: string;
  conferences: Conference[];
}

interface ReactFinlandData {
  series: Series[];
}

export default function ReactFinlandPage() {
  const [data, setData] = useState<ReactFinlandData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: GET_REACT_FINLAND_DATA.loc?.source.body,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(`Failed to fetch React Finland data${err}`);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Heading mb={6}>React Finland Conferences & Sessions</Heading>
        {loading && (
          <Box textAlign="center" py={12}>
            <Spinner size="xl" />
          </Box>
        )}
        {error && (
          <Alert status="error" mb={6}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {!loading && !error && (!data || !data.series || data.series.length === 0) && (
          <Box textAlign="center" py={12}>
            <Text color="gray.500">No conference data found.</Text>
          </Box>
        )}
        {data && data.series && (
          <VStack spacing={8} align="stretch">
            {data.series.map((series, sIdx) => (
              <Box key={series.name + sIdx}>
                <Heading size="lg" mb={4}>
                  {series.name}
                </Heading>
                <VStack spacing={8} align="stretch">
                  {series.conferences.map((conf, idx) => (
                    <Card key={conf.name + conf.year + idx} shadow="md">
                      <CardBody>
                        <HStack justify="space-between" align="start" mb={2}>
                          <Box>
                            <Heading size="md" mb={1}>
                              {conf.name} ({conf.year})
                            </Heading>
                            <Text color="gray.500" fontSize="sm">
                              {conf.startDate} - {conf.endDate}
                            </Text>
                            <Text color="gray.600" fontSize="sm">
                              Organizers: {conf.organizers.map((o) => o.name).join(', ')}
                            </Text>
                          </Box>
                          <Badge colorScheme="purple">{conf.sessions.length} Sessions</Badge>
                        </HStack>
                        <VStack align="stretch" spacing={4} mt={4}>
                          {conf.sessions.slice(0, 5).map((session, i) => (
                            <Box key={session.title + i} p={4} bg="gray.50" borderRadius="md">
                              <Heading size="sm" mb={1}>
                                {session.title}
                              </Heading>
                              <Text fontSize="sm" color="gray.700" mb={2}>
                                {session.description}
                              </Text>
                              <HStack spacing={3}>
                                {session.speakers.map((sp, j) => (
                                  <HStack key={sp.name + j} spacing={2}>
                                    {sp.image && sp.image.url && (
                                      <Image
                                        src={sp.image.url}
                                        alt={sp.name}
                                        width={32}
                                        height={32}
                                        style={{ borderRadius: '50%' }}
                                      />
                                    )}
                                    <Box>
                                      <Text fontWeight="bold" fontSize="sm">
                                        {sp.name}
                                      </Text>
                                      <Text fontSize="xs" color="gray.500">
                                        {sp.about}
                                      </Text>
                                      {sp.socials && sp.socials.length > 0 && (
                                        <HStack spacing={1} mt={1}>
                                          {sp.socials.map((soc, k) => (
                                            <Link
                                              key={soc.type + k}
                                              href={soc.link}
                                              color="blue.500"
                                              isExternal
                                              fontSize="xs"
                                            >
                                              {soc.type}
                                            </Link>
                                          ))}
                                        </HStack>
                                      )}
                                    </Box>
                                  </HStack>
                                ))}
                              </HStack>
                            </Box>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              </Box>
            ))}
          </VStack>
        )}
      </Container>
    </Layout>
  );
}
