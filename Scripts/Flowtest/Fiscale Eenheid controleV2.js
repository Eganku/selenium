const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const HomePage = require('../Page/home.page.js');
const ReviewUserPage = require('../Page/review.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const divconfirm = require('../Page/divconfirm.page.js');
const BTWaangifte = require('../Financieel/BTWaangifte.page.js');

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

await ReviewUserPage.wingpdf(adminslave);
console.log("Script instelling Fiscale eenheid 3 admins");
// controle grootboek rekening BTW 
// oplossing kan zijn de vinkjes uit te zetten bij een vervolg script, dus wanneer daadwerkelijke boeking gedaan wordt aan het einde deze uit te vinken.

"popup 'Wijzig aangifte methode' komt alleen tevoorschijn bij eerste keer opstarten van btw aangifte."
await LinkerMenu.gotoBTWaangifte();
await driver.switchTo().frame('i_app');
await BTWaangifte.catchAangiftemethode("//table[@class='tablelayout dialogcorner bs']","Wijzig aangiftemethode", "");
await driver.switchTo().defaultContent();

"basisinstellingen Btw aangifte, controle op BTW nummer en instellingen BTW fiscale eenheid"
await BTWaangifte.BasisinstellingBTWaangifte(BTWnummer, 2022,)

await FunctionsPage.verifyContainer("//div[@class='dialogcorner bs']", "Basisinstellingen voor uw BTW-aangifte");
await BTWaangifte.fiscaleEenheidBTWCheck(BTWnummer,);
await BTWaangifte.fiscaleEenheidCheck(adminslave, adminmaster);
await driver.switchTo().defaultContent();
await HomePage.verandervanadmin(adminslavetwo);

"popup 'Wijzig aangifte methode' komt alleen tevoorschijn bij eerste keer opstarten van btw aangifte."
await LinkerMenu.gotoBTWaangifte();
await driver.switchTo().frame('i_app');
await BTWaangifte.catchAangiftemethode("//table[@class='tablelayout dialogcorner bs']","Wijzig aangiftemethode" );
await driver.switchTo().defaultContent();

"basisinstellingen Btw aangifte, controle op BTW nummer en instellingen BTW fiscale eenheid"
await BTWaangifte.BasisinstellingBTWaangifte(BTWnummer, 2022,)
await FunctionsPage.verifyContainer("//div[@class='dialogcorner bs']", "Basisinstellingen voor uw BTW-aangifte");
await BTWaangifte.fiscaleEenheidBTWCheck(BTWnummer);
await BTWaangifte.fiscaleEenheidCheck(adminslavetwo, adminmaster);
await driver.switchTo().defaultContent();

await HomePage.verandervanadmin(adminmaster);
"popup 'Wijzig aangifte methode' komt alleen tevoorschijn bij eerste keer opstarten van btw aangifte."
await LinkerMenu.gotoBTWaangifte();
await driver.switchTo().frame('i_app');
await BTWaangifte.catchAangiftemethode("//table[@class='tablelayout dialogcorner bs']","Wijzig aangiftemethode" );
await driver.switchTo().defaultContent();

"basisinstellingen Btw aangifte, controle op BTW nummer en instellingen BTW fiscale eenheid"
await BTWaangifte.BasisinstellingBTWaangifte(BTWnummer, 2022,)
await FunctionsPage.verifyContainer("//div[@class='dialogcorner bs']", "Basisinstellingen voor uw BTW-aangifte");
await BTWaangifte.fiscaleEenheidBTWCheck(BTWnummer);

await driver.findElement(By.xpath("//button[@id='BTN_FISCEENH']")).click();
await FunctionsPage.verifyContainer("//div[@id='d_fisceenhinstellingen']", "Instellingen BTW fiscale eenheid",)
let test = await FunctionsPage.checkboxchecker("//input[@name='CHKBOX_FISCADM']");

await driver.findElement(By.xpath("//tr[contains(@admnr,'"+adminslave+"')]")).click();
let test2 = await FunctionsPage.checkboxchecker("//input[@value='"+adminslave+"']");
await driver.findElement(By.xpath("//tr[contains(@admnr,'"+adminslavetwo+"')]")).click();
let test3 = await FunctionsPage.checkboxchecker("//input[@value='"+adminslavetwo+"']");

await driver.findElement(By.xpath("//td[@class='alignright']//button[1]")).click();
await driver.switchTo().defaultContent();
await divconfirm.multiDialogsucces("Instellingen correct opgeslagen.", "De geselecteerde administraties zijn gekoppeld aan de fiscale eenheid administratie "+adminmaster, "//button[contains(.,'OK')]")
await driver.switchTo().frame('i_app');

if(test == true && test2 == true && test3 == true){
    console.log("Instellingen BTW fiscale eenheid zijn succesvol")
    await driver.findElement(By.xpath("(//button[@id='btn_fisceenh_ok'])[2]")).click();     
    await driver.findElement(By.xpath("//button[@id='knop_sluiten']")).click();
    await driver.wait(until.elementLocated(By.xpath("//td[@class='bold']")));
    var meld = await driver.findElement(By.xpath("//td[@class='bold']")).getText();
    if(meld.match("Deze administratie is een fiscale eenheid hoofdadministratie")){
        console.log("'DivPopup' matched! => ") 
    }
    else { 
        console.log("Warning 'DivPopup' matched NIET met verwachte text! => ") 
    }
}
else{
    console.log("Error! => 'DivPopup' niet gegenereerd")
    await driver.quit();
}
await BTWaangifte.CatchToonaangifte("//div[contains(text(),'Er is nog geen aangifte voor')]","Er is nog geen aangifte voor",);
await driver.findElement(By.xpath("//button[@id='knop_btwsluiten']")).click();  

await driver.switchTo().defaultContent();
await HomePage.logoutuser();
await driver.quit();

};
example()

