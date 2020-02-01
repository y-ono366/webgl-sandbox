<template>
  <canvas id="canvas" class="full-canvas"></canvas>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'Lines',
  data() {
    const width = 1000
    const height = 650
    const renderer = null
    const scene = new THREE.Scene()
    const boxGeometry = new THREE.BoxGeometry(9, 9, 1400)
    const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaa34 })
    const box = new THREE.Mesh(boxGeometry, boxMaterial)
    const camera = new THREE.PerspectiveCamera(40, width / height, 1, 10000)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xaaaa34 })
    const lineGeometry = new THREE.Geometry()
    const line = new THREE.Line(lineGeometry, lineMaterial)
    const directionalLight = new THREE.DirectionalLight('0xffffff')
    return {
      width,
      height,
      renderer,
      scene,
      boxGeometry,
      boxMaterial,
      box,
      camera,
      lineMaterial,
      lineGeometry,
      line,
      directionalLight
    }
  },

  mounted() {
    const $canvas = document.getElementById('canvas')
    this.renderer = new THREE.WebGLRenderer({
      canvas: $canvas
    })
    this.renderer.setSize(this.width, this.height)
    this.camera.position.set(0, 0, +2000)
    this.lineGeometry.vertices.push(
      new THREE.Vector3(-100, 0, 0),
      new THREE.Vector3(0, 100, 0),
      new THREE.Vector3(100, 0, 0),
      new THREE.Vector3(0, -100, 0)
    )

    this.scene.add(this.line)
    this.scene.add(this.box)
    this.scene.add(this.directionalLight)

    this.tick()
  },
  methods: {
    tick() {
      requestAnimationFrame(this.tick)
      this.box.rotation.x += 3
      this.box.rotation.y += 0.02
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>
