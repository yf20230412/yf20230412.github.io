<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme';
import { useData } from 'vitepress';
import { ref, onMounted, onUnmounted } from 'vue';
import GiscusComment from "./GiscusComment.vue";

const { Layout } = DefaultTheme;
const { frontmatter } = useData();

// 倒计时数据
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
});
let intervalId: number;

// 春节日期映射表（补充2025年，含2026-2046）
const springFestivalMap: Record<number, string> = {
  2025: '2025-01-29',
  2026: '2026-02-17',
  2027: '2027-02-06',
  2028: '2028-01-26',
  2029: '2029-02-13',
  2030: '2030-02-03',
  2031: '2031-01-23',
  2032: '2032-02-11',
  2033: '2033-01-31',
  2034: '2034-02-19',
  2035: '2035-02-08',
  2036: '2036-01-28',
  2037: '2037-02-15',
  2038: '2038-02-04',
  2039: '2039-01-24',
  2040: '2040-02-12',
  2041: '2041-02-01',
  2042: '2042-01-22',
  2043: '2043-02-10',
  2044: '2044-01-30',
  2045: '2045-02-17',
  2046: '2046-02-06'
};

// 核心：自动获取下一个春节的公历日期（含兜底逻辑）
const getNextSpringFestival = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const availableYears = Object.keys(springFestivalMap).map(Number);
  let targetYear = currentYear;

  // 若当前年份不在映射表中，取最近的最大年份
  if (!springFestivalMap[targetYear]) {
    targetYear = Math.max(...availableYears);
  }

  let sfDate = new Date(springFestivalMap[targetYear]);
  // 若当年春节已过，取下一年（若下一年不存在则取最大可用年份）
  if (sfDate < now) {
    targetYear += 1;
    sfDate = new Date(springFestivalMap[targetYear] || springFestivalMap[Math.max(...availableYears)]);
  }

  // 若日期解析失败，强制取2025年春节（最终兜底）
  if (isNaN(sfDate.getTime())) {
    sfDate = new Date(springFestivalMap[2025]);
    targetYear = 2025;
  }

  return { date: sfDate, year: targetYear };
};

// 更新倒计时（含数值容错）
const updateCountdown = () => {
  const now = new Date();
  const { date: nextSF } = getNextSpringFestival();
  const diff = nextSF.getTime() - now.getTime();

  // 若差值为非数字或负数，直接置0
  if (isNaN(diff) || diff <= 0) {
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

// 暴露春节年份供模板使用
const getSFYear = () => getNextSpringFestival().year;
</script>

<template>
  <Layout>
    <template #doc-before>
      <div class="page-info-container">
        <div class="countdown-box">
          <div class="countdown-title">{{ getSFYear() }}年
            <span id="new-year">春节</span> 倒计时
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

    <template #doc-footer-before>
      <GiscusComment />
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
