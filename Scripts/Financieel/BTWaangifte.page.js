// var webdriver = require('selenium-webdriver');
const {Builder, By, Actions, Key, until,} = require('selenium-webdriver');
const BasePage = require('../Page/base.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const divAlert = require('../Page/divalert.page.js');
const divConfirm = require('../Page/divconfirm.page.js');

class BTWaangifte extends BasePage{

    async catchAangiftemethode(container, tekst,) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            var meld = await driver.findElement(By.xpath(container)).getText();
            if(meld.match(tekst)){
                console.log("'Dialogcorner' matched! => ")
                // console.log(meld)
            }
            else{
                console.log("Warning 'Dialogcorner' matched NIET met verwachte text! => ");
                console.log(meld);
                return false
            }
            await driver.findElement(By.xpath("//input[@value='A']")).click();  
            await driver.findElement(By.xpath("//input[@name='knop_opslaan']")).click(); 
            await driver.sleep(2000); 
            return true
        }
        catch(NoSuchElementException){
        return false
        }
    }
   
    async CatchDialog(container, tekst,) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            var meld = await driver.findElement(By.xpath(container)).getText();
            if(meld.match(tekst)){
                console.log("'Dialog' matched! => ")
                // console.log(tekst)
                return true
            }
            else{
                console.log("Warning 'Dialog' matched NIET met verwachte text! => ");
                console.log(meld);
                return false
            }
        }
        catch(NoSuchElementException){
            return false
        }
    }

    async CatchToonaangifte(container, tekst,) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            var meld = await driver.findElement(By.xpath(container)).getText();
            // console.log(meld)
                if(meld.match(tekst)){
                console.log("'DivPopup' matched! =>  ")
                await driver.findElement(By.xpath("//button[@class=' kingButton']")).click(); 
                // console.log(tekst)
                }
                else{
                console.log("Error 'DivPopup' matched NIET met verwachte text! => ");
                console.log(meld);
                }
            }
        catch(NoSuchElementException){
            }
    }

    async BasisinstellingBTWaangifte(BTWnummer, jaar,) {
        var tekst1 = "U maakt gebruik van het PKIoverheidscertificaat van KING Software."
        var tekst2 = "Nog niet volledig ingevuld"
        var meld = await divConfirm.multiDialogError(tekst1,tekst2,"//div[@role='dialog']//button[contains(.,'OK')]");
        await driver.switchTo().frame('i_app');
        if (meld == true){
            await this.fiscaleEenheid(BTWnummer,jaar)
            await driver.wait(until.elementLocated(By.xpath("//button[@id='knop_btwaanpassen']")));
            await driver.findElement(By.xpath("//button[@id='knop_btwaanpassen']")).click();
        }
        else{
            await driver.wait(until.elementLocated(By.xpath("//button[@id='knop_btwaanpassen']")));
            await driver.findElement(By.xpath("//button[@id='knop_btwaanpassen']")).click();
        }
    }

    async fiscaleEenheid(BTWnummer, jaar, ) {
        // await driver.findElement(By.xpath("//input[@name='BTWNR']")).clear();
        // await driver.findElement(By.xpath("//input[@name='BTWNR']")).sendKeys(BTWnummer);
        // await driver.sleep(1000);
        await driver.findElement(By.xpath("//input[@name='BTWNROB']")).clear();
        await driver.sleep(1000);
        await driver.findElement(By.xpath("//input[@id='FISCEENH']")).clear();
        await driver.findElement(By.xpath("//input[@id='FISCEENH']")).sendKeys(BTWnummer);
        await driver.sleep(1000);
        await driver.findElement(By.xpath("//select[@name='BTWTERMIJN']")).click();
        await driver.findElement(By.xpath("//option[normalize-space()='Kwartaal']")).click();
        await driver.sleep(1000);

        await driver.findElement(By.xpath("//select[@name='PNBTW_KW']")).click();
        await driver.findElement(By.xpath("//option[normalize-space()='Periode 6']")).click();
        await driver.sleep(1000);
        
        await driver.findElement(By.xpath("//input[@name='JRBTW']")).clear();
        await driver.findElement(By.xpath("//input[@name='JRBTW']")).sendKeys(jaar);
        
        await driver.findElement(By.name("CONTACTVOORLTRS1")).clear();
        await driver.findElement(By.name("CONTACTVOORLTRS1")).sendKeys("Tim");
        
        await driver.findElement(By.name("CONTACTPERS1")).clear();
        await driver.findElement(By.name("CONTACTPERS1")).sendKeys("Tester");
        
        await driver.findElement(By.name("CONTACTTEL1")).clear();
        await driver.findElement(By.name("CONTACTTEL1")).sendKeys(1234567890);
        
        await FunctionsPage.checkboxchecker("//input[@name='VOORWAKKOORD']")
        
        await driver.findElement(By.id("knop_opslaan")).click();
    }

    async fiscaleEenheidBTWCheck(BTWnummer,) {
        await driver.wait(until.elementLocated(By.xpath("//input[@name='BTWNR']")), 2000);
        var inputBTW = await driver.findElement(By.xpath("//input[@name='BTWNR']")).getAttribute('value');
        // console.log (inputBTW);      
        await driver.wait(until.elementLocated(By.xpath("//input[@id='FISCEENH']")), 2000);
        var inputFISC = await driver.findElement(By.xpath("//input[@id='FISCEENH']")).getAttribute('value');
        // console.log (inputFISC);
            if(inputFISC == BTWnummer && inputBTW == BTWnummer){
                // console.log("BTW nummers zijn gelijk");
            }
            else{
                await driver.findElement(By.xpath("//input[@name='BTWNR']")).clear();
                await driver.findElement(By.xpath("//input[@name='BTWNR']")).sendKeys(BTWnummer);
                await driver.findElement(By.xpath("//input[@id='FISCEENH']")).clear();
                await driver.findElement(By.xpath("//input[@id='FISCEENH']")).sendKeys(BTWnummer);

                console.log("FiscaalEenheid BTW nummer wordt aangepast");
            }
    }
        
    async fiscaleEenheidCheck(admin, adminmaster) {
        await driver.findElement(By.xpath("//button[@id='BTN_FISCEENH']")).click();
        await FunctionsPage.verifyContainer("//div[@id='d_fisceenhinstellingen']", "Instellingen BTW fiscale eenheid",)   
        var fiscaaleenheid = await this.CatchDialog("//div[@class='dialogcorner bs']//div[.='Waarschuwing']", "Waarschuwing",)
        if (fiscaaleenheid == true){
            console.log("admin "+admin+" is gekoppeld");
            await driver.findElement(By.xpath("(//button[@id='btn_fisceenh_ok'])[2]")).click();
            await driver.findElement(By.xpath("//button[@id='knop_sluiten']")).click();   
            await driver.wait(until.elementLocated(By.xpath("//td[@class='bold']")), 2000);
            var meld = await driver.findElement(By.xpath("//td[@class='bold']")).getText();
            // console.log(meld);
            if(meld.match("Nieuwe BTW-aangiftes worden verwerkt via fiscale eenheid hoofdadministratie: "+adminmaster+" Administratie "+adminmaster)){
                // console.log("'DivPopup' matched! => ") 
            }
            else { 
                console.log("Error 'DivPopup' matched NIET met verwachte text! => ")
            } 
            await driver.findElement(By.xpath("//button[@id='knop_btwsluiten']")).click();  
        }
        else{
            await FunctionsPage.checkboxUNchecker("//input[@name='CHKBOX_FISCADM']","'Hoofdadministratie Fiscale-eenheid'")
            // console.log("geen melding van actieve koppeling, 'Hoofdadministratie Fiscale-eenheid' indien nodig unchecked")
            await driver.findElement(By.xpath("(//button[@id='btn_fisceenh_ok'])[2]")).click();
            await driver.findElement(By.xpath("//button[@id='knop_sluiten']")).click();        
            await driver.findElement(By.xpath("//button[@id='knop_btwsluiten']")).click(); 
        }       
    }     

    async fiscaleEenheidCheck2(admin, adminmaster) {
        await driver.findElement(By.xpath("//button[@id='BTN_FISCEENH']")).click();
        await FunctionsPage.verifyContainer("//div[@id='d_fisceenhinstellingen']", "Instellingen BTW fiscale eenheid",)   
        var fiscaaleenheid = await this.CatchDialog("//div[@class='dialogcorner bs']//div[.='Waarschuwing']", "Waarschuwing",)
        if (fiscaaleenheid == true){
            console.log("admin "+admin+" is gekoppeld");
            await driver.findElement(By.xpath("(//button[@id='btn_fisceenh_ok'])[2]")).click();
            await driver.findElement(By.xpath("//button[@id='knop_sluiten']")).click();   
            await driver.wait(until.elementLocated(By.xpath("//td[@class='bold']")), 2000);
            var meld = await driver.findElement(By.xpath("//td[@class='bold']")).getText();
            // console.log(meld);
            if(meld.match("Nieuwe BTW-aangiftes worden verwerkt via fiscale eenheid hoofdadministratie: "+adminmaster+" Administratie "+adminmaster)){
                // console.log("'DivPopup' matched! => ") 
            }
            else { 
                console.log("Error 'DivPopup' matched NIET met verwachte text! => ")
            } 
            await driver.findElement(By.xpath("//button[@id='knop_btwsluiten']")).click();  
        }
        else{
            await FunctionsPage.checkboxUNchecker("//input[@name='CHKBOX_FISCADM']","'Hoofdadministratie Fiscale-eenheid'")
            // console.log("geen melding van actieve koppeling, 'Hoofdadministratie Fiscale-eenheid' indien nodig unchecked")
            await driver.findElement(By.xpath("(//button[@id='btn_fisceenh_ok'])[2]")).click();
            await driver.findElement(By.xpath("//button[@id='knop_sluiten']")).click();        
            await driver.findElement(By.xpath("//button[@id='knop_btwsluiten']")).click(); 
        }       
    }     

}
 
module.exports = new BTWaangifte();