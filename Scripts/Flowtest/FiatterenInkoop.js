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

"flow 2"
"basisfinancieel fiatteren inkoopboekingen aan,"
"medewerker fiatteren inkoopboekingen aan,"
"kostenplaats fiatteur instellen naam medewerker"
"crediteur instelling kostenplaats instellen"

let wingpdf = "wingpdf"
let voorkeurskostenplaats = 99999998
let kostenplaats = "4"
let maxbedrag = "10001"
let crediteur = "20004"

await ReviewUserPage.wingpdf(555);


"instelling fiatteren inkoopboekingen, voorkeurskostenplaats, vinkje inkoopboekingen, optioneel vinkje bankieren" 
await LinkerMenu.gotobasisfinancieel();
await StamGegevensPage.instellingfiatteurbasis(voorkeurskostenplaats,);
"deze simuleert een refresh van admin bug WI 17932"
await HomePage.verandervanadmin(555);

"medewerker instellen fiatteur, vinkje inkoopboekingen, optioneel bedrag bij bankieren voor deze script"
await LinkerMenu.gotoInkoopMedewerker();
await FunctionsPage.verifyInputZoekveld(wingpdf,);
await StamGegevensPage.instellingfiatteurmedewerker(maxbedrag,);
await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();

"Kostenplaats aanwijzen voor te fiatteren boekingen."
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


"Maak een inkoopboeking"
await LinkerMenu.gotoboekingsprogramma();
await driver.switchTo().frame('i_app_boe');
await BoekingsProgramma.maakeenInkoopboeking(4, crediteur, 4730,);
var boekbedrag = await driver.findElement(By.xpath("(//input[@name='BEDRBOEK'])[last()-1]")).getAttribute('value');
var boekstuk = await driver.findElement(By.xpath("(//input[@name='BOEKSTUK'])[last()-1]")).getAttribute('value');
var rek = await driver.findElement(By.xpath("(//input[@name='REK'])[last()-1]")).getAttribute('value');
// console.log(boekstuk);
// console.log(boekbedrag);
// console.log(rek);
await driver.findElement(By.xpath("//span[@title='Sluiten']")).click();
await driver.switchTo().defaultContent();

"Inkoopboeking fiattering"
await LinkerMenu.gotofiattereninkoopboekingen();
await driver.switchTo().frame('i_app');
await FunctionsPage.verifyContainer("//table[@class='dialogcorner']","Fiatteren inkoopboekingen")    

await FunctionsPage.radiobuttonON("//input[@id='fiatink_huidige_medew']", "medewerker bij fiatteren inkoopboeking")
await FunctionsPage.radiobuttonON("//input[@id='fiatink_tefiatteren']", "TeFiatteren bij fiatteren inkoopboeking")

await driver.wait(until.elementLocated(By.xpath("//div[@row-id][last()]")));
await driver.findElement(By.xpath("//div[@row-id][last()]")).click();
await FunctionsPage.checkboxchecker("//div[@row-id][last()]//div[@class='jqx-widget jqx-widget-king-light jqx-checkbox jqx-checkbox-king-light']", "fiatteren inkoopboeking")
await driver.findElement(By.xpath("//button[@onclick='fiatInkGoedkeuren();']")).click();

await FunctionsPage.radiobuttonON("//input[@id='fiatink_goedgekeurd']", "boeking goedgekeurd bij fiatteren inkoopboeking")
await driver.findElement(By.xpath("//div[@title='laatste']")).click();
await driver.findElement(By.xpath("(//button[@class='btn btn-small primary_green'][normalize-space()='Boekingsregel'])[last()]")).click();

"Controle in boekingsprogramma"
await driver.switchTo().defaultContent();
await driver.switchTo().frame('i_app_boe');
await driver.wait(until.elementLocated(By.xpath("//div[@id='s_table_grid']")));

var boekbedrag2 = await driver.findElement(By.xpath("(//input[@name='BEDRBOEK'])[last()]")).getAttribute('value');
var boekstuk2 = await driver.findElement(By.xpath("(//input[@name='BOEKSTUK'])[last()]")).getAttribute('value');
var rek2 = await driver.findElement(By.xpath("(//input[@name='REK'])[last()]")).getAttribute('value');
// console.log(boekstuk2);
// console.log(boekbedrag2);
// console.log(rek2);

await FunctionsPage.controlecheck('Boekstuk nummer',boekstuk, boekstuk2 )
await FunctionsPage.controlecheck('Boek bedrag',boekbedrag, boekbedrag2 )
await FunctionsPage.controlecheck('Grootboek Rek',rek, rek2 )

await driver.switchTo().defaultContent();
await HomePage.logoutuser();
await driver.quit();


};
example()

