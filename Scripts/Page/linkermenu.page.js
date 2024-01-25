const {Builder, By, Actions, Key, until,} = require('selenium-webdriver');
const BasePage = require('./base.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const divconfirm = require('./divConfirm.page.js');

class LinkerMenu extends BasePage{

    async FavorietenSideMenu() {
        await this.VerifySideMenu("//div[@title='Favorieten']", "Favorieten")
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath("//div[@id='bar_content']//span[text()=' Favorieten']")));
        await driver.findElement(By.xpath("//span[@title='Aanpassen']")).click();
        try {
            await driver.findElement(By.xpath("//span[normalize-space()='Favorieten']//span[@title='Alles inklappen']")).click();
        }
        catch(NoSuchElementException){
        }
    }

    async FinancieelSideMenu() {
        let sidemenu = "//div[@class='bar_content']//span[@class='icon_text text_material'][contains(text(),'Financieel')]"
        let innersidebar = "//div[@class='title_inner text_material'][.='Financieel']"
        let buffersidebar = innersidebar + "//following-sibling::div[1]"
        
        await this.VerifySideMenu(sidemenu, "Financieel")
        // await driver.sleep(2000);
        // await driver.wait(until.elementLocated(By.xpath("//div[@id='bar_content']//span[text()=' Financieel']")));
        // await driver.wait(until.elementIsEnabled(await driver.findElement(By.xpath("//div[@title='Financieel']"))));  
        await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='dashbusyoverlay']"))));     
        await driver.findElement(By.xpath("//span[normalize-space()='Financieel']//span[@title='Alles inklappen']")).click();
        await driver.sleep(2000);
    }

    async BeheerSideMenu() {

        await this.VerifySideMenu("(//div[@title='Beheer'])[last()]", "Beheer")
        await driver.sleep(2000);
        await driver.wait(until.elementLocated(By.xpath("//div[@id='bar_content']//span[text()=' Beheer']")));
        // await driver.wait(until.elementIsEnabled(driver.findElement(By.id("bar_tree_collapse_sidebar_menuitem_1"))));
        // await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='dashbusyoverlay']"))));    
        // await driver.findElement(By.xpath("//span[normalize-space()='Beheer']//span[@title='Alles inklappen']")).click();
        // await driver.sleep(1000);
    }

    async VerkoopSideMenu() {
        await this.VerifySideMenu("//div[@title='Verkoop']", "Verkoop")
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath("//div[@id='bar_content']//span[text()=' Verkoop']")));
        // await driver.wait(until.elementIsEnabled(driver.findElement(By.id("bar_tree_collapse_sidebar_menuitem_1"))));
        await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='dashbusyoverlay']"))));    
        await driver.findElement(By.xpath("//span[normalize-space()='Verkoop']//span[@title='Alles inklappen']")).click();
        // await driver.sleep(1000);
    }

    async SpitsfactuurSideMenu() {
        await this.VerifySideMenu("//div[@title='Spitsfactuur']", "Spitsfactuur")
    }

    async gotoVerkoopOffertes() {
        await this.VerifySideMenu("//div[@title='Favorieten']", "Favorieten")
        var meld = await this.VerifyHistorie("//div[@id='bar_inner_sidebar_menuitem_mainfav']//div[contains(text(),'Offertes invoeren')]");
        if(meld == true){
            await this.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_mainfav']//div[contains(text(),'Offertes invoeren')]");  
        }
        else{
            await this.VerkoopSideMenu();         
            await this.VerifySideMenu("(//div[@class='side_item'][normalize-space()='Offertes invoeren'])", "Offertes invoeren");  
        }
    }

    async gotoAdministratiebeheer() {
        await this.BeheerSideMenu();
        await this.VerifySideMenu("(//div[@class='side_item'][normalize-space()='Administratiebeheer'])[2]", "Administratiebeheer");
    }
   
    async gotoAbonnement() {
        await driver.wait(until.elementLocated(By.xpath("//div[@class='bar_content']")));
        let bardots = await driver.findElements(By.xpath("//div[@id='bar_dots'][contains(@style,'display: inline-grid;')]"));
        // console.log(bardots != 0)
        if (bardots != 0){
            await driver.wait(until.elementLocated(By.xpath("//div[@id='bar_dots']")));
            await driver.findElement(By.xpath("//div[@id='bar_dots']")).click();
            // await driver.sleep(1000);
        }
        await this.BeheerSideMenu();
        await this.VerifySideMenu("//div[@class='sidebar_inner_material bar_transition_left']//div[contains(@k_id,'webmijngegevens_abo')]", "Abonnement");
    }

    async gotoInkoopMedewerker() {
        await this.FinancieelSideMenu();         
        await this.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Crediteuren')])[1]", "Crediteuren");
        await this.VerifySideMenu("//li[contains(.,'Crediteuren')]//div[contains(text(),'Tabellen / Stamgegevens')]", "Tabellen / Stamgegevens");
        await this.VerifySideMenu("(//li[contains(.,'Crediteuren')]//div[contains(text(),'Medewerker')])[1]", "Medewerker");
        await this.VerifySideMenu("(//li[contains(.,'Crediteuren')]//div[contains(text(),'Medewerker')])[2]", "Medewerker");
        await FunctionsPage.verifyContainer("//label[@title='Medewerker']","Medewerker");
    }

    async gototabelbankrekening() {
        await this.FinancieelSideMenu();
        await this.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Bankieren')]", "Bankieren");
        await this.VerifySideMenu("//li[contains(.,'Bankieren')]//div[contains(text(),'Tabellen / Stamgegevens')]","Tabellen / Stamgegevens");
        await this.VerifySideMenu("//li[contains(.,'Bankieren')]//div[contains(text(),'Bankrekening')]", "Bankrekening");
    }

    async gotobankafschriftinlezen() {
        await this.FinancieelSideMenu();
        await this.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Bankieren')]", "Bankieren");
        await this.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Afschriften inlezen')])", "Afschriften inlezen");
    }

    async gotobetalingenuitschrijven() {
        await this.FinancieelSideMenu();
        await this.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Bankieren')]", "Bankieren");
        await this.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Betalingen uitschrijven')])", "Betalingen uitschrijven");
    }

    async gotofiattereninkoopboekingen() {
        await this.FinancieelSideMenu();
        await this.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Bankieren')]", "Bankieren");
        await this.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Fiatteren inkoopboekingen')])", "Fiatteren inkoopboekingen");
    }

    async gotofiatterenbetalingen() {
        await this.FinancieelSideMenu();
        await this.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Bankieren')]", "Bankieren");
        await this.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Betalingen uitschrijven')])", "Betalingen uitschrijven");
    }

    async gotogrootboekstamgegevens() {
        await this.FinancieelSideMenu();
        await this.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Grootboek')])[1]", "Grootboek");
        await this.VerifySideMenu("//li[contains(.,'Grootboek')]//div[contains(text(),'Tabellen / Stamgegevens')]", "Tabellen / Stamgegevens");
        await this.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Grootboek')])[2]", "Grootboek");
        await FunctionsPage.verifyContainer("//label[@title='Grootboek']","Grootboek");
    }

    async gotoHistMUT1() {
        await this.FinancieelSideMenu();
        await this.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Grootboek')])[1]", "Grootboek");
        await this.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Rapporten')])[1]", "Rapporten");
        await this.VerifySideMenu("(//li[contains(.,'Rapporten')]//div[contains(.,'Historische mutaties')])[1]");
        // await FunctionsPage.verifyContainer("//label[@title='Kostenplaats']","Kostenplaats");
    }

    async gotogrootboekkostenplaats() {
        await this.FinancieelSideMenu();
        await this.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Grootboek')])[1]", "Grootboek");
        await this.VerifySideMenu("//li[contains(.,'Grootboek')]//div[contains(text(),'Tabellen / Stamgegevens')]", "Tabellen / Stamgegevens");
        await this.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Kostenplaats')]", "Kostenplaats");
    }

    async gotoboekingsprogramma() {
        await this.FinancieelSideMenu();
        await this.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//li[.='Boekingsprogramma']","Boekingsprogramma");
    }

    async gotobasisfinancieel() {
        await this.FinancieelSideMenu();
        await this.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Grootboek')])[1]", "Grootboek");
        await this.VerifySideMenu("//li[contains(.,'Grootboek')]//div[contains(text(),'Tabellen / Stamgegevens')]", "Tabellen / Stamgegevens");  
        while (true){
            try {
                // await driver.wait(until.elementLocated(By.xpath("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Basis financieel')])")),1000);
                // await driver.findElement(By.xpath("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Basis financieel')])")).click();
                // await this.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Basis financieel')])", "Basis financieel")
                "demoset heeft 'span' ipv 'div' in review, moet even uitzoeken 'li' met .= schijnt te helpen "                
                await driver.wait(until.elementLocated(By.xpath("//div[@id='bar_inner_sidebar_menuitem_1']//li[.='Basis financieel']")),1000);
                await driver.findElement(By.xpath("//div[@id='bar_inner_sidebar_menuitem_1']//li[.='Basis financieel']")).click();
                break
            }
            catch(NoSuchElementException){
                await driver.findElement(By.id("jqxScrollAreaDownpanelbar_buffersidebar_menuitem_1verticalScrollBar")).click();
            }
        }
        await FunctionsPage.verifyContainer("//span[@id='TitelbalkTiteledittabel_formBASFIN_EDIT']","Basis financieel");
    }

    async gotodebiteurstamgegevens() {
        await this.FinancieelSideMenu();
        await this.VerifySideMenu("//div[@id='bar_buffersidebar_menuitem_1']//div[contains(text(),'Debiteuren')]", "Debiteuren");
        await this.VerifySideMenu("//li[contains(.,'Debiteuren')]//div[contains(text(),'Tabellen / Stamgegevens')]", "Tabellen / Stamgegevens");
        // await this.VerifySideMenu("//li[contains(.,'Debiteuren')]//div[text()='Debiteur']", "Debiteur");
        await this.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//li[.='Debiteur']");
    }

    async gotodebiteuropenstaand() {
        await this.FinancieelSideMenu();
        await this.VerifySideMenu("//div[@id='bar_buffersidebar_menuitem_1']//div[contains(text(),'Debiteuren')]", "Debiteuren");
        await this.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//li[.='Openstaande facturen debiteur']", "Openstaande facturen debiteur");
    }

    async gotocrediteurstamgegevens() {
        await this.FinancieelSideMenu();       
        await this.VerifySideMenu("//div[@id='bar_buffersidebar_menuitem_1']//div[contains(text(),'Crediteuren')]", "Crediteuren");
        await this.VerifySideMenu("//li[contains(.,'Crediteuren')]//div[contains(text(),'Tabellen / Stamgegevens')]", "Tabellen / Stamgegevens");
        await this.VerifySideMenu("//li[contains(.,'Crediteuren')]//div[text()='Crediteur']", "Crediteur");
    }    

    async gotoBTWaangifte() {
        await this.FinancieelSideMenu();
        await this.VerifySideMenu("(//div[@id='bar_buffersidebar_menuitem_1']//div[@k_id='mod_btwaangifte'])", "BTW-aangifte");
        await this.VerifySideMenu("(//div[@id='bar_buffersidebar_menuitem_1']//div[@k_id='webbtwakkoord'])", "BTW-aangifte");
    }

    async VerifySideMenu(container, text) {
        try{
            // await driver.wait(until.elementIsEnabled(await driver.findElement(By.xpath(container))));           
            
            await driver.wait(until.elementLocated(By.xpath(container)),10000);
            var meld = await driver.findElement(By.xpath(container)).getText();
            if(meld.match(text)){
                // console.log("'SideMenu' matched! => ")
                await driver.findElement(By.xpath(container)).click();
                await driver.sleep(1000);
                return true
            }
            else{
                console.log("Warning 'SideMenu' matched NIET met text! => ");
                console.log("Found =>" + meld + "<= Expecting =>" + text + "<=");
                // await driver.quit();
            }
        }
        catch(NoSuchElementException){
            console.log("Error! => geen 'SideMenu' gevonden") 
            console.log(text + " " + container)
            // await driver.quit();
        }
    }

    async VerifySideMenuCont(container, text) {
        "timed script moet gaat door"
        try{
            // await driver.wait(until.elementIsEnabled(await driver.findElement(By.xpath(container))));
            await driver.wait(until.elementLocated(By.xpath(container)),2000);
            var meld = await driver.findElement(By.xpath(container)).getText();
            if(meld.match(text)){
                // console.log("'SideMenu' matched! => ")
                await driver.findElement(By.xpath(container)).click();
                await driver.sleep(1000);
            }
            else{
                console.log("Warning 'SideMenu' matched NIET met text! => ");
                console.log("Found =>" + meld + "<= Expecting =>" + text + "<=");
            }
        }
        catch(NoSuchElementException){
            // console.log("Error! => geen 'SideMenu' gevonden") 
            // console.log(text + " " + container + "timeout! niet aanwezig, of overgeslagen")
            return false
        }
    }

    async VerifyHistorie(container) {
        try{
            await driver.wait(until.elementLocated(By.xpath(container)),1000);
            // console.log("Menu gevonden in Favo")
            return true
        }
        catch(NoSuchElementException){
            // console.log("Menu niet gevonden in Favo")
            return false
        }
    }

    async gotoFavorietenClear() {
        await this.FavorietenSideMenu()
        await driver.findElement(By.xpath("//span[@title='Aanpassen']")).click();
        await FunctionsPage.checkboxchecker("(//div[@class='chkbox jqx-widget jqx-widget-material jqx-checkbox jqx-checkbox-material'])[1]", "checkbox Favorieten")
        await FunctionsPage.checkboxchecker("(//div[@class='chkbox jqx-widget jqx-widget-material jqx-checkbox jqx-checkbox-material'])[2]", "checkbox Historie")
        await driver.findElement(By.xpath("//span[@title='Verwijderen']")).click();
        await divconfirm.Dialogquestion("Weet u zeker dat u deze favoriet", "//button[normalize-space()='Ja']",)   
    }

    async clickIntoViewport(element, Scrolldown ) { 
        var target = await driver.findElements(By.xpath(element));
        if(target != true ){ 
            while(true){
                try {
                    await driver.wait(until.elementLocated(By.xpath(element)),500);
                    await driver.findElement(By.xpath(element)).click();
                    // await driver.sleep(1000);
                    // console.log("gelukt hier");
                    break
                }       
                catch(NoSuchElementException){
                    try {
                    await driver.findElement(By.xpath(Scrolldown)).click();
                    //await driver.findElement(By.xpath(Scrolldown)).click();
                    await driver.sleep(500);
                    }
                    catch(NoSuchElementException){
                    }    
                }
            }
        }
    } 

    async clickdropdowncheck (element, Scrolldown ) { 
        // console.log(element)

        "alleen te gebruiken voor dropdown van innermenu "
        await this.clickIntoViewport(element, Scrolldown );
        await driver.sleep(1000);
        // let display = "//ul[@style='overflow: hidden; display: block;']"
        let displaynone = "//ul[@style='display: none;']"
        // let displaynone = "//ul[@style='overflow: hidden; display: none;']"
        let target2 = await driver.findElements(By.xpath(element+displaynone));  
        // console.log(target2.length)
        if(target2.length > 0 ){
            // console.log(target2 != 0)
            let status = []
            do{
                await driver.findElement(By.xpath(element)).click();
                await driver.sleep(1000);
                status = await driver.findElements(By.xpath(element+displaynone));
            }while(status.length > 0)
        }      
    }

    async genericdropdown(innersidebar, targetkid, submenu, subsubmenu,) { 

        "generic dropdown gemaakt menu wordt altijd dichtgeklapt  geen target check hier."
        " te gebruiken voor zowel eerste sub als subsub item. "
        var collapsebutton = innersidebar + "//span[@title='Alles inklappen']"
        var buffersidebar = innersidebar + "//following-sibling::div[1]"
        "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
        var target = await driver.findElement(By.xpath(buffersidebar)).getAttribute('id') 
        var Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
        await this.clickmod(collapsebutton)
   
        var checksubmenu = await driver.findElements(By.xpath(buffersidebar+submenu))
        if(checksubmenu = 1){ 
            await this.clickdropdowncheck((buffersidebar+submenu),Scrolldown)
            // await driver.sleep(2000);
        }
    
        var checksubsubmenu = await driver.findElements(By.xpath(buffersidebar+subsubmenu))
        if(checksubsubmenu = 1){ 
            await this.clickdropdowncheck((buffersidebar+subsubmenu),Scrolldown)
            // await driver.sleep(2000);
        }
        
        // await driver.wait(until.elementLocated(By.xpath(buffersidebar+targetkid)),5000);
        var checktarget = await driver.findElements(By.xpath(targetkid))
        console.log(targetkid)
        if (checktarget != 0){
            
            console.log("target menu located")
            // await this.clickdropdowncheck((buffersidebar+targetkid),Scrolldown)  
            return
        }
        else{
            console.log("geen menu gevonden controleer subpath of xpath")
        }
    }

    async specificdropdown( menulocation, targetkid, submenu, subsubmenu,) { 
        "hier is geen rekening gehouden met als de menu item al is ingeladen, element zal wel gevonden worden maar geen interactie mogenlijk."
        "eigenlijk alleen te gebruiken om initieel te kijken of de menu laadt of niet. gebruik generic dropdown"
        var collapsebutton = "//div[@class='title_inner text_material'][.='"+menulocation+"']//span[@title='Alles inklappen']"
        var buffersidebar = "//div[@class='title_inner text_material'][.='"+menulocation+"']//following-sibling::div[1]"
        "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
        var target = await driver.findElement(By.xpath(buffersidebar)).getAttribute('id') 
        var Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
        var Upscroll = "(//div[@id='jqxScrollAreaUppanel"+target+"verticalScrollBar'])[1]"

        "classpath is de id van de dropdown"
        var classpath = "//li[@class='jqx-tree-item-li jqx-tree-item-li-material jqx-disableselect jqx-disableselect-material']"      
        var checktarget = await driver.findElements(By.xpath(buffersidebar+targetkid))

        if (checktarget != 0){
            await this.clickdropdowncheck((buffersidebar+targetkid),Scrolldown)  
            return
        }
        else {
            try{
                // var checksubmenu = await driver.findElements(By.xpath(buffersidebar+submenu))
                await this.clickdropdowncheck((buffersidebar+submenu),Scrolldown)
            }
            catch(NoSuchElementException){
                console.log("geen dropdown gevonden submenu => " +submenu)
                return
            }            
            var checktarget2 = await driver.findElements(By.xpath(buffersidebar+targetkid))
            if (checktarget2 != 0){
                await this.clickdropdowncheck((buffersidebar+targetkid),Scrolldown)  
                return
            }
            else{
                try{
                    // var checksubsubmenu = await driver.findElements(By.xpath(buffersidebar+subsubmenu))
                    await this.clickdropdowncheck((buffersidebar+subsubmenu),Scrolldown)
                }
                catch(NoSuchElementException){
                    console.log("geen dropdown gevonden subsubmenu => " +subsubmenu)
                    return
                }
                var checktarget3 = await driver.findElements(By.xpath(buffersidebar+targetkid))
                if (checktarget3 != 0){
                    await this.clickdropdowncheck((buffersidebar+targetkid),Scrolldown)  
                    return
                }
                else{
                    console.log("geen menu gevonden controleer kid of xpath")
                }
            }
        }
    }

    async dropdown(buffersidebar, Scrolldown, Upscroll, ) { 
        "classpath is de id van de dropdown"
        const classpath = "//li[@class='jqx-tree-item-li jqx-tree-item-li-material jqx-disableselect jqx-disableselect-material']"      

        var listing = await driver.findElements(By.xpath(buffersidebar+classpath))
        var arrayone =[]
        var xpath =[]
        
        for(var i = listing.length; i >= 1; i--){
            "haal de array op met dropdown opties"
            arrayone[i] = await driver.findElement(By.xpath("("+buffersidebar+classpath+")["+i+"]")).getAttribute("id"); 
            xpath[i] = "//li[@id='"+arrayone[i]+"']"
            await this.clickdropdowncheck(xpath[i],Upscroll)

            var checkdropdown = "//li[@id='"+arrayone[i]+"']"+classpath
            var checkpath = await driver.findElements(By.xpath(checkdropdown));
            var arraytwo =[]
            var xpath2 =[]
            if (checkpath.length > 0){      
                for(var j = checkpath.length; j >= 1; j--){
                "haal de sub-dropdown op van bovenstaande "
                arraytwo[j] = await driver.findElement(By.xpath("("+checkdropdown+")["+j+"]")).getAttribute("id"); 
                xpath2[j] = "//li[@id='"+arraytwo[j]+"']"
                await this.clickdropdowncheck(xpath2[j], Scrolldown )

                var checkdropdown2 = "//li[@id='"+arraytwo[j]+"']"+classpath
                var checkpath2 = await driver.findElements(By.xpath(checkdropdown2));
                var arraythree =[]
                var xpath3 =[]
                    if (checkpath2.length > 0){         
                        for(var k = checkpath2.length; k >= 1; k--){
                        "haal de sub-dropdown op van bovenstaande "
                        arraythree[k] = await driver.findElement(By.xpath("("+checkdropdown2+")["+k+"]")).getAttribute("id"); 
                        xpath3[k] = "//li[@id='"+arraythree[k]+"']"
                        // await driver.sleep(1000);
                        await this.clickdropdowncheck(xpath3[k], Scrolldown )
                        }
                    }
                    else{
                        // console.log("skip deze subsub stap subsub")    
                    }
                }
            }
            else{
                //console.log("skip deze sub stap sub")    
            }
        }
    }

    async clickmod(element,) { 
        await driver.wait(until.elementLocated(By.xpath(element)));
        // await driver.findElement(By.xpath(button)).click();
        await driver.findElement(By.xpath(element)).click();
        await driver.sleep(1000);
    }


}        
 


module.exports = new LinkerMenu();



