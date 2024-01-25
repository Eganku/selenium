const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const fs = require('fs');
const FunctionsPage = require('../Page/functions.page.js');
const ReviewUserPage = require('../Page/review.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const HomePage = require('../Page/home.page.js');
const ExtractPage = require('../Page/ExtractArray.page.js');
const linkermenuPage = require('../Page/linkermenu.page.js');

"winglight wingbasis wingplus wingpdf beheer "
async function example(){
var test =[]

await ReviewUserPage.beheer(555);
test[0] = await Menuitems()
console.log(test[0])
await HomePage.logoutuser();

await ReviewUserPage.wingpdf(555);
test[1] = await Menuitems()
console.log(test[1])
await HomePage.logoutuser();

await ReviewUserPage.wingplus(555);
test[2] = await Menuitems()
console.log(test[2])
await HomePage.logoutuser();

await ReviewUserPage.wingbasis(555);
test[3] = await Menuitems()
console.log(test[3])
await HomePage.logoutuser();

await ReviewUserPage.winglight(555);
test[4] = await Menuitems()
console.log(test[4])
await HomePage.logoutuser();

console.log(test)

};
example()

    async function Menuitems(){

        let file01 = await FileInlezen('path..\\..\\Menutest\\VerwHoofdItem.txt')
        let file02 = await FileInlezen('path..\\..\\Menutest\\VerwSubItem.txt')
        let file03 = await FileInlezen('path..\\..\\Menutest\\VerwSubApps.txt')
        let file04 = await FileInlezen('path..\\..\\Menutest\\VerwSubItemFinancieel.txt')
        
        let file06 = 'path..\\..\\Menutest\\MenuNotIncludLight.txt'
        let file07 = 'path..\\..\\Menutest\\MenuNotIncludBasis.txt'
        let file08 = 'path..\\..\\Menutest\\MenuNotIncludPlus.txt'
        let file09 = 'path..\\..\\Menutest\\MenuNotIncludPro.txt'
        let file10 = 'path..\\..\\Menutest\\MenuNotIncludAcc.txt'

    await LinkerMenu.gotoAbonnement();
    await driver.switchTo().frame('i_app');
        await driver.sleep(2000);
        await FunctionsPage.verifyContainer("//div[@class='dialogcorner bs']", "Mijn gegevens Sluiten");
        let abonnement = await driver.findElement(By.xpath("(//div[@id='mijnmodules_actief']//td[@class='bold'])[1]")).getText();
        console.debug("Abonnement actief ==> "+(abonnement)+" <==");
        await driver.findElement(By.xpath("//button[@name='knop_sluiten']")).click();
    await driver.switchTo().defaultContent();

    "script kiest naar aanleiding van gevonden abonnement"
    if(abonnement.match("KING Finance Lite")){
        "BeheerTopMenu, CRM, Inkoop, Verkoop, Uren, Connect, Speedboeks, KingApps, Beheer, KingApps, Dashboard, Financieel"
        var verwachtewaardes = [5,0,0,0,0,3,2,12,143,4,174]  
        var IgnoreFile = await FileInlezen(file06)     
        let checker = arr => arr.every(Boolean);

        await Mainsub();
        await FinancieelDropdown()

        let result = []
        result[0] = await Listingdropdown(verwachtewaardes)
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
            "BeheerTopMenu, CRM, Inkoop, Verkoop, Uren, Connect, Speedboeks, KingApps, Beheer, KingApps, Dashboard, Financieel"
            var verwachtewaardes = [5,0,0,44,0,3,2,14,143,6,253]  
            var IgnoreFile = await FileInlezen(file07)
            let checker = arr => arr.every(Boolean);

            await Mainsub();
            await Verkoopsub();
            await FinancieelDropdown()

            let result = []
            result[0] = await Listingdropdown(verwachtewaardes)
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
            "BeheerTopMenu, CRM, Inkoop, Verkoop, Uren, Connect, Speedboeks, KingApps, Beheer, KingApps, Dashboard, Financieel"
            var verwachtewaardes = [5,8,0,52,0,3,2,14,143,6,334]
            var IgnoreFile = await FileInlezen(file08)
            let checker = arr => arr.every(Boolean);

            await CRMsub();
            await Verkoopsub();
            await Mainsub();
            await FinancieelDropdown()

            let result = []
            result[0] = await Listingdropdown(verwachtewaardes)
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
            "BeheerTopMenu, CRM, Inkoop, Verkoop, Uren, Connect, Speedboeks, KingApps, Beheer, KingApps, Dashboard, Financieel"
            var verwachtewaardes = [5,8,32,56,0,3,2,14,143,6,375]   
            var IgnoreFile = await FileInlezen(file09)
            let checker = arr => arr.every(Boolean);

            await CRMsub();
            await Inkoopsub();
            await Verkoopsub();
            await Mainsub();
            await FinancieelDropdown()
          
            let result = []
            result[0] = await Listingdropdown(verwachtewaardes)
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
            "BeheerTopMenu, CRM, Inkoop, Verkoop, Uren, Connect, Speedboeks, KingApps, Beheer, KingApps, Dashboard, Financieel"
            let verwachtewaardes = [5,8,34,58,6,3,2,17,143,6,378]    
            let IgnoreFile = await FileInlezen(file10)
            let checker = arr => arr.every(Boolean);

            await CRMsub();
            await Inkoopsub();
            await Verkoopsub();
            await Urensub();
            await Mainsub();
            await FinancieelDropdown()

            let result = []
            result[0] = await Listingdropdown(verwachtewaardes)
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
            console.debug("'Error' aantal gevonden subitem "+Listing+" in "+Naam+" klopt niet met verwachte aantal "+verwachtewaardes)
            return false
        }
    }

    async function FileInlezen(file) { 
        var ingelezen = [];
        try {
            var ingelezen = fs.readFileSync(file, 'utf8').split('\r\n')       
        } catch (err) {
            console.error("ERROR file niet ingelezen "+file);
            return false
        }
        return ingelezen
    }

    async function ExtractKID(verwachtfile, xpath, Naam, ) { 
        // console.log(Naam);
        var Listing = (await driver.findElements(By.xpath(xpath))).length;
        // console.log(parseInt(Listing)+ " <= Menu item" + Naam);
        var KID = [];
        var HTML = [];
        var finalxpath =[];
            for(var i=1; i<=Listing; i++){
                KID[i] = await driver.findElement(By.xpath("("+xpath+")["+i+"]")).getAttribute("k_id"); 
                HTML[i] = await driver.findElement(By.xpath("("+xpath+")["+i+"]")).getAttribute("innerText");  
                // console.log(KID[i]);
                // console.log(HTML[i]);
                var xpath2 = xpath.slice(0, -1)
                finalxpath[i] = xpath2+"='"+KID[i]+"']"+"[contains(text(),"+'"'+ HTML[i] +'"'+")]"
                // console.log(finalxpath[i])
            }         
        var result = await FunctionsPage.IncludeCheck(verwachtfile, finalxpath,Naam );
        // console.log(result)
        return result
    }

    async function ExtractAttribute(verwachtfile, xpath, Name, attribute ) { 
        // console.log(Name);
        var Listing = (await driver.findElements(By.xpath(xpath))).length;
        // console.log(parseInt(Listing)+ " <= Menu item" + Name);
        var naam = [];
        var finalxpath =[];
            for(var i=1; i<=Listing; i++){
                naam[i] = await driver.findElement(By.xpath("("+xpath+")["+i+"]")).getAttribute(attribute);  
                //console.log(naam[i]);
                var xpath2 = xpath.slice(0, -1);
                finalxpath[i] = xpath2+"="+'"'+naam[i]+'"'+"]"
                // console.log(finalxpath[i])
            }
        var result = await FunctionsPage.IncludeCheck(verwachtfile, finalxpath, Name);
        return result         
    }

    async function ExtractInnerHTML(verwachtfile, xpath, Naam, ) { 
        // console.log(Naam);
        var Listing = (await driver.findElements(By.xpath(xpath))).length;
        // console.log(parseInt(Listing)+ " <= Menu item" + Naam);
        var naam = [];
        var finalxpath =[];
            for(var i=1; i<=Listing; i++){
                naam[i] = await driver.findElement(By.xpath("("+xpath+")["+i+"]")).getAttribute("innerText");  
                //console.log(naam[i]);
                var xpath2 = xpath.slice(0, -1)
                finalxpath[i] = xpath2+"]"+"[contains(text(),"+'"'+naam[i]+'"'+")]"
                // console.log(finalxpath[i])
            }
        var result = await FunctionsPage.IncludeCheck(verwachtfile, finalxpath,Naam);
        return result
    }

    async function Listingdropdown(verwachtewaardes,) { 
        var checker = arr => arr.every(Boolean);
        var aantal =[]
        aantal[0] = await ControleAantal(verwachtewaardes[0], "//div[@id='menu_beheerpagina']//div[@k_id]", "topmenubeheer dropdown") ;
        aantal[1] = await ControleAantal(verwachtewaardes[1], "//div[@class='title_inner text_material'][.='Relatiebeheer']//following-sibling::div[1]//div[@k_id]", "CRM Submenu") ;
        aantal[2] = await ControleAantal(verwachtewaardes[2], "//div[@class='title_inner text_material'][.='Inkoop']//following-sibling::div[1]//div[@k_id]", "Inkoop Submenu") ;
        aantal[3] = await ControleAantal(verwachtewaardes[3], "//div[@class='title_inner text_material'][.='Verkoop']//following-sibling::div[1]//div[@k_id]", "verkoop Submenu") ;
        aantal[4] = await ControleAantal(verwachtewaardes[4], "//div[@class='title_inner text_material'][.='Uren']//following-sibling::div[1]//div[@k_id]", "Uren Submenu") ;
        aantal[5] = await ControleAantal(verwachtewaardes[5], "//div[@class='title_inner text_material'][.='KING Connect']//following-sibling::div[1]//div[@k_id]", "King Connect Submenu") ;
        aantal[6] = await ControleAantal(verwachtewaardes[6], "//div[@class='title_inner text_material'][.='Speedbooks Rapportage']//following-sibling::div[1]//div[@k_id]", "Speedbooks Submenu") ;
        aantal[7] = await ControleAantal(verwachtewaardes[7], "//div[@class='title_inner text_material'][.='Beheer']//following-sibling::div[1]//div[@k_id]", "Beheer linkermenu") ;

        await driver.switchTo().frame('i_app');
        aantal[8] = await ControleAantal(verwachtewaardes[8], "//div[@class='row-appstore']//div[@appnaam]", "KING Apps") ;
        await driver.switchTo().defaultContent();
        aantal[9] = await ControleAantal(verwachtewaardes[9], "//div[@id='d_menu']//li[@anker]", "Dashboard") ;
        aantal[10] = await ControleAantal(verwachtewaardes[10], "//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id]", "Financieel Submenu") ;

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
        var include =[]
        include[0] = await ExtractAttribute(file01, "//div[@id='settings_menu']//span[@id][@title]", "SettingsMenu", "title") ;
        include[1] = await ExtractKID(file01, "//div[@id='menu_beheerpagina']//div[@k_id]", "HeaderMenubeheer",) ;
        include[2] = await ExtractAttribute(file01, "//div[@id='d_menu']//li[@anker]", "Dashboard", "anker") ;
        include[3] = await ExtractInnerHTML(file01, "//div[@class='bar_content']//span[@class='icon_text text_material']", "Sidebar") ;

        include[4] = await ExtractKID(file02, "//div[@class='title_inner text_material'][.='Relatiebeheer']//following-sibling::div[1]//div[@k_id]", "CRM dropdown") ;
        include[5] = await ExtractKID(file02, "//div[@class='title_inner text_material'][.='Inkoop']//following-sibling::div[1]//div[@k_id]", "Inkoop dropdown") ;
        include[6] = await ExtractKID(file02, "//div[@class='title_inner text_material'][.='Verkoop']//following-sibling::div[1]//div[@k_id]", "verkoop dropdown") ;
        include[7] = await ExtractKID(file02, "//div[@class='title_inner text_material'][.='Uren']//following-sibling::div[1]//div[@k_id]", "Uren dropdown") ;
        include[8] = await ExtractKID(file02, "//div[@class='title_inner text_material'][.='KING Connect']//following-sibling::div[1]//div[@k_id]", "King Connect Submenu") ;
        include[9] = await ExtractKID(file02, "//div[@class='title_inner text_material'][.='Speedbooks Rapportage']//following-sibling::div[1]//div[@k_id]", "Speedbooks Submenu") ;
        include[10] = await ExtractKID(file02, "//div[@class='title_inner text_material'][.='Beheer']//following-sibling::div[1]//div[@k_id]", "Beheer linkermenu") ;
        
        await driver.switchTo().frame('i_app');
        include[11] = await ExtractAttribute(file03, "//div[@class='row-appstore']//div[@appnaam]", "KING Apps","appnaam" ) ;
        await driver.switchTo().defaultContent();
        include[12] =  await ExtractKID(file04, "//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id]", "Financieel Submenu") ;

        // console.log(include)
        if (checker(include) != true) {
            console.log("ERROR 'menuitems' gevonden die niet in 'expected file' zit")
            return false
        }
        else {          
            // console.log("geen fouten in resultaat include?")
            return true
        }
    }

    async function Ignoretest(IgnoreFile, file01, file02, file03, file04) { 
        "Ignore check wordt gedaan in function"
        var checker = arr => arr.every(Boolean);
        var Ignoretest = []
        Ignoretest[0] = (await FunctionsPage.Ignorecheck(file01, IgnoreFile, "Maincheck op ignore")!= 0);
        Ignoretest[1] = (await FunctionsPage.Ignorecheck(file02, IgnoreFile, "Subitems check op ignore")!= 0);
            await driver.switchTo().frame('i_app');
        Ignoretest[2] = (await FunctionsPage.Ignorecheck(file03, IgnoreFile, "King Apps check op Ignore")!= 0);
            await driver.switchTo().defaultContent();
        Ignoretest[3] = (await FunctionsPage.Ignorecheck(file04, IgnoreFile, "Sub Financieel check op ignore")!= 0);
        // return Ignoretest;
        //console.log(Ignoretest)
        if (checker(Ignoretest) != true) {
            console.log("ERROR item uit de 'Expected' list zit Niet in ignore file.")
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
        var Excludetest = []
        Excludetest[0] = (await FunctionsPage.Excludecheck(file01, IgnoreFile, "Maincheck op exclude")!= 0);
        Excludetest[1] = (await FunctionsPage.Excludecheck(file02, IgnoreFile, "Subitems check op exclude")!= 0);
        await driver.switchTo().frame('i_app');
        Excludetest[2] = (await FunctionsPage.Excludecheck(file03, IgnoreFile, "King Apps check op Exclude")!= 0);
        await driver.switchTo().defaultContent();
        Excludetest[3] = (await FunctionsPage.Excludecheck(file04, IgnoreFile, "Sub Financieel check op exclude")!= 0);  
        // return Excludetest;
        // console.log(Excludetest)
        if (checker(Excludetest) != true) {
            console.log("ERROR actieve Menuitem gevonden die in de ignore lijst staan?")
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

        await LinkerMenu.VerifySideMenu("//div[@class='bar_content']//div[@title='Beheer']", "Beheer");
        await LinkerMenu.VerifySideMenu("//div[@class='title_inner text_material'][.='Beheer']//following-sibling::div[1]//div[contains(text(),'Administratie-instellingen')]", "Administratie-instellingen");
        await LinkerMenu.VerifySideMenu("//div[@class='title_inner text_material'][.='Beheer']//following-sibling::div[1]//div[@k_id='mod_tabellen']", "Tabellen / Stamgegevens");

        "King apps "
        await LinkerMenu.VerifySideMenu("//div[@class='bar_content']//div[@title='KING Apps']", "KING Apps");
        await driver.switchTo().frame('i_app');
        await LinkerMenu.VerifySideMenu("//div[@id='d_appstore']//button[.='Alles']", "Alles");
        await driver.switchTo().defaultContent();
    }

    async function CRMsub() { 
        "CRM dropdown"
        await LinkerMenu.VerifySideMenu("//div[@class='bar_content']//div[@title='Relatiebeheer']", "CRM");
        await LinkerMenu.VerifySideMenu("//div[@class='title_inner text_material'][.='Relatiebeheer']//following-sibling::div[1]//div[@k_id='mod_tabellen']", "Tabellen / Stamgegevens");
        await LinkerMenu.VerifySideMenu("//div[@class='title_inner text_material'][.='Relatiebeheer']//following-sibling::div[1]//div[@k_id='mod_cre']", "Crediteuren");
        await LinkerMenu.VerifySideMenu("//div[@class='title_inner text_material'][.='Relatiebeheer']//following-sibling::div[1]//div[@k_id='mod_deb']", "Debiteuren");
    }

    async function Inkoopsub() { 
        "Inkoop dropdown"
        await LinkerMenu.VerifySideMenu("//div[@class='bar_content']//div[@title='Inkoop']", "Inkoop");
        await LinkerMenu.VerifySideMenu("//div[@class='title_inner text_material'][.='Inkoop']//following-sibling::div[1]//div[@k_id='mod_tabellen']", "Tabellen / Stamgegevens");
        await LinkerMenu.VerifySideMenu("//div[@class='title_inner text_material'][.='Inkoop']//following-sibling::div[1]//div[@k_id='mod_instellingen']", "Instellingen");
        await LinkerMenu.VerifySideMenu("//div[@class='title_inner text_material'][.='Inkoop']//following-sibling::div[1]//div[@k_id='web_rapporten']", "Rapporten");
        await LinkerMenu.VerifySideMenu("//div[@class='title_inner text_material'][.='Inkoop']//following-sibling::div[1]//div[@k_id='mod_info']", "Informatie");
    }

    async function Verkoopsub() { 
        "verkoop dropdown"
        await LinkerMenu.VerifySideMenu("//div[@class='bar_content']//div[@title='Verkoop']", "Verkoop");
        await LinkerMenu.VerifySideMenu("//div[@class='title_inner text_material'][.='Verkoop']//following-sibling::div[1]//div[@k_id='mod_tabellen']", "Tabellen / Stamgegevens");
        await LinkerMenu.VerifySideMenu("//div[@class='title_inner text_material'][.='Verkoop']//following-sibling::div[1]//div[@k_id='mod_extratabellen']", "Extra tabellen");
        await LinkerMenu.VerifySideMenu("//div[@class='title_inner text_material'][.='Verkoop']//following-sibling::div[1]//div[@k_id='mod_instellingen']", "Instellingen");
        await LinkerMenu.VerifySideMenu("//div[@class='title_inner text_material'][.='Verkoop']//following-sibling::div[1]//div[@k_id='web_rapporten']", "Rapporten");
        await LinkerMenu.VerifySideMenu("//div[@class='title_inner text_material'][.='Verkoop']//following-sibling::div[1]//div[@k_id='mod_info']", "Informatie");
    }

    async function Urensub() { 
        "verkoop dropdown"
        await LinkerMenu.VerifySideMenu("//div[@class='bar_content']//div[@title='Uren']", "Uren");
        await LinkerMenu.VerifySideMenu("//div[@class='title_inner text_material'][.='Uren']//following-sibling::div[1]//div[@k_id='mod_tabellen']", "Tabellen / Stamgegevens");
    }

    async function RapportenPlusSub() { 
        const downscroll ="(//div[@id='jqxScrollAreaDownpanelbar_buffersidebar_menuitem_1verticalScrollBar'])[1]"

        "onderste deel rapportenplus, let op lijst klikt steeds de onderste aan"
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id=''][contains(text(),'Rapporten Plus')]", "Rapporten Plus");

        await clickuntil("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_1183'][contains(text(),'Factuurregister')]",downscroll);
        await clickuntil("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_1196'][contains(text(),'Verkoop')]",downscroll);
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_1190'][contains(text(),'Inkoop')]", "Inkoop");

        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_1155'][contains(text(),'Contracten')]", "Contracten");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_860'][contains(text(),'Verkoop')]", "Verkoop");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_981'][contains(text(),'Verkoop')]", "Verkoop");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_916'][contains(text(),'Offerte')]", "Offerte");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_794'][contains(text(),'Inkoop')]", "Inkoop");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_850'][contains(text(),'Inkoopprojectbudgetten')]", "Inkoopprojectbudgetten");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_727'][contains(text(),'Voorraad')]", "Voorraad");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_786'][contains(text(),'Voorraadhistorie')]", "Voorraadhistorie");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_682'][contains(text(),'Artikelen/werksoorten')]", "Artikelen/werksoorten");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_722'][contains(text(),'Prijzen')]", "Prijzen");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_717'][contains(text(),'Stamgegevens')]", "Stamgegevens");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_593'][contains(text(),'Samenstellen rekeningschema')]", "Samenstellen rekeningschema")

        "bovenste zichtbare deel raporten plus,let op lijst klikt steeds de onderste aan "
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_513'][contains(text(),'Budgetten')]", "Budgetten");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_499'][contains(text(),'Projecten: Kostenplaats/Kostendrager')]", "Projecten: Kostenplaats/Kostendrager");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_467'][contains(text(),'Bankieren')]", "Bankieren");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_449'][contains(text(),'Activa-register')]", "Activa-register");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_442'][contains(text(),'Transitorische boekingen')]", "Transitorische boekingen");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_364'][contains(text(),'BTW')]", "BTW");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_171'][contains(text(),'Financieel')]", "Financieel");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_350'][contains(text(),'Rapportages')]", "Rapportages");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_327'][contains(text(),'Controles')]", "Controles");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_323'][contains(text(),'Vreemde valuta')]", "Vreemde valuta");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_309'][contains(text(),'Crediteur')]", "Crediteur");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_285'][contains(text(),'Debiteur')]", "Debiteur");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_254'][contains(text(),'Grootboek')]", "Grootboek");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_245'][contains(text(),'Stamgegevens')]", "Stamgegevens");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_70'][contains(text(),'Algemeen')]", "Algemeen");
    }

    async function RapportenPlusSub2() { 
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id=''][contains(text(),'Rapporten Plus')]", "Rapporten Plus");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_467'][contains(text(),'Bankieren')]", "Bankieren");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_364'][contains(text(),'BTW')]", "BTW");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_171'][contains(text(),'Financieel')]", "Financieel");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_309'][contains(text(),'Crediteur')]", "Crediteur");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_285'][contains(text(),'Debiteur')]", "Debiteur");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_254'][contains(text(),'Grootboek')]", "Grootboek");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radsub_245'][contains(text(),'Stamgegevens')]", "Stamgegevens");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='radrap_70'][contains(text(),'Algemeen')]", "Algemeen");
    }

    async function Financieelsub() { 
        const upscroll = "(//div[@id='jqxScrollAreaUppanelbar_buffersidebar_menuitem_1verticalScrollBar'])[1]"
       
        await clickuntil("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_wkd'][contains(text(),'Onkostendeclaratie')]",upscroll);
        // await clickuntil("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_budgetten'][contains(text(),'Budgetteren')]",upscroll);
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_wkr'][contains(text(),'Werkkostenregeling')]", "Werkkostenregeling");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_inl'][contains(text(),'Inlezen')]", "Inlezen");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_webonverwerkt'][contains(text(),'Onverwerkte tabellen')]", "Onverwerkte tabellen");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_lonen'][contains(text(),'Lonen')]", "Lonen");

        // await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_btwaangifte'][contains(text(),'BTW-aangifte')]", "BTW-aangifte");
        await clickuntil("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_btwaangifte'][contains(text(),'BTW-aangifte')]",upscroll);
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_tbinl'][contains(text(),'Bankieren')]", "Bankieren");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_tbinl']//ancestor::li//div[@k_id='mod_tabellen']", "Tabellen / Stamgegevens");
        await clickuntil("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_digdossier'][contains(text(),'Digitaal dossier')]",upscroll);
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_budgetten'][contains(text(),'Budgetteren')]", "Budgetteren");
        // await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_wkd'][contains(text(),'Onkostendeclaratie')]", "Onkostendeclaratie");     
        // await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_digdossier'][contains(text(),'Digitaal dossier')]", "Digitaal dossier");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_activaregister'][contains(text(),'Activa-register')]", "Activa-register");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_versl'][contains(text(),'Verslaglegging')]", "Verslaglegging");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_versl']//ancestor::li//div[@k_id='web_rapporten']", "Rapporten");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_versl']//ancestor::li//div[@k_id='mod_tabellen']", "Tabellen / Stamgegevens");
        
        "Vanaf Pro"
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_vreemdevaluta'][contains(text(),'Vreemde valuta')]", "Vreemde valuta");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_vreemdevaluta']//ancestor::li//div[@k_id='web_rapporten']", "Rapporten");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_vreemdevaluta']//ancestor::li//div[@k_id='mod_tabellen']", "Tabellen / Stamgegevens");
                
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_grb'][contains(text(),'Grootboek')]", "Grootboek");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_exporteren'][contains(text(),'Exporteren')]", "Exporteren");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_grb']//ancestor::li//div[@k_id='web_rapporten']", "Rapporten");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_grb']//ancestor::li//div[@k_id='mod_tabellen']", "Tabellen / Stamgegevens");
    
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_cre'][contains(text(),'Crediteuren')]", "Crediteur");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_cre']//ancestor::li//div[@k_id='web_rapporten']", "Rapporten");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='rapport_webfiocoppo']", "Openstaande posten");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_cre']//ancestor::li//div[@k_id='mod_tabellen']", "Tabellen / Stamgegevens");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_medewerker'][contains(text(),'Medewerker')]", "Medewerker");
    
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_deb'][contains(text(),'Debiteuren')]", "Debiteur");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_aanmaning'][contains(text(),'Aanmaningen')]", "Aanmaningen");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_deb']//ancestor::li//div[@k_id='web_rapporten']", "Rapporten");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='rapport_webfiodoppo']", "Openstaande posten");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_deb']//ancestor::li//div[@k_id='mod_tabellen']", "Tabellen / Stamgegevens");
    
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_ublinkoopfactuur'][contains(text(),'Factuur2KING 3.0')]", "Factuur2KING 3.0");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='webublcloudarchief']//ancestor::li//div[@k_id='mod_tabellen']", "Tabellen / Stamgegevens");
    
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id=''][contains(text(),'Overige dossierstukken')]", "Overige dossierstukken");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id=''][contains(text(),'Inkoopfacturen')]", "Inkoopfacturen");
    }

    async function FinancieelDropdown() { 
        const innersidemenu = "//div[@id='bar_buffersidebar_menuitem_1']"
        await LinkerMenu.FinancieelSideMenu();
        await LinkerMenu.dropdown(innersidemenu);
    }

    async function clickuntil(element, button, ) { 
        while (true){
            try {
                await driver.wait(until.elementLocated(By.xpath(element)),2000);
                // await driver.findElement(By.xpath(button)).click();
                await driver.findElement(By.xpath(element)).click();
                break
            }
            catch(NoSuchElementException){
                await driver.findElement(By.xpath(button)).click();
                //await driver.findElement(By.xpath(button)).click();
            }
        }
    }

    async function addlast(file, id,) { 
        const add =[]
        for(var i=0; i<(file.length); i++){
            if (file[i].includes(id)){
                add[i] = "("+file[i]+")[last()]"
            //await driver.sleep(1000);
            }
            else{
                add[i] = file[i]
            }
        }
        return add
    }

    async function clickIntoViewport(element, Scrolldown ) { 
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
                    await driver.sleep(250);
                    }
                    catch(NoSuchElementException){
                    }    
                }
            }
        }
    }  