const {Builder, By, Actions, Key, until, checkedLocator, } = require('selenium-webdriver');
const HomePage = require('../Page/home.page.js');
const ReviewUserPage = require('../Page/review.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const Meldingen = require('../Page/meldingen.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const BTWaangifte = require('../Financieel/BTWaangifte.page.js');

async function example(){

let adminmaster = 556;
let adminslave = 557;
let adminslavetwo = 558;
let BTWnummer = 'NL261925143B01';

await ReviewUserPage.wingpdf();
await HomePage.kiesadmin(adminslave);

await LinkerMenu.gotoBTWaangifte();
// controle grootboek rekening BTW 
// nog een laatste check bij pagina koptext van btwaangifte deze zal in eerste uinstantie falen vanwege geen koppeling
// deze in de page pagina fiscale eenheid check uitvoeren meest voor de hand liggende pagina met minste storingen
// oplossing kan zijn de vinkjes uit te zetten bij een vervolg script, dus wanneer daadwerkelijke boeking gedaan wordt aan het einde deze uit te vinken.
await driver.switchTo().frame('i_app');
await BTWaangifte.catchAangiftemethode("//table[@class='tablelayout dialogcorner bs']","Wijzig aangiftemethode" );
await driver.switchTo().defaultContent();

var ErrorNIG = await Meldingen.trycatchErrorOKNoErrorMsg("Nog niet volledig ingevuld", "U maakt gebruik van het PKIoverheidscertificaat van KING Software.");
await driver.switchTo().frame('i_app');
if (ErrorNIG == true){
    await BTWaangifte.fiscaleEenheid(BTWnummer,2022)
    await driver.wait(until.elementLocated(By.xpath("//button[@id='knop_btwaanpassen']")));
    await driver.findElement(By.xpath("//button[@id='knop_btwaanpassen']")).click();
}
else{
    await driver.wait(until.elementLocated(By.xpath("//button[@id='knop_btwaanpassen']")));
    await driver.findElement(By.xpath("//button[@id='knop_btwaanpassen']")).click();
}

await Meldingen.trycatchDialogContainer("//div[@class='dialogcorner bs']", "Basisinstellingen voor uw BTW-aangifte");
await BTWaangifte.fiscaleEenheidBTWCheck(BTWnummer);
await BTWaangifte.fiscaleEenheidCheck(adminslave, adminmaster);

await driver.switchTo().defaultContent();
await HomePage.verandervanadmin(adminslavetwo);

await LinkerMenu.gotoBTWaangifte();
await driver.switchTo().frame('i_app');
await BTWaangifte.catchAangiftemethode("//table[@class='tablelayout dialogcorner bs']","Wijzig aangiftemethode" );
await driver.switchTo().defaultContent();
var ErrorNIG = [await Meldingen.trycatchErrorOKNoErrorMsg("Nog niet volledig ingevuld", "U maakt gebruik van het PKIoverheidscertificaat van KING Software.")];
await driver.switchTo().frame('i_app');
if (ErrorNIG == "true"){
    await BTWaangifte.fiscaleEenheid(BTWnummer,2022)
    await driver.wait(until.elementLocated(By.xpath("//button[@id='knop_btwaanpassen']")));
    await driver.findElement(By.xpath("//button[@id='knop_btwaanpassen']")).click();
}
else{
    await driver.wait(until.elementLocated(By.xpath("//button[@id='knop_btwaanpassen']")));
    await driver.findElement(By.xpath("//button[@id='knop_btwaanpassen']")).click();
}
await Meldingen.trycatchDialogContainer("//div[@class='dialogcorner bs']", "Basisinstellingen voor uw BTW-aangifte");
await BTWaangifte.fiscaleEenheidBTWCheck(BTWnummer);
await BTWaangifte.fiscaleEenheidCheck(adminslavetwo, adminmaster);

await driver.switchTo().defaultContent();
await HomePage.verandervanadmin(adminmaster);
await LinkerMenu.gotoBTWaangifte();
await driver.switchTo().frame('i_app');
await BTWaangifte.catchAangiftemethode("//table[@class='tablelayout dialogcorner bs']","Wijzig aangiftemethode" );
await driver.switchTo().defaultContent();
var ErrorNIG = await Meldingen.trycatchErrorOKNoErrorMsg("Nog niet volledig ingevuld", "U maakt gebruik van het PKIoverheidscertificaat van KING Software.");
await driver.switchTo().frame('i_app');
if (ErrorNIG == true){
    await BTWaangifte.fiscaleEenheid(BTWnummer,2022)
    await driver.wait(until.elementLocated(By.xpath("//button[@id='knop_btwaanpassen']")));
    await driver.findElement(By.xpath("//button[@id='knop_btwaanpassen']")).click();
}
else{
    await driver.wait(until.elementLocated(By.xpath("//button[@id='knop_btwaanpassen']")));
    await driver.findElement(By.xpath("//button[@id='knop_btwaanpassen']")).click();
}
await Meldingen.trycatchDialogContainer("//div[@class='dialogcorner bs']", "Basisinstellingen voor uw BTW-aangifte");
await BTWaangifte.fiscaleEenheidBTWCheck(BTWnummer);
await driver.findElement(By.xpath("//button[@id='BTN_FISCEENH']")).click();
await Meldingen.trycatchDialogContainer("//div[@id='d_fisceenhinstellingen']", "Instellingen BTW fiscale eenheid",)

let test = await FunctionsPage.checkboxchecker("//input[@name='CHKBOX_FISCADM']");
await driver.findElement(By.xpath("//tr[contains(@admnr,'"+adminslave+"')]")).click();
let test2 = await FunctionsPage.checkboxchecker("//input[@value='"+adminslave+"']");
await driver.findElement(By.xpath("//tr[contains(@admnr,'"+adminslavetwo+"')]")).click();
let test3 = await FunctionsPage.checkboxchecker("//input[@value='"+adminslavetwo+"']");

await driver.findElement(By.xpath("//td[@class='alignright']//button[1]")).click();
await driver.switchTo().defaultContent();
await Meldingen.trycatchWarningMultiNomsg("De geselecteerde administraties zijn gekoppeld aan de fiscale eenheid administratie "+adminmaster,"//button[normalize-space()='OK']")
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

await Meldingen.trycatchdivMultiNomsg("//div[contains(text(),'Er is nog geen aangifte voor')]","Er is nog geen aangifte voor","(//button[@class=' kingButtonOutline'])[5]");
await driver.findElement(By.xpath("//button[@id='knop_btwsluiten']")).click();  

await driver.switchTo().defaultContent();
await HomePage.logoutuser();
await driver.quit();


};
example()
