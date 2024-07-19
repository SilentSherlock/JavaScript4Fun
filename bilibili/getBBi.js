import axios from 'axios';
// available for node 16+
import data from '../data.json' assert {type: 'json'}; 
// available for more
// const data = require('../data.json');

export default class BiliBili {

    static {
        BiliBili.baseURL = 'https://api.bilibili.com';
    }

    buildInstance(jsonData) {
        console.log("build instance with JSON", jsonData);
        
        this.instance = axios.create({
            baseURL: 'https://api.bilibili.com',
            headers: {
                'Cookie': jsonData
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

// 读取JSON中的cookie配置 document.cookie
console.log("read cookies", data);
const bilibili = new BiliBili();
bilibili.buildInstance(data.BiliBili);
bilibili.getBBi();
