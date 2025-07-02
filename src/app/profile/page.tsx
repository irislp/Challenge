// Profile Page: Lets the user view and edit their profile information, and reset (logout) their user data. Uses Chakra UI and localStorage for persistence.

'use client';

import { useRef, useState, useEffect } from 'react';
import {
  Container,
  Box,
  VStack,
  Heading,
  Text,
  Card,
  CardBody,
  useToast,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { getUserData, saveUserData } from '../../lib/userStorage';
import Layout from '../../components/Layout';
import ProfileForm from '../../components/ProfileForm';
import styles from './page.module.css';

export default function ProfilePage() {
  const [userData, setUserData] = useState<{ username: string; jobTitle: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: '', jobTitle: '' });
  const [memberSince, setMemberSince] = useState('');
  const toast = useToast();
  const router = useRouter();

  // AlertDialog state
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = useRef(null);

  const handleOpenAlert = () => setIsAlertOpen(true);
  const handleCloseAlert = () => setIsAlertOpen(false);

  const handleConfirmReset = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userData');
      router.push('/');
    }
  };

  useEffect(() => {
    const data = getUserData();
    if (data) {
      setUserData(data);
      setFormData(data);
    }
  }, []);

  useEffect(() => {
    setMemberSince(
      new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(userData || { username: '', jobTitle: '' });
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!formData.username.trim() || !formData.jobTitle.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in both username and job title',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    saveUserData({ ...formData, isCompleted: true });
    setUserData(formData);
    setIsEditing(false);

    toast({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!userData) {
    return (
      <Layout>
        <Container maxW="container.md" py={8}>
          <Box className={styles.errorContainer}>
            <Heading className={styles.errorTitle}>Profile Not Found</Heading>
            <Text className={styles.errorText}>Please complete the onboarding process first.</Text>
          </Box>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="container.md" py={8} className={styles.container}>
        <VStack spacing={8} align="stretch">
          <Box className={styles.header}>
            <Heading className={styles.title}>User Profile</Heading>
            <Text className={styles.subtitle}>Manage your account information</Text>
          </Box>
          <Card className={styles.card}>
            <CardBody>
              <ProfileForm
                userData={userData}
                isEditing={isEditing}
                onEdit={handleEdit}
                onCancel={handleCancel}
                onSave={handleSave}
                onInputChange={handleInputChange}
                formData={formData}
                memberSince={memberSince}
              />
              <Box mt={6} textAlign="center">
                <Button colorScheme="red" variant="outline" onClick={handleOpenAlert} size="sm">
                  Reset User Data (Logout)
                </Button>
              </Box>
              <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef as unknown as React.RefObject<HTMLElement>}
                onClose={handleCloseAlert}
              >
                <AlertDialogOverlay />
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Confirm Logout
                  </AlertDialogHeader>
                  <AlertDialogBody>
                    Are you sure you want to log out and clear your user data? This action cannot be
                    undone.
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={handleCloseAlert}>
                      Cancel
                    </Button>
                    <Button colorScheme="red" onClick={handleConfirmReset} ml={3}>
                      Log Out
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Layout>
  );
}
