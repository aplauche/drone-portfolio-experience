import * as THREE from 'three'
import Experience from "../Experience";

export default class Targets {
    constructor(){
        this.casterTargets = []
        
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.textures = this.experience.resources.items
        this.materials = this.experience.resources.materials
        this.generateTargets()
    }

    generateTargets() {

        const perceptoTarget = new THREE.Mesh(
            new THREE.BoxGeometry(12,2,12),
            this.materials.borderMaterials
        )
        this.casterTargets.push(perceptoTarget)
        perceptoTarget.position.set(-38, 0.82, -16)
        perceptoTarget.scale.y = 0.001
        perceptoTarget.userData.customId = "percepto"
        this.scene.add(perceptoTarget)
        
        
        const siloTarget = new THREE.Mesh(
            new THREE.BoxGeometry(12,2,12),
            this.materials.borderMaterials
        )
        this.casterTargets.push(siloTarget)
        siloTarget.position.set(23.5, 0.82, -21.2)
        siloTarget.rotation.y = 0.27
        siloTarget.scale.y = 0.001
        siloTarget.userData.customId = "silo"
        this.scene.add(siloTarget)
        
        
        
        const contactTarget = new THREE.Mesh(
            new THREE.BoxGeometry(12,2,12),
            this.materials.borderMaterials
        )
        this.casterTargets.push(contactTarget)
        contactTarget.position.set(35.5, 0.82, 29)
        contactTarget.scale.y = 0.001
        contactTarget.rotation.y = -0.68
        contactTarget.userData.customId = "contact"
        this.scene.add(contactTarget)
        
        
        
        
        
        const headlessTarget = new THREE.Mesh(
            new THREE.BoxGeometry(16,2,12),
            this.materials.borderMaterials
        )
        this.casterTargets.push(headlessTarget)
        headlessTarget.position.set(-31, 0.82, 27)
        headlessTarget.scale.y = 0.001
        headlessTarget.userData.customId = "headless"
        this.scene.add(headlessTarget)
        
        
        
        const korovaTarget = new THREE.Mesh(
            new THREE.BoxGeometry(7,2,7),
            this.materials.borderMaterials
        )
        this.casterTargets.push(korovaTarget)
        korovaTarget.position.set(-33, 1.4, -37.5)
        korovaTarget.scale.y = 0.001
        korovaTarget.userData.customId = "korova"
        this.scene.add(korovaTarget)
        
        
        
        const teslasuitTarget = new THREE.Mesh(
            new THREE.BoxGeometry(7,2,10),
            this.materials.borderMaterials
        )
        this.casterTargets.push(teslasuitTarget)
        teslasuitTarget.position.set(-42, 1.4, -40)
        teslasuitTarget.scale.y = 0.001
        teslasuitTarget.userData.customId = "teslasuit"
        this.scene.add(teslasuitTarget) 
        
        const worldviewTarget = new THREE.Mesh(
            new THREE.BoxGeometry(7,2,7),
            this.materials.borderMaterials
        )
        this.casterTargets.push(worldviewTarget)
        worldviewTarget.position.set(-33.8, 1.4, -47)
        worldviewTarget.scale.y = 0.001
        worldviewTarget.userData.customId = "worldview"
        this.scene.add(worldviewTarget)
        
        
        
        const cwTarget = new THREE.Mesh(
            new THREE.BoxGeometry(7,2,7),
            this.materials.borderMaterials
        )
        this.casterTargets.push(cwTarget)
        cwTarget.position.set(-15, 0.75, -38.5)
        cwTarget.rotation.y = -0.23
        cwTarget.scale.y = 0.001
        cwTarget.userData.customId = "cw"
        this.scene.add(cwTarget)
        
    }
}