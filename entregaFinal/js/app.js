document.addEventListener('DOMContentLoaded',() => {
 
    
        // Si es la primera visita, borramos el carrito y marcamos que ya entró
    if (!localStorage.getItem('visita_inicial')) {
        localStorage.setItem('visita_inicial', 'true'); // marcamos que ya visitó
        localStorage.removeItem('carrito'); // limpiamos el carrito
    }

    /* Lo que recivo es un JAson y lo convierto en un objeto de javascrip 
        || [] --> o devuelve un valor nullo si no devuelve nada */
    let carrito= JSON.parse(localStorage.getItem('carrito')) || []; 


    /* funcion-expresion guardada en una variable y se la debe declarar antes de utilizarla
        en cambio funtion se la puede declarar antes de definirla  */
    const renderizarProductos = () => {

        /* url= "https://dummyjson.com/products?limit=10"; */
        /* url= "https://dummyjson.com/products/category/groceries"; */
        url= "https://dummyjson.com/products/category/mobile-accessories";
        /* url= "https://dummyjson.com/products"; */

        fetch(url) /* pide datos a la url */
            .then(response => response.json()) /* convierte la respuesta a un objeto javascrip */ /* Es data.products debido a que la informacon esta contruida de esa manera, un objecto que contiene una lista */
            .then(data => { /* obtiene los datos y los procesa en una funcion */

                let contenedorProductos = document.getElementById(
                    "contenedor-productos"); /* contenedor de los productos */

                for (const producto of data.products) { /* recorre los productos */
                    
                    /* crear un elemento, en nuetsro caso la tarjeta del producto */
                    let tarjetaProducto = document.createElement("article"); 
                    tarjetaProducto.classList.add("tarjeta-producto"); /* le agrego una clase */

                    /* crear la imagen que se mostrara*/
                    let imagenProducto = document.createElement("img"); /* elemento imagen */
                    imagenProducto.src = producto.images[0]; /* la imagen del producto */
                    imagenProducto.alt = producto.description; /* descripcion de la imagen */

                    /* crear el titulo que se mostrara */
                    let tituloProducto = document.createElement("h3");
                    tituloProducto.classList.add("titulo-producto"); /* le agrego una clase */
                    tituloProducto.textContent = producto.title; /* le agrego el texto, el titulo del producto */

                    /* crear donde se alojara el precio */
                    let precioProducto = document.createElement("p");
                    precioProducto.textContent = `$${producto.price}`; /* le agrego el precio del producto, ademas del signo $ */
                
                    /* crear el boton de agregar al carrito */
                    let btnAgregar = document.createElement("button");
                    btnAgregar.textContent = "Agregar al carrito de compras"; /* texto del boton */
                    
                    btnAgregar.addEventListener("click", (e) => { /* evento click */
                        
                        e.preventDefault(); // 🔴 Evita que el navegador recargue la página
                        
                        /* funciones para agregar el carrito y mostrar */
                        agregarAlCarrito(producto); /* agrega el producto al carrito */
                        actualizarCantAgregados(); /* actualiza la cantidad de productos agregados */
                    });

                
                    /*  agregar los productos en el dom, creando un hijos  */
                    /* por reglas de composicion, vamos de lo mas especifico hacia lo mas general */

                    tarjetaProducto.appendChild(imagenProducto); /* agrego la imagen a la tarjeta */
                    tarjetaProducto.appendChild(tituloProducto); /* agrego el titulo a la tarjeta */
                    tarjetaProducto.appendChild(precioProducto); /* agrego el precio a la tarjeta */
                    tarjetaProducto.appendChild(btnAgregar); /* agrego el boton a la tarjeta */

                    contenedorProductos.appendChild(tarjetaProducto); /* agrego la tarjeta al contenedor de productos */


                };

            }) 
            
            .catch(error => console.error('Error al cargar los productos:', error)); /* muestra si hubo un error */

    }

    /* Se definiran las funciones del boton */
    const agregarAlCarrito = (producto) => {
        /* Agrega el producto al carrito */
        carrito.push(producto); /* agrega el producto al carrito */
         /* guarda el carrito en el localStorage, es decir , elalmacenamiento del navegador  */
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    const actualizarCantAgregados = () => {
        /* Actualiza la cantidad de productos agregados al carrito */
        let cantAgregados = document.getElementById("contador-carrito"); /* obtiene el elemento del DOM */
        cantAgregados.textContent = carrito.length; /* actualiza el texto con la cantidad de productos en el carrito */
    };

    /*  Se envoca la renderizacion y la cant actualizada */
    renderizarProductos(); /* llama a la funcion para renderizar los productos */
    actualizarCantAgregados(); /* llama a la funcion para actualizar la cantidad de productos agregados al carrito.  Se lee nuevamente para actualizar*/


});