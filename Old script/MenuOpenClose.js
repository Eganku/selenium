const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const ReviewUserPage = require('../Page/review.user.page.js');
const DemoUserPage = require('../Page/demo.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const ExtractPage = require('../Page/ExtractArray.page.js');
const divconfirm = require('../Page/divconfirm.page.js');
const Regression = require('../Page/divconfirm.page.js');
const divalert = require('../Page/divalert.page.js');
const fs = require('fs');

async function example(){

// await DemoUserPage.wing(555);
// await ReviewUserPage.wingacc(555);
await ReviewUserPage.wingpdf(555);
const file05 = await ExtractPage.FileInlezen('path..\\..\\Menutest\\Sluitknoppen.txt')

console.log("=> => dit is een test script niet live gebruiken <= <=");
"let op alleen te gebruiken voor de tabbelen en rapporten file"

// await menuCRM(file05);
await menuInkoop(file05);
// await menuFinanceRap(file05);

// await menuVerkoop(file05);
// await MenuUren(file05);

};
example()

async function menuVerkoop(Closefile ) {  
    const sidemenu = "//div[@class='bar_content']//span[@class='icon_text text_material'][contains(text(),'Verkoop')]"
    const innersidemenu = "//div[@class='title_inner text_material'][.='Verkoop']//following-sibling::div[1]"
       
    "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
    await clickmod(sidemenu)
    var target = await driver.findElement(By.xpath(innersidemenu)).getAttribute('id') 
    var Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
    var Upscroll = "(//div[@id='jqxScrollAreaUppanel"+target+"verticalScrollBar'])[1]"
    await LinkerMenu.dropdown(innersidemenu)
    await scrollup(Upscroll )
    await clickmod(sidemenu)

    var result = await ExtractPage.ExtractSidemenu(innersidemenu);
    await openMODclose(result, sidemenu, Closefile, Scrolldown );

    }

async function menuFinanceRap(Closefile ) {  
    const sidemenu = "//div[@class='bar_content']//span[@class='icon_text text_material'][contains(text(),'Financieel')]"
    const innersidemenu = "//div[@class='title_inner text_material'][.='Financieel']//following-sibling::div[1]"
       
    "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
    await clickmod(sidemenu)
    var target = await driver.findElement(By.xpath(innersidemenu)).getAttribute('id') 
    var Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
    var Upscroll = "(//div[@id='jqxScrollAreaUppanel"+target+"verticalScrollBar'])[1]"
    await LinkerMenu.dropdown(innersidemenu)
    await scrollup(Upscroll )
    await clickmod(sidemenu)

    // var result = await ExtractPage.ExtractSidemenu(innersidemenu);

    var result2 = await ExtractPage.ExtractSidemenu(innersidemenu);
    var result = await ExtractPage.extractRapporten(result2,);

    await openMODclose(result, sidemenu, Closefile, Scrolldown );
}

async function menuInkoop(Closefile ) {  
    const sidemenu = ("//div[@class='bar_content']//span[@class='icon_text text_material'][contains(text(),'Inkoop')]")
    const innersidemenu = "//div[@class='title_inner text_material'][.='Inkoop']//following-sibling::div[1]"

    "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
    await clickmod(sidemenu)
    var target = await driver.findElement(By.xpath(innersidemenu)).getAttribute('id') 
    const Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
    const Upscroll = "(//div[@id='jqxScrollAreaUppanel"+target+"verticalScrollBar'])[1]"
    await LinkerMenu.dropdown(innersidemenu)
    await scrollup(Upscroll )
    await clickmod(sidemenu)

    var result = await ExtractPage.ExtractSidemenu(innersidemenu);
    await openMODclose(result, sidemenu, Closefile, Scrolldown );
}

async function menuCRM(Closefile, ) {  
    let sidemenu = ("//div[@class='bar_content']//span[@class='icon_text text_material'][contains(text(),'CRM')]")
    let innersidemenu = "//div[@class='title_inner text_material'][.='Relatiebeheer']//following-sibling::div[1]"
 
    await clickmod(sidemenu)
    await LinkerMenu.dropdown(innersidemenu)
    await clickmod(sidemenu)

    let result = await ExtractPage.ExtractSidemenu(innersidemenu);
    await openMODclose(result,sidemenu,Closefile )
}

async function MenuUren(Closefile, ) {  
    const sidemenu = ("//div[@class='bar_content']//span[@class='icon_text text_material'][contains(text(),'Uren')]")
    const innersidemenu = "//div[@class='title_inner text_material'][.='Uren']//following-sibling::div[1]"

    await clickmod(sidemenu)
    await LinkerMenu.dropdown(innersidemenu)
    await clickmod(sidemenu)

    var result = await ExtractPage.ExtractSidemenu(innersidemenu);
    await openMODclose(result,sidemenu,Closefile )
}

async function openMODclose(result,sidemenu,Closefile,Scrolldown, ) { 
    "result zijn de menu items"
    let checksucceed = []
    let checkfailed = []
    for(let i=1; i<(result.length); i++){
        await clickmod(sidemenu,);
        await clickIntoViewport(result[i],Scrolldown); 
        await driver.sleep(1000);
        let checkDialog = await driver.findElements(By.xpath("//div[@role='dialog']"));

        try {

            if(checkDialog != 0){
                "warning error meldingen met dialog"
                await catchDialogerror("//div[@role='dialog']", result[i] )
            }

            else if (result[i].includes("k_id='web")){
                if(result[i].includes("k_id='webrelatie")){
                    "warning error meldingen met dialog"
                    await catchDialogerror("//div[@role='dialog']", result[i] )
                    console.log("second check")
                }
                else if (result[i].includes("k_id='webimuisreport")){
                    await Rapportest(result[i])
                    
                }
                else if (result[i].includes("k_id='webinkordintro")){
                    await sluiteniframe(Closefile, result[i] );  
                    await sluiteniframe(Closefile, result[i] ); 
                }
                else{
                    await sluiteniframe(Closefile, result[i] );  
                }
            }

            else if (result[i].includes("k_id='tabellen")){
                    if (result[i].includes("k_id='tabellen_webbas")){   
                    "edit table wordt direct opgeroepen bij deze menuitems. "      
                    await driver.wait(until.elementLocated(By.xpath("(//form[@method='post']/parent::div[@id])[last()]")),5000);
                    let checkEditTable = await driver.findElement(By.xpath("(//form[@method='post']/parent::div[@id])[last()]")).getAttribute('id');
                    await driver.sleep(1000);
                    await TrycatchESCAPE("//div[@id='"+checkEditTable+"']//button[@id='knop_sluiten']")
                }
                else{
                    // await tabellen()
                    await sluiten(Closefile,result[i]); 
                }
            }

            else if (result[i].includes("k_id='rapport_web")){ 
                if (result[i].includes("k_id='rapport_webreltkvoortg")){
                    console.log("skip deze")
                    await ESCAPEfunction();
                    await ESCAPEfunction();
                }
                else if (result[i].includes("k_id='rapport_webfimdaanm_")){               
                await sluiteniframe(Closefile,result[i]);
                }
                else{
                "sluiten zit in fucntie"
                await Rapportest(result[i])
                }
            }

            else if (result[i].includes("k_id='info")){
                await sluiten(Closefile,result[i]);
            }

            else{
                console.log("deze nog niet gecategoriseerd.. "+result[i])
                await sluiten(Closefile,result[i]);
            }

            let id = await driver.findElement(By.xpath(result[i])).getAttribute("k_id");
            console.log("ok menuitem met k_id => "+id)
            checksucceed[i] = result[i];

        }
        catch(NoSuchElementException){
            checkfailed[i] = result[i];
            console.log("nope =>"+result[i])
        }
    }
    console.log(checkfailed)
    if (checkfailed != 0)  {
    return checkfailed
    }
}

async function Rapportest(result) {
    await driver.sleep(2000);     
    await driver.switchTo().frame('obj_report_index');  
    let error = await driver.findElements(By.xpath("//div[@class='dialog_errorheader']")); 
    await driver.switchTo().defaultContent();
    let cmask = await driver.findElements(By.xpath("//div[@class='c-mask is-active']"));   
    
    if (error != 0){    
        await driver.switchTo().frame('obj_report_index'); 
            "errormelding in cmask rechtermenu. "
            await driver.wait(until.elementLocated(By.xpath("//div[@class='dialog_errorheader']")), 2000);
            // var meld = await driver.findElement(By.xpath("//div[@class='dialog_errorheader']")).getText();
            console.log("   Error errorheader! geen regels gevonden voor rapport => "+ result)
            await clickmod("//input[@value='Sluiten']");
            await driver.sleep(2000);
        await driver.switchTo().defaultContent();
        return;
    }

    if (cmask != 0){
        await driver.switchTo().frame('obj_report_index'); 
        await clickmod("//input[@id='knop_submit']")
        await driver.sleep(2000);     
        await driver.switchTo().defaultContent();

        "na submit moet er een check op dialog error melding dus."
        let checkDialog = await driver.findElements(By.xpath("//div[@role='dialog']"));
        // console.log((checkDialog != 0));
        if(checkDialog != 0){
            "wegklikken van gevonden dialog => hoofdscherm. "
            await catchDialogerror("//div[@role='dialog']", result)
            "Na wegklikken linkermenu nog aan controleert of rechtermenu nog actief is"
            let cmask2 = await driver.findElements(By.xpath("//div[@class='c-mask is-active']"));   
            if (cmask2 != 0){
                await clickmod("//button[@class='c-menu__close']");
            }
            else{
            await clickmod("//button[@id='button_top_report_sluiten_doorstart']");
            return
            }
        }
    }
    else{
        "deze is aanwezig omdat er soms automatisch op de submit knop wprdt gedrukt."
        console.log("no cmask")
        await pdfparam(result)
        return
    }
    // console.log("no if's")
    await pdfparam(result)
    return
}

async function pdfparam(result) { 
    // await driver.sleep(2000);
    await driver.wait(until.elementLocated(By.xpath("//button[@id='button_top_report_sluiten_doorstart']")));
    "controle op oude of nieuwe pdfloader"
    // await driver.switchTo().frame('obj_report_index');  
    // console.log("pdfparams")
    let checkDialogCBS = await driver.findElements(By.xpath("//div[@class='dialogcorner bs']"));
    console.log(checkDialogCBS != 0)
    if(checkDialogCBS != 0){
        console.log("hiermoet error melding gemaakt wordenin de pdfparam" +result)
        await clickmod("//button[@name='button_top_report_sluiten_doorstart']");
        return
    }

    let objreport = await driver.findElements(By.xpath("//object[@id='obj_report']"));
    console.log(objreport != 0)
    let canvas = await driver.findElements(By.xpath("//canvas[@id='report_canvas']"));
    console.log(canvas != 0)
    // await driver.switchTo().defaultContent();

    "gegevens halen uit de gooey"
    let meld = new URLSearchParams(await driver.findElement(By.xpath("//object[@id='obj_report']")).getAttribute('data'))
    console.log(meld)
    await driver.switchTo().frame('obj_report');    
        await driver.sleep(2000);
        let checkDialogCBS2 = await driver.findElements(By.xpath("//div[@class='dialogcorner bs']"));
        // console.log(checkDialogCBS2 != 0)
    await driver.switchTo().defaultContent();
    
    if(checkDialogCBS != 0){
        console.log("hiermoet error melding gemaakt wordenin de pdfparam" +result)
    }

    if(result.includes("k_id='rapport_web")){
        var rapport = meld.get('naam_rapport')
        var title = meld.get('PDF_TITEL')
        console.debug("     "+rapport+" <=> "+title  )   
    }
    
    if(result.includes("k_id='webimuisreport")){
        var REPORTNAME = meld.get('REPORTNAME')
        var titel_rapport = meld.get('titel_rapport')
        console.debug("     "+REPORTNAME+" <=> "+titel_rapport  )   
    }

    // await clickmod("//button[@id='button_top_report_sluiten_doorstart']");
    await clickmod("//button[@name='button_top_report_sluiten_doorstart']");
    // await clickmod("//button[@class='c-menu__close']");
    // await TrycatchESCAPE("//button[@id='button_top_report_sluiten_doorstart']");       
}

async function clickmod(element,) { 
    await driver.wait(until.elementLocated(By.xpath(element)));
    await driver.findElement(By.xpath(element)).click();
    await driver.sleep(1000);
}

async function clickIntoViewport(element, Scrolldown ) { 
    var target = await driver.findElements(By.xpath(element));
    if(target != true ){ 
        while(true){
            try {
                await driver.wait(until.elementLocated(By.xpath(element)),500);
                await driver.findElement(By.xpath(element)).click();
                await driver.sleep(1000);
                // console.log("gelukt hier");
                break
            }       
            catch(NoSuchElementException){
                try {
                await driver.findElement(By.xpath(Scrolldown)).click();
                //await driver.findElement(By.xpath(Scrolldown)).click();
                await driver.sleep(250);
                }
                catch(NoSuchElementException){
                }    
            }
        }
    }
} 

async function scrollup(Scroll) { 
    while(true){
        try {
            await driver.findElement(By.xpath(Scroll)).click();
        }       
        catch(NoSuchElementException){
            break
        }
    }
}

async function sluiteniframe(closefile, result) { 

    await driver.switchTo().frame('i_app');
        for(var i=0; i<(closefile.length); i++)  {
            try {
                await driver.wait(until.elementLocated(By.xpath(closefile[i])),500);
                await driver.findElement(By.xpath(closefile[i])).click();
                // console.log("button in i_app frame ==> "+closefile[i])
                var loop = true
                await driver.sleep(500);
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
                await driver.wait(until.elementLocated(By.xpath(closefile[i])),500);
                await driver.findElement(By.xpath(closefile[i])).click();
                // console.log("loop2 in sluiteniframe functie ==> "+closefile[i])
                var loop2 = true
                await driver.sleep(500);
                break
            }
            catch(NoSuchElementException){
            }
        }
    }

    if (loop2 === true) {
        // console.log("test"+loop)
        return true
    }
    else{
        console.log("sluit knop bestaat niet, of is niet opgegeven." +result)
    }
}

async function sluiten(closefile, result) { 
    for(var i=0; i<(closefile.length); i++)  {
        try {
            await driver.wait(until.elementLocated(By.xpath(closefile[i])),500);
            await driver.findElement(By.xpath(closefile[i])).click();
            // console.log("button in i_app frame ==> "+closefile[i])
            var loop = true
            await driver.sleep(500);
            break
        }
        catch(NoSuchElementException){
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
                await driver.wait(until.elementLocated(By.xpath(closefile[i])),500);
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
        // console.log("button zat in iframe =>"+ loop2)
        return true
    }
    else{
        console.log("sluit knop bestaat niet, of is niet opgegeven."+result[i])
    }
}

async function tabellen() {
    "menuitem met tabbelen id, eerste scherm"
    let dialog = "//div[@class='dialogcorner bs  gen_grd_screen']"
    let dialogDID = await driver.findElement(By.xpath(dialog)).getAttribute('id');
    let dialogName = await driver.findElement(By.xpath(dialog)).getAttribute('div_title');
    console.log("maintabel => "+dialogName+" "+dialogDID);
    let button = await ExtractPage.ExtractBtnTab(dialogDID);
    // console.log(button)
    
    let checksucceed = []  
    let checkfailed = []  
    for(let i=1; i<(button.length); i++){
        let maindropdown = "//button[@id='d_"+dialogDID+"_contentmenubtn_act']"
        await clickmod(maindropdown)
        await clickmod(button[i])
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
                console.log("subtabel => "+dialogName2+" "+dialogDID2); 
                let subbutton = await ExtractPage.ExtractBtnTab(dialogDID2);
                // console.log(subbutton); 
                await tabellensub(dialogDID2,subbutton)
                await clickmod("//div[@id='"+dialogDID2+"']//div[@title='Sluiten']");
            }

            else if(checkDialog != 0){
                "warning error meldingen met dialog"
                await catchDialogerror("//div[@role='dialog']",)
            }
            
            else if(button[i].includes("ZDKnop_Delete")){
                console.log("delete knop testen 2.0 versie")
            }

            else if(button[i].includes("ZDKnop_Vernummeren")){
                await FunctionsPage.verifyContainer("//div[@id='VERNUMMEREN']", "Vernummeren/samenvoegen",);
                await clickmod("//button[@id='ZDDoButtonVernumSluitenID']")
            }

            else if(button[i].includes("ZDKnop_Hist")){
                // await FunctionsPage.verifyContainer("//div[@id='div_gridhist']", "Historie/Audittrail",);
                // console.log("histori found.")
                await clickmod("//div[@id='div_gridhist']//div[@id='knop_sluiten_div_gridhist']")
            }

            else if(button[i].includes("ZDKnop_Kredietlimiet")){
                try{
                    await FunctionsPage.verifyContainer("//div[@id='div_ZDINFO2KREDLIM']", "Kredietlimiet ",);
                    await clickmod("//div[@id='div_ZDINFO2KREDLIM']//div[@id='knop_sluiten_div_ZDINFO2KREDLIM']");
                }
                catch(NoSuchElementException){
                    await divalert.Dialogwarning2("//div[@class='dialogcorner bs']", "Waarschuwing", "//input[@id='Btn_GetMelding_Sluiten']")
                    // await FunctionsPage.verifyContainer("//div[@class='dialogcorner bs']", "Waarschuwing",);
                    // await clickmod("//input[@id='Btn_GetMelding_Sluiten']")
                }
            }    

            else if(button[i].includes("ZDKnop_RelKaart")){
                await FunctionsPage.verifyContainer("//div[@id='d_relkaart']", "Relatiekaart",);
                await clickmod("//div[@id='d_relkaart']//div[@id='knop_sluiten_d_relkaart']")
            }

            else if(button[i].includes("ZDKnop_WDD")){
                await FunctionsPage.verifyContainer("//div[@id='d_wdd']", "Koppel een dossierstuk",);
                await clickmod("//div[@id='d_wdd']//div[@id='knop_sluiten_d_wdd']")
            }

            else {
                await driver.wait(until.elementLocated(By.xpath("(//form[@action='/review/tabel/edit_tabel.aspx']/parent::div[@id])[last()]")),5000);
                let checkEditTable = await driver.findElement(By.xpath("(//form[@action='/review/tabel/edit_tabel.aspx']/parent::div[@id])[last()]")).getAttribute('id');
                await driver.sleep(1000);
                // await clickmod("//div[@id='"+checkEditTable+"']//button[@id='knop_sluiten']")
                await TrycatchESCAPE("//div[@id='"+checkEditTable+"']//button[@id='knop_sluiten']")
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

async function tabellensub(dialogDID2,subbutton) {   
    "sub menu van de tabellen "
    let checksucceed = []  
    let checkfailed = []  
    for(let i=1; i<(subbutton.length); i++){

        let subdropdown = "//button[@id='d_"+dialogDID2+"_contentmenubtn_act']"
        await clickmod(subdropdown);
        await clickmod(subbutton[i]); 
        "controleer op dialog popup op het moment dat er op de content menu wordt geklikt."
        let checkDialog = await driver.findElements(By.xpath("//div[@role='dialog']"));
        let checkDialogCBS = await driver.findElements(By.xpath("//div[@id='d_ZDTabelKopieerAfs']"));
        let checkSCaanpas = await driver.findElements(By.xpath("//table[@id='gen_column_selection_buttonsd_"+dialogDID2+"_content']"));
        let checkSHistori = await driver.findElements(By.xpath("(//div[@id='knop_sluiten_div_gridhist'])[1]"));

        try {
            if(checkDialog != 0){
                "warning error meldingen met dialog"
                await catchDialogerror("//div[@role='dialog']",)
            }

            else if(checkSHistori != 0){
                // await FunctionsPage.verifyContainer("//div[@id='div_gridhist']", "Historie/Audittrail",);
                // console.log("hallo2")
                await clickmod("(//div[@id='knop_sluiten_div_gridhist'])[1]")
            }

            else if(checkDialogCBS != 0){
                "uitzondering van de kopie button specifiiek de prijsafspraken subbutton."
                await clickmod("//div[@id='d_ZDTabelKopieerAfs']//button[@id='ZDKnopSluiten']")
            }

            else if(checkSCaanpas != 0){
                "uitzondering op de selectie code aanpassen "
                // var checkaanpas = await driver.findElement(By.xpath("//table[@id='gen_column_selection_buttonsd_"+dialogDID2+"_content']")).getAttribute('id');
                // console.log(checkaanpas)
                await clickmod("//table[@id='gen_column_selection_buttonsd_"+dialogDID2+"_content']//button[.='Opslaan']")
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
                await clickmod("(//div[@id='knop_sluiten_div_gridhist'])[1]")
            }

            else if(subbutton[i].includes("ZDKnop_SendTbIncMandaat")){
                // await FunctionsPage.verifyContainer("//div[@id='div_tbincmandaat']", "Incasso machtigingregister",);
                await clickmod("//div[@id='div_tbincmandaat']//div[@id='knop_sluiten_div_tbincmandaat']")
            }

            else { 
                await driver.wait(until.elementLocated(By.xpath("(//form[@action='/review/tabel/edit_tabel.aspx']/parent::div[@id])[last()]")),5000);
                let checkEditTable2 = await driver.findElement(By.xpath("(//form[@action='/review/tabel/edit_tabel.aspx']/parent::div[@id])[last()]")).getAttribute('id');
                await driver.sleep(2000);
                // await clickmod("//div[@id='"+checkEditTable2+"']//button[@id='knop_sluiten']");
                await TrycatchESCAPE("//div[@id='"+checkEditTable2+"']//button[@id='knop_sluiten']", subbutton[i], dialogDID2)
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

async function KeyESCAPE(element,) { 
    "Escape functie ingebouwd eigenlijk een global sluit knop, moet nog functie om te bepalen of de scherm die je wilt sluiten ook gesloten is?"
    await driver.wait(until.elementLocated(By.xpath(element)));
    var body = await driver.findElement(By.xpath("(//body)[1]"));
    body.sendKeys(Key.ESCAPE);
    await driver.sleep(1000);
}

async function ESCAPEfunction() { 
    var body = await driver.findElement(By.xpath("(//body)[1]"));
    body.sendKeys(Key.ESCAPE);
    await driver.sleep(1000);
}

async function TrycatchESCAPE(element, subbutton, dialogDID2) { 
    try {
        await driver.wait(until.elementLocated(By.xpath(element)));
        // console.log("sluitbutton gevonden.")
        await clickmod(element);
    }
    catch(ElementClickInterceptedError){
        await ESCAPEfunction();
        console.log("Escape button gebruikt voor " +element )
    }
}

async function catchDialogerror(dialog, result) {
    "probeer hier verschillende meldingen te plaatsen "
    await driver.wait(until.elementLocated(By.xpath(dialog)), 2000);
    var meld = await driver.findElement(By.xpath(dialog)).getText();
    console.log(meld);

    if (meld.match("Er is geen regel geselecteerd.")){
        var msg = "error dialog gevonden! geen regel?"
        var button = "//div[@role='dialog']//button[.='OK']"
            // console.log(msg);
        //await clickmod(button)
    }

    else if(meld.match("Weet u zeker dat u dit item wilt verwijderen?")){
        var msg = "error dialog gevonden! Weet u zeker dat u dit item wilt verwijderen?"
        var button = "//div[@role='dialog']//button[.='Annuleren']"
            // console.log(msg);
        //await clickmod(button)
    }

    else if(meld.match("Uw opgegeven selecties leveren geen gegevens op.")){
        var msg = "error dialog gevonden! Opgegeven selectie levert geen gegevens op?"
        var button = "//div[@role='dialog']//button[.='OK']"
            // console.log(msg);
        //await clickmod(button)
    }

    else if(meld.match("Voor werksoorten wordt geen voorraad bijgehouden.")){
        var msg = "error dialog gevonden! Voor werksoorten wordt geen voorraad bijgehouden."
        var button = "//div[@role='dialog']//button[.='OK']"
            // console.log(msg);
        //await clickmod(button)
    }
    else if(meld.match("U bent geen lid van een groep. Zie de introductie van Relatiebeheer voor meer informatie.")){
        var msg = "error dialog gevonden! U bent geen lid van een groep. Zie de introductie van Relatiebeheer voor meer informatie."
        var button = "//div[@role='dialog']//button[.='OK']"
            // console.log(msg);
        //await clickmod(button)
    }
    
    else if(meld.match("Uw sessie is uitgelogd, log opnieuw in!")){
        var msg = "error dialog gevonden! Uw sessie is uitgelogd, log opnieuw in!"
        var button = "//button[normalize-space()='OK']"
        await clickmod(button)
        console.log("   Error! sessie uitgelogd bij => "+result);  
        exit(2)
    }

    else{
        console.log("error catch dialog geen match gevonden.")
        console.log(meld);  
    }

    await clickmod(button)

}
