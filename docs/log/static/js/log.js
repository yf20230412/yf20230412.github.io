// 选取所有class名为“sm-list”的节点

const smListItems = document.querySelectorAll('.sm-list');



// 遍历所有节点，为每个节点添加点击事件监听

smListItems.forEach(item => {

    item.addEventListener('click', function() {

        // 如果当前节点已经有active类，则移除它

        if (this.classList.contains('active')) {

            this.classList.remove('active');

        } else {

            // 否则，移除所有兄弟节点的active类

            smListItems.forEach(sibling => sibling.classList.remove('active'));

            // 给当前节点添加active类

            this.classList.add('active');

        }

    });

});