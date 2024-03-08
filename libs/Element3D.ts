import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
const MTLLoader = require('./MTLLoader')
const OBJLoader = require('./OBJLoader')

// import PointerLockControls from 'three-pointerlock-ts'

class Player{
    speed:number;
    turnSpeed: number;  
    height: number;
    canShoot: number;
    constructor(){
        this.speed=0.1
        this.turnSpeed = Math.PI * 0.01
        this.height = 1.8
        this.canShoot = 1
    }
}
class KeyBoard{
    [key: number] : boolean
}

class Cubo{
    instance_cubo: THREE.Mesh<THREE.BoxGeometry, THREE.MeshNormalMaterial, THREE.Object3DEventMap>;
    constructor(use_wireframe: boolean){
        this.instance_cubo = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial({ wireframe: use_wireframe })
        );
        this.instance_cubo.receiveShadow = true
        this.instance_cubo.castShadow = true
        this.instance_cubo.position.y=+2
    }

    get_instance(){
        return this.instance_cubo
    }
}

class Rederer{
    renderer: THREE.WebGLRenderer;       
    constructor(){
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.BasicShadowMap
        this.renderer.setSize(window.innerWidth - 100, window.innerHeight - 100)
    }

    get_redereder_instance(){
        return this.renderer
    }
}

class Camera{
    camera: THREE.PerspectiveCamera;
    constructor(player: Player){
        this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0,  player.height ,-5)
        this.camera.lookAt(new THREE.Vector3(0,player.height,0))
    }

    get_camera_instance(): THREE.PerspectiveCamera{
        return this.camera
    }
}

class Chao{
    chao: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshLambertMaterial, THREE.Object3DEventMap>;
    constructor(wire_frame: boolean){
        this.chao = new THREE.Mesh(
            new THREE.PlaneGeometry(1000, 1000, 10, 10),
            new THREE.MeshLambertMaterial({color:0xffffff, wireframe:wire_frame}),
        )
        this.chao.rotation.x -= Math.PI / 2
	    this.chao.receiveShadow = true
    }

    get_chao_instance(){
        return this.chao
    }
}

class Luz{
    luz: THREE.PointLight;
    constructor(){
        this.luz = new THREE.PointLight(0xffffff, 0.8, 18)
        this.luz.position.set(-3, 6, -3)
        this.luz.castShadow = true
        this.luz.shadow.camera.near = 0.1
        this.luz.shadow.camera.far = 500
    }
    get_luz_instance(){
        return this.luz
    }
}

class Malha{
    malha: any;
    constructor(wire_frame:boolean){
        this.malha = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xff9999, wireframe: wire_frame })
        )
        this.malha.receiveShadow = true
        this.malha.castShadow = true
        this.malha.position.y = 4
    }

    get_malha_instance(){
        return this.malha
    }
}

class Crate{
    crate: THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial, THREE.Object3DEventMap>;
    constructor(loadingManager: THREE.LoadingManager){
       this.crate = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.MeshPhongMaterial({
                color: 0xffffff,
                map: new THREE.TextureLoader(loadingManager).load('crate0/crate0_diffuse.png'),
                bumpMap: new THREE.TextureLoader(loadingManager).load('crate0/crate0_bump.png'),
                normalMap: new THREE.TextureLoader(loadingManager).load('crate0/crate0_normal.png')
            })
        )
        this.crate.position.y+=1.5
        this.crate.position.x+=3
        this.crate.position.z+=3
        this.crate.receiveShadow = true
        this.crate.castShadow = true
    }
    get_crate_instance(){    
        return this.crate
    }
}

class LoadingScreen{
    scene2: THREE.Scene;
    camera2: THREE.PerspectiveCamera;
    box2: THREE.Mesh;
    constructor(){
        this.scene2 = new THREE.Scene();
        this.camera2 = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 0.1, 100);
        this.box2= new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1),new THREE.MeshBasicMaterial({ color: 0x4444ff }) )
        this.box2.position.set(0,0,5)
        this.camera2.lookAt(this.box2.position)
        this.scene2.add(this.box2)        
    }
}


class Bullet{
    obj: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>;
    velocity: THREE.Vector3;
    alive: boolean;
    position: any;
    constructor(camera: THREE.PerspectiveCamera){
        this.obj = new THREE.Mesh(
            new THREE.SphereGeometry(0.05,8,8),
            new THREE.MeshBasicMaterial({color:0xffffff})
        );
        this.velocity = new THREE.Vector3(
            -Math.sin(camera.rotation.y),
            0,
            Math.cos(camera.rotation.y)
        );
        this.alive = false
    }
}

class Controles{
    controls: OrbitControls;
    constructor(camera: THREE.PerspectiveCamera, renderer:THREE.WebGLRenderer){
        this.controls = new OrbitControls(camera, renderer.domElement);
    }

    get_instance_controls(){
        return this.controls
    }
}

export default class Element3D {
    cena: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    cubo: THREE.Mesh<THREE.BoxGeometry, THREE.MeshNormalMaterial, THREE.Object3DEventMap>;
    chao: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshLambertMaterial, THREE.Object3DEventMap>;
    USE_WIREFRAME: boolean;
    malha: THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial, THREE.Object3DEventMap>;
    player: Player;
    keyboard: KeyBoard;
    luzAmbiente: THREE.AmbientLight;
    luz: THREE.PointLight;
    loadingManager: THREE.LoadingManager;
    crate: THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial, THREE.Object3DEventMap>;
    RESOURCES_LOADED: boolean;
    loadingScreen: LoadingScreen;
    meshes: { [key: string]: any } = [];
    clock: THREE.Clock;
    bullet: Bullet
    bullets: Bullet[] = [];
    controls: OrbitControls;


    
    constructor() {


        this.USE_WIREFRAME = false
        this.RESOURCES_LOADED = false
        this.cena = new THREE.Scene();

        this.cena.background = new THREE.Color(0xffffff);



        this.luzAmbiente = new THREE.AmbientLight(0xffffff, 0.2)

        this.loadingManager = new THREE.LoadingManager()
        this.loadingManager.onProgress = (item, load, total)=> console.log(item, load, total)
        this.loadingManager.onLoad =  () => this.RESOURCES_LOADED = true

        this.loadingScreen = new LoadingScreen()
        this.keyboard = new KeyBoard()
        this.player = new Player()

        this.renderer = new Rederer().get_redereder_instance()
        this.clock = new THREE.Clock()
        this.cubo = new Cubo(this.USE_WIREFRAME).get_instance()
        this.camera = new Camera(this.player).get_camera_instance()
        this.chao = new Chao(this.USE_WIREFRAME).get_chao_instance()
        this.malha = new Malha(this.USE_WIREFRAME).get_malha_instance()
        this.crate = new Crate(this.loadingManager).get_crate_instance()
        this.luz = new Luz().get_luz_instance()
        this.bullet = new Bullet(this.camera);


        this.controls = new Controles(this.camera,this.renderer).get_instance_controls()
        this.controls.enableZoom = false;



        // this.cena.add(this.cubo)
        this.cena.add(this.chao)
        // this.cena.add(this.malha)
        this.cena.add(this.luzAmbiente)
        this.cena.add(this.luz)
        this.cena.add(this.crate)

        this.keyDown = this.keyDown.bind(this)
        this.keyUp = this.keyUp.bind(this)

        window.addEventListener('keydown', this.keyDown)
        window.addEventListener('keyup', this.keyUp)

        this.addModelToScene('Models/Tent_Poles_01.mtl', 'Models/Tent_Poles_01.obj', -6, 0, 4)
        this.addModelListToScene()
    }

    addModelListToScene(){
        const models: any = {
            tent: {
                obj: 'Models/Tent_Poles_01.obj',
                mtl: 'Models/Tent_Poles_01.mtl',
                mesh: null,
                position:{
                    y:-16,
                    x:0,
                    z:4
                }
            },
            campfire: {
                obj: 'Models/Campfire_01.obj',
                mtl: 'Models/Campfire_01.mtl',
                mesh: null,
                position:{
                    y:-20,
                    x:0,
                    z:4
                }
            },
            pirateship: {
                obj: 'Models/Pirateship.obj',
                mtl: 'Models/Pirateship.mtl',
                mesh: null,
                position:{
                    y:20,
                    x:0,
                    z:4
                }
            },
            // uzi: {
            //     obj: 'Models/uziGold.obj',
            //     mtl: 'Models/uziGold.mtl',
            //     mesh: null,
            //     castShadow: false,        
            //     position:{
            //         y:0,
            //         x:1,
            //         z:0,
            //     },
            //     scale:{
            //         y:10,
            //         x:10,
            //         z:10
            //     }
            // }
        }

        for (var _key in models) {
            ( (key)=> {
        
        
                var mtLoader = new MTLLoader(this.loadingManager)
                mtLoader.load(models[key].mtl,  (materials: any) => {
                    materials.preload()
        
                    var objLoader = new OBJLoader(this.loadingManager)
                    objLoader.setMaterials(materials)
                    objLoader.load(models[key].obj, (aaa: any) =>{
                        aaa.traverse(function (node: any) {
                            if (node instanceof THREE.Mesh) {
                                if ('castShadow' in models[key])
                                    node.castShadow = models[key].castShadow
                                else
                                    node.castShadow = true
        
                                if ('receiveShadow' in models[key])
                                    node.receiveShadow = models[key].receiveShadow
                                else
                                    node.receiveShadow = true
                            }
                        })
        
                        models[key].mesh = aaa
                        const ob = models[key].mesh.clone()
                        this.meshes[key] = ob
                        if(models[key].position){
                            ob.position.set(models[key].position.y, models[key].position.x, models[key].position.z)
                        }
                        if(models[key].scale){
                            ob.scale.set(models[key].scale.y, models[key].scale.x, models[key].scale.z)
                        }
                        this.cena.add(ob)
                    })
                })
            })(_key)
        }
            // this.meshes['tent2'].rotation.y = Math.PI / 4
            // this.meshes['tent1'].rotation.y = Math.PI / 4
        
            // this.meshes['pirateship'].position.set(-10, 0, 0)
            // this.meshes.pirateship.rotation.set(0, Math.PI, 0)
        
    }


    addModelToScene(model:string, model2:string, x:number, y:number, z:number){
        const mtLoader = new MTLLoader(this.loadingManager)
        const objLoader = new OBJLoader(this.loadingManager)

        const mtLoaded = (materials:any) => {
            materials.preload()
            objLoader.setMaterials(materials)
            objLoader.load(model2, objLoaded )        
        }


        const objLoaded = (meshh: any) => {
            meshh.traverse(traverse)
            this.cena.add(meshh)
            meshh.position.set(x, y, z)
            meshh.rotation.y = -Math.PI / 4
        }

        const traverse =  (node: any) => {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true	
                node.receiveShadow = true
            }
        }

        mtLoader.load(model, mtLoaded )
    }

    s_pressed(){
        if (this.keyboard[83]===true) {
            this.camera.position.x += Math.sin(this.camera.rotation.y) * this.player.speed
            this.camera.position.z += -Math.cos(this.camera.rotation.y) * this.player.speed
        }
    }

    w_pressed(){
        if (this.keyboard[87]===true) {
            this.camera.position.x -= Math.sin(this.camera.rotation.y) * this.player.speed
            this.camera.position.z -= -Math.cos(this.camera.rotation.y) * this.player.speed
        }
    }

    a_pressed(){
        if (this.keyboard[65]===true) {
            this.camera.position.x += Math.sin(this.camera.rotation.y + Math.PI / 2) * this.player.speed
            this.camera.position.z += -Math.cos(this.camera.rotation.y + Math.PI / 2) * this.player.speed
        }
    }

    d_pressed(){
        if (this.keyboard[68]===true) { 
            this.camera.position.x += Math.sin(this.camera.rotation.y - Math.PI / 2) * this.player.speed
            this.camera.position.z += -Math.cos(this.camera.rotation.y - Math.PI / 2) * this.player.speed
        }
    }

    left_pressed(){
        if (this.keyboard[37]===true) { 
            this.camera.rotation.y -= this.player.turnSpeed
        }
    }

    right_pressed(){
        if (this.keyboard[39]===true) { 
            this.camera.rotation.y += this.player.turnSpeed
        }
    }


    space_pressed() {
        if(this.keyboard[32] && this.player.canShoot <= 0){
            try {
                this.bullet.obj.position.set(
                    this.meshes["uzi"].position.x,
                    this.meshes["uzi"].position.y + 0.15,
                    this.meshes["uzi"].position.z
                );
                this.bullets.push(this.bullet);
                this.cena.add(this.bullet.obj);

            } catch (error) { }
            
            this.bullet.alive = true;
            setTimeout(()=>{
                this.bullet.alive = false;
                this.cena.remove(this.bullet.obj);
            }, 1000);
            

            this.player.canShoot = 10;
        }
        if(this.player.canShoot > 0) this.player.canShoot -= 1;
    }


    gun_moviment(){
        try {
            var time = Date.now() * 0.0005
            // var delta = this.clock.getDelta()

            this.meshes['uzi'].position.set(
                this.camera.position.x - Math.sin(this.camera.rotation.y + Math.PI / 6) * 0.75,
                this.camera.position.y - 0.5 + Math.sin(time*4+this.camera.position.x+this.camera.position.z) * 0.01,
                this.camera.position.z + Math.cos(this.camera.rotation.y + Math.PI / 6) * 0.75
            )

            this.meshes['uzi'].rotation.set(
                this.camera.rotation.x,
                this.camera.rotation.y - Math.PI,
                this.camera.rotation.z
            )
        } catch (error) { console.log(error) }
    }

    keyDown(evt: KeyboardEvent) {
        this.keyboard[evt.keyCode] = true;  
    }
    
    keyUp(evt: KeyboardEvent) {
        this.keyboard[evt.keyCode] = false   
    }


    bulletMoviment(){
        for(var index=0; index<this.bullets.length; index++){
            if( this.bullets[index].obj === undefined ) continue;
            if( this.bullets[index].alive == false ){
                this.bullets.splice(index,1);
                continue;
            }
            this.bullets[index].obj.position.add(this.bullets[index].velocity);
        }
    }

    // screenLoadingFunction() {
    //     if (this.RESOURCES_LOADED == false) {    
    //         this.loadingScreen.box2.position.x -= 0.05
    //         if (this.loadingScreen.box2.position.x < -10) this.loadingScreen.box2.position.x = 10
    //         this.loadingScreen.box2.position.y = Math.sin(this.loadingScreen.box2.position.x)    
    //         this.renderer.render(this.loadingScreen.scene2, this.loadingScreen.camera2)
    //         return
    //     }
    // }

    Orbit(){
        try {
            this.controls.update();
        } catch (error) { }    
    }
}