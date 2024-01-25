const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
var HomePage = require('../Page/home.page.js');
var ReviewUserPage = require('../Page/review.user.page.js');
var LinkerMenu = require('../Page/linkermenu.page.js');

async function example(){

await ReviewUserPage.wingpdf(570);
// await driver.quit();
// return 
await LinkerMenu.FinancieelSideMenu();
await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Grootboek')])[1]", "Grootboek");
await LinkerMenu.VerifySideMenu("(//div[@id='bar_inner_sidebar_menuitem_1']//div[contains(text(),'Rapporten')])[1]", "Rapporten");
await LinkerMenu.VerifySideMenu("(//li[contains(.,'Rapporten')]//div[contains(.,'Historische mutaties')])[1]");


// await LinkerMenu.gotoHistMUT1()

await driver.sleep(2000);

await driver.switchTo().frame('obj_report_index');
let button2 = await driver.findElements(By.xpath("//input[@id='knop_submit']"));
// console.log(button2 != 0);
if (button2 != 0){
await driver.findElement(By.xpath("//input[@id='knop_submit']")).click();
}
await driver.switchTo().defaultContent();

meld = new URLSearchParams(await driver.findElement(By.xpath("//object[@id='obj_report']")).getAttribute('data'))
console.debug(meld)
var rapport = meld.get('naam_rapport')
var title = meld.get('PDF_TITEL')
console.debug(rapport)
console.debug(title)

let button = await driver.findElements(By.xpath("//button[@id='button_top_report_sluiten_doorstart']"));
console.log(button != 0 )

await driver.sleep(2000);
await clickmod("//button[@id='button_top_report_sluiten_doorstart']");
//  await TrycatchESCAPE("//button[@id='button_top_report_sluiten_doorstart']");




return 
await driver.wait(until.elementLocated(By.xpath("//a[normalize-space()='Financieel']")));
await driver.findElement(By.xpath("//a[normalize-space()='Financieel']")).click();
await driver.findElement(By.xpath("(//a[contains(@class,'with_arrow')][normalize-space()='Debiteuren'])[1]")).click();
await driver.findElement(By.xpath("//a[normalize-space()='Openstaande facturen debiteur']")).click();

await driver.switchTo().frame('i_app');

await driver.wait(until.elementLocated(By.xpath("//div[contains(text(),'Factuur')]")));
console.log (await driver.findElement(By.xpath("//label[normalize-space()='Openstaande facturen debiteur']")).getText());
await driver.findElement(By.xpath("//button[normalize-space()='Toon in PDF']")).click();
await driver.sleep(2000);
await driver.switchTo().defaultContent();

await driver.switchTo().frame('i_div_report');
await driver.wait(until.elementLocated(By.xpath("//b[normalize-space()='Foutmelding']")));
console.log (await driver.findElement(By.xpath("//b[normalize-space()='Foutmelding']")).getText() + (' Er zijn geen openstaande posten gevonden......'));
await driver.findElement(By.id("knop_TerugCreateErrorDocument")).click();
await driver.switchTo().defaultContent();


try {
        // await driver.switchTo().frame('i_report_frame');
        console.log (await driver.findElement(By.id("report_canvas")).getId());
        console.log ("embed pdf id gevonden");
        // await driver.switchTo().defaultContent();
        await driver.findElement(By.id("button_top_report_sluiten_doorstart")).click();
        
} catch(NoSuchElementException) {
        await driver.switchTo().defaultContent();
        await driver.switchTo().frame('i_div_report');
        await driver.wait(until.elementLocated(By.xpath("//b[normalize-space()='Foutmelding']")));
        console.log (await driver.findElement(By.xpath("//b[normalize-space()='Foutmelding']")).getText() + (' Er zijn geen openstaande posten gevonden......'));
        await driver.findElement(By.id("knop_TerugCreateErrorDocument")).click();
        await driver.switchTo().defaultContent();
   
} finally{
        await driver.switchTo().frame('i_app');
        await driver.findElement(By.id("knop_sluiten_div_gridinfo")).click();
        await driver.switchTo().defaultContent();
}
// await driver.wait(until.elementLocated(By.xpath("//ul[@id='mbmcpebul_table']//div//a[contains(@onclick,'return false;')][normalize-space()='Verkoop']")));
// await driver.findElement(By.xpath("//ul[@id='mbmcpebul_table']//div//a[contains(@onclick,'return false;')][normalize-space()='Verkoop']")).click();
// await driver.findElement(By.xpath("(//a[contains(@class,'with_arrow')][normalize-space()='Rapporten'])[6]")).click();
// await driver.findElement(By.xpath("//a[contains(text(),'Offertes, orders, verzendbonnen, factureren en (ko')]")).click();

// await driver.findElement(By.xpath("//img[@id='img_home']")).click();




};
example()

async function clickmod(element,) { 
        await driver.wait(until.elementLocated(By.xpath(element)));
        // await driver.findElement(By.xpath(button)).click();
        await driver.findElement(By.xpath(element)).click();
        await driver.sleep(1000);
}


async function KeyESCAPE(element,) { 
        "Escape functie ingebouwd eigenlijk een global sluit knop, ?handig om te bepalen of de scherm die je wilt sluiten ook gesloten is?"
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

