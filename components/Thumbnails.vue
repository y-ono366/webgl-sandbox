<template>
  <div class="thumbnails">
    <div v-for="(item, key) in items" :key="key" class="thumbnail">
      <nuxt-link :to="item.link">
        <components
          :is="thumbnailTag(item.thumbnail)"
          v-bind="tagOptions(item.thumbnail)"
          :src="item.thumbnail"
          class="thumbnail-img"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
type GLItem = {
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
    thumbnailTag(thumbnail: GLItem['thumbnail']) {
      return this.isExternal(thumbnail) ? 'img' : 'video'
    },
    tagOptions(thumbnail: GLItem['thumbnail']) {
      if (this.isExternal(thumbnail)) return
      return {
        autoplay: true,
        loop: true,
        muted: true,
        preload: true
      }
    },
    isExternal(path: GLItem['thumbnail']): boolean {
      return /(png|jpg)+$/.test(path)
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
  &-img {
    width: 291.24px;
    height: 180px;
  }
}
</style>
