/**
 * 匹配中文字符的正则表达式： [\u4e00-\u9fa5]
 * 匹配双字节字符(包括汉字在内)：[^\x00-\xff]
 *（匹配了码值在0-255之外的汉字或全角字符）
 * 获得字符串的字节长度，（一个双字节字符长度计2，ASCII字符计1）
 * 而"ssf".length 获得的是字符的数目，一个中文被计算为一个字符
 * @param  {String} e 输入字符串
 * @return {number} 字节数目
 * }   [description]
 */
var getByteLength = function(e) {
    return String(e).replace(/[^\x00-\xff]/g, "ci").length;
}