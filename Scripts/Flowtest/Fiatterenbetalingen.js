const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const HomePage = require('../Page/home.page.js');
const ReviewUserPage = require('../Page/review.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const BoekingsProgramma = require('../Financieel/Boekingprogram.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const StamGegevensPage = require('../Page/stamgegevens.page.js');

async function example(){

"flow-1, Done"
"basisfinancieel fiatteren inkoopboekingen aan, & crediteur kostenplaats op 'leeg' of '99999998',"
"basisfinancieel bankieren Fiatteren betalingen aan,"
"medewerker instelling Fiatteringsbevoegd bankieren,"

"flow-2"
"basisfinancieel fiatteren inkoopboekingen uit,"
"basisfinancieel bankieren Fiatteren betalingen aan,"
"medewerker instelling Fiatteringsbevoegd bankieren,"

let wingpdf = "wingpdf"
let voorkeurskostenplaats = "99999998"
let maxbedrag = "10001"
let crediteur = "20003"

await ReviewUserPage.wingpdf(555);

"instelling fiatteren inkoopboekingen, vinkje bankieren, optioneel vinkje inkoopboekingen" 
await LinkerMenu.gotobasisfinancieel();
await StamGegevensPage.instellingfiatteurbasis(voorkeurskostenplaats,);
"deze simuleert een refresh van admin bug WI-17932"
await HomePage.verandervanadmin(555);

"medewerker instellen fiatteur, bedrag bij bankieren, optioneel vinkje inkoopboekingen"
await LinkerMenu.gotoInkoopMedewerker();
await FunctionsPage.verifyInputZoekveld(wingpdf,);
await StamGegevensPage.instellingfiatteurmedewerker(maxbedrag,);
await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();

"crediteur 20003 aanwijzen waarvan je inkoopboekingen NIET hoeft te fiatteren kostenplaats 99999998"
await LinkerMenu.gotocrediteurstamgegevens();
await FunctionsPage.verifyInputZoekveld(crediteur,)
await StamGegevensPage.instellingfiatteurcrediteur(voorkeurskostenplaats)
await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@div_title='Crediteur']"))));    
await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();

"boeking maken en controle"
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

"Fiatteren betalingen"
await LinkerMenu.gotofiatterenbetalingen();
await driver.switchTo().frame('i_app');
await FunctionsPage.verifyContainer("//table[@class='dialogcorner bs']", "Bankieren - Betalingen uitschrijven")
await FunctionsPage.verifyContainerklik("//button[@id='knop_fiatregels']", "Te fiatteren posten",)

await FunctionsPage.verifyContainer("//table[@id='tbl_titel_tbbetuit_grid']", "Fiatteren betalingen");
await driver.findElement(By.xpath("//td[@ori_label='Factuur']")).click();
await driver.findElement(By.xpath("//td[@ori_label='Factuur']")).click();

var getregel = await driver.findElement(By.xpath("//td[@id='TD_FACT'][contains(text(),'"+boekstuk+"')]//parent::tr")).getAttribute('id');
var boekbedrag2 = await driver.findElement(By.xpath("//tr[@id='"+getregel+"']//td[@id='TD_BEDR']")).getText();
var boekstuk2 = await driver.findElement(By.xpath("//tr[@id='"+getregel+"']//td[@id='TD_FACT']")).getText();
var rek2 = await driver.findElement(By.xpath("//tr[@id='"+getregel+"']//td[@id='TD_CRE']")).getText();

console.log(boekbedrag2);
console.log(boekstuk2);
console.log(rek2);

await FunctionsPage.controlecheck('Boekstuk nummer',boekstuk, boekstuk2 )
await FunctionsPage.controlecheck('Boek bedrag',boekbedrag, "-"+boekbedrag2 )
await FunctionsPage.controlecheck('Grootboek Rek',rek, rek2 )

await driver.switchTo().defaultContent();
await HomePage.logoutuser();
await driver.quit();


};
example()
