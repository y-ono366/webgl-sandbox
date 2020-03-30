<template>
  <div class="worklist">
    <Thumbnails :items="items" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Thumbnails from '@/components/Thumbnails.vue'

export default Vue.extend({
  layout: 'index',
  components: { Thumbnails },
  computed: {
    items() {
      return [
        {
          thumbnail: require('@/assets/thumbnails/particle.mp4'),
          link: '/particle'
        },
        {
          thumbnail: require('@/assets/thumbnails/pixijs.mp4'),
          link: '/pixi'
        },
        {
          alt: 'usestrict',
          thumbnail: require('@/assets/thumbnails/usestrict.png'),
          link: '/usestrict'
        },
        {
          thumbnail: require('@/assets/thumbnails/fragmentshader.mp4'),
          link: '/fragmentshader'
        },
        {
          thumbnail: require('@/assets/thumbnails/slash.mp4'),
          link: '/slash'
        },
        {
          thumbnail: require('@/assets/thumbnails/lines.mp4'),
          link: '/lines'
        },
        {
          thumbnail: require('@/assets/thumbnails/samplebox2.mp4'),
          link: '/samplebox2'
        },
        {
          thumbnail: require('@/assets/thumbnails/samplebox.mp4'),
          link: '/samplebox'
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped></style>
