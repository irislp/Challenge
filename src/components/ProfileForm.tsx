import { VStack, Heading, Text, Input, Button, FormLabel, Badge } from '@chakra-ui/react';
import styles from '../app/profile/page.module.css';

interface ProfileFormProps {
  userData: { username: string; jobTitle: string };
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onInputChange: (field: string, value: string) => void;
  formData: { username: string; jobTitle: string };
  memberSince?: string;
}

export default function ProfileForm({
  userData,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onInputChange,
  formData,
  memberSince,
}: ProfileFormProps) {
  return (
    <div className={`${styles.profileContent} ${isEditing ? styles.editing : ''}`}>
      {!isEditing ? (
        <VStack spacing={4} align="stretch">
          <div className={styles.cardHeader}>
            <Heading size="md" className={styles.cardTitle}>
              Profile Information
            </Heading>
            <Button colorScheme="blue" onClick={onEdit} className={styles.editButton}>
              Edit Profile
            </Button>
          </div>
          <hr className={styles.divider} />
          <div className={styles.profileField}>
            <Text className={styles.fieldLabel}>Username</Text>
            <Text className={styles.fieldValue}>{userData.username}</Text>
          </div>
          <div className={styles.profileField}>
            <Text className={styles.fieldLabel}>Job Title</Text>
            <Text className={styles.fieldValue}>{userData.jobTitle}</Text>
          </div>
          <div className={styles.profileField}>
            <Text className={styles.fieldLabel}>Member Since</Text>
            <Text className={styles.fieldValue}>{memberSince || ''}</Text>
          </div>
        </VStack>
      ) : (
        <VStack spacing={4} align="stretch">
          <div className={styles.cardHeader}>
            <Heading size="md" className={styles.cardTitle}>
              Edit Profile
            </Heading>
            <Badge colorScheme="blue" className={styles.editingBadge}>
              Editing
            </Badge>
          </div>
          <hr className={styles.divider} />
          <div className={styles.formGroup}>
            <FormLabel className={styles.formLabel}>Username</FormLabel>
            <Input
              value={formData.username}
              onChange={(e) => onInputChange('username', e.target.value)}
              placeholder="Enter your username"
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <FormLabel className={styles.formLabel}>Job Title</FormLabel>
            <Input
              value={formData.jobTitle}
              onChange={(e) => onInputChange('jobTitle', e.target.value)}
              placeholder="Enter your job title"
              className={styles.formInput}
            />
          </div>
          <div className={styles.buttonGroup}>
            <Button variant="outline" onClick={onCancel} className={styles.cancelButton}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onSave} className={styles.saveButton}>
              Save Changes
            </Button>
          </div>
        </VStack>
      )}
    </div>
  );
}
