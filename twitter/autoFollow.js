import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前模块的文件名和目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 加载环境变量
dotenv.config({ path: path.resolve(__dirname, '../config/.env') });

const username = process.env.TWITTER_USERNAME;
const password = process.env.TWITTER_PASSWORD;

// 要关注的账号链接列表
const accountLinks = [
    'https://twitter.com/account1',
    'https://twitter.com/account2',
    'https://twitter.com/account3'
];

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // 登录Twitter
    await page.goto('https://twitter.com/login');
    await page.type('input[name="session[username_or_email]"]', username);
    await page.type('input[name="session[password]"]', password);
    await page.click('div[data-testid="LoginForm_Login_Button"]');
    await page.waitForNavigation();

    // 批量关注账号
    for (const link of accountLinks) {
        await page.goto(link);
        await page.waitForSelector('div[data-testid="placementTracking"]');
        const followButton = await page.$('div[data-testid="placementTracking"]');
        if (followButton) {
            await followButton.click();
            console.log(`Followed ${link}`);
        } else {
            console.log(`Already following ${link} or follow button not found`);
        }
        await page.waitForTimeout(2000); // 等待2秒，避免被检测为机器人
    }

    // 关闭浏览器
    await browser.close();
})();
