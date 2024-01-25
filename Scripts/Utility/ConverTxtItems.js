const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');

const HomePage = require('../Page/home.page.js');
const ReviewUserPage = require('../Page/review.user.page.js');
const DemoUserPage = require('../Page/demo.user.page.js');
const LinkerMenu = require('../Page/linkermenu.page.js');
const FunctionsPage = require('../Page/functions.page.js');
const StamGegevensPage = require('../Page/stamgegevens.page.js');
const divconfirm = require('../Page/divconfirm.page.js');
const divalert = require('../Page/divalert.page.js');
const BoekingsProgramma = require('../Financieel/Boekingprogram.page.js');
const BTWaangifte = require('../Financieel/BTWaangifte.page.js');
const Bankieren = require('../Financieel/bankieren.page.js');
const ExtractPage = require('../Page/ExtractArray.page.js');
const kolom = require('../Page/Kolommentest.page.js');
const Readfile = require('../Page/readfile.page.js');

const XLSX = require('xlsx')
async function example(){

console.log("=> => excel test <= <=");

const fs = require('fs');


var file = 'path\\..\\selenium\\Menutest\\Sluitknoppen.txt'

var ingelezen = fs.readFileSync(file, 'utf8').split('\r\n')       
// const Closefile = await Readfile.FileInlezen('path\\..\\selenium\\Menutest\\Sluitknoppen.txt')
console.log(ingelezen)
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