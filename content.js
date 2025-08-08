(function () {
    'use strict';

    // 创建浮动按钮
    function createFloatingButton () {
        const path = window.location.pathname;
        const button = document.createElement('a');

        // 创建图标元素
        const icon = document.createElement('img');
        icon.style.width = '20px';
        icon.style.height = '20px';
        icon.style.verticalAlign = 'middle';
        icon.style.marginRight = '5px';

        // 设置按钮样式
        button.style.position = 'fixed';
        button.style.right = '20px';
        button.style.bottom = '20px';
        button.style.backgroundColor = '#2b3137';
        button.style.color = 'white';
        button.style.padding = '10px 15px';
        button.style.borderRadius = '5px';
        button.style.textDecoration = 'none';
        button.style.fontFamily = 'Arial, sans-serif';
        button.style.fontWeight = 'bold';
        button.style.zIndex = '9999';
        button.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        button.style.cursor = 'pointer'; // Add cursor pointer for better UX
        button.style.display = 'inline-flex'; // Use flexbox for icon and text alignment
        button.style.alignItems = 'center'; // Center items vertically

        // 根据当前域名设置不同的按钮文本和链接
        if (window.location.hostname === 'deepwiki.com') {
            icon.src = chrome.runtime.getURL('images/github.svg');
            button.appendChild(icon);

            if (!path.includes('/search')) {
                button.append('Jump to Github');
                button.href = `https://github.com${path}`;
            } else {
                button.append('Jump to ...');
                const findAndSetLink = () => {
                    try {
                        const xpath = '//*[@id="1"]/div[1]/div/div[1]/a';
                        const deepwikiRepoLinkElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

                        if (deepwikiRepoLinkElement && deepwikiRepoLinkElement.href) {
                            // 如果找到了元素，就设置链接并停止观察
                            console.log('Element found!', deepwikiRepoLinkElement.href);
                            const deepwikiRepoUrl = deepwikiRepoLinkElement.href;
                            const pathParts = deepwikiRepoUrl.split('/').filter(part => part.length > 0);
                            if (pathParts.length >= 4) {
                                const owner = pathParts[2];
                                const repo = pathParts[3];
                                button.href = `https://github.com/${owner}/${repo}`;
                            } else {
                                button.href = `https://github.com${window.location.pathname}`;
                            }
                            button.removeChild(button.lastChild);
                            button.append('Jump to Github');
                            return true; // 返回 true 表示成功
                        }
                    } catch (e) {
                        console.error("Error processing XPath element:", e);
                    }
                    return false; // 返回 false 表示未找到
                };

                // 1. 立即尝试寻找一次
                if (!findAndSetLink()) {
                    // 2. 如果没找到，则启动一个观察者
                    const observer = new MutationObserver((mutations, obs) => {
                        if (findAndSetLink()) {
                            obs.disconnect(); // 任务完成，断开观察，节省资源
                        }
                    });

                    // 3. 配置观察者监视整个 body 的子节点变化
                    observer.observe(document.body, {
                        childList: true,
                        subtree: true
                    });
                }
            }
        } else if (window.location.hostname === 'github.com') {
            icon.src = chrome.runtime.getURL('images/deepwiki.svg');
            button.appendChild(icon);
            button.append('Jump to DeepWiki');
            button.href = `https://deepwiki.com${path}`;
        }

        button.target = '_blank';

        // 添加悬停效果
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#3f4a56';
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '#2b3137';
        });

        // 添加到页面
        document.body.appendChild(button);
    }

    // 页面加载完成后创建按钮
    window.addEventListener('load', createFloatingButton);
})();