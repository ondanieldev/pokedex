import axios from 'axios';

export const pokeAPIURL = 'https://pokeapi.co/api/v2/';

export const pokeAPI = axios.create({
  baseURL: pokeAPIURL,
});

export default pokeAPI;
