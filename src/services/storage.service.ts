import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
}
function store(key: string, value: any): void {
  localStorage[key] = JSON.stringify(value);
}

function load(key: string, defaultValue: any = null): any {
  const value = localStorage[key] || defaultValue;
  return JSON.parse(value);
}

export const storageService = {
  store,
  load
}