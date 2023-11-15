import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  saveData(key: string, data: any): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
      } catch (e) {
        console.error('Erreur lors de l’enregistrement dans localStorage', e);
      }
    }
  }

  getData(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const serializedData = localStorage.getItem(key);
        if (serializedData === null) {
          return undefined;
        }
        return JSON.parse(serializedData);
      } catch (e) {
        console.error(
          'Erreur lors de la récupération des données de localStorage',
          e
        );
        return undefined;
      }
    }
    return undefined;
  }
}
