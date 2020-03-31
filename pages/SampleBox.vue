<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'SampleBox',
  data() {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshNormalMaterial()
    return {
      scene: new THREE.Scene(),
      renderer: null,
      camera: null,
      light: new THREE.DirectionalLight(0xffffff),
      cube: new THREE.Mesh(geometry, material),
      animateFrameId: 0
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animateFrameId)
  },
  mounted() {
    const canvas = this.$refs.canvas
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas
    })

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(0, 0, 2)
    this.light.position.set(0, 0, 10)
    this.scene.add(this.cube)
    this.scene.add(this.light)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.animate()
  },
  methods: {
    animate() {
      this.animateFrameId = requestAnimationFrame(this.animate)

      this.cube.rotation.x += 0.02
      this.cube.rotation.y += 0.02

      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style></style>
