<template>
  <div ref="pixisec" class="pixisec" />
</template>

<script lang="ts">
import Vue from 'vue'
import { ParticleContainer, Sprite } from 'pixi.js'

let container: ParticleContainer
const particles: SpriteWrap[] = []
let app: PIXI.Application

interface SpriteWrap extends Sprite {
  speed: number
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

    container = new PIXI.ParticleContainer()
    app.stage.addChild(container)

    const graphics = new PIXI.Graphics()
    graphics.lineStyle(2, 0x90d911, 0.5)
    graphics.beginFill(0x650a5a)
    graphics.drawRoundedRect(50, 440, 250, 1, 1)
    graphics.endFill()

    for (let i = 0; i < 100; i++) {
      const texture = app.renderer.generateTexture(graphics, 1, 1)
      const spriteParticle = new PIXI.Sprite(texture) as SpriteWrap
      spriteParticle.x = Math.abs(Math.random() * window.innerWidth - 100)
      spriteParticle.y = Math.random() * window.innerHeight
      spriteParticle.speed = Math.random() * 20 + 10
      particles.push(spriteParticle)
      container.addChild(spriteParticle)
    }
    app.ticker.add(this.tick)
  },
  beforeDestroy() {
    app.destroy(true)
  },
  methods: {
    tick(): void {
      for (let i = 0; i < particles.length; i++) {
        particles[i].x -= particles[i].speed

        if (particles[i].x > window.innerWidth + 250) {
          particles[i].x = -5
        } else if (particles[i].x < 0 - 250) {
          particles[i].x = window.innerWidth + 5
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
