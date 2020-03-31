<template>
  <canvas ref="canvas" />
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'Lines',
  data() {
    return {
      renderer: null,
      scene: new THREE.Scene(),
      box: null,
      camera: null,
      line: null,
      animateFrameId: 0
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
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000)
    this.camera.position.set(0, 0, +2000)

    this.scene.add(this.line)
    this.scene.add(this.box)
    const directionalLight = new THREE.DirectionalLight('0xffffff')
    this.scene.add(directionalLight)

    this.tick()
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animateFrameId)
  },
  methods: {
    init() {
      const boxGeometry = new THREE.BoxGeometry(9, 9, 1400)
      const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaa34 })
      this.box = new THREE.Mesh(boxGeometry, boxMaterial)

      const lineMaterial = new THREE.LineBasicMaterial({ color: 0xaaaa34 })
      const lineGeometry = new THREE.Geometry()
      this.line = new THREE.Line(lineGeometry, lineMaterial)

      lineGeometry.vertices.push(
        new THREE.Vector3(-100, 0, 0),
        new THREE.Vector3(0, 100, 0),
        new THREE.Vector3(100, 0, 0),
        new THREE.Vector3(0, -100, 0)
      )
    },
    tick() {
      this.animateFrameId = requestAnimationFrame(this.tick)
      this.box.rotation.x += 3
      this.box.rotation.y += 0.02
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>
