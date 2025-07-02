// CharacterCard: Card component to display summary info for a Rick & Morty character. Clickable to open modal.

import { Card, CardBody, Image, Text, Heading, Badge, Box } from '@chakra-ui/react';
import styles from '../app/information/page.module.css';

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type?: string;
  gender: string;
  image: string;
  location?: { name: string };
  origin?: { name: string };
  episode?: Array<{ name: string }>;
}

interface CharacterCardProps {
  character: Character;
  onCharacterClick: (character: Character) => void;
}

export default function CharacterCard({ character, onCharacterClick }: CharacterCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alive':
        return 'green';
      case 'Dead':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Card className={styles.card} onClick={() => onCharacterClick(character)}>
      <CardBody p={0}>
        <Image src={character.image} alt={character.name} className={styles.cardImage} />
        <Box className={styles.cardContent}>
          <Heading size="md" className={styles.cardTitle}>
            {character.name}
          </Heading>
          <div className={styles.badgeContainer}>
            <Badge colorScheme={getStatusColor(character.status)}>{character.status}</Badge>
            <Badge colorScheme="blue">{character.species}</Badge>
          </div>
          <Text className={styles.cardText}>{character.gender}</Text>
          <Text className={styles.cardText}>{character.location?.name}</Text>
        </Box>
      </CardBody>
    </Card>
  );
}
