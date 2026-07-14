const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Esta es una página de "estado" para saber que el servidor está vivo
app.get('/', (req, res) => {
    res.send('El navegador invisible está funcionando y tu bot está abierto.');
});

app.listen(port, async () => {
    console.log(`Servidor de monitoreo escuchando en el puerto ${port}`);

    try {
        console.log("Iniciando el navegador invisible...");
        // Configuraciones especiales para que funcione en servidores en la nube
        const browser = await puppeteer.launch({
            headless: "new",
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage'
            ] 
        });
        
        const page = await browser.newPage();
        
        console.log("Abriendo el bot foca.bot...");
        await page.goto('https://jere32-game.github.io/32-GPT/');
        console.log("¡Página abierta con éxito! Tu bot ahora está conectado a Discord.");
        
        // No ponemos "browser.close()" para que la pestaña se quede abierta infinitamente.
        
    } catch (error) {
        console.error("Hubo un error al abrir el navegador:", error);
    }
});
