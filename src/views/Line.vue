<script lang="ts">
import { defineComponent } from 'vue'
import * as THREE from 'three'

export default defineComponent({
  setup () {
    const renderer = new THREE.WebGLRenderer()

    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    camera.position.set(0, 0, 50)
    camera.lookAt(0, 0, 0)

    const metarial = new THREE.LineBasicMaterial({ color: 0x0000ff })

    const poines = []

    poines.push(new THREE.Vector3(-10, 0, 0))
    poines.push(new THREE.Vector3(0, 10, 0))
    poines.push(new THREE.Vector3(10, 0, 0))

    const geometry = new THREE.BufferGeometry().setFromPoints(poines)

    const line = new THREE.Line(geometry, metarial)

    scene.add(line)

    renderer.render(scene, camera)
  }
})
</script>
