import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url = 'http://localhost:4000/api/productos/';

  constructor( private http: HttpClient) { }

  getProductos(page? : number, limit? : number):Observable<any> {
    const limite = limit ? limit : 5;
    const pagina = page ? page : 1;
    const url = 'http://localhost:4000/api/productos'
    return this.http.get(url + `?limit=${limite}&page=${pagina}`);
  }

  eliminarProducto(id : string):Observable<any> {
    return this.http.delete(this.url + id)
  }

  guardarProducto(producto : Producto):Observable<Producto> {
    return this.http.post<Producto>(this.url, producto)
  }

  obtenerProducto(id : string):Observable<any>{
    return this.http.get(this.url + id)
  }

  editarProducto(id: string, producto:Producto):Observable<any>{
    return this.http.put(this.url + id, producto)
  }
}
