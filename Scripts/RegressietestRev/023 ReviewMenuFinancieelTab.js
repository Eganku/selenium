const {Builder, By, Actions, Key, until, } = require('selenium-webdriver');
const ReviewUserPage = require('../Page/review.user.page.js');
const Regression = require('../Page/Regrfunc.page.js');

async function example(){
    "demo set "
    // await DemoUserPage.wing(555);
    "rev set bundels."
    await ReviewUserPage.wingman(350);
    // await ReviewUserPage.wingbasis(350);
    "dev set betalenperadm"
    // await ReviewUserPage.wingacc(555);

    "test"
    // await Regression.menuFinanceRap();
    await Regression.menuFinancetab();
    // await Regression.menuFinance();
    // await Regression.menuCRM();
};
example()
