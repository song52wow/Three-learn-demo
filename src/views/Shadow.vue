<script lang="ts">
import { AmbientLight, AxesHelper, BoxBufferGeometry, Mesh, MeshBasicMaterial, MeshLambertMaterial, PerspectiveCamera, PlaneBufferGeometry, PlaneGeometry, Scene, SpotLight, Vector2, WebGLRenderer } from 'three'
import { defineComponent, render } from 'vue'

export default defineComponent({
  setup () {
    const scene = new Scene()
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    // camera.position.set(-30, 45, 100)
    camera.position.x = -50
    camera.position.y = 50
    camera.position.z = 100
    camera.lookAt(scene.position)

    const renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true

    document.body.appendChild(renderer.domElement)

    const axes = new AxesHelper(50)

    scene.add(axes)

    // 创建正方体
    const geometry = new BoxBufferGeometry(8, 8, 8)
    const material = new MeshLambertMaterial({ color: 0x00ff00 })
    const mesh = new Mesh(geometry, material)
    mesh.castShadow = true

    mesh.position.set(5, 10, 10)

    scene.add(mesh)

    // 创建地面
    const planeGeometry = new PlaneBufferGeometry(100, 100)
    const planeMaterial = new MeshLambertMaterial({ color: 0xffffff })
    const planeMesh = new Mesh(planeGeometry, planeMaterial)
    planeMesh.receiveShadow = true

    planeMesh.rotation.x = -0.5 * Math.PI
    planeMesh.position.set(0, 0, 0)

    scene.add(planeMesh)

    // 聚光灯
    const spotLight = new SpotLight(0xffffff)
    spotLight.position.set(-60, 40, -65)
    // 聚光灯产生阴影
    spotLight.castShadow = true
    // 阴影结构
    spotLight.shadow.mapSize = new Vector2(1024, 1024)
    spotLight.shadow.camera.far = 130
    spotLight.shadow.camera.near = 40
    scene.add(spotLight)

    // 光源
    const ambienLight = new AmbientLight(0xaaaaaa)
    scene.add(ambienLight)

    // renderer.render(scene, camera)

    function animate () {
      requestAnimationFrame(animate)

      renderer.render(scene, camera)
    }

    requestAnimationFrame(animate)
  }
})
</script>
