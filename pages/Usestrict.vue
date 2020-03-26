<template>
  <div class="usestrict">
    <img src="@/assets/usestrict.svg" class="usestrict-text" />
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
export default class UseStrict extends Vue {}
</script>

<style lang="scss" scoped>
.usestrict {
  &-text {
    width: 100%;
    height: 100%;
    color: #fff;
  }
}
</style>
