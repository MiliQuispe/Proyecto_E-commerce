document.addEventListener('DOMContentLoaded',() => {
    
    const renderizarProductos = () => {
        let carrito= JSON.parse(localStorage.getItem('carrito')) || []; /*  se pide en el almacenamiento del navegador */
        
        productosEnCarrito(carrito);
        
        let seccionCarrito = document.getElementById("contenedor-carrito");
        seccionCarrito.innerHTML = ''; // Limpiar el contenedor antes de renderizar

        if (!carrito.length) {
            
            let mensajeCarrito = document.createElement("p");
            mensajeCarrito.classList.add("mensaje-carrito");
            mensajeCarrito.textContent = "No hay productos";

            seccionCarrito.appendChild(mensajeCarrito); /* Esto es para agregar el mensaje a la sección del carrito */
            return;
        }else{

            carrito.forEach((elemento, index) => {

                let tarjetaProducto = document.createElement("article");
                tarjetaProducto.classList.add("producto-carrito"); /* le agrego una clase a la tarjeta del producto */

                let imgProducto = document.createElement("img");
                imgProducto.src = elemento.images[0]; /* imagen del producto */
                imgProducto.alt = elemento.description; /* descripcion de la imagen */

                let tituloProducto = document.createElement("h3");
                tituloProducto.classList.add("titulo-producto");
                tituloProducto.textContent = elemento.title; /* titulo del producto */

                let precioProducto = document.createElement("p");
                precioProducto.textContent = `$${elemento.price}`; /* precio del producto interpolado */

                /* elimina el producto */
                let btnEliminar = document.createElement("button");
                btnEliminar.classList.add("btn-eliminar-carito"); /* le agrego una clase al boton */
                btnEliminar.textContent = "Eliminar"; /* texto del boton */
                
                btnEliminar.addEventListener("click", () => { /* evento click */
                    
                    eliminarProducto(index); /* elimina el producto del carrito y du parametro es el indice */
                });

                tarjetaProducto.appendChild(imgProducto);
                tarjetaProducto.appendChild(tituloProducto);
                tarjetaProducto.appendChild(precioProducto);
                tarjetaProducto.appendChild(btnEliminar);

                seccionCarrito.appendChild(tarjetaProducto); /* agrega la tarjeta al contenedor del carrito */
                
            });
        }
        renderizarBotones(); /* llama a la funcion para renderizar los botones */
    };

    const renderizarBotones = () => {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || []; /* se pide en el almacenamiento del navegador */

        let divAcciones = document.getElementById("acciones-carrito"); /* accedo al divdel html*/
        divAcciones.innerHTML = ''; // Limpiar el contenedor antes de renderizar

        if (carrito.length) {

            let btnVaciar = document.createElement("button");
            btnVaciar.textContent = "Vaciar carrito"; /* texto del boton */

            btnVaciar.addEventListener("click", () => {
                vaciarCarrito(); /* vacia el carrito */
            });

            let btnFinalizar = document.createElement("button");
            btnFinalizar.textContent = "Finalizar compra"; /* texto del boton */

            btnFinalizar.addEventListener("click", () => {
                let confirmado = confirm("¿Estás seguro de que desea finalizar la compra?"); /* pregunta al usuario si esta seguro, y le indica que debe aceptar o negar (interaccion) */
                if (confirmado) {
                    alert("Gracias por su compra"); /* alerta de agradecimiento */
                    localStorage.removeItem('carrito'); /* elimina el carrito del localStorage */
                    window.location.href = "../index.html"; /* redirecciona a la pagina principal */
                }
            });
            divAcciones.appendChild(btnVaciar); /* agrega el boton de vaciar al contenedor */
            divAcciones.appendChild(btnFinalizar); /* agrega el boton de finalizar al contenedor */

        }


    };

    const productosEnCarrito= (carrito) => {

        let contadorCarrito = document.getElementById("contador-carrito"); /* accedo al contador del carrito */
        contadorCarrito.textContent = carrito.length; /* actualiza el contador con la cantidad de productos en el carrito */
    };

    const eliminarProducto = (indice) => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || []; /* se pide en el almacenamiento del navegador */
        carrito.splice(indice, 1); /* elimina un solo producto del carrito en la posicion indicada */

        localStorage.setItem("carrito", JSON.stringify(carrito)); /* guarda el carrito actualizado en el localStorage */
        alert("Producto eliminado del carrito"); /* alerta de producto eliminado */
        renderizarProductos(); /* vuelve a renderizar los productos en el carrito */
    };

    const vaciarCarrito = () => {
        localStorage.removeItem("carrito"); /* elimina el carrito del localStorage */
        alert("Vaciando carrito"); /* alerta de carrito vaciado */
        renderizarProductos(); /* vuelve a renderizar los productos en el carrito */
    };

    renderizarProductos(); /* llama a la funcion para renderizar los productos en el carrito */

});