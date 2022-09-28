import axios from 'axios';

export const customAPIURL =
  process.env.NODE_ENV === 'development'
    ? 'https://pokedex-api.ondaniel.com.br/'
    : 'http://localhost:3000/';

export const customAPI = axios.create({
  baseURL: customAPIURL,
});

export default customAPI;
