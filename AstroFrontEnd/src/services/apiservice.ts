import axios from 'axios';
import { Planet, Moon } from './interfaces';

const API_URL = 'http://localhost:5172/api';

export const api = axios.create({
    baseURL: API_URL
});

// Planets API
export const getPlanets = () => api.get<Planet[]>('/planets');
export const getPlanet = (id: number) => api.get<Planet>(`/planets/${id}`);
export const createPlanet = (planet: Omit<Planet, 'id'>) => api.post<Planet>('/planets', planet);
export const updatePlanet = (id: number, planet: Planet) => api.put<Planet>(`/planets/${id}`, planet);
export const deletePlanet = (id: number) => api.delete(`/planets/${id}`);

// Moons API
export const getMoons = () => api.get<Moon[]>('/moons');
export const getMoon = (id: number) => api.get<Moon>(`/moons/${id}`);
export const createMoon = (moon: Omit<Moon, 'id'>) => api.post<Moon>('/moons', moon);
export const updateMoon = (id: number, moon: Moon) => api.put<Moon>(`/moons/${id}`, moon);
export const deleteMoon = (id: number) => api.delete(`/moons/${id}`);