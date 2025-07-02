import { gql } from '@apollo/client';

export const GET_ANIME_DATA = gql`
  query GetAnimeData($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
        }
        description
        coverImage {
          large
        }
        episodes
        status
        averageScore
      }
    }
  }
`;

export const GET_MANGA_DATA = gql`
  query GetMangaData($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(type: MANGA, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
        }
        description
        coverImage {
          large
        }
        chapters
        status
        averageScore
      }
    }
  }
`; 