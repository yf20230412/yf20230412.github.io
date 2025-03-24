<template>
  <div>
    <span v-if="lastUpdated">上次更新：{{ formatDate(lastUpdated) }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    lastUpdated() {
      return this.$page.lastUpdated;
    }
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
  }
};
</script>
