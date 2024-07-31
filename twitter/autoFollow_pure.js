// 定义链接列表
const links = ['https://x.com/star_okx', 'https://x.com/rnmumu3', 'https://x.com/BlockBeatsAsia', 'https://x.com/IamRamenPanda', 'https://x.com/CryptoDoggyCN', 'https://x.com/FLS_OTC', 'https://x.com/justinsuntron', 'https://x.com/ChinaMacroFacts', 'https://x.com/Phyrex_Ni', 'https://x.com/TheMarketMemo', 'https://x.com/NatsumiYuki336', 'https://x.com/Rumoreconomy', 'https://x.com/i5ting', 'https://x.com/yuanhedge', 'https://x.com/dannycheng2022', 'https://x.com/TheRoaringKitty', 'https://x.com/catmangox', 'https://x.com/qinbafrank', 'https://x.com/alifarhat79', 'https://x.com/ShanghaoJin', 'https://x.com/geniusvczh', 'https://x.com/skywind3000', 'https://x.com/RIJIANHUN', 'https://x.com/foxshuo', 'https://x.com/keyahayek', 'https://x.com/Captxueinshai', 'https://x.com/CatChen', 'https://x.com/OpenAI', 'https://x.com/sama', 'https://x.com/Huxpro', 'https://x.com/animesvibes__', 'https://x.com/stupid_pre', 'https://x.com/HighyieldHarry', 'https://x.com/dashengmedia', 'https://x.com/BunnyAyu', 'https://x.com/shukan_bunshun', 'https://x.com/HANADA_asuka', 'https://x.com/kishida230', 'https://x.com/konotarogomame', 'https://x.com/erchenlu1', 'https://x.com/wushi0001', 'https://x.com/Japan_Emb_inCN', 'https://x.com/dreamwords', 'https://x.com/Brad_Setser', 'https://x.com/cctvidiots', 'https://x.com/crossbordercap', 'https://x.com/bespokeinvest', 'https://x.com/Fxhedgers', 'https://x.com/michaelxpettis', 'https://x.com/Rocky_Bitcoin', 'https://x.com/SamanthaLaDuc', 'https://x.com/BillGates', 'https://x.com/mtrainier2020', 'https://x.com/ShouldHaveCat', 'https://x.com/ecommerceshares', 'https://x.com/historyinmemes', 'https://x.com/RayDalio', 'https://x.com/myfxtrader', 'https://x.com/NewsCaixin', 'https://x.com/evilcos', 'https://x.com/wuvist', 'https://x.com/hankinbeijing', 'https://x.com/usstockcaptain', 'https://x.com/wangwatchworld', 'https://x.com/Reuters', 'https://x.com/DailyDarkWeb', 'https://x.com/kamiya_mamoru', 'https://x.com/woaiqiuqiu5200', 'https://x.com/0pwzZDYmLSVTdZG', 'https://x.com/HongKong_Doll', 'https://x.com/Pathusa', 'https://x.com/zaobaosg', 'https://x.com/bbcchinese', 'https://x.com/MaiChen7819', 'https://x.com/realDonaldTrump', 'https://x.com/nytchinese', 'https://x.com/ChineseWSJ', 'https://x.com/Xbox', 'https://x.com/Steam', 'https://x.com/bboczeng', 'https://x.com/lidangzzz', 'https://x.com/www122010', 'https://x.com/xup6_2', 'https://x.com/tsujiiHonoka', 'https://x.com/kkkkkjoXY', 'https://x.com/hxr68095323', 'https://x.com/xiangcaiqusiba', 'https://x.com/JPSX00', 'https://x.com/elonmusk'];

// 从LocalStorage中读取当前链接
let currentLink = localStorage.getItem('currentLink');

// 如果currentLink是空值或者是null，就赋值为列表links的第一个值
if (!currentLink) {
    currentLink = links[0];
}

// while (window.location.href === currentLink) {
//     let currentIndex = links.indexOf(currentLink);
//     currentLink = links[currentIndex + 1];
// }

// 把currentLink的值写入LocalStorage
localStorage.setItem('currentLink', currentLink);

currentLink = localStorage.getItem('currentLink');

// 截取currentLink字符串中最后一个斜杠到字符串结尾的部分，赋值给username
const username = currentLink.substring(currentLink.lastIndexOf('/') + 1);

// 搜索页面元素，获取aria-label值为Follow@username的button
const followButton = document.querySelector(`button[aria-label="Follow @${username}"]`);

// 点击button
if (followButton) {
    followButton.click();
} else {
    console.log(`Follow button for @${username} not found.`);
}

// 更新currentLink为下一个链接
const currentIndex = links.indexOf(currentLink);
if (currentIndex === links.length) {
    console.log("All followed!");
} else {
    const nextIndex = (currentIndex + 1) % links.length;
    localStorage.setItem('currentLink', links[nextIndex]);
    window.location.href = links[nextIndex];
}
