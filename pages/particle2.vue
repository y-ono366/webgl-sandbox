<template>
  <div ref="pixisec"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TweenMax } from 'gsap'

let app: PIXI.Application
const circleParticle: circleParticleWrap[] = []
const RAD: number = Math.PI / 180

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

    let startAngle: number = 0
    let endAngle: number = 60
    let defaultRadius: number = 80
    let duration: number = 20
    for (let i = 1; i < 40; i++) {
      const circlePathCP = circlePath.clone() as circleParticleWrap
      circlePathCP.lineStyle(40, 0xffffff, 1)
      circlePathCP.startAngle = startAngle * RAD
      circlePathCP.endAngle = endAngle * RAD
      circlePathCP.arc(
        window.innerWidth / 2,
        window.innerHeight / 2,
        defaultRadius,
        circlePathCP.startAngle,
        circlePathCP.endAngle
      )
      circlePathCP.defaultRadius = defaultRadius
      app.stage.addChild(circlePathCP)
      circleParticle.push(circlePathCP)

      TweenMax.fromTo(
        circlePathCP,
        duration,
        {
          startAngle,
          endAngle
        },
        {
          startAngle: startAngle + 360,
          endAngle: endAngle + 361,
          repeat: -1,
          ease: 'none'
        }
      )
      if (i % 3 === 0 && i !== 0) {
        defaultRadius = defaultRadius + 80
        duration = Math.random() * 10 + 10
      }

      if (i % 3 !== 0 || i === 0) {
        startAngle += 120
        endAngle += 120
      }
    }

    app.ticker.add(this.tick)
  },
  beforeDestroy() {
    app.destroy(true)
  },
  methods: {
    tick(): void {
      for (let i = 0; i < circleParticle.length; i++) {
        circleParticle[i]
          .clear()
          .lineStyle(35, 0xffffff, 1)
          .arc(
            window.innerWidth / 2,
            window.innerHeight / 2,
            circleParticle[i].defaultRadius,
            circleParticle[i].startAngle * RAD,
            circleParticle[i].endAngle * RAD
          )
      }
    }
  }
})
</script>
