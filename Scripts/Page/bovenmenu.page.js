// var webdriver = require('selenium-webdriver');
const {Builder, By, Actions, Key, until,} = require('selenium-webdriver');
var BasePage = require('./base.page.js');

class BovenMenu extends BasePage{
        
    async gototabelbankrekening() {
        await driver.wait(until.elementLocated(By.xpath("//span[@class='icon_text text_material'][normalize-space()='Financieel']")));
        await driver.findElement(By.xpath("//span[@class='icon_text text_material'][normalize-space()='Financieel']")).click();
        await driver.sleep(1000);
        await driver.findElement(By.id("bar_tree_collapse_sidebar_menuitem_1")).click();
        await driver.sleep(1000);
        await driver.findElement(By.id("sidebar_menuitem_156")).click();
        await driver.sleep(1000);
        await driver.findElement(By.id("sidebar_menuitem_160")).click();
        await driver.sleep(1000);
        await driver.findElement(By.id("sidebar_menuitem_161")).click();
        await driver.sleep(1000);
        //li[@id='sidebar_menuitem_2']//div[contains(text(),'Boekingsprogramma')]
        //li[@id='sidebar_menuitem_156']//div[contains(text(),'Bankieren')]
    }

    async gotobankafschriftinlezen() {
        await driver.wait(until.elementLocated(By.xpath("//span[@class='icon_text text_material'][normalize-space()='Financieel']")));
        await driver.findElement(By.xpath("//span[@class='icon_text text_material'][normalize-space()='Financieel']")).click();
        await driver.sleep(1000);
        await driver.findElement(By.id("bar_tree_collapse_sidebar_menuitem_1")).click();
        await driver.sleep(1000);
        await driver.findElement(By.id("sidebar_menuitem_156")).click();
        await driver.sleep(1000);
        await driver.findElement(By.id("sidebar_menuitem_157")).click();
        await driver.sleep(1000)
    }

    async gotogrootboekstamgegevens() {
        await driver.wait(until.elementLocated(By.xpath("//span[@class='icon_text text_material'][normalize-space()='Financieel']")));
        await driver.findElement(By.xpath("//span[@class='icon_text text_material'][normalize-space()='Financieel']")).click();        
        await driver.sleep(1000);
        await driver.findElement(By.id("bar_tree_collapse_sidebar_menuitem_1")).click();
        await driver.sleep(1000);
        await driver.findElement(By.id("sidebar_menuitem_83")).click();
        await driver.sleep(1000);
        await driver.findElement(By.id("sidebar_menuitem_84")).click();
        await driver.sleep(1000);
        await driver.findElement(By.id("sidebar_menuitem_85")).click();
        await driver.sleep(1000)
    }

    async gotoboekingsprogramma() {
        await driver.wait(until.elementLocated(By.xpath("//span[@class='icon_text text_material'][normalize-space()='Financieel']")));
        await driver.findElement(By.xpath("//span[@class='icon_text text_material'][normalize-space()='Financieel']")).click();
        await driver.sleep(1000);
        await driver.findElement(By.id("bar_tree_collapse_sidebar_menuitem_1")).click();
        await driver.sleep(1000);
        await driver.findElement(By.id("sidebar_menuitem_2")).click();
        await driver.sleep(1000);
    }

    async gotobasisfinancieel() {
        await driver.wait(until.elementLocated(By.xpath("//span[@class='icon_text text_material'][normalize-space()='Financieel']")));
        await driver.findElement(By.xpath("//span[@class='icon_text text_material'][normalize-space()='Financieel']")).click();        
        await driver.sleep(1000);
        await driver.findElement(By.id("bar_tree_collapse_sidebar_menuitem_1")).click();
        await driver.sleep(1000);
        await driver.findElement(By.id("sidebar_menuitem_83")).click();
        await driver.sleep(1000);
        await driver.findElement(By.id("sidebar_menuitem_84")).click();
        await driver.sleep(1000);
        while (true){
            try {
                await driver.wait(until.elementLocated(By.id("sidebar_menuitem_104")),1000);
                await driver.findElement(By.id("sidebar_menuitem_104")).click();
                break
            }
            catch(NoSuchElementException){
                await driver.findElement(By.id("jqxScrollAreaDownpanelbar_buffersidebar_menuitem_1verticalScrollBar")).click()
            }
        }
        await driver.sleep(1000)
    }

    async gotodebiteurstamgegevens() {
        await driver.wait(until.elementLocated(By.xpath("//span[@class='icon_text text_material'][normalize-space()='Financieel']")));
        await driver.findElement(By.xpath("//span[@class='icon_text text_material'][normalize-space()='Financieel']")).click();        
        await driver.sleep(1000);
        await driver.findElement(By.id("bar_tree_collapse_sidebar_menuitem_1")).click();
        await driver.sleep(1000);
        await driver.findElement(By.id("sidebar_menuitem_27")).click();
        await driver.sleep(1000);
        await driver.findElement(By.id("sidebar_menuitem_28")).click();
        await driver.sleep(1000);
        await driver.findElement(By.id("sidebar_menuitem_29")).click();
        await driver.sleep(1000)
    }

}        
 
module.exports = new BovenMenu();



