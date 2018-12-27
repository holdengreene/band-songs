export const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://band-songs-api.herokuapp.com'
    : 'http://localhost:8080';
