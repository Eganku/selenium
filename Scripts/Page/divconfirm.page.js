const {Builder, By, Actions, Key, until,} = require('selenium-webdriver');
var BasePage = require('./base.page.js');

class divConfirm extends BasePage{

    // NotifyBox "timer 0 keuze"
    // AlertBox "alleen 1 keuze"
    // ConformationBox "heeft 2 of meer keuze"
    
    // Verify schript doet controle
    // Validate script moet stoppen
    // catch vangt alleen element op voor verdere

    async Dialogquestion(tekst, button) {
        try{
            await driver.wait(until.elementLocated(By.xpath("//div[@role='dialog']")), 2000);
            var meld = await driver.findElement(By.xpath("//div[@role='dialog']")).getText();
            // console.log(meld);
                if(meld.match(tekst)){
                console.log("'Dialog Question' matched! => ")
                // console.log(tekst)
                }
                else{
                console.log("Warning 'Dialog Question' matched NIET met verwachte text! => ");
                console.log(meld);
                }
            await driver.wait(until.elementLocated(By.xpath(button)));
            await driver.findElement(By.xpath(button)).click();
            await driver.sleep(2000);
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'dialog' of 'Button' gevonden!") 
            console.log(tekst)
        }
    }

    async Dialogwarning(tekst, button) {
        //eventueel error melding maar verder met script
        try{
            await driver.wait(until.elementLocated(By.xpath("//div[@role='dialog']")), 2000);
            var meld = await driver.findElement(By.xpath("//div[@role='dialog']")).getText();
                if(meld.match(tekst)){
                console.log("'Dialog Warning' matched! => ")
                // console.log(meld)
                }
                else{
                console.log("Warning 'Dialog Warning' matched NIET met verwachte text! => ");
                console.log(meld);
                }
            await driver.wait(until.elementLocated(By.xpath(button)));
            await driver.findElement(By.xpath(button)).click();
            await driver.sleep(2000);
        }
        catch(NoSuchElementException){
            // console.log("Warning! => geen 'Dialog Warning' gekregen ")
            // console.log(tekst)
        }
    }

    async multiDialogsucces(tekst, tekst2, button,) {
        try{
            await driver.wait(until.elementLocated(By.xpath("//div[@role='dialog']")), 2000);
            var meld = await driver.findElement(By.xpath("//div[@role='dialog']")).getText();
                if(meld.match(tekst)){
                    console.log("'Dialog Succes' matched! => "+tekst)
                }
                else if(meld.match(tekst2)){
                    console.log("'Dialog Succes' matched! => "+tekst2)
                }
                else{
                    console.log("Warning 'Dialog' matched NIET met verwachte text! => ");
                    console.log(meld);
                    return false
                }
            await driver.wait(until.elementLocated(By.xpath(button)));
            await driver.findElement(By.xpath(button)).click();
            await driver.sleep(2000);
            return true
        }
        catch(NoSuchElementException){
            // console.log("Warning! => geen 'Dialog' gekregen ")
            //console.log(tekst)
            return false
        }
    }

    async multiDialogError(tekst, tekst2, button,) {
        try{
            await driver.wait(until.elementLocated(By.xpath("//div[@role='dialog']")), 2000);
            var meld = await driver.findElement(By.xpath("//div[@role='dialog']")).getText();
                if(meld.match(tekst)){
                console.log("'Dialog Succes' matched! => "+tekst)
                }
                else if(meld.match(tekst2)){
                    console.log("'Dialog Succes' matched! => "+tekst2)
                }
                else{
                console.log("Warning 'Dialog' matched NIET met verwachte text! => ");
                console.log(meld);
                return false
                }
            await driver.wait(until.elementLocated(By.xpath(button)));
            await driver.findElement(By.xpath(button)).click();
            return true
        }
        catch(NoSuchElementException){
            //console.log("Warning! => geen 'Dialog' gekregen ")
            //console.log(tekst)
            return false
        }

    }

}

module.exports = new divConfirm();