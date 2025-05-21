import axios from 'axios';

const API = axios.create({ 
    baseURL: 'https://thingproxy.freeboard.io/fetch/https://swapi.dev/api',
    headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false
});

export const fetchPeople = (page: number, search?: string) => 
  API.get('/people', { params: { page, search } });

export const fetchResource = (url: string) => axios.get(url);

export const proxy = 'https://thingproxy.freeboard.io/fetch/'