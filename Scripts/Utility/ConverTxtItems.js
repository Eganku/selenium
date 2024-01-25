const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const ExtractPage = require('./Page/ExtractArray.page.js');
const Readfile = require('../Page/readfile.page.js');

const XLSX = require('xlsx')
async function example(){

console.log("=> => excel test <= <=");

const Closefile = await ExtractPage.FileInlezen('path\\..\\selenium\\Menutest\\Sluitknoppen.txt')
console.log(Closefile)
return 




const excel =  "path\\..\\selenium\\Menutest\\menusmoketest.xlsx" 
const workbook = XLSX.readFile(excel);
const worksheet = workbook.Sheets["Expect"];
const worksheet2 = workbook.Sheets["MenuCount"];

let user = "Wingacc"
let convert = await CheckUser(excel, "Expect", "Wingacc")
console.log(convert)
let IgnoreFile = await Readfile.ExcludeInlezen(worksheet, user, excel, "Expect", "Exclude")
let expected = await Readfile.CountInlezen(worksheet2, user, excel, "MenuCount",)

// console.log(IgnoreFile)
console.log(expected)


return
var expectedLite = await CountInlezen(excel, "MenuCount", "F")
// let file02 = await menuInlezen(excel, "Test", "B")
// let file02 = await menuInlezenVink(excel, "Expect", "C" , "Exclude")
console.log(expectedLite)


};

example()

    async function CheckUser(File, blad, user ) { 
        const workbook = XLSX.readFile(File, {sheetRows: 1});
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[blad], {header: 1, defval: '', blankrows: true});
        const columnIndex = sheetData[0].findIndex(cellValue => cellValue.includes(user));
        
        if(columnIndex < 0){
            console.log("Error geen matching user gevonden controleer excel file op => " + user)
        }

        let convert = getColumnLetterByIndex(columnIndex)
        return convert
    }

    async function CountInlezen(worksheet, Kolom) { 
        const column = [];
        "cell[0] is de eerste regel, moet voldoen aan opgegeven Kolom "
        for (let cell in worksheet) {
            if (cell[0] === Kolom) {
            column.push(worksheet[cell].v);
            }
        }
        return column
    }

    function getColumnLetterByIndex(index) {
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
    
    async function XmlsInlezen(File, Blad, Kolom) { 
        "file locatie aangeven"
        const workbook = XLSX.readFile(File);
        "blad aangeven "
        const worksheet = workbook.Sheets[Blad];
        "kolom aangeven"
        const column = [];
        "cell[0] is de eerste regel, moet voldoen aan opgegeven Kolom "
        for (let cell in worksheet) {
            if (cell[0] === Kolom) {
            column.push(worksheet[cell].v);
            }
        }
        return column
    }