const {Builder, By, Actions, Key, until,} = require('selenium-webdriver');
const BasePage = require('./base.page.js');
const FunctionsPage = require('./functions.page.js');
const ExtractPage = require('./ExtractArray.page.js');
const divalert = require('./divalert.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');

class Regression extends BasePage{
    
async openMODclose(result, sidemenu, innersidebar, Scrolldown, ) { 

    const Closefile = await ExtractPage.FileInlezen('path\\..\\selenium\\Menutest\\Sluitknoppen.txt')
    
    "result zijn de menu items"
    let checksucceed = []
    let checkfailed = []
    // console.log(Closefile)
    for(let i=0; i<(result.length); i++){
        // console.log("     start"+result[i])        
        await this.clickMenuIntoViewport(sidemenu, innersidebar, );
        await this.clickScrollIntoViewport(result[i],Scrolldown);
        await this.spinnercheck2()  
        await this.parserfoutcheck()

        "Findelements slaat deze wel eens over zonder sleep. bij lag zou dit weleens een probleem kunnen veroorzaken spinner?"
        await driver.sleep(2000);
        let checkDialog = await driver.findElements(By.xpath("(//div[@role='dialog'][1])"));       
        if(checkDialog != 0){
            "warning error meldingen met dialog"
            await this.catchDialogerror("(//div[@role='dialog'][1])", result[i], Closefile )
            console.log("        error dialog gevonden!(main)" + result[i])
        }

        try{
            if (result[i].includes("k_id='web")){
                if (result[i].includes("k_id='webimuisreport")){
                    await this.Rapportest(result[i])                    
                }
                else if (result[i].includes("k_id='webinkordintro")){
                    await this.sluiteniframe(Closefile, result[i] );  
                    await this.sluiteniframe(Closefile, result[i] ); 
                }
                else{
                    "sluiten gebeurt in subfuncfunctie"
                    await this.Webmodules(Closefile,result[i])
                    // await this.sluiten(Closefile,result[i]); 
                }
            }

            else if (result[i].includes("k_id='kasboek")){
                console.log("moet nog even uitgewerkt worden " +result[i])
                await this.sluiten(Closefile,result[i]);
                await this.ESCAPEfunction();    
            }

            else if (result[i].includes("k_id='wdd_upload")){
                console.log("moet nog even uitgewerkt worden " +result[i])
                await this.sluiten(Closefile,result[i]);
                await this.ESCAPEfunction();    
            }

            else if (result[i].includes("k_id='tabellen")){
                await driver.switchTo().frame('i_app');    
                let checkDialogCBS2 = await driver.findElements(By.xpath("//div[@class='dialogcorner bs']"));
                await driver.switchTo().defaultContent();

                if(checkDialogCBS2 != 0){
                    await driver.switchTo().frame('i_app');  
                        await this.catchDialogBS("//div[@class='dialogcorner bs']", result[i])
                    await driver.switchTo().defaultContent();
                }
                else if(result[i].includes("k_id='tabellen_webbaswdd'")){
                    console.log("Instellingen van webtabbelen moet nog wat voor komen")
                    await this.sluiteniframe(Closefile,result[i]); 
                }               
                else if (result[i].includes("k_id='tabellen_webbas")){   
                    "edit table wordt direct opgeroepen bij deze menuitems. "      
                    await driver.wait(until.elementLocated(By.xpath("(//form[@method='post']/parent::div[@id])[last()]")),2000);
                    let checkEditTable = await driver.findElement(By.xpath("(//form[@method='post']/parent::div[@id])[last()]")).getAttribute('id');
                    await driver.sleep(1000);
                    await this.TrycatchESCAPE("//div[@id='"+checkEditTable+"']//button[@id='knop_sluiten']",result[i])
                }
                else if(result[i].includes("k_id='tabellen_webmailmerge'")){
                    console.log("webmailmerge moet nog wat voor komen, geeft nu een js error")
                    await this.ESCAPEfunction();     
                }
                else if(result[i].includes("k_id='tabellen")){
                    await this.tabellen(result[i]);
                    "controleer of deze aan moet als je tabellen aan zet. moet altijd aan"
                    await this.sluiten(Closefile,result[i]); 
                }
                else{
                    console.log("deze nog niet gecategoriseerd.. "+result[i])
                    await this.sluiten(Closefile,result[i]);
                    await this.ESCAPEfunction();         
                }
            }

            else if (result[i].includes("k_id='rapport_web")){ 
                if (result[i].includes("k_id='rapport_webreltkvoortg")){
                    console.log("skip deze oude error melding niet te klikken met selenium "+ result[i] )
                    await this.ESCAPEfunction();
                    // await this.ESCAPEfunction();
                }
                else if (result[i].includes("k_id='rapport_webfimdaanm")){        
                    console.log("error dialog vanwege onverwerkte afschriften. ")
                    await driver.sleep(3000);
                    let checkDialog = await driver.findElements(By.xpath("(//div[@role='dialog'][1])"));       
                    if(checkDialog != 0){
                        "warning error meldingen met dialog"
                        await this.catchDialogerror("(//div[@role='dialog'][1])", result[i], Closefile )
                        console.log("        error dialog gevonden!(main)" + result[i])
                    }
                    await this.sluiteniframe(Closefile,result[i]);  
                    await this.Rapportest(result[i])
                }
                else{
                    "sluiten zit in functie"
                    await this.Rapportest(result[i])
                }
            }

            else if (result[i].includes("k_id='info")){
                console.log("           info mod moet nog script voor." +result[i])
                await this.sluiteniframe(Closefile,result[i]);
            }

            else if (result[i].includes("k_id='vitosoft")){
                console.log("           vitosoft moet nog even uitgewerkt worden " +result[i])
                await this.sluiteniframe(Closefile,result[i]);
            }

            else{
                console.log("deze nog niet gecategoriseerd.. "+result[i])
                await this.sluiten(Closefile,result[i]);
                await this.ESCAPEfunction();         
            }

            checksucceed[i] = result[i];
            // console.log("ok menuitem met k_id => "+ result[i])
        }

        catch(NoSuchElementException){
            checkfailed[i] = result[i];
            console.log("nope =>"+checkfailed[i])
            await driver.switchTo().defaultContent(); 
        }
    }

    console.log(checkfailed)
}

async Webmodules(Closefile,result) {
    await driver.sleep(3000);   
    await this.spinnercheck2()   
    let checkDialog = await driver.findElements(By.xpath("//div[@role='dialog']"));
    if (checkDialog != 0){    
        console.log("error dialog bij subwebmodules => " +result)
        await this.catchDialogerror("//div[@role='dialog']", result, Closefile )
    }

    if(result.includes("k_id='webrelatie")){
        "warning error meldingen met dialog"
        "functie maken voor foutmelding hier staat het nog niet goed. "
        console.log("   webrelatie => " + result)
        await this.catchDialogerror("(//div[@role='dialog'][1])", result,Closefile )
        return
    }

    if(result.includes("k_id='webtbuitschrbetfiat")){
        console.log("    webtbuitschrbetfiat => " + result)
        // let framepopup = await driver.findElements(By.xpath("//iframe[@menucode='webtbuitschrbetfiat']"));
        let framepopup = await driver.findElements(By.xpath("//iframe[@menucode='webtbuitschrbetfiat'][contains(@src,'leeg.html')]"));
        if (framepopup != 0){        
            console.log("   geen openstaande posten")
        }
        else{
            await driver.wait(until.elementLocated(By.xpath("//iframe[@menucode='webtbuitschrbetfiat']")));
            await driver.switchTo().frame('i_app');
            await this.clickmod("//button[@id='knop_vorige']");
            Key.RETURN;  
            await driver.switchTo().defaultContent(); 
            await this.sluiteniframe(Closefile, result );
        } 
    }

    if(result.includes("k_id='webtbfiatinkdashboard")){
        console.log("    webtbfiatinkdashboard => " + result)
        await driver.wait(until.elementLocated(By.xpath("//div[@class='dialogcorner bs ']//td[@class=' alignright']")));
        
        // await this.clickmod("(//div[@class='dialogcorner bs ']//td[@class=' alignright'])[last()]")
        await this.sluiten(Closefile, result ); 
        return 
    }

    if(result.includes("k_id='webbtwicp")){
        console.log("    webbtwicp => " + result)
        await driver.wait(until.elementLocated(By.xpath("//div[@class='dialogcorner bs ']//td[@class=' alignright']")));

        let cmask = await driver.findElements(By.xpath("//div[@class='c-mask is-active']"));   
        if (cmask != 0){
            console.log("verkeerde menu geklikt rapporten wordt gestart")
            await this.Rapportest(result)
        }
        //div[@class='c-mask is-active']
        //await driver.sleep(5000);  
        // await this.clickmod("(//div[@class='dialogcorner bs ']//td[@class=' alignright'])[last()]")
        await this.sluiten(Closefile, result ); 
        return 
    }
    
    if(result.includes("k_id='webkingconversie")){
        console.log("    webkingconversie => " + result)
        await driver.wait(until.elementLocated(By.xpath("//div[@class='dialogcorner bs ']//td[@class=' alignright']")));
        await driver.sleep(5000);  
        await this.TrycatchESCAPE("(//div[@class='dialogcorner bs ']//td[@class=' alignright'])[last()]")
        // await this.clickmod("//div[@class='dialogcorner bs ']//td[@class=' alignright']")
        // await this.sluiten(Closefile, result ); 
        return 
    }

    if(result.includes("k_id='webbtwakkoord")){
        console.log("    webbtwakkoord => " + result)

        await this.sluiteniframe(Closefile, result ); 
        return 
    }

    if (result.includes("k_id='webfactuur2king")) {
        console.log("    webfactuur2king => "+result)
        await this.sluiten(Closefile,result);
        return
    }

    if (result.includes("k_id='webinteractievebalans")) {
        console.log("    webinteractievebalans => "+result)
        await this.sluiten(Closefile,result);
        return
    }

    if (result.includes("k_id='websnelboeken")) {
        console.log("    websnelboeken => "+result)
        await this.sluiten(Closefile,result);
        return
    }

    else if (result.includes("k_id='webeverbinding'")) {
        console.log("    webeverbinding=> " + result)
        await this.sluiten(Closefile, result );  
        return 
    }

    else if (result.includes("k_id='webdigdossier")) {
        console.log("    webdigdossier=> " + result)
        await driver.switchTo().frame('i_app');
        await this.clickmod("//table[@id='table_dossier_kader']//button[@id='knop_sluiten']")
        await driver.switchTo().defaultContent(); 
        return
    }
    else if (result.includes("k_id='webublcloudarchief'")) {
        "lange laadtijd & moet worden onderZocht script vast op deze sectie. "
        console.log("    webublcloudarchief => " + result)
        await driver.sleep(4000);   
        // await this.ESCAPEfunction();     
        
        await driver.switchTo().frame('i_app');
        await this.clickmod("//table[@id='table_scan_koppeldocs']//button[@id='knop_sluiten']")
        await driver.switchTo().defaultContent(); 
        return
    }
    else if (result.includes("k_id='webdocverwerk")) {
        console.log("    webdoc => " + result)
        await this.sluiteniframe(Closefile, result );  
        return 
    }
    else if (result.includes("k_id='web_loketnl")) {
        console.log("    web_loketnl => " + result)
        await this.sluiten(Closefile, result );  
        return 
    }
    else if (result.includes("k_id='webemaildigdos")) {
        console.log("    webmail=> " + result)
        await this.sluiten(Closefile, result );  
        return 
    }
    else if (result.includes("k_id='web")) {
        console.log("    k_id web=> " + result)
        await this.sluiteniframe(Closefile, result );  
        return 
    }

    console.log("TODO! deze nog sorteren "+ result)
    await this.sluiteniframe(Closefile, result );  
    return
}

async Rapportest(result) {
    await driver.sleep(3000);
    await driver.switchTo().frame('obj_report_index');  
    let error = await driver.findElements(By.xpath("//div[@class='dialog_errorheader']")); 
    await driver.switchTo().defaultContent();
    let cmask = await driver.findElements(By.xpath("//div[@class='c-mask is-active']"));   

    let checkDialog = await driver.findElements(By.xpath("(//div[@role='dialog'][1])"));       
    if(checkDialog != 0){
        "warning error meldingen met dialog"
        await this.catchDialogerror("(//div[@role='dialog'][1])", result[i], Closefile )
        console.log("         error dialog gevonden!(main)" + result[i])
        // await this.ESCAPEfunction();    
    }

    if (error != 0){    
        await driver.switchTo().frame('obj_report_index'); 
            "   errormelding in cmask rechtermenu. "
            // await driver.wait(until.elementLocated(By.xpath("//div[@class='dialog_errorheader']")), 2000); "deze is niet meer nodig in principe vanwehe de findelements"
            // var meld = await driver.findElement(By.xpath("//div[@class='dialog_errorheader']")).getText();
            console.log("    errorheader! geen regels gevonden voor rapport => "+ result)
            await this.clickmod("//input[@value='Sluiten']");
            await driver.sleep(2000);
        await driver.switchTo().defaultContent();
        return;
    }

    if (cmask != 0){
        "dit is de rechtermenu "
        await driver.switchTo().frame('obj_report_index'); 
            await this.clickmod("//input[@id='knop_submit']") 
            await driver.sleep(2000);
        await driver.switchTo().defaultContent();
        await this.spinnercheck2()   
        
        "na submit moet er een check op dialog error melding dus."
        let checkDialog = await driver.findElements(By.xpath("//div[@role='dialog']"));
        // console.log((checkDialog != 0));
        if(checkDialog != 0){
            "wegklikken van gevonden dialog => hoofdscherm. "
            await this.catchDialogerror("//div[@role='dialog']", result)
            await driver.sleep(2000);

            "Na wegklikken linkermenu nog aan controleert of rechtermenu nog actief is"
            let cmask2 = await driver.findElements(By.xpath("//div[@class='c-mask is-active']"));   
            if (cmask2 != 0){
                await driver.switchTo().frame('obj_report_index'); 
                // await this.clickmod("//button[@class='c-menu__close']");
                await this.clickmod("//input[@id='knop_submit']") 
                await driver.switchTo().defaultContent();
            }
            else{
            await this.clickmod("//button[@id='button_top_report_sluiten_doorstart']");
            
            }
        }
    }
    
    else{
        "deze is aanwezig omdat er soms automatisch op de submit knop wordt gedrukt."
        // console.log("no cmask, rechtermenu")
        await this.pdfparam(result)
        return
    }
    // console.log("no if's")
    await this.pdfparam(result)
    return
}

async pdfparam(result) { 
    "controle op oude of nieuwe pdfloader"
    await this.spinnercheck2()  
    await driver.sleep(2000);     

    let objreport = await driver.findElements(By.xpath("//object[@id='obj_report']"));
    // console.log(objreport != 0)
    let canvas = await driver.findElements(By.xpath("//canvas[@id='report_canvas']"));
    // console.log(canvas != 0)
    let DialogBS = await driver.findElements(By.xpath("//div[@class='dialogcorner bs']"));
    // console.log(DialogBS != 0)

    if(objreport != 0){
        "gegevens halen uit de gooey"
        let meld = new URLSearchParams(await driver.findElement(By.xpath("//object[@id='obj_report']")).getAttribute('data'))
        // console.log(meld)
        await driver.switchTo().frame('obj_report');    
            await driver.sleep(2000);
            // console.log("2")
            let checkDialogCBS2 = await driver.findElements(By.xpath("//div[@class='dialogcorner bs']"));
            // console.log(checkDialogCBS2 != 0)
        await driver.switchTo().defaultContent();
        
        if(checkDialogCBS2 != 0){
            await driver.switchTo().frame('obj_report');    
                await this.catchDialogBS("//div[@class='dialogcorner bs']", result)
            await driver.switchTo().defaultContent();
            return
        }

        if(result.includes("k_id='rapport_web")){
            var rapport = meld.get('naam_rapport')
            var title = meld.get('PDF_TITEL')
            console.debug("    "+rapport+" <=> "+title+" <=> " +result)   
        }
        
        if(result.includes("k_id='webimuisreport")){
            var REPORTNAME = meld.get('REPORTNAME')
            var titel_rapport = meld.get('titel_rapport')
            console.debug("    "+REPORTNAME+" <=> "+titel_rapport+" <=> " +result)   
        }
        // await this.clickmod("//button[@name='button_top_report_sluiten_doorstart']");
        await this.TrycatchESCAPE("//button[@id='button_top_report_sluiten_doorstart']", result);
        await driver.switchTo().defaultContent();
        return  
    }   

    else if (canvas != 0){
        console.log("       canvas ondekt " +result)
        await this.TrycatchESCAPE("//button[@id='button_top_report_sluiten_doorstart']", result);
    }
    
    else if (DialogBS != 0){
        console.log("dialog na canvas ondekt")
        await this.catchDialogBS("//div[@class='dialogcorner bs']", result)
    }

    else{
        console.log("geen canvas of object id kunnen vinden. "+result)
        await this.ESCAPEfunction();
    }

}

async spinnercheck2() { 
    let spinner = await driver.findElements(By.xpath("//div[@id='d_spinner']"));
    // console.log(spinner!= 0)
    if (spinner!= 0){
        let target =[]
        do {
            target = await driver.findElements(By.xpath("//div[@id='d_spinner']"));
            // await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='d_spinner']"))));
            await driver.sleep(2000);
            // console.log("spinner")
        } while(target != 0);
    }
}

async parserfoutcheck() { 
    await driver.switchTo().frame('i_app');  
    let parserfout = await driver.findElements(By.xpath("//html[contains(.,'Parser-fout')]"));
    await driver.switchTo().defaultContent();
    if (parserfout!= 0){
        console.log("Error Parser fout gevonden. ")
    }
}

async clickmod(element,) { 
    await driver.wait(until.elementLocated(By.xpath(element)),10000);
    await driver.findElement(By.xpath(element)).click();
    await driver.sleep(1000);
}

async clickMenuIntoViewport(sidemenu, innersidebar, ) { 

    let BarInnermenu = (innersidebar + "/..")   
    "status innermenu open of closed"
    let id = await driver.findElement(By.xpath(BarInnermenu)).getAttribute('id');
    // console.log (id)
    let innermenuClosed = "//div[@id='"+id+"'][@style='min-width: 280px; max-width: 280px; left: -279px;']" 
    let innermenuOpen = "//div[@id='"+id+"'][@style='min-width: 280px; max-width: 280px; left: 64px;']"

    let statusfirst = await driver.findElements(By.xpath(innermenuClosed));  
    let status2 = []

    if(statusfirst != true ){ 
        do {
            await driver.wait(until.elementLocated(By.xpath(sidemenu)),2000);
            await driver.findElement(By.xpath(sidemenu)).click();
            await driver.sleep(1000);
            status2 = await driver.findElements(By.xpath(innermenuClosed));
            //console.log(status2 != 0)
        }while(status2 != 0);
    }
}

async clickScrollIntoViewport(element, Scrolldown ) { 
    var target = await driver.findElements(By.xpath(element));
    if(target != true ){ 
        while(true){
            try {
                await driver.wait(until.elementLocated(By.xpath(element)),2000);
                await driver.findElement(By.xpath(element)).click();
                await driver.sleep(1000);
                // console.log("gelukt hier");
                break
            }       
            catch(NoSuchElementException){
                try {
                await driver.findElement(By.xpath(Scrolldown)).click();
                await driver.findElement(By.xpath(Scrolldown)).click();
                await driver.sleep(250);
                }
                catch(NoSuchElementException){
                }    
            }
        }
    }
} 

async scrollup(Scroll) { 
    while(true){
        try {
            await driver.findElement(By.xpath(Scroll)).click();
        }       
        catch(NoSuchElementException){
            break
        }
    }
}

async sluiteniframe(closefile, result,) { 
    await driver.switchTo().frame('i_app');
        for(var i=0; i<(closefile.length); i++)  {
            try {
                await driver.wait(until.elementLocated(By.xpath(closefile[i])),2000);
                await driver.findElement(By.xpath(closefile[i])).click();
                // console.log("button in i_app frame ==> "+closefile[i])
                var loop = true
                await driver.sleep(1000);
                break
            }
            catch(NoSuchElementException){
            }
        }
    await driver.switchTo().defaultContent(); 
    
    if (loop === true) {
        // console.log("binnen iframe test"+loop)
        return true
    }
    else{
        // console.log("start loop2")
        for(var i=0; i<(closefile.length); i++)  {
            try {
                await driver.wait(until.elementLocated(By.xpath(closefile[i])),2000);
                await driver.findElement(By.xpath(closefile[i])).click();
                // console.log("loop2 in sluiteniframe functie ==> "+result)
                var loop2 = true
                await driver.sleep(1000);
                break
            }
            catch(NoSuchElementException){
            }
        }
    }

    if (loop2 === true) {
        console.log("button zat NIET in iframe =>"+ result)
        return true
    }
    else{
        console.log("sluit knop bestaat niet, of is niet opgegeven." +result)
        await this.ESCAPEfunction();    
    }
}

async sluiten(closefile, result) { 
    for(var i=0; i<(closefile.length); i++)  {
        try {
            await driver.wait(until.elementLocated(By.xpath(closefile[i])),2000);
            await driver.findElement(By.xpath(closefile[i])).click();
            // console.log("button in frame ==> "+closefile[i])
            var loop = true
            await driver.sleep(500);
            break
        }
        catch(NoSuchElementException){
            "ElementClickInterceptedError"
        }
    }

    if (loop === true) {
        // console.log("buiten iframe test "+loop)
        return true
    }

    else{
        await driver.switchTo().frame('i_app');
        for(var i=0; i<(closefile.length); i++)  {
            try {
                await driver.wait(until.elementLocated(By.xpath(closefile[i])),2000);
                await driver.findElement(By.xpath(closefile[i])).click();
                // console.log("loop2 sluiten functie ==> "+closefile[i])
                var loop2 = true
                await driver.sleep(500);
                break
            }
            catch(NoSuchElementException){
            }
        }
        await driver.switchTo().defaultContent(); 
    }

    if (loop2 === true) {
        console.log("button zat in iframe =>"+ result)
        return true
    }
    else{
        console.log("sluit knop bestaat niet, of is niet opgegeven."+result)
        await this.ESCAPEfunction();    
    }
}

async tabellen(result) {
    "menuitem met tabbelen id, eerste scherm"
    let dialog = "//div[@class='dialogcorner bs  gen_grd_screen']"
    let dialogDID = await driver.findElement(By.xpath(dialog)).getAttribute('id');
    let dialogName = await driver.findElement(By.xpath(dialog)).getAttribute('div_title');
    console.log("    maintabel => "+dialogName+" "+dialogDID);
    let button = await ExtractPage.ExtractBtnTab(dialogDID);
    let row = "//div[@row-id]" 
    // console.log(button)
    
    let checksucceed = []  
    let checkfailed = []  
    for(let i=1; i<(button.length); i++){
        let maindropdown = "//button[@id='d_"+dialogDID+"_contentmenubtn_act']"
        await this.clickmod(maindropdown)
        await this.clickmod(button[i])
        await driver.sleep(1000); 
        "controleer of er meerdere grd_screen zijn"
        let checkDC2 = await driver.findElements(By.xpath(dialog))
        "controleer op dialog popup op het moment dat er op de content menu wordt geklikt."
        let checkDialog = await driver.findElements(By.xpath("//div[@role='dialog']"));

        try {
            if(checkDC2.length > 1){
                "tweede dialog wordt geopend met subbuttons. "
                "hieronder wordt alvast bepaald wat de subbuttons zijn"
                let dialogDID2 = await driver.findElement(By.xpath("("+dialog+")[2]")).getAttribute('id');
                let dialogName2 = await driver.findElement(By.xpath("("+dialog+")[2]")).getAttribute('div_title');
                // console.log("subtabel => "+dialogName2+" "+dialogDID2); 
                let subbutton = await ExtractPage.ExtractBtnTab(dialogDID2);
                // console.log(subbutton); 
                await this.tabellensub(dialogDID2,subbutton)
                await this.clickmod("//div[@id='"+dialogDID2+"']//div[@title='Sluiten']");
            }

            else if(checkDialog != 0){
                "warning error meldingen met dialog"
                await this.catchDialogerror("//div[@role='dialog']",)
            }
            
            else if(button[i].includes("ZDKnop_Delete")){
                console.log("delete knop testen 2.0 versie")
            }

            else if(button[i].includes("ZDKnop_Vernummeren")){
                await FunctionsPage.verifyContainer("//div[@id='VERNUMMEREN']", "Vernummeren/samenvoegen",);
                await this.clickmod("//button[@id='ZDDoButtonVernumSluitenID']")
            }

            else if(button[i].includes("ZDKnop_Hist")){
                // await FunctionsPage.verifyContainer("//div[@id='div_gridhist']", "Historie/Audittrail",);
                // console.log("histori found.")
                await this.clickmod("//div[@id='div_gridhist']//div[@id='knop_sluiten_div_gridhist']")
            }

            else if(button[i].includes("ZDKnop_Kredietlimiet")){
                try{
                    await FunctionsPage.verifyContainer("//div[@id='div_ZDINFO2KREDLIM']", "Kredietlimiet ",);
                    await this.clickmod("//div[@id='div_ZDINFO2KREDLIM']//div[@id='knop_sluiten_div_ZDINFO2KREDLIM']");
                }
                catch(NoSuchElementException){
                    await divalert.Dialogwarning2("//div[@class='dialogcorner bs']", "Waarschuwing", "//input[@id='Btn_GetMelding_Sluiten']")
                    // await FunctionsPage.verifyContainer("//div[@class='dialogcorner bs']", "Waarschuwing",);
                    // await clickmod("//input[@id='Btn_GetMelding_Sluiten']")
                }
            }    

            else if(button[i].includes("ZDKnop_RelKaart")){
                await FunctionsPage.verifyContainer("//div[@id='d_relkaart']", "Relatiekaart",);
                await this.clickmod("//div[@id='d_relkaart']//div[@id='knop_sluiten_d_relkaart']")
            }

            else if(button[i].includes("ZDKnop_WDD")){
                await FunctionsPage.verifyContainer("//div[@id='d_wdd']", "Koppel een dossierstuk",);
                await this.clickmod("//div[@id='d_wdd']//div[@id='knop_sluiten_d_wdd']")
            }

            else {
                // console.log("start"+button[i])
                // await driver.wait(until.elementLocated(By.xpath("(//form[@action='/review/tabel/edit_tabel.aspx']/parent::div[@id])[last()]")),5000);
                // let checkEditTable = await driver.findElement(By.xpath("(//form[@action='/review/tabel/edit_tabel.aspx']/parent::div[@id])[last()]")).getAttribute('id');

                await driver.wait(until.elementLocated(By.xpath("(//form[@method='post']/parent::div[@id])[last()]")),2000);
                let checkEditTable = await driver.findElement(By.xpath("(//form[@method='post']/parent::div[@id])[last()]")).getAttribute('id');
                // console.log("   //div[@id='"+checkEditTable+"']//button[@id='knop_sluiten']")
                await this.TrycatchESCAPE("//div[@id='"+checkEditTable+"']//button[@id='knop_sluiten']", result)
                await driver.switchTo().defaultContent();
                // await driver.wait(until.elementLocated(By.xpath("(//form[@method='post']/parent::div[@id])[last()]")),5000);
                // await driver.sleep(1000);

                // await this.TrycatchESCAPE("//form[@method='post']//button[@id='knop_sluiten']", result)


            } 
            // console.log("gesloten main "+button[i])
            checksucceed[i] = button[i];
        }
        catch(NoSuchElementException){
            "element waarschijnlijk niet gevodnen. "
            console.log("catch maintabel =>"+button[i])
            checkfailed[i] = button[i];
        }
    }
}

async tabellensub(dialogDID2,subbutton) {   
    "sub menu van de tabellen "
    let checksucceed = []  
    let checkfailed = []  
    for(let i=1; i<(subbutton.length); i++){

        let subdropdown = "//button[@id='d_"+dialogDID2+"_contentmenubtn_act']"
        await this.clickmod(subdropdown);
        await this.clickmod(subbutton[i]); 
        "controleer op dialog popup op het moment dat er op de content menu wordt geklikt."
        let checkDialog = await driver.findElements(By.xpath("//div[@role='dialog']"));
        let checkDialogCBS = await driver.findElements(By.xpath("//div[@id='d_ZDTabelKopieerAfs']"));
        let checkSCaanpas = await driver.findElements(By.xpath("//table[@id='gen_column_selection_buttonsd_"+dialogDID2+"_content']"));
        let checkSHistori = await driver.findElements(By.xpath("(//div[@id='knop_sluiten_div_gridhist'])[1]"));

        try {
            if(checkDialog != 0){
                "warning error meldingen met dialog"
                await this.catchDialogerror("//div[@role='dialog']",)
            }

            else if(checkSHistori != 0){
                // await FunctionsPage.verifyContainer("//div[@id='div_gridhist']", "Historie/Audittrail",);
                // console.log("hallo2")
                await this.clickmod("(//div[@id='knop_sluiten_div_gridhist'])[1]")
            }

            else if(checkDialogCBS != 0){
                "uitzondering van de kopie button specifiiek de prijsafspraken subbutton."
                await this.clickmod("//div[@id='d_ZDTabelKopieerAfs']//button[@id='ZDKnopSluiten']")
            }

            else if(checkSCaanpas != 0){
                "uitzondering op de selectie code aanpassen "
                // var checkaanpas = await driver.findElement(By.xpath("//table[@id='gen_column_selection_buttonsd_"+dialogDID2+"_content']")).getAttribute('id');
                // console.log(checkaanpas)
                await this.clickmod("//table[@id='gen_column_selection_buttonsd_"+dialogDID2+"_content']//button[.='Opslaan']")
                // await driver.sleep(5000); 
            }

            else if(subbutton[i].includes("ZDKnop_Delete")){
                console.log("delete knop testen 2.0 versie")
                "in principe nieuw button een item aanmaken en vervolgens hier deleten. "
            }

            else if(subbutton[i].includes("ZDKnop_Hist")){
                "waarschijnljik obsolete meeste buttonhistory wordt door checkhistory opgevangen, issue met selectiecode detection met deze code."
                "kan aan het feit liggeb dat er 3 button met historie zijn"
                // await FunctionsPage.verifyContainer("//div[@id='div_gridhist']", "Historie/Audittrail",);
                console.log("hallo")
                // await clickmod("//div[@id='div_gridhist']//div[@id='knop_sluiten_div_gridhist']")
                await this.clickmod("(//div[@id='knop_sluiten_div_gridhist'])[1]")
            }

            else if(subbutton[i].includes("ZDKnop_SendTbIncMandaat")){
                // await FunctionsPage.verifyContainer("//div[@id='div_tbincmandaat']", "Incasso machtigingregister",);
                await this.clickmod("//div[@id='div_tbincmandaat']//div[@id='knop_sluiten_div_tbincmandaat']")
            }

            else { 
                // await driver.wait(until.elementLocated(By.xpath("(//form[@action='/review/tabel/edit_tabel.aspx']/parent::div[@id])[last()]")),5000);
                // let checkEditTable2 = await driver.findElement(By.xpath("(//form[@action='/review/tabel/edit_tabel.aspx']/parent::div[@id])[last()]")).getAttribute('id');
                await driver.wait(until.elementLocated(By.xpath("(//form[@method='post']/parent::div[@id])[last()]")),2000);
                let checkEditTable2 = await driver.findElement(By.xpath("(//form[@method='post']/parent::div[@id])[last()]")).getAttribute('id');
                // console.log("       //div[@id='"+checkEditTable2+"']//button[@id='knop_sluiten']")

                // await clickmod("//div[@id='"+checkEditTable2+"']//button[@id='knop_sluiten']");
                await this.TrycatchESCAPE("//div[@id='"+checkEditTable2+"']//button[@id='knop_sluiten']", subbutton[i],)
            } 
            // console.log("gesloten sub-button "+subbutton[i])
            checksucceed[i] = subbutton[i];
        }

        catch(NoSuchElementException){
            "Element waarschijnlijk niet gevonden"
            console.log("catch subtabel=>"+subbutton[i])
            checkfailed[i] = subbutton[i];
        }
    }
}

async spinnercheck() { 
    let spinner = await driver.findElements(By.xpath("//div[@id='d_spinner']"));
    console.log(spinner!= 0)
    if (spinner!= 0){
        while(true){
            try{
                // await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='d_spinner']"))));
                await driver.findElement(By.xpath("//div[@id='d_spinner']"));
                await driver.sleep(2000);
            }
            catch(NoSuchElementException){
                break
            }
        }
    }
}

async KeyESCAPE(element,) { 
    "Escape functie ingebouwd eigenlijk een global sluit knop, moet nog functie om te bepalen of de scherm die je wilt sluiten ook gesloten is?"
    await driver.wait(until.elementLocated(By.xpath(element)),2000);
    var body = await driver.findElement(By.xpath("(//body)[1]"));
    body.sendKeys(Key.ESCAPE);
    await driver.sleep(1000);
}

async ESCAPEfunction() { 
    var body = await driver.findElement(By.xpath("(//body)[1]"));
    body.sendKeys(Key.ESCAPE);
    await driver.sleep(2000);
}

async TrycatchESCAPE(element, result) { 
    "pas alleen geschikt voor //form misschien renamen "
    try {
        await driver.wait(until.elementLocated(By.xpath(element)),2000);
        // console.log("sluitbutton gevonden.")
        await this.clickmod(element);
    }
    catch(ElementClickInterceptedError){
        await this.ESCAPEfunction();
        console.log("Escape button gebruikt voor " +result )
    }
}

async catchDialogerror(dialog, result, Closefile) {
    "probeer hier verschillende meldingen te plaatsen "
    " dialog error popup"
    await driver.wait(until.elementLocated(By.xpath(dialog)), 2000);
    var meld = await driver.findElement(By.xpath(dialog)).getText();
    // console.log(meld);
    "let op check moet overeekomen met button!!!"
    var check1 = []
    var check2 = []
    var check3 = []
    var check4 = []
    var button1 = "//div[@role='dialog']//button[.='OK']"
    var button2 = "//div[@role='dialog']//button[.='Annuleren']"
    var button3 = "//div[@role='dialog']//button[normalize-space()='OK']"
    var button4 = "//div[@role='dialog']//button[.='Sluiten']"

    if (meld.match("Er is geen regel geselecteerd.")){
        var msg = "        error dialog gevonden! geen regel?"
        check1 = await driver.findElements(By.xpath(button1));
        // console.log(msg);
    }
    else if(meld.match("Nog niet volledig ingevuld")){
        var msg = "        error dialog gevonden! Nog niet volledig ingevuld"
        check1 = await driver.findElements(By.xpath(button1));
        console.log(msg);
    }
    else if(meld.match("Weet u zeker dat u dit item wilt verwijderen?")){
        var msg = "        error dialog gevonden! Weet u zeker dat u dit item wilt verwijderen?"
        check2 = await driver.findElements(By.xpath(button2));
        // console.log(msg);
    }
    else if(meld.match("Nog niet alle instellingen zijn gemaakt. Zie hiervoor het tabblad Instellingen.")){
        var msg = "        error dialog gevonden! Nog niet alle instellingen zijn gemaakt. Zie hiervoor het tabblad Instellingen."
        check1 = await driver.findElements(By.xpath(button1));
        check2 = await driver.findElements(By.xpath(button2));
        console.log(msg);
    }
    else if(meld.match("Uw opgegeven selecties leveren geen gegevens op.")){
        var msg = "        error dialog gevonden! Opgegeven selectie levert geen gegevens op?"
        check1 = await driver.findElements(By.xpath(button1));
        console.log(msg);
    }
    else if(meld.match("Voor werksoorten wordt geen voorraad bijgehouden.")){
        var msg = "        error dialog gevonden! Voor werksoorten wordt geen voorraad bijgehouden."
        check1 = await driver.findElements(By.xpath(button1));
        console.log(msg);
    }
    else if(meld.match("U bent geen lid van een groep. Zie de introductie van Relatiebeheer voor meer informatie.")){
        var msg = "        error dialog gevonden! U bent geen lid van een groep. Zie de introductie van Relatiebeheer voor meer informatie."
        check1 = await driver.findElements(By.xpath(button1));
        console.log(msg);
    }
    else if(meld.match("factuur mag geen lege waarde bevatten..")){
        var msg = "        error dialog gevonden! factuur mag geen lege waarde bevatten.."
        check1 = await driver.findElements(By.xpath(button1));
        check3 = await driver.findElements(By.xpath(button3));
        console.log(msg+result);
    }
    else if(meld.match("Verslaglegging t.b.v. tellen resultaat moet nog worden ingevuld met een passiva rekening.")){
        var msg = "        error dialog gevonden! Verslaglegging t.b.v. tellen resultaat moet nog worden ingevuld met een passiva rekening."
        check3 = await driver.findElements(By.xpath(button3));
        await this.clickmod(button3)                 
        await driver.switchTo().frame('obj_report_index'); 
        await this.clickmod("//select[@id='ALLEENGRBSALDO']")
        await this.clickmod("//select[@id='ALLEENGRBSALDO']//option[@value='N']"),Key.RETURN;
        await driver.switchTo().defaultContent();  
        console.log(msg+result);
        return 
    }
    else if(meld.match("Er is nog geen dagboek ingevuld.")){
        var msg = "        error dialog gevonden! Er is nog geen dagboek ingevuld."
        check1 = await driver.findElements(By.xpath(button1));
        console.log(msg+result);
    }
    else if(meld.match("Er zijn nog onverwerkte bankafschriftregels. Hierdoor is de administratie niet actueel.")){
        var msg = "        error dialog gevonden! Er zijn nog onverwerkte bankafschriftregels. Hierdoor is de administratie niet actueel."
        check4 = await driver.findElements(By.xpath(button4));
        console.log(msg+result);
    }
    else if(meld.match("Uw sessie is uitgelogd, log opnieuw in!")){
        var msg = "        error dialog gevonden! Uw sessie is uitgelogd, log opnieuw in!"
        await this.clickmod(button3)
        console.log("Error! sessie uitgelogd bij => "+result);  
        exit(2)
    }
    else if(meld.match("Er kon tijdelijk geen verbinding gemaakt worden met de Factuur2KING 3.0-server.")){
        var msg = "ERROR dialog gevonden! Er kon tijdelijk geen verbinding gemaakt worden met de Factuur2KING 3.0-server."
        check1 = await driver.findElements(By.xpath(button1));
        console.log(msg+result);
    }
    else if(meld.match("Aantal opgegeven waarden komt niet overeen met aantal opgegeven velden")){
        var msg = "error dialog gevonden! Aantal opgegeven waarden komt niet overeen met aantal opgegeven velden " + " => WI23360 <= "
        check1 = await driver.findElements(By.xpath(button1));
        console.log(msg+result);
    }
    else if(meld.match("Geen invoer gevonden.")){
        var msg = "error dialog gevonden! Geen invoer gevonden." + " => WI24497 <= "
        check1 = await driver.findElements(By.xpath(button1));
        console.log(msg+result);
    }
    else if(meld.match("Er zijn in deze administratie geen openstaande posten van crediteuren gevonden, die nog moeten worden gefiatteerd.")){
        var msg = "   error dialog gevonden! Er zijn in deze administratie geen openstaande posten van crediteuren gevonden, die nog moeten worden gefiatteerd."
        check1 = await driver.findElements(By.xpath(button1));
        console.log(msg+result);
    }
    else if(meld.match("De objectverwijzing is niet op een exemplaar van een object ingesteld.")){
        var msg = "ERROR dialog gevonden! De objectverwijzing is niet op een exemplaar van een object ingesteld."
        console.log("=> !WARNING! <= " +msg +" <=>"+ result);
        //await driver.switchTo().defaultContent();
        return

    }
    else{
        console.log("ERROR catch dialog geen match gevonden.")
        console.log(meld);  
        return
    }

    if(check1 != 0){
        await this.clickmod(button1)
    }
    else if (check2 != 0){
        await this.clickmod(button2)
    }
    else if (check3 != 0){
        await this.clickmod(button3)
    }
    else if (check4 != 0){
        await this.clickmod(button4)
    }
    else{
        console.log( "geen sluit button gevonden" )
        await this.ESCAPEfunction();
    }
}

async catchDialogBS(dialog, result) {
    "probeer hier verschillende meldingen te plaatsen "
    "error melding die verschijnt nadat je op de cmenu klik. met rode titel header"
    // await driver.wait(until.elementLocated(By.xpath(dialog)), 2000);
    var meld = await driver.findElement(By.xpath(dialog)).getText();
    var button = "//div[@class='dialogcorner bs']//button[.='Sluiten']"
    var button2 = "//button[@name='button_top_report_sluiten_doorstart']"
    var button3 = "//input[@value='Sluiten']"

    if (meld.match("U heeft bij de selecties gekozen om geen recapitulatie staat af te drukken. Er zijn geen aanmaningen om af te drukken.")){
        var msg = "        dialogBS gevonden! U heeft bij de selecties gekozen om geen recapitulatie staat af te drukken."
        console.log(msg +" <=>"+ result);
    }
    else if(meld.match("Uw opgegeven selecties leveren geen gegevens op.")){
        var msg = "        dialogBS gevonden! Opgegeven selectie levert geen gegevens op?"
        console.log(msg +" <=>"+ result);
    }
    else if(meld.match("Controleer de instellingen en pas eventueel uw selecties aan.")){
        var msg = "        dialogBS gevonden! Controleer de instellingen en pas eventueel uw selecties aan."
        console.log(msg +" <=>"+ result);
    }
    else if(meld.match("Geen invoer gevonden.")){
        var msg = "        dialogBS gevonden! Geen invoer gevonden."
        console.log(msg +" <=>"+ result);
    }
    else if(meld.match("Het rapport 'Proef-/saldibalans op datum' kan niet worden gemaakt.")){
        var msg = "        dialogBS gevonden! Het rapport 'Proef-/saldibalans op datum' kan niet worden gemaakt."
        console.log(msg +" <=>"+ result);
    }
    else if(meld.match("Er zijn geen ''btw-aangiftes'' aanwezig, afdrukken wordt beÃ«indigd.")){
        var msg = "        dialogBS gevonden! Er zijn geen ''btw-aangiftes'' aanwezig, afdrukken wordt beÃ«indigd."
        console.log(msg +" <=>"+ result);
    }
    else if(meld.match("Er wordt geen gebruik gemaakt van fiatteren betalingen.")){
        var msg = "        dialogBS gevonden! Er wordt geen gebruik gemaakt van fiatteren betalingen."
        console.log(msg +" <=>"+ result);
    }
    else if(meld.match("Er zijn geen debiteuren waarbij het veld 'Factoring' is ingesteld")){
        var msg = "        dialogBS gevonden! Er zijn geen debiteuren waarbij het veld 'Factoring' is ingesteld"
        console.log(msg +" <=>"+ result);
    }
    else if(meld.match("In deze administratie wordt gebruik gemaakt van verkooporders, dit rapport kan hierdoor niet worden geprint.")){
        var msg = "        dialogBS gevonden! In deze administratie wordt gebruik gemaakt van verkooporders, dit rapport kan hierdoor niet worden geprint."
        console.log(msg +" <=>"+ result);
    }
    else if(meld.match("Er zijn geen ''btw-aangiftes'' aanwezig, afdrukken wordt beëindigd.")){
        var msg = "        dialogBS gevonden! Er zijn geen ''btw-aangiftes'' aanwezig, afdrukken wordt beëindigd."
        console.log(msg +" <=>"+ result);
    }
    else if(meld.match("Het rapport 'Afdrukken retourbericht' kan niet worden gemaakt.")){
        var msg = "        dialogBS gevonden! Het rapport 'Afdrukken retourbericht' kan niet worden gemaakt."
        console.log(msg +" <=>"+ result);
    }
    else if(meld.match("Het rapport 'Incassobestand' kan niet worden gemaakt.")){
        var msg = "        dialogBS gevonden! Het rapport 'Incassobestand' kan niet worden gemaakt."
        console.log(msg +" <=>"+ result);
    }
    else if(meld.match("Deze zijn waarschijnlijk al verwerkt, verwijderd of nog niet ingelezen.")){
        var msg = "        dialogBS gevonden! Er zijn geen onverwerkte ..... gevonden"
        console.log(msg +" <=>"+ result);
        await this.clickmod(button3)
        return
    }
    else if(meld.match("De objectverwijzing is niet op een exemplaar van een object ingesteld.")){
        var msg = "        dialogBS gevonden! De objectverwijzing is niet op een exemplaar van een object ingesteld."
        console.log("=> !WARNING! <= " +msg +" <=>"+ result);
        await driver.switchTo().defaultContent();
        await this.clickmod(button2)
        // await driver.switchTo().frame('obj_report');
        await exit(2)
        return 
    }
    else if(meld.match("Het rapport 'iMUIS rapport' kan niet worden gemaakt.")){
        var msg = "        dialogBS gevonden! Het rapport 'iMUIS rapport' kan niet worden gemaakt. WI-24342"
        console.log("=> !WARNING! <= " +msg +" <=>"+ result);
        await driver.switchTo().defaultContent();
        await this.clickmod(button2)
        // await driver.switchTo().frame('obj_report');
        await exit(2)
        return 
    }
    else{
        console.log("=> !WARNING! <= catch dialogBS geen match gevonden.")
        console.log(meld +" <=>"+ result); 
    }

    var check1 = await driver.findElements(By.xpath(button));
    // await driver.sleep(2000);
    if(check1 != 0){
        "controle op de button in Dialog BS" 
        await this.clickmod(button)
    }
    else {
        "waarschijnlijk geen knop aanwezig in de DialogBS klik op de doorstart button"
        await driver.switchTo().defaultContent();
        await this.clickmod(button2)
    } 
}

async menuVerkoop() {  
    let sidemenu = "//div[@class='bar_content']//div[@title='Verkoop']"
    let innersidebar = "//div[@class='title_inner text_material'][.='Verkoop']"
    let buffersidebar = innersidebar + "//following-sibling::div[1]"

    "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
    await this.clickmod(sidemenu)
    var target = await driver.findElement(By.xpath(buffersidebar)).getAttribute('id') 
    var Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
    var Upscroll = "(//div[@id='jqxScrollAreaUppanel"+target+"verticalScrollBar'])[1]"
    await LinkerMenu.dropdown(buffersidebar)
    await this.scrollup(Upscroll )
    await this.clickmod(sidemenu)

    var result = await ExtractPage.ExtractSidemenu(buffersidebar);
    //console.log(result)
    //console.log(result.length)
    await this.openMODclose(result, sidemenu, innersidebar, Scrolldown, );
}

async menuFinancetab() {  
    let sidemenu = "//div[@class='bar_content']//div[@title='Financieel']"
    let innersidebar = "//div[@class='title_inner text_material'][.='Financieel']"
    let buffersidebar = innersidebar + "//following-sibling::div[1]"

    "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
    await this.clickmod(sidemenu)
    var target = await driver.findElement(By.xpath(buffersidebar)).getAttribute('id') 
    var Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
    var Upscroll = "(//div[@id='jqxScrollAreaUppanel"+target+"verticalScrollBar'])[1]"

    "menu openklappen"
    await LinkerMenu.dropdown(buffersidebar, Scrolldown, Upscroll, )
    await this.scrollup(Upscroll )
    await this.clickmod(sidemenu)

    var result2 = await ExtractPage.ExtractSidemenu(buffersidebar);
    "let op bij deze is de regel <1 empty item>, tweede extract is deze weg even vragen hoe dit zit"
    var result = await ExtractPage.extractTabellen(result2,);
    // console.log(result)
    console.log(result.length)

    await this.openMODclose(result, sidemenu, innersidebar, Scrolldown, );

}

async menuFinanceRap() {  
    let sidemenu = "//div[@class='bar_content']//div[@title='Financieel']"
    let innersidebar = "//div[@class='title_inner text_material'][.='Financieel']"
    let buffersidebar = innersidebar + "//following-sibling::div[1]"

    "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
    await this.clickmod(sidemenu)
    var target = await driver.findElement(By.xpath(buffersidebar)).getAttribute('id') 
    var Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
    var Upscroll = "(//div[@id='jqxScrollAreaUppanel"+target+"verticalScrollBar'])[1]"

    "menu openklappen"
    await LinkerMenu.dropdown(buffersidebar, Scrolldown, Upscroll, )
    await this.scrollup(Upscroll )
    await this.clickmod(sidemenu)
    
    var result2 = await ExtractPage.ExtractSidemenu(buffersidebar);
    "Voor smoketest zullen pdf gescheiden worden, wanneer bepaald wordt hoe dan een seperaat script maken. "
    var result = await ExtractPage.extractRapporten(result2,);
    // console.log(result)
    //console.log(result.length)
    await this.openMODclose(result, sidemenu, innersidebar, Scrolldown, );
}

async menuFinance() {  
    let sidemenu = "//div[@class='bar_content']//div[@title='Financieel']"
    let innersidebar = "//div[@class='title_inner text_material'][.='Financieel']"
    let buffersidebar = innersidebar + "//following-sibling::div[1]"

    "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
    await this.clickmod(sidemenu)
    var target = await driver.findElement(By.xpath(buffersidebar)).getAttribute('id') 
    var Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
    var Upscroll = "(//div[@id='jqxScrollAreaUppanel"+target+"verticalScrollBar'])[1]"

    "menu openklappen"
    await LinkerMenu.dropdown(buffersidebar, Scrolldown, Upscroll, )
    await this.scrollup(Upscroll )
    await this.clickmod(sidemenu)

    "filter resultaat die door de mod script moet"
    var result3 = await ExtractPage.ExtractSidemenu(buffersidebar);
    var result2 = await ExtractPage.filterRapporten(result3,);
    var result = await ExtractPage.filterTabellen(result2);
    // console.log(result)
    console.log(result.length)
    await this.openMODclose(result, sidemenu, innersidebar, Scrolldown, );
}

async menuInkoop() {  
    let sidemenu = ("//div[@class='bar_content']//div[@title='Inkoop']")
    let innersidebar = "//div[@class='title_inner text_material'][.='Inkoop']"
    let buffersidebar = innersidebar + "//following-sibling::div[1]"

    "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
    await this.clickmod(sidemenu)
    var target = await driver.findElement(By.xpath(buffersidebar)).getAttribute('id') 
    const Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
    const Upscroll = "(//div[@id='jqxScrollAreaUppanel"+target+"verticalScrollBar'])[1]"
    await LinkerMenu.dropdown(buffersidebar)
    await this.scrollup(Upscroll )
    await this.clickmod(sidemenu)

    var result = await ExtractPage.ExtractSidemenu(buffersidebar);
    // console.log(result)
    // console.log(result.length)
    await this.openMODclose(result, sidemenu, innersidebar, Scrolldown, );
}

async menuCRM() {  
    let sidemenu = "//div[@class='bar_content']//div[@title='Relatiebeheer']"
    let innersidebar = "//div[@class='title_inner text_material'][.='Relatiebeheer']"
    let buffersidebar = innersidebar + "//following-sibling::div[1]"

    "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
    await this.clickmod(sidemenu)
    var target = await driver.findElement(By.xpath(buffersidebar)).getAttribute('id') 
    var Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
    var Upscroll = "(//div[@id='jqxScrollAreaUppanel"+target+"verticalScrollBar'])[1]"

    await LinkerMenu.dropdown(buffersidebar)
    await this.clickmod(sidemenu)
    let result = await ExtractPage.ExtractSidemenu(buffersidebar);

    //console.log(result)
    //console.log(result.length)

    await this.openMODclose(result, sidemenu, innersidebar, Scrolldown, )
}

async MenuUren() {  
    let sidemenu = ("//div[@class='bar_content']//div[@title='Uren']")
    let innersidebar = "//div[@class='title_inner text_material'][.='Uren']"
    let buffersidebar = innersidebar + "//following-sibling::div[1]"

    await this.clickmod(sidemenu)
    await LinkerMenu.dropdown(buffersidebar)
    await this.clickmod(sidemenu)

    var result = await ExtractPage.ExtractSidemenu(buffersidebar);
    // console.log(result)
    // console.log(result.length)

    await this.openMODclose(result, sidemenu, innersidebar, )
}



}
module.exports = new Regression();
