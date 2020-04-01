<template>
  <div ref="pixisec" class="pixisec" />
</template>

<script lang="ts">
import Vue from 'vue'
import { TweenMax, Elastic } from 'gsap'

let app: PIXI.Application
let richText: PIXI.Text
let filter: PIXI.Filter.RGBSplitFilter

export default Vue.extend({
  async mounted() {
    const PIXI = await import('pixi.js')
    app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight
    })
    const pixisec = this.$refs.pixisec as HTMLDivElement
    pixisec.appendChild(app.view)
    app.renderer.autoDensity = true
    app.stage.interactive = true

    const FontFaceObserver = require('fontfaceobserver')
    await new FontFaceObserver('ultimatemetal').load()

    const style = new PIXI.TextStyle({
      fontFamily: 'ultimatemetal',
      fill: '#ffffff',
      fontSize: 330,
      letterSpacing: 8,
      align: 'center'
    })
    PIXI.TextMetrics.BASELINE_SYMBOL += 'U T'

    richText = new PIXI.Text(' USESTRICT ', style)
    richText.x = window.innerWidth / 2
    richText.y = window.innerHeight / 2
    richText.anchor.set(0.5)

    const { RGBSplitFilter } = await import('pixi-filters')
    filter = new RGBSplitFilter()
    filter.red.x = 100
    filter.red.y = 20
    filter.blue.x = -100
    filter.blue.y = 20
    filter.green.x = 50
    filter.green.y = 43

    richText.filters = [filter]

    TweenMax.to(filter.red, 1, { x: 0, y: 0, repeat: -1, ease: Elastic.easeOut.config(1.2, 0.2) })
    TweenMax.to(filter.blue, 1, { x: 0, y: 0, repeat: -1, ease: Elastic.easeOut.config(1.2, 0.2) })
    TweenMax.to(filter.green, 1, { x: 0, y: 0, repeat: -1, ease: Elastic.easeOut.config(1.2, 0.2) })

    app.stage.addChild(richText)
  },
  beforeDestroy() {
    app.destroy(true)
  }
})
</script>

<style scoped></style>
