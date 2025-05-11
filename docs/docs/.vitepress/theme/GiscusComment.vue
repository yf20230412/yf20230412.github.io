<script lang="ts" setup>
import { watch } from "vue";
import { inBrowser, useData } from "vitepress";
import Giscus from "@giscus/vue";

const { isDark, page } = useData();

// 监听主题变化，动态更新 Giscus 的主题
watch(isDark, (dark) => {
  if (!inBrowser) return;

  const iframe = document
    .querySelector("giscus-widget")
    ?.shadowRoot?.querySelector("iframe");

  iframe?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: dark ? "dark" : "light" } } },
    "https://giscus.app"
  );
});
</script>

<template>
  <div style="margin-top: 24px">
    <Giscus
      :key="page.filePath"
      repo="yf20230412/yf20230412.github.io"
      repo-id="R_kgDOKsv4Ig"
      category="Announcements"
      category-id="DIC_kwDOKsv4Is4CmPia"
      mapping="pathname"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="bottom"
      lang="zh-CN"
      crossorigin="anonymous"
      :theme="isDark ? 'dark' : 'light'"
    />
  </div>
</template>
