// 从外部JSON获取数据
        async function fetchData() {
            try {
                const response = await fetch('https://yf1688.top/static/M.json');
                const data = await response.json();
                return data['urls']; // 假设JSON具有“ URLS”键
            } catch (error) {
                console.error('Error fetching data:', error);
                return [];
            }
        }
        
        // 动态生成卡的功能
        async function generateCards() {
            const container = document.getElementById("url-container");
            const urlList = await fetchData();
        
            urlList.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("card");
                
                const title = document.createElement("div");
                title.classList.add("title");
                title.innerText = item.name; // 使用JSON中的“名称”
                
                const inputGroup = document.createElement("div");
                inputGroup.classList.add("input-group");
                
                const input = document.createElement("input");
                input.classList.add("url");
                input.type = "text";
                input.value = item.url; // 使用JSON中的“ URL”
                input.setAttribute("readonly", true);
                
                const button = document.createElement("button");
                button.classList.add("copy-btn");
                button.innerText = "复制";
                button.addEventListener("click", () => copyToClipboard(input));
                
                inputGroup.appendChild(input);
                inputGroup.appendChild(button);
                
                card.appendChild(title);
                card.appendChild(inputGroup);
                
                container.appendChild(card);
            });
        }
        
        // 功能将文本复制到剪贴板
        function copyToClipboard(input) {
            input.select();
            input.setSelectionRange(0, 99999); // For mobile devices
            navigator.clipboard.writeText(input.value).then(() => {
                alert("接口复制成功！");
            });
        }
        
        // Generate the cards when the page loads
        window.onload = generateCards;