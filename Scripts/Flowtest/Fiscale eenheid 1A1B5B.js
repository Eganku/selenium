const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
var HomePage = require('../Page/home.page.js');
var ReviewUserPage = require('../Page/review.user.page.js');
var LinkerMenu = require('../Page/linkermenu.page.js');
var BoekingsProgramma = require('../Financieel/Boekingprogram.page.js');

async function example(){

let adminmaster = 556;
let adminslave = 557;
let adminslavetwo = 558;

await ReviewUserPage.wingpdf(adminslave);

await LinkerMenu.gotoboekingsprogramma();
await driver.switchTo().frame('i_app_boe');
await BoekingsProgramma.maakeenVerkoopboekingDatum(2, 10010, 8002, 2022, 7,  '010222',);
await BoekingsProgramma.maakeenInkoopboekingDatum(4, 20010, 3100, 2022, 7,  '010222',);

await driver.switchTo().defaultContent();
await LinkerMenu.gotoBTWaangifte();
await driver.switchTo().frame('i_app');

await driver.findElement(By.xpath("//td[@id='td_formgrp_1A']")).click();  
await driver.switchTo().frame('i_rapport');
await driver.wait(until.elementLocated(By.xpath("//table[@id='table_frmgrpboekingentotalen']")));
var grond1Aadmin1 = await BoekingsProgramma.convertBedragneg("(//div[@id='div_frmgrpboekingentotalen']//td[@class])[7]");
// console.log(grond1Aadmin1);
var saldo1Aadmin1 = await BoekingsProgramma.convertBedragneg("(//div[@id='div_frmgrpboekingentotalen']//td[@class])[8]");
// console.log(saldo1Aadmin1);

await driver.switchTo().defaultContent();
await driver.switchTo().frame('i_app');
await driver.findElement(By.xpath("//button[@id='backtobtw']")).click(); 

await driver.findElement(By.xpath("//td[@id='td_formgrp_5B']")).click();  
await driver.switchTo().frame('i_rapport');
var grond5Badmin1 = await BoekingsProgramma.convertBedragneg("(//div[@id='div_frmgrpboekingentotalen']//td[@class])[7]");
console.log(grond5Badmin1);
var voor5Badmin1 = await BoekingsProgramma.convertBedragneg("(//div[@id='div_frmgrpboekingentotalen']//td[@class])[8]");
console.log(voor5Badmin1);

await driver.switchTo().defaultContent();
await driver.switchTo().frame('i_app');
await driver.findElement(By.xpath("//button[@id='backtobtw']")).click(); 
await driver.findElement(By.xpath("//button[@id='knop_btwsluiten']")).click();

await driver.switchTo().defaultContent();
await HomePage.verandervanadmin(adminslavetwo);
await LinkerMenu.gotoboekingsprogramma();

await driver.switchTo().frame('i_app_boe');
await BoekingsProgramma.maakeenVerkoopboekingDatum(1, 10010, 8002, 2022, 7, '010222',);
await BoekingsProgramma.maakeenInkoopboekingDatum(3, 20010, 3100, 2022, 7, '010222',);

await driver.switchTo().defaultContent();
await LinkerMenu.gotoBTWaangifte();

await driver.switchTo().frame('i_app');
await driver.findElement(By.xpath("//td[@id='td_formgrp_1B']")).click();  
await driver.switchTo().frame('i_rapport');
var grond1Badmin2 = await BoekingsProgramma.convertBedragneg("(//div[@id='div_frmgrpboekingentotalen']//td[@class])[7]");
// console.log(grond1Badmin2);
var saldo1Badmin2 = await BoekingsProgramma.convertBedragneg("(//div[@id='div_frmgrpboekingentotalen']//td[@class])[8]");
// console.log(saldo1Badmin2);

await driver.switchTo().defaultContent();
await driver.switchTo().frame('i_app');
await driver.findElement(By.xpath("//button[@id='backtobtw']")).click(); 
await driver.findElement(By.xpath("//td[@id='td_formgrp_5B']")).click();  
await driver.switchTo().frame('i_rapport');
var grond5Badmin2 = await BoekingsProgramma.convertBedragneg("(//div[@id='div_frmgrpboekingentotalen']//td[@class])[7]");
console.log(grond5Badmin2);
var voor5Badmin2 = await BoekingsProgramma.convertBedragneg("(//div[@id='div_frmgrpboekingentotalen']//td[@class])[8]");
console.log(voor5Badmin2);

await driver.switchTo().defaultContent();
await driver.switchTo().frame('i_app');
await driver.findElement(By.xpath("//button[@id='backtobtw']")).click(); 
await driver.findElement(By.xpath("//button[@id='knop_btwsluiten']")).click();

await driver.switchTo().defaultContent();
await HomePage.verandervanadmin(adminmaster);
await LinkerMenu.gotoBTWaangifte();
await driver.switchTo().frame('i_app');

await driver.findElement(By.xpath("//td[@id='td_formgrp_1A']")).click();  
await driver.switchTo().frame('i_rapport');
var grond1Aadmin3 = await BoekingsProgramma.convertBedragneg("(//div[@id='div_frmgrpboekingentotalen']//td[@class])[8]");
// console.log(grond1Aadmin3);
var saldo1Aadmin3 = await BoekingsProgramma.convertBedragneg("(//div[@id='div_frmgrpboekingentotalen']//td[@class])[9]");
// console.log(saldo1Aadmin3);

await driver.switchTo().defaultContent();
await driver.switchTo().frame('i_app');
await driver.findElement(By.xpath("//button[@id='backtobtw']")).click(); 

await driver.findElement(By.xpath("//td[@id='td_formgrp_1B']")).click();  
await driver.switchTo().frame('i_rapport');
var grond1Badmin3 = await BoekingsProgramma.convertBedragneg("(//div[@id='div_frmgrpboekingentotalen']//td[@class])[8]");
// console.log(grond1Badmin3);
var saldo1Badmin3 = await BoekingsProgramma.convertBedragneg("(//div[@id='div_frmgrpboekingentotalen']//td[@class])[9]");
// console.log(saldo1Badmin3);

await driver.switchTo().defaultContent();
await driver.switchTo().frame('i_app');
await driver.findElement(By.xpath("//button[@id='backtobtw']")).click(); 

await driver.findElement(By.xpath("//td[@id='td_formgrp_5B']")).click();  
await driver.switchTo().frame('i_rapport');
var grond5Badmin3 = await BoekingsProgramma.convertBedragneg("(//div[@id='div_frmgrpboekingentotalen']//td[@class])[8]");
console.log(grond5Badmin3);
var voor5Badmin3 = await BoekingsProgramma.convertBedragneg("(//div[@id='div_frmgrpboekingentotalen']//td[@class])[9]");
console.log(voor5Badmin3);

await driver.switchTo().defaultContent();
await driver.switchTo().frame('i_app');
await driver.findElement(By.xpath("//button[@id='backtobtw']")).click(); 


if(grond1Aadmin1 === grond1Aadmin3 && saldo1Aadmin1 === saldo1Aadmin3)
console.log("Passed! formulier 1A grondslag & BTW bedrag van admin "+adminslave+" komt overeen met admin "+adminmaster)
else
console.log("Error! bedragen van formulier 1A komen niet overeen") 

if(grond1Badmin2 === grond1Badmin3 && saldo1Badmin2 === saldo1Badmin3)
console.log("Passed! formulier 1B grondslag & BTW bedrag van admin "+adminslavetwo+" komt overeen met admin "+adminmaster)
else
console.log("Error! bedragen van formulier 1B komen niet overeen") 

if((grond5Badmin1+grond5Badmin2) === grond5Badmin3)
console.log("Passed! formulier 5B grondslag voorbelasting van admin "+adminslave+" & "+adminslavetwo+" komt overeen met admin "+adminmaster)
else
console.log("error! bedragen van formulier 5B grondslag komen niet overeen") 
console.log(grond5Badmin1+" "+grond5Badmin2+" "+grond5Badmin3 )

if((voor5Badmin1+voor5Badmin2) === voor5Badmin3)
console.log("Passed! formulier 5B BTW bedrag voorbelasting van admin "+adminslave+" & "+adminslavetwo+" komt overeen met admin "+adminmaster)
else
console.log("error! bedragen van formulier 5B BTW bedrag komen niet overeen")
console.log(voor5Badmin1+" "+voor5Badmin2+" "+voor5Badmin3 )


};
example()
