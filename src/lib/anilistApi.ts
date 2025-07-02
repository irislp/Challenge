import { GET_ANIME_DATA, GET_MANGA_DATA } from '../graphql/queries';

/** AniList GraphQL API endpoint */
const ANILIST_API_URL = 'https://graphql.anilist.co';

/** Anime data structure */
export interface AnimeData {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  description: string;
  coverImage: {
    large: string;
  };
  episodes: number;
  status: string;
  averageScore: number;
}

/** Manga data structure */
export interface MangaData {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  description: string;
  coverImage: {
    large: string;
  };
  chapters: number;
  status: string;
  averageScore: number;
}

/** Fetch popular anime data */
export const fetchAnimeData = async (
  page: number = 1,
  perPage: number = 10
): Promise<AnimeData[]> => {
  try {
    const response = await fetch(ANILIST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: GET_ANIME_DATA.loc?.source.body,
        variables: { page, perPage },
      }),
    });

    const data = await response.json();
    return data.data.Page.media;
  } catch (error) {
    console.error('Error fetching anime data:', error);
    return [];
  }
};

/** Fetch popular manga data */
export const fetchMangaData = async (
  page: number = 1,
  perPage: number = 10
): Promise<MangaData[]> => {
  try {
    const response = await fetch(ANILIST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: GET_MANGA_DATA.loc?.source.body,
        variables: { page, perPage },
      }),
    });

    const data = await response.json();
    return data.data.Page.media;
  } catch (error) {
    console.error('Error fetching manga data:', error);
    return [];
  }
};
