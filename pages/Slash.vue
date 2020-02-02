<template>
  <canvas ref="canvas" />
</template>

<script>
import * as THREE from 'three'
import AssetsImage from '@/assets/Smoke-Element.png'
import StoneImage from '@/assets/stone.jpg'
import CONST from '@/consts'

export default {
  name: 'Slash',
  data() {
    return {
      renderer: null,
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(40, CONST.SCREEN.WIDTH / CONST.SCREEN.HEIGHT, 1, 1000),
      smokeParticles: [],
      light: new THREE.DirectionalLight(0xffffff, 0.5),
      clock: new THREE.Clock(),
      flash: new THREE.PointLight(0x062d89, 30, 500, 1.7)
    }
  },
  mounted() {
    const canvas = this.$refs.canvas
    this.renderer = new THREE.WebGLRenderer({
      canvas
    })
    this.camera.position.set(0, 0, 100)

    this.smokeInit()
    this.faceMaterialInit()
    this.flashInit()

    this.renderer.setSize(CONST.SCREEN.WIDTH, CONST.SCREEN.HEIGHT)

    this.tick()
  },
  methods: {
    smokeInit() {
      const smokeTexture = THREE.ImageUtils.loadTexture(AssetsImage)
      const smokeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: smokeTexture,
        opacity: 0.25,
        transparent: true
      })

      const smokeGeo = new THREE.PlaneGeometry(50, 50)
      for (let p = 0; p < 150; p++) {
        const particle = new THREE.Mesh(smokeGeo, smokeMaterial)
        particle.position.set(Math.random() * 200 - 100, Math.random() * 200 - 100, 0)
        particle.rotation.z = Math.random() * 36
        this.scene.add(particle)
        this.smokeParticles.push(particle)
      }
    },
    faceMaterialInit() {
      const stoneTexture = THREE.ImageUtils.loadTexture(StoneImage)
      const faceMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, map: stoneTexture })

      const geometry = new THREE.Geometry()
      geometry.vertices.push(
        new THREE.Vector3(3.189, 6.472, 0),
        new THREE.Vector3(4.811, 6.472, 0),
        new THREE.Vector3(-3.189, -6.472, 0),
        new THREE.Vector3(-4.811, -6.472, 0),
        new THREE.Vector3(3.189, 6.472, 0)
      )

      geometry.faces.push(new THREE.Face3(4, 3, 2), new THREE.Face3(0, 2, 1))
      const faceMesh = new THREE.Mesh(geometry, faceMaterial)
      const faceMesh2 = new THREE.Mesh(geometry, faceMaterial)
      const faceMesh3 = new THREE.Mesh(geometry, faceMaterial)
      const faceMesh4 = new THREE.Mesh(geometry, faceMaterial)
      geometry.computeFaceNormals()
      geometry.computeVertexNormals()
      this.scene.add(faceMesh)
      this.scene.add(faceMesh2)
      this.scene.add(faceMesh3)
      this.scene.add(faceMesh4)

      faceMesh.position.set(-10.5, 0, -5)
      faceMesh2.position.set(-3.5, 0, -5)
      faceMesh3.position.set(3.5, 0, -5)
      faceMesh4.position.set(10.5, 0, -5)
    },
    flashInit() {
      this.flash.position.set(0, 0, 1)
      this.scene.add(this.flash)

      this.light.position.set(0, 0, 1)
      this.scene.add(this.light)
    },
    tick() {
      requestAnimationFrame(this.tick)
      this.renderer.render(this.scene, this.camera)
      this.delta = this.clock.getDelta()
      this.evolveSmoke()
      this.flashAnimation()
    },
    evolveSmoke() {
      let sp = this.smokeParticles.length
      while (sp--) {
        this.smokeParticles[sp].rotation.z += this.delta * 0.15
      }
    },
    flashAnimation() {
      if (Math.random() > 0.97 || this.flash.power > 100) {
        if (this.flash.power < 100) this.flash.position.set(Math.random() * 200 - 100, Math.random() * 200 - 100, 1)
        this.flash.power = 20 + Math.random() * 400
      }
    }
  }
}
</script>
