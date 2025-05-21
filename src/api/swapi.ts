import axios from 'axios';

// Proxy URL to avoid CORS issues
export const PROXY_URL = 'https://thingproxy.freeboard.io/fetch/';

// Create an Axios instance with base URL and default headers
const apiClient = axios.create({
  baseURL: `${PROXY_URL}https://swapi.dev/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

/**
 * Fetches a paginated list of people from the Star Wars API.
 * @param page - The page number to fetch.
 * @param search - Optional search query to filter results by name.
 * @returns Axios promise with people data.
 */
export const fetchPeople = (page: number, search?: string) => {
  return apiClient.get('/people', { params: { page, search } });
};

/**
 * Fetches any resource by its full URL.
 * Useful for fetching related entities like homeworld, films, or species.
 * @param url - The full URL of the resource.
 * @returns Axios promise with the resource data.
 */
export const fetchResource = (url: string) => {
  return axios.get(url);
};
