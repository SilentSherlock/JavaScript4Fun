import axios from 'axios';
// available for node 16+
import data from '../data.json' assert {type: 'json'}; 
 
export default class BiliBili {

    static {
        BiliBili.baseURL = 'https://api.bilibili.com';
    }

    buildInstance(jsonData) {
        // console.log("build instance with JSON", jsonData);
        
        this.instance = axios.create({
            baseURL: 'https://api.bilibili.com',
            headers: {
                // 需要以表单形式提交
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': jsonData
            }
        });
    }

    /**
     * 自动领取权益
     * @param {权益类型} type 
     */
    async getPrivilegeByType(type) {
        try {
            const response = await this.instance.post('/x/vip/privilege/receive', {
                type: type ,// 券类型 
                csrf: data.bilibili.csrf
            });
            if (response.data.code === 0) {
                console.log('成功领取type {}权益', type);
                return true;
            } else {
                console.log('领取失败：', response.data.message);
                console.log('response', response);
                return false;
            }
        } catch (error) {
            console.error('请求出错：', error);
            return false;
        }
    }

    async getAllPrivilege() {
        // 1-B币 2-优惠券 3-漫画福利券
        const typeMap = new Map();
        typeMap.set(1, "B币");
        typeMap.set(2, "优惠券");
        typeMap.set(3, "漫画福利券");
        for (const [type, typeValue] of typeMap) {
            let result = await this.getPrivilegeByType(type);
            if (result) {
                console.log("权益%s领取成功", typeValue);
            }else {
                console.log("权益%s领取失败", typeValue);
            }
        }
        
    }

}

// 读取JSON中的cookie配置 document.cookie
console.log("read cookies", data);
const bilibili = new BiliBili();
bilibili.buildInstance(data.bilibili.cookie);
bilibili.getAllPrivilege();
