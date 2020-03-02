<template>
  <!-- <canvas ref="canvas"></canvas> -->
  <div>{{ message }}</div>
</template>

<script lang="ts">
// import * as THREE from 'three'
import { Vue } from 'vue-property-decorator'
export default class SampleBoxts extends Vue {
  message: string = 'This is a message'
}
</script>

<style></style>
