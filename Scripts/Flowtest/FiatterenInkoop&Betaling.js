const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const HomePage = require('../Page/home.page.js');
const ReviewUserPage = require('../Page/review.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const BoekingsProgramma = require('../Financieel/Boekingprogram.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const StamGegevensPage = require('../Page/stamgegevens.page.js');

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
let kostenplaats = "4"
let maxbedrag = "10001"
let crediteur = "20004"
let voorkeurskostenplaats = 99999998
console.log("Script Fiatteren inkoopboekingen & Fiatteren betalingen");

await ReviewUserPage.wingpdf(555);

"basisfinancieel fiatteren inkoopboekingen aan, & bankieren Fiatteren betalingen aan,"
await LinkerMenu.gotobasisfinancieel();
await StamGegevensPage.instellingfiatteurbasis(voorkeurskostenplaats,);
("deze simuleert een refresh van admin bug WI 17932") 
await HomePage.verandervanadmin(555);

"medewerker fiatteren inkoopboekingen aan, & Fiatteringsbevoegd bankieren"
await LinkerMenu.gotoInkoopMedewerker();
await FunctionsPage.verifyInputZoekveld(wingpdf, Key.RETURN,);

await StamGegevensPage.instellingfiatteurmedewerker(maxbedrag,);
await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();

"kostenplaats fiatteur instellen naam medewerker"
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

"crediteur instelling kostenplaats instellen"
await LinkerMenu.gotocrediteurstamgegevens();
await FunctionsPage.verifyInputZoekveld(crediteur, Key.RETURN)
await StamGegevensPage.instellingfiatteurcrediteur(kostenplaats)
await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@div_title='Crediteur']"))));    
await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();


await LinkerMenu.gotoboekingsprogramma();
await driver.switchTo().frame('i_app_boe');
await BoekingsProgramma.maakeenInkoopboeking(4, crediteur, 4730,);
var boekbedrag = await driver.findElement(By.xpath("(//input[@name='BEDRBOEK'])[last()-1]")).getAttribute('value');
var boekstuk = await driver.findElement(By.xpath("(//input[@name='BOEKSTUK'])[last()-1]")).getAttribute('value');
var rek = await driver.findElement(By.xpath("(//input[@name='REK'])[last()-1]")).getAttribute('value');
console.log(boekstuk);
console.log(boekbedrag);
console.log(rek);

await driver.findElement(By.xpath("//span[@title='Sluiten']")).click();
await driver.switchTo().defaultContent();

await LinkerMenu.gotofiattereninkoopboekingen();
await driver.switchTo().frame('i_app');
await FunctionsPage.verifyContainer("//table[@class='dialogcorner']","Fiatteren inkoopboekingen")    

await FunctionsPage.radiobuttonON("//input[@id='fiatink_huidige_medew']", "medewerker bij fiatteren inkoopboeking")
await FunctionsPage.radiobuttonON("//input[@id='fiatink_tefiatteren']", "TeFiatteren bij fiatteren inkoopboeking")
//await driver.sleep(1000);

await driver.wait(until.elementLocated(By.xpath("//div[@row-id][last()]")));
await driver.findElement(By.xpath("//div[@row-id][last()]")).click();
await FunctionsPage.checkboxchecker("//div[@row-id][last()]//div[@class='jqx-widget jqx-widget-king-light jqx-checkbox jqx-checkbox-king-light']", "fiatteren inkoopboeking")
await driver.findElement(By.xpath("//button[@onclick='fiatInkGoedkeuren();']")).click();

await FunctionsPage.radiobuttonON("//input[@id='fiatink_goedgekeurd']", "boeking goedgekeurd bij fiatteren inkoopboeking")
await driver.findElement(By.xpath("//div[@title='laatste']")).click();
await driver.findElement(By.xpath("(//button[@class='btn btn-small primary_green'][normalize-space()='Boekingsregel'])[last()]")).click();

await driver.switchTo().defaultContent();
await driver.switchTo().frame('i_app_boe');
await driver.wait(until.elementLocated(By.xpath("//div[@id='s_table_grid']")));
var boekbedrag2 = await driver.findElement(By.xpath("(//input[@name='BEDRBOEK'])[last()]")).getAttribute('value');
var boekstuk2 = await driver.findElement(By.xpath("(//input[@name='BOEKSTUK'])[last()]")).getAttribute('value');
var rek2 = await driver.findElement(By.xpath("(//input[@name='REK'])[last()]")).getAttribute('value');
console.log(boekstuk2);
console.log(boekbedrag2);
console.log(rek2);

await driver.findElement(By.xpath("//button[@id='knop_doorstart']")).click();
await driver.switchTo().defaultContent();
await driver.switchTo().frame('i_app');
await driver.findElement(By.xpath("//button[@id='knop_sluiten']")).click();
await driver.switchTo().defaultContent();

"Fiatteren betalingen"
await LinkerMenu.gotofiatterenbetalingen();
await driver.switchTo().frame('i_app');
await FunctionsPage.verifyContainer("//table[@class='dialogcorner bs']", "Bankieren - Betalingen uitschrijven")
await FunctionsPage.verifyContainerklik("//button[@id='knop_fiatregels']", "Te fiatteren posten",)

await FunctionsPage.verifyContainer("//table[@id='tbl_titel_tbbetuit_grid']", "Fiatteren betalingen");
await driver.findElement(By.xpath("//td[@ori_label='Factuur']")).click();
await driver.findElement(By.xpath("//td[@ori_label='Factuur']")).click();

var getregel = await driver.findElement(By.xpath("//td[@id='TD_FACT'][contains(text(),'"+boekstuk+"')]//parent::tr")).getAttribute('id');
var boekbedrag3 = await driver.findElement(By.xpath("//tr[@id='"+getregel+"']//td[@id='TD_BEDR']")).getText();
var boekstuk3 = await driver.findElement(By.xpath("//tr[@id='"+getregel+"']//td[@id='TD_FACT']")).getText();
var rek3 = await driver.findElement(By.xpath("//tr[@id='"+getregel+"']//td[@id='TD_CRE']")).getText();
console.log(boekbedrag3);
console.log(boekstuk3);
console.log(rek3);

await FunctionsPage.controlecheck('Boekstuk nummer',boekstuk, boekstuk3 )
await FunctionsPage.controlecheck('Boek bedrag',boekbedrag, "-"+boekbedrag3 )
await FunctionsPage.controlecheck('Grootboek Rek',rek, rek3 )

await driver.switchTo().defaultContent();
await LinkerMenu.gotobasisfinancieel();
await StamGegevensPage.DEinstellingfiatteurbasis();

await HomePage.logoutuser();
await driver.quit();



};
example()
