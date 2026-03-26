def limpiarNombre(nombre):
    for i in range(len(nombre)):
        if nombre[i].isdigit():
            return nombre[:i]
    return nombre
        
def limpiarGramaje(gramaje):
    precio = gramaje[gramaje.find(":") + 3 : gramaje.find("PRECIO") - 1]
    precio = precio.replace(".", "")
    precio = float(precio.replace(",", "."))
    if gramaje.find("x 100 gr") == -1:
        precio /= 10
    return precio

def limpiarGramajeCoto(gramaje):
    precio = gramaje[::-1]
    precio = precio[: precio.find("$")]
    precio = precio.replace(".", "")
    precio = precio.replace(",", ".")
    precio = float(precio[::-1])
    if gramaje.find("1 Kilo") != -1:
        return precio / 10
    return precio

def limpiarGramajeDia(gramaje):
    precio = gramaje[::-1]
    precio = precio[: precio.find(" $")]
    precio = precio.replace(".", "")
    precio = precio.replace(",", ".")
    precio = float(precio[::-1])
    if gramaje.find("1 Kg") != -1:
        precio /= 10
    else:
        precio *= 10
    return precio


def guardarDatos(datos):
    with open("datos_jumbo.json", "w") as archivo:
        archivo.write(datos)

def guardarDatosCoto(datos):
    with open("datos_coto.json", "w") as archivo:
        archivo.write(datos)

def guardarDatosDia(datos):
    with open("datos_dia.json", "w") as archivo:
        archivo.write(datos)


# print(limpiarGramaje("precio regular x 100 gr.: $10000,00 PRECIO adawdafaw"))

# print(limpiarGramajeCoto("Precio por un 1 Kilo: $10000,00"))