const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const fs = require('fs');
const XLSX = require('xlsx')
var BasePage = require('./base.page.js');


class ReadfilePage extends BasePage{
       
    async FileInlezen(file){ 
        var ingelezen = [];
        try {
            var ingelezen = fs.readFileSync(file, 'utf8').split('\r\n')       
        } catch (err) {
            console.error("ERROR file niet ingelezen " +file);
            return false
        }
        return ingelezen
    }
    
   
    async CountInlezen(worksheet, User, excel, blad) { 
        let Kolom = await this.CheckUser(excel, blad, User)
        const column = [];
        "cell[0] is de eerste regel, moet voldoen aan opgegeven Kolom "
        for (let cell in worksheet) {
            if (cell[0] === Kolom) {
            column.push(worksheet[cell].v);
            }
        }
        return column
    }

    async  menuInlezenVink(worksheet, Kolom, contains) {        

        "de hele lijst eerste kolom B"
        let columnList = [];        
        "kolom met de aangegeven vinkjes 'Kolom'"
        let columnVink = [];
     
        for (let cell in worksheet) {
            if (cell[0] === 'B') {
                columnList.push(worksheet[cell].v);
            
            }else if (cell[0] === Kolom){
                columnVink.push(worksheet[cell].v);  
            }
        }
        // console.log(columnVink.length)
        // console.log(columnList.length)
        // console.log(columnList.length == columnVink.length)
        let result = [];
        
        if (columnList.length == columnVink.length){
            for (let i = 0; i <= columnList.length; i++) {
                if (columnVink[i] === contains) {
                result.push(columnList[i]);
                }
            }
            return result
        }
        else{
            console.log("Error uitgelezen array komen niet overeen. controleer excel file")
        }
        console.log(result);
        
    }
    
    async CheckUser(File, blad, user ) { 
        const workbook = XLSX.readFile(File, {sheetRows: 1});
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[blad], {header: 1, defval: '', blankrows: true});
        const columnIndex = sheetData[0].findIndex(cellValue => cellValue.includes(user));
        // console.log(columnIndex)
        if(columnIndex < 0){
            console.log("Error geen matching user gevonden controleer excel file op => " + user)
            return
        }
        let convert = this.getColumnLetterByIndex(columnIndex)
        return convert
    }

    async getColumnLetterByIndex(index) {
        let dividend = index + 1;
        let columnName = '';
        let modulo;
      
        while (dividend > 0) {
          modulo = (dividend - 1) % 26;
          columnName = String.fromCharCode(65 + modulo) + columnName;
          dividend = Math.floor((dividend - modulo) / 26);
        }
      
        return columnName;
    }

    async ExcludeInlezen(worksheet, User, excel, blad, contains) {       
        let Kolom = await this.CheckUser(excel, blad, User)

        "de hele lijst eerste kolom B"
        let columnList = [];        
        "kolom met de aangegeven vinkjes 'Kolom'"
        let columnVink = [];
     
        for (let cell in worksheet) {
            if (cell[0] === 'B') {
                columnList.push(worksheet[cell].v);
            
            }else if (cell[0] === Kolom){
                columnVink.push(worksheet[cell].v);  
            }
        }
        // console.log(columnVink.length)
        // console.log(columnList.length)
        // console.log(columnList.length == columnVink.length)
        let result = [];
        
        if (columnList.length == columnVink.length){
            for (let i = 0; i <= columnList.length; i++) {
                if (columnVink[i] === contains) {
                result.push(columnList[i]);
                }
            }
            return result
        }
        else{
            console.log("Error uitgelezen array komen niet overeen. controleer excel file")
        }
        console.log(result);
        
    }


}

module.exports = new ReadfilePage();



