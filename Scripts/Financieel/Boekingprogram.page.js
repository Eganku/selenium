// var webdriver = require('selenium-webdriver');
const {Builder, By, Actions, Key, until,} = require('selenium-webdriver');
var BasePage = require('../Page/base.page.js');

class BoekingsProgramma extends BasePage{
    
    async convertBedragpos(container) {
        await driver.wait(until.elementLocated(By.xpath("//table[@id='table_frmgrpboekingentotalen']")));
        var Bedragpos = await driver.findElement(By.xpath(container)).getText();
        Bedragpos = Bedragpos.replace('.', '');
        Bedragpos = Bedragpos.replace(',', '.');
        Bedragpos = parseFloat(Bedragpos);
        // console.log(Bedragpos);
        return Bedragpos
    }

    async convertBedragneg(container) {
        await driver.wait(until.elementLocated(By.xpath("//table[@id='table_frmgrpboekingentotalen']")));
        var Bedragneg = await driver.findElement(By.xpath(container)).getText();
        Bedragneg = Bedragneg.replace('-', '');
        Bedragneg = Bedragneg.replace('.', '');
        Bedragneg = Bedragneg.replace(',', '.');
        Bedragneg = parseFloat(Bedragneg);
        // console.log(Bedragneg);
        return Bedragneg;       
    }

    async maakeentransitorischpost(grootboek, tegenrekening) {
        await driver.wait(until.elementLocated(By.xpath("//button[@id='huidigeperiode']")));
        await driver.findElement(By.xpath("//button[@id='huidigeperiode']")).click();

        await driver.findElement(By.xpath("//span[normalize-space()='Inkoop']")).click();
        await driver.findElement(By.xpath("//span[@id='td_knop_add']")).click();

        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='REK']", "REK", grootboek)
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='BEDRBOEK']", "BEDRBOEK", Math.round(Math.random() * 1000 + 100),)    
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='TEGREK']", "TEGREK", tegenrekening,)

        await driver.findElement(By.xpath("//span[@onclick='ctrls(); return false;']")).click();
        await driver.sleep(1000);
    }

    async maakeenInkoopboeking(btw, crediteur, tegenrekening) {
        await driver.wait(until.elementLocated(By.xpath("//button[@id='huidigeperiode']")));
        await driver.findElement(By.xpath("//button[@id='huidigeperiode']")).click();

        await driver.findElement(By.xpath("//span[normalize-space()='Inkoop']")).click();
        await driver.findElement(By.xpath("//span[@id='td_knop_add']")).click();
        await this.trycatchsplitsingstoppen("De factuur kan worden uitgeplitst naar meerdere grootboekrekeningen.");
        
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='REK']", "REK", crediteur)
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='BEDRBOEK']", "BEDRBOEK", -(Math.round(Math.random() * 1000 + 100)),)
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='BTW']", "BTW", btw,)
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='TEGREK']", "TEGREK", tegenrekening,)
        
        await driver.findElement(By.xpath("//span[@id='td_knop_save']")).click();
    }

    async maakeenVerkoopboeking(btw, debiteur, tegenrekening) {
        await driver.wait(until.elementLocated(By.xpath("//button[@id='huidigeperiode']")));
        await driver.findElement(By.xpath("//button[@id='huidigeperiode']")).click();

        await driver.findElement(By.xpath("//span[normalize-space()='Verkoop']")).click();
        await driver.findElement(By.xpath("//span[@id='td_knop_add']")).click();
        await this.trycatchsplitsingstoppen("De factuur kan worden uitgeplitst naar meerdere grootboekrekeningen.");

        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='REK']", "REK", debiteur)
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='BEDRBOEK']", "BEDRBOEK", Math.round(Math.random() * 1000 + 100),)
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='BTW']", "BTW", btw,)
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='TEGREK']", "TEGREK", tegenrekening,)

        await driver.findElement(By.xpath("//span[@id='td_knop_save']")).click();
    }

    async maakeenInkoopboekingDatum(btw, grootboek, tegenrekening, jaar, periode, datum ) {
        await driver.wait(until.elementLocated(By.xpath("//button[@id='huidigeperiode']")));
        await driver.findElement(By.xpath("//button[@id='huidigeperiode']")).click();

        await driver.findElement(By.xpath(`//span[normalize-space()='Inkoop']`)).click();
        await driver.findElement(By.xpath("//span[@id='td_knop_add']")).click();
        await this.trycatchsplitsingstoppen("De factuur kan worden uitgeplitst naar meerdere grootboekrekeningen.");

        await this.VerifyInputField("//input[@id='PN']", "PN", periode,)

        await this.VerifyInputField("//input[@id='JR']", "JR", jaar,)


        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='DAT']", "DAT", datum,)
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='REK']", "REK", grootboek,)
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='BEDRBOEK']", "BEDRBOEK", -(Math.round(Math.random() * 1000 + 100)), )
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='BTW']", "BTW", btw,)
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='TEGREK']", "TEGREK", tegenrekening,)

        await driver.findElement(By.xpath("//span[@id='td_knop_save']")).click();
    }

    async maakeenVerkoopboekingDatum(btw, grootboek, tegenrekening, jaar, periode, datum ) {

        await driver.wait(until.elementLocated(By.xpath("//button[@id='huidigeperiode']")));
        await driver.findElement(By.xpath("//button[@id='huidigeperiode']")).click();

        await driver.findElement(By.xpath(`//span[normalize-space()='Verkoop']`)).click();
        await driver.findElement(By.xpath("//span[@id='td_knop_add']")).click();
        await this.trycatchsplitsingstoppen("De factuur kan worden uitgeplitst naar meerdere grootboekrekeningen.");

        await this.VerifyInputField("//input[@id='PN']", "PN", periode,)
        await this.VerifyInputField("//input[@id='JR']", "JR", jaar,)
      
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='BEDRBOEK']", "BEDRBOEK", Math.round(Math.random() * 1000 + 100),)   

        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='DAT']", "DAT", datum,)
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='REK']", "REK", grootboek,)
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='BTW']", "BTW", btw,)
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='TEGREK']", "TEGREK", tegenrekening,)

        await driver.findElement(By.xpath("//span[@id='td_knop_save']")).click();
    }

    async maakeensplitsing(btw, grootboek, tegenrekening) {
        await driver.wait(until.elementLocated(By.xpath("//button[@id='huidigeperiode']")));
        await driver.findElement(By.xpath("//button[@id='huidigeperiode']")).click();

        await this.VerifyInputField("(//input[@name='TEGREK'])[last()-1]", "TEGREK", tegenrekening,)
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='REK']", "REK", grootboek,)
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='BEDRBOEK']", "BEDRBOEK", Math.round(Math.random() * 1000 + 100),)
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='BTW']", "BTW", btw,)
        await this.VerifyInputField("//tr[@id='tr_regelid_0']//input[@name='TEGREK']", "TEGREK", tegenrekening,)

        await driver.findElement(By.xpath("//span[@id='td_knop_save']")).click();
    }

    async VerifyInputField(container, name, value) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)));
            var meld = await driver.findElement(By.xpath(container)).getAttribute('Name');
            if(meld.match(name)){
                // console.log("'SideMenu' matched! => " + container )
                await driver.findElement(By.xpath(container)).clear();
                await driver.sleep(3000);
                await driver.findElement(By.xpath(container)).sendKeys(value);
                await driver.sleep(3000);
            }
            else{
                console.log("Warning 'InputField' matched NIET met 'Attribute Name'! => ");
                console.log(meld + " " + container);
            }
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'InputField' gevonden") 
            console.log(name + " " + container)
            return
        }
    }

    async verifyButton(button, tekst) {
        try{
            await driver.wait(until.elementLocated(By.xpath(button)));
            var meld = await driver.findElement(By.xpath(button)).getText();
            if(meld.match(tekst)){
                // console.log("'button' matched! => ")
                // console.log(meld)
                await driver.findElement(By.xpath(button)).click();
                return true
            }
            else{
                console.log("Warning 'Button' matched NIET met title! => ");
                console.log(meld);
                return false
            }
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'Button' gevonden") 
            console.log(tekst)
            return false
        }
    }
     
    async trycatchsplitsingstoppen(tekst) {
        // splitsing text komt naar voren bij een niet afgemaakte splitsing 
        // geen ideale situatie voor test case maar dit kan problemen veroorzaken. bij cases die hetzelfde boekingprgramma gebruiken.
        try{
            await driver.wait(until.elementLocated(By.id("d_uitsplitsing")), 2000);
            await driver.findElement(By.id("d_uitsplitsing")).click();
            var meld = await driver.findElement(By.id("d_uitsplitsing")).getText();
            if(meld.match(tekst)){
                console.log("'Melding Splitsing' matched! => ")
                console.log("'Warning' Administratie opschonen of boekingsregels afmaken!!")
                // console.log(meld)
            }
            else{
                console.log("Warning 'Melding splitsing' matched NIET met verwachte text! => ");
                console.log(meld);
            }
            await driver.wait(until.elementLocated(By.id("knop_splitsen_stop")));
            await driver.findElement(By.id("knop_splitsen_stop")).click();
            await driver.sleep(2000);
        }
        catch(NoSuchElementException){
        }
    }

}        
 
module.exports = new BoekingsProgramma();