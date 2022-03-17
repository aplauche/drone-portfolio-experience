import * as THREE from 'three'

import Experience from "../Experience";



export default class World {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.loadWorld()
    }

    loadWorld(){
        this.resources.gltfLoader.load('/portfolio-scene-8k.glb', (gltf) => {

            gltf.scene.traverse(child => {
                if(child.name.includes('ground') ){
                    child.material = this.resources.materials.bakedMainMaterial
                }
                else if(child.name.includes('Cube')){
                    child.material = this.resources.materials.rockMaterial
                }
                else if(child.name.includes('slab') || child.name.includes('cap')){
                    child.material = this.resources.materials.stuccoMaterial
                }
                else if(child.name.includes('building') ){
                    child.material = this.resources.materials.bakedMainMaterial
                }
                else if (child.name.includes('power-plant')){
                    child.material = this.resources.materials.bakedMainMaterial
                }
                else if(child.name.includes('cactus')){
                    child.material = this.resources.materials.treeMaterial
                }
                else if(child.name.includes('arch')){
                    child.material = this.resources.materials.redRockMaterial
                }
                else if(child.name.includes('silo')){
                    child.material = this.resources.materials.bakedMainMaterial
                }
                else if(child.name.includes('shop')){
                    child.material = this.resources.materials.bakedMainMaterial
                }
                else if(child.name.includes('db')){
                    child.material = this.resources.materials.bakedMainMaterial
                }
                else if(child.name.includes('barn')){
                    child.material = this.resources.materials.bakedMainMaterial
                }
                else if(child.name.includes('house')){
                    child.material = this.resources.materials.stuccoMaterial
                }
                else if(child.name.includes('ruin')){
                    child.material = this.resources.materials.stuccoMaterial
                }
            })
        
            gltf.scene.scale.set(3,3,3)
        
            this.scene.add(gltf.scene)
        })
    }
}