'use client';

import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  VStack,
  Container,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useRouter, usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Information', path: '/information' },
  { label: 'Profile', path: '/profile' },
  //   { label: 'React Finland', path: '/react-finland' }
];

export default function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <>
      {/* Desktop Navbar */}
      <Box
        as="nav"
        bg="white"
        boxShadow="sm"
        position="sticky"
        top={0}
        zIndex={10}
        display={{ base: 'none', md: 'block' }}
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" py={4}>
            <Link
              onClick={() => handleNavigation('/')}
              fontSize="xl"
              fontWeight="bold"
              color="blue.600"
              cursor="pointer"
              _hover={{ color: 'blue.700' }}
            >
              Challenge App
            </Link>
            <HStack spacing={8}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  fontWeight={isActive(item.path) ? 'bold' : 'normal'}
                  color={isActive(item.path) ? 'blue.600' : 'gray.600'}
                  _hover={{ color: 'blue.700' }}
                  cursor="pointer"
                >
                  {item.label}
                </Link>
              ))}
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Navbar */}
      <Box
        as="nav"
        bg="white"
        boxShadow="sm"
        position="sticky"
        top={0}
        zIndex={10}
        display={{ base: 'block', md: 'none' }}
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" py={4}>
            <Link
              onClick={() => handleNavigation('/')}
              fontSize="xl"
              fontWeight="bold"
              color="blue.600"
              cursor="pointer"
            >
              Challenge App
            </Link>
            <IconButton
              aria-label="Open navigation menu"
              icon={<HamburgerIcon />}
              onClick={onOpen}
              variant="ghost"
            />
          </Flex>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Navigation</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" pt={4}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  fontWeight={isActive(item.path) ? 'bold' : 'normal'}
                  color={isActive(item.path) ? 'blue.600' : 'gray.600'}
                  _hover={{ color: 'blue.700' }}
                  cursor="pointer"
                  fontSize="lg"
                  py={2}
                >
                  {item.label}
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
