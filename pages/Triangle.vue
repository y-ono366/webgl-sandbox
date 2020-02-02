<template>
  <canvas id="canvas" class="full-canvas"></canvas>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'Triangle',
  data() {
    const width = 1000
    const height = 650
    const renderer = null
    const scene = new THREE.Scene()
    const geometry = new THREE.Geometry()
    const material = new THREE.LineBasicMaterial({ linewidth: 3, color: 0xcccc00 })
    const camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000)
    const line = null
    return { width, height, renderer, scene, material, geometry, camera, line }
  },

  mounted() {
    const $canvas = document.getElementById('canvas')
    this.renderer = new THREE.WebGLRenderer({
      canvas: $canvas
    })
    this.camera.position.set(0, 0, 5)

    this.geometry.vertices.push(new THREE.Vector3(0, 1.5, 0))
    this.geometry.vertices.push(new THREE.Vector3(1.5, -1, 0))
    this.geometry.vertices.push(new THREE.Vector3(-1.5, -1, 0))
    this.geometry.vertices.push(new THREE.Vector3(0, 1.5, 0))

    this.renderer.setSize(this.width, this.height)

    this.line = new THREE.Line(this.geometry, this.material)
    this.scene.add(this.line)
    this.tick()
  },
  methods: {
    tick() {
      this.line.rotation.y += 0.03
      requestAnimationFrame(this.tick)
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>
