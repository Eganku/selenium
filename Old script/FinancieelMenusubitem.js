const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const fs = require('fs');
const ReviewUserPage = require('../Page/review.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');

async function example(){

let file2 = 'C:\\Users\\Yeun Wing Wu\\OneDrive - KING Software\\Bureaublad\\Writefile\\VerwFinancieeltemPro.txt'  
let file3 = 'C:\\Users\\Yeun Wing Wu\\OneDrive - KING Software\\Bureaublad\\Writefile\\VerwFinancieelKIDpro.txt'  
let file4 = 'C:\\Users\\Yeun Wing Wu\\OneDrive - KING Software\\Bureaublad\\Writefile\\VerwDashItemPro.txt'  

await ReviewUserPage.wingpdf(555);

"financieel menuitem openklappen"
await Financieelsub();

"Lijst ophalen uit de txtfiles."
try {
    var data = fs.readFileSync(file2, 'utf8').split('\r\n')
    // console.log(data.length);
} catch (err) {
    console.error(err);
}

try {
    var data2 = fs.readFileSync(file3, 'utf8').split('\r\n')
    // console.log(data2.length);
} catch (err) {
    console.error(err);
}

"list bepalen grootte van menu item => 'sideitem' & 'k_id'"
// await driver.wait(until.elementLocated(By.xpath("//div[@id='bar_inner_sidebar_menuitem_1']//li[@role='treeitem']//div[@class='side_item']")), 2000);
var listingITEM = (await driver.findElements(By.xpath("//div[@id='bar_inner_sidebar_menuitem_1']//li[@role='treeitem']//div[@class='side_item']"))).length;
// console.log(parseInt(listingITEM));
var listingKID = (await driver.findElements(By.xpath("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id]"))).length;
// console.log(parseInt(listingKID));

"list bepalen grootte van Data textfile"
var verwachtlistingITEM = data.length;
// console.log(verwachtlistingITEM);
var verwachtlistingKID = data2.length;
// console.log(verwachtlistingKID);

"lijst ophalen in de dom die nu beschikbaar is, handig wanneer je text file moet updaten, let op kost tijd voor menu te laden, moet uit een excel in stadium2"
var naam = [];
for(var i=1; i<=listingITEM; i++){
    naam[i] = await driver.findElement(By.xpath("(//div[@id='bar_inner_sidebar_menuitem_1']//li[@role='treeitem']//div[@class='side_item'])["+i+"]")).getAttribute("innerHTML");  
    "gebruikonderstaande om evt nieuwe lijst te genereren"
    // console.log(naam[i]);
}
// console.log(naam);

var naamKID = [];
for(var i=1; i<=listingKID; i++){
    naamKID[i] = await driver.findElement(By.xpath("(//div[@id='bar_inner_sidebar_menuitem_1']//li[@role='treeitem']//div[@class='side_item'])["+i+"]")).getAttribute("k_id");  
    "gebruikonderstaande om evt nieuwe lijst te genereren"
    //console.log(naamKID[i]);
}
// console.log(naamKID);

console.debug("Compare method van lijst opgegeven in item.txt ");
var compare = [];
var comparetrue = [];
// var comparefalsename = [];
var comparefalseid = [];
for(var i=0; i<=(listingITEM-1); i++){
    compare[i] = ((data[i]) === (naam[i+1]))
    if(compare[i] === true){
    comparetrue[i] = await driver.findElement(By.xpath("(//div[@id='bar_inner_sidebar_menuitem_1']//li[@role='treeitem']//div[@class='side_item'])["+(i+1)+"]"))
    .getAttribute('innerHTML');
    }
    else{
        // comparefalsename[i] = await driver.findElement(By.xpath("(//div[@id='bar_inner_sidebar_menuitem_1']//li[@role='treeitem']//div[@class='side_item'])["+(i+1)+"]")).getAttribute('innerHTML');
        comparefalseid[i] = await driver.findElement(By.xpath("(//div[@id='bar_inner_sidebar_menuitem_1']//li[@role='treeitem']//div[@class='side_item'])["+(i+1)+"]")).getAttribute("k_id");
        console.debug("    Verwachte item =>" + data[i], "<= gevonden item => " + naam[i+1] + "<= met 'K_ID' => " + comparefalseid[i]);
        break
    }
}

if(comparefalseid != 0  ){
    console.debug("    'ERROR' Compare method gaat NIET goed.")
    "output geeft aan waar ongeveer de verschil begint 'empty items' betekend null,"
    console.debug(comparefalseid);
}
else{
    console.debug("    'CHECK' Compare method gaat goed")
}

console.debug("Includes methode lijst van verwachte k_id.txt file");
var include = [];
var includetrue = [];
var includefalse = [];
for(var i=0; i<=(verwachtlistingKID-1); i++){
    include[i] = (naamKID.includes(data2[i]))
    //include[i] = (data2.includes(naamKID[i]))
    if(include[i] === true){
    includetrue[i] = data2[i]
    }
    else{
    includefalse[i] = data2[i]
    console.debug("    'ERROR' Verwachte item NIET gevonden in array =>" + data2[i], "<=" );
    }
}
if(includefalse != 0){
    console.debug("        'ERROR' include methode gaat NIET goed")
    "output geeft aan welk opgegeven k_id komt niet overeen komt, 'empty items' betekend null,"
    console.debug(includefalse)
}
else{
    console.debug("    'CHECK' Include methode gaat goed")
}

"final exitcode wanneer een van de test niet goed gaat"
if((includefalse != 0) + (comparefalseid != 0  )){
    console.debug("'WARNING' een van de test gaat NIET goed");
    console.debug("    aantal gevonden regels sidemenu kloppen? " + (listingITEM === verwachtlistingITEM));
    console.debug("    aantal gevonden regels k_id kloppen? " + (listingKID === verwachtlistingKID));
    process.exit(1)
}
else{
    console.debug("'CHECK' Beide test gaat goed")
    console.debug("    aantal gevonden regels sidemenu kloppen? " + (listingITEM === verwachtlistingITEM));
    console.debug("    aantal gevonden regels k_id kloppen? " + (listingKID === verwachtlistingKID));
}


};
example()

async function clickuntil(element, button, ) { 
    while (true){
        try {
            await driver.wait(until.elementLocated(By.xpath(element)),1000);
            await driver.findElement(By.xpath(element)).click();
            break
        }
        catch(NoSuchElementException){
            await driver.findElement(By.xpath(button)).click();
        }
    }
}

async function menuitemNr() { 
    "Listing vanuit findElements deze zijn Promises lastig te gebruiken behalve voor totale lijst"
    let test2 = await driver.findElements(By.xpath("//div[@id='bar_inner_sidebar_menuitem_1']//li[@role='treeitem']//div[@class='side_item']/ancestor::li"));
    for(let f of test2)
    console.log(await f.getAttribute('id'));

    let test = await driver.findElements(By.xpath("//div[@id='bar_inner_sidebar_menuitem_1']//li[@role='treeitem']//div[@class='side_item']"));
    for(let e of test)
    console.log(await e.getAttribute("innerHTML"));
    
}

async function Financieelsub() { 
    const downscroll ="(//div[@id='jqxScrollAreaDownpanelbar_buffersidebar_menuitem_1verticalScrollBar'])[1]"
    const upscroll = "(//div[@id='jqxScrollAreaUppanelbar_buffersidebar_menuitem_1verticalScrollBar'])[1]"
    await LinkerMenu.FinancieelSideMenu();

    "onderste deel rapportenplus, let op lijst klikt steeds de onderste aan"
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Rapporten Plus')])[1]", "Rapporten Plus");

    await clickuntil("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Factuurregister')])[1]",downscroll);
    await clickuntil("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Verkoop')])[2]",downscroll);
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Inkoop')])[2]", "Inkoop");

    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Contracten')])[1]", "Contracten");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Verkoop')])[1]", "Verkoop");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Verkoop')])[2]", "Verkoop");
    await LinkerMenu.VerifySideMenuCont("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Offerte')])[1]", "Offerte");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Inkoop')])[1]", "Inkoop");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Inkoopprojectbudgetten')])[1]", "Inkoopprojectbudgetten");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Voorraad')])[1]", "Voorraad");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Voorraadhistorie')])[1]", "Voorraadhistorie");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Artikelen/werksoorten')])[1]", "Artikelen/werksoorten");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Prijzen')])[1]", "Prijzen");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Stamgegevens')])[1]", "Stamgegevens");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Samenstellen rekeningschema')])[1]", "Samenstellen rekeningschema")

    "bovenste zichtbare deel raporten plus,let op lijst klikt steeds de onderste aan "
    await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Budgetten')]", "Budgetten");
    await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Projecten: Kostenplaats/Kostendrager')]", "Projecten: Kostenplaats/Kostendrager");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Bankieren')])[2]", "Bankieren");
    await LinkerMenu.VerifySideMenuCont("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Activa-register')])[2]", "Activa-register");
    await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Transitorische boekingen')]", "Transitorische boekingen");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'BTW')])[2]", "BTW");
    await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Financieel')]", "Financieel");
    await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Controles')]", "Controles");
    await LinkerMenu.VerifySideMenuCont("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Vreemde valuta')])[2]", "Vreemde valuta");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Crediteur')])[2]", "Crediteur");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Debiteur')])[2]", "Debiteur");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Grootboek')])[2]", "Grootboek");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Stamgegevens')])[1]", "Stamgegevens");
    await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Algemeen')]", "Algemeen");

    "naar digitaal dossier helemaal boven"
    await clickuntil("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Budgetteren')])[1]",upscroll);

    await LinkerMenu.VerifySideMenuCont("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Werkkostenregeling')])[1]", "Werkkostenregeling");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Onkostendeclaratie')])[1]", "Onkostendeclaratie");

    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Inlezen')])[1]", "Inlezen");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Onverwerkte tabellen')])[1]", "Onverwerkte tabellen");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Lonen')])[1]", "Lonen");

    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Bankieren')])[1]", "Bankieren");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Tabellen / Stamgegevens')])[1]", "Tabellen / Stamgegevens");

    await clickuntil("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Digitaal dossier')])[1]",upscroll);

    await LinkerMenu.VerifySideMenuCont("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Activa-register')])[1]", "Activa-register");

    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Verslaglegging')])[1]", "Verslaglegging");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Rapporten')])[1]", "Rapporten");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Tabellen / Stamgegevens')])[1]", "Tabellen / Stamgegevens");

    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'BTW-aangifte')])[1]", "BTW-aangifte");

    await LinkerMenu.VerifySideMenuCont("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Vreemde valuta')])[1]", "Vreemde valuta");
    
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Rapporten')])[1]", "Rapporten");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Tabellen / Stamgegevens')])[1]", "Tabellen / Stamgegevens");

    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Grootboek')])[1]", "Grootboek");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Exporteren')])[1]", "Exporteren");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Rapporten')])[1]", "Rapporten");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Tabellen / Stamgegevens')])[1]", "Tabellen / Stamgegevens");

    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Crediteur')])[1]", "Crediteur");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Rapporten')])[1]", "Rapporten");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Openstaande posten')])[1]", "Openstaande posten");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Tabellen / Stamgegevens')])[1]", "Tabellen / Stamgegevens");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Medewerker')])[1]", "Medewerker");

    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Debiteur')])[1]", "Debiteur");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Aanmaningen')])[1]", "Aanmaningen");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Rapporten')])[1]", "Rapporten");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Openstaande posten')])[1]", "Openstaande posten");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Tabellen / Stamgegevens')])[1]", "Tabellen / Stamgegevens");

    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Factuur2KING 3.0')])[1]", "Factuur2KING 3.0");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Tabellen / Stamgegevens')])[1]", "Tabellen / Stamgegevens");

    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Overige dossierstukken')])[1]", "Overige dossierstukken");
    await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Inkoopfacturen')])[1]", "Inkoopfacturen");
}