const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const HomePage = require('../Page/home.page.js');
const ReviewUserPage = require('../Page/review.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const StamGegevensPage = require('../Page/stamgegevens.page.js');
const divconfirm = require('../Page/divconfirm.page.js');
const divalert = require('../Page/divalert.page.js');
const BoekingsProgramma = require('../Financieel/Boekingprogram.page.js');
const DemoUserPage = require('../Page/demo.user.page.js');


async function example(){
await ReviewUserPage.wingpdf(555);
// await DemoUserPage.wingman(555);

var debiteur = 10555;
var debiteurtarget = 10666; 
var debiteurlast = 10777;

"Ondergrens en bovengrens van debiteur ophalen"
await LinkerMenu.gotobasisfinancieel();
await driver.findElement(By.xpath("(//a[@class='nav-link'][normalize-space()='DEBITEUREN'])[1]")).click()
var ondergrens = await driver.findElement(By.xpath("(//input[@id='s_ONDERDEB'])[1]")).getAttribute('value')
var bovengrens = await driver.findElement(By.xpath("(//input[@id='s_BOVENDEB'])[1]")).getAttribute('value')
console.log(ondergrens + " " +  bovengrens)
await driver.findElement(By.xpath("//div[@id='sticky-bottom-edittabel_formBASFIN_EDIT']//button[@id='knop_sluiten']")).click();

"check of debiteur aanwezig is anders een aanmaken"
await LinkerMenu.gotodebiteurstamgegevens();
var debiteur1 = await FunctionsPage.verifyInputZoekveld(debiteur);
if(debiteur1 == true){
    await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();
}
else {
    await StamGegevensPage.maakeendebiteuraan(debiteur);
    await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();
    console.log("deb "+debiteur+" aangemaakt");
}

"maak een boeking op basis van debiteur"
await LinkerMenu.gotoboekingsprogramma();
await driver.switchTo().frame('i_app_boe');
await BoekingsProgramma.maakeenVerkoopboeking(2, 10555, 8003);
var boekbedrag = await driver.findElement(By.xpath("(//input[@name='BEDRBOEK'])[last()-1]")).getAttribute('value');
var boekstuk = await driver.findElement(By.xpath("(//input[@name='BOEKSTUK'])[last()-1]")).getAttribute('value');
var rek = await driver.findElement(By.xpath("(//input[@name='REK'])[last()-1]")).getAttribute('value');
// console.log(boekstuk +boekbedrag+ rek);
await driver.findElement(By.xpath("//span[@title='Sluiten']")).click();

"vernummeren naar 4 mogenlijkheden buiten de grenzen, hetzelfde debiteur, en uiteindelijk debiteur."
await driver.switchTo().defaultContent();

await LinkerMenu.gotodebiteurstamgegevens();
await FunctionsPage.verifyInputZoekveld(debiteur, );

await Vernummeren(bovengrens +++ 200);
await divconfirm.Dialogquestion("Vernummeren Van debiteur '"+debiteur+"' naar debiteur '", "//button[normalize-space()='OK']",);
await divalert.Dialogwarning("voor Debiteur "+debiteur+" moet binnen de ingestelde grenzen voor Debiteuren blijven. De grenzen lopen van nummer", "//button[normalize-space()='OK']",);

await Vernummeren(ondergrens - 200);
await divconfirm.Dialogquestion("Vernummeren Van debiteur '"+debiteur+"' naar debiteur '","//button[normalize-space()='OK']",);
await divalert.Dialogwarning("voor Debiteur "+debiteur+" moet binnen de ingestelde grenzen voor Debiteuren blijven. De grenzen lopen van nummer","//button[normalize-space()='OK']",);

await Vernummeren(debiteur);
await divalert.Notify("(//div[@class='noty_body'])[1]","Oude en nieuwe waarde zijn gelijk. Vernummeren of samenvoegen is niet mogelijk.",);

await Vernummeren(debiteurtarget);
await divconfirm.Dialogquestion("Vernummeren Van debiteur '"+debiteur+"' naar debiteur '"+debiteurtarget+"'","//button[normalize-space()='OK']",);
await divalert.Dialogsucces("Correct uitgevoerd.");
await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();

"controle boeking of boeking klopt met verandering debiteurnr"
await LinkerMenu.gotoboekingsprogramma();
await driver.switchTo().frame('i_app_boe');
var boekbedrag2 = await driver.findElement(By.xpath("(//input[@name='BEDRBOEK'])[last()-1]")).getAttribute('value');
var boekstuk2 = await driver.findElement(By.xpath("(//input[@name='BOEKSTUK'])[last()-1]")).getAttribute('value');
var rek2 = await driver.findElement(By.xpath("(//input[@name='REK'])[last()-1]")).getAttribute('value');
var rek3 = parseInt(rek2);
// console.log(boekstuk2);
// console.log(boekbedrag2);
// console.log(rek3);
await driver.findElement(By.xpath("//span[@title='Sluiten']")).click();

"debiteur opruimen voor volgende test"
await driver.switchTo().defaultContent();
await LinkerMenu.gotodebiteurstamgegevens();
var debiteurlast1 = await FunctionsPage.verifyInputZoekveld(debiteurlast);
if(debiteurlast1 == true ){
    await Vernummeren(debiteurtarget);
    await divconfirm.Dialogquestion("Debiteur "+debiteurtarget+" bestaat reeds. Wilt u Debiteur "+debiteurlast+" samenvoegen met "+debiteurtarget+"?","//button[normalize-space()='OK']",);
    await divalert.Dialogsucces("Correct uitgevoerd.");

    await FunctionsPage.verifyInputZoekveld(debiteurtarget);
    await Vernummeren(debiteurlast);
    await divconfirm.Dialogquestion("Vernummeren Van debiteur '"+debiteurtarget+"' naar debiteur '"+debiteurlast+"'","//button[normalize-space()='OK']",);
    await divalert.Dialogsucces("Correct uitgevoerd.");
}

await driver.findElement(By.xpath("//div[@title='Sluiten']")).click();

if(boekstuk === boekstuk2)
console.log("Passed check 1 => boekstuk matched");
else
console.log("Error 1 => boekstuk matched niet" + boekstuk + boekstuk2);

if(boekbedrag === boekbedrag2)
console.log("Passed check 2 => bedragen matched ");
else
console.log("Error 2 => bedragen matched niet" + boekbedrag + boekbedrag2);

if(rek3 === debiteurtarget)
console.log("Passed check 3 => verwachte debiteur matched");
else
console.log("Error 3 => verwachte debiteur "+ debiteurtarget + rek2);

await driver.switchTo().defaultContent();
await HomePage.logoutuser();
await driver.quit();

};
example()

async function Vernummeren(nummer) {  
    await driver.findElement(By.id("ZDKnop_Vernummeren")).click();
    await FunctionsPage.verifyContainer("//div[@id='VERNUMMEREN']", "Vernummeren/samenvoegen debiteur",);
    await driver.findElement(By.id("VERNUMMERNEW")).clear();
    await driver.findElement(By.id("VERNUMMERNEW")).sendKeys(nummer);
    await driver.findElement(By.id("ZDDoButtonVernumOkID")).click();
}
