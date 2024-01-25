// var webdriver = require('selenium-webdriver');
const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const FunctionsPage = require('../Page/functions.page.js');
const fs = require('fs');
const BasePage = require('./base.page.js');

"xpath van dropdownmenu"
const mod = "k_id='mod";
const rad = "k_id='rad";
const empty = "k_id=''";

"filter functie inbouwen om de dropdown uit te filteren."
const webimuisreport = "k_id='webimuisreport";
const web = "k_id='web";
const webrapport = "[@k_id='web_rapporten']"

"xpath van de diverse soorten modules/rapporten"
const tabellen = "k_id='tabellen_web";
const rapport = "k_id='rapport_web";
const info = "k_id='info";
const upload = "@k_id='wdd_upload"
const kasboek = "[@k_id='kasboek']"

"eventueel headers verwijderen van de txt file"
const header = "[@k_id='header']";

class ExtractPage extends BasePage{

    async ExtractMISCL(verwachtfile,) {
        var filter = []
        filter[0] = await this.filterpart(verwachtfile,rad )
        filter[1] = await this.filterpart(filter[0],mod )
        filter[2] = await this.filterpart(filter[1],empty )

        filter[3] = await this.filterpart(filter[2],webimuisreport )
        filter[4] = await this.filterpart(filter[3],web )
        filter[5] = await this.filterpart(filter[4],tabellen )
        filter[6] = await this.filterpart(filter[5],rapport )
        filter[7] = await this.filterpart(filter[6],info)
        
        filter[8] = await this.filterpart(filter[7], header)
        return filter[8]
    }
  
    async Extractdropdown(verwachtfile,) {
        var filter = []
        filter[0] = await this.filterpart(verwachtfile,upload )
        filter[1] = await this.filterpart(filter[0],kasboek )
        filter[2] = await this.filterpart(filter[1],info )
        filter[3] = await this.filterpart(filter[2],webimuisreport )
        filter[4] = await this.filterpart(filter[3],tabellen )
        filter[5] = await this.filter2exception(filter[4],web, webrapport,'"'+"Openstaande posten"+'"' )
        filter[6] = await this.filterexception(filter[5],rapport,'"'+"Openstaande posten"+'"' )

        return filter[6]
    }

    async filterpart(verwachtfile, part,) { 
        "part gedeelte uitfilteren zou je in return niet mogen zien. "
        var filtercheck = [];
        var filtertrue =[]
        var filterfalse =[]
        for(var i=0; i<(verwachtfile.length); i++){
            filtercheck[i] = (verwachtfile[i].includes(part))
            if(filtercheck[i] === true){
                filtertrue[i] = verwachtfile[i];
                // console.log(verwachtfile[i])
            }
            else{
                filterfalse[i] = verwachtfile[i]
                // console.log(verwachtfile[i])
            }
        }
        var cleanfilterfalse = filterfalse.filter(function () { return true });
        return(cleanfilterfalse)
    }
  
    async filterArray(verwachtfile, array,) { 
        "Array gedeelte uitfilteren zou je in return niet mogen zien. "
        // console.log(verwachtfile)
        var Listing = (verwachtfile.length);
        // console.log(Listing)
        var filtercheck = [];
        var filtertrue =[]
        var filterfalse =[]
        for(var i=0; i<Listing; i++){
            filtercheck[i] = (array.includes(verwachtfile[i]))
            if(filtercheck[i] === true){
                filtertrue[i] = verwachtfile[i];
                //console.log(verwachtfile[i])
            }
            else{
                filterfalse[i] = verwachtfile[i]
                // console.log(verwachtfile[i])
            }
        }
        var cleanfilterfalse = filterfalse.filter(function () { return true });
        return(cleanfilterfalse)
    }

    async extractPart(verwachtfile, part,) { 
        var Listing = (verwachtfile.length);
        var includecheck = [];
        var includetrue =[]
        var includefalse =[]
        for(var i=0; i<Listing; i++){
            includecheck[i] = (verwachtfile[i].includes(part))
            if(includecheck[i] === true){
                includetrue[i] = verwachtfile[i];
                // console.log(includetrue[i])
            }
            else{
                includefalse[i] = verwachtfile[i]
                // console.debug("    'ERROR' gevonden item =>"+result[i], "<= is niet gevonden in verwachte file "+Naamtest );
                // console.log(verwachtfile[i])
            }
        }
        var cleanincludetrue = includetrue.filter(function () { return true });
        return(cleanincludetrue)
    }

    async extractTabellen(verwachtfile,) {
        var includetrue =[]
        var includefalse =[]
        for(var i=1; i<(verwachtfile.length); i++){
            if(verwachtfile[i].includes("k_id='tabellen")){
                includetrue[i] = verwachtfile[i];
                // console.log(includetrue[i])
            }
            else{
                includefalse[i] = verwachtfile[i]
            }
        }
        var cleanincludetrue = includetrue.filter(function () { return true });
        return(cleanincludetrue)
    }

    async extractRapporten(verwachtfile,) {
        var includetrue =[]
        var includefalse =[]
        for(var i=1; i<(verwachtfile.length); i++){
            if(verwachtfile[i].includes("k_id='rapport_web")){
                includetrue[i] = verwachtfile[i];
                // console.log(includetrue[i])
            }
            else if(verwachtfile[i].includes("k_id='webimuisreport")){
                includetrue[i] = verwachtfile[i];
                // console.log(includetrue[i])
            }
            else{
                includefalse[i] = verwachtfile[i]
            }
        }
        var cleanincludetrue = includetrue.filter(function () { return true });
        return(cleanincludetrue)
    }

    async filterRapporten(verwachtfile,) {
        "includes uitfilteren zou je in return niet mogen zien. "
        var filtertrue =[]
        var filterfalse =[]
        for(var i=1; i<(verwachtfile.length); i++){
            if(verwachtfile[i].includes("k_id='rapport_web")){
                filtertrue[i] = verwachtfile[i];
                // console.log(verwachtfile[i])
            }
            else if(verwachtfile[i].includes("k_id='webimuisreport")){
                filtertrue[i] = verwachtfile[i];
                // console.log(verwachtfile[i])
            } 
            else{
                filterfalse[i] = verwachtfile[i]
                // console.log(verwachtfile[i])
            }
        }
        var cleanfilterfalse = filterfalse.filter(function () { return true });
        //console.log(cleanfilterfalse)
        return(cleanfilterfalse)
    }

    async filterTabellen(verwachtfile,) {
        "includes uitfilteren zou je in return niet mogen zien. "
        var filtertrue =[]
        var filterfalse =[]
        for(var i=1; i<(verwachtfile.length); i++){
            if(verwachtfile[i].includes("k_id='tabellen")){
                filtertrue[i] = verwachtfile[i];
                // console.log(verwachtfile[i])
            }
            else{
                filterfalse[i] = verwachtfile[i]
                // console.log(verwachtfile[i])
            }
        }
        var cleanfilterfalse = filterfalse.filter(function () { return true });
        //console.log(cleanfilterfalse)
        return(cleanfilterfalse)
    }

    async FileInlezen(file) { 
        var ingelezen = [];
        try {
            var ingelezen = fs.readFileSync(file, 'utf8').split('\r\n')       
        } catch (err) {
            console.error("ERROR file niet ingelezen "+file);
            return false
        }
        return ingelezen
    }

    async ExtractSidemenu(xpath) { 
        "onderstaande classpath zorgt dat de dropdownitems wordt uitgefilterd"
        var classpath = "//li[@class='jqx-tree-item-li jqx-tree-item-li-material']"
        var kingid = "//div[@k_id]"
    
        var Listing = (await driver.findElements(By.xpath(xpath+classpath+kingid))).length;
        // console.log(parseInt(Listing)+ " <= Menu item" + Naam);
        var sidemenu = []
        var KID = [];
        var finalxpath =[];
        for(var i=1; i<=Listing; i++){
            sidemenu[i] = await driver.findElement(By.xpath("("+xpath+classpath+")["+i+"]")).getAttribute("id"); 
            KID[i] = await driver.findElement(By.xpath("("+xpath+classpath+kingid+")["+i+"]")).getAttribute("k_id"); 
            // console.log(sidemenu[i])
            // console.log(KID[i]); 
            finalxpath[i] = "//li[@id='"+sidemenu[i]+"']"+"//div[@k_id='"+KID[i]+"']"

            // console.log(finalxpath[i])
        }   
        // console.log(finalxpath)
        "removes empty values"
        var finalxpath2 = finalxpath.filter(function () { return true });
        return finalxpath2;
    }

    async ExtractKID(verwachtfile, innerbar, xpath, Naam, ) { 
        // console.log(Naam);
        "onderstaande classpath zorgt dat de dropdown wordt uitgefilterd"
        var classpath = "//li[@class='jqx-tree-item-li jqx-tree-item-li-material']"
        var kingid = "//div[@k_id]"
        var Listing = (await driver.findElements(By.xpath(innerbar+xpath+classpath+kingid))).length;
        // console.log(parseInt(Listing)+ " <= Menu item" + Naam);

        if(Listing != 0 ){
            var KID = [];
            var HTML = [];
            var finalxpath =[];
                for(var i=1; i<=Listing; i++){
                    KID[i] = await driver.findElement(By.xpath("("+innerbar+xpath+classpath+kingid+")["+i+"]")).getAttribute("k_id"); 
                    HTML[i] = await driver.findElement(By.xpath("("+innerbar+xpath+classpath+")["+i+"]")).getAttribute("innerText");  
                    //console.log(KID[i]);
                    //console.log(HTML[i]);
                    finalxpath[i] = xpath+"//div[@k_id='"+KID[i]+"']"+"[contains(text(),"+'"'+ HTML[i] +'"'+")]"
                    // console.log(finalxpath[i])
                }         
            var result = await FunctionsPage.IncludeCheck(verwachtfile, finalxpath, Naam );
        }
        else{
            console.log("   Skipped niet aanwezig " +Naam )
            return true
        }
        // console.log(result +Naam)
        return result
    }

    async ExtractAttribute(verwachtfile, xpath, Name, attribute ) { 
        // console.log(Name);
        var Listing = (await driver.findElements(By.xpath(xpath))).length;
        // console.log(parseInt(Listing)+ " <= Menu item" + Name);
        var naam = [];
        var finalxpath =[];
            for(var i=1; i<=Listing; i++){
                naam[i] = await driver.findElement(By.xpath("("+xpath+")["+i+"]")).getAttribute(attribute);  
                // console.log(naam[i]);
                var xpath2 = xpath.slice(0, -1);
                finalxpath[i] = xpath2+"="+'"'+naam[i]+'"'+"]"
                // console.log(finalxpath[i])
            }
        var result = await FunctionsPage.IncludeCheck(verwachtfile, finalxpath, Name);
        return result         
    }

    async ExtractInnerHTML(verwachtfile, xpath, Naam, ) { 
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

    async ExtractBtnTab(DID) { 
        "extract button bij tabbelelen."
        var dialogBtn = "//div[@id='jqxmenud_"+DID+"_contentmenubtn']"
        var listingbutton = await driver.findElements(By.xpath(dialogBtn+"//li[@name]"))
        var finalxpath=[]
        var button=[]
        for(var i=1; i<=listingbutton.length; i++){
            button[i] = await driver.findElement(By.xpath("("+dialogBtn+"//li[@name])["+i+"]")).getAttribute("name"); 
            // console.log(button[i]);
            finalxpath[i] = dialogBtn+"//li[@name='"+button[i]+"']"
            // console.log(finalxpath[i])
        }   
        return finalxpath;
    }

}
module.exports = new ExtractPage();



