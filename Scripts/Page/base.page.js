let {Builder, By, Actions, Key, until, Capabilities,} = require('selenium-webdriver');


"options voor error meldingen te negeren, deze mag uit wanneer dit in chrome is opgelost"
let options = new Capabilities();
options.setAcceptInsecureCerts(true);

// options.set('--ignore-ssl-errors');
// options.set('--ignore-certificate-errors');
// options.set('--ignore-certificate-errors-spki-list');
// options.set('--log-level=3');
options.set('--user-data-dir');


"build normaal maximaal scherm"
let driver = new Builder().withCapabilities(options).forBrowser("chrome").build();

"build Headless scherm, gaat van alles fout, notetoself probeer langzamer code"
// let chrome = require('selenium-webdriver/chrome');
// let driver = new Builder().forBrowser("chrome").setChromeOptions(new chrome.Options().headless()).build();

class BasePage {
    constructor(){
        global.driver = driver;
        driver.manage().window().maximize();  
    }

    async reviewbundelset() {
        await driver.get('http://10.0.0.3/')
        await driver.findElement(By.xpath("//a[contains(text(),'REVIEW ')]")).click();
        await driver.findElement(By.id("details-button")).click();
        await driver.findElement(By.id("proceed-link")).click();
        await driver.findElement(By.id("domein")).click();
        await driver.findElement(By.xpath("//option[@value='bundels']")).click();
    }
       
    async betalenperadm() {
        await driver.get('http://10.0.0.3/')
        await driver.findElement(By.xpath("//a[normalize-space()='BETA/DEV BUNDELS (V: 4.7.7)']")).click();
        // await driver.findElement(By.id("details-button")).click();
        // await driver.findElement(By.id("proceed-link")).click();
        // await driver.findElement(By.id("domein")).click();
        // await driver.findElement(By.xpath("//option[@value='bundels']")).click();
    }

    async reviewbundelset2() {
        await driver.get('http://10.0.0.2/review/inlogscherm.aspx?domein=&afzender=logout')
        // await driver.findElement(By.xpath("//a[contains(text(),'REVIEW ')]")).click();
        // await driver.findElement(By.id("details-button")).click();
        // await driver.findElement(By.id("proceed-link")).click();
        await driver.findElement(By.id("domein")).click();
        await driver.findElement(By.xpath("//option[@value='bundels']")).click();
        // console.log("reviewset geladen")
        await driver.wait(until.elementLocated(By.id("s_inlogscherm")));
    }

    async devsetbetalenperadm() {
        await driver.get('http://10.0.0.2/beta/inlogscherm.aspx')
        // await driver.findElement(By.xpath("//a[contains(text(),'REVIEW ')]")).click();
        // await driver.findElement(By.id("details-button")).click();
        // await driver.findElement(By.id("proceed-link")).click();
        await driver.findElement(By.id("domein")).click();
        await driver.findElement(By.xpath("//option[@value='betalenperadm']")).click();
        // console.log("reviewset geladen")
        await driver.wait(until.elementLocated(By.id("s_inlogscherm")));
    }

    async devsetSQL() {
        await driver.get('http://10.0.0.2/betasql/hoofdmenu.aspx')
        // await driver.findElement(By.xpath("//a[contains(text(),'REVIEW ')]")).click();
        // await driver.findElement(By.id("details-button")).click();
        // await driver.findElement(By.id("proceed-link")).click();
        await driver.findElement(By.id("domein")).click();
        await driver.findElement(By.xpath("//option[.='Ontwikkeling']")).click();
        // console.log("reviewset geladen")
        await driver.wait(until.elementLocated(By.id("s_inlogscherm")));
    }

    async demoset() {                     
        await driver.get("https://muis82.nl/imuis_net")
        await driver.findElement(By.id("domein")).sendKeys("demo");    
    }

}



module.exports = BasePage;
