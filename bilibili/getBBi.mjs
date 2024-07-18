const axios = require('axios');

// 配置你的 Cookie 信息
const cookies = {
    DEDEUSERID: '208012258',
    SESSDATA: 'd00c7345,1736852662,df168*72CjCSXbH_Z4VOlZvSipmvuTuNcHQrS1-hZSRglokuzIP1DRLh7bhLeZRFnIBtcc6DuRoSVmZzb0p6bFRiejNNaEJMd1hMb3BlcXNhSW5JWWdRZkMta1Q4LVFaUEJiVnAtdE44OHAzS0c1bjJ4cFNkZmNiUUVHYkJtcnRNN2xHc3lBSldWSHRIOUhBIIEC',
    bili_jct: '2843a48f6c786c3efffe24debddc8d41'
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
            console.log('response', response);
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
