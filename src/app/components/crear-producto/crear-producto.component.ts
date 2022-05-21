import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  productoForm: FormGroup;
  titulo = 'Crear producto'
  id : string | null;
  constructor(private fb : FormBuilder, private router: Router, private toastr: ToastrService, private productoService: ProductoService, private aRouter : ActivatedRoute) { 

    this.productoForm = this.fb.group(
      {
        producto:  ['', Validators.required],
        categoria: ['', Validators.required],
        ubicacion: ['', Validators.required],
        precio:    ['', Validators.required],
      }
    )
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.editar();
  }

  agregarProducto(){
    console.log('agregar prodcuto', this.productoForm)
    const producto : Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria:this.productoForm.get('categoria')?.value,
      ubicacion : this.productoForm.get('ubicacion')?.value,
      precio:this.productoForm.get('precio')?.value,
    }

    if(this.id !== null){
      //Editar producto
      this.productoService.editarProducto(this.id,producto).subscribe(data =>{
        console.log(data)
        this.toastr.success('Producto actualizado con exito!');
        this.router.navigate(['/'])
      })

    }else{
      //Agregar producto
      this.productoService.guardarProducto(producto).subscribe(data =>{
        console.log(data)
        this.toastr.success('Producto agregado con exito!');
        this.router.navigate(['/'])
      })
    }
  }
  editar(){
    if (this.id !== null) {
      this.titulo = 'Editar producto'
      this.productoService.obtenerProducto(this.id).subscribe(data => {
        console.log(data)
        this.productoForm.setValue(
          {
            producto:   data.nombre,
            categoria:  data.categoria,
            ubicacion : data.ubicacion,
            precio:     data.precio,
          }
        )
      })
    }
  }
}
