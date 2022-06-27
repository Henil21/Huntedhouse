import "./style.css"
import * as THREE from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Color, Mesh, TextGeometry } from "three"

const textureloader=new THREE.TextureLoader()
const doorcolortexture= textureloader.load('/textures/door/color.jpg')
const dooralphatexture= textureloader.load('/textures/door/alpha.jpg')
const dooramb= textureloader.load('/textures/door/ambientOcclusion.jpg')
const doorheight= textureloader.load('/textures/door/height.jpg')
const doornormal= textureloader.load('/textures/door/normal.jpg')
const doormetalness= textureloader.load('/textures/door/metalness.jpg')
const doorroughness= textureloader.load('/textures/door/roughness.jpg')

const brickscolor= textureloader.load('/textures/bricks/color.jpg')
const brickamb= textureloader.load('/textures/bricks/ambientOcclusion.jpg')
const bricknromal= textureloader.load('/textures/bricks/normal.jpg')
const brickrough= textureloader.load('/textures/bricks/roughness.jpg')

const grasscolor = textureloader.load('/textures/grass/color.jpg')
const grassamb = textureloader.load('/textures/grass/ambientOcclusion.jpg')
const grassnormal = textureloader.load('/textures/grass/normal.jpg')
const grassrough = textureloader.load('/textures/grass/roughness.jpg')

grasscolor.repeat.set(8,8)
grassamb.repeat.set(8,8)
grassnormal.repeat.set(8,8)
grassrough.repeat.set(8,8)

grasscolor.wrapS=THREE.RepeatWrapping
grassamb.wrapS=THREE.RepeatWrapping
grassnormal.wrapS=THREE.RepeatWrapping
grassrough.wrapS=THREE.RepeatWrapping


grasscolor.wrapT=THREE.RepeatWrapping
grassamb.wrapT=THREE.RepeatWrapping
grassnormal.wrapT=THREE.RepeatWrapping
grassrough.wrapT=THREE.RepeatWrapping






console.log(doorcolortexture)
const gui = new dat.GUI();
const canvas=document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const material= new THREE.MeshStandardMaterial()
gui.add(material,'metalness').min(0.1).max(1).step(0.1)
gui.add(material,'roughness').min(0.1).max(1).step(0.1)


material.specular= new THREE.Color(0x1188ff)

const house= new THREE.Group()
scene.add(house)
//walls
const walls= new THREE.Mesh(
  new THREE.BoxBufferGeometry(4,2.5,4),
  new THREE.MeshStandardMaterial({
    map:brickscolor,
    // transparent:true,
    aoMap:brickamb,
    normalMap:bricknromal,
    roughness:brickrough

  })
)
walls.position.y=0.5
walls.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array,2)
)
house.add(walls)
//roof 
const roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.5,1,4),
  new THREE.MeshStandardMaterial({color:'#b35f45'})//#966F33
)
roof.position.y=2.2
roof.rotation.y=Math.PI*0.25
house.add(roof)
//door
const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1.9,1.5),
  new THREE.MeshStandardMaterial({
    map:doorcolortexture,
    transparent:true,
    alphaMap:dooralphatexture,
    aoMap:dooramb,
    displacementMap:doorheight,
    displacementScale:0.1,
    normalMap:doornormal,
    metalnessMap:doormetalness,
    roughnessMap:doorroughness
  })
)
door.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2)
)
door.position.y=0.02
door.position.z=2+0.001
//gostLight
const gost1= new THREE.PointLight('#ff00ff',2,3)
scene.add(gost1)
const gost2= new THREE.PointLight('#00ffff',2,3)
scene.add(gost2)
const gost3= new THREE.PointLight('#ffff00',2,3)
scene.add(gost3)





//bushes
const bush=new THREE.SphereBufferGeometry(1,16,16)
const bushmterial = new THREE.MeshStandardMaterial({color:'#89c854'})
const bush1=new THREE.Mesh(bush,bushmterial)
bush1.scale.set(0.4,0.4,0.4)
bush1.position.set(0.8,-0.5,2.5)
house.add(bush1)

const bush2=new THREE.Mesh(bush,bushmterial)
bush2.scale.set(0.25,0.25,0.25)
bush2.position.set(1.3,-0.5,2.5)
house.add(bush2)

const bush3=new THREE.Mesh(bush,bushmterial)
bush3.scale.set(0.4,0.4,0.4)
bush3.position.set(-0.8,-0.5,2.4)
house.add(bush3)

const bush4=new THREE.Mesh(bush,bushmterial)
bush4.scale.set(0.15,0.15,0.15)
bush4.position.set(-1,-0.56,2.9)
house.add(bush4)
//Graves
const graves=new THREE.Group()
scene.add(graves)
const grv= new THREE.BoxBufferGeometry(0.6,0.8,0.2)
const gmtr=new THREE.MeshStandardMaterial({color:'#b2b6b1'})
for(let  i=0;i<50;i++)
{
  const angle = Math.random()*Math.PI*2
  const radius=3+Math.random()*6 
  const x= Math.cos(angle)*radius
  const z= Math.sin(angle)*radius
  const grave= new THREE.Mesh(grv,gmtr)
  grave.position.set(x,-0.1999,z)
  grave.rotation.y=(Math.random()-0.5)*0.5
  grave.rotation.z=(Math.random()-0.5)*0.2
  grave.castShadow=true
  graves.add(grave)
}
const fog = new THREE.Fog('#262837',1,15)
scene.fog= fog

house.add(door)
//plane
const plan =  new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20,20),
  new THREE.MeshStandardMaterial({
    map:grasscolor,
    // transparent:true,
    aoMap:grassamb,
    normalMap:grassnormal,
    roughness:grassrough
  })
)
plan.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(plan.geometry.attributes.uv.array,2)
)

plan.rotation.x= -Math.PI*0.5
plan.position.y=-0.65
plan.receiveShadow = true
scene.add(plan)
const size={
    width:window.innerWidth,
    height : window.innerHeight
}
window.addEventListener('dblclick',()=>{
  if(!document.fullscreenElement){
    canvas.requestFullscreen()
  }
  else{
    document.exitFullscreen()
  }
})
const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
// const camera = new THREE.OrthographicCamera(-1,1,1,-1,0.1,100)

scene.add(camera)
camera.position.z=7
camera.position.y=2

//controls
const controls=new OrbitControls(camera,canvas)
controls.enableDamping=true



const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(size.width,size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))//will render between devicepixel and 2
renderer.render(scene,camera)
renderer.shadowMap.enabled=true





renderer.shadowMap.type=THREE.PCFSoftShadowMap
renderer.setClearColor('#262837')

const alight= new THREE.AmbientLight('#b9d5ff',0.12)
scene.add(alight)
// gui.add(alight,'intensity').min(0).max(1).step(0.001).name('alight')

const dlight=new THREE.DirectionalLight('#b9d5ff',0.12)
dlight.position.set(2,2,-1)

// gui.add(dlight.position,'x').min(-5).max(5).step(0.001).name('x')
// gui.add(dlight.position,'y').min(-5).max(5).step(0.001).name('y')
// gui.add(dlight.position,'z').min(-5).max(5).step(0.001).name('z')


gui.add(dlight,'intensity').min(0).max(1).step(0.1).name('moonlight')
scene.add(dlight)
dlight.castShadow = true
dlight.shadow.mapSize.width=1024
dlight.shadow.mapSize.height=1024
dlight.shadow.camera.near=1
dlight.shadow.camera.far=6
dlight.shadow.camera.top=2
dlight.shadow.camera.right=2
dlight.shadow.camera.bottom=-2
dlight.shadow.camera.left=-2

dlight.shadow.radius=10
//door light
const doorlight = new THREE.PointLight('#ff7d46',2,7)
doorlight.position.set(0,1.5,2.2)
house.add(doorlight)



// console.log(dlight.shadow)
const dcamera = new THREE.CameraHelper(dlight.shadow.camera)
scene.add(dcamera)
dcamera.visible=false

dlight.castShadow=true
doorlight.castShadow=true
gost1.castShadow=true
gost2.castShadow=true
gost3.castShadow=true
bush1.castShadow=true
bush2.castShadow=true
bush3.castShadow=true
walls.castShadow=true

// let time= Date.now()
//clock
const clock=new THREE.Clock()
const  tick= () =>
{
    const elap=clock.getElapsedTime()
    //update gost
    const g1angle=elap*0.5
    gost1.position.x=Math.cos(g1angle)*4
    gost1.position.z=Math.sin(g1angle)*4 
    gost1.position.y=Math.sin(elap)*0.3
    

    const g1angle2=-(elap*0.4)
    gost2.position.x=Math.cos(g1angle2)*5
    gost2.position.z=Math.sin(g1angle2)*5
    gost2.position.y=Math.sin(elap*3.5)+Math.sin(elap*0.2)


    const g1angl3=elap*0.3
    gost3.position.x=Math.cos(g1angl3)*(7+Math.sin(elap*1.5))
    gost3.position.z=Math.sin(g1angl3)*(7+Math.sin(elap*3))
    gost3.position.y=Math.sin(elap*0.3)+Math.sin(elap*2)

    renderer.render(scene,camera)  
    window.requestAnimationFrame(tick)//call function at each point
}
tick()
