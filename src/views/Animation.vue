<script lang="ts">
import { AmbientLight, AxesHelper, BoxGeometry, Mesh, MeshBasicMaterial, MeshLambertMaterial, PerspectiveCamera, PlaneBufferGeometry, Scene, SpotLight, Vector2, WebGLRenderer } from 'three'
import Stats from 'stats.js'
import { defineComponent } from 'vue'
import * as dat from 'dat.gui'

export default defineComponent({
  setup () {
    // 场景
    const scene = new Scene()

    // 摄像机
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    // 摄像机位置
    camera.position.x = -100
    camera.position.y = 70
    camera.position.z = 200
    camera.lookAt(scene.position)

    // 渲染器
    const renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true

    document.body.appendChild(renderer.domElement)

    // 坐标轴
    const axes = new AxesHelper(100)
    scene.add(axes)

    // 正方体
    const boxGeometry = new BoxGeometry(20, 20, 20)
    const boxMaterial = new MeshBasicMaterial({ color: 0xff00ff })
    const boxMesh = new Mesh(boxGeometry, boxMaterial)

    boxMesh.position.set(20, 20, 20)
    boxMesh.castShadow = true

    scene.add(boxMesh)

    //  地板
    const planeGeometry = new PlaneBufferGeometry(250, 250)
    const planeMaterial = new MeshLambertMaterial({ color: 0xffffff })
    const planeMesh = new Mesh(planeGeometry, planeMaterial)

    planeMesh.rotation.x = -0.5 * Math.PI
    planeMesh.receiveShadow = true

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

    const stats = addStats()

    // dat
    const ctrlObj = { rotationSpeed: 0.01, jumpSpeed: 0.01 }
    const ctrl = new dat.GUI()
    ctrl.add(ctrlObj, 'rotationSpeed', 0, 1)
    ctrl.add(ctrlObj, 'jumpSpeed', 0, 1)

    let gap = 0

    function animation () {
      boxMesh.rotation.x += ctrlObj.rotationSpeed
      boxMesh.rotation.y += ctrlObj.rotationSpeed
      boxMesh.rotation.z += ctrlObj.rotationSpeed

      gap += ctrlObj.jumpSpeed
      boxMesh.position.x = 25 + (20 * Math.sin(gap))
      boxMesh.position.y = 10 + (20 * Math.abs(Math.cos(gap)))

      requestAnimationFrame(animation)

      stats.update()

      renderer.render(scene, camera)
    }

    function addStats () {
      const stats = new Stats()

      stats.dom.style.position = 'absolute'
      stats.dom.style.top = '0'
      stats.dom.style.left = '0'
      stats.showPanel(0)

      document.body.appendChild(stats.dom)

      return stats
    }

    animation()

    window.addEventListener('resize', onWindowResize, false)

    function onWindowResize () {
      // 设置相机长宽比
      camera.aspect = window.innerWidth / window.innerHeight
      // 更新相机投影矩阵
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
  }

})
</script>
