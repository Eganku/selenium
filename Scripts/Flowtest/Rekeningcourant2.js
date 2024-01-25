const {Builder, By, Actions, Key, until,} = require('selenium-webdriver');
const HomePage = require('../Page/home.page.js');
const ReviewUserPage = require('../Page/review.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const BoekingsProgramma = require('../Financieel/Boekingprogram.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const StamGegevensPage = require('../Page/stamgegevens.page.js');

async function example(){

var adminRekCA = 570
var adminRekCB = 571
var grootboekRekA = 2080
var grootboekRekB = 2070
await ReviewUserPage.wingpdf(adminRekCB);

"instelling RekCB als ontvanger "
await LinkerMenu.gotogrootboekstamgegevens();
await FunctionsPage.verifyInputZoekveld(grootboekRekB);
await StamGegevensPage.instellingRekCB();
await driver.wait(until.elementLocated(By.xpath("//label[@title='Grootboek']")));
await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();
await driver.switchTo().defaultContent();
await HomePage.verandervanadmin(adminRekCA);

"instelling RekCA als verstuurder"
await LinkerMenu.gotogrootboekstamgegevens();
var RekCA = await FunctionsPage.verifyInputZoekveld(grootboekRekA);
if(RekCA == true ){
    await StamGegevensPage.instellingRekCA(adminRekCB, grootboekRekB)
    await driver.wait(until.elementLocated(By.xpath("//label[@title='Grootboek']")));
    await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();
    console.log("Rekening Courant gekoppeld kan verder");
}
else {
    await StamGegevensPage.maakeenRCaan(grootboekRekA, "RC admin571",)
    await driver.wait(until.elementLocated(By.xpath("//label[@title='Grootboek']")));
    await StamGegevensPage.instellingRekCA(adminRekCB, grootboekRekB)
    await driver.wait(until.elementLocated(By.xpath("//label[@title='Grootboek']")));
    await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();
    console.log("Rekening Courant aangemaakt en gekoppeld kan verder");
}

"maak een RC boeking "
await LinkerMenu.gotoboekingsprogramma();
await driver.switchTo().frame('i_app_boe');
await BoekingsProgramma.maakeenVerkoopboeking(2, 10000, 2080);
await driver.wait(until.elementLocated(By.id("td_RC_boeking_titel")));
await driver.findElement(By.xpath("//input[@id='NR']")).sendKeys("8000");
var boekstuk = await driver.findElement(By.xpath("//input[@id='RCBOEKSTUK']")).getAttribute('value');
var boekbedrag = await driver.findElement(By.xpath("//input[@id='RCBEDRAG']")).getAttribute('value');
var btwbedrag = await driver.findElement(By.xpath("//span[@id='sp_RC_ORGBEDRBTW2']")).getText();
console.log(boekstuk);
console.log(boekbedrag);
console.log(btwbedrag);
await driver.findElement(By.xpath("//button[@id='knop_rcsave']")).click();

await driver.switchTo().defaultContent();
await HomePage.verandervanadmin(adminRekCB);
await LinkerMenu.gotoboekingsprogramma();
await driver.switchTo().frame('i_app_boe');
await driver.findElement(By.xpath("//span[normalize-space()='Rekening-courant']")).click();
await driver.findElement(By.xpath("//button[@id='huidigeperiode']")).click();

var formregel = await driver.findElement(By.xpath("//input[@name='BOEKSTUK'][contains(@value,'"+boekstuk+"')]")).getAttribute('form_name');
var boekbedrag2 = await driver.findElement(By.xpath("(//input[@name='BEDRBOEK'])[last()-1]")).getAttribute('value');
var boekstuk2 = await driver.findElement(By.xpath("(//input[@name='BOEKSTUK'])[last()-1]")).getAttribute('value');
// var btwbedrag2 = await driver.findElement(By.xpath("//span[@id='sp_RC_ORGBEDRBTW2']")).getText();
console.log(boekstuk2);
console.log(boekbedrag2);
// console.log(btwbedrag2)
if(boekstuk === boekstuk2)
console.log("Passed check 1 => boekstuk komt overeen " + boekstuk + " en " + boekstuk2 );
else
console.log("Error 1 => boekstuk klopt niet " + boekstuk + " en " + boekstuk2);
if(boekbedrag === boekbedrag2)
console.log("Passed check 2 => bedrag komt overeen " + boekbedrag + " en " + boekbedrag2);
else
console.log("Error 2 => bedrag komt niet overeen " + boekbedrag + " en " + boekbedrag2);

// if(btwbedrag === btwbedrag2)
// console.log("Passed check 2 => bedrag komt overeen " + btwbedrag + " en " + btwbedrag2);
// else
// console.log("Error 2 => bedrag komt niet overeen " + btwbedrag + " en " + btwbedrag2);

await driver.switchTo().defaultContent();
await HomePage.logoutuser();
await driver.quit();


};
example()




