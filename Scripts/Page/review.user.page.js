// var webdriver = require('selenium-webdriver');
const {Builder, By, Actions, Key, until,} = require('selenium-webdriver');
const BasePage = require('./base.page.js');
const HomePage = require('../Page/home.page.js');

class ReviewUserPage extends BasePage{
      
    async wing(admin) {
        var username = "wing"
        var password = "geheim1"
        await HomePage.devsetSQL();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async wingman(admin) {
        var username = "wingman"
        var password = "geheim1"
        await HomePage.reviewbundelset2();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async wingman2(admin) {
        var username = "wingman"
        var password = "geheim1"
        await HomePage.devsetbetalenperadm();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async wingpdf(admin) {
        var username = "wingpdf"
        var password = "geheim1"
        await HomePage.reviewbundelset2();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async wingchat(admin) {
        var username = "wingchat"
        var password = "geheim1"
        await HomePage.reviewbundelset2();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async muisww(admin) {
        var username = "muis.ww"
        var password = "geheim1"
        await HomePage.reviewbundelset2();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async winglight(admin) {
        var username = "winglight2"
        var password = "geheim1"
        await HomePage.reviewbundelset2();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async wingtogether(admin) {
        var username = "together2"
        var password = "geheim1"
        await HomePage.reviewbundelset2();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async beheer(admin) {
        var username = "wingextramed"
        var password = "geheim1"
        await HomePage.reviewbundelset2();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async beheer2(admin) {
        var username = "beheer"
        var password = "geheim1"
        await HomePage.reviewbundelset2();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async wingbasis(admin) {
        var username = "wingbasis"
        var password = "geheim1"
        await HomePage.reviewbundelset2();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async wingplus(admin) {
        var username = "wingplus"
        var password = "geheim1"
        await HomePage.reviewbundelset2();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async wingacc(admin) {
        var username = "wingacc"
        var password = "geheim1"
        await HomePage.devsetbetalenperadm();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async Devpro(admin) {
        var username = "testpro"
        var password = "wImXYmCT"
        await HomePage.devsetbetalenperadm();
        await this.login(username,password)
        
        await this.alingelogdpop(admin)
    }

    async Devplus(admin) {
        var username = "testplus"
        var password = "gnHzkDRp"
        await HomePage.devsetbetalenperadm();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async Devbasis(admin) {
        var username = "testbasis"
        var password = "pBQbbmJf"
        await HomePage.devsetbetalenperadm();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async Devlight(admin) {
        var username = "testlight"
        var password = "cWUdmcRi"
        await HomePage.devsetbetalenperadm();
        await this.login(username,password)
        await this.alingelogdpop(admin)
    }

    async alingelogdpop(admin) { 
        var dialog = "//div[@role='dialog']"
        var spinner = "//div[@id='d_grijs_d_spinner']"

        try{
            await driver.wait(until.elementLocated(By.xpath(spinner)), 5000);
            var text = await driver.findElement(By.xpath(spinner)).getText();
            console.log(text)
            await this.spinnercheck()
            return
        }
        catch(NoSuchElementException){
        }

        try{
            await driver.wait(until.elementLocated(By.xpath(dialog)), 5000);
            await driver.findElement(By.xpath("//button[normalize-space()='Ja']")).click();
            console.log("popup EVENT gebruiker reeds ingelogd")        
        }
        catch(NoSuchElementException){
        }              

        await HomePage.kiesadmin(admin);   

    }

    async spinnercheck() { 
        await driver.sleep(3000);
        let spinner = await driver.findElements(By.xpath("//div[@id='d_grijs_d_spinner']"));
        // console.log(spinner!= 0)
        if (spinner!= 0){
            let target =[]
            do {
                target = await driver.findElements(By.xpath("//div[@id='d_grijs_d_spinner']"));
                // await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='d_spinner']"))));
                await driver.sleep(2000);
                // console.log("spinner")
            } while(target != 0);
            return true
        }
        else {
            return false
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
 
module.exports = new ReviewUserPage();



