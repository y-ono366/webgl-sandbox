<template>
  <div class="thumbnails">
    <div v-for="(item, key) in items" :key="key" class="thumbnail">
      <nuxt-link :to="item.link">
        <img v-if="isImage(item.thumbnail)" :src="item.thumbnail" :alt="item.alt" class="thumbnail-media" />
        <video
          :id="key"
          v-else
          :src="item.thumbnail"
          @mouseover="mouseover"
          @mouseleave="mouseleave"
          class="thumbnail-media"
          loop
          muted
          preload
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
type GLItem = {
  alt: string
  thumbnail: string
  link: string
}

export default Vue.extend({
  name: 'Thumbnails',
  props: {
    items: {
      type: Array as PropType<GLItem[]>,
      required: true
    }
  },
  computed: {},
  methods: {
    isImage(path: GLItem['thumbnail']): boolean {
      return /(png|jpg)+$/.test(path)
    },
    mouseover(e: Event): void {
      e.target instanceof HTMLMediaElement && e.target.play()
    },
    mouseleave(e: Event): void {
      e.target instanceof HTMLMediaElement && e.target.pause()
    }
  }
})
</script>

<style lang="scss" scoped>
.thumbnails {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  width: 1280px;
}
.thumbnail {
  margin: 2px 4px 0px;
  &-media {
    width: 291.24px;
    height: 180px;
  }
}
</style>
