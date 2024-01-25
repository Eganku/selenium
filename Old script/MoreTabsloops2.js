const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
var HomePage = require('../Page/home.page.js');
var DemoUserPage = require('../Page/demo.user.page.js');

async function example(){

await DemoUserPage.wingman(555);
await driver.quit();
return
var tabs = 50

const originalWindow = await driver.getWindowHandle();
await driver.wait(until.elementLocated(By.xpath("//a[normalize-space()='Financieel']")));
await driver.findElement(By.xpath("//a[normalize-space()='Financieel']")).click();
await driver.findElement(By.xpath("(//i[@id='i_newwindow'])[1]")).click();


// var windows =[];
// var handle = [];
for(var i=1; i<=tabs; i++){
    // await driver.wait(async () => 
    //     (await driver.getAllWindowHandles()).length === i+1, 10000);
    //Loop through until we find a new window handle
    var windows = await driver.getAllWindowHandles();
    windows.forEach(async handle => {
        if (handle !== originalWindow) {
            await driver.switchTo().window(handle);
        }
    });

    await driver.sleep(2000);
    try{
        await driver.wait(until.titleIs('555 - Boekingsprogramma'), 5000);
        await driver.switchTo().frame('i_app_boe');
        await driver.wait(until.elementLocated(By.xpath("//span[@title='Sluiten']"))).click();
        await driver.switchTo().defaultContent();
        await driver.wait(until.elementLocated(By.xpath("//a[normalize-space()='Spitsfactuur']"))).click();
    }
    catch(TimeoutError){ 
    }

    await driver.switchTo().window(originalWindow);
    await driver.sleep(2000);
    await driver.wait(until.elementLocated(By.xpath("//a[normalize-space()='Financieel']")));
    await driver.findElement(By.xpath("//a[normalize-space()='Financieel']")).click();
    await driver.findElement(By.xpath("(//i[@id='i_newwindow'])[1]")).click();
    await driver.sleep(2000);
    console.log("Tabblad "+[i+2]);
}

};
example()
