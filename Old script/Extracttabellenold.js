const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const ReviewUserPage = require('../Page/review.user.page.js');
const DemoUserPage = require('../Page/demo.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const ExtractPage = require('../Page/ExtractArray.page.js');
const divconfirm = require('../Page/divconfirm.page.js');
const divalert = require('../Page/divalert.page.js');
const fs = require('fs');

async function example(){

// await DemoUserPage.wing(555);
await ReviewUserPage.beheer(555);

const file01 = await ExtractPage.FileInlezen('path..\\..\\Menutest\\VerwHoofdItem.txt')
const file02 = await ExtractPage.FileInlezen('path..\\..\\Menutest\\VerwSubItem.txt')
const file03 = await ExtractPage.FileInlezen('path..\\..\\Menutest\\VerwSubApps.txt')
const file04 = await ExtractPage.FileInlezen('path..\\..\\Menutest\\VerwSubItemFinancieel.txt')
const file05 = await ExtractPage.FileInlezen('path..\\..\\Menutest\\Sluitknoppen.txt')
const file06 = await ExtractPage.FileInlezen('path..\\..\\Menutest\\MenuNotIncludLight.txt')
const file07 = await ExtractPage.FileInlezen('path..\\..\\Menutest\\MenuNotIncludAcc.txt')

"KID van de diverse soorten modules/rapporten"
const KIDwebimuisreport = "k_id='webimuisreport";
const KIDweb = "k_id='web";
const KIDtabellen = "k_id='tabellen_web";
const KIDrapport = "k_id='rapport_web";
const KIDinfo = "k_id='info";
const header = "[@k_id='header']";

"headers van de locatie in txt file"
const HeaderCRM = "VerwachteItemCRM[@k_id='header']"
const HeaderInkoop = "VerwachteItemInkoop[@k_id='header']"
const HeaderVerkoop = "VerwachteItemVerkoop[@k_id='header']"
const HeaderUren = "VerwachteItemUren[@k_id='header']"
const HeaderConnect = "VerwachteItemConnect[@k_id='header']"
const HeaderSpeedbooks = "VerwachteItemSpeedbooks[@k_id='header']"
const HeaderApps = "VerwachteKingApps[@k_id='header']"
const HeaderBeheer = "VerwachteItemBeheer[@k_id='header']"

console.log("=> => dit is een extract script niet live gebruiken <= <=");
"let op alleen te gebruiken voor de tabbelen en rapporten file"




// await menuCRM(file02, file05);
// await menuInkoop(file02, file05);
// await menuVerkoop(file02, file05);
// await MenuUren(file02, file05);


};
example()

async function menuVerkoop(file, Closefile ) {  

    const begin = "VerwachteItemVerkoop[@k_id='header']"
    const eind = "VerwachteItemUren[@k_id='header']"
    const sidemenu = "//div[@class='bar_content']//span[@class='icon_text text_material'][contains(text(),'Verkoop')]"
    const innersidemenu = "//div[@class='title_inner text_material'][.='Verkoop']//following-sibling::div[1]"
    var result = file.slice(file.indexOf(begin), file.indexOf(eind))

    "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
    await clickmod(sidemenu)
    var target = await driver.findElement(By.xpath(innersidemenu)).getAttribute('id') 
    var Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
    var Upscroll = "(//div[@id='jqxScrollAreaUppanel"+target+"verticalScrollBar'])[1]"

    await LinkerMenu.dropdown(innersidemenu)
    await scrollup(Upscroll )
    await clickmod(sidemenu)

    await openMODclose(result, sidemenu, Closefile, Scrolldown );
}

async function menuInkoop(file, Closefile ) {  
    const begin = "VerwachteItemInkoop[@k_id='header']"
    const eind = "VerwachteItemVerkoop[@k_id='header']"
    const sidemenu = ("//div[@class='bar_content']//span[@class='icon_text text_material'][contains(text(),'Inkoop')]")
    const innersidemenu = "//div[@class='title_inner text_material'][.='Inkoop']//following-sibling::div[1]"
    var result = file.slice(file.indexOf(begin), file.indexOf(eind))

    "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
    await clickmod(sidemenu)
    var target = await driver.findElement(By.xpath(innersidemenu)).getAttribute('id') 
    const Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
    const Upscroll = "(//div[@id='jqxScrollAreaUppanel"+target+"verticalScrollBar'])[1]"
    await LinkerMenu.dropdown(innersidemenu)
    await scrollup(Upscroll )
    await clickmod(sidemenu)

    await openMODclose(result, sidemenu, Closefile, Scrolldown );
}

async function menuCRM(file, Closefile, ) {  
    const begin = "VerwachteItemCRM[@k_id='header']"
    const eind = "VerwachteItemInkoop[@k_id='header']"
    const sidemenu = ("//div[@class='bar_content']//span[@class='icon_text text_material'][contains(text(),'CRM')]")
    const innersidemenu = "//div[@class='title_inner text_material'][.='Relatiebeheer']//following-sibling::div[1]"
    var result = file.slice(file.indexOf(begin), file.indexOf(eind))
 
    await clickmod(sidemenu)
    await LinkerMenu.dropdown(innersidemenu)
    await clickmod(sidemenu)

    await openMODclose(result,sidemenu,Closefile )
}

async function MenuUren(file, Closefile, ) {  
    const begin = "VerwachteItemUren[@k_id='header']"
    const eind = "VerwachteItemConnect[@k_id='header']"
    const sidemenu = ("//div[@class='bar_content']//span[@class='icon_text text_material'][contains(text(),'Uren')]")
    const innersidemenu = "//div[@class='title_inner text_material'][.='Uren']//following-sibling::div[1]"

    var result = file.slice(file.indexOf(begin), file.indexOf(eind))
    // console.log(result)

    await clickmod(sidemenu)
    await LinkerMenu.dropdown(innersidemenu)
    await clickmod(sidemenu)

    await openMODclose(result,sidemenu,Closefile )
}

async function openMODclose(result,sidemenu,Closefile,Scrolldown, ) { 
    var checksucceed = []
    var checkfailed = []
    for(var i=0; i<(result.length); i++){   
        try {
            if(result[i].includes("k_id='mod")){
                // console.log("do nothing "+result[i])
            }
            else if(result[i].includes("[@k_id='header']")){
                // console.log("do nothing "+result[i])
            }
            else if (result[i].includes("k_id='web")){
                await clickmod(sidemenu,);
                await driver.sleep(500);
                await clickIntoViewport(result[i],Scrolldown); 
                await driver.sleep(1000);

                "error dialog komt meestal voor bij opstarten hier moet een functie om dit te onderscheppen. "
                // await divalert.Dialogerror("//div[@role='dialog']", )
                try{
                await driver.wait(until.elementLocated(By.xpath("//div[@role='dialog']")), 1000);
                var meld = await driver.findElement(By.xpath("//div[@role='dialog']")).getAttribute("innerHTML");
                // var meld = await driver.findElement(By.xpath("//div[@role='dialog']")).getText();
                console.log(meld)
                }
                catch(NoSuchElementException){
                }

                await sluiteniframe(Closefile,result[i] );

                "resultaat 'return' van geslaagde run"
                var id = await driver.findElement(By.xpath(result[i])).getAttribute("k_id");
                console.log(id)
                checksucceed[i] = result[i];
            }
            else if (result[i].includes("k_id='tabellen")){
                await clickmod(sidemenu,);
                await driver.sleep(500);
                await clickIntoViewport(result[i],Scrolldown); 
                await driver.sleep(1000);

                "error dialog komt meestal voor bij opstarten hier moet een functie om dit te onderscheppen. "
                //await divalertPage.Dialogerror()

                await sluiten(Closefile,result[i]);

                var id = await driver.findElement(By.xpath(result[i])).getAttribute("k_id");
                console.log(id);
                checksucceed[i] = result[i];
                //div[contains(@class,'gen_dialog_titlebar')]

            }
            else if (result[i].includes("k_id='rapport_web")){
                "Doe niks voorlopig moet in ander script ivm gegevens "
            }
            else if (result[i].includes("k_id='info")){
                await clickmod(sidemenu,);
                await driver.sleep(500);
                await clickIntoViewport(result[i],Scrolldown); 
                await driver.sleep(1000);

                "error dialog komt meestal voor bij opstarten hier moet een functie om dit te onderscheppen. "
                //await divalertPage.Dialogerror()
             
                await sluiten(Closefile,result[i]);

                var id = await driver.findElement(By.xpath(result[i])).getAttribute("k_id");
                console.log(id)
                checksucceed[i] = result[i];
            }
            else{
                console.log("deze is overgeslagen. "+result[i])
                await clickmod(sidemenu,);
                await driver.sleep(500);
                await clickIntoViewport(result[i],Scrolldown); 
                await driver.sleep(1000);

                await sluiten(Closefile,result[i]);

                var id = await driver.findElement(By.xpath(result[i])).getAttribute("k_id");
                console.log(id)
                checksucceed[i] = result[i];
            }   
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

async function clickmod(element,) { 
        await driver.wait(until.elementLocated(By.xpath(element)));
        // await driver.findElement(By.xpath(button)).click();
        await driver.findElement(By.xpath(element)).click();
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
                console.log("button in i_app frame ==> "+closefile[i])
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
                console.log("loop2 in sluiteniframe functie ==> "+closefile[i])
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
            console.log("button in i_app frame ==> "+closefile[i])
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
                    console.log("loop2 sluiten functie ==> "+closefile[i])
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
        console.log("sluit knop bestaat niet, of is niet opgegeven."+result)
    }
}


