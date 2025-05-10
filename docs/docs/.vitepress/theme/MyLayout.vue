<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme';
import { useData } from 'vitepress';
import { ref, onMounted, onUnmounted } from 'vue';
const { Layout } = DefaultTheme;

const { frontmatter } = useData();

// 倒计时逻辑
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
});

let intervalId: number;

const updateCountdown = () => {
  const now = new Date();
  const newYear = new Date('2026-01-01T00:00:00');
  const diff = newYear.getTime() - now.getTime();
  
  if (diff <= 0) {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return;
  }
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  countdown.value = {
    days: Math.floor(hours / 24),
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60
  };
};

onMounted(() => {
  updateCountdown();
  intervalId = window.setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <Layout>
    <template #doc-before>
      <div class="page-info-container">
        <div class="countdown-box">
          <div class="countdown-title">2026年
            <span id="new-year">元旦</span> 倒计时
          </div>
          <div class="countdown-timer">
            <span class="countdown-number">{{ countdown.days }}</span>天
            <span class="countdown-number">{{ countdown.hours }}</span>时
            <span class="countdown-number">{{ countdown.minutes }}</span>分
            <span class="countdown-number">{{ countdown.seconds }}</span>秒
          </div>
          <div class="countdown-author">——{{ frontmatter.author }}小鱼🐬</div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<style>
.page-info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 35px;
  margin-top: 15px;
}

.countdown-box {
  font-weight: bold;
  color: #4CAF50;
  display: inline-block;
  padding: 12px 20px;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  background-color: #000;  /* 黑色背景 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  line-height: 1.5;
  text-align: center;
  width: fit-content;
}

.countdown-title {
  margin-bottom: 8px;
  color: #d63232;
}

.countdown-timer {
  font-size: 13px; /* 多少天标题 */
  margin: 12px 0;
}

.countdown-number {
  display: inline-block;
  min-width: 20px;
  text-align: center;
  font-weight: bold;
  color: #d63232;
  background-color: #fff;  /* 白色背景 */
  padding: 2px 6px;
  border-radius: 4px;
  margin: 0 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
#new-year{
  font-size: 28px;  /* 2026倒计时字体大小 */
}  

.countdown-title{
  text-align: right;
  margin-top: 10px;
  font-size: 22px;  /* 元旦 字体大小 */
  background: linear-gradient(135deg, #8a2be2, #ffeb3b 25%, #ff5722 50%, #4caf50 55%, #ff9800 60%, #f44336 80%, #2196f3 95%, #8a2be2);


  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: flowCss 5s infinite alternate;
}

.countdown-author{
  text-align: right;
  margin-top: 10px;
  font-size: 14px;  /* 小鱼 字体大小 */
  background: linear-gradient(135deg, #0eaf6d, #ff6ac6 25%, #147b96 50%, #e6d205 55%, #2cc4e0 60%, #8b2ce0 80%, #ff6384 95%, #08dfb4);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
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
</style>