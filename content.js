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
            button.append('Jump to GitHub');
            // Use a timeout because the link might be dynamically loaded
            setTimeout(() => {
                try {
                    // Use XPath to find the specific link on DeepWiki search page
                    const deepwikiRepoLinkElement = document.evaluate('//*[@id="1"]/div[1]/div/div[1]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

                    if (deepwikiRepoLinkElement && deepwikiRepoLinkElement.href) {
                        const deepwikiRepoUrl = deepwikiRepoLinkElement.href;
                        const pathParts = deepwikiRepoUrl.split('/').filter(part => part.length > 0);
                        // Assuming deepwiki.com/owner/repo
                        if (pathParts.length >= 4) { // deepwiki.com/owner/repo -> 4 parts after split by / and filter empty
                            const owner = pathParts[2];
                            const repo = pathParts[3];
                            button.href = `https://github.com/${owner}/${repo}`;
                        } else {
                            button.href = `https://github.com${path}`;
                        }
                    } else {
                        // Fallback if element or href not found
                        button.href = `https://github.com${path}`;
                    }
                } catch (e) {
                    // Fallback in case of any error
                    console.error("Error finding GitHub link:", e);
                    button.href = `https://github.com${path}`;
                }
            }, 2000); // Reduced timeout for quicker response, adjust if needed
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