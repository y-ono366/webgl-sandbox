<template>
  <canvas id="canvas" ref="canvas" width="600" height="400"></canvas>
</template>

<script>
import * as THREE from 'three'
import CONST from '@/consts'

export default {
  name: 'RotateBox',
  data() {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshNormalMaterial()
    return {
      scene: new THREE.Scene(),
      renderer: null,
      camera: new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000),
      light: new THREE.DirectionalLight(0xffffff),
      cube: new THREE.Mesh(geometry, material)
    }
  },
  mounted() {
    const $canvas = this.$refs.canvas
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: $canvas
    })

    this.renderer.setSize(CONST.SCREEN.WIDTH, CONST.SCREEN.HEIGHT)

    this.camera.position.set(0, 0, 2)
    this.light.position.set(0, 0, 10)
    this.scene.add(this.cube)
    this.scene.add(this.light)

    this.animate()
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate)

      this.cube.rotation.x += 0.02
      this.cube.rotation.y += 0.02

      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style></style>
