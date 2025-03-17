import axios, { AxiosResponse } from 'axios';
import { Planet, Moon } from './interfaces';

const API_URL = 'http://localhost:5172';

export const api = axios.create({
    baseURL: API_URL
});

// Planets API
export const getPlanets = (): Promise<AxiosResponse<Planet[]>> => api.get('/planets');
export const getPlanet = (id: number): Promise<AxiosResponse<Planet>> => api.get(`/planets/${id}`);
export const createPlanet = (planet: Omit<Planet, 'id'>): Promise<AxiosResponse<Planet>> => 
    api.post('/planets', planet);
export const updatePlanet = (id: number, planet: Planet): Promise<AxiosResponse<Planet>> => 
    api.put(`/planets/${id}`, planet);
export const deletePlanet = (id: number): Promise<AxiosResponse<void>> => 
    api.delete(`/planets/${id}`);

// Moons API
export const getMoons = () => api.get<Moon[]>('/moons');
export const getMoon = (id: number) => api.get<Moon>(`/moons/${id}`);
export const createMoon = (moon: Omit<Moon, 'id'>) => api.post<Moon>('/moons', moon);
export const updateMoon = (id: number, moon: Moon) => api.put<Moon>(`/moons/${id}`, moon);
export const deleteMoon = (id: number) => api.delete(`/moons/${id}`);