<template>
  <div ref="container"></div>
</template>

<script>
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
export default {
  name: 'FragmentShader',
  data() {
    return {
      scene: new THREE.Scene(),
      group: new THREE.Group(),
      pointCloud: null,
      linesMesh: null,
      camera: null,
      r: 800,
      rHalf: 800 / 2,
      maxParticleCount: 1000,
      particlesData: [],
      particleCount: 300,
      renderer: null,
      particlePositions: null,
      effectController: {
        showDots: true,
        showLines: true,
        minDistance: 150,
        limitConnections: false,
        maxConnections: 20,
        particleCount: 500
      },
      positions: null,
      colors: null
    }
  },
  mounted() {
    this.init()
    this.animate()
  },
  methods: {
    init() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      const container = this.$refs.container

      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000)
      this.camera.position.z = 1750

      this.scene.add(this.group)

      const helper = new THREE.BoxHelper(new THREE.Mesh(new THREE.BoxBufferGeometry(this.r, this.r, this.r)))
      helper.material.color.setHex(0x101010)
      helper.material.blending = THREE.AdditiveBlending
      helper.material.transparent = true
      this.group.add(helper)

      this.setControls()
      const segments = this.maxParticleCount * this.maxParticleCount

      this.positions = new Float32Array(segments * 3)
      this.colors = new Float32Array(segments * 3)

      const pMaterial = new THREE.PointsMaterial({
        color: 0xffff00,
        size: 1,
        blending: THREE.NoBlending,
        transparent: true,
        sizeAttenuation: false
      })

      const particles = new THREE.BufferGeometry()
      this.particlePositions = new Float32Array(this.maxParticleCount * 3)

      for (let i = 0; i < this.maxParticleCount; i++) {
        const x = Math.random() * this.r - this.r / 2
        const y = Math.random() * this.r - this.r / 2
        const z = Math.random() * this.r - this.r / 2

        this.particlePositions[i * 3] = x
        this.particlePositions[i * 3 + 1] = y
        this.particlePositions[i * 3 + 2] = z

        // add it to the geometry
        this.particlesData.push({
          velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
          numConnections: 0
        })
      }

      particles.setDrawRange(0, this.particleCount)
      particles.setAttribute(
        'position',
        new THREE.BufferAttribute(this.particlePositions, 4).setUsage(THREE.DynamicDrawUsage)
      )

      // create the particle system
      this.pointCloud = new THREE.Points(particles, pMaterial)
      // this.group.add(this.pointCloud)

      const geometry = new THREE.BufferGeometry()

      geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3).setUsage(THREE.DynamicDrawUsage))
      geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3).setUsage(THREE.DynamicDrawUsage))

      geometry.computeBoundingSphere()

      geometry.setDrawRange(0, 0)

      const material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors,
        blending: THREE.AdditiveBlending,
        transparent: true
      })

      this.linesMesh = new THREE.LineSegments(geometry, material)
      this.group.add(this.linesMesh)

      //

      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.outputEncoding = THREE.sRGBEncoding

      container.appendChild(this.renderer.domElement)

      window.addEventListener('resize', this.onWindowResize, false)
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate() {
      let vertexpos = 0
      let numConnected = 0
      let colorpos = 0

      for (let i = 0; i < this.particleCount; i++) {
        // get the particle
        const particleData = this.particlesData[i]

        this.particlePositions[i * 3] += particleData.velocity.x
        this.particlePositions[i * 3 + 1] += particleData.velocity.y
        this.particlePositions[i * 3 + 2] += particleData.velocity.z

        if (this.particlePositions[i * 3] < -this.rHalf || this.particlePositions[i * 3] > this.rHalf)
          particleData.velocity.x = -particleData.velocity.x

        if (this.particlePositions[i * 3 + 1] < -this.rHalf || this.particlePositions[i * 3 + 1] > this.rHalf)
          particleData.velocity.y = -particleData.velocity.y

        if (this.particlePositions[i * 3 + 2] < -this.rHalf || this.particlePositions[i * 3 + 2] > this.rHalf)
          particleData.velocity.z = -particleData.velocity.z

        // Check collision
        for (let j = i + 1; j < this.particleCount; j++) {
          const particleDataB = this.particlesData[j]
          const dx = this.particlePositions[i * 3] - this.particlePositions[j * 3]
          const dy = this.particlePositions[i * 3 + 1] - this.particlePositions[j * 3 + 1]
          const dz = this.particlePositions[i * 3 + 2] - this.particlePositions[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < this.effectController.minDistance) {
            particleData.numConnections++
            particleDataB.numConnections++

            const alpha = 2 - dist / this.effectController.minDistance

            this.positions[vertexpos++] = this.particlePositions[i * 3]
            this.positions[vertexpos++] = this.particlePositions[i * 3 + 1]
            this.positions[vertexpos++] = this.particlePositions[i * 3 + 2]

            this.positions[vertexpos++] = this.particlePositions[j * 3]
            this.positions[vertexpos++] = this.particlePositions[j * 3 + 1]
            this.positions[vertexpos++] = this.particlePositions[j * 3 + 2]

            this.colors[colorpos++] = alpha
            this.colors[colorpos++] = alpha
            this.colors[colorpos++] = alpha

            this.colors[colorpos++] = alpha
            this.colors[colorpos++] = alpha
            this.colors[colorpos++] = alpha
            numConnected++
          }
        }
      }

      this.linesMesh.geometry.setDrawRange(0, numConnected * 3)
      this.linesMesh.geometry.attributes.position.needsUpdate = true
      this.linesMesh.geometry.attributes.color.needsUpdate = true

      this.pointCloud.geometry.attributes.position.needsUpdate = true

      requestAnimationFrame(this.animate)

      this.render()
    },
    render() {
      const time = Date.now() * 0.001
      this.group.rotation.y = time * 0.1
      this.group.rotation.x = time * 0.2
      this.renderer.render(this.scene, this.camera)
    },
    // init mouse control
    setControls() {
      const container = this.$refs.container
      const controls = new OrbitControls(this.camera, container)
      controls.enableDamping = true
      controls.dampingFactor = 0.25
    }
  }
}
</script>
