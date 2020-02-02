<template>
  <canvas ref="canvas" />
</template>

<script>
import * as THREE from 'three'
import CONST from '@/consts'

export default {
  name: 'Triangle',
  data() {
    return {
      renderer: null,
      scene: new THREE.Scene(),
      material: new THREE.LineBasicMaterial({ linewidth: 3, color: 0xcccc00 }),
      geometry: new THREE.Geometry(),
      camera: new THREE.PerspectiveCamera(40, CONST.SCREEN.WIDTH / CONST.SCREEN.HEIGHT, 1, 1000),
      line: null
    }
  },
  created() {
    this.init()
  },
  mounted() {
    const canvas = this.$refs.canvas
    this.renderer = new THREE.WebGLRenderer({
      canvas
    })

    this.geometry.vertices.push(
      new THREE.Vector3(0, 1.5, 0),
      new THREE.Vector3(1.5, -1, 0),
      new THREE.Vector3(-1.5, -1, 0),
      new THREE.Vector3(0, 1.5, 0)
    )

    this.renderer.setSize(CONST.SCREEN.WIDTH, CONST.SCREEN.HEIGHT)

    this.line = new THREE.Line(this.geometry, this.material)
    this.scene.add(this.line)
    this.tick()
  },
  methods: {
    init() {
      this.camera.position.set(0, 0, 5)
    },
    tick() {
      this.line.rotation.y += 0.03
      requestAnimationFrame(this.tick)
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>
