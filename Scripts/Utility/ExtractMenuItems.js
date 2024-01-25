const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const ReviewUserPage = require('../Page/review.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const fs = require('fs');

async function example(){

let file01 = await FileInlezen('path\\..\\selenium\\Menutest\\VerwHoofdItem.txt')
let file02 = await FileInlezen('path\\..\\selenium\\Menutest\\VerwSubItem.txt')
let file03 = await FileInlezen('path\\..\\selenium\\Menutest\\VerwSubApps.txt')
let file04 = await FileInlezen('path\\..\\selenium\\Menutest\\VerwSubItemFinancieel.txt')

console.log("=> => dit is een extract script niet live gebruiken <= <=");
"let op alleen te gebruiken voor de verwachte file"
// await ReviewUserPage.wingpdf(555);
await ReviewUserPage.wingacc(555);
// await ReviewUserPage.Devpro(555);


// await CRMsub();
// await Inkoopsub();
// await Verkoopsub();
// await Urensub();
// await Mainsub();
// await RapportenPlusSub();
// await Financieelsub();

await FinancieelDropdown()

await ExtractKID(file04, "//div[@id='bar_inner_sidebar_menuitem_1']//div[@k_id]", "Financieel Submenu") ;
// await ExtractKID(file02, "//div[@class='title_inner text_material'][.='Uren']//following-sibling::div[1]//div[@k_id]", "Uren dropdown") ;
//var include = await ExtractArrays(file01, file02, file03, file04,);

return
let checker = arr => arr.every(Boolean);
console.log("resultaat extract " + (checker(include)) );
console.log(include)

};

example()

    async function ExtractArrays(file01, file02, file03, file04) { 
        "include check wordt gedaan in function"
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
        return include;
    }

    async function ExtractKID(verwachtfile, xpath, Naam, ) { 
        console.log(Naam);
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
                console.log(finalxpath[i])
            }         
        var result = await FunctionsPage.IncludeCheck(verwachtfile, finalxpath, Naam );
        return result
    }

    async function ExtractAttribute(verwachtfile, xpath, Name, attribute ) { 
        console.log(Name);
        var Listing = (await driver.findElements(By.xpath(xpath))).length;
        // console.log(parseInt(Listing)+ " <= Menu item" + Name);
        var naam = [];
        var finalxpath =[];
            for(var i=1; i<=Listing; i++){
                naam[i] = await driver.findElement(By.xpath("("+xpath+")["+i+"]")).getAttribute(attribute);  
                //console.log(naam[i]);
                var xpath2 = xpath.slice(0, -1);
                finalxpath[i] = xpath2+"="+'"'+naam[i]+'"'+"]"
                console.log(finalxpath[i])
            }
        var result = await FunctionsPage.IncludeCheck(verwachtfile, finalxpath, Name);
        return result         
    }

    async function ExtractInnerHTML(verwachtfile, xpath, Naam, ) { 
        console.log(Naam);
        var Listing = (await driver.findElements(By.xpath(xpath))).length;
        // console.log(parseInt(Listing)+ " <= Menu item" + Naam);
        var naam = [];
        var finalxpath =[];
            for(var i=1; i<=Listing; i++){
                naam[i] = await driver.findElement(By.xpath("("+xpath+")["+i+"]")).getAttribute("innerHTML");  
                //console.log(naam[i]);
                var xpath2 = xpath.slice(0, -1)
                finalxpath[i] = xpath2+"]"+"[contains(text(),"+'"'+naam[i]+'"'+")]"
                console.log(finalxpath[i])
            }
        var result = await FunctionsPage.IncludeCheck(verwachtfile, finalxpath,Naam);
        return result
    }

    async function FileInlezen(file) { 
        var ingelezen = [];
        try {
            var ingelezen = fs.readFileSync(file, 'utf8').split('\r\n')       
        } catch (err) {
            console.error("ERROR file niet ingelezen" +file);
            return false
        }
        return ingelezen
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

    async function clickmod(element,) { 
        await driver.wait(until.elementLocated(By.xpath(element)));
        // await driver.findElement(By.xpath(button)).click();
        await driver.findElement(By.xpath(element)).click();
        await driver.sleep(1000);
    }