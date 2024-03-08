import * as THREE from "three";


export class Cubo{
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