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

"Offerte aanmaken kies debiteur uit"
await LinkerMenu.gotoVerkoopOffertes();
await driver.switchTo().frame('i_app');
await FunctionsPage.verifyContainer("//table[@id='table_knop']", "Offertes",);
await FunctionsPage.VerifyInputField("//input[@id='RELATIE']", "RELATIE", 10003,);
await FunctionsPage.VerifyInputField("//input[@name='KENM']", "KENM", (Math.round(Math.random() * 1000000 + 1000)),);
await driver.wait(until.elementLocated(By.xpath("//td[@id='td_knop_save']"))).click();
var kenmerk = await driver.findElement(By.xpath("//span[@id='s_KENM']")).getText();

"in de offerte een artikel kiezen en offerte promoveren "
await FunctionsPage.verifyContainer("//span[normalize-space()='Artikel']", "Artikel",);
await FunctionsPage.VerifyInputField("//input[@id='id_editcellART']", "ART", 9002,);
await driver.wait(until.elementLocated(By.xpath("//td[@id='td_knop_save']"))).click();
var Goederenbedrag = await driver.findElement(By.xpath("//td[@id='s_totaal_inclbtw']")).getText();

"Promoveren offerte"
await driver.wait(until.elementLocated(By.xpath("//td[@id='td_knop_promoveren2']"))).click();
await driver.switchTo().defaultContent();
await FunctionsPage.verifyContainer("//div[@id='div_off2ord']", "Promoveer offerte naar order",);
await driver.wait(until.elementLocated(By.xpath("(//button[normalize-space()='Opslaan'])[1]"))).click();
await divconfirm.Dialogquestion("Weet u zeker dat u de juiste selecties heeft gemaakt?", "//button[normalize-space()='OK']",)

await driver.switchTo().frame('i_app');
await FunctionsPage.verifyContainer("//table[@id='table_knop']", "Verkooporders",);
var kenmerk2 = await driver.findElement(By.xpath("//span[@id='s_KENM']")).getText();
var Goederenbedrag2 = await driver.findElement(By.xpath("//td[@id='s_totaal_inclbtw']")).getText();

await FunctionsPage.controlecheck("Goederenbedrag", Goederenbedrag, Goederenbedrag2);
await FunctionsPage.controlecheck("Kenmerk", kenmerk, kenmerk2);

};
example()

