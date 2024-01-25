const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const HomePage = require('../Page/home.page.js');
const ReviewUserPage = require('../Page/review.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const StamGegevensPage = require('../Page/stamgegevens.page.js');
const divconfirm = require('../Page/divconfirm.page.js');
const divalert = require('../Page/divalert.page.js');
const BoekingsProgramma = require('../Financieel/Boekingprogram.page.js');
const BTWaangifte = require('../Financieel/BTWaangifte.page.js');
const Bankieren = require('../Financieel/bankieren.page.js');

async function example(){

let wingpdf = "wingpdf"
let kostenplaats = "4"
let maxbedrag = "10001"
let crediteur = "20004"
let adminRekCA = 570
let adminRekCB = 571
let grootboekRekA = 2080
let grootboekRekB = 2070
let voorkeurskostenplaats = 99999998
let adminmaster = 556;
let adminslave = 557;
let adminslavetwo = 558;
let BTWnummer = 'NL261925143B01';
let factuurnr = 20230054

await ReviewUserPage.wingpdf(555);


await LinkerMenu.gotoAbonnement();
await driver.switchTo().frame('i_app');
    await FunctionsPage.verifyContainer("//div[@class='dialogcorner bs']", "Mijn gegevens Sluiten");
    
    // let abonnement = await driver.findElement(By.xpath("(//div[@id='mijnmodules_actief']//td[@class='bold'])[1]")).getText();  
    // console.log(abonnement);
    console.debug("Gevonden "+ (abonnement.match("Huidige licentie: KING Finance Pro")));

await driver.switchTo().defaultContent();
// console.log(LogStatus.Pass,"Test Passed");
console.debug("debug komt niet in ps script wel in text file")
console.info("info komt niet in ps script wel in text file")
console.log("log komt niet in ps script wel in text file")

console.warn("warn")
console.error("error")

"dit zorgt voor failure "

// await driver.quit();
};
example()

