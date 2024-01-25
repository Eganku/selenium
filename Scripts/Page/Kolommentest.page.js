const {Builder, By, Actions, Key, until, Listener,} = require('selenium-webdriver');
const BasePage = require('./base.page.js');
const ExtractPage = require('./ExtractArray.page.js');
const fs = require('fs');

class kolommenpage extends BasePage{
    
    async kolommencheck1() { 
        "menuitem met tabbelen id, eerste scherm"
        let dialog = "//div[@class='dialogcorner bs  gen_grd_screen']"
        let dialogDID = await driver.findElement(By.xpath(dialog)).getAttribute('id');
        let dialogName = await driver.findElement(By.xpath(dialog)).getAttribute('div_title');

        let columnsluit = "//div[@id='gen_modal_columnsd_"+dialogDID+"_content']//span[@class='gen_close_icon']" 

        let kolomheader = "//div[@id='columntabled_"+dialogDID+"_content']//div[@role='columnheader']//span"
        let ScrollcolumnHead = "//div[@id='horizontalScrollBard_"+dialogDID+"_content']"
        let ScrollrightHead = "//div[@id='jqxScrollAreaDownhorizontalScrollBard_"+dialogDID+"_content']"
        let ScrollleftHead = "//div[@id='jqxScrollAreaUphorizontalScrollBard_"+dialogDID+"_content']"

        let inviewport = "//span[@class='jqx-listitem-state-normal jqx-item jqx-rc-all']"
        let optionsChk = "//div[@id='listBoxContentd_column_selection_listbox_d_"+ dialogDID +"_contentchk']//div[@role='option']"
        let optionsUnchk = "//div[@id='listBoxContentd_column_selection_listbox_d_"+ dialogDID +"_contentunchk']//div[@role='option']"

        let ScrollcolumnChk = "//div[@id='verticalScrollBard_column_selection_listbox_d_"+dialogDID+"_contentchk']"
        let ScrolldownChk = "//div[@id='jqxScrollAreaDownverticalScrollBard_column_selection_listbox_d_"+ dialogDID +"_contentchk']"
        let ScrollupChk = "//div[@id='jqxScrollAreaUpverticalScrollBard_column_selection_listbox_d_"+ dialogDID +"_contentchk']"
        
        let ScrollcolumnUnchk = "//div[@id='verticalScrollBard_column_selection_listbox_d_"+dialogDID+"_contentunchk']"
        let ScrolldownUnchk = "//div[@id='jqxScrollAreaDownverticalScrollBard_column_selection_listbox_d_"+ dialogDID +"_contentunchk']"
        let ScrollupUnchk = "//div[@id='jqxScrollAreaUpverticalScrollBard_column_selection_listbox_d_"+ dialogDID +"_contentunchk']"

        let buttonstandaard = "//div[@id='kol_selectd_"+ dialogDID +"_content']//button[.='Standaard velden']"
        let buttonopslaan = "//div[@id='kol_selectd_"+ dialogDID +"_content']//button[.='Opslaan']"
        let arrowright = "//input[@id='gen_arrow_rightd_"+ dialogDID +"_content']"
        let arrowleft = "//input[@id='gen_arrow_leftd_"+ dialogDID +"_content']"
        let arrowup = "//input[@id='gen_arrow_upd_"+ dialogDID +"_content']"
        let arrowdown = "//input[@id='gen_arrow_downd_"+ dialogDID +"_content']"
        let DblArrowleft =  "//input[@id='gen_arrow_leftleftd_"+ dialogDID +"_content']"
        let DblArrowright =  "//input[@id='gen_arrow_rightrightd_"+ dialogDID +"_content']"

        let kolombutton = "//span[@id='gen_button_kold_"+dialogDID+"_content']"      

        let zoekveldChk = "//div[@id='filterd_column_selection_listbox_d_"+dialogDID+"_contentchk']//input[@class='jqx-widget jqx-listbox-filter-input jqx-input jqx-rc-all']"
        let zoekveldUnchk = "//div[@id='filterd_column_selection_listbox_d_"+dialogDID+"_contentunchk']//input[@class='jqx-widget jqx-listbox-filter-input jqx-input jqx-rc-all']"

        console.log("   tabel => "+dialogName+" "+dialogDID);

        "001 Initial checks"
        let headers = await this.ExtractHeaders(kolomheader, ScrollrightHead, ScrollcolumnHead, ScrollleftHead);
        await this.clickmod(kolombutton);
        let rechterkolom = await this.ExtractVelden2(optionsUnchk, ScrolldownUnchk, ScrollcolumnUnchk,ScrollupUnchk, "001 Extract rightcolumn");
        let linkerkolom = await this.ExtractVelden2(optionsChk, ScrolldownChk, ScrollcolumnChk,ScrollupChk, "001 Extract leftcolumn");
        await this.comparefieldsbyOrder(headers,linkerkolom, "001 Initial checks" );
        await this.CompareColums(optionsUnchk+inviewport, headers, linkerkolom, rechterkolom );

        await this.clickmod(buttonstandaard); 
        await this.clickmod(buttonopslaan);

        "002 Test arrowRight & arrowLeft buttons"
        await this.clickmod(kolombutton);

        let leftfield = await this.ExtractLastField(optionsChk)
        await this.clickmod(optionsChk + "[.='"+leftfield+"']");
        await this.clickmod(arrowright);
        let checkmovedfield = optionsUnchk + "[.='"+leftfield+"']"
        await this.VerifyVeld(leftfield, checkmovedfield, "=> Niet kolom tonen with leftklik", ScrolldownUnchk, ScrollupUnchk, );

        var checkoption = await driver.findElements(By.xpath(optionsUnchk+inviewport));
        if(checkoption.length > 0){
            let rightfield = await this.ExtractFirstField(optionsUnchk);
            await this.clickmod((optionsUnchk + "[.='"+rightfield+"']"));
            await this.clickmod(arrowleft);
            let checkmovedfield2 = optionsChk + "[.='"+rightfield+"']"
            await this.VerifyVeld(rightfield, checkmovedfield2, "=> kolom tonen with rightklik", ScrolldownChk, ScrollupChk);
        }
        else{
            console.log("   002 Test arrowleft button skipped.");
        }

        await this.clickmod(buttonstandaard); 
        await this.clickmod(buttonopslaan);

        "003 Test arrowDown & arrowUp button"
        await this.clickmod(kolombutton);

        "if array > 2 than execute script. moet nog in "
        let topOption = await this.ExtractFirstField(optionsChk);
        await this.clickmod(optionsChk + "[.='"+topOption+"']");
        await this.clickmod(arrowdown);
        let linkerkolom5 = await this.ExtractVelden2(optionsChk, ScrolldownChk, ScrollcolumnChk,ScrollupChk, "003");
        await this.findFields(linkerkolom5[1], topOption, "field met klik arrowdown gevonden");

        let bottomOption = await this.ExtractLastField(optionsChk);
        await this.clickmod(optionsChk + "[.='"+bottomOption+"']");
        await this.clickmod(arrowup);
        let linkerkolom4 = await this.ExtractVelden2(optionsChk, ScrolldownChk, ScrollcolumnChk,ScrollupChk, "003");
        await this.findFields(linkerkolom4[linkerkolom4.length -2], bottomOption, "field NOT found met klik arrowup gevonden");

        await this.clickmod(buttonopslaan);

        let headers3 = await this.ExtractHeaders(kolomheader, ScrollrightHead, ScrollcolumnHead, ScrollleftHead, );
        await this.clickmod(kolombutton);
        let rechterkolom3 = await this.ExtractVelden2(optionsUnchk, ScrolldownUnchk, ScrollcolumnUnchk,ScrollupUnchk, "003");
        let linkerkolom3 = await this.ExtractVelden2(optionsChk, ScrolldownChk, ScrollcolumnChk,ScrollupChk, "003");
        await driver.sleep(2000);
        
        await this.comparefieldsbyOrder( headers3,linkerkolom3, "003 Test arrowDown & arrowUp button" );
        await this.CompareColums(optionsUnchk+inviewport, headers3, linkerkolom3, rechterkolom3 );
        
        await this.clickmod(buttonopslaan);
       
        "006 zoekveld testen"
        await this.clickmod(kolombutton);
        let topOptionChk = await this.ExtractFirstField(optionsChk);
        let topOptionUnchk = await this.ExtractFirstField(optionsUnchk);

        await driver.findElement(By.xpath(zoekveldChk)).clear();
        await driver.findElement(By.xpath(zoekveldChk)).sendKeys(topOptionChk);
        await driver.findElement(By.xpath(zoekveldUnchk)).clear();
        await driver.findElement(By.xpath(zoekveldUnchk)).sendKeys(topOptionChk);
        await driver.sleep(2000);

        let checkmovedfield3 = optionsChk+inviewport + "[.='"+topOptionChk+"']"
        await this.VerifyVeld(topOptionChk, checkmovedfield3, "=> 006 Test zoekveld", ScrolldownChk, ScrollupChk);
        "LET op er moet nog een functie worden gemaakt voor waardes die meerdere resultaten opleveren."
        await this.Verifyempty(optionsUnchk+inviewport, " => 006 Test controle zoekveld rightColumn");

        await driver.findElement(By.xpath(zoekveldChk)).clear();
        await driver.findElement(By.xpath(zoekveldChk)).sendKeys(topOptionUnchk);
        await driver.findElement(By.xpath(zoekveldUnchk)).clear();
        await driver.findElement(By.xpath(zoekveldUnchk)).sendKeys(topOptionUnchk);
        await driver.sleep(2000);

        let checkmovedfield4 = optionsUnchk+inviewport + "[.='"+topOptionUnchk+"']"
        await this.VerifyVeld(topOptionUnchk, checkmovedfield4, "=> Test zoekveld", ScrolldownChk, ScrollupChk, );
        await this.Verifyempty(optionsChk+inviewport, " => 006 Test controle zoekveld leftColumn");
        await this.clickmod(columnsluit);

        "004 DblArrowright test"
        await this.clickmod(kolombutton);
        let linkerkolom6 = await this.ExtractVelden2(optionsChk, ScrolldownChk, ScrollcolumnChk,ScrollupChk, "004");
        await this.clickmod(DblArrowright);
        await this.Verifyempty(optionsChk, " => 004 Test controle empty leftcolumn");

        let rechterkolom4 = await this.ExtractVelden2(optionsUnchk, ScrolldownUnchk, ScrollcolumnUnchk,ScrollupUnchk, "004");
        await this.compareAllfields(linkerkolom6, rechterkolom4, " 004 Test DblArrowright test");
        await this.clickmod(buttonopslaan)
        let checkDialog = await driver.findElements(By.xpath("(//div[@role='dialog'][1])"));  
        if(checkDialog != 0){
            console.log("   test Passed! dialog loaded 'moet minimaal het veld...bevatten' expected!");    
            await this.catchDialogerror("(//div[@role='dialog'][1])" );
        }
        else {
            console.log("Error!! expected Dialog  'moet minimaal het veld...bevatten' expected!");
        }

        await this.clickmod(buttonstandaard);
        await this.clickmod(buttonopslaan);

        "005 DblArrowleft test"
        await this.clickmod(kolombutton);
        let rechterkolom5 = await this.ExtractVelden2(optionsUnchk, ScrolldownUnchk, ScrollcolumnUnchk,ScrollupUnchk , "005");
        await this.clickmod(DblArrowleft);
        await this.Verifyempty(optionsUnchk, " => 005 Test controle empty rightcolumn");

        let linkerkolom7 = await this.ExtractVelden2(optionsChk, ScrolldownChk, ScrollcolumnChk,ScrollupChk, "005");
        await this.compareAllfields(rechterkolom5, linkerkolom7, "005 Test DblArrowleft test");
        await this.clickmod(buttonopslaan);

        let headers4 = await this.ExtractHeaders(kolomheader, ScrollrightHead, ScrollcolumnHead, ScrollleftHead,);
        await this.clickmod(kolombutton);
        await this.comparefieldsbyOrder( headers4,linkerkolom3, "005 Test DblArrowleft button" );

        await this.clickmod(buttonstandaard); 
        await this.clickmod(buttonopslaan);
    }   

    async kolommencheck2() { 
        "kollomen Boekingsprogramma"

        let dialog = "//div[@id='d_kolomtonen']"
        // let dialogDID = await driver.findElement(By.xpath(dialog)).getAttribute('id');
        // let dialogName = await driver.findElement(By.xpath(dialog)).getAttribute('div_title');
        let buttonstandaard = "//div[@id='d_kolomtonen']//button[@title='Standaard instelling']"
        let buttonopslaan = "//div[@id='d_kolomtonen']//button[@title='OK']"
        let columnsluit = "//div[@id='d_kolomtonen']//button[@title='Sluiten']" 

        let kolomheader = "//div[@id='s_completegrid']//table[@id='table_kolom']//span"
        // let ScrollcolumnHead = "//div[@id='horizontalScrollBard_"+dialogDID+"_content']"
        // let ScrollrightHead = "//div[@id='jqxScrollAreaDownhorizontalScrollBard_"+dialogDID+"_content']"
        // let ScrollleftHead = "//div[@id='jqxScrollAreaUphorizontalScrollBard_"+dialogDID+"_content']"

        // let inviewport = "//span[@class='jqx-listitem-state-normal jqx-item jqx-rc-all']"
        let optionsChk = "//div[@id='d_kolomtonen']//select[@name='tonen']//option"
        let optionsUnchk = "//div[@id='d_kolomtonen']//select[@name='niettonen']//option"

        //let ScrollcolumnChk = "//div[@id='verticalScrollBard_column_selection_listbox_d_"+dialogDID+"_contentchk']"
        //let ScrolldownChk = "//div[@id='jqxScrollAreaDownverticalScrollBard_column_selection_listbox_d_"+ dialogDID +"_contentchk']"
        //let ScrollupChk = "//div[@id='jqxScrollAreaUpverticalScrollBard_column_selection_listbox_d_"+ dialogDID +"_contentchk']"
        
        //let ScrollcolumnUnchk = "//div[@id='verticalScrollBard_column_selection_listbox_d_"+dialogDID+"_contentunchk']"
        //let ScrolldownUnchk = "//div[@id='jqxScrollAreaDownverticalScrollBard_column_selection_listbox_d_"+ dialogDID +"_contentunchk']"
        //let ScrollupUnchk = "//div[@id='jqxScrollAreaUpverticalScrollBard_column_selection_listbox_d_"+ dialogDID +"_contentunchk']"

        let arrowright = "//div[@id='d_kolomtonen']//button[@id='knop_rechts']"
        let arrowleft = "//div[@id='d_kolomtonen']//button[@id='knop_links']"
        let arrowup = "//div[@id='d_kolomtonen']//button[@id='knop_omhoog']"
        let arrowdown = "//div[@id='d_kolomtonen']//button[@id='knop_omlaag']"
        let DblArrowleft =  "//div[@id='d_kolomtonen']//button[@id='knop_alleslinks']"
        let DblArrowright =  "//div[@id='d_kolomtonen']//button[@id='knop_allesrechts']"

        let kolombutton = "//span[@id='td_kolomtonen']"      

        //let zoekveldChk = "//div[@id='filterd_column_selection_listbox_d_"+dialogDID+"_contentchk']//input[@class='jqx-widget jqx-listbox-filter-input jqx-input jqx-rc-all']"
        //let zoekveldUnchk = "//div[@id='filterd_column_selection_listbox_d_"+dialogDID+"_contentunchk']//input[@class='jqx-widget jqx-listbox-filter-input jqx-input jqx-rc-all']"
        // console.log("   tabel => "+dialogName+" "+dialogDID);

        "001 Initial checks"
        let headers = await this.ExtractHeadBoe(kolomheader, );
        await this.clickmod(kolombutton);
        let rechterkolom = await this.ExtractVelden(optionsUnchk, "001 Extract rightcolumn");
        // console.log(rechterkolom)
        let linkerkolom = await this.ExtractVelden(optionsChk, "001 Extract leftcolumn");
        // console.log(linkerkolom)

        await this.comparefieldsbyOrder(headers, linkerkolom,"001 Initial checks" );
        await this.CompareColums(optionsUnchk, headers, linkerkolom, rechterkolom );
        await this.clickmod(buttonstandaard); 
        // await this.clickmod(buttonopslaan);

        "002 Test arrowRight & arrowLeft buttons"
        await this.clickmod(kolombutton);
        let leftfield = await this.ExtractLastField(optionsChk)
        await this.clickmod(optionsChk + "[contains(text(),'"+leftfield+"')]");
        await this.clickmod(arrowright);
        let checkmovedfield = optionsUnchk + "[contains(text(),'"+leftfield+"')]"
        await this.VerifyVeld(leftfield, checkmovedfield,"=> Niet 'kolom tonen' with action rightbutton", "ScrolldownUnchk", "ScrollupUnchk", );

        var checkoption = await driver.findElements(By.xpath(optionsUnchk));
        if(checkoption.length > 0){
            let rightfield = await this.ExtractFirstField(optionsUnchk);
            await this.clickmod((optionsUnchk + "[contains(text(),'"+rightfield+"')]"));
            await this.clickmod(arrowleft);
            let checkmovedfield2 = optionsChk + "[contains(text(),'"+rightfield+"')]"
            await this.VerifyVeld(rightfield, checkmovedfield2, "=> 'kolom tonen' with action leftbutton", "ScrolldownChk", "ScrollupChk",);
        }
        else{
            console.log("   002 Test arrowleft button skipped.");
        }
        await this.clickmod(buttonstandaard); 

        "003 Test arrowDown & arrowUp button"
        await this.clickmod(kolombutton);

        "if array > 2 than execute script. moet nog in "
        let topOption = await this.ExtractFirstField(optionsChk);
        await this.clickmod(optionsChk + "[contains(text(),'"+topOption+"')]");
        await this.clickmod(arrowdown);
        let linkerkolom5 = await this.ExtractVelden(optionsChk, "003 Extract leftcolumn");
        await this.findFields(linkerkolom5[1], topOption, "003 field met klik arrowdown gevonden");

        "zonder opslaan wordt er twee regels gekozen "
        await this.clickmod(buttonopslaan);
        await this.clickmod(kolombutton);

        let bottomOption = await this.ExtractLastField(optionsChk);
        await this.clickmod(optionsChk + "[contains(text(),'"+bottomOption+"')]");
        await this.clickmod(arrowup);
        let linkerkolom4 = await this.ExtractVelden(optionsChk, "003 Extract leftcolumn");
        await this.findFields(linkerkolom4[linkerkolom4.length -2], bottomOption, "003 field met klik arrowup gevonden");
        await this.clickmod(buttonopslaan);        
        let headers3 = await this.ExtractHeadBoe(kolomheader, );
        await this.clickmod(kolombutton);    
        let rechterkolom3 = await this.ExtractVelden(optionsUnchk, "003 Extract rightcolumn");
        let linkerkolom3 = await this.ExtractVelden(optionsChk, "003 Extract leftcolumn");

        await this.comparefieldsbyOrder(linkerkolom3, headers3, "003 Test arrowDown & arrowUp button" );
        await this.CompareColums(optionsUnchk, headers3, linkerkolom3, rechterkolom3 );
        await this.clickmod(buttonstandaard);

        "004 DblArrowright test"
        await this.clickmod(kolombutton);
        let linkerkolom6 = await this.ExtractVelden(optionsChk, "004 Extract leftcolumn");
        await this.clickmod(DblArrowright);
        await this.Verifyempty(optionsChk, " => 004 Test controle empty leftcolumn");

        let rechterkolom4 = await this.ExtractVelden(optionsUnchk, "004 Extract rightcolumn");
        await this.compareAllfields(linkerkolom6, rechterkolom4, " 004 Test DblArrowright test");
        await this.clickmod(buttonopslaan)
        await this.clickmod(kolombutton);

        let checkDialog = await driver.findElements(By.xpath(optionsChk));  
        if(checkDialog.length >= 1){
            console.log("   test Passed! minimaal een veld! gevonden velden " + (checkDialog.length));
        }
        else {
            console.log("Error!! Tonen kolom 'moet minimaal eem veld...bevatten");
        }
        await this.clickmod(buttonstandaard);

        "005 DblArrowleft test"
        await this.clickmod(kolombutton);
        let rechterkolom5 = await this.ExtractVelden(optionsUnchk, "005 Extract rightcolumn");
        await this.clickmod(DblArrowleft);
        await this.Verifyempty(optionsUnchk, " => 005 Test controle empty rightcolumn");

        let linkerkolom7 = await this.ExtractVelden(optionsChk, "005 Extract leftcolumn");
        await this.compareAllfields(rechterkolom5, linkerkolom7, "005 Test DblArrowleft test");
        await this.clickmod(buttonopslaan);

        let headers4 = await this.ExtractHeadBoe(kolomheader, );
        await this.clickmod(kolombutton);
        await this.comparefieldsbyOrder(linkerkolom7, headers4, "005 Test DblArrowleft button" );
        await this.clickmod(buttonstandaard); 


    }   

    async CompareColums(optionsUnchk, headers, linkerkolom, rechterkolom ) { 
        let visiblefields = await driver.findElements(By.xpath(optionsUnchk));
        if (visiblefields != 0){
            await this.CompareInequal(rechterkolom, headers , " => in header <=");
            await this.CompareInequal(rechterkolom, linkerkolom, " => in checked kolom <=");
            return
        }
        else{
            console.log("   Niet Tonen veld leeg CompareColums testen overgeslagen");
            return
        }
    } 

    async findCommonElements(arr1, arr2) { 
        return arr1.some(item => arr2.includes(item)) 
    } 

    async ExtractHeaders(options, Scrollbar, Scrollcolumn, Scrollback ) { 
        var visibility = "[contains(@style,'visible;')]"
        var checkforscroll = await driver.findElements(By.xpath(Scrollcolumn+visibility));
        // console.log(checkforscrollc != 0)
        var extract =[]
        if (checkforscroll != 0){     
            extract = await this.ExtractHead(options)    
            var scrolledstatus = []
            var listbeforeclick = []
            var targetxpath =[]
            listbeforeclick = extract
            targetxpath = listbeforeclick[listbeforeclick.length -1] 
            // await driver.findElement(By.xpath(Scrollbar)).click();
            await this.tryscrollright(Scrollbar, "20")
            do{ 
                let listafterclick = await this.ExtractHead(options)
                // console.log(listafterclick+ " listafterclick")

                let indexlast = listafterclick.indexOf(targetxpath)
                // console.log(indexlast + " positie van target afterclick")
                // console.log(listafterclick[indexlast] + "  Naam target")              
                listbeforeclick = await this.ExtractHead(options)   
                // console.log(listbeforeclick+ " listbeforeclick")
                targetxpath = listbeforeclick[listbeforeclick.length -1] 

                for(var i=indexlast+1; i<listafterclick.length; i++){
                    extract.push(listafterclick[i])
                }

                scrolledstatus = await this.tryscrollright(Scrollbar, "20")
                await driver.sleep(1000);  
            }while(scrolledstatus == true)
        }
        else {
            extract = await this.ExtractHead(options)
        }
        // console.log(extract) 
        await this.ScrollEnd(Scrollback)
        return extract 
    }   

    async tryscrollright(Scrollbar, nrtimes, ) {

        try{
            //await driver.wait(until.elementLocated(By.xpath(Scrollbar)),2000);
            for(var i=1; i<=nrtimes; i++){
            await driver.findElement(By.xpath(Scrollbar)).click();
            }
            await driver.sleep(2000);
            return true
        }
        catch(ElementNotInteractableException){
            "exception handling if the loop is interupted due too unknown lenght of bar"
            try{
                //await driver.wait(until.elementLocated(By.xpath(Scrollbar)),2000);
                await driver.findElement(By.xpath(Scrollbar)).click();
                await driver.sleep(2000);
                return true
            }
            catch(ElementNotInteractableException){

                return false
            }
        }         
    }

    async tryscrolldown(Scrollbar) {
        try{
            await driver.wait(until.elementLocated(By.xpath(Scrollbar)),2000);
            await driver.findElement(By.xpath(Scrollbar)).click();
            return true
        }
        catch(ElementNotInteractableException){
            return false
        }
    }
    
    async ExtractVelden2(options,Scrollbar,Scrollcolumn,Scrollback, test  ) { 
        var hidden = "[contains(@style,'hidden;')]"
        var inherit = "[contains(@style,'inherit;')]"
        var checkforscrollc = await driver.findElements(By.xpath(Scrollcolumn+inherit));
        // console.log(checkforscrollc != 0)
        
        var extract =[]
        if (checkforscrollc != 0){     
            extract = await this.ExtractVelden(options)    
            var scrolledstatus = []
            var listbeforeclick = []
            var targetxpath =[]

            listbeforeclick = extract
            targetxpath = listbeforeclick[listbeforeclick.length -1] 
            await driver.findElement(By.xpath(Scrollbar)).click();

            do{ 
                let listafterclick = await this.ExtractVelden(options)
                // console.log(listafterclick+ " listafterclick")
                let indexlast = listafterclick.indexOf(targetxpath)
                // console.log(indexlast + " positie van target afterclick")
                // console.log(listafterclick[indexlast] + "  Naam target")              
                listbeforeclick = await this.ExtractVelden(options)   
                // console.log(listbeforeclick+ " listbeforeclick")
                targetxpath = listbeforeclick[listbeforeclick.length -1] 

                for(var i=indexlast+1; i<listafterclick.length; i++){
                    extract.push(listafterclick[i])
                }
                scrolledstatus = await this.tryscrolldown( Scrollbar)        

            }while(scrolledstatus == true)
        }
        else {
            extract = await this.ExtractVelden(options, test)
        }
        // console.log(extract) 
        await this.ScrollEnd(Scrollback)
        return extract 

    }

    async ExtractVelden3(options, Scrollbar, Scrollcolumn ) { 
        "afblijven copy maken als je wilt veranderen ofjeweetwatjedoet"
        "check for existence of scrollbar"

        var hidden = "[contains(@style,'hidden;')]"
        var inherit = "[contains(@style,'inherit;')]"
        var checkforscroll = await driver.findElements(By.xpath(Scrollcolumn+inherit));
        // console.log(checkforscrollc != 0)
     
        if (checkforscroll != 0){
            var listbeforeclick = await this.ExtractVelden(options)   
            // console.log(listbeforeclick+ " listbeforeclick")
            this.clickmod(Scrollbar)
            "Laatste zichtbare veld zoeken van de eerste extract, daarna index opzoeken bij tweede extract"
            var targetxpath = listbeforeclick[listbeforeclick.length -1]  
            await driver.sleep(2000);

            var listafterclick = await this.ExtractVelden(options)
            // console.log(listafterclick+ " listafterclick")

            var indexlast = listafterclick.indexOf(targetxpath)
            // console.log(indexlast + " positie van target afterclick")
            // console.log(listafterclick[indexlast] + "  Naam target")
            await driver.sleep(2000);

            for(var i=indexlast+1; i<=listafterclick.length-1; i++){
            extract.push(listafterclick[i])
            }
            // console.log(extract.length)
            // console.log(extract)
        }
        return extract
        // console.log(extract + " extract")       
    }   

    async ExtractHeadBoe(verwachtfile) { 
        "let op falsy waardes leeg en bepaalde uitzonderingen vanwege 'enter /n' eruit gefilterd. "
        // console.log(Naam);
        let Listing = (await driver.findElements(By.xpath(verwachtfile))).length;
        // console.log(parseInt(Listing)+ " <= Menu item");
        if(Listing > 0){
        let naam = [];
        let split = [];
        let finalveld =[];
            for(var i=1; i<=Listing; i++){
                // naam[i] = await driver.findElement(By.xpath("("+verwachtfile+")["+i+"]")).getAttribute("innerText");  
                naam[i] = await driver.findElement(By.xpath("("+verwachtfile+")["+i+"]")).getText();  
                // console.log(naam[i]);

                if(naam[i] == false){
                    "lege waardes, falsy value uitgehaald. de waardes tussen '' "
                }               
                else if(naam[i].includes("Splitsen")){
                    "niks doen hardcoded in header"
                }
                else if(naam[i].includes("BTW")){
                    split[i] = naam[i].split('\n').join(' ')
                    if (split[i].includes("BTW-aangifte tijdvak")){
                        finalveld[i] = "BTW-aangiftetijdvak"
                    }
                    else if(split[i].includes("BTW gewijzigd")){
                        finalveld[i] = "BTWgewijzigd"
                    }
                    else {
                        finalveld[i] = split[i]
                    }
                }
                else if(naam[i].includes("Debiteur/")){
                    finalveld[i] = naam[i].split('\n').join('')
                }
                else if(naam[i].includes("Tegen-")){
                    finalveld[i] = naam[i].split('\n').join('')
                }               
                else if(naam[i].includes("Batchkenmerk")){
                    finalveld[i] = naam[i].split('\n').join('')
                }
                else if(naam[i].includes("Factuuraantal")){
                    finalveld[i] = naam[i].split('\n').join('')
                }
                else if(naam[i].includes("Omzet-aantal")){
                    finalveld[i] = naam[i].split('\n').join('')
                }
                else if(naam[i].includes("Formulier")){
                    finalveld[i] = naam[i].split('\n').join('')
                }
                else{
                    finalveld[i] = naam[i].split('\n').join(' ')
                }
            }


        let finalveld2 = finalveld.filter(function () { return true });
        return finalveld2
        }
        else{
            // console.log("geen options")
            return false
        }       
    }


    async ExtractHead(verwachtfile) { 
        "let op falsy waardes leeg en bepaalde uitzonderingen vanwege 'enter /n' eruit gefilterd. "
        // console.log(Naam);
        let Listing = (await driver.findElements(By.xpath(verwachtfile))).length;
        // console.log(parseInt(Listing)+ " <= Menu item");
        if(Listing > 0){
        let naam = [];
        let finalveld =[];
            for(var i=1; i<=Listing; i++){
                // naam[i] = await driver.findElement(By.xpath("("+verwachtfile+")["+i+"]")).getAttribute("innerText");  
                naam[i] = await driver.findElement(By.xpath("("+verwachtfile+")["+i+"]")).getText();  
                // console.log(naam[i]);
                if(naam[i] == false){
                    "lege waardes, falsy value uitgehaald. de waardes tussen '' "
                }
                else if(naam[i].includes("Splitsen")){
                }
                else if(naam[i].includes("Bankrekening")){
                    finalveld[i] = naam[i].split('\n').join(' ')
                }
                else if(naam[i].includes("Vrij veld")){
                    finalveld[i] = naam[i].split('\n').join(' ')
                }
                else if(naam[i].includes("Klant")){
                    finalveld[i] = naam[i].split('\n').join(' ')
                }
                else if(naam[i].includes("Banksoort voor")){
                    finalveld[i] = naam[i].split('\n').join(' ')
                }
                else if(naam[i].includes("BIC/SWIFT")){
                    finalveld[i] = naam[i].split('\n').join(' ')
                }
                else if(naam[i].includes("Nummer bij")){
                    finalveld[i] = naam[i].split('\n').join(' ')
                }
                else if(naam[i].includes("Telefoon")){
                    finalveld[i] = naam[i].split('\n').join(' ')
                }
                else if(naam[i].includes("BTW")){
                    finalveld[i] = naam[i].split('\n').join(' ')
                }
                else if(naam[i].includes("BkVrkVa")){
                    finalveld[i] = "Blokkeren voor verkooporders vanaf"
                }
                else if(naam[i].includes("Betalingsplichtige")){
                    finalveld[i] = "Betaler"
                }
                else if(naam[i].includes("Voork.levcond")){
                    finalveld[i] = "Voorkeursleveringsconditie"
                }
                else if(naam[i].includes("Voork.opdrwz")){
                    finalveld[i] = "Voorkeursopdrachtwijze"
                }
                else if(naam[i].includes("Voork.verzwz")){
                    finalveld[i] = "Voorkeursverzendwijze"
                }
                else{
                    finalveld[i] = naam[i].split('\n').join('')

                }

            }
        let finalveld2 = finalveld.filter(function () { return true });
        return finalveld2
        }
        else{
            // console.log("geen options")
            return false
        }       
    }

    async ExtractVelden(verwachtfile, test ) { 
        "let op falsy waardes leeg en bepaalde uitzonderingen vanwege 'enter /n' eruit gefilterd. "
        // console.log(Naam);
        let Listing = (await driver.findElements(By.xpath(verwachtfile))).length;
        // console.log(parseInt(Listing)+ " <= Menu item");
        if(Listing > 0){
        let naam = [];
        let finalveld =[];
            for(var i=1; i<=Listing; i++){
                // naam[i] = await driver.findElement(By.xpath("("+verwachtfile+")["+i+"]")).getAttribute("innerText");  
                naam[i] = await driver.findElement(By.xpath("("+verwachtfile+")["+i+"]")).getText();  
                // console.log(naam[i]);
                if(naam[i] == false){
                    "lege waardes, falsy value uitgehaald. de waardes tussen '' "
                }
                else{
                    finalveld[i] = naam[i].split('\n').join('')
                }
            }
        let finalveld2 = finalveld.filter(function () { return true });
        return finalveld2
        }
        else{
            console.log("   no options found " + test)
            return false
        }       
    }

    async ExtractVeldenBoe(verwachtfile, test ) { 
        "let op falsy waardes leeg en bepaalde uitzonderingen vanwege 'enter /n' eruit gefilterd. "
        // console.log(Naam);
        let Listing = (await driver.findElements(By.xpath(verwachtfile))).length;
        // console.log(parseInt(Listing)+ " <= Menu item");
        if(Listing > 0){
        let naam = [];
        let finalveld =[];
            for(var i=1; i<=Listing; i++){
                // naam[i] = await driver.findElement(By.xpath("("+verwachtfile+")["+i+"]")).getAttribute("innerText");  
                naam[i] = await driver.findElement(By.xpath("("+verwachtfile+")["+i+"]")).getText();  
                // console.log(naam[i]);
                if(naam[i] == false){
                    "lege waardes, falsy value uitgehaald. de waardes tussen '' "
                }
                else{
                    finalveld[i] = naam[i].split('\n').join('')
                }
            }
        let finalveld2 = finalveld.filter(function () { return true });
        return finalveld2
        }
        else{
            console.log("   no options found " + test)
            return false
        }       
    }

    async ExtractFirstField(options, ) { 
        "check for existing value in de kolom, if true than get xpath and return"

        let Listing = (await driver.findElements(By.xpath(options))).length;
        if(Listing > 0){
            let value = await driver.findElement(By.xpath(options)).getText();  
            return value 
        }
        else{
            "no value found return false"
            return false
        }
    }


    async ExtractLastField(options, ) { 
        "let op falsy waardes leeg en bepaalde uitzonderingen vanwege 'enter /n' eruit gefilterd. "
        "return is de last visible field, xpath is readty to use."
        let Listing = (await driver.findElements(By.xpath(options))).length;
        // console.log(parseInt(Listing)+ " <= Menu item");
        if(Listing > 0){
        let naam = [];
        let finalveld =[];
            for(var i=1; i<=Listing; i++){
                // naam[i] = await driver.findElement(By.xpath("("+verwachtfile+")["+i+"]")).getAttribute("innerText");  
                naam[i] = await driver.findElement(By.xpath("("+options+")["+i+"]")).getText();  
                // console.log(naam[i]);
                if(naam[i] == false){
                    "lege waardes, falsy value uitgehaald. de waardes tussen '' "
                }
                else{
                    finalveld[i] = naam[i].split('\n').join('')
                }
            }

        let finalveld2 = finalveld.filter(function () { return true });
        // let finalfield = options+ "[.='"+finalveld2[finalveld2.length -1]+"']"
        // console.log(finalfield)
        let finalfield = finalveld2[finalveld2.length -1]
        // console.log(finalfield)
        return finalfield

        }
        else{
            // console.log("geen options")
            return false
        }       
    }

    async ScrollEnd(Scrollbar ) { 
        let checkforscroll = await driver.findElements(By.xpath(Scrollbar));
        if (checkforscroll != 0){
            while(true){
                try {
                    await driver.findElement(By.xpath(Scrollbar)).click();
                }       
                catch(NoSuchElementException){
                    break
                }
            }
        }
    }

    async compareAllfields(Array1, Array2, Naamtest,  ) { 
        // console.log(Naamtest)
        // var Array1 = output.filter(function () { return true });
        if(Array1 != 0){
            var includecheck = [];
            var includetrue = [];
            var includefalse = [];
            // var Array1lengte = Array1.length;
            for(var i=0; i<Array1.length; i++){
                "welk item in 'Array1' is er gevonden en zit in de Array2"
                includecheck[i] = (Array2.includes(Array1[i]))
                if(includecheck[i] === true){
                    includetrue[i] = Array1[i];
                    // console.log(includetrue[i])
                }
                else{
                    includefalse[i] = Array1[i]
                    console.debug("    'ERROR' item =>"+Array1[i], "<= is niet gevonden in target Array" + Naamtest);
                }
            }
            // console.log(includetrue)
        }
        else{
            console.debug("    'Warning' geen gevonden objecten in extract result "+Naamtest)
            return false
        }

        "gewenste status bij 'return' ivm met meerdere arrays kan later anders "
        if(includefalse != 0){
            console.log("Error field niet gevonden gevonden => " +Naamtest)
            //console.log(includefalse[i])
            return false 
        }
        else{
            console.log("   test Passed! Alle fields gevonden in target array2. => " +Naamtest)
            return true
        }
        
    }

    async Verifyempty(column, test ) { 
        let Listing = (await driver.findElements(By.xpath(column))).length;
        // console.log(Listing)
        if(Listing > 0){
            console.log("Error! waardes gevonden. " + test)
        }
        else{
            console.log("   test Passed! geen waardes gevonden. " + test)
        }
    }

    async VerifyVeld(veld, options, locatie, Scrollbar, Scrollback, ) { 
        "function is made to do a initial check if value is immediatly found in column"
        "after does a check for scrolldown if initial screen not found "
        "do or while loop totdat item is gevonden anders error terug"
        let initialsearch = await driver.findElements(By.xpath(options));
        // console.log (initialsearch != 0)
        let status = []

        if (initialsearch != 0){
            console.log("   test Passed! field => " + veld + " <= found in => " + locatie);
        }
        else{
            do {
                try{
                    await driver.wait(until.elementLocated(By.xpath(Scrollbar)),2000);
                    await driver.findElement(By.xpath(Scrollbar)).click();
                }
                catch(ElementNotInteractableError){
                    "zou de loop moeten breken wanneer einde bereikt wordt van de scrollbar."
                    console.log("Error " + veld + " Not found in " + locatie )
                    await this.ScrollEnd(Scrollback)
                    return false 
                }
                status = await driver.findElements(By.xpath(options));
            }while(status == false)
        }

        await this.ScrollEnd(Scrollback)
        if (status != 0){
            console.log("   test Passed! Moved field =>" + veld + "<= found in => " + locatie)
            await this.ScrollEnd(Scrollback)
            return true
        }
        else{
            return false
        }
    }

    async CompareInequal(Array1, Array2, test) { 

        "controle van elke option bij Unchecked kolom dus Array1. deze zou niet terug te vinden moeten zijn in de Array2"
        if (Array1.some(item => Array2.includes(item))){ 
            console.log("Error!! een option zichtbaar beide arrays" + Array1.some(item => Array2.includes(item)) + test )
            let checkfail = [] 
            for(var i=0; i<Array1.length; i++){
                if (Array2.includes(Array1[i])){
                    // console.log("Error unchecked option gevonden in Array2 =>  " + Array1[i])
                    checkfail[i] = Array1[i]
                    console.log(    "Error klopt niet "+ Array1[i] + Array2[i])
                }
                else {
                    // console.log("    checked! "+Array1[i])
                }
            }

            if (checkfail != 0){
                console.log("Error!! Options in Unchecked kolom gevonden in " + test)

            }
            else {
                console.log("   test Passed! Options in Unchecked kolom niet terug te vinden " + test)
            }
        }
        else {
            // console.log("   test Passed! equality found? " +Array1.some(item => Array2.includes(item)) + test)
            "onderstaande script mag eigenlijk weg nog even ter controle anhouden"            
            let checkfail = [] 
            for(var i=0; i<Array1.length; i++){
                if (Array2.includes(Array1[i])){
                    // console.log("Error unchecked option gevonden in Array2 =>  " + Array1[i])
                    checkfail[i] = Array1[i]
                    console.log(    " klopt niet "+ Array1[i] + Array2[i])
                }
                else {
                    // console.log("    checked! "+Array1[i])
                }
            }
            if (checkfail != 0){
                console.log("Error!! een vergelijkbaar iten gevonden !")
                // console.log("   "+checkfail)
            }
            else {
                console.log("   test Passed! options in Unchecked kolom niet terug te vinden " + test)
            }

        }
    }
    
    async OptionUnchecked2(Array1, Array2) { 

        let checkfail = [] 
        for(var i=0; i<Array1.length; i++){
            if (Array2.includes(Array1[i])){
                // console.log("Error unchecked option gevonden in Array2 =>  " + Array1[i])
                checkfail[i] = Array1[i]
                console.log(    "Error klopt niet "+ Array1[i] +"<= gevonden in array")
            }
            else {
                // console.log("    checked! "+Array1[i])
            }
        }
        if (checkfail != 0){
            console.log("Error!! een unchecked item in kolom zichtbaar in Array2")
            // console.log("   "+checkfail)
        }
        else {
            console.log("  test Passed! options in Unchecked kolom niet terug te vinden in Array2s ")
        }
    }

    async findFields(array2, array1, naam ) { 

        if (array1 === array2){
            console.log("   test Passed! "+naam+"  =>" + array1 + " <=> " + (array2))
        }
        else {
            console.log("Error "+naam+ " result in fields =>  " + array1 + " <=> " + (array2))
        }
      }


    async comparefieldsbyOrder(array1, array2, naamtest) { 
        "alleen geschikt om de volgorde van de headers te vegelijken met de linkerkolom"
        "LET OP deze zijn alleen de headers in viewport eerste 13 items afhk van breedte van elk kolom. "
        // console.log(array1.length)
        if (array1 != 0){
            let comparefalse = [] 
            for(var i=0; i<array2.length; i++){
                if (array1[i] === (array2[i])){
                    // console.log(array1[i] +" <=> "+ (array2[i]))
                }
                else {
                    console.log("   Nope =>  " + array1[i] +" <=> "+ (array2[i]))
                    comparefalse[i] = array1[i]
                }
            }

            if (comparefalse != 0){
                console.log("Error!! Headers in tabbellen komt niet overeen in volgorde van 'Checked kolom")
                // console.log(comparefalse)
                return
            }
            else{
                console.log("   test Passed! Headers staat in volgorde van 'Checked kolom' => " + naamtest)
                return
            }
        }
    }

    async clickmod(element,) { 
        await driver.wait(until.elementLocated(By.xpath(element)),2000);
        await driver.findElement(By.xpath(element)).click();
        await driver.sleep(1000);
    }

    async catchDialogerror(dialog, result,) {
        "probeer hier verschillende meldingen te plaatsen "
        " dialog error popup"
        await driver.wait(until.elementLocated(By.xpath(dialog)), 2000);
        var meld = await driver.findElement(By.xpath(dialog)).getText();
        // console.log(meld);
        "let op check moet overeenkomen met button!!!"
        var check1 = []
        var check2 = []
        var check3 = []
        var check4 = []
        var button1 = "//div[@role='dialog']//button[.='OK']"
        var button2 = "//div[@role='dialog']//button[.='Annuleren']"
        var button3 = "//div[@role='dialog']//button[normalize-space()='OK']"
        var button4 = "//div[@role='dialog']//button[.='Sluiten']"
    
        if (meld.match("Er is geen regel geselecteerd.")){
            var msg = "        error dialog gevonden! geen regel?"
            check1 = await driver.findElements(By.xpath(button1));
            // console.log(msg);
        }
        else if(meld.match("Nog niet volledig ingevuld")){
            var msg = "        error dialog gevonden! Nog niet volledig ingevuld"
            check1 = await driver.findElements(By.xpath(button1));
            console.log(msg);
        }
        else if(meld.match("De kolom 'Tonen' moet minimaal het veld")){
            var msg = "        error dialog gevonden! De kolom 'Tonen' moet minimaal het veld '' bevatten."
            check1 = await driver.findElements(By.xpath(button1));
            await this.clickmod(button1)
            // console.log(msg);
        }
        else if(meld.match("Weet u zeker dat u dit item wilt verwijderen?")){
            var msg = "        error dialog gevonden! Weet u zeker dat u dit item wilt verwijderen?"
            check2 = await driver.findElements(By.xpath(button2));
            // console.log(msg);
        }
        else if(meld.match("Nog niet alle instellingen zijn gemaakt. Zie hiervoor het tabblad Instellingen.")){
            var msg = "        error dialog gevonden! Nog niet alle instellingen zijn gemaakt. Zie hiervoor het tabblad Instellingen."
            check1 = await driver.findElements(By.xpath(button1));
            check2 = await driver.findElements(By.xpath(button2));
            console.log(msg);
        }
        else if(meld.match("Uw opgegeven selecties leveren geen gegevens op.")){
            var msg = "        error dialog gevonden! Opgegeven selectie levert geen gegevens op?"
            check1 = await driver.findElements(By.xpath(button1));
            console.log(msg);
        }
        else if(meld.match("Voor werksoorten wordt geen voorraad bijgehouden.")){
            var msg = "        error dialog gevonden! Voor werksoorten wordt geen voorraad bijgehouden."
            check1 = await driver.findElements(By.xpath(button1));
            console.log(msg);
        }
        else if(meld.match("U bent geen lid van een groep. Zie de introductie van Relatiebeheer voor meer informatie.")){
            var msg = "        error dialog gevonden! U bent geen lid van een groep. Zie de introductie van Relatiebeheer voor meer informatie."
            check1 = await driver.findElements(By.xpath(button1));
            console.log(msg);
        }
        else if(meld.match("factuur mag geen lege waarde bevatten..")){
            var msg = "        error dialog gevonden! factuur mag geen lege waarde bevatten.."
            check3 = await driver.findElements(By.xpath(button3));
            console.log(msg+result);
        }
        else if(meld.match("Verslaglegging t.b.v. tellen resultaat moet nog worden ingevuld met een passiva rekening.")){
            var msg = "        error dialog gevonden! Verslaglegging t.b.v. tellen resultaat moet nog worden ingevuld met een passiva rekening."
            check3 = await driver.findElements(By.xpath(button3));
            console.log(msg+result);
        }
        else if(meld.match("Er is nog geen dagboek ingevuld.")){
            var msg = "        error dialog gevonden! Er is nog geen dagboek ingevuld."
            check1 = await driver.findElements(By.xpath(button1));
            console.log(msg+result);
        }
        else if(meld.match("Er zijn nog onverwerkte bankafschriftregels. Hierdoor is de administratie niet actueel.")){
            var msg = "        error dialog gevonden! Er zijn nog onverwerkte bankafschriftregels. Hierdoor is de administratie niet actueel."
            check4 = await driver.findElements(By.xpath(button4));
            console.log(msg+result);
        }
        else if(meld.match("Uw sessie is uitgelogd, log opnieuw in!")){
            var msg = "        error dialog gevonden! Uw sessie is uitgelogd, log opnieuw in!"
            await this.clickmod(button3)
            console.log("Error! sessie uitgelogd bij => "+result);  
            exit(2)
        }
        else if(meld.match("Er kon tijdelijk geen verbinding gemaakt worden met de Factuur2KING 3.0-server.")){
            var msg = "error dialog gevonden! Er kon tijdelijk geen verbinding gemaakt worden met de Factuur2KING 3.0-server."
            check1 = await driver.findElements(By.xpath(button1));
            console.log(msg+result);
        }
        else if(meld.match("Aantal opgegeven waarden komt niet overeen met aantal opgegeven velden")){
            var msg = "error dialog gevonden! Aantal opgegeven waarden komt niet overeen met aantal opgegeven velden " + " => WI23360 <= "
            check1 = await driver.findElements(By.xpath(button1));
            console.log(msg+result);
        }    
        else{
            console.log("ERROR catch dialog geen match gevonden.")
            console.log(meld);  
            exit(2)
        }
    }
}
module.exports = new kolommenpage();
