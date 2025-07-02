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

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Alive':
      return 'green';
    case 'Dead':
      return 'red';
    default:
      return 'gray';
  }
};
