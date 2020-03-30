<template>
  <div ref="pixisec" class="pixisec" />
</template>

<script lang="ts">
import Vue from 'vue'
import { ParticleContainer, Sprite } from 'pixi.js'
let container: ParticleContainer
const particles: Sprite[] = []

export default Vue.extend({
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

    container = new PIXI.ParticleContainer()
    app.stage.addChild(container)

    const graphic = new PIXI.Graphics()
    graphic.lineStyle(20, 272727, 10)
    graphic.beginFill(0x111111, 0.7)
    graphic.drawCircle(0, 0, 50)
    graphic.endFill()

    for (let i = 0; i < 100; i++) {
      const texture = app.renderer.generateTexture(graphic, 1, 1)
      const spriteParticle = new PIXI.Sprite(texture)
      spriteParticle.x = Math.abs(Math.random() * window.innerWidth - 100)
      spriteParticle.y = Math.abs(Math.random() * window.innerHeight - 100)
      particles.push(spriteParticle)
      // const sprites = PIXI.Sprite.from(StoneImage)
      // sprites.x = (i % 5) * 40
      // sprites.y = Math.floor(i / 5) * 40
      container.addChild(spriteParticle)
    }
    this.tick()
  },
  methods: {
    tick(): void {
      setInterval(() => {
        for (let i = 0; i < particles.length; i++) {
          particles[i].x += 2
          particles[i].y += 2
        }
        // spriteParticle.x += 30
        // spriteParticle.y += 30
      }, 100)
    }
  }
})
</script>

<style lang="scss" scoped></style>
