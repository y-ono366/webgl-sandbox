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
          thumbnail: require('@/assets/thumbnails/samplebox.mov'),
          link: '/samplebox'
        },
        {
          thumbnail: require('@/assets/thumbnails/samplebox2.mov'),
          link: '/samplebox2'
        },
        {
          thumbnail: require('@/assets/thumbnails/lines.mov'),
          link: '/lines'
        },
        {
          thumbnail: require('@/assets/thumbnails/slash.mov'),
          link: '/slash'
        },
        {
          thumbnail: require('@/assets/thumbnails/fragmentshader.mov'),
          link: '/fragmentshader'
        },
        {
          thumbnail: require('@/assets/thumbnails/usestrict.png'),
          link: '/usestrict'
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped></style>
