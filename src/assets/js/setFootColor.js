
/**
 * 通过数字设置图片字体
 * @param {*} number 数字
 * @param {String} colorType 颜色类型
 */
import { getUrlParam } from '@/assets/js/util.js'
let code = getUrlParam('code')
if(code) {
    window.sessionStorage.setItem('code',code)
}
let path = window.sessionStorage.getItem('code');
const setFontColor = (number, colorType = "hong") => {
    number = String(number);
    let fontArr = [];
    let result = [];
    for (let i = 0; i < number.length; i++) {
        fontArr.push(number[i]);
    }
    fontArr.map((item) => {
        const imgUrl = process.env.BASE_URL + path +'/font_color/icon_' + colorType + item + '.png'
        result.push(imgUrl);
    });
    return result;
}
export default setFontColor;
