import path from 'path';
import fs from 'fs/promises';

async function getFile() {
    try{
        const cesta = path.resolve('./storage/agents/settings.json');
        const data = await fs.readFile(cesta, 'utf-8');
        const nastaveni = JSON.parse(data);
        
        nastaveni.status = "active";
        nastaveni.lastDate = new Date().toISOString();

        await fs.writeFile(cesta, JSON.stringify(nastaveni, null, 2), 'utf-8')
        
        console.log('soubor je uspesne nahrany')
    }catch (error) {
        console.error(`nastala chyba: ${error.message} `)
    }

}


