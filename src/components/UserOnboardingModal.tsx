'use client';

import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { UserData, saveUserData } from '../lib/userStorage';

interface UserOnboardingModalProps {
  isOpen: boolean;
  onComplete: (userData: UserData) => void;
}

export default function UserOnboardingModal({ isOpen, onComplete }: UserOnboardingModalProps) {
  const [formData, setFormData] = useState({ username: '', jobTitle: '' });
  const toast = useToast();

  const handleSubmit = () => {
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

    const userData: UserData = {
      ...formData,
      isCompleted: true,
    };

    saveUserData(userData);
    onComplete(userData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} closeOnOverlayClick={false} closeOnEsc={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome! Please Complete Your Profile</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <Text>To continue using the application, please provide your information below.</Text>

            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Enter your username"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Job Title</FormLabel>
              <Input
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                placeholder="Enter your job title"
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Complete Setup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
