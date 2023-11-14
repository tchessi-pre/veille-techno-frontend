import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  // Enregistrer des données dans localStorage
  saveData(key: string, data: any): void {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (e) {
      console.error('Erreur lors de l’enregistrement dans localStorage', e);
    }
  }

  // Récupérer des données depuis localStorage
  getData(key: string): any {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData === null) {
        return undefined;
      }
      return JSON.parse(serializedData);
    } catch (e) {
      console.error('Erreur lors de la récupération des données de localStorage', e);
      return undefined;
    }
  }
}
