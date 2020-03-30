<template>
  <div ref="pixisec" class="pixisec" />
</template>

<script lang="ts">
import Vue from 'vue'
import { TextStyle } from 'pixi.js'
let style: TextStyle
type LocalData = {
  fill: string[]
  intervalId: number
}
export default Vue.extend({
  data(): LocalData {
    return {
      intervalId: 0,
      fill: ['#272727', '#373737', '#484848', '#545454', '#636363']
    }
  },
  async mounted() {
    const PIXI = await import('pixi.js')
    const app: PIXI.Application = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight
    })

    const pixisec = this.$refs.pixisec as HTMLDivElement
    pixisec.appendChild(app.view)
    app.renderer.autoDensity = true
    app.stage.interactive = true

    const FontFaceObserver = require('fontfaceobserver')
    await new FontFaceObserver('ultimatemetal').load()

    style = new PIXI.TextStyle({
      fontFamily: 'ultimatemetal',
      fill: this.fill,
      fontSize: 330,
      letterSpacing: 8,
      dropShadow: true,
      dropShadowColor: '#272727',
      dropShadowBlur: 5,
      dropShadowAngle: Math.PI / 4,
      dropShadowDistance: 16,
      align: 'center'
    })
    PIXI.TextMetrics.BASELINE_SYMBOL += 'U T'

    const richText = new PIXI.Text(' USESTRICT ', style)
    richText.x = window.innerWidth / 2
    richText.y = window.innerHeight / 2
    richText.anchor.set(0.5)

    app.stage.addChild(richText)
    this.tick()
  },
  destroyed() {
    this.intervalId && clearInterval(this.intervalId)
  },
  methods: {
    tick() {
      this.intervalId = window.setInterval(() => {
        let arr = []
        const last = this.fill.pop() as string
        arr = this.fill.slice()
        arr.unshift(last)
        this.fill = arr
        style.fill = this.fill
      }, 100)
    }
  }
})
</script>

<style lang="scss" scoped></style>
