import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Experience from "./Experience";


export default class Camera {
    constructor(){
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        

        this.createCamera()
        this.resizeCamera()
    }

    createCamera(){
        this.cameraStart = new THREE.Vector3(8,20,14)
        if(window.innerWidth < 600){
            this.cameraInstance = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100)
       } else {
            this.cameraInstance= new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
       } 
       this.cameraInstance.updateProjectionMatrix();
        this.cameraInstance.position.set(this.cameraStart.x, this.cameraStart.y, this.cameraStart.z)
        // camera.position.x = 9
        // camera.position.y = 20
        // camera.position.z = 14

        this.cameraInstance.rotation.set(-0.76, 0.4, 0.35)
        this.scene.add(this.cameraInstance)


        this.scene.add(this.cameraInstance)
    }

    resizeCamera(){
        this.cameraInstance.aspect = this.sizes.width / this.sizes.height
        this.cameraInstance.updateProjectionMatrix()
    }
}