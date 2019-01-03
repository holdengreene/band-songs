export const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.ppandthekids.com'
    : 'http://localhost:8080';
