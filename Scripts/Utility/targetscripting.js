const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const ReviewUserPage = require('../Page/review.user.page.js');
const DemoUserPage = require('../Page/demo.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const ExtractPage = require('../Page/ExtractArray.page.js');
const Regression = require('../Page/Regrfunc.page.js');
const kolom = require('../Page/Kolommentest.page.js');

async function example(){

// await DemoUserPage.wing(555);

"rev set"
// await ReviewUserPage.wingman(555);
// await ReviewUserPage.wingbasis(555);

"dev set"
await ReviewUserPage.wingacc(555);

"kies menu"
await menuFinance();
// await menuCRM();
// await menuInkoop();
// await menuVerkoop();
// await MenuUren();

};
example()

async function menuCRM() {  
    let sidemenu = ("//div[@class='bar_content']//span[@class='icon_text text_material'][contains(text(),'CRM')]")
    let innersidebar = "//div[@class='title_inner text_material'][.='Relatiebeheer']"
    let buffersidebar = innersidebar + "//following-sibling::div[1]"

    "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
    var target = await driver.findElement(By.xpath(buffersidebar)).getAttribute('id') 
    var Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
    var Upscroll = "(//div[@id='jqxScrollAreaUppanel"+target+"verticalScrollBar'])[1]"

    await Regression.clickmod(sidemenu)

    "menutarget waar test gedaan moet worden."
    var targetkid = []
    targetkid[0] = buffersidebar + "//div[@k_id='tabellen_webdeb']"
    var submenu = "//div[@k_id='mod_tabellen']"
    var subsubmenu = "//div[@k_id='mod_deb']"
    await LinkerMenu.genericdropdown(innersidebar, targetkid[0], submenu, subsubmenu,)

    await Regression.clickScrollIntoViewport(targetkid[0],Scrolldown);
    await Regression.spinnercheck2()  
    await kolom.kolommencheck1()

}

async function menuVerkoop() {  
    let sidemenu = "//div[@class='bar_content']//span[@class='icon_text text_material'][contains(text(),'Verkoop')]"
    let innersidebar = "//div[@class='title_inner text_material'][.='Verkoop']"
    let buffersidebar = innersidebar + "//following-sibling::div[1]"

    "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
    await Regression.clickmod(sidemenu)
    var target = await driver.findElement(By.xpath(buffersidebar)).getAttribute('id') 
    var Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
    var Upscroll = "(//div[@id='jqxScrollAreaUppanel"+target+"verticalScrollBar'])[1]"
    await LinkerMenu.dropdown(buffersidebar)
    await Regression.scrollup(Upscroll )
    await Regression.clickmod(sidemenu)

    var result = await ExtractPage.ExtractSidemenu(buffersidebar);
    await Regression.openMODclose(result, sidemenu, innersidebar, Scrolldown, );
}

async function menuFinance() {  
    let sidemenu = "//div[@class='bar_content']//span[@class='icon_text text_material'][contains(text(),'Financieel')]"
    let innersidebar = "//div[@class='title_inner text_material'][.='Financieel']"
    let buffersidebar = innersidebar + "//following-sibling::div[1]"

    "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
    var target = await driver.findElement(By.xpath(buffersidebar)).getAttribute('id') 
    var Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
    var Upscroll = "(//div[@id='jqxScrollAreaUppanel"+target+"verticalScrollBar'])[1]"

    await Regression.clickmod(sidemenu)

    "menutarget waar test gedaan moet worden. targetkid steeds ophogen met +1 dan kan je handmatig sequencieel testen."
    var targetkid = []
    targetkid[0] = buffersidebar + "//div[@k_id='rapport_webfioactpa']"
    targetkid[1] = buffersidebar + "//div[@k_id='rapport_webfiowvwk']"
    var submenu = "//div[@k_id='mod_versl']"
    var subsubmenu = "//div[@k_id='web_rapporten']"
    await LinkerMenu.genericdropdown(innersidebar, targetkid[0], submenu, subsubmenu,)
    
    await Regression.openMODclose(targetkid, sidemenu, innersidebar, Scrolldown, );
}

async function menuInkoop() {  
    let sidemenu = ("//div[@class='bar_content']//span[@class='icon_text text_material'][contains(text(),'Inkoop')]")
    let innersidebar = "//div[@class='title_inner text_material'][.='Inkoop']"
    let buffersidebar = innersidebar + "//following-sibling::div[1]"

    "dynamisch id voor scrollbar ivm menuitem vervolgens dropdown van alle submenu's"
    await Regression.clickmod(sidemenu)
    var target = await driver.findElement(By.xpath(buffersidebar)).getAttribute('id') 
    const Scrolldown = "(//div[@id='jqxScrollAreaDownpanel"+target+"verticalScrollBar'])[1]"
    const Upscroll = "(//div[@id='jqxScrollAreaUppanel"+target+"verticalScrollBar'])[1]"
    await LinkerMenu.dropdown(buffersidebar)
    await Regression.scrollup(Upscroll )
    await Regression.clickmod(sidemenu)

    var result = await ExtractPage.ExtractSidemenu(buffersidebar);
    await Regression.openMODclose(result, sidemenu, innersidebar, Scrolldown, );
}

async function MenuUren() {  
    let sidemenu = ("//div[@class='bar_content']//span[@class='icon_text text_material'][contains(text(),'Uren')]")
    let innersidebar = "//div[@class='title_inner text_material'][.='Uren']"
    let buffersidebar = innersidebar + "//following-sibling::div[1]"

    await Regression.clickmod(sidemenu)
    await LinkerMenu.dropdown(buffersidebar)
    await Regression.clickmod(sidemenu)

    var result = await ExtractPage.ExtractSidemenu(buffersidebar);
    await Regression.openMODclose(result, sidemenu, innersidebar, )
}

async function Targetdropdown(){
    var sidemenu = "//div[@class='bar_content']//div[@title='Financieel']"
    var innermenu = "Financieel"
    var targetkid = "//div[@k_id='tabellen_webboe_onverwerkt']" 
    var submenu = "//div[@k_id='mod_inl']"
    var subsubmenu = "//div[@k_id='mod_webonverwerkt']"

    await clickmod(sidemenu)
    await LinkerMenu.genericdropdown(innermenu, targetkid, submenu, subsubmenu,)
}