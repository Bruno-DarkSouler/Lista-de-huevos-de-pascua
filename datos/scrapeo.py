from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from funciones import *
import json

options = webdriver.FirefoxOptions()
# options.add_argument("--headless") 



def scrapeoJumbo():
    driverJumbo = webdriver.Firefox(options=options)

    try:
        driverJumbo.get("https://www.jumbo.com.ar/pascua?_q=pascua&map=ft")

        elemento_temp = WebDriverWait(driverJumbo, 100).until(
            lambda d: d.find_element(By.XPATH, "//span[contains(text(), '200 Gr Mantecol')]")
        )

        nombres_productos = driverJumbo.find_elements(By.CSS_SELECTOR, '.vtex-product-summary-2-x-productBrand')
        precios_gramo = driverJumbo.find_elements(By.CSS_SELECTOR, '.vtex-custom-unit-price')
        imagenes_url = driverJumbo.find_elements(By.CSS_SELECTOR, '.vtex-product-summary-2-x-image')

        datos_jumbo = []


        # print(len(nombres_productos), len(precios_gramo), len(imagenes_url))
        for i in range(len(nombres_productos)):
            datos_aux = {
                "nombre": limpiarNombre(nombres_productos[i].text),
                "precio": limpiarGramaje(precios_gramo[i].text),
                "imagen": imagenes_url[i].get_attribute("src")
            }
            datos_jumbo.append(datos_aux)
        guardarDatos(json.dumps(datos_jumbo))


        

    finally:
        driverJumbo.quit()




def scrapeoCoto():
    driverCoto = webdriver.Firefox(options=options)

    try:
        driverCoto.get("https://www.cotodigital.com.ar/sitios/cdigi/productos/huevos-pascua")

        elemento_temp = WebDriverWait(driverCoto, 10).until(
            lambda d: d.find_element(By.CSS_SELECTOR, ".nombre-producto")
        )

        nombres_productos = driverCoto.find_elements(By.CSS_SELECTOR, '.nombre-producto')
        precios_gramo = driverCoto.find_elements(By.XPATH, "//small[contains(text(), 'Precio por')]")
        imagenes_url = driverCoto.find_elements(By.CSS_SELECTOR, '.product-image')

        datos_coto = []
        for i in range(len(nombres_productos)):
            # print(nombres_productos[i].text, precios_gramo[i].text, imagenes_url[i].get_attribute("src"))
            datos_aux = {
                "nombre": limpiarNombre(nombres_productos[i].text),
                "precio": limpiarGramajeCoto(precios_gramo[i].text),
                "imagen": imagenes_url[i].get_attribute("src")
            }
            datos_coto.append(datos_aux)
        guardarDatosCoto(json.dumps(datos_coto))

    finally:
        driverCoto.quit()




def scrapeoDia():
    driverDia = webdriver.Firefox(options=options)

    try:
        driverDia.get("https://diaonline.supermercadosdia.com.ar/huevo%20pascua?_q=huevo%20pascua&map=ft")

        elemento_temp = WebDriverWait(driverDia, 10).until(
            lambda d: d.find_element(By.CSS_SELECTOR, ".diaio-store-5-x-custom_specification_wrapper")
        )

        nombres_productos = driverDia.find_elements(By.CSS_SELECTOR, '.vtex-product-summary-2-x-productBrand')
        precios_gramo = driverDia.find_elements(By.CSS_SELECTOR, '.diaio-store-5-x-custom_specification_wrapper')
        imagenes_url = driverDia.find_elements(By.CSS_SELECTOR, '.vtex-product-summary-2-x-imageNormal')

        datos_dia = []
        print(len(nombres_productos), len(precios_gramo), len(imagenes_url))
        for i in range(len(nombres_productos)):
            datos_aux = {
                "nombre": limpiarNombre(nombres_productos[i].text),
                "precio": limpiarGramajeDia(precios_gramo[i].text),
                "imagen": imagenes_url[i].get_attribute("src")
            }
            datos_dia.append(datos_aux)
        guardarDatosDia(json.dumps(datos_dia))

    finally:
        driverDia.quit()

# scrapeoJumbo()
scrapeoCoto()
# scrapeoDia()