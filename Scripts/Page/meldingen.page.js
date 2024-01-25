// var webdriver = require('selenium-webdriver');
const {Builder, By, Actions, Key, until,} = require('selenium-webdriver');
var BasePage = require('./base.page.js');

class Meldingen extends BasePage{

    async DialogquestionOK(tekst) {
        //melding wegklikken maar met error melding met deel tekst 
        try{
            await driver.wait(until.elementLocated(By.xpath("//div[@role='dialog']")), 2000);
            var meld = await driver.findElement(By.xpath("//div[@role='dialog']")).getText();
            //console.log(meld);
                if(meld.match(tekst)){
                console.log("'Dialog Question' matched! => ")
                // console.log(meld)
                }
                else{
                console.log("Warning 'Dialog Question' matched NIET met verwachte text! => ");
                console.log(meld);
                }
            await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='OK']")));
            await driver.findElement(By.xpath("//button[normalize-space()='OK']")).click();
            await driver.sleep(2000);
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'Dialog Question' gekregen ") 
            console.log(tekst)
        }
    }

    async trycatchdivpopup(container, tekst ) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            var meld = await driver.findElement(By.xpath(container)).getText();
                if(meld.match(tekst)){
                console.log("'DivPopup' matched! => ")
                // console.log(tekst)
                }
                else{
                console.log("Error 'DivPopup' matched NIET met verwachte text! => ");
                console.log(meld);
                }
            }
        catch(NoSuchElementException){
            console.log("Warning! => 'DivPopup' niet gegenereerd")
            console.log(tekst)
            }
    }

    async trycatchdivMultiNomsg(container, tekst, button ) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            var meld = await driver.findElement(By.xpath(container)).getText();
            // console.log(meld)
                if(meld.match(tekst)){
                console.log("'DivPopup' matched! => ")
                await driver.findElement(By.xpath(button)).click(); 
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

    async trycatchdivpopupNomsg(container, tekst ) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            var meld = await driver.findElement(By.xpath(container)).getText();
                if(meld.match(tekst)){
                console.log("'DivPopup' matched! => ")
                // console.log(tekst)
                return true
                }
                else{
                console.log("Error 'DivPopup' matched NIET met verwachte text! => ");
                console.log(meld);
                }
            }
        catch(NoSuchElementException){
            // console.log("Warning! => 'DivPopup' niet gegenereerd")
            // console.log(tekst)
            }
    }

    async trycatchmeterrormelding(container, tekst ) {
        // melding is te lang dus vergelijk aangegeven tekst
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            var meld = await driver.findElement(By.xpath(container)).getText();
                if(meld.match(tekst)){
                console.log("Melding matched met verwachte text! => " + tekst)
                }
                else{
                console.log("Error melding matched NIET met verwachte text! => " + meld);
                }
            }
        catch(NoSuchElementException){
            console.log("Error! => geen melding gekregen " + tekst) 
            }
    }
    
    async trycatchmeterrormelding2(container, tekst,) {
        // melding exact zoals in container
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            var meld = await driver.findElement(By.xpath(container)).getText();
                if(meld.match(tekst)){
                console.log("Melding matched met verwachte text! => " + meld)
                }
                else{
                console.log("Error melding matched NIET met verwachte text! => " + meld);
                }
            }
        catch(NoSuchElementException){
            console.log("Error! => geen melding gekregen " + tekst) 
        }
    }

    async trycatchmeterrormelding3(container, tekst ) {
        // melding exact zoals in container maar met getAttribute innerHTML
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            var meld = await driver.findElement(By.xpath(container)).getAttribute("innerHTML");
                if(meld.match(tekst)){
                console.log("Melding matched met verwachte text! => " + meld)
                }
                else{
                console.log("Error melding matched NIET met verwachte text! => " + meld);
                }
            }
        catch(NoSuchElementException){
            console.log("Error! => geen melding gekregen " + tekst) 
        }
    }

    async trycatchwegklikken(container, tekst, button ) {
        //melding wegklikken zonder error melding
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            var meld = await driver.findElement(By.xpath(container)).getAttribute("innerHTML");
                if (meld.match(tekst)){
                    console.log("Melding matched met verwachte text! => " + meld) 
                }
                else{
                console.log("Error melding matched NIET met verwachte text! => " + meld);
                }
            await driver.wait(until.elementLocated(By.xpath(button)));
            await driver.findElement(By.xpath(button)).click();   
        }    
        catch(NoSuchElementException){
        }
    }

    async trycatchwegklikken2(container, tekst, button) {
        //melding wegklikken maar met error melding 
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            var meld = await driver.findElement(By.xpath(container)).getAttribute("innerHTML");
                if(meld.match(tekst)){
                console.log("Melding matched met verwachte text! => " + meld) 
                }
                else{
                console.log("Warning melding matched NIET met verwachte text! => " + meld);
                }
            await driver.wait(until.elementLocated(By.xpath(button)));
            await driver.findElement(By.xpath(button)).click();        
        }
        catch(NoSuchElementException){
            console.log("Error! => geen melding gekregen ") 
            console.log(tekst)
        }
    }

    async trycatchenotifymsg(container, tekst,) {
        //melding wegklikken maar met error melding met deel tekst 
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            var meld = await driver.findElement(By.xpath(container)).getAttribute("innerHTML");
                if(meld.match(tekst)){
                console.log("'Notify Msg' matched! => ")
                // console.log(meld)
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

    
    async trycatchquestionMulti(tekst, button) {
        //melding wegklikken maar met error melding met deel tekst 
        try{
            await driver.wait(until.elementLocated(By.xpath("//div[@role='dialog']")), 2000);
            var meld = await driver.findElement(By.xpath("//div[@role='dialog']")).getText();
            //console.log(meld);
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
            console.log("Error! => geen 'Dialog Question' gekregen ") 
            console.log(tekst)
        }
    }

    async trycatchquestionOK(tekst) {
        //melding wegklikken maar met error melding met deel tekst 
        try{
            await driver.wait(until.elementLocated(By.xpath("//div[@role='dialog']")), 2000);
            var meld = await driver.findElement(By.xpath("//div[@role='dialog']")).getText();
            //console.log(meld);
                if(meld.match(tekst)){
                console.log("'Dialog Question' matched! => ")
                // console.log(meld)
                }
                else{
                console.log("Warning 'Dialog Question' matched NIET met verwachte text! => ");
                console.log(meld);
                }
            await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='OK']")));
            await driver.findElement(By.xpath("//button[normalize-space()='OK']")).click();
            await driver.sleep(2000);
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'Dialog Question' gekregen ") 
            console.log(tekst)
        }
    }
    
    async trycatchWarningOK(tekst) {
        //melding wegklikken maar met error melding met deel tekst 
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
            await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='OK']")));
            await driver.findElement(By.xpath("//button[normalize-space()='OK']")).click();
            await driver.sleep(2000);
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'Dialog Warning' gekregen ")
            console.log(tekst)
            await driver.sleep(2000);
        }
    }

    async trycatchWarningMulti(tekst, button) {
        //melding wegklikken maar met error melding met deel tekst 
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
            console.log("Error! => geen 'Dialog Warning' gekregen ")
            console.log(tekst)
            await driver.sleep(2000);
        }
    }

    async trycatchWarningMultiNomsg(tekst, button) {
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
            await driver.sleep(2000);
        }
    }

    async trycatchsuccesOK(tekst) {
        try{
            await driver.wait(until.elementLocated(By.xpath("//div[@role='dialog']")), 2000);
            var meld = await driver.findElement(By.xpath("//div[@role='dialog']")).getText();
            if(meld.match(tekst)){
                console.log("'Dialog Succes' matched! => ")
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

    async trycatchDialogCornerMulti(tekst, button) {
        try{
            await driver.wait(until.elementLocated(By.xpath("//div[@class='dialogcorner bs']")), 2000);
            var meld = await driver.findElement(By.xpath("//div[@class='dialogcorner bs']")).getText();
            if(meld.match(tekst)){
                console.log("'Dialogcorner' matched! => ")
                // console.log(meld)
            }
            else{
                console.log("Warning 'Dialogcorner' matched NIET met verwachte text! => ");
                console.log(meld);
            }
            await driver.wait(until.elementLocated(By.xpath(button)));
            await driver.findElement(By.xpath(button)).click();
            await driver.sleep(2000);
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'Dialogcorner' gekregen ") 
            console.log(tekst)
        }
    }

    async trycatchDialogContainer(container, tekst,) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            var meld = await driver.findElement(By.xpath(container)).getText();
            if(meld.match(tekst)){
                console.log("'Dialog' matched! => ")
                // console.log(meld)
                return true
            }
            else{
                console.log("Warning 'Dialog' matched NIET met verwachte text! => ");
                console.log(meld);
                return false
            }
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'Dialog' gekregen ") 
            console.log(tekst)
            return false
        }
    }

    async trycatchDialogContainerNomsg(container, tekst,) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            var meld = await driver.findElement(By.xpath(container)).getText();
            if(meld.match(tekst)){
                // console.log("'Dialog' matched! => ")
                // console.log(meld)
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

    async trycatchfoutmeldingstop(tekst,) {
        //foutmelding script wordt gestopt
        try{
            await driver.wait(until.elementLocated(By.xpath("//div[@class='dialogcorner']")), 2000);
            var header = await driver.findElement(By.xpath("//div[@class='dialog_errorheader']")).getText();
            var tekst = await driver.findElement(By.xpath("//div[@class='dialog_error']")).getText();
            console.log(header)
            console.log(tekst)
            driver.quit()
        }
        catch(NoSuchElementException){
            // console.log("Warning! => geen 'Foutmelding' gekregen ") 
            // console.log(tekst)
        }
    }

    async trycatchErrorOKNoErrorMsg(tekst, tekst2) {
        try{
            await driver.wait(until.elementLocated(By.xpath("//div[@role='dialog']")), 2000);
            var meld = await driver.findElement(By.xpath("//div[@role='dialog']")).getText();
            if(meld.match(tekst)){
                console.log("'Dialog Error' matched! => ")
                // console.log(meld)
            }
            else if(meld.match(tekst2)){
                console.log("'Dialog Error' matched! => ")
            }
            else{                              
                console.log("Warning 'Dialog Error' matched NIET met verwachte text! => ");
                console.log(meld);
                return false
            }
            await driver.wait(until.elementLocated(By.xpath("//div[@role='dialog']//button[contains(.,'OK')]")));
            await driver.sleep(2000);
            await driver.findElement(By.xpath("//div[@role='dialog']//button[contains(.,'OK')]")).click();
            await driver.sleep(2000);
            return true
        }
        catch(NoSuchElementException){
            // console.log("Error! => geen 'Dialog Error' gekregen ")
            // console.log(tekst)
            return false
        }
    }

    async trycatchpromotekst(tekst) {
        //melding wegklikken maar met error melding met deel tekst 
        try{
            await driver.wait(until.elementLocated(By.xpath("d_popup_servicebericht")), 2000);
            var meld = await driver.findElement(By.xpath("d_popup_servicebericht")).getText();
            if(meld.match(tekst)){
                console.log("'Popup' matched! => ")
                // console.log(meld)
            }
            else{
                console.log("Warning 'Popup' matched NIET met verwachte text! => ");
                console.log(meld);
            }
            await driver.wait(until.elementLocated(By.id("knop_sluiten_d_popup_servicebericht")));
            await driver.findElement(By.id("knop_sluiten_d_popup_servicebericht")).click();
            await driver.sleep(2000);
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'Popup' gekregen ") 
            console.log(tekst)
        }
    }

}

module.exports = new Meldingen();