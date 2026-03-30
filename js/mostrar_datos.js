const coto = document.getElementById("coto");
const jumbo = document.getElementById("jumbo");
const dia = document.getElementById("dia");

function cargarDatosCoto(){
    let ajax = new XMLHttpRequest();
    ajax.onload = function(){
        let datos = JSON.parse(ajax.responseText);
        datos = ordenarPrecio(datos);
        console.log(datos);
        let contenido_contenedor = ``;
        datos.forEach(producto => {
            contenido_contenedor = contenido_contenedor + `
            <div class="producto">
                <div class="contenedor_imagen">
                    <img src="${producto.imagen}" alt="Imagen producto">
                </div>
                <div class="oferta">
                <span>
                ${producto.oferta}
                </span>
                </div>
                <div class="contenedor_info">
                    <p>${producto.nombre}</p> 
                    <span>Precio por 100g: \$${producto.precio}</span>
                </div>
            </div>
            `;
        });
        coto.innerHTML = contenido_contenedor
    }
    ajax.open("GET", "./datos/datos_coto.json", "true");
    ajax.send();
}

function cargarDatosJumbo(){
    let ajax = new XMLHttpRequest();
    ajax.onload = function(){
        let datos = JSON.parse(ajax.responseText);
        datos = ordenarPrecio(datos);
        // console.log(datos);
        let contenido_contenedor = ``;
        datos.forEach(producto => {
            if(producto.nombre != null){
                contenido_contenedor = contenido_contenedor + `
                <div class="producto">
                    <div class="contenedor_imagen">
                        <img src="${producto.imagen}" alt="Imagen producto">
                    </div>
                    <div class="contenedor_info">
                        <p>${producto.nombre}</p> 
                        <span>Precio por 100g: \$${producto.precio}</span>
                    </div>
                </div>
                `;
            }
        });
        jumbo.innerHTML = contenido_contenedor
    }
    ajax.open("GET", "./datos/datos_jumbo.json", "true");
    ajax.send();
}

function cargarDatosDia(){
    let ajax = new XMLHttpRequest();
    ajax.onload = function(){
        let datos = JSON.parse(ajax.responseText);
        datos = ordenarPrecio(datos);
        // console.log(datos);
        let contenido_contenedor = ``;
        datos.forEach(producto => {
            contenido_contenedor = contenido_contenedor + `
            <div class="producto">
                <div class="contenedor_imagen">
                    <img src="${producto.imagen}" alt="Imagen producto">
                </div>
                <div class="oferta">
                <span>
                ${producto.oferta}
                </span>
                </div>
                <div class="contenedor_info">
                    <p>${producto.nombre}</p> 
                    <span>Precio por 100g: \$${producto.precio}</span>
                </div>
            </div>
            `;
        });
        dia.innerHTML = contenido_contenedor
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

cargarDatosCoto();
cargarDatosDia();
cargarDatosJumbo();