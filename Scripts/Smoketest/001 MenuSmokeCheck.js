const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const fs = require('fs');
const FunctionsPage = require('../Page/functions.page.js');
const ReviewUserPage = require('../Page/review.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const HomePage = require('../Page/home.page.js');
const ExtractPage = require('../Page/ExtractArray.page.js');
const Readfile = require('../Page/readfile.page.js');
const XLSX = require('xlsx')


async function example(){
var admin = 350
var test =[]

await ReviewUserPage.beheer(admin);
test[0] = await Menuitems("Beheer")
await HomePage.logoutuser();

await ReviewUserPage.wingpdf(admin);
test[1] = await Menuitems("Pro")
await HomePage.logoutuser();

await ReviewUserPage.wingplus(admin);
test[2] = await Menuitems("Plus")
await HomePage.logoutuser();

await ReviewUserPage.wingbasis(admin);
test[3] = await Menuitems("Basis")
await HomePage.logoutuser();

await ReviewUserPage.winglight(admin);
test[4] = await Menuitems("Lite")
await HomePage.logoutuser();

await ReviewUserPage.wingtogether(admin);
test[5] = await Menuitems("Together")
await HomePage.logoutuser();

await driver.quit();

};
example()

async function Menuitems(user){

await LinkerMenu.gotoAbonnement();
await driver.switchTo().frame('i_app');
await driver.sleep(2000);
await FunctionsPage.verifyContainer("//div[@class='dialogcorner bs']", "Mijn gegevens Sluiten");
let abonnement = await driver.findElement(By.xpath("(//div[@id='mijnmodules_actief']//td[@class='bold'])[1]")).getText();
console.debug("Abonnement actief ==> "+(abonnement)+" <==");
await driver.findElement(By.xpath("//button[@name='knop_sluiten']")).click();
await driver.switchTo().defaultContent();

const excel =  "path\\..\\selenium\\Menutest\\menusmoketest.xlsx" 
const workbook = XLSX.readFile(excel);
const worksheet = workbook.Sheets["Expect"];
const worksheet2 = workbook.Sheets["MenuCount"];

let file01 = await Readfile.menuInlezenVink(worksheet, "A", "Mainitems")
let file02 = await Readfile.menuInlezenVink(worksheet, "A", "Subitems")
let file03 = await Readfile.menuInlezenVink(worksheet, "A", "KingApps")
let file04 = await Readfile.menuInlezenVink(worksheet, "A", "Financieel")

let IgnoreFile = await Readfile.ExcludeInlezen(worksheet, user, excel, "Expect", "Exclude")
let expected = await Readfile.CountInlezen(worksheet2, user, excel, "MenuCount",)
// console.log(IgnoreFile)
// console.log(expected)

    "script kiest naar aanleiding van gevonden abonnement"
    if(abonnement.match("KING Finance Lite")){
        let checker = arr => arr.every(Boolean);

        await Mainsub();
        await FinancieelDropdown()

        let result = []
        result[0] = await Listingdropdown(expected)
        result[1] = await Ignoretest(IgnoreFile, file01, file02, file03, file04,);
        result[2] = await Excludetest(IgnoreFile, file01, file02, file03, file04,);
        
        if (checker(result) != true) {
            console.log("ERROR testen zijn niet gepassed")
            return false
        }
        else {          
            // console.log("geen fouten in resultaat result?")
            return true
        }
    }

    else if(abonnement.match("KING Finance Basis")){
        let checker = arr => arr.every(Boolean);

        await Mainsub();
        await Verkoopsub();
        await FinancieelDropdown()

        let result = []
        result[0] = await Listingdropdown(expected)
        result[1] = await Ignoretest(IgnoreFile, file01, file02, file03, file04,);
        result[2] = await Excludetest(IgnoreFile, file01, file02, file03, file04,);

        if (checker(result) != true) {
            console.log("ERROR testen zijn niet gepassed")
            return false
        }
        else {          
            // console.log("geen fouten in resultaat result?")
            return true
        }
    }

    else if(abonnement.match("KING Finance Plus")){
        let checker = arr => arr.every(Boolean);

        await CRMsub();
        await Verkoopsub();
        await Mainsub();
        await FinancieelDropdown()

        let result = []
        result[0] = await Listingdropdown(expected)
        result[1] = await Ignoretest(IgnoreFile, file01, file02, file03, file04,);
        result[2] = await Excludetest(IgnoreFile, file01, file02, file03, file04,);

        if (checker(result) != true) {
            console.log("ERROR testen zijn niet gepassed")
            return false
        }
        else {          
            // console.log("geen fouten in resultaat result?")
            return true
        }
    }

    else if (abonnement.match("KING Finance Pro")){   
        let checker = arr => arr.every(Boolean);

        await CRMsub();
        await Inkoopsub();
        await Verkoopsub();
        await Mainsub();
        await FinancieelDropdown()
        
        let result = []
        result[0] = await Listingdropdown(expected)
        result[1] = await ExtractArrays(file01, file02, file03, file04,);
        result[1] = await Ignoretest(IgnoreFile, file01, file02, file03, file04,);
        result[2] = await Excludetest(IgnoreFile, file01, file02, file03, file04,);
        
        if (checker(result) != true) {
            console.log("ERROR testen zijn niet gepassed")
            return false
        }
        else {          
            // console.log("geen fouten in resultaat result?")
            return true
        }
    }

    else if (abonnement.match("hoofdgebruiker beheer")){
        let checker = arr => arr.every(Boolean);

        await CRMsub();
        await Inkoopsub();
        await Verkoopsub();
        await Urensub();
        await Mainsub();
        await FinancieelDropdown()

        let result = []
        result[0] = await Listingdropdown(expected)
        result[1] = await ExtractArrays(file01, file02, file03, file04,);
        result[2] = await Ignoretest(IgnoreFile, file01, file02, file03, file04,);
        result[3] = await Excludetest(IgnoreFile, file01, file02, file03, file04,);

        if (checker(result) != true) {
            console.log("ERROR testen zijn niet gepassed")
            return false
        }
        else {          
            // console.log("geen fouten in resultaat result?")
            return true
        }
    }

    else{
        console.debug("Geen matching profiel gevonden");
    return false
    }

}


async function ControleAantal(verwachtewaardes,xpath, Naam, ) { 
    var Listing = (await driver.findElements(By.xpath(xpath))).length;
    // console.log(parseInt(Listing)+ " <= Menu item" + Naam);
    if(verwachtewaardes == Listing){
        // console.debug("'Check' aantal subitem in "+Naam+" klopt") 
        return true
    }
    else {
        console.debug("   'Error' aantal gevonden subitem "+Listing+" in "+Naam+" klopt niet met verwachte aantal "+verwachtewaardes)
        return false
    }
}

async function Listingdropdown(verwachtewaardes,) { 
    var checker = arr => arr.every(Boolean);
    var aantal =[]
    aantal[0] = await ControleAantal(verwachtewaardes[1], "//div[@id='menu_beheerpagina']//div[@k_id]", "topmenubeheer dropdown") ;
    aantal[1] = await ControleAantal(verwachtewaardes[2], "//div[@class='title_inner text_material'][.='Relatiebeheer']//following-sibling::div[1]//div[@k_id]", "CRM Submenu") ;
    aantal[2] = await ControleAantal(verwachtewaardes[3], "//div[@class='title_inner text_material'][.='Inkoop']//following-sibling::div[1]//div[@k_id]", "Inkoop Submenu") ;
    aantal[3] = await ControleAantal(verwachtewaardes[4], "//div[@class='title_inner text_material'][.='Verkoop']//following-sibling::div[1]//div[@k_id]", "verkoop Submenu") ;
    aantal[4] = await ControleAantal(verwachtewaardes[5], "//div[@class='title_inner text_material'][.='Uren']//following-sibling::div[1]//div[@k_id]", "Uren Submenu") ;
    aantal[5] = await ControleAantal(verwachtewaardes[6], "//div[@class='title_inner text_material'][.='KING Connect']//following-sibling::div[1]//div[@k_id]", "King Connect Submenu") ;
    aantal[6] = await ControleAantal(verwachtewaardes[7], "//div[@class='title_inner text_material'][.='Speedbooks Rapportage']//following-sibling::div[1]//div[@k_id]", "Speedbooks Submenu") ;
    aantal[7] = await ControleAantal(verwachtewaardes[8], "//div[@class='title_inner text_material'][.='Beheer']//following-sibling::div[1]//div[@k_id]", "Beheer linkermenu") ;

    await driver.switchTo().frame('i_app');
    aantal[8] = await ControleAantal(verwachtewaardes[9], "//div[@class='row-appstore']//div[@appnaam]", "KING Apps") ;
    await driver.switchTo().defaultContent();
    aantal[9] = await ControleAantal(verwachtewaardes[10], "//div[@id='d_menu']//li[@anker]", "Dashboard") ;
    aantal[10] = await ControleAantal(verwachtewaardes[11], "//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id]", "Financieel Submenu") ;

    // console.log(aantal);
    if (checker(aantal) != true) {
        console.log("ERROR fouten in array listingcount?")
        return false
    }
    else {          
        // console.log("volgens mij kloppen alle controles."+(checker(aantal)))
        return true
    }
}

async function ExtractArrays(file01, file02, file03, file04) { 
    "include check wordt gedaan in function"
    var checker = arr => arr.every(Boolean);
    var innerbarVar = "//div[@class='title_inner text_material']"
    var innerbarFinancieel = "" 
    var include =[]
    include[0] = await ExtractPage.ExtractAttribute(file01, "//div[@id='settings_menu']//span[@id][@title]", "SettingsMenu", "title") ;
    include[1] = await ExtractPage.ExtractKID(file04, innerbarFinancieel,"//div[@id='bar_inner_sidebar_menuitem_1']", "Financieel Submenu") ;
    include[2] = await ExtractPage.ExtractAttribute(file01, "//div[@id='d_menu']//li[@anker]", "Dashboard", "anker") ;
    include[3] = await ExtractPage.ExtractInnerHTML(file01, "//div[@class='bar_content']//span[@class='icon_text text_material']", "Sidebar") ;

    
    include[4] = await ExtractPage.ExtractKID(file02, innerbarVar, "[.='Relatiebeheer']//following-sibling::div[1]", "CRM dropdown") ;
    include[5] = await ExtractPage.ExtractKID(file02, innerbarVar,  "[.='Inkoop']//following-sibling::div[1]", "Inkoop dropdown") ;
    include[6] = await ExtractPage.ExtractKID(file02, innerbarVar,  "[.='Verkoop']//following-sibling::div[1]", "verkoop dropdown") ;
    include[7] = await ExtractPage.ExtractKID(file02, innerbarVar, "[.='Uren']//following-sibling::div[1]", "Uren dropdown") ;
    include[8] = await ExtractPage.ExtractKID(file02, innerbarVar, "[.='KING Connect']//following-sibling::div[1]", "King Connect Submenu") ;
    include[9] = await ExtractPage.ExtractKID(file02, innerbarVar, "[.='Speedbooks Rapportage']//following-sibling::div[1]", "Speedbooks Submenu") ;
    include[10] = await ExtractPage.ExtractKID(file02, innerbarVar, "[.='Beheer']//following-sibling::div[1]", "Beheer linkermenu") ;
    
    await driver.switchTo().frame('i_app');
    include[11] = await ExtractPage.ExtractAttribute(file03, "//div[@class='row-appstore']//div[@appnaam]", "KING Apps","appnaam" ) ;
    await driver.switchTo().defaultContent();

    if (checker(include) != true) {
        console.log("ERROR 'Onbekende' menuitems gevonden maar niet in 'expected file' opgegeven. Deze kunnen nieuwe module zijn ")
        // console.log(include)
        return false
    }
    else {          
        // console.log("geen fouten in resultaat include?")
        return true
    }
}

async function Ignoretest(IgnoreFile, file01, file02, file03, file04) { 
    "Ignore check wordt gedaan in function"
    "Items worden getoetst of deze te vinden zijn in het gekozen abbonement."
    "vervolgens is er een ignore lijst die aangeeft of de NIET gevonden items correct zijn."
    var checker = arr => arr.every(Boolean);
    "exception on xpath due to variable prexpath"
    var innerbarVar = "//div[@class='title_inner text_material']"
    var innerbarconst = "" 

    var Ignoretest = []
    Ignoretest[0] = (await FunctionsPage.Ignorecheck(file01,innerbarconst, IgnoreFile, "Maincheck op ignore")!= 0);
    Ignoretest[1] = (await FunctionsPage.Ignorecheck(file02,innerbarVar, IgnoreFile, "Subitems check op ignore")!= 0);
        await driver.switchTo().frame('i_app');
    Ignoretest[2] = (await FunctionsPage.Ignorecheck(file03,innerbarconst, IgnoreFile, "King Apps check op Ignore")!= 0);
        await driver.switchTo().defaultContent();
    Ignoretest[3] = (await FunctionsPage.Ignorecheck(file04,innerbarconst, IgnoreFile, "Sub Financieel check op ignore")!= 0);
    // return Ignoretest;
    //console.log(Ignoretest)
    if (checker(Ignoretest) != true) {
        console.log("ERROR =>inactieve<= menuitems, maar niet aangegeven in ignore file. Item kan obsolete/uitgezet zijn, of instellingen van gebruiker." )
        return false
    }
    else {          
        // console.log("geen fouten in resultaat Ignoretest?")
        return true
    }
}

async function Excludetest(IgnoreFile, file01, file02, file03, file04) { 
    "exclude check wordt gedaan in function"
    var checker = arr => arr.every(Boolean);
    "exception on xpath due to variable prexpath"
    var innerbarVar = "//div[@class='title_inner text_material']"
    var innerbarconst = "" 

    var Excludetest = []
    Excludetest[0] = (await FunctionsPage.Excludecheck(file01, innerbarconst, IgnoreFile, "Maincheck op exclude")!= 0);
    Excludetest[1] = (await FunctionsPage.Excludecheck(file02, innerbarVar, IgnoreFile, "Subitems check op exclude")!= 0);
    await driver.switchTo().frame('i_app');
    Excludetest[2] = (await FunctionsPage.Excludecheck(file03, innerbarconst, IgnoreFile, "King Apps check op Exclude")!= 0);
    await driver.switchTo().defaultContent();
    Excludetest[3] = (await FunctionsPage.Excludecheck(file04, innerbarconst, IgnoreFile, "Sub Financieel check op exclude")!= 0);  
    // return Excludetest;
    // console.log(Excludetest)
    if (checker(Excludetest) != true) {
        console.log("ERROR =>actieve<= Menuitem gevonden die in de ignore lijst staan? ")
        return false
    }
    else {          
        // console.log("geen fouten in resultaat Excludetest?")
        return true
    }
}

async function Mainsub() { 
    await LinkerMenu.VerifySideMenu("//div[@id='settings_menu']//span[@title='Beheer']", "");
    await LinkerMenu.VerifySideMenu("//div[@class='bar_content']//div[@title='Favorieten']", "Favorieten");

    "King Connect & speedbooks"
    await LinkerMenu.VerifySideMenu("//div[@class='bar_content']//div[@title='KING Connect']", "KING Connect");
    await LinkerMenu.VerifySideMenu("//div[@class='bar_content']//div[@title='Speedbooks Rapportage']", "Speedbooks");
    
    "beheer sidemenu"
    await driver.wait(until.elementLocated(By.xpath("//div[@class='bar_content']")));
    
    let bardots = await driver.findElements(By.xpath("//div[@id='bar_dots'][contains(@style,'display: inline-grid;')]"));
    // console.log(bardots != 0)
    if (bardots != 0){
        await driver.wait(until.elementLocated(By.xpath("//div[@id='bar_dots']")));
        await driver.findElement(By.xpath("//div[@id='bar_dots']")).click();
        // await driver.sleep(1000);
    }
    
    const sidemenu = "(//div[@title='Beheer'])[last()]"
    // const sidemenu = "//div[@class='bar_content']//div[@title='Beheer']"
    const buffersidebar = "//div[@class='title_inner text_material'][.='Beheer']//following-sibling::div[1]"
    await clickmod(sidemenu)
    await LinkerMenu.dropdown(buffersidebar)

    "King apps "
    await LinkerMenu.VerifySideMenu("//div[@class='bar_content']//div[@title='KING Apps']", "KING Apps");
    await driver.switchTo().frame('i_app');
    await LinkerMenu.VerifySideMenu("//div[@id='d_appstore']//button[.='Alles']", "Alles");
    await driver.switchTo().defaultContent();
}

async function CRMsub() { 
    "CRM dropdown"
    let sidemenu = "//div[@class='bar_content']//div[@title='Relatiebeheer']"
    let buffersidebar = "//div[@class='title_inner text_material'][.='Relatiebeheer']//following-sibling::div[1]"
    await clickmod(sidemenu)
    await LinkerMenu.dropdown(buffersidebar)

}

async function Inkoopsub() { 
    "Inkoop dropdown"
    let sidemenu = ("//div[@class='bar_content']//div[@title='Inkoop']")
    let buffersidebar = "//div[@class='title_inner text_material'][.='Inkoop']//following-sibling::div[1]"

    "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
    await clickmod(sidemenu);
    await LinkerMenu.dropdown(buffersidebar);

}

async function Verkoopsub() { 
    "verkoop dropdown"  
    const sidemenu = "//div[@class='bar_content']//div[@title='Verkoop']"
    const buffersidebar = "//div[@class='title_inner text_material'][.='Verkoop']//following-sibling::div[1]"
    await clickmod(sidemenu)
    await LinkerMenu.dropdown(buffersidebar)

}

async function Urensub() { 
    "verkoop dropdown"
    const sidemenu = "//div[@class='bar_content']//div[@title='Uren']"
    const buffersidebar = "//div[@class='title_inner text_material'][.='Uren']//following-sibling::div[1]"
    await clickmod(sidemenu)
    await LinkerMenu.dropdown(buffersidebar)

}

async function FinancieelDropdown() { 
    const sidemenu = ("//div[@id='bar_content']//span[text()=' Financieel']")
    const buffersidebar = "//div[@id='bar_buffersidebar_menuitem_1']"

    "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
    var target = await driver.findElement(By.xpath(buffersidebar)).getAttribute('id') 
    var Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
    var Upscroll = "(//div[@id='jqxScrollAreaUppanel"+target+"verticalScrollBar'])[1]"

    await clickmod(sidemenu)
    // await LinkerMenu.FinancieelSideMenu();
    await LinkerMenu.dropdown(buffersidebar, Scrolldown, Upscroll);
}

async function clickmod(element,) { 
    await driver.wait(until.elementLocated(By.xpath(element)));
    // await driver.findElement(By.xpath(button)).click();
    await driver.findElement(By.xpath(element)).click();
    await driver.sleep(1000);
}

