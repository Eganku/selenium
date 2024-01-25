const {Builder, By, Actions, Key, until,} = require('selenium-webdriver');
const HomePage = require('../Page/home.page.js');
const DemoUserPage = require('../Page/demo.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const FunctionsPage = require('../Page/functions.page.js');

async function example(){

await DemoUserPage.wingman(555);

await LinkerMenu.SpitsfactuurSideMenu()
await driver.switchTo().frame('i_app');
var checkw = await driver.findElement(By.id("th_totaal")).getText();
if (checkw == "Totaal EXCL"){
    await driver.findElement(By.id("onoffswitch")).click();
    console.log('toggle EVENT btw stond op exBtw');
} 

await driver.findElement(By.xpath("(//input[@placeholder='Artikel'])[1]")).sendKeys("finner");
await driver.wait(until.elementLocated(By.xpath("(//b[contains(text(),'Finner')])[3]"))).click();

await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='Instellingen']"))).click();
await driver.wait(until.elementLocated(By.xpath("//div[contains(text(),'Stamgegevens')]"))).click();
await driver.wait(until.elementLocated(By.xpath("//select[@name='BETCONDDGN']"))).click();

await driver.findElement(By.xpath("//option[@value='14']")).click();
var dagen = await driver.findElement(By.xpath("//option[@value='14']")).getAttribute("value");
console.log(dagen + " betaaltermijn gekozen");
var dagen = parseInt(dagen);

// await driver.wait(until.elementLocated(By.xpath("//div[@id='d_basalg']//button[@class='btn btn-medium primary_grey'][normalize-space()='Sluiten']"))).click();
await driver.wait(until.elementLocated(By.xpath("//button[@onclick='SaveBasAlg(); return false;']"))).click();
// await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Selecteer standaardtekst (zie instellingen)']"))).click();
// await driver.findElement(By.xpath("//input[@placeholder='Selecteer standaardtekst (zie instellingen)']")).click();

var datum = await driver.findElement(By.xpath("//div[@id='jqxDateTimeInput']")).getAttribute('aria-valuenow');
var datum= new Date(datum);
console.log(datum.toLocaleDateString('nl-NL'))

var factbedrag = await driver.findElement(By.css("tbody tr th:nth-child(2) span:nth-child(1)")).getText();
    factbedrag = factbedrag.replace("€ ", "");
console.log(factbedrag + " totaalbedrag incl btw");
    factbedragpunt = factbedrag.replace(",",".");
await driver.findElement(By.id("onoffswitch")).click();
await driver.sleep(1000);

var factex = await driver.findElement(By.css("tbody tr th:nth-child(2) span:nth-child(1)")).getText();
    factex = factex.replace("€ ", "");
console.log(factex + " totaalbedrag ex btw");
    factexpunt = factex.replace(",",".");
await driver.findElement(By.id("onoffswitch")).click();
var btwapart = (factexpunt - factbedragpunt).toFixed(2);
console.log(btwapart + " btw bedrag berekend vanuit spitsmuis");

await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Selecteer een bestaande debiteur']"))).click();
await driver.findElement(By.xpath("//input[@placeholder='Selecteer een bestaande debiteur']")).sendKeys("10017"), Key.RETURN;
await driver.wait(until.elementLocated(By.xpath("(//b[normalize-space()='10017'])[1]"))).click();
await driver.findElement(By.id("button_toonconcept")).click();
await driver.wait(until.elementIsVisible(driver.findElement(By.id("button_conceptakkoord"))), 10000);
await driver.findElement(By.id("button_conceptakkoord")).click();

await driver.wait(until.elementIsVisible(driver.findElement(By.id("s_factdetailsversturen_titel2"))), 10000);
var factnr = await driver.findElement(By.id("s_factdetailsversturen_titel2")).getText();
var debiteur = await driver.findElement(By.xpath("(//input[@placeholder='Onderwerp'])[1]")).getAttribute('value');
console.log(debiteur + " factuur nummer gegenereerd uit spitsmuis");

await driver.wait(until.elementLocated(By.xpath("//button[@id='btn_factuursluiten']"))).click();
await driver.wait(until.elementLocated(By.xpath("//button[@id='btn_closesnelfactuur']"))).click();

await driver.switchTo().defaultContent();
await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//img[@id='img_home']"))), 5000);
await driver.wait(until.elementLocated(By.xpath("//img[@id='img_home']"))).click();
await LinkerMenu.gotodebiteuropenstaand();
await driver.switchTo().frame('i_app');

await FunctionsPage.verifyContainer("//div[contains(@class,'gen_dialog_titlebar')]", "Openstaande facturen debiteur",)
await driver.wait(until.elementLocated(By.xpath("//div[contains(text(),'Factuur')]")));
await driver.findElement(By.xpath("//div[contains(text(),'Factuur')]")).click();
await driver.findElement(By.xpath("//div[contains(text(),'Factuur')]")).click();
var getrow = await driver.findElement(By.xpath("//div[@columnindex='4'][contains(.,'"+factnr+"')]//parent::div")).getAttribute('row-id');
// console.log("row "+getrow); 
var datum2 = await driver.findElement(By.xpath("//div[@row-id='"+getrow+"']//div[@columnindex='11']")).getText();
console.log(datum2); 
var verval = await driver.findElement(By.xpath("//div[@row-id='"+getrow+"']//div[@columnindex='12']")).getText();
console.log(verval); 

var parts = datum2.split("-");
var datum2 = new Date(parseInt(parts[2])+2000, parseInt(parts[1])-1, parseInt(parts[0]));
// console.log(datum2)
// console.log(datum2.toLocaleDateString('nl-NL'))
var parts = verval.split("-");
var verval = new Date(parseInt(parts[2])+2000, parseInt(parts[1])-1, parseInt(parts[0]));
// console.log(verval)
// console.log(verval.toLocaleDateString('nl-NL'));

const verval2 = new Date(datum2);
verval2.setDate(verval2.getDate() + dagen);
console.log(verval2.toLocaleDateString('nl-NL') + " verval datum berekend op basis wat er gekozen is");

var factnr2 = await driver.findElement(By.xpath("//div[@row-id='"+getrow+"']//div[@columnindex='4']")).getText();
console.log(factnr2)
var bedrag2 = await driver.findElement(By.xpath("//div[@row-id='"+getrow+"']//div[@columnindex='17']")).getText();
console.log(bedrag2)

await driver.findElement(By.xpath("(//div[@class='jqx-grid-cell-left-align'])[2]")).click();
await driver.sleep(500);
await driver.findElement(By.xpath("//button[normalize-space()='Boekingsregels']")).click();

await driver.switchTo().defaultContent();
var btwboek = await driver.findElement(By.xpath("(//td[@id='BEDRBTW'])[1]")).getText();
btwpunt = btwboek.replace(",",".");


await FunctionsPage.controlecheckdatum('aanmaakdatum', datum, datum2 )
await FunctionsPage.controlecheckdatum('verval datum', verval, verval2 )
await FunctionsPage.controlecheck('factuur nummer',factnr, factnr2 )
await FunctionsPage.controlecheck('factuur bedrag',factbedrag, bedrag2 )
await FunctionsPage.controlecheck('BTW bedrag',btwpunt, btwapart )


await driver.wait(until.elementLocated(By.className("gen_close_icon"))).click();
await driver.switchTo().defaultContent();
await HomePage.logoutuser();
await driver.quit();

};
example()






