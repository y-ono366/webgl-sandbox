<template>
  <div class="section">
    <nuxt class="section-container" />
  </div>
</template>
<script>
export default {}
</script>

<style lang="scss">
.section {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  &-container {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;
  }
}
</style>
