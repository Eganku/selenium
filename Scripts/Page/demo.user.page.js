// var webdriver = require('selenium-webdriver');
const {Builder, By, Actions, Key, until,} = require('selenium-webdriver');
const BasePage = require('./base.page.js');
const HomePage = require('../Page/home.page.js');

class DemoUserPage extends BasePage{
           

    async wingman(admin) {
        var username = "wingman"
        var password = "geheim1"
        await HomePage.demoset();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async wingacc(admin) {
        var username = "wingacc"
        var password = "geheim1"
        await HomePage.demoset();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async wing(admin) {
        var username = "wing"
        var password = "Geheim1"
        await HomePage.demoset();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async alingelogdpop(admin) { 
        await driver.sleep(1000);
            try{
            await driver.wait(until.elementLocated(By.xpath("//div[@role='dialog']")), 1000);
            await driver.findElement(By.xpath("//button[normalize-space()='Ja']")).click();
            // console.log("popup EVENT gebruiker reeds ingelogd")
            }
            catch(NoSuchElementException){
            }
        await this.appkeuze();
        await HomePage.kiesadmin(admin);
    }

    async appkeuze(admin) { 
        await driver.sleep(1000);
            try{
            await driver.wait(until.elementLocated(By.xpath("//form[@name='form_appkeuze']")), 1000);
            await driver.findElement(By.xpath("//button[@id='knop_inloggen_imuisonline']")).click();
            // console.log("popup EVENT gebruiker reeds ingelogd")
            }
            catch(NoSuchElementException){
            }
    }

    async login(username, password) {
        await driver.sleep(1000);
        await driver.findElement(By.id("username")).clear();
        await driver.sleep(1000);
        await driver.findElement(By.id("username")).sendKeys(username);
        await driver.sleep(1000);
        await driver.findElement(By.id("password")).clear();
        await driver.sleep(1000);
        await driver.findElement(By.id("password")).sendKeys(password, Key.RETURN);
    }

}        
 
module.exports = new DemoUserPage();



