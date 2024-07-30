import puppeteer from "puppeteer";
import dotenv from "dotenv";
import * as path from "node:path";
import { fileURLToPath } from 'url';

// 获取当前模块的文件名和目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 加载环境变量
dotenv.config({
    path: path.resolve(__dirname, "../.env"),
});

export default async function getFollowings() {

    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    // login
    await page.goto("https://x.com/i/flow/login");
    await page.type('input[name="session[username]"]', username);
    await page.type('input[name="session[password]"]', password);
    await page.click('div[data-testid="LoginForm_Login_Button"]');
    await page.waitForNavigation();

    // route following
    await page.goto(`https://twitter.com/${username}/following`);

    // get all following list
    let previousHeight;
    while (true) {
        previousHeight = await page.evaluate('document.body.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        await page.waitForTimeout(2000);
        const newHeight = await page.evaluate('document.body.scrollHeight');
        if (previousHeight === newHeight) break;
    }

    // fetch following
    const followings = await page.evaluate(() => {
        return Array.from(
            document.querySelectorAll('div[data-testid="UserCell"]')
        ).map(user => {
            const username = user.querySelector('div > div > div > div > div > span').innerText;
            const name = user.querySelector('div > div > div > div > div > div > span').innerText;
            return {username, name}
        })
    })

    console.log(followings);

    await browser.close();
}

console.log("get followings start");
getFollowings();