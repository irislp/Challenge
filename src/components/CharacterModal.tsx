import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  Badge,
} from '@chakra-ui/react';
import styles from '../app/information/page.module.css';
import { Character } from './CharacterCard';

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CharacterModal({ character, isOpen, onClose }: CharacterModalProps) {
  if (!character) return null;

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
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent className={styles.modalContent}>
        <ModalHeader>{character.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody className={styles.modalBody}>
          <div className={styles.modalBody}>
            <Image src={character.image} alt={character.name} className={styles.modalImage} />
            <div className={styles.modalInfo}>
              <div className={styles.badgeContainer}>
                <Badge colorScheme={getStatusColor(character.status)}>{character.status}</Badge>
                <Badge colorScheme="blue">{character.species}</Badge>
                {character.type && <Badge colorScheme="purple">{character.type}</Badge>}
              </div>
              <div className={styles.modalInfoRow}>
                <Text className={styles.modalLabel}>Gender:</Text>
                <Text>{character.gender}</Text>
              </div>
              <div className={styles.modalInfoRow}>
                <Text className={styles.modalLabel}>Origin:</Text>
                <Text>{character.origin?.name || 'Unknown'}</Text>
              </div>
              <div className={styles.modalInfoRow}>
                <Text className={styles.modalLabel}>Location:</Text>
                <Text>{character.location?.name || 'Unknown'}</Text>
              </div>
              {character.episode && character.episode.length > 0 && (
                <div className={styles.modalInfoRow}>
                  <Text className={styles.modalLabel}>First Episode:</Text>
                  <Text>{character.episode[0]?.name || 'Unknown'}</Text>
                </div>
              )}
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
