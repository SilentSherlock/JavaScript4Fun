/**
 * 
 * @param {Document.cookie result} cookieString 
 */
export default function cookie2JSON(cookieString) {
    if (!cookieString) {
        console.log("cookieString is empty {}", cookieString);
        return;
    }
    let cookies = cookieString.split('; ');
    let cookieObj = {};
    cookies.forEach(cookie => {
        let [name, value] = cookie.split('=');
        cookieObj[name] = decodeURIComponent(value);
    });
    return JSON.stringify(cookieObj, null, 2);
}
