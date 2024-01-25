const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const ReviewUserPage = require('../Page/review.user.page.js');
const Regression = require('../Page/Regrfunc.page.js');

async function example(){
    "demo set "
    // await DemoUserPage.wing(555);
    "rev set bundels."
    // await ReviewUserPage.wingman(555);
    // await ReviewUserPage.wingbasis(555);
    "dev set betalenperadm"
    await ReviewUserPage.wingacc(200);
    "test"
    await Regression.menuFinanceRap();
    // await Regression.menuFinancetab();
    // await Regression.menuFinance();
};
example()
