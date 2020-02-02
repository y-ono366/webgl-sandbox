<template>
  <canvas ref="canvas" id="canvas"></canvas>
</template>

<script>
import * as THREE from 'three'
import StoneImage from '@/assets/stone.jpg'

export default {
  name: 'Sample',
  data() {
    const width = 1000
    const height = 650
    const renderer = null
    const geometry = new THREE.OctahedronGeometry(1, 0)
    const directionalLight = new THREE.DirectionalLight(0xffffff)
    const scene = new THREE.Scene()
    const mesh = null
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000)
    const stoneTexture = null
    return { scene, width, height, renderer, geometry, camera, mesh, directionalLight, stoneTexture }
  },

  mounted() {
    const $canvas = this.$refs.canvas
    this.renderer = new THREE.WebGLRenderer({
      canvas: $canvas
    })

    this.stoneTexture = THREE.ImageUtils.loadTexture(StoneImage)
    this.stoneTexture.minFilter = THREE.LinearFilter
    const material = new THREE.MeshStandardMaterial({ map: this.stoneTexture })
    this.mesh = new THREE.Mesh(this.geometry, material)
    this.renderer.setSize(this.width, this.height)
    this.camera.position.set(0, 0, 4)
    this.scene.add(this.mesh)
    this.directionalLight.position.set(1, 1, 1)
    this.scene.add(this.directionalLight)

    this.tick()
  },
  methods: {
    tick() {
      this.mesh.rotation.y += 0.02
      this.mesh.rotation.x += 0.01
      this.renderer.render(this.scene, this.camera)
      window.requestAnimationFrame(this.tick)
    }
  }
}
</script>
