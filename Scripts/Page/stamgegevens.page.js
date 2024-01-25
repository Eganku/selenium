const {Builder, By, Actions, Key, until,} = require('selenium-webdriver');
var BasePage = require('./base.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const divAlert = require('../Page/divalert.page.js');

class StamGegevensPage extends BasePage{
    
    async instellingfiatteurbasis(kostenplaats,) {
        await this.verifyLink("(//div[@id='d_edit_tabel_maindiv_idBASFIN_EDIT']//a[@class='nav-link'][normalize-space()='KOSTENPLAATS/KOSTENDRAGER'])[1]",'KOSTENPLAATS/KOSTENDRAGER')
        await this.VerifyInputField("(//input[@id='VOORKKPL'])[1]",'VOORKKPL',kostenplaats);
        await this.VerifyInputField("(//input[@id='VOORKKDR'])[1]",'VOORKKDR',kostenplaats);
        await this.verifyLink("(//div[@id='d_edit_tabel_maindiv_idBASFIN_EDIT']//a[@class='nav-link'][normalize-space()='FIATTEREN INKOOPBOEKINGEN'])[1]",'FIATTEREN INKOOPBOEKINGEN')
        await FunctionsPage.checkboxchecker("//div[@id='d_edit_tabel_maindiv_idBASFIN_EDIT']//input[@name='GEBRFIATINKOOP']", "form Basfin fiatteren inkoopboeking")
        await this.verifyLink("(//div[@id='d_edit_tabel_maindiv_idBASFIN_EDIT']//a[@class='nav-link'][normalize-space()='BANKIEREN'])[1]",'BANKIEREN' )
        await FunctionsPage.checkboxchecker("//div[@id='d_edit_tabel_maindiv_idBASFIN_EDIT']//input[@name='FIAT']", "form Basfin fiatteren betalingen")
        
        await driver.findElement(By.xpath("//div[@id='sticky-bottom-edittabel_formBASFIN_EDIT']//button[@id='knop_bewaren']")).click();
        await driver.sleep(1000);
        return true;    
    }

    async DEinstellingfiatteurbasis() {
        await this.verifyLink("(//div[@id='d_edit_tabel_maindiv_idBASFIN_EDIT']//a[@class='nav-link'][normalize-space()='FIATTEREN INKOOPBOEKINGEN'])[1]",'FIATTEREN INKOOPBOEKINGEN')
        await FunctionsPage.checkboxUNchecker("//div[@id='d_edit_tabel_maindiv_idBASFIN_EDIT']//input[@name='GEBRFIATINKOOP']", "form Basfin fiatteren inkoopboeking")
        // werkt nog niet ivm showconfirm 
        // await this.verifyLink("(//div[@id='d_edit_tabel_maindiv_idBASFIN_EDIT']//a[@class='nav-link'][normalize-space()='BANKIEREN'])[1]",'BANKIEREN' )
        // await FunctionsPage.checkboxUNchecker("//div[@id='d_edit_tabel_maindiv_idBASFIN_EDIT']//input[@name='FIAT']", "form Basfin fiatteren betalingen")

        await driver.findElement(By.xpath("//div[@id='sticky-bottom-edittabel_formBASFIN_EDIT']//button[@id='knop_bewaren']")).click();
        await driver.sleep(1000);
        return true;    
    }

    async instellingfiatteurbasisInkoop(kostenplaats, ) {
        await this.verifyLink("(//div[@id='d_edit_tabel_maindiv_idBASFIN_EDIT']//a[@class='nav-link'][normalize-space()='KOSTENPLAATS/KOSTENDRAGER'])[1]",'KOSTENPLAATS/KOSTENDRAGER')
        await this.VerifyInputField("(//input[@id='VOORKKPL'])[1]",'VOORKKPL',kostenplaats);
        await this.VerifyInputField("(//input[@id='VOORKKDR'])[1]",'VOORKKDR',kostenplaats);
        await this.verifyLink("(//div[@id='d_edit_tabel_maindiv_idBASFIN_EDIT']//a[@class='nav-link'][normalize-space()='FIATTEREN INKOOPBOEKINGEN'])[1]",'FIATTEREN INKOOPBOEKINGEN')
        await FunctionsPage.checkboxchecker("//div[@id='d_edit_tabel_maindiv_idBASFIN_EDIT']//input[@name='GEBRFIATINKOOP']", "form Basfin fiatteren inkoopboeking")   

        await driver.findElement(By.xpath("//div[@id='sticky-bottom-edittabel_formBASFIN_EDIT']//button[@id='knop_bewaren']")).click();
        await driver.sleep(1000);
        return true;    
    }

    async instellingfiatteurbasisBank() {
        await this.verifyLink("(//div[@id='d_edit_tabel_maindiv_idBASFIN_EDIT']//a[@class='nav-link'][normalize-space()='BANKIEREN'])[1]",'BANKIEREN' )
        await FunctionsPage.checkboxchecker("//div[@id='d_edit_tabel_maindiv_idBASFIN_EDIT']//input[@name='FIAT']", "form Basfin fiatteren betalingen")

        await driver.findElement(By.xpath("//div[@id='sticky-bottom-edittabel_formBASFIN_EDIT']//button[@id='knop_bewaren']")).click();
        await driver.sleep(1000);
        return true;    
    }


    async instellingfiatteurmedewerker(bedrag,) {     
        await driver.findElement(By.xpath("//button[@class='btn gen_bottom_btn gen_bottom_dropdown dropdown-toggle']")).click();
        await driver.findElement(By.xpath("//div[@class='gen_popupmenu']//li[@name='ZDKnop_Aanpassen']")).click();
        await driver.sleep(1000);
        await FunctionsPage.verifyContainer("//span[@id='TitelbalkTiteledittabel_formMEDEWERKER_EDIT']","Medewerker")
        await this.verifyLink("(//div[@id='d_edit_tabel_maindiv_idMEDEWERKER_EDIT']//a[@class='nav-link'][normalize-space()='FIATTEREN INKOOPBOEKINGEN'])[1]",'FIATTEREN INKOOPBOEKINGEN');
        await FunctionsPage.checkboxchecker("//div[@id='d_edit_tabel_maindiv_idMEDEWERKER_EDIT']//input[@name='GEBRFIATINKOOP']", "form Medewerker fiatteren")
        await this.VerifyInputField("(//input[@id='s_BEDRMAXFIAT'])[1]",'BEDRMAXFIAT',bedrag);

        await driver.findElement(By.xpath("//div[@id='sticky-bottom-edittabel_formMEDEWERKER_EDIT']//button[@id='knop_bewaren']")).click();
        return true;    
    }
    
    async instellingfiatteurkostenplaats(user,) {
        await driver.findElement(By.xpath("//button[@class='btn gen_bottom_btn gen_bottom_dropdown dropdown-toggle']")).click();
        await driver.findElement(By.xpath("//div[@class='gen_popupmenu']//li[@name='ZDKnop_Aanpassen']")).click();

        await driver.sleep(1000);

        await this.verifyLink("(//div[@id='d_edit_tabel_maindiv_idKPL_EDIT']//a[@class='nav-link'][normalize-space()='FIATTEREN INKOOPBOEKINGEN'])[1]",'FIATTEREN INKOOPBOEKINGEN' )
        await this.VerifyInputField("//input[@id='MEDEWFIATINKOOP']",'MEDEWFIATINKOOP',user);

        await driver.findElement(By.xpath("//div[@id='sticky-bottom-edittabel_formKPL_EDIT']//button[@id='knop_bewaren']")).click();
        return true;    
    }

    async instellingfiatteurcrediteur(kostenplaats,) {
        await driver.findElement(By.xpath("//button[@class='btn gen_bottom_btn gen_bottom_dropdown dropdown-toggle']")).click();
        await driver.findElement(By.xpath("//div[@class='gen_popupmenu']//li[@name='ZDKnop_Aanpassen']")).click();
        
        //controle van homepage zorgt voor timeout 07-03 
        var bar2 = await driver.findElement(By.xpath("//div[@id='d_edit_tabel_maindiv_idCRE_EDIT']//input[@name='HOMEPAGE']"));
        await driver.actions().scroll(0, 0, 0, 400, bar2).perform();
        await driver.findElement(By.xpath("//div[@id='d_edit_tabel_maindiv_idCRE_EDIT']//input[@name='HOMEPAGE']")).clear();

        var bar = await driver.findElement(By.xpath("//div[@id='d_edit_tabel_maindiv_idCRE_EDIT']//input[@id='KPL']"));
        await driver.actions().scroll(0, 0, 0, 400, bar).perform();
        await this.VerifyInputField("//div[@id='d_edit_tabel_maindiv_idCRE_EDIT']//input[@id='KPL']",'KPL',kostenplaats);

        await driver.findElement(By.xpath("//div[@id='d_edit_tabel_maindiv_idCRE_EDIT']//button[@id='knop_bewaren']")).click();
        return true;    
    }

    async instellingRekCA(admin, tegenrek,) {
        await driver.findElement(By.xpath("//button[@id='ZDKnop_Aanpassen']")).click();
        
        await driver.sleep(1000);
        await this.verifyLink("(//div[@id='d_edit_tabel_maindiv_idGRB_EDIT']//a[@class='nav-link'][normalize-space()='REKENING-COURANT OVER MEERDERE ADMINISTRATIES'])[1]",'REKENING-COURANT OVER MEERDERE ADMINISTRATIES' )
        await FunctionsPage.checkboxchecker("//div[@id='d_edittabel_formGRB_EDIT_ISRC']//input[@name='ISRC']", "Rekening-courant:")
        await this.VerifyInputField("//input[@id='RCADM']",'RCADM',admin);
        await this.VerifyInputField("//input[@id='s_RCTEGREK']",'RCTEGREK',tegenrek);
        await driver.findElement(By.xpath("//div[@id='d_edit_tabel_maindiv_idGRB_EDIT']//button[@id='knop_bewaren']")).click();
        return true;    
    }

    async instellingRekCB() {
        await driver.findElement(By.xpath("//button[@id='ZDKnop_Aanpassen']")).click();
        await driver.sleep(1000);
        await this.verifyLink("(//div[@id='d_edit_tabel_maindiv_idGRB_EDIT']//a[@class='nav-link'][normalize-space()='REKENING-COURANT OVER MEERDERE ADMINISTRATIES'])[1]",'REKENING-COURANT OVER MEERDERE ADMINISTRATIES' )
        await FunctionsPage.checkboxchecker("//div[@id='d_edittabel_formGRB_EDIT_ISRC']//input[@name='ISRC']", "Rekening-courant:")
        await this.ClearInputField("//input[@id='RCADM']",'RCADM');
        await this.ClearInputField("//input[@id='s_RCTEGREK']",'RCTEGREK');
        await driver.findElement(By.xpath("//div[@id='d_edit_tabel_maindiv_idGRB_EDIT']//button[@id='knop_bewaren']")).click();
        return true;    
    }

    async maakeenRCaan(nummer, naam,) {
        await driver.findElement(By.className("gen_newline_icon")).click();
        await driver.sleep(1000);
        await this.VerifyInputField("//input[@id='s_NR']",'NR', nummer,);
        await this.VerifyInputField("//input[@name='ZKSL']",'ZKSL', naam,);
        await this.VerifyInputField("//input[@name='OMSCHR']",'OMSCHR', naam,);

        await this.VerifyDropdown("//select[@name='APBL']", 'APBL', "//option[normalize-space()='Passiva']" );
 
        await this.VerifyInputField("//input[@id='BEOORCD']",'BEOORCD',"nog");
        await this.VerifyInputField("//input[@id='VERSL']",'VERSL',"2480");
        await this.VerifyInputField("//input[@id='VERSL2']",'VERSL2',"1430");

        await this.verifyLink("(//div[@id='d_edit_tabel_maindiv_idGRB_EDIT']//a[@class='nav-link'][normalize-space()='REKENING-COURANT OVER MEERDERE ADMINISTRATIES'])[1]",'REKENING-COURANT OVER MEERDERE ADMINISTRATIES' )
        await FunctionsPage.checkboxchecker("//div[@id='d_edittabel_formGRB_EDIT_ISRC']//input[@name='ISRC']", "Rekening-courant:")
        await driver.findElement(By.xpath("//div[@id='d_edit_tabel_maindiv_idGRB_EDIT']//button[@id='knop_bewaren']")).click();
        return true;    
    }

    async maakeendebiteuraan(nummer, ) {
        await driver.wait(until.elementLocated(By.className("gen_newline_icon")));
        await driver.findElement(By.className("gen_newline_icon")).click();
        
        await driver.wait(until.elementLocated(By.className("tableTitle")));
        await this.VerifyInputField("//input[@id='s_NR']",'NR', nummer,);
        await divAlert.ValidateError("//div[@role='dialog']", "Er bestaat al een debiteur met nummer", )

        await driver.findElement(By.name("ZKSL")).sendKeys(Math.round(Math.random() * 1000000 + 1000));
        await driver.findElement(By.name("NAAM")).sendKeys("TestDeb"+(Math.round(Math.random() * 10000 + 100)));
        await driver.findElement(By.xpath("//div[@id='sticky-bottom-edittabel_formDEB_EDIT']//button[@id='knop_bewaren']")).click();
        await divAlert.ValidateError("//div[@class='dialog_error']", "Er bestaat al een debiteur", )
        return true;    
    }

    async maakeenkostenplaatsaan(nummer, omschrijving ,fiatteur, ) {
        await driver.findElement(By.className("gen_newline_icon")).click();

        await this.VerifyInputField("//div[@id='d_edittabel_formKPL_EDIT_NR']//input[@id='s_NR']","NR",nummer,);
        await this.VerifyInputField("//div[@id='d_edittabel_formKPL_EDIT_ZKSL']//input[@name='ZKSL']","ZKSL",omschrijving,);
        await this.VerifyInputField("//div[@id='d_edittabel_formKPL_EDIT_OMSCHR']//input[@name='OMSCHR']","OMSCHR",omschrijving, );
        await this.VerifyInputField("//div[@id='d_edittabel_formKPL_EDIT_MEDEWFIATINKOOP']//input[@id='MEDEWFIATINKOOP']","MEDEWFIATINKOOP",fiatteur,);

        await driver.findElement(By.xpath("//div[@id='sticky-bottom-edittabel_formKPL_EDIT']//button[@id='knop_bewaren']")).click();
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

    async verifyLink(link, tekst) {
        try{
            await driver.wait(until.elementLocated(By.xpath(link)));
            var meld = await driver.findElement(By.xpath(link)).getText();
            if(meld.match(tekst)){
                // console.log("'link' matched! => ")
                // console.log(meld)
                await driver.findElement(By.xpath(link)).click();
                return true
            }
            else{
                console.log("Warning 'link' matched NIET met title! => ");
                console.log(meld);
                return false
            }
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'Link' gevonden") 
            console.log(tekst)
            await driver.quit();
            return false
        }
    }

    async VerifyDropdown(container, name, option) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)));
            var meld = await driver.findElement(By.xpath(container)).getAttribute('Name');
            if(meld.match(name)){
                // console.log("'Inputfield' matched! => ")
                await driver.findElement(By.xpath(container)).click();
                // await driver.findElement(By.xpath(container)).clear();
                await driver.findElement(By.xpath(option)).click();
                await driver.sleep(1000);
            }
            else{
                console.log("Warning 'InputField' matched NIET met 'Attribute Name'! => ");
                console.log(meld + " " + container);
            }
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'InputField' gevonden") 
            console.log(name + " " + container)
            await driver.quit();
            return false
        }
    }

    async ClearInputField(container, name ) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)));
            var meld = await driver.findElement(By.xpath(container)).getAttribute('value');
            if(Boolean(meld)){
                console.log("'Inputfield' cleared! => ")
                await driver.findElement(By.xpath(container)).clear();
                return true
            }
            else{
                //console.log("'Inputfield' was al cleared! => ")
                return true
            }
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'InputField' gevonden") 
            console.log(name + " " + container)
            await driver.quit();
            return false
        }
    }

}        
 
module.exports = new StamGegevensPage();



