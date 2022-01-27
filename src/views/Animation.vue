<script lang="ts">
import { AmbientLight, AxesHelper, BoxGeometry, Mesh, MeshBasicMaterial, MeshLambertMaterial, PerspectiveCamera, PlaneBufferGeometry, Scene, SpotLight, Vector2, WebGLRenderer } from 'three'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    // 场景
    const scene = new Scene()

    // 摄像机
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    // 摄像机位置
    camera.position.x = -25
    camera.position.y = 70
    camera.position.z = 200
    camera.lookAt(scene.position)

    // 渲染器
    const renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    // 坐标轴
    const axes = new AxesHelper(100)
    scene.add(axes)

    // 正方体
    const boxGeometry = new BoxGeometry(20, 20, 20)
    const boxMaterial = new MeshBasicMaterial({ color: 0xff00ff })
    const boxMesh = new Mesh(boxGeometry, boxMaterial)

    boxMesh.position.set(20, 20, 20)

    scene.add(boxMesh)

    //  地板
    const planeGeometry = new PlaneBufferGeometry(250, 250)
    const planeMaterial = new MeshLambertMaterial({ color: 0xffffff })
    const planeMesh = new Mesh(planeGeometry, planeMaterial)

    planeMesh.rotation.x = -0.5 * Math.PI

    scene.add(planeMesh)

    // 环境光
    const ambientLight = new AmbientLight(0x333333)
    scene.add(ambientLight)

    // 聚光灯
    const spotLight = new SpotLight(0xffffff)
    spotLight.position.set(-40, 40, 0)
    spotLight.castShadow = true

    // 阴影结构
    spotLight.shadow.mapSize = new Vector2(1024, 1024)
    spotLight.shadow.camera.far = 130
    spotLight.shadow.camera.near = 40
    scene.add(spotLight)

    function animation () {
      requestAnimationFrame(animation)

      renderer.render(scene, camera)
    }

    animation()
  }
})
</script>
