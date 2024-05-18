import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CatalogService {
  constructor(private httpClient: HttpClient) { }


}
