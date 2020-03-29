<template>
  <div ref="pixisec" class="pixisec" />
</template>

<script>
export default {
  data() {
    return {
      PIXI: null,
      style: null,
      fill: ['#272727', '#373737', '#484848', '#545454', '#636363']
    }
  },
  async mounted() {
    this.PIXI = require('pixi.js')
    const app = new this.PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight
    })
    this.$refs.pixisec.appendChild(app.view)
    app.renderer.autoDensity = true
    app.stage.interactive = true

    const FontFaceObserver = require('fontfaceobserver')
    await new FontFaceObserver('ultimatemetal').load()

    this.style = new this.PIXI.TextStyle({
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
    this.PIXI.TextMetrics.BASELINE_SYMBOL += 'U T'

    const richText = new this.PIXI.Text(' USESTRICT ', this.style)
    richText.x = window.innerWidth / 2
    richText.y = window.innerHeight / 2
    richText.anchor.set(0.5)

    app.stage.addChild(richText)
    this.tick()
  },
  methods: {
    tick() {
      setInterval(() => {
        let arr = []
        const last = this.fill.pop()
        arr = this.fill.slice()
        arr.unshift(last)
        this.fill = arr
        this.style.fill = this.fill
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped></style>
