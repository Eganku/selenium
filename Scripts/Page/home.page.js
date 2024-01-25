// var webdriver = require('selenium-webdriver');
const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const BasePage = require('./base.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const divalert = require('../Page/divalert.page.js');

class HomePage extends BasePage{
        
        async kiesadmin(adminnr) {
                
                await driver.wait(until.elementLocated(By.name("zoekterm")));
                await driver.findElement(By.name("zoekterm")).clear();
                await driver.sleep(1000);
                await driver.findElement(By.name("zoekterm")).sendKeys(adminnr);
                await driver.sleep(1000);
                        try{
                             await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='contenttabled_jqx_admlijst']//div[contains(text(),'"+adminnr+"')]"))), 2000);    
                        }
                        catch(NoSuchElementException){
                             console.log("Warning! administratie nummer => " + adminnr + " bestaat niet script wordt gestopt");
                             await global.driver.quit();
                        }
                await driver.sleep(1000);
                await driver.findElement(By.id("knop_ok_adm")).click();
                // await FunctionsPage.verifyContainer("(//span[@class='spanLabelAdministratie'][normalize-space()='Administratie:'])[1]", "Administratie")
                // await driver.wait(until.elementIsEnabled(await driver.findElement(By.xpath("//div[@class='bar_content']"))));
                await this.basisInstellingadmin();
        }

        async verandervanadmin(admin) {
                await driver.wait(until.elementLocated(By.xpath("//div[@id='dropdownlistArrowbar_adminedit']")));
                await driver.findElement(By.xpath("//div[@id='dropdownlistArrowbar_adminedit']")).click();
                await driver.sleep(1000);
                await driver.findElement(By.xpath("(//div[@id='dropdownlistContentbar_adminedit'])//input")).sendKeys(admin);
                await driver.sleep(2000);
                try{
                        await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("(//span[@class='bar_adm_menu_nr'][normalize-space()='"+admin+"'])[1]"))), 2000);    
                }
                catch(NoSuchElementException){
                        console.log("Warning! administratie nummer => " + admin + " bestaat niet script wordt gestopt");
                        await global.driver.quit();
                }

                await driver.findElement(By.xpath("(//span[@class='bar_adm_menuitem'])[1]")).click();
                        do {
                                await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//body"))));
                                await driver.sleep(2000);
                        } while(false);
                                
                        while(true){
                                try{
                                        await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//body"))));
                                        await driver.sleep(2000);
                                        break
                                }
                                catch(NoSuchElementException){
                                }
                        }
                await FunctionsPage.verifyContainer("(//span[@class='spanLabelAdministratie'][normalize-space()='Administratie:'])[1]", "Administratie")
                await driver.wait(until.elementIsEnabled(await driver.findElement(By.xpath("//div[@class='bar_content']"))));
                await this.basisInstellingadmin();
                console.log("Succesvol naar administratie " +admin+ " gewisseld")
        }   

        async logoutuser() {
                // await driver.wait(until.elementLocated(By.className("gen_close_icon"))).click();
                await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//img[@id='img_home']"))), 2000);
                await driver.wait(until.elementLocated(By.xpath("//img[@id='img_home']"))).click();
                var versie = await driver.findElement(By.xpath("(//p[@class='footer-text'])[2]")).getText();
                console.log("Dit is getest in versie " + versie);
                console.log("");
                await driver.wait(until.elementLocated(By.xpath("//span[@id='bar_icon_loff']"))).click();
        }

        async basisInstellingadmin() {
                await driver.sleep(2000);
                var dialog = "//div[@class='dialog_warning']//button[@id='knop_maakbasinstellingen']"
                var checkinlogpopup = await driver.findElements(By.xpath(dialog));
                if (checkinlogpopup != 0){   
                        try{
                        await driver.findElement(By.xpath("//div[@class='dialog_warning']//button[@id='knop_maakbasinstellingen']")).click();
                        await driver.switchTo().frame('i_app');
                        await divalert.Dialogwarning2("//div[@class='dialogcorner bs']","Basisinrichting van uw administratie","//button[@id='knop_opslaan']" )       
                        await driver.switchTo().defaultContent();
                        }
                        catch(NoSuchElementException){
                        }
                }
        }
}        
 
module.exports = new HomePage();



