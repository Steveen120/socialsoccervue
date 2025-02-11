// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '../data/matches.json', // URL base de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
