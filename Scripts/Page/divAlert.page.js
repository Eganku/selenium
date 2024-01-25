const {Builder, By, Actions, Key, until,} = require('selenium-webdriver');
var BasePage = require('./base.page.js');

class divAlert extends BasePage{

    // NotifyBox "timer 0 keuze"
    // AlertBox "alleen 1 keuze"
    // ConformationBox "heeft 2 of meer keuze"
    
    // Verify schript doet controle
    // Validate script moet stoppen
        
    async Dialogwarning(tekst, button ) {
        try{
            await driver.wait(until.elementLocated(By.xpath("//div[@role='dialog']")), 2000);
            // var meld = await driver.findElement(By.xpath(container)).getAttribute("innerHTML");
            var meld = await driver.findElement(By.xpath("//div[@role='dialog']")).getText();
                if (meld.match(tekst)){
                    console.log("Warning Melding matched met verwachte text! => ") 
                    // console.log(meld)
                    
                }
                else{
                console.log("Warning melding matched NIET met verwachte text! => ");
                console.log(meld);
                }
            await driver.wait(until.elementLocated(By.xpath(button)));
            await driver.findElement(By.xpath(button)).click();    
        }    
        catch(NoSuchElementException){
            console.log("Error! => geen warning melding gekregen ") 
            console.log(tekst)
        }
    }

    async Dialogwarning2(container, tekst, button ) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            // var meld = await driver.findElement(By.xpath(container)).getAttribute("innerHTML");
            var meld = await driver.findElement(By.xpath(container)).getText();
                if (meld.match(tekst)){
                    // console.log("Warning Melding matched met verwachte text! => ") 
                    // console.log(meld)
                }
                else{ 
                console.log("Warning melding matched NIET met verwachte text! => ");
                console.log(meld);
                }
            await driver.wait(until.elementLocated(By.xpath(button)));
            await driver.findElement(By.xpath(button)).click();    
        }    
        catch(NoSuchElementException){
            console.log("Error! => geen warning melding gekregen ") 
            console.log(tekst)
        }
    }  

    async Dialogerror(container, tekst, button ) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 1000);
            // var meld = await driver.findElement(By.xpath(container)).getAttribute("innerHTML");
            var meld = await driver.findElement(By.xpath(container)).getText();
                if (meld.match(tekst)){
                    // console.log("Warning Melding matched met verwachte text! => ") 
                    // console.log(meld)
                }
                else{
                console.log("Warning melding matched NIET met verwachte text! => ");
                console.log(meld);
                return false
                }
            await driver.wait(until.elementLocated(By.xpath(button)));
            await driver.findElement(By.xpath(button)).click();    
            return true
        }    
        catch(NoSuchElementException){
            // console.log("Error! => geen warning melding gekregen ") 
            // console.log(tekst)
            return false
        }
    }

    async ValidateError(container, tekst) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            // var meld = await driver.findElement(By.xpath(container)).getAttribute("innerHTML");
            var meld = await driver.findElement(By.xpath(container)).getText();
                if (meld.match(tekst)){
                console.log(meld);
                }
                else{
                console.log("Error melding matched NIET met verwachte text! => ");
                console.log(meld);
                }
            await driver.quit();   
        }    
        catch(NoSuchElementException){
            // console.log("geen dialog'dit is een test log'")
            return false
        }
    }

    async Notify(container, tekst,) {
        //melding wegklikken maar met error melding met deel tekst 
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            var meld = await driver.findElement(By.xpath(container)).getAttribute("innerHTML");
                if(meld.match(tekst)){
                console.log("'Notify Msg' matched! => ")
                // console.log(meld)
                return true
                }
                else{
                console.log("Warning 'Notify Msg' matched NIET met verwachte text! => ");
                console.log(meld);
                }
            await driver.findElement(By.xpath(container)).click();
            await driver.sleep(2000);
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'Notify Msg' gekregen ")
            console.log(tekst)
            await driver.sleep(2000);
        }
    }

    async Dialogsucces(tekst) {
        try{
            await driver.wait(until.elementLocated(By.xpath("//div[@role='dialog']")), 2000);
            var meld = await driver.findElement(By.xpath("//div[@role='dialog']")).getText();
            if(meld.match(tekst)){
                // console.log("'Dialog Succes' matched! => ")
                // console.log(meld)
            }
            else{
                console.log("Warning 'Dialog Succes' matched NIET met verwachte text! => ");
                console.log(meld);
            }
            await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='OK']")));
            await driver.findElement(By.xpath("//button[normalize-space()='OK']")).click();
            await driver.sleep(2000);
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'Dialog Succes' gekregen ") 
            console.log(tekst)
        }
    }


}

module.exports = new divAlert();