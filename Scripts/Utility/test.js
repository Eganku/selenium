const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const fs = require('fs');
const HomePage = require('../Page/home.page.js');
const ReviewUserPage = require('../Page/review.user.page.js');
const DemoUserPage = require('../Page/demo.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const StamGegevensPage = require('../Page/stamgegevens.page.js');
const divconfirm = require('../Page/divconfirm.page.js');
const divalert = require('../Page/divalert.page.js');
const BoekingsProgramma = require('../Financieel/Boekingprogram.page.js');
const BTWaangifte = require('../Financieel/BTWaangifte.page.js');
const Bankieren = require('../Financieel/bankieren.page.js');
const ExtractPage = require('../Page/ExtractArray.page.js');
const kolom = require('../Page/Kolommentest.page.js');

async function example(){

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



console.log("=> => dit is the test script niet live gebruiken <= <=");
// console.log("Current directory:", __dirname);
// await ReviewUserPage.wingtogether(555);

await ReviewUserPage.wingman(555);


await driver.switchTo().frame('i_app');  
let parserfout = await driver.findElements(By.xpath("//html[contains(.,'Parser-fout')]"));


await driver.switchTo().defaultContent();
if (parserfout!= 0){
    console.log("Error Parser fout gevonden. ")
}

return

await LinkerMenu.gotoboekingsprogramma();
// console.log(-(Math.round(Math.random() * 1000 + 100)))
// await driver.switchTo().frame('i_app_boe');
// await BoekingsProgramma.maakeenVerkoopboekingDatum(2, 10010, 8002, 2022, 7,  '010222',);
// await BoekingsProgramma.maakeenInkoopboekingDatum(4, 20010, 3100, 2022, 7,  '010222',);
// await kolom.kolommencheck2()


};
example()

async function FileInlezen(file) { 
    var ingelezen = [];
    try {
        var ingelezen = fs.readFileSync(file, 'utf8').split('\r\n')       
    } catch (err) {
        console.error("ERROR file niet ingelezen "+file + err);
        return false
    }
    return ingelezen
}

async function clickmod(element,) { 
    await driver.wait(until.elementLocated(By.xpath(element)));
    // await driver.findElement(By.xpath(button)).click();
    await driver.findElement(By.xpath(element)).click();
    await driver.sleep(2000);
}