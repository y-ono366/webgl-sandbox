<template>
  <div ref="pixisec" class="pixisec" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    const PIXI = require('pixi.js')
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight
    })
    this.$refs.pixisec.appendChild(app.view)
    app.renderer.autoDensity = true
    app.stage.interactive = true

    const style = new PIXI.TextStyle({
      // fontFamily: 'ultimatemetal',
      fontSize: 60,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 3,
      dropShadowDistance: 4,
      wordWrap: true,
      wordWrapWidth: 540
    })

    const richText = new PIXI.Text('U S E S T R I C T', style)
    richText.x = 250
    richText.y = 250

    app.stage.addChild(richText)
  }
})
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'ultimatemetal';
  src: url('../static/ultimate-black.ttf');
}
.pixisec {
  font-family: ultimatemetal;
}
</style>
