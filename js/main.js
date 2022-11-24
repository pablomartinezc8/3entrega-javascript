// PRODUCTOS
const productos = [
   // libros
   {
       id: "libro-01",
       titulo: "libro 01",
       imagen:  "https://res.cloudinary.com/dur9hgubk/image/upload/v1666292525/proyectoFinal/149303297f0928113fecfea5d8314ed0_hh86ar.webp",
       categoria: {
           nombre: "Abrigos",
           id: "abrigos"
       },
       precio: 1000
   },
   {
       id: "libro-02",
       titulo: "libro 02",
       imagen:  "https://res.cloudinary.com/dur9hgubk/image/upload/v1666292060/proyectoFinal/eff19435e8d8fac15d6e38be0561e23c_mnhiat.jpg",
       categoria: {
           nombre: "libros",
           id: "libros"
       },
       precio: 2000
   },
   {
       id: "libro-03",
       titulo: "libro 03",
       imagen: "https://res.cloudinary.com/dur9hgubk/image/upload/v1666292058/proyectoFinal/9788473565134-es_iqttuz.jpg",
       categoria: {
           nombre: "libros"
       },
       precio: 3000
   },
   {
       id: "libro-04",
       titulo: "libro 04",
       imagen: "https://res.cloudinary.com/dur9hgubk/image/upload/v1666292055/proyectoFinal/978607174058_sufvoy.jpg",
       categoria: {
           nombre: "libros",
           id: "libros"
       },
       precio: 4000
   },
   {
       id: "libro-05",
       titulo: "libro 05",
       imagen: "https://res.cloudinary.com/dur9hgubk/image/upload/v1666292054/proyectoFinal/1586923845_qi6fxj.webp",
       categoria: {
           nombre: "libros",
           id: "libros"
       },
       precio: 5000
   },
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

   contenedorProductos.innerHTML = "";

   productosElegidos.forEach(producto => {

       const div = document.createElement("div");
       div.classList.add("producto");
       div.innerHTML = `
           <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
           <div class="producto-detalles">
               <h3 class="producto-titulo">${producto.titulo}</h3>
               <p class="producto-precio">$${producto.precio}</p>
               <button class="producto-agregar" id="${producto.id}">Agregar</button>
           </div>
       `;

       contenedorProductos.append(div);
   })

   actualizarBotonesAgregar();
}

cargarProductos(productos);

function actualizarBotonesAgregar() {
   botonesAgregar = document.querySelectorAll(".producto-agregar");

   botonesAgregar.forEach(boton => {
       boton.addEventListener("click", agregarAlCarrito);
   });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
   productosEnCarrito = JSON.parse(productosEnCarritoLS);
   actualizarNumerito();
} else {
   productosEnCarrito = [];
}

function agregarAlCarrito(e) {
   const idBoton = e.currentTarget.id;
   const productoAgregado = productos.find(producto => producto.id === idBoton);

   if(productosEnCarrito.some(producto => producto.id === idBoton)) {
       const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
       productosEnCarrito[index].cantidad++;
   } else {
       productoAgregado.cantidad = 1;
       productosEnCarrito.push(productoAgregado);
   }

   actualizarNumerito();

   localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
   let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
   numerito.innerText = nuevoNumerito;
}