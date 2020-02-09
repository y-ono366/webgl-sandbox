<template>
  <div class="section">
    <Header />
    <nuxt />
  </div>
</template>
<script>
import Header from '@/components/common/Header'
export default {
  components: { Header }
}
</script>

<style lang="scss">
.section {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
