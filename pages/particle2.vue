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

    const length: number = 30
    const radius: number = 30

    let startAngle: number = 0
    let endAngle: number = length
    let defaultRadius: number = radius
    let duration: number = 20
    let reverseFlg: boolean = false
    let margin: number = endAngle * 2
    for (let i = 1; i < 143; i++) {
      const circlePathCP = circlePath.clone() as circleParticleWrap
      circlePathCP.lineStyle(20, 0xffffff, 1)
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

      const position = reverseFlg
        ? {
            from: {
              startAngle: startAngle + 360,
              endAngle: endAngle + 361
            },
            to: {
              startAngle,
              endAngle
            }
          }
        : {
            from: {
              startAngle,
              endAngle
            },
            to: {
              startAngle: startAngle + 360,
              endAngle: endAngle + 361
            }
          }
      TweenMax.fromTo(circlePathCP, duration, position.from, {
        startAngle: position.to.startAngle,
        endAngle: position.to.endAngle,
        repeat: -1,
        ease: 'none'
      })

      if (endAngle < 360) {
        // 層内対応
        startAngle += margin
        endAngle += margin
      } else {
        // 上層対応
        defaultRadius = defaultRadius + radius
        duration = Math.random() * 10 + 10
        reverseFlg = !reverseFlg
        startAngle = 0
        endAngle = length / 2
        margin = endAngle * 1.7
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
          .lineStyle(20, 0xffffff, 1)
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
