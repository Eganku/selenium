const {Builder, By, Actions, Key, until,} = require('selenium-webdriver');
const HomePage = require('../Page/home.page.js');
var DemoUserPage = require('../Page/demo.user.page.js');

async function example(){

await DemoUserPage.wingman();
await HomePage.kiesadmin(555);

await driver.wait(until.elementLocated(By.xpath("//a[normalize-space()='Spitsfactuur']"))).click();
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
var dagen = await driver.findElement(By.xpath("//option[@value='14']")).getText();
console.log(dagen + " betaaltermijn gekozen");

// await driver.wait(until.elementLocated(By.xpath("//div[@id='d_basalg']//button[@class='btn btn-medium primary_grey'][normalize-space()='Sluiten']"))).click();

await driver.wait(until.elementLocated(By.xpath("//button[@onclick='SaveBasAlg(); return false;']"))).click();

// await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Selecteer standaardtekst (zie instellingen)']"))).click();
// await driver.findElement(By.xpath("//input[@placeholder='Selecteer standaardtekst (zie instellingen)']")).click();

var datum = await driver.findElement(By.xpath("//div[@id='jqxDateTimeInput']")).getAttribute('aria-valuetext');
var parts = datum.split("/");
var datum = new Date(parseInt(parts[2], 10),
                     parseInt(parts[1], 10) -1,
                     parseInt(parts[0], 10) );
console.log(datum.toLocaleDateString('nl-NL') + " aanmaak datum in spitsfactuur");

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

await driver.switchTo().defaultContent();

// await driver.wait(until.elementIsVisible(driver.findElement(By.id("loader-wrapper"))), 5000);
// await driver.wait(until.elementIsNotVisible(driver.findElement(By.id("loader-wrapper"))), 5000);

await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//img[@id='img_home']"))), 5000);
await driver.wait(until.elementLocated(By.xpath("//img[@id='img_home']"))).click();


await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Zoeken']")));
await driver.findElement(By.xpath("//input[@placeholder='Zoeken']")).sendKeys("555");

await driver.wait(until.elementLocated(By.xpath("//a[normalize-space()='Financieel']")));
await driver.findElement(By.xpath("//a[normalize-space()='Financieel']")).click();
await driver.findElement(By.xpath("(//a[contains(@class,'with_arrow')][normalize-space()='Debiteuren'])[1]")).click();
await driver.findElement(By.xpath("//a[normalize-space()='Openstaande facturen debiteur']")).click();

await driver.switchTo().frame('i_app');

await driver.wait(until.elementLocated(By.xpath("//div[contains(text(),'Factuur')]")));
await driver.findElement(By.xpath("//div[contains(text(),'Factuur')]")).click();
await driver.findElement(By.xpath("//div[contains(text(),'Factuur')]")).click();

var datum2 = await driver.findElement(By.xpath("(//div[@class='jqx-grid-cell-left-align'])[4]")).getText();
var parts = datum2.split("-");
var datum2 = new Date(parseInt(parts[2], 10) + 2000,
                      parseInt(parts[1], 10) -1,
                      parseInt(parts[0], 10) );

var verval = await driver.findElement(By.xpath("(//div[@role='gridcell'])[13]")).getText();
var parts = verval.split("-");
var verval = new Date(parseInt(parts[2], 10) + 2000,
                      parseInt(parts[1], 10) -1,
                      parseInt(parts[0], 10) );

  function addDays(date, days) {
      const copy = new Date(Number(date))
      copy.setDate(date.getDate() + days)
      return copy
    }
    // const date = new Date();
    const newverval = addDays(datum2, 14);
console.log(newverval.toLocaleDateString('nl-NL') + " verval datum berekend op basis wat er gekozen is");

var factnr2 = await driver.findElement(By.xpath("(//div[@class='jqx-grid-cell-left-align'])[2]")).getText();
var bedrag2 = await driver.findElement(By.xpath("(//div[@role='gridcell'])[18]")).getText();

await driver.findElement(By.xpath("(//div[@class='jqx-grid-cell-left-align'])[2]")).click();
await driver.sleep(500);
await driver.findElement(By.xpath("//button[normalize-space()='Boekingsregels']")).click();

await driver.switchTo().defaultContent();
var btwboek = await driver.findElement(By.xpath("(//td[@id='BEDRBTW'])[1]")).getText();
btwpunt = btwboek.replace(",",".");

if(datum.getDate() === datum2.getDate())
console.log("Passed Check 1 => aanmaak factuur datum klopt met wat er standaard is gegenereerd in spitsfactuur");
else
console.log("Error 1 => factuur datum komt niet overeen");

if(verval.getDate() === newverval.getDate())
console.log("Passed Check 2 => vervaldatum klopt met stamgegevens bij instellingen");
else
console.log("Error 2 => vervaldatum klopt niet");

if(factnr === factnr2)
console.log("Passed check 3 => factuur nummer is gelijk bij aanmaak in spitsfactuur");
else
console.log("Error 3 => factuur nummer komt niet overeen");

if(factbedrag === bedrag2)
console.log("Passed check 4 => factuur bedrag komt overeen");
else
console.log("Error 4 => factuur bedrag komt niet overeen");

if(btwpunt === btwapart)
console.log("Passed check 5 => BTW bedragen matched");
else
console.log("Error 5 => BTW bedragen matched niet");

await driver.wait(until.elementLocated(By.className("gen_close_icon"))).click();


await driver.switchTo().defaultContent();
await HomePage.logoutuser();
await driver.quit();

};
example()






