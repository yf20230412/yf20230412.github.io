<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme';
import { useData } from 'vitepress';
const { Layout } = DefaultTheme;

const { frontmatter } = useData(); //这里的frontmatter就是各个md文件中自己写在最上面的东西
</script>

<template>
  <Layout>
    <template #doc-before>
      <span class="page-info">✍️{{ frontmatter.author }}</span>
    </template>
  </Layout>
</template>

<style>
.page-info {
  font-size: 13px;
  color: #7f7f7f;
  margin-right: 10px;
}
</style>