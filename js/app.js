// Creamos un array vacio
let shoppingBasket = [];

// Rescatamos todas las card
const card = document.querySelector('.card');

// Función para agregar al carrito los datos
function addCard(boton) {
    // Accedemos a la información y creamos un objeto con ella
    const infoCard = boton.parentElement;
    // Volvemos a la card a través del boton
    const cardBoton = boton.parentElement.parentElement;
    // Accedemos a la imagen de la card
    const img = cardBoton.querySelector('img.imagen-curso');
    // Rescatamos todos los valores y los metemos en un objeto
    let product = {
        imagen: img.src,
        nombre: infoCard.querySelector('h4').textContent,
        precio: infoCard.querySelector('.precio').textContent,
        cantidad: 1
    };
    // Por último lo agregamos al carrito
    shoppingBasket.push(product);
    mostrarDatos(shoppingBasket); // Llamamos a mostrarDatos cada vez que se añade un producto
}

// Ahora vamos a hacer una función la cual aplique a todos los botones un addEventListener
function addEventButton() {
    // Rescatamos todos los botones
    const allButtons = document.querySelectorAll('.agregar-carrito');
    // Ahora recorremos el array que nos da querySelectorAll y añadimos un evento a cada uno
    // Cada boton cuando se pulse llamara a la funcion addCard
    allButtons.forEach(boton => {
        boton.addEventListener('click', () => addCard(boton));
    });
}

// Creamos la función que muestre en el carrito los datos del array
function mostrarDatos(arrayCard) {
    //Rescatamos el carrito
    const listShoppingBasket = document.querySelector("#lista-carrito tbody");
    //Limpiamos el contenido anterior del carrito
    listShoppingBasket.innerHTML = '';

    //Por último, recorremos el array de objetos y los mostramos en el carrito
    arrayCard.forEach((curso, index) => {
        let tr = document.createElement('tr');

        // Creamos su td con su información
        let td1 = document.createElement('td');
        let img = document.createElement('img');
        img.src = curso.imagen;
        td1.appendChild(img);

        let td2 = document.createElement('td');
        td2.textContent = curso.nombre;

        let td3 = document.createElement('td');
        td3.textContent = curso.precio;

        let td4 = document.createElement('td');
        td4.textContent = curso.cantidad;

        let td5 = document.createElement('td');

        //Creamos un boton borrar
        const boton = document.createElement('button');

        //Asignar las clases de Bootstrap
        boton.className = 'btn btn-danger'; 

        //Establecer el texto del botón
        boton.textContent = 'Delete';
        
        //Añadir evento para eliminar el curso
        boton.addEventListener('click', () => {
            //Eliminamos el curso del array
            shoppingBasket.splice(index, 1);
            //Volvemos a pintar la tabla
            mostrarDatos(shoppingBasket);
        });
        
        td5.appendChild(boton);

        //Lo agregamos al tr
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        //Lo agregamos al tbody
        listShoppingBasket.appendChild(tr);
    });
}

//Agregamos el evento al botón Vaciar Carrito
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
vaciarCarritoBtn.addEventListener('click', () => {
    //Limpiamos el array
    shoppingBasket = [];
     //Volvemos a pintar la tabla
    mostrarDatos(shoppingBasket);
});

//Llamamos a la funcion añadir evento al boton para que se pueda acceder en caso de que el usuario pulse algun boton
addEventButton();
