'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserData, getUserData } from '../lib/userStorage';
import UserOnboardingModal from '../components/UserOnboardingModal';
import Layout from '../components/Layout';
import {
  Container,
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  HStack,
  Badge,
} from '@chakra-ui/react';

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedData = getUserData();
    if (savedData && savedData.isCompleted) {
      setUserData(savedData);
    } else {
      setShowOnboardingModal(true);
    }
  }, []);

  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data);
    setShowOnboardingModal(false);
  };

  const handleNavigateToInformation = () => {
    router.push('/information');
  };

  const handleNavigateToProfile = () => {
    router.push('/profile');
  };

  const handleNavigateToReactFinland = () => {
    router.push('/react-finland');
  };

  // Show blocking modal if user hasn't completed onboarding
  if (!userData) {
    return (
      <UserOnboardingModal isOpen={showOnboardingModal} onComplete={handleOnboardingComplete} />
    );
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Welcome Section */}
          <Box textAlign="center">
            <Heading mb={4}>Welcome to Challenge App</Heading>
            <Text fontSize="lg" color="gray.600">
              Explore Rick & Morty characters and manage your profile
            </Text>
          </Box>

          {/* User Info Card */}
          <Card>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between" align="center">
                  <Heading size="md">Your Profile</Heading>
                  <Badge colorScheme="green">Active</Badge>
                </HStack>

                <Box>
                  <Text fontWeight="bold">Username:</Text>
                  <Text>{userData.username}</Text>
                </Box>

                <Box>
                  <Text fontWeight="bold">Job Title:</Text>
                  <Text>{userData.jobTitle}</Text>
                </Box>
              </VStack>
            </CardBody>
          </Card>

          {/* Navigation Cards */}
          <Box>
            <Heading size="md" mb={4}>
              Quick Actions
            </Heading>
            <HStack spacing={6} justify="center">
              <Card
                cursor="pointer"
                onClick={handleNavigateToInformation}
                _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }}
                shadow="md"
              >
                <CardBody textAlign="center">
                  <VStack spacing={3}>
                    <Text fontSize="2xl">📚</Text>
                    <Heading size="sm">Information</Heading>
                    <Text fontSize="sm" color="gray.600">
                      Browse Rick & Morty characters
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
              <Card
                cursor="pointer"
                onClick={handleNavigateToProfile}
                _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }}
                shadow="md"
              >
                <CardBody textAlign="center">
                  <VStack spacing={3}>
                    <Text fontSize="2xl">👤</Text>
                    <Heading size="sm">Profile</Heading>
                    <Text fontSize="sm" color="gray.600">
                      Update your information
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
              //the React Finland API is not live atm, so we're not using it
              {/* <Card 
                cursor="pointer" 
                onClick={handleNavigateToReactFinland}
                _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }}
                shadow="md"
              >
                <CardBody textAlign="center">
                  <VStack spacing={3}>
                    <Text fontSize="2xl">🇫🇮</Text>
                    <Heading size="sm">React Finland</Heading>
                    <Text fontSize="sm" color="gray.600">
                      View React Finland conferences & talks
                    </Text>
                  </VStack>
                </CardBody>
              </Card> */}
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
}
