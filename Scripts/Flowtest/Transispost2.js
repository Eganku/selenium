const {Builder, By, Actions, Key, until,} = require('selenium-webdriver');
const HomePage = require('../Page/home.page.js');
const ReviewUserPage = require('../Page/review.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const BoekingsProgramma = require('../Financieel/Boekingprogram.page.js');
const Meldingen = require('../Page/meldingen.page.js');
const FunctionsPage = require('../Page/functions.page.js');

async function example(){

await ReviewUserPage.wingpdf(555);

await LinkerMenu.gotogrootboekstamgegevens();
await FunctionsPage.checkgrootboeknummer(2092);
    try {
        var trans = await driver.findElement(By.xpath("//span[starts-with(text(),'Transitorische')]"));
        console.log("Check 1 passed! Grootboek transitorische aanwezig in admin ");
        driver.actions().doubleClick(trans).perform();
        await driver.sleep(1000);

        var bar = await driver.findElement(By.xpath("//label[@id='s_edittabel_formGRB_EDIT_TRANSIT']"));
        await driver.actions().scroll(0, 0, 0, 400, bar).perform();
        await driver.sleep(1000);

        var transit = await driver.findElement(By.xpath("//div[@id='d_edittabel_formGRB_EDIT_TRANSIT']//input[@value='J']")).getAttribute('checked');
        // console.log(bar + "checked staat op true of null");
        if((transit) === null){ 
        await driver.findElement(By.xpath("//div[@id='d_edittabel_formGRB_EDIT_TRANSIT']//input[@value='J']")).click();
        console.log("Transitorisch tab stond uitgevinkt"); 
        }
        else{ 
        // console.log("Transitorische tab staat aangevinkt") 
        }

    }catch(NoSuchElementException){
        console.log("Error! grootboek met Transitorische niet aanwezig")
        // if(NoSuchElementException){
        // console.log("zou eventueel een grootboek rekening kunnen maken op 2092, als er een oplossing is voor afvangen nummer")
    }
    
await driver.findElement(By.xpath("//button[@id='knop_sluiten']")).click();
await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();

await LinkerMenu.gotobasisfinancieel();

// start checklist financieel grenzen
await driver.findElement(By.xpath("(//a[@class='nav-link'][normalize-space()='GRENZEN'])[1]")).click()
var ondergrens = await driver.findElement(By.xpath("//input[@id='s_ONDERFIN']")).getAttribute('value')
var bovengrens = await driver.findElement(By.xpath("//input[@id='s_BOVENFIN']")).getAttribute('value')
if (2092 > ondergrens && 2092 < bovengrens){
console.log("Error 2! Grootboek transitorisch valt tussen de financiele grenzen " + ondergrens + " en " + bovengrens)
}else{ 
console.log("Check 2 Passed! Grootboek transitorisch valt niet tussen de financiele grens " + ondergrens + " en " + bovengrens)
} 

await driver.sleep(1000);
await driver.findElement(By.xpath("//div[@id='sticky-bottom-edittabel_formBASFIN_EDIT']//button[@id='knop_sluiten']")).click();

// Start transitorisch boeking
await LinkerMenu.gotoboekingsprogramma();
await driver.sleep(2000);
await Meldingen.trycatchWarningMultiNomsg("Er zijn nog niet verwerkte transitorische boekingen aanwezig","//button[@aria-label='Close this dialog']"  );

await driver.switchTo().frame('i_app_boe');
await BoekingsProgramma.maakeentransitorischpost(20000, 2092);

await driver.switchTo().defaultContent();
await Meldingen.trycatchquestionMulti("Wilt u 'Verdelen transitorische boekingen' starten?", "//button[normalize-space()='Ja']" )    

// await driver.findElement(By.xpath("//button[normalize-space()='Ja']")).click();
await driver.sleep(1000);

await driver.switchTo().frame('i_app');
await driver.findElement(By.xpath("//input[@id='knop_maakboekingen']")).click();
await Meldingen.trycatchDialogCornerMulti("De transitorische boeking en de bijbehorende verdeling is correct aangemaakt.", "//input[@id='knop_transposttoontransboekingen']" );
// await driver.findElement(By.xpath("//input[@id='knop_transposttoontransboekingen']")).click();

var totaalbedrag = await driver.findElement(By.xpath("//td[@id='TranspostMainBedrag']")).getText();
// console.log(totaalbedrag);
var boekstuk = await driver.findElement(By.xpath("(//td[@class='w80'])[1]")).getText();
// console.log(boekstuk); 
// aantal verdelen boekingen
// await driver.findElements(By.xpath("//div[@id='div_grd_data']//tr[@id]")).then(elements => console.log(elements.length));
var table = await driver.findElements(By.xpath("(//input[@type='text'])"));
// console.log(table.length + " te verdelen boekingen");

// 6 boekstukken kiezen waarmee bedrag voor 5 boekingen bepaald wordt, vervolgens een boeking deselecteren voor in te vullen bedrag. 
await driver.findElement(By.xpath("(//input[@type='checkbox'])[3]")).click();
await driver.findElement(By.xpath("(//input[@type='checkbox'])[4]")).click();
await driver.findElement(By.xpath("(//input[@type='checkbox'])[5]")).click();
await driver.findElement(By.xpath("(//input[@type='checkbox'])[6]")).click();
await driver.findElement(By.xpath("(//input[@type='checkbox'])[7]")).click();
await driver.findElement(By.xpath("(//input[@type='checkbox'])[8]")).click();
var ntb1 = await driver.findElement(By.xpath("//td[@id='TranspostNogTeVerdelenBedrag']")).getText();
// console.log(ntb1 + " te verdelen bedrag");

await driver.findElement(By.xpath("(//input[@type='checkbox'])[3]")).click();
await driver.findElement(By.xpath("//input[@value='Verwijder selectie']")).click();

await Meldingen.trycatchquestionMulti("Wilt u de geselecteerde boekingen verwijderen?", "//button[normalize-space()='Ja']", );

await driver.sleep(2000);
// await driver.findElement(By.xpath("//button[normalize-space()='Ja']")).click();

await driver.findElement(By.xpath("(//input[@type='text'])[2]")).sendKeys(Key.CONTROL,"a");
await driver.findElement(By.xpath("(//input[@type='text'])[2]")).sendKeys(Key.BACK_SPACE);
await driver.findElement(By.xpath("(//input[@type='text'])[2]")).sendKeys(ntb1);
await driver.findElement(By.xpath("(//input[@type='text'])[1]")).click();
await driver.findElement(By.xpath("//input[@value='Wijzigingen opslaan']")).click();

var table2 = await driver.findElements(By.xpath("(//input[@class='inputborder'])"));
// omzetten string naar integer voor invoer van aantal journaalposten
var table3 = parseInt(table2.length)

await driver.sleep(2000);
await driver.switchTo().defaultContent();
await driver.switchTo().frame('i_app_boe');
await driver.findElement(By.xpath("//button[@title='Transitorische verdeling']")).click();
await driver.sleep(3000);

await driver.switchTo().defaultContent();
await driver.switchTo().frame('i_app');

// periode opzoeken
// var pn = await driver.findElement(By.xpath("(//tr[@id])[1]/td[4]")).getText();
// console.log(pn);

var pn = [];
var BedragJP = [];
var PnJP = [];
var bedrag = [];
var dbklik = [];
var BoekstukJP = [];
var Boekstuk = [];

for(var i=1; i<=table3; i++){
    bedrag[i] = await driver.findElement(By.xpath("(//input[@type='text'])["+i+"]")).getAttribute('value');
    // console.log(bedrag[i]);
    pn[i] = await driver.findElement(By.xpath("(//tr[@id])["+i+"]/td[4]")).getText();
    // console.log(pn[i]);
    Boekstuk[i] = await driver.findElement(By.xpath("(//td[@class='w80'])[1]")).getText();
    // await driver.findElement(By.xpath("(//td[@class='w80'])[1]"))

    dbklik[i] = await driver.findElement(By.xpath("(//td[@onblur]//img[@src])["+ i +"]"));
    driver.actions().doubleClick(dbklik[i]).perform();

    await driver.sleep(2000);
    await driver.switchTo().defaultContent();
    await driver.switchTo().frame('i_app_boe');

    // gegevens in journaalpost
    BedragJP[i] = await driver.findElement(By.xpath("(//input[contains(@name,'BEDRBOEK')])[1]")).getAttribute('value');
    // console.log(BedragJP[i]);
    PnJP[i] = await driver.findElement(By.xpath("//input[@id='PN']")).getAttribute('value');
    // console.log(PnJP[i]);
    BoekstukJP[i] = await driver.findElement(By.xpath("(//input[@name='BOEKSTUK'])[1]")).getAttribute('value');
    // console.log(BoekstukJP[i]);

    await driver.findElement(By.xpath("//button[@title='Transitorische verdeling']")).click();
    await driver.sleep(2000);
    await driver.switchTo().defaultContent();
    await driver.switchTo().frame('i_app');
}

await FunctionsPage.controlecheckArray('Bedragen', bedrag, BedragJP);
await FunctionsPage.controlecheckArray('Periode', pn, PnJP);
await FunctionsPage.controlecheckArray("Boekstukken", Boekstuk, BoekstukJP);

await driver.switchTo().defaultContent();
await HomePage.logoutuser();
await driver.quit();

};
example()
