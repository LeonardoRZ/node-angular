import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  listaProductos : Producto[] = [];

  constructor(private productoService: ProductoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.productoService.getProductos().subscribe(data => {
      console.log(data)
      this.listaProductos = data.docs;
    });
  }

  eliminarProducto(id : any){
    this.productoService.eliminarProducto(id).subscribe(data => {
      console.log(data)
      this.toastr.success('Producto eliminado con exito!');
      this.obtenerProductos();
    })
  }

}
