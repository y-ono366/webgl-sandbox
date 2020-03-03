<template>
  <div class="usestrict">
    <h1 class="usestrict-text">USESTRICT</h1>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
export default class UseStrict extends Vue {}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'ultimatemetal';
  src: url('../assets/ultimate-black-matel.ttf');
}

.usestrict {
  font-family: ultimatemetal;
  text-align: center;
  font-size: 200px;
  letter-spacing: 25px;

  &-text {
    margin: 0;
  }
}
</style>
