import * as THREE from 'three'
import {gsap} from 'gsap'

import Experience from "../Experience";


export default class Drone {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        this.droneGroup = new THREE.Group()
        this.compassVisible = true

        this.setModel()
        this.addCompass()
 
    }

    setModel(){

        this.resources.gltfLoader.load('drone.glb', (gltf) => {
            gltf.scene.traverse(child => {
                child.material = this.resources.materials.bakedDroneMaterial
            })
            this.prop1 = gltf.scene.children.find((child) => {
                return child.name === 'prop1'
            })
            this.prop2 = gltf.scene.children.find((child) => {
                return child.name === 'prop2'
            })
            this.prop3 = gltf.scene.children.find((child) => {
                return child.name === 'prop3'
            })
            this.prop4 = gltf.scene.children.find((child) => {
                return child.name === 'prop4'
            })
        
            gltf.scene.scale.set(0.25,0.25,0.25)
        
            this.droneGroup.add(gltf.scene) 
            this.experience.droneLoaded = true
        
            this.scene.add(this.droneGroup)
        })

        this.droneShadow = new THREE.Mesh(
            new THREE.PlaneGeometry(3,3,1,1),
            new THREE.MeshBasicMaterial({map: this.resources.items.droneShadowTexture, transparent: true})
        )
        
        this.droneShadow.position.y += 0.1
        this.droneShadow.rotation.x -= Math.PI / 2
        this.scene.add(this.droneShadow)
    }


    addCompass(){
        this.droneCompass = new THREE.Mesh(
            new THREE.PlaneGeometry(7,7,1,1),
            new THREE.MeshBasicMaterial({map: this.resources.items.droneCompassTexture, transparent: true})
        )
        this.droneCompass.position.y +=7.5
        this.droneCompass.rotation.x -= Math.PI / 2
        this.droneCompass.scale.set(0,0,0)
        this.scene.add(this.droneCompass)
        
        this.droneCompassLabels = new THREE.Group()
        
        const clientLabel = new THREE.Mesh(
            new THREE.PlaneGeometry(2.5,0.75,1,1),
            new THREE.MeshBasicMaterial({map: this.resources.items.clientLabelTexture})
        )
        clientLabel.position.set(-2,0,-3)
        clientLabel.rotation.y += Math.PI / 8
        this.droneCompassLabels.add(clientLabel)
        
        const personalLabel = new THREE.Mesh(
            new THREE.PlaneGeometry(2.5,0.75,1,1),
            new THREE.MeshBasicMaterial({map: this.resources.items.personalLabelTexture})
        )
        personalLabel.position.set(3,0,0)
        this.droneCompassLabels.add(personalLabel)
        
        const contactLabel = new THREE.Mesh(
            new THREE.PlaneGeometry(2.5,0.75,1,1),
            new THREE.MeshBasicMaterial({map: this.resources.items.contactLabelTexture})
        )
        contactLabel.position.set(2,0,3)
        contactLabel.rotation.y += Math.PI / 8
        this.droneCompassLabels.add(contactLabel)
        
        const interestsLabel = new THREE.Mesh(
            new THREE.PlaneGeometry(2.5,0.75,1,1),
            new THREE.MeshBasicMaterial({map: this.resources.items.interestsLabelTexture})
        )
        interestsLabel.position.set(-2.5,0,2.5)
        interestsLabel.rotation.y += Math.PI / 4
        this.droneCompassLabels.add(interestsLabel)
        
        this.droneCompassLabels.position.y +=8.5
        this.scene.add(this.droneCompassLabels)
    }

    resetDrone(){
        this.experience.controls.xCurrent = 0
        this.experience.controls.zCurrent = 0
        this.experience.controls.xTarget = 0
        this.experience.controls.zTarget = 0

        this.experience.controls.xCamTarget = this.experience.camera.cameraStart.x
        this.experience.controls. zCamTarget = this.experience.camera.cameraStart.z
        this.experience.controls.xCamCurrent = this.experience.camera.cameraStart.x
        this.experience.controls.zCamCurrent = this.experience.camera.cameraStart.z
    }

    update() {
        this.droneGroup.position.y += Math.sin(this.time.elapsed) * 0.005
        if(this.experience.droneLoaded) {
            this.prop1.rotation.y = this.time.elapsed * 15
            this.prop2.rotation.y = -this.time.elapsed * 15
            this.prop3.rotation.y = -this.time.elapsed * 15
            this.prop4.rotation.y = this.time.elapsed * 15
        }
    }

}