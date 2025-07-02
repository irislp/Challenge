/** User data structure */
export interface UserData {
  username: string;
  jobTitle: string;
  isCompleted: boolean;
}

/**
 * Local storage key used to persist user data in the browser.
 * This key is used consistently across all user storage operations.
 */
const USER_DATA_KEY = 'userData';

/** Save user data to localStorage */
export const saveUserData = (userData: UserData): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }
};

/** Get user data from localStorage */
export const getUserData = (): UserData | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

/** Clear user data from localStorage */
export const clearUserData = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_DATA_KEY);
  }
};
