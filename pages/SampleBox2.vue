<template>
  <canvas ref="canvas" />
</template>

<script>
import * as THREE from 'three'
import StoneImage from '@/assets/stone.jpg'

export default {
  name: 'SampleBox2',
  data() {
    return {
      scene: new THREE.Scene(),
      renderer: null,
      geometry: new THREE.OctahedronGeometry(1, 0),
      camera: null,
      mesh: null,
      directionalLight: new THREE.DirectionalLight(0xffffff),
      stoneTexture: null,
      animateFrameId: 0
    }
  },

  mounted() {
    const canvas = this.$refs.canvas
    this.renderer = new THREE.WebGLRenderer({
      canvas
    })

    this.stoneTexture = THREE.ImageUtils.loadTexture(StoneImage)
    this.stoneTexture.minFilter = THREE.LinearFilter
    const material = new THREE.MeshStandardMaterial({ map: this.stoneTexture })
    this.mesh = new THREE.Mesh(this.geometry, material)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
    this.camera.position.set(0, 0, 4)
    this.scene.add(this.mesh)
    this.directionalLight.position.set(1, 1, 1)
    this.scene.add(this.directionalLight)

    this.tick()
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animateFrameId)
  },
  methods: {
    tick() {
      this.mesh.rotation.y += 0.02
      this.mesh.rotation.x += 0.01
      this.renderer.render(this.scene, this.camera)
      this.animateFrameId = requestAnimationFrame(this.tick)
    }
  }
}
</script>
