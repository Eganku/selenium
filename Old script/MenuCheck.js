const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const fs = require('fs');
const FunctionsPage = require('../Page/functions.page.js');
const ReviewUserPage = require('../Page/review.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');

"winglight wingchat wingplus wingpdf beheer "
async function example(){

await ReviewUserPage.beheer(555);
await Menuitems()

};
example()

    async function Menuitems(){

        let file01 = await FileInlezen('..\\..\\Menutest\\VerwHoofdItem.txt')
        let file02 = await FileInlezen('..\\..\\Menutest\\VerwSubItem.txt')
        let file03 = await FileInlezen('..\\..\\Menutest\\VerwSubApps.txt')
        let file04 = await FileInlezen('..\\..\\Menutest\\VerwSubItemFinancieel.txt')
        
        let file06 = '..\\..\\Menutest\\MenuNotIncludLight.txt'
        let file07 = '..\\..\\Menutest\\MenuNotIncludBasis.txt'
        let file08 = '..\\..\\Menutest\\MenuNotIncludPlus.txt'
        let file09 = '..\\..\\Menutest\\MenuNotIncludPro.txt'
        let file10 = '..\\..\\Menutest\\MenuNotIncludAcc.txt'


    await LinkerMenu.gotoAbonnement();
    await driver.switchTo().frame('i_app');
        await driver.sleep(2000);
        await FunctionsPage.verifyContainer("//div[@class='dialogcorner bs']", "Mijn gegevens Sluiten");
        let abonnement = await driver.findElement(By.xpath("(//div[@id='mijnmodules_actief']//td[@class='bold'])[1]")).getText();
        console.debug("Gebruiker heeft "+ (abonnement));
        await driver.findElement(By.xpath("//button[@name='knop_sluiten']")).click();
    await driver.switchTo().defaultContent();

    "script kiest naar aanleiding van gevonden abonnement"
    if(abonnement.match("KING Finance Lite")){
        await Mainsub();
        await LinkerMenu.FinancieelSideMenu();
        await RapportenPlusSub2();
        await Financieelsub();

        "BeheerTopMenu, CRM, Inkoop, Verkoop, Uren, Connect, Speedboeks, KingApps, Beheer, KingApps, Dashboard, Financieel"
        var verwachtewaardes = [4,0,0,0,0,3,2,12,143,4,173]  
        var check00 = await Listingdropdown(verwachtewaardes);

        var IgnoreFile = await FileInlezen(file06)
        var check01 = await FunctionsPage.Ignorecheck(file01, IgnoreFile, "Maincheck op ignore");
        var check02 = await FunctionsPage.Excludecheck(file01, IgnoreFile, "Maincheck op exclude");
        var check03 = await FunctionsPage.Ignorecheck(file02, IgnoreFile, "Subitems check op ignore");
        var check04 = await FunctionsPage.Excludecheck(file02, IgnoreFile, "Subitems check op exclude");
        await driver.switchTo().frame('i_app');
        var check05 = await FunctionsPage.Ignorecheck(file03, IgnoreFile, "King Apps check op Ignore");
        var check06 = await FunctionsPage.Excludecheck(file03, IgnoreFile, "King Apps check op Exclude");
        await driver.switchTo().defaultContent();
        var check07 = await FunctionsPage.Ignorecheck(file04, IgnoreFile, "Sub Financieel check op ignore");
        var check08 = await FunctionsPage.Excludecheck(file04, IgnoreFile, "Sub Financieel check op exclude");
    
        let checker = arr => arr.every(Boolean);
        console.log("array aantallen kloppen " + (checker(check00)) );
        //console.log(((checker(check1)) == false));
        
        console.log("Fouten mainitems in ignore file? " + (check01 != 0) )
        console.log("Fouten mainitems  exlude file? " + (check02 != 0) )
        console.log("Fouten Subitems in ignore file? " + (check03 != 0) )
        console.log("Fouten Subitems in exlude file? " + (check04 != 0) )
        console.log("Fouten KINGapps in ignore file? " + (check05 != 0) )
        console.log("Fouten KINGapps in exlude file? " + (check06 != 0) )
        console.log("Fouten Subfinancieel in ignore file? " + (check07 != 0) )
        console.log("Fouten Subfinancieel in exlude file? " + (check08 != 0) )
        }

        else if(abonnement.match("KING Finance Basis")){
            await Mainsub();
            await Verkoopsub();
            await LinkerMenu.FinancieelSideMenu();
            await RapportenPlusSub();
            await Financieelsub();

            "BeheerTopMenu, CRM, Inkoop, Verkoop, Uren, Connect, Speedboeks, KingApps, Beheer, KingApps, Dashboard, Financieel"
            var verwachtewaardes = [5,0,0,44,0,3,2,14,143,6,252]  
            var check00 = await Listingdropdown(verwachtewaardes);
            var IgnoreFile = await FileInlezen(file07)
            
            var check01 = await FunctionsPage.Ignorecheck(file01, IgnoreFile, "Maincheck op ignorecheck");
            var check02 = await FunctionsPage.Excludecheck(file01, IgnoreFile, "Maincheck op exclude");
            var check03 = await FunctionsPage.Ignorecheck(file02, IgnoreFile, "Subitems check op ignorecheck");
            var check04 = await FunctionsPage.Excludecheck(file02, IgnoreFile, "Subitems check op exclude");
            await driver.switchTo().frame('i_app');
            var check05 = await FunctionsPage.Ignorecheck(file03, IgnoreFile, "King Apps check op ignorecheck");
            var check06 = await FunctionsPage.Excludecheck(file03, IgnoreFile, "King Apps check op Exclude");
            await driver.switchTo().defaultContent();
            var check07 = await FunctionsPage.Ignorecheck(file04, IgnoreFile, "Sub Financieel check op ignorecheck");
            var check08 = await FunctionsPage.Excludecheck(file04, IgnoreFile, "Sub Financieel check op exclude");
        
            let checker = arr => arr.every(Boolean);
            console.log("array aantallen kloppen " + (checker(check00)) );
            //console.log(((checker(check1)) == false));
            
            console.log("Fouten mainitems in ignore file? " + (check01 != 0) )
            console.log("Fouten mainitems  exlude file? " + (check02 != 0) )
            console.log("Fouten Subitems in ignore file? " + (check03 != 0) )
            console.log("Fouten Subitems in exlude file? " + (check04 != 0) )
            console.log("Fouten KINGapps in ignore file? " + (check05 != 0) )
            console.log("Fouten KINGapps in exlude file? " + (check06 != 0) )
            console.log("Fouten Subfinancieel in ignore file? " + (check07 != 0) )
            console.log("Fouten Subfinancieel in exlude file? " + (check08 != 0) )

        }

        else if(abonnement.match("KING Finance Plus")){
            await CRMsub();
            await Verkoopsub();
            await Mainsub();
            await LinkerMenu.FinancieelSideMenu();
            await RapportenPlusSub();
            await Financieelsub();

            "BeheerTopMenu, CRM, Inkoop, Verkoop, Uren, Connect, Speedboeks, KingApps, Beheer, KingApps, Dashboard, Financieel"
            var verwachtewaardes = [5,8,0,52,0,3,2,14,143,6,332]
            var check00 = await Listingdropdown(verwachtewaardes);
            var IgnoreFile = await FileInlezen(file08)

            var check01 = await FunctionsPage.Ignorecheck(file01, IgnoreFile, "Maincheck op ignore");
            var check02 = await FunctionsPage.Excludecheck(file01, IgnoreFile, "Maincheck op exclude");
            var check03 = await FunctionsPage.Ignorecheck(file02, IgnoreFile, "Subitems check op ignore");
            var check04 = await FunctionsPage.Excludecheck(file02, IgnoreFile, "Subitems check op exclude");
            await driver.switchTo().frame('i_app');
            var check05 = await FunctionsPage.Ignorecheck(file03, IgnoreFile, "King Apps check op Ignore");
            var check06 = await FunctionsPage.Excludecheck(file03, IgnoreFile, "King Apps check op Exclude");
            await driver.switchTo().defaultContent();
            var check07 = await FunctionsPage.Ignorecheck(file04, IgnoreFile, "Sub Financieel check op ignore");
            var check08 = await FunctionsPage.Excludecheck(file04, IgnoreFile, "Sub Financieel check op exclude");
        
            let checker = arr => arr.every(Boolean);
            console.log("array aantallen kloppen " + (checker(check00)) );
            //console.log(((checker(check1)) == false));
            
            console.log("Fouten mainitems in ignore file? " + (check01 != 0) )
            console.log("Fouten mainitems  exlude file? " + (check02 != 0) )
            console.log("Fouten Subitems in ignore file? " + (check03 != 0) )
            console.log("Fouten Subitems in exlude file? " + (check04 != 0) )
            console.log("Fouten KINGapps in ignore file? " + (check05 != 0) )
            console.log("Fouten KINGapps in exlude file? " + (check06 != 0) )
            console.log("Fouten Subfinancieel in ignore file? " + (check07 != 0) )
            console.log("Fouten Subfinancieel in exlude file? " + (check08 != 0) )

        }

        else if (abonnement.match("KING Finance Pro")){   
            await CRMsub();
            await Inkoopsub();
            await Verkoopsub();
            await Urensub();
            await Mainsub();
            await LinkerMenu.FinancieelSideMenu();
            await RapportenPlusSub();
            await Financieelsub();

            "BeheerTopMenu, CRM, Inkoop, Verkoop, Uren, Connect, Speedboeks, KingApps, Beheer, KingApps, Dashboard, Financieel"
            var verwachtewaardes = [5,8,32,56,0,3,2,14,143,6,374]   
            var check00 = await Listingdropdown(verwachtewaardes)
            var IgnoreFile = await FileInlezen(file09)
            
            var check01 = await FunctionsPage.Ignorecheck(file01, IgnoreFile, "Maincheck op ignore");
            var check02 = await FunctionsPage.Excludecheck(file01, IgnoreFile, "Maincheck op exclude");
            var check03 = await FunctionsPage.Ignorecheck(file02, IgnoreFile, "Subitems check op ignore");
            var check04 = await FunctionsPage.Excludecheck(file02, IgnoreFile, "Subitems check op exclude");
            await driver.switchTo().frame('i_app');
            var check05 = await FunctionsPage.Ignorecheck(file03, IgnoreFile, "King Apps check op Ignore");
            var check06 = await FunctionsPage.Excludecheck(file03, IgnoreFile, "King Apps check op Exclude");
            await driver.switchTo().defaultContent();
            var check07 = await FunctionsPage.Ignorecheck(file04, IgnoreFile, "Sub Financieel check op ignore");
            var check08 = await FunctionsPage.Excludecheck(file04, IgnoreFile, "Sub Financieel check op exclude");
        
            let checker = arr => arr.every(Boolean);
            console.log("array aantallen kloppen " + (checker(check00)) );
            //console.log(((checker(check1)) == false));
            
            console.log("Fouten mainitems in ignore file? " + (check01 != 0) )
            console.log("Fouten mainitems in exlude file? " + (check02 != 0) )
            console.log("Fouten Subitems in ignore file? " + (check03 != 0) )
            console.log("Fouten Subitems in exlude file? " + (check04 != 0) )
            console.log("Fouten KINGapps in ignore file? " + (check05 != 0) )
            console.log("Fouten KINGapps in exlude file? " + (check06 != 0) )
            console.log("Fouten Subfinancieel in ignore file? " + (check07 != 0) )
            console.log("Fouten Subfinancieel in exlude file? " + (check08 != 0) )

        }

        else if (abonnement.match("hoofdgebruiker beheer")){
            await CRMsub();
            await Inkoopsub();
            await Verkoopsub();
            await Urensub();
            await Mainsub();
            await LinkerMenu.FinancieelSideMenu();
            await RapportenPlusSub();
            await Financieelsub();
            
            "BeheerTopMenu, CRM, Inkoop, Verkoop, Uren, Connect, Speedboeks, KingApps, Beheer, KingApps, Dashboard, Financieel"
            var verwachtewaardes = [5,8,34,58,6,3,2,17,143,6,376]   
            var check00 = await Listingdropdown(verwachtewaardes)
            var IgnoreFile = await FileInlezen(file10)
            
            var check01 = await FunctionsPage.Ignorecheck(file01, IgnoreFile, "Maincheck op ignore");
            var check02 = await FunctionsPage.Excludecheck(file01, IgnoreFile, "Maincheck op exclude");
            var check03 = await FunctionsPage.Ignorecheck(file02, IgnoreFile, "Subitems check op ignore");
            var check04 = await FunctionsPage.Excludecheck(file02, IgnoreFile, "Subitems check op exclude");
            await driver.switchTo().frame('i_app');
            var check05 = await FunctionsPage.Ignorecheck(file03, IgnoreFile, "King Apps check op Ignore");
            var check06 = await FunctionsPage.Excludecheck(file03, IgnoreFile, "King Apps check op Exclude");
            await driver.switchTo().defaultContent();
            var check07 = await FunctionsPage.Ignorecheck(file04, IgnoreFile, "Sub Financieel check op ignore");
            var check08 = await FunctionsPage.Excludecheck(file04, IgnoreFile, "Sub Financieel check op exclude");
        
            let checker = arr => arr.every(Boolean);
            console.log("array aantallen kloppen " + (checker(check00)) );
            //console.log(((checker(check1)) == false));
            
            console.log("Fouten mainitems in ignore file? " + (check01 != 0) )
            console.log("Fouten mainitems in exlude file? " + (check02 != 0) )
            console.log("Fouten Subitems in ignore file? " + (check03 != 0) )
            console.log("Fouten Subitems in exlude file? " + (check04 != 0) )
            console.log("Fouten KINGapps in ignore file? " + (check05 != 0) )
            console.log("Fouten KINGapps in exlude file? " + (check06 != 0) )
            console.log("Fouten Subfinancieel in ignore file? " + (check07 != 0) )
            console.log("Fouten Subfinancieel in exlude file? " + (check08 != 0) )

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

    async function Listingdropdown(verwachtewaardes,) { 
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
        return aantal;
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

        await clickuntil("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_digdossier'][contains(text(),'Digitaal dossier')]",upscroll);
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_tbinl'][contains(text(),'Bankieren')]", "Bankieren");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_tbinl']//ancestor::li//div[@k_id='mod_tabellen']", "Tabellen / Stamgegevens");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_budgetten'][contains(text(),'Budgetteren')]", "Budgetteren");
        // await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_wkd'][contains(text(),'Onkostendeclaratie')]", "Onkostendeclaratie");
    


        // await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_digdossier'][contains(text(),'Digitaal dossier')]", "Digitaal dossier");
        await LinkerMenu.VerifySideMenuCont("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_activaregister'][contains(text(),'Activa-register')]", "Activa-register");

        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_versl'][contains(text(),'Verslaglegging')]", "Verslaglegging");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_versl']//ancestor::li//div[@k_id='web_rapporten']", "Rapporten");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_versl']//ancestor::li//div[@k_id='mod_tabellen']", "Tabellen / Stamgegevens");
        await LinkerMenu.VerifySideMenu("//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id='mod_btwaangifte'][contains(text(),'BTW-aangifte')]", "BTW-aangifte");
        
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
