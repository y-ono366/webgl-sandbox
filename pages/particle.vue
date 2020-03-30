<template>
  <div ref="pixisec" class="pixisec" />
</template>

<script lang="ts">
import Vue from 'vue'
import { ParticleContainer, Sprite } from 'pixi.js'
let container: ParticleContainer
const particles: Sprite[] = []

export default Vue.extend({
  data() {
    return {
      width: 0,
      height: 0
    }
  },
  async mounted() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    const PIXI = await import('pixi.js')
    const app: PIXI.Application = new PIXI.Application({
      width: this.width,
      height: this.height
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
      const spriteParticle = new PIXI.Sprite(texture)
      spriteParticle.x = Math.abs(Math.random() * this.width - 100)
      spriteParticle.y = Math.random() * this.height
      particles.push(spriteParticle)
      container.addChild(spriteParticle)
    }
    this.tick()
  },
  methods: {
    tick(): void {
      setInterval(() => {
        for (let i = 0; i < particles.length; i++) {
          particles[i].x -= 24

          if (particles[i].x > this.width + 250) {
            particles[i].x = -5
          } else if (particles[i].x < 0 - 250) {
            particles[i].x = this.width + 5
          }
        }
      }, 20)
    }
  }
})
</script>

<style lang="scss" scoped></style>
