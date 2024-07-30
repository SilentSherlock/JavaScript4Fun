/**
 * 控制台执行，获取当前用户关注列表
 * 浏览器需要在前台，保证脚本执行能实时刷新页面
 */
(async () => {
    // 获取当前页面高度
    let previousHeight = document.body.scrollHeight;
    let divList = [];

    console.log("current height: %d", previousHeight);

    // 滚动并获取所有 div[data-testid="cellInnerDiv"] 元素
    while (true) {
        // 获取当前页面上的所有 div[data-testid="cellInnerDiv"] 元素
        const newDivs = Array.from(document.querySelectorAll('div[data-testid="cellInnerDiv"]'));
        divList = divList.concat(newDivs);
        console.log("newDivs length", newDivs.length);
        console.log("divList length", divList.length);

        // 向下滚动到页面底部
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(resolve => setTimeout(resolve, 3000)); // 等待加载

        // 获取新的页面高度
        let newHeight = document.body.scrollHeight;
        console.log("previousHeight", previousHeight);
        console.log("newHeight", newHeight);
        if (newHeight === previousHeight) break; // 如果页面高度没有变化，停止滚动
        previousHeight = newHeight;
    }

    // 获取 divList 里每个 div[data-testid="cellInnerDiv"] 元素的第一个 <a> 标签
    const allLinks = divList.map(div => div.querySelector('a')).filter(link => link !== null);

    // 去重
    const uniqueLinks = Array.from(new Set(allLinks.map(link => link.href)));

    // 打印到控制台
    console.log(uniqueLinks);
})();
