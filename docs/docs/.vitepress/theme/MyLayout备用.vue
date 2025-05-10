<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme';
import { useData } from 'vitepress';
const { Layout } = DefaultTheme;

const { frontmatter } = useData(); //这里的frontmatter就是各个md文件中自己写在最上面的东西
</script>

<template>
  <Layout>
    <template #doc-before>
      <div class="page-info-container">
        <span class="page-info">
          🌺无人扶我青云志，我自踏雪至山巅🌺
          <span class="author">——{{ frontmatter.author }}小鱼🐬</span>
        </span>
      </div>
    </template>
  </Layout>
</template>

<style>
.page-info {
  font-size: 14px;
  font-weight: bold;
  color: #4CAF50; /* 字体颜色 */
  display: inline-block; /* 自然包裹内容 */
  padding: 3px 8px; /* 内边距 */
  border: 1px solid #d3d3d3; /* 边框颜色 */
  border-radius: 8px; /* 边框圆角 */
  background-color: #f0f8ff; /* 背景颜色 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  line-height: 1.2; /* 行高 */
  text-align: center; /* 文字居中显示 */
  width: fit-content; /* 宽度由内容决定 */
}

.page-info .author {
  display: block; /* 新一行 */
  text-align: right; /* 右对齐 */
  margin-top: 15px; /* 与上一行的间距 */
  font-size: 14px; /* 稍小的字体大小 */
  background: linear-gradient(135deg, #0eaf6d, #ff6ac6 25%, #147b96 50%, #e6d205 55%, #2cc4e0 60%, #8b2ce0 80%, #ff6384 95%, #08dfb4);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent; /* 文字颜色透明 */
  animation: flowCss 3s infinite alternate;
}

@keyframes flowCss {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.page-info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 35px;
  margin-top: 15px;
}

</style>