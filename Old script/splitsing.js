const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
var HomePage = require('../Page/home.page.js');
var ReviewUserPage = require('../Page/review.user.page.js');
var LinkerMenu = require('../Page/linkermenu.page.js');
var BoekingsProgramma = require('../Scripts/Financieel/Boekingprogram.page.js');

async function example(){

await ReviewUserPage.wingpdf(555);
sadf

return
// check groot boek splitsing 2000
// maak grootboek

await LinkerMenu.gotoboekingsprogramma();
await driver.switchTo().frame('i_app_boe');
await BoekingsProgramma.maakeenInkoopboeking("", 20003, 2000);

var boekbedrag = await driver.findElement(By.xpath("(//input[@name='BEDRBOEK'])[last()-1]")).getAttribute('value');
console.log (boekbedrag);

await driver.findElement(By.xpath("//tr[@id='tr_regelid_0']//input[@name='REK']")).sendKeys(4500);
await driver.sleep(1000);
await driver.findElement(By.xpath("//tr[@id='tr_regelid_0']//input[@name='BEDRBOEK']")).clear();
await driver.findElement(By.xpath("//tr[@id='tr_regelid_0']//input[@name='BEDRBOEK']")).sendKeys(-1500);
await driver.sleep(1000);
await driver.findElement(By.xpath("//tr[@id='tr_regelid_0']//input[@name='BTW']")).clear();
await driver.findElement(By.xpath("//tr[@id='tr_regelid_0']//input[@name='BTW']")).sendKeys(4);
await driver.sleep(1000);
await driver.findElement(By.xpath("//span[@id='td_knop_save']")).click();

await driver.findElement(By.xpath("//tr[@id='tr_regelid_0']//input[@name='REK']")).sendKeys(4200);
await driver.sleep(1000);
await driver.findElement(By.xpath("//tr[@id='tr_regelid_0']//input[@name='BTW']")).clear();
await driver.findElement(By.xpath("//tr[@id='tr_regelid_0']//input[@name='BTW']")).sendKeys(3);
await driver.sleep(1000);
await driver.findElement(By.xpath("//span[@id='td_knop_save']")).click();



await driver.sleep(2000);

return

await driver.switchTo().defaultContent();


};
example()
