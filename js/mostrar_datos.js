const coto = document.getElementById("coto");
const jumbo = document.getElementById("jumbo");
const dia = document.getElementById("dia");
let datos_coto;
let datos_dia;
let datos_jumbo;
let datos_generales;
const lista_productos = document.getElementById("lista_productos");
let contenido = "";
const barra_busqueda = document.getElementById("barra_busqueda");

function cargarDatosCoto(callback){
    let ajax = new XMLHttpRequest();
    ajax.onload = function(){
        let datos = JSON.parse(ajax.responseText);
        for(let i = 0; i < datos.length; i++){
            datos[i].mercado = "coto";
        }
        callback(datos);
    }
    ajax.open("GET", "./datos/datos_coto.json", "true");
    ajax.send();
}

function cargarDatosJumbo(callback){
    let ajax = new XMLHttpRequest();
    ajax.onload = function(){
        let datos = JSON.parse(ajax.responseText);
        for(let i = 0; i < datos.length; i++){
            datos[i].mercado = "jumbo";
        }
        callback(datos);
        datos_generales = [...datos_coto, ...datos_dia, ...datos_jumbo];

    crear_productos(ordenarPrecio(datos_generales));
        console.log(ordenarPrecio(datos_generales));
    }
    ajax.open("GET", "./datos/datos_jumbo.json", "true");
    ajax.send();
}

function cargarDatosDia(callback){
    let ajax = new XMLHttpRequest();
    ajax.onload = function(){
        let datos = JSON.parse(ajax.responseText);
        for(let i = 0; i < datos.length; i++){
            datos[i].mercado = "dia";
        }
        callback(datos);
    }
    ajax.open("GET", "./datos/datos_dia.json", "true");
    ajax.send();
}

function ordenarPrecio(datos_desordenados){
    let datos_aux = datos_desordenados;
    let datos_ordenados = [];
    let menor = 0;

    for(let j = 0; j < datos_aux.length; j++){
        for(let i = 0; i < datos_aux.length; i++){
            if(datos_aux[menor].precio > datos_aux[i].precio){
                menor = i;
            }
        }
        datos_aux[menor].precio = Math.round(datos_aux[menor].precio);
        const menor_precio = { ...datos_aux[menor]};
        datos_ordenados.push(menor_precio);
        datos_aux[menor].precio = 10000000000;
    }
    // console.log(datos_ordenados)
    return datos_ordenados;
}



cargarDatosCoto(function(datos){
    datos_coto = datos;
});

cargarDatosDia(function(datos){
    datos_dia = datos;
});

cargarDatosJumbo(function(datos){
    datos_jumbo = datos;
});



function crear_productos(datos_productos){
    datos_productos.forEach(producto => {
        if(producto.mercado == "dia"){
            contenido += `
            <div class="producto">
                <div class="contenedor_img_producto">
                    <img src="${producto.imagen}" alt="Imagen producto">
                </div>
                <div class="contenedor_nombre">
                    ${producto.nombre}
                </div>
                <div class="contenedor_precio">
                    <div>
                        Precio x 100g: <br>
                        <span>\$${Math.round(producto.precio)}</span>
                    </div>
                </div>
                <div class="contenedor_oferta">
                    <div>
                        Oferta/Descuento: <br>
                        <span>${producto.oferta}</span>
                    </div>
                </div>
                <div class="contenedor_img_mercado">
                    <img src="./img/dia.png" alt="Imagen supermercado">
                </div>
            </div>
            `
        }else{
            if(producto.mercado == "jumbo"){
                contenido += `
                <div class="producto">
                    <div class="contenedor_img_producto">
                        <img src="${producto.imagen}" alt="Imagen producto">
                    </div>
                    <div class="contenedor_nombre">
                        ${producto.nombre}
                    </div>
                    <div class="contenedor_precio">
                        <div>
                            Precio x 100g: <br>
                            <span>\$${Math.round(producto.precio)}</span>
                        </div>
                    </div>
                    <div class="contenedor_oferta">
                        <div>
                            Oferta/Descuento: <br>
                            <span>Ninguna</span>
                        </div>
                    </div>
                    <div class="contenedor_img_mercado">
                        <img src="./img/jumbo.png" alt="Imagen supermercado">
                    </div>
                </div>
                `
            }else{
                contenido += `
                <div class="producto">
                    <div class="contenedor_img_producto">
                        <img src="${producto.imagen}" alt="Imagen producto">
                    </div>
                    <div class="contenedor_nombre">
                        ${producto.nombre}
                    </div>
                    <div class="contenedor_precio">
                        <div>
                            Precio x 100g: <br>
                            <span>\$${Math.round(producto.precio)}</span>
                        </div>
                    </div>
                    <div class="contenedor_oferta">
                        <div>
                            Oferta/Descuento: <br>
                            <span>${producto.oferta}</span>
                        </div>
                    </div>
                    <div class="contenedor_img_mercado">
                        <img src="./img/coto.jpg" alt="Imagen supermercado">
                    </div>
                </div>
                `
            }
        }
    });
    
    lista_productos.innerHTML = contenido;
}

function ocultarProductos(){
    const productos = document.getElementsByClassName("producto");

    for(let i = 0; i < productos.length; i++){
        productos[i].classList.add("oculto");
    }
}

function buscarProductos(){
    const nombres = document.getElementsByClassName("contenedor_nombre");
    ocultarProductos()

    for(let i = 0; i < nombres.length; i++){
        if(nombres[i].innerHTML.toLocaleLowerCase().includes(barra_busqueda.value.toLowerCase())){
            nombres[i].parentElement.classList.remove("oculto");
        }
    }
}

barra_busqueda.onkeyup = buscarProductos;