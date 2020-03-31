<template>
  <div ref="pixisec"></div>
</template>

<script lang="ts">
import Vue from 'vue'

let app: PIXI.Application
const circleParticle: circleParticleWrap[] = []

interface circleParticleWrap extends PIXI.Graphics {
  defaultRadius: number
  startAngle: number
  endAngle: number
}
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

    const circlePath = new PIXI.Graphics()

    let defaultRadius: number = 80
    for (let i = 0; i < 35; i++) {
      const circlePathCP = circlePath.clone() as circleParticleWrap
      circlePathCP.lineStyle(15, 0x9e9b6a, 0.2)
      circlePathCP.arc(window.innerWidth / 2, window.innerHeight / 2, defaultRadius, 1 + i + i, 2 + i + i)
      circlePathCP.defaultRadius = defaultRadius
      circlePathCP.startAngle = 1 + i + i
      circlePathCP.endAngle = 2 + i + i
      app.stage.addChild(circlePathCP)
      circleParticle.push(circlePathCP)

      if (i % 3 === 0 && i !== 0) {
        defaultRadius = defaultRadius + 80
      }
    }

    // app.ticker.add(this.tick)
  },
  beforeDestroy() {
    app.destroy(true)
  },
  methods: {
    tick(): void {
      for (let i = 0; i < circleParticle.length; i++) {
        circleParticle[i]
          .clear()
          .lineStyle(15, 0x9e9b6a, 0.2)
          .arc(
            window.innerWidth / 2,
            window.innerHeight / 2,
            circleParticle[i].defaultRadius,
            i + circleParticle[i].startAngle,
            i + circleParticle[i].endAngle
          )
      }
    }
  }
})
</script>
