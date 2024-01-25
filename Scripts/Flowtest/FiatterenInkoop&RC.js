const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const HomePage = require('../Page/home.page.js');
const ReviewUserPage = require('../Page/review.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const StamGegevensPage = require('../Page/stamgegevens.page.js');
const BoekingsProgramma = require('../Financieel/Boekingprogram.page.js');

async function example(){

"flow 1, Done"
"basisfinancieel fiatteren inkoopboekingen aan, & bankieren Fiatteren betalingen aan,"
"medewerker fiatteren inkoopboekingen aan, & Fiatteringsbevoegd bankieren"
"kostenplaats fiatteur instellen naam medewerker"
"crediteur instelling kostenplaats instellen"

let wingpdf = "wingpdf"
let kostenplaats = "4"
let maxbedrag = "10001"
let crediteur = "20004"
let adminRekCA = 570
let adminRekCB = 571
let grootboekRekA = 2080
let grootboekRekB = 2070
let voorkeurskostenplaats = 99999998

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
    await StamGegevensPage.instellingRekCA(adminRekCB, grootboekRekB);
    await driver.wait(until.elementLocated(By.xpath("//label[@title='Grootboek']")));
    await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();
    console.log("Rekening Courant gekoppeld kan verder");
}
else {
    await StamGegevensPage.maakeenRCaan("2080", "RC admin571",)
    await driver.wait(until.elementLocated(By.xpath("//label[@title='Grootboek']")));
    await StamGegevensPage.instellingRekCA("571", grootboekRekB);
    await driver.wait(until.elementLocated(By.xpath("//label[@title='Grootboek']")));
    await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();
    console.log("Rekening Courant aangemaakt en gekoppeld kan verder");
}


"instelling fiatteren inkoopboekingen, voorkeurskostenplaats, vinkje inkoopboekingen, optioneel vinkje bankieren" 
await LinkerMenu.gotobasisfinancieel();
await StamGegevensPage.instellingfiatteurbasis(voorkeurskostenplaats,);
"deze simuleert een refresh van admin bug WI 17932"
await HomePage.verandervanadmin(adminRekCA);

"medewerker instellen fiatteur, vinkje inkoopboekingen, optioneel bedrag bij bankieren voor deze script"
await LinkerMenu.gotoInkoopMedewerker();
await FunctionsPage.verifyInputZoekveld(wingpdf,);
await StamGegevensPage.instellingfiatteurmedewerker(maxbedrag,);
await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();

"Kostenplaats 4 aanwijzen voor te fiatteren boekingen."
await LinkerMenu.gotogrootboekkostenplaats();
var kostplaats2 = await FunctionsPage.verifyInputZoekveld(kostenplaats)
if(kostplaats2 == true ){
    await StamGegevensPage.instellingfiatteurkostenplaats(wingpdf,);
    await driver.wait(until.elementLocated(By.xpath("//label[@title='Kostenplaats']")));
    await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();
    console.log("Kostenplaats nummer aanwezig kan verder");
}
else {
    await StamGegevensPage.maakeenkostenplaatsaan(kostenplaats, "Fiatteren", wingpdf);
    await driver.wait(until.elementLocated(By.xpath("//label[@title='Kostenplaats']")));
    await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();
    console.log("Kostenplaats nummer niet aanwezig moet kostenplaats aanmaken.");
}

"crediteur aanwijzen waarvan je inboekingen gaat fiatteren"
await LinkerMenu.gotocrediteurstamgegevens();
await FunctionsPage.verifyInputZoekveld(crediteur, )
await StamGegevensPage.instellingfiatteurcrediteur(kostenplaats)
await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@div_title='Crediteur']"))));    
await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();


"maak een RC inkoopboeking" 
await LinkerMenu.gotoboekingsprogramma();
await driver.switchTo().frame('i_app_boe');
await BoekingsProgramma.maakeenInkoopboeking(4, crediteur, 2080,);
await driver.wait(until.elementLocated(By.id("td_RC_boeking_titel")));
await driver.findElement(By.xpath("//input[@id='NR']")).sendKeys("4730");
var boekstuk = await driver.findElement(By.xpath("//input[@id='RCBOEKSTUK']")).getAttribute('value');
var boekbedrag = await driver.findElement(By.xpath("//input[@id='RCBEDRAG']")).getAttribute('value');
var btwbedrag = await driver.findElement(By.xpath("//span[@id='sp_RC_ORGBEDRBTW2']")).getText();
console.log(boekstuk);
console.log(boekbedrag);
console.log(btwbedrag);
await driver.findElement(By.xpath("//button[@id='knop_rcsave']")).click();
await driver.findElement(By.xpath("//span[@title='Sluiten']")).click();
await driver.switchTo().defaultContent();


"Fiatteeren inkoopboeking"
await LinkerMenu.gotofiattereninkoopboekingen();
await driver.switchTo().frame('i_app');
await FunctionsPage.verifyContainer("//table[@class='dialogcorner']","Fiatteren inkoopboekingen")    

await FunctionsPage.radiobuttonON("//input[@id='fiatink_huidige_medew']", "medewerker bij fiatteren inkoopboeking")
await FunctionsPage.radiobuttonON("//input[@id='fiatink_tefiatteren']", "TeFiatteren bij fiatteren inkoopboeking")
await driver.sleep(1000);

await driver.wait(until.elementLocated(By.xpath("//div[@row-id][last()]")));
await driver.findElement(By.xpath("//div[@row-id][last()]")).click();
await FunctionsPage.checkboxchecker("//div[@row-id][last()]//div[@class='jqx-widget jqx-widget-king-light jqx-checkbox jqx-checkbox-king-light']", "fiatteren inkoopboeking")
await driver.findElement(By.xpath("//button[@onclick='fiatInkGoedkeuren();']")).click();
await driver.sleep(2000);

"controle RekCB" 
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

await FunctionsPage.controlecheck('Boekstuk nummer',boekstuk, boekstuk2 )
await FunctionsPage.controlecheck('Boek bedrag',boekbedrag, boekbedrag2 )

await driver.switchTo().defaultContent();
await HomePage.logoutuser();
await driver.quit();


};
example()

