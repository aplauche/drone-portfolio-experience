import * as THREE from 'three'
import Experience from "../Experience";

export default class Logos {
    constructor(){
       
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.textures = this.experience.resources.items
        this.materials = this.experience.resources.materials
        this.generateLogos()
    }

    generateLogos() {
       
        const perceptoLogo = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1, 1,1),
            new THREE.MeshBasicMaterial({map: this.textures.perceptoLogoTexture, transparent: true})
        )
        perceptoLogo.position.set(-35, 0.82, -14.1)
        perceptoLogo.rotation.y = 0.976
        this.scene.add(perceptoLogo)

        const korovaLogo = new THREE.Mesh(
            new THREE.PlaneGeometry(3, 3, 1,1),
            new THREE.MeshBasicMaterial({map: this.textures.korovaLogoTexture,transparent: true})
        )
        korovaLogo.position.set(-33.8, 5.42, -38)
        korovaLogo.rotation.x -= Math.PI / 2
        this.scene.add(korovaLogo)

        const worldviewLogo = new THREE.Mesh(
            new THREE.PlaneGeometry(4, 4, 1,1),
            new THREE.MeshBasicMaterial({map: this.textures.worldviewLogoTexture,transparent: true})
        )
        worldviewLogo.position.set(-34.4, 6.7, -48)
        worldviewLogo.rotation.x -= Math.PI / 2
        this.scene.add(worldviewLogo)

        const teslasuitLogo = new THREE.Mesh(
            new THREE.PlaneGeometry(4, 4, 1,1),
            new THREE.MeshBasicMaterial({map: this.textures.teslasuitLogoTexture,transparent: true})
        )
        teslasuitLogo.position.set(-42.5, 5.9, -40.75)
        teslasuitLogo.rotation.x -= Math.PI / 2
        this.scene.add(teslasuitLogo)



        const wordpressLogo = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2, 1,1),
            new THREE.MeshBasicMaterial({map: this.textures.wordpressLogoTexture,transparent: true})
        )
        wordpressLogo.position.set(-35.1, 2.55, 30.18)
        wordpressLogo.rotation.x -= Math.PI / 2
        this.scene.add(wordpressLogo)

        const billboard = new THREE.Mesh(
            new THREE.PlaneGeometry(3, 1.9, 1,1),
            new THREE.MeshBasicMaterial({map: this.textures.billboardTexture,transparent: true})
        )
        billboard.position.set(-25.9, 1.45, 25.03)
        billboard.rotation.y =1.3
        this.scene.add(billboard)



        
    }
}