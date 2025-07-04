// Information Page: Displays a paginated list of Rick & Morty characters using GraphQL. Allows viewing character details in a modal. User can navigate pages via URL query params.

'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button, Spinner, Alert, AlertIcon, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { client } from '../../lib/apolloClient';
import Layout from '../../components/Layout';
import CharacterCard from '../../components/CharacterCard';
import CharacterModal from '../../components/CharacterModal';
import { Character } from '../../components/CharacterCard';
import { GET_CHARACTERS } from '../../graphql/queries/characters';
import styles from './page.module.css';

function InformationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  let currentPage = parseInt(searchParams.get('page') || '1');
  if (isNaN(currentPage)) currentPage = 1;
  // We'll check bounds after data is loaded

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page: currentPage },
    fetchPolicy: 'cache-and-network',
  });

  // Handle out-of-bounds and negative page numbers
  if (!loading && data && data.characters && data.characters.info) {
    const info = data.characters.info;
    if (currentPage < 1 || currentPage > info.pages || isNaN(currentPage)) {
      router.replace('/information?page=1');
      return null;
    }
  }

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    onOpen();
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/information?page=${newPage}`);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert status="error" className={styles.errorContainer}>
        <AlertIcon />
        Error loading characters: {error.message}
      </Alert>
    );
  }

  const characters = data?.characters?.results || [];
  const info = data?.characters?.info;

  return (
    <div
      className={styles.container}
      style={{ padding: '32px 16px', maxWidth: '1200px', margin: '0 auto' }}
    >
      <Heading className={styles.heading}>Rick & Morty Characters</Heading>

      <div className={styles.grid}>
        {characters.map((character: Character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onCharacterClick={handleCharacterClick}
          />
        ))}
      </div>

      {info && (
        <div className={styles.pagination}>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={!info.prev}
            colorScheme="blue"
            variant="outline"
          >
            Previous
          </Button>
          <Text className={styles.paginationText}>
            Page {currentPage} of {info.pages}
          </Text>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={!info.next}
            colorScheme="blue"
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}

      <CharacterModal character={selectedCharacter} isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default function InformationPage() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <InformationContent />
        </Suspense>
      </Layout>
    </ApolloProvider>
  );
}
