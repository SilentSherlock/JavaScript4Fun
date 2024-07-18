import axios from 'axios';
import data from '../data.json' assert {type: 'json'}


export default class BiliBili {

    constructor(DEDEUSERID, SESSDATA, bili_jct) {
        this.DEDEUSERID = DEDEUSERID;
        this.SESSDATA = SESSDATA;
        this.bili_jct = bili_jct;
        this.instance = axios.create({
            baseURL: 'https://api.bilibili.com',
            headers: {
                'Cookie': `DEDEUSERID=${DEDEUSERID}; SESSDATA=${SESSDATA}; bili_jct=${bili_jct}`
            }
        });
    }

    // 自动领取 B 币
    async getBBi() {
        try {
            const response = await this.instance.post('/x/vip/privilege/receive', {
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

}

// 读取JSON中的cookie配置
console.log("read cookies", data);
// const bilibili_cookies = JSON.parse(data);
const bilibili = new BiliBili(data.bilibili.DEDEUSERID, data.bilibili.SESSDATA, data.bilibili.bili_jct);
bilibili.getBBi();




