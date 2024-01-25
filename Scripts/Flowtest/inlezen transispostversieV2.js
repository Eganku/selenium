const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const HomePage = require('../Page/home.page.js');
const ReviewUserPage = require('../Page/review.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const divalert = require('../Page/divalert.page.js');
const Bankieren = require('../Financieel/bankieren.page.js');
const ExtractPage = require('../Page/ExtractArray.page.js');
const path = require("path");

async function example(){

"flow-1, NOT Done"
"Controle op bankrekening en 'spaties' toegevoegt IBAN"
"Bestaande afschriften verwijderen en twee afschriften handmatig inlezen."
"Een Transitorisch boeking gemaakt vanuit afschrift regel en controle op tweede admin"
"Controle op form_regel met opgegeven omschrijving in afschriftregel."
"TODO een TRANSITORISCH POST"
"Optioneel afschriftregels verwijderen"

"flow-2, Boekingenverwijderen"
"doorgeboekte transitorische boekingen mogen niet weg."

let Bankrekening = "NL47ABNA0117301523"

let afschrift2 = path.resolve('.\\Bankafschrift\\2020-04-02.bst')
let afschrift1 = path.resolve('.\\Bankafschrift\\tmp1585.tmp')

await ReviewUserPage.wingpdf(580);

await LinkerMenu.gototabelbankrekening();
await FunctionsPage.verifyInputZoekveld(Bankrekening);
var IBAN = await Bankieren.getIBANnummer(Bankrekening);
// console.log (IBAN) 
await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();

await LinkerMenu.gotobankafschriftinlezen();
await driver.switchTo().frame('i_app');
await driver.findElement(By.xpath("//tr[@banknr='"+Bankrekening+"']//button[@id='knop_dossier']")).click();
await Bankieren.verwijderbankafschriften("Weet u zeker dit u dit afschrift bestand wilt verwijderen?", "//button[normalize-space()='Verwijder afschrift bestand']", 1);
await Bankieren.verwijderbankafschriften("Weet u zeker dit u dit afschrift bestand wilt verwijderen?", "//button[normalize-space()='Verwijder ook boekingen']", 0 );

await driver.findElement(By.xpath("//div[@id='knop_sluiten_d_historie']")).click();
await Bankieren.uploadbankafscrift(afschrift1);
await driver.findElement(By.xpath("//button[@id='knop_vorige']")).click();

await driver.switchTo().defaultContent();
await LinkerMenu.gotobankafschriftinlezen();
await driver.switchTo().frame('i_app');
await driver.findElement(By.xpath("//td[normalize-space()='"+IBAN+"']")).click();

// afschrift1 twee keer inlezen voor error melding check, daarna afschrift2 inlezen 
await Bankieren.uploadbankafscrift(afschrift1);
await driver.switchTo().defaultContent();
await divalert.Dialogwarning("Er staat al een bankafschrift in het digitaal dossier voor", "(//button[normalize-space()='OK'])[1]",)
await driver.switchTo().frame('i_app');
await Bankieren.uploadbankafscrift(afschrift2);

// transitorisch boeking maken vanuit bankafschrift
await driver.findElement(By.xpath("//div[@id='dropdownlistContentd_GRB']//input[@type='textarea']")).sendKeys("2092", Key.RETURN);
await driver.sleep(1000);
await driver.findElement(By.xpath("//input[@id='id_editcellOMSCHRKORT']")).clear();
await driver.findElement(By.xpath("//input[@id='id_editcellOMSCHRKORT']")).sendKeys(Math.round(Math.random() * 100000 + 1000));
var omschr = await driver.findElement(By.xpath("//input[@id='id_editcellOMSCHRKORT']")).getAttribute("value");
// console.log(omschr);
var boekbedrag = await driver.findElement(By.xpath("//input[@id='id_editcellBEDR']")).getAttribute('value');
// console.log(boekbedrag);
await Bankieren.verwerkenbankafschrift();
await divalert.Notify("//div[@class='noty_body']", "De herkende en afgeletterde bankafschriftregels zijn doorgeboekt." );
await driver.findElement(By.xpath("(//button[normalize-space()='Sluiten'])[1]")).click();

await driver.switchTo().defaultContent();
await LinkerMenu.gotoboekingsprogramma();
await divalert.Dialogwarning2( "(//div[@id='d_swaltekstdiv'])[1]","Er zijn nog niet verwerkte transitorische boekingen aanwezig","//button[@aria-label='Close this dialog']");
// script moet aangevuld worden met "transistpost" moet wel eerst opgelost worden met bug 05-01 ,try catch proberen om script door te laten gaan 18-01-2023

await driver.switchTo().frame('i_app_boe');
await driver.wait(until.elementLocated(By.xpath("//button[@title='Huidige periode']")));
await driver.findElement(By.xpath("//button[@id='huidigeperiode']")).click();
await driver.findElement(By.xpath("//span[normalize-space()='Abn-amro']")).click();
//workaround zoek form_regel met opgegeven omschrijving in afschriftregel.
await driver.findElement(By.xpath("(//input[@value='"+omschr+"'])[1]")).click();
FunctionsPage.verifyButton("//button[@id='knop_transitorischeverdeling']","Transitorische verdeling")

var formregel = await driver.findElement(By.xpath("//input[@name='OMSCHR'][contains(@value,'"+omschr+"')]")).getAttribute('form_name');
// console.log(meld);
var boekstuk2 = await driver.findElement(By.xpath("//input[@form_name='"+formregel+"'][@name='OMSCHR']")).getAttribute('value');
// console.log(boekstuk2);
var boekbedrag2 = await driver.findElement(By.xpath("//input[@form_name='"+formregel+"'][@name='BEDRCRE']")).getAttribute('value');
// console.log(boekbedrag2);

if(omschr === boekstuk2)
console.log("Passed check 1 => boekstuk matched");
else
console.log("Error 1 => boekstuk matched niet" + boekstuk +" "+ boekstuk2);

if(boekbedrag === boekbedrag2)
console.log("Passed check 2 => bedragen matched ");
else
console.log("Error 2 => bedragen matched niet" + boekbedrag +" "+ boekbedrag2);

//optioneel regels verwijderen
await driver.switchTo().defaultContent();
await LinkerMenu.gotobankafschriftinlezen();
await driver.switchTo().frame('i_app');
await driver.findElement(By.xpath("//tr[@banknr='"+Bankrekening+"']//button[@id='knop_openregels']")).click();
await driver.findElement(By.xpath("//button[@id='knop_doorboeken']")).click();
await divalert.Dialogerror("//div[@id='swal2-content']", "Er zijn nog geen regels volledig herkend.", "//button[normalize-space()='OK']");
await Bankieren.verwijderafschriftregels();
await divalert.Notify("//div[@class='noty_body']", "Er zijn geen bankafschriftregels aanwezig bij:");

//logout and quit
await driver.switchTo().defaultContent();
await HomePage.logoutuser();
await driver.quit();

};
example()
