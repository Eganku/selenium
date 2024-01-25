const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const fs = require('fs');
var BasePage = require('./base.page.js');

    // NotifyBox "timer 0 keuze"
    // AlertBox "alleen 1 keuze"

    // ConformationBox "heeft 2 of meer keuze"
    
    // Verify schript doet controle
    // Validate script moet stoppen

class AssertPage extends BasePage{
       
    async verifyContainer(container, tekst) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)),5000);
            var meld = await driver.findElement(By.xpath(container)).getText();
            if(meld.match(tekst)){
                // console.log("'Div Container' matched tekst! => "+ tekst)
                // console.log(tekst)
                return true
            }
            else{
                console.log("Warning 'Div Container' matched NIET met title! => ");
                console.log("Found =>" + meld + "<= Expecting =>" + tekst + "<=");
                return false
            }
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'Div Container' geladen") 
            console.log(tekst)
            return false
        }
    }

    async verifyContainer2(container, tekst) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)),5000);
            var meld = await driver.findElement(By.xpath(container)).getAttribute('style');
            if(meld.match(tekst)){
                // console.log("'Div Container' matched tekst! => "+ tekst)
                // console.log(tekst)
                return true
            }
            else{
                console.log("Warning 'Div Container' matched NIET met title! => ");
                console.log(meld);
                return false
            }
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'Div Container' geladen") 
            console.log(tekst)
            return false
        }
    }

    async verifyButton(button, tekst) {
        try{
            await driver.wait(until.elementLocated(By.xpath(button)),2000);
            var meld = await driver.findElement(By.xpath(button)).getAttribute('title');
            if(meld.match(tekst)){
                // console.log("'Div Button' matched! => ")
                // console.log(meld)
                return true
            }
            else{
                console.log("Warning 'Div Button' matched NIET met title! => ");
                console.log(meld);
                return false
            }
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'Div Button' geladen") 
            console.log(tekst)
            return false
        }
    }

    async checkdebcrednummer(nummer,) {
    await driver.wait(until.elementLocated(By.xpath("//input[@name='gen_search']")));
    await driver.findElement(By.xpath("//input[@name='gen_search']")).clear();
    await driver.findElement(By.xpath("//input[@name='gen_search']")).sendKeys(nummer);
    await driver.sleep(3000);
    var debcred = await driver.findElement(By.xpath("(//div[@role='gridcell'])[3]")).getText();
    var title = await driver.findElement(By.className("gen_titlebar_title")).getText();
    // console.log(debcred)
        try{
            // check "Er is geen melding gevonden met zoekterm"
            await driver.wait(until.elementLocated(By.xpath("//td[@class='valigntop']//label[1]")), 2000);
            var meld = await driver.findElement(By.xpath("//td[@class='valigntop']//label[1]")).getAttribute("innerHTML");
            console.log(meld)
            return false
        }
        catch(NoSuchElementException){
            if (nummer == debcred ){
                await driver.findElement(By.xpath("//div[@role='gridcell']//span[contains(text(),'"+nummer+"')]")).click();
                // console.log(title + " " + debcred + " aanwezig");
                return true
            }
            else{
                console.log(title + " met " + nummer + " komt niet overeen met gevonden " + debcred);
                return false
            }
        }
    }    
           
    async checkgrootboeknummer(nummer,) {
    await driver.wait(until.elementLocated(By.xpath("//input[@name='gen_search']")));
    await driver.findElement(By.xpath("//input[@name='gen_search']")).clear();
    await driver.findElement(By.xpath("//input[@name='gen_search']")).sendKeys(nummer);
    await driver.sleep(2000);
    var grootboek = await driver.findElement(By.xpath("(//div[@role='gridcell'])[2]")).getText();
    var title = await driver.findElement(By.xpath("//label[@class='gen_titlebar_title']")).getText();
    // console.log(grootboek)
    // console.log(title)
        try{
            await driver.wait(until.elementLocated(By.xpath("//div[@role='gridcell']//span//label")), 2000);
            var meld = await driver.findElement(By.xpath("//div[@role='gridcell']//span//label")).getAttribute("innerHTML");
            console.log(meld)
            return false
        }
        catch(NoSuchElementException){
            if (nummer == grootboek ){
                await driver.findElement(By.xpath("//div[@role='gridcell']//span[contains(text(),'"+nummer+"')]")).click();
                // console.log(title + " " + grootboek + " aanwezig");
                return true
            }
            else{
                console.log(title + " met gevonden nr " + nummer + " komt niet overeen met gevonden " + grootboek);
                return false
            }
        }  
    }

    async verifyContainerklik(container, text) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)),2000);
            var meld = await driver.findElement(By.xpath(container)).getText();
            if(meld.match(text)){
                // console.log("'Container' matched! => ")
                // console.log(meld)
                await driver.findElement(By.xpath(container)).click();
                return true
            }
            else{
                console.log("Warning 'Container' matched NIET met text! => ");
                console.log(meld + container);
                return false
            }
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'Container' gevonden") 
            console.log(text + container)
            return false
        }
    }

    async verifyInputZoekveld(nummer,) {
        await driver.wait(until.elementLocated(By.xpath("//input[@name='gen_search']")),1000);
        await driver.findElement(By.xpath("//input[@name='gen_search']")).clear();
        await driver.findElement(By.xpath("//input[@name='gen_search']")).sendKeys(nummer);
        await driver.sleep(2000);
        var title = await driver.findElement(By.xpath("//label[@class='gen_titlebar_title']")).getText();
        // console.log(title)
        try{
            "controle 'geen regel gevonden'"
            await driver.wait(until.elementLocated(By.xpath("//div[@role='gridcell']//span//label")), 2000);
            var meld = await driver.findElement(By.xpath("//div[@role='gridcell']//span//label")).getAttribute("innerHTML");
            console.log(meld)
            return false
        }
        catch(NoSuchElementException){
            var output = await driver.findElement(By.xpath("(//div[@role='gridcell']//span[contains(text(),'"+nummer+"')])[1]")).getText();
            // console.log(output)
            if (nummer == output ){
                await driver.findElement(By.xpath("(//div[@role='gridcell']//span[contains(text(),'"+nummer+"')])[1]")).click();
                // console.log(title + " " + output + " aanwezig");
                return true
            }
            else{
                console.log(title + " met gevonden nr " + nummer + " komt niet overeen met gevonden " + output);
                return false
            }
        }  
    }

    async VerifyInputField(container, name, value) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)));
            var meld = await driver.findElement(By.xpath(container)).getAttribute('Name');
            if(meld.match(name)){
                // console.log("'Inputfield' matched! => ")
                await driver.findElement(By.xpath(container)).clear();
                await driver.findElement(By.xpath(container)).sendKeys(value, Key.RETURN);
                await driver.sleep(1000);
            }
            else{
                console.log("Warning 'InputField' matched NIET met 'Attribute Name'! => ");
                console.log(meld + " " + container);
            }
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'InputField' gevonden met "+value) 
            console.log(name + " " + container)
            return
        }
    }

    async radiobuttonON(container, locatie) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 1000);
            var radio = await driver.findElement(By.xpath(container)).getAttribute('checked');
            // console.log(radiobutton);
            if(Boolean(radio)){
                // console.log("radiobutton was al aangevinkt "+ locatie)
                return true
                }
            else{
                await driver.findElement(By.xpath(container)).click();
                var radio2 = await driver.findElement(By.xpath(container)).getAttribute('checked');
                if(Boolean(radio2)){
                    // console.log("radiobutton aangevinkt "+ locatie)
                    return true
                }
                else{
                    console.log("radiobutton reageert waarschijnlijk niet "+ locatie);
                    return false
                }
            }
        }
        catch(NoSuchElementException){
            console.log("container of radiobutton niet aanwezig "+ locatie);
            return false
        }
    }


    async checkboxchecker(container, locatie) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 2000);
            var checkbox = await driver.findElement(By.xpath(container)).getAttribute('checked');
            // console.log(checkbox);
            if(Boolean(checkbox)){
                // console.log("checkbox was al aangevinkt "+ locatie)
                return true
                }
            else{
                await driver.findElement(By.xpath(container)).click();
                var checkbox2 = await driver.findElement(By.xpath(container)).getAttribute('checked');
                if(Boolean(checkbox2)){
                    // console.log("checkbox aangevinkt "+ locatie)
                    await driver.sleep(1000);
                    return true
                }
                else{
                    console.log("checkbox reageert waarschijnlijk niet "+ locatie);
                    return false
                }
            }
        }
        catch(NoSuchElementException){
            console.log("container of checkbox niet aanwezig "+ locatie);
            return false
        }
    }

    async checkboxUNchecker(container, locatie ) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)), 1000);
            var checkbox = await driver.findElement(By.xpath(container)).getAttribute('checked');
            // console.log(checkbox);
            if(Boolean(checkbox)){
                await driver.findElement(By.xpath(container)).click();
                var checkbox2 = await driver.findElement(By.xpath(container)).getAttribute('checked');
                if(Boolean(checkbox2)){
                    console.log("checkbox reageert waarschijnlijk niet "+ locatie);
                    return false
                }
                else{
                    console.log("checkbox uitgevinkt "+ locatie)
                    await driver.sleep(1000);
                    return true
                }                
            }
            else{
                console.log("checkbox was al uitgevinkt "+ locatie);
                return true
            }
        }
        catch(NoSuchElementException){
            console.log("container of checkbox niet aanwezig "+ locatie);
            return false
        }
    }

    async controlecheck(naamcheck, variable1, variable2) {
        if(variable1 === variable2) {
        console.log("Passed check " + naamcheck +" komt overeen " + variable1 + " en " + variable2);
        return true
        }
        else{
        console.log("!Error! check " + naamcheck +" komen NIET overeen ");
        console.log(variable1 + " en " + variable2);
        return false
        }   
    }

    async controlecheckdatum(naamcheck, variable1, variable2) {
        if(variable1.getDate() === variable2.getDate()) {
        console.log("Passed check " + naamcheck +" komt overeen");
        // console.log(variable1 + " en " + variable2);
        return true
        }
        else{
        console.log("!Error! check " + naamcheck +" komen NIET overeen");
        console.log(variable1 + " en " + variable2);
        return false
        }   
    }

    async controlecheckArray(naamcheck, foundvalue, Expectedvalue) {
        const equalsCheck = (foundvalue, Expectedvalue) =>
        foundvalue.length === Expectedvalue.length &&
        foundvalue.every((v, i) => v === Expectedvalue[i]);
    
        if (equalsCheck(foundvalue, Expectedvalue)) {
        // console.log("The arrays have the same elements.");
        console.log("Passed arraycheck " + naamcheck + " " + ((foundvalue.length)-1) +" waardes komen overeen ");
        // console.log(foundvalue + " en " + Expectedvalue);
        return true
        } 
        else{
        console.log("!Error! arraycheck " + naamcheck + " een van de " + ((foundvalue.length)-1) +" waardes komen NIET overeen ");
        console.log(foundvalue + " en " + Expectedvalue);
        return false
        }

    }

    async IncludeCheck(verwacht, output, Naamtest,) {
        // console.log(Naamtest)
        var result = output.filter(function () { return true });
        if(output != 0){
            var includecheck = [];
            var includetrue = [];
            var includefalse = [];
            var resultlengte = result.length;
            for(var i=0; i<resultlengte; i++){
                "welk 'result' is er gevonden en zit in de excludefile"
                includecheck[i] = (verwacht.includes(result[i]))
                if(includecheck[i] === true){
                    includetrue[i] = result[i];
                // console.log(result[i])
                }
                else{
                    includefalse[i] = result[i]
                console.debug("    'ERROR' gevonden item =>"+result[i], "<= is niet gevonden in verwachte file "+Naamtest );
                // console.log("   =>"+result[i])
                }
            }
        }  
        else{
            console.debug("    'Warning' geen gevonden objecten in extract result "+Naamtest)
            return false
        }
        // console.log(includefalse != 0)
        "gewenste status bij 'return' ivm met meerdere arrays kan later anders "
        if(includefalse != 0){
            return false 
        }
        else{
            return true
        }
    }

    async Ignorecheck(verwacht, innerbarVar, ignorefile, Naamtest) {
        // console.log(Naamtest)
        "verwachte items 'NOTfound' worden gecontroleerd of die overeenkomen met IgnoreFile"
        var verwachtlengte = verwacht.length;
        var MenuFound =[];
        var MenuNotFound = [];
        for(var i=0; i<verwachtlengte; i++){
            try {
            await driver.findElement(By.xpath(innerbarVar+verwacht[i]));
            MenuFound[i] = verwacht[i]
            // console.log(verwacht[i]);
            }
            catch(NoSuchElementException){
            MenuNotFound[i] = verwacht[i]
            //console.log(verwacht[i]);
            }
        }
       
        var cleanMenunotfound = MenuNotFound.filter(function () { return true });
        var ignorecheck = [];
        var ignoretrue = [];
        var ignorefalse = [];
        if(cleanMenunotfound != 0){
            var resultlengte = cleanMenunotfound.length;
            for(var i=0; i<resultlengte; i++){
                "welk item was er niet gevonden en zit in de ignorefile"
                ignorecheck[i] = (ignorefile.includes(cleanMenunotfound[i]))
                if(ignorecheck[i] === true){
                ignoretrue[i] = cleanMenunotfound[i];
                // console.log(result[i])
                }
                else{
                ignorefalse[i] = cleanMenunotfound[i]
                // console.debug("    'ERROR' Notfound item in "+Naamtest+"=>" + cleanMenunotfound[i], "<= zit niet in de VERWACHTE ignore file!! controleer" );
                console.log("   =>"+ignorefalse[i])
                }
            }
        }
        else{
            // console.debug("    'Warning' geen gevonden objecten in result "+Naamtest )
        }

        // console.log(ignorefalse != 0)
        if(ignorefalse != 0){
            return false 
        }
        else{
            return true
        }
    }

    async Excludecheck(verwacht, innerbarvar, ignorefile, Naamtest) {
        // console.log(Naamtest)
        "gevonden items' worden gecontroleerd of die in de IgnoreFile zitten"
        var verwachtlengte = verwacht.length;
        "Items worden gecontroleerd volgens de items uit de verwachtfile"
        var MenuFound =[];
        var MenuNotFound = [];
        for(var i=0; i<verwachtlengte; i++){
            try {
            await driver.findElement(By.xpath(innerbarvar+verwacht[i]));
            MenuFound[i] = verwacht[i]
            // console.log(verwacht[i]);
            }
            catch(NoSuchElementException){
            MenuNotFound[i] = verwacht[i]
            // console.log(verwacht[i]);
            }
        }
        var cleanMenufound = MenuFound.filter(function () { return true });
        // console.log(cleanMenufound)
        "controle op 'result' of deze niet per ongeluk in de exclude file zitten" 
        var excludecheck = [];
        var excludetrue = [];
        var excludefalse = [];
        if(cleanMenufound != 0){
            var resultlengte = cleanMenufound.length;
            for(var i=0; i<resultlengte; i++){
                "welk 'result' is er gevonden en zit in de excludefile"
                excludecheck[i] = (ignorefile.includes(cleanMenufound[i]))
                if(excludecheck[i] === false){
                excludetrue[i] = cleanMenufound[i];
                // console.log(exclude[i])
                }
                else{
                excludefalse[i] = cleanMenufound[i]
                // console.debug("    'ERROR' "+Naamtest+ "gevonden item =>" + cleanMenufound[i], "<= Maar zit in Ignore lijst" );
                console.log("   =>"+excludefalse[i])
                }
            }
        }
        else{
            console.debug("    'Warning' geen gevonden objecten in result "+Naamtest)
            return false
        }
        //return excludefalse
        // console.log(excludefalse != 0)
        if(excludefalse != 0){
            return false 
        }
        else{
            return true
        }
    }

}
module.exports = new AssertPage();



