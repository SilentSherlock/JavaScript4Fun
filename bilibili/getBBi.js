const axios = require('axios');

// 配置你的 Cookie 信息
const cookies = {
    DEDEUSERID: 'your_dedeuserid',
    SESSDATA: 'your_sessdata',
    bili_jct: 'your_bili_jct'
};

// 设置 Axios 实例
const instance = axios.create({
    baseURL: 'https://api.bilibili.com',
    headers: {
        'Cookie': `DEDEUSERID=${cookies.DEDEUSERID}; SESSDATA=${cookies.SESSDATA}; bili_jct=${cookies.bili_jct}`
    }
});

// 自动领取 B 币
async function getBBi() {
    try {
        const response = await instance.post('/x/vip/privilege/receive', {
            type: 1 // B 币券类型
        });
        if (response.data.code === 0) {
            console.log('成功领取 B 币券');
        } else {
            console.log('领取失败：', response.data.message);
        }
    } catch (error) {
        console.error('请求出错：', error);
    }
}

// 主函数
async function main() {
    await getBBi();
}

// 调用主函数
main();
