const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const HomePage = require('../Page/home.page.js');
const ReviewUserPage = require('../Page/review.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const divalert = require('../Page/divalert.page.js');
const Bankieren = require('../Financieel/bankieren.page.js');

async function example(){

"flow-1, Done"
"Controle op bankrekening en 'spaties' toegevoegt IBAN"
"Bestaande afschriften verwijderdt en twee afschriften handmatig inlezen."
"Een RC boeking gemaakt vanuit afschrift regel en controle op tweede admin"
"Optioneel afschriftregels verwijderen"

"flow-2, Boekingenverwijderen"

let Bankrekening = "NL47ABNA0117301523"
let afschrift2 = 'C:\\Users\\Yeun Wing Wu\\OneDrive - KING Software\\Bureaublad\\2020-04-02.bst'
let afschrift1 = 'C:\\Users\\Yeun Wing Wu\\OneDrive - KING Software\\Bureaublad\\tmp1585.tmp'

await ReviewUserPage.wingpdf(570);

await LinkerMenu.gototabelbankrekening();
await FunctionsPage.verifyInputZoekveld(Bankrekening);
var IBAN = await Bankieren.getIBANnummer(Bankrekening);
// console.log (IBAN) 
await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();

// Bestaande afschriften verwijderen.
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

// maak RC boeking
await driver.findElement(By.xpath("(//input[@type='textarea'])[3]")).sendKeys('2080', Key.RETURN);
await FunctionsPage.verifyContainer("//td[@id='d_tb_rcdialog_divtitel']", "Rekening-courantboeking");
await driver.findElement(By.xpath("//input[@id='NR']")).clear();
await driver.findElement(By.xpath("//input[@id='NR']")).sendKeys("8000");
await driver.findElement(By.xpath("//input[@id='RCBOEKSTUK']")).sendKeys(Math.round(Math.random() * 100000 + 1000));
var boekstuk = await driver.findElement(By.xpath("//input[@id='RCBOEKSTUK']")).getAttribute('value');
// console.log(boekstuk);
var boekbedrag = await driver.findElement(By.xpath("//input[@id='RCBEDRAG']")).getAttribute('value');
// console.log(boekbedrag);
await driver.findElement(By.xpath("//button[@id='knop_rcsave']")).click();

await Bankieren.verwerkenbankafschrift();
await divalert.Notify("//div[@class='noty_body']", "De herkende en afgeletterde bankafschriftregels zijn doorgeboekt." );
await driver.findElement(By.xpath("(//button[normalize-space()='Sluiten'])[1]")).click();


await driver.switchTo().defaultContent();
await HomePage.verandervanadmin(571);
await LinkerMenu.gotoboekingsprogramma();

await driver.switchTo().frame('i_app_boe');
await driver.findElement(By.xpath("//span[normalize-space()='Rekening-courant']")).click();
await driver.findElement(By.xpath("//button[@id='huidigeperiode']")).click();
var boekstuk2 = await driver.findElement(By.xpath("(//input[@name='BOEKSTUK'])[last()-1]")).getAttribute('value');
// console.log(boekstuk2);
var boekbedrag2 = await driver.findElement(By.xpath("(//input[@name='BEDRBOEK'])[last()-1]")).getAttribute('value');
// console.log(boekbedrag2);

await FunctionsPage.controlecheck('Boekstuk nummer',boekstuk, boekstuk2 )
await FunctionsPage.controlecheck('Boek bedrag',boekbedrag, boekbedrag2 )

await driver.switchTo().defaultContent();
await HomePage.verandervanadmin(570);

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
