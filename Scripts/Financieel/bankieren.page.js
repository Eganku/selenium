// var webdriver = require('selenium-webdriver');
const {Builder, By, Actions, Key, until,} = require('selenium-webdriver');
const BasePage = require('../Page/base.page.js');
const divConfirm = require('../Page/divConfirm.page.js');
const divalert = require('../Page/divalert.page.js');
const FunctionsPage = require('../Page/functions.page.js');

class Bankieren extends BasePage{
        
    async getIBANnummer(Bankrekening) {
        await driver.findElement(By.xpath("//button[@title='Aanpassen']")).click();
        var IBAN = await driver.findElement(By.xpath("//input[@name='IBAN']")).getAttribute('value');
        // console.log(IBAN)   
        if(Bankrekening == IBAN){
            // spaties toevoegen na elk 4 cijfer tbv weergave bankrek.
            var IBAN2 = IBAN.match(/.{1,4}/g).join(' ');
            await driver.findElement(By.xpath("//button[@name='knop_sluiten']")).click();
            return IBAN2
        }
        else{
            console.log("Warning Opgegeven bankrekening komt niet overeen met gevonden IBAN");
        }
    }
    
    async uploadbankafscrift(afschrift) {
        await driver.wait(until.elementLocated(By.xpath("//button[@id='knop_handmatig']")), 5000);
        await driver.findElement(By.xpath("//button[@id='knop_handmatig']")).click();
        await driver.findElement(By.xpath("//input[@id='File1']")).sendKeys(afschrift);
        await driver.findElement(By.xpath("//button[@id='knop_submit']")).click();
        await driver.sleep(1000);
    }
    
    async verwijderbankafschriften(tekst, button, NR  ) {
        // verwijder meerder bankafschriften
        await driver.wait(until.elementLocated(By.xpath("//td[@id='d_historie_divtitel']")), 2000);
        while (parseInt((await driver.findElements(By.xpath("(//button[@id='knop_delete'])"))).length) > NR) {
            await driver.findElement(By.xpath("(//button[@id='knop_delete'])[1]")).click();
            await divConfirm.Dialogquestion(tekst, button );
            // var listing = (await driver.findElements(By.xpath("(//button[@id='knop_delete'])"))).length;
            // console.log(parseInt(listing));
        }
    }

    async verwijderafschriftregels() {
        // alle afschriften verwijderen 
        await driver.wait(until.elementLocated(By.xpath("//tr[contains(@deleteable,'N')]")), 2000);
        while (parseInt((await driver.findElements(By.xpath("//tr[contains(@deleteable,'N')]"))).length) > 0) {
            await driver.findElement(By.xpath("//input[@id='CHKBOX_AFSCHRIFTEN_ALL']")).click();
            await driver.findElement(By.xpath("//button[@id='knop_delete']")).click();
            await driver.sleep(1000);
                try{
                    await driver.wait(until.elementLocated(By.xpath("//div[@role='dialog']")), 5000);
                    await driver.findElement(By.xpath("//button[normalize-space()='Ja']")).click();
                    await driver.sleep(1000);
                }    
                catch(NoSuchElementException){
                console.log("Error! geen melding dialoog")
                }
            // var listing = (await driver.findElements(By.xpath("//tr[contains(@deleteable,'N')]"))).length;
            // console.log(parseInt(listing));
        }
    }

    async verwerkenbankafschrift() {
        await driver.findElement(By.xpath("//button[@id='knop_doorboeken']")).click();
        // await driver.sleep(2000);
        await FunctionsPage.verifyContainer("//td[normalize-space()='Verwerken bankafschriften']","Verwerken bankafschriften" );
        await driver.findElement(By.xpath("//select[@id='GEBRUIKBOEKING']")).click();
        await driver.findElement(By.xpath("//select[@id='GEBRUIKBOEKING']")).sendKeys(Key.PAGE_DOWN);
        await driver.wait(until.elementLocated(By.xpath("//td[normalize-space()='Jaar:']")));
        // await driver.sleep(3000);
        await driver.findElement(By.xpath("//button[@id='knop_doorboekendialog']")).click();
        // await driver.sleep(2000);
    }

}        
 
module.exports = new Bankieren();