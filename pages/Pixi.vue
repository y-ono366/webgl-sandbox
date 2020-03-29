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
      dropShadowColor: '#ffffff',
      dropShadowBlur: 1.3,
      dropShadowAngle: Math.PI / 4,
      dropShadowDistance: 5
    })

    const richText = new this.PIXI.Text('USESTRICT', this.style)
    richText.x = 250
    richText.y = 250

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
