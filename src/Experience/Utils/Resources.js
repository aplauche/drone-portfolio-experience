import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from "../Utils/EventEmitter";
import {gsap} from 'gsap'

export default class Resources extends EventEmitter {
    constructor(){
        super()

        this.items = {}
        this.materials = {}
        this.models = {}
        this.loaded = false
        this.loadScreen = document.querySelector('.loading')

        this.loadingManager = new THREE.LoadingManager(
            (load)=>{
                gsap.to('.loading-status', {opacity: 0, duration: 0.5})
                gsap.to(this.loadScreen, {opacity: 0, duration: 3})
                this.loaded = true
            },
            (urlOfAsset, numLoaded, total)=>{
                const percent = Math.round((numLoaded/total) * 100)
                this.loadScreen.querySelector('.loading-status').innerHTML = `Loading: ${percent}%`
            },
            (error)=>{
                console.log('error with loading assets' + error)
            },
        )

        this.setupLoaders()
        this.load()
        this.createMaterials()
    }

    setupLoaders(){
        this.loaders = {}
        this.gltfLoader = new GLTFLoader()
        this.textureLoader = new THREE.TextureLoader(this.loadingManager)
    }

    load(){
        this.items.perceptoLogoTexture = this.textureLoader.load('/logos/percepto-logo.png')
        this.items.perceptoLogoTexture.encoding = THREE.sRGBEncoding
        this.items.korovaLogoTexture = this.textureLoader.load('/logos/korova-logo.png')
        this.items.korovaLogoTexture.encoding = THREE.sRGBEncoding
        this.items.worldviewLogoTexture = this.textureLoader.load('/logos/worldview-logo.png')
        this.items.worldviewLogoTexture.encoding = THREE.sRGBEncoding
        this.items.teslasuitLogoTexture = this.textureLoader.load('/logos/teslasuit-logo.png')
        this.items.teslasuitLogoTexture.encoding = THREE.sRGBEncoding

        this.items.wordpressLogoTexture = this.textureLoader.load('/logos/wordpress-logo.png')
        this.items.wordpressLogoTexture.encoding = THREE.sRGBEncoding
        this.items.billboardTexture = this.textureLoader.load('/logos/billboard.jpg')
        this.items.billboardTexture.encoding = THREE.sRGBEncoding


        this.items.treeTexture = this.textureLoader.load('/matcaps/tree.png')
        this.items.treeTexture.encoding = THREE.sRGBEncoding
        this.items.rockTexture = this.textureLoader.load('/matcaps/rock.png')
        this.items.rockTexture.encoding = THREE.sRGBEncoding
        this.items.stuccoTexture = this.textureLoader.load('/matcaps/stucco.png')
        this.items.stuccoTexture.encoding = THREE.sRGBEncoding

        this.items.redRockTexture = this.textureLoader.load('/matcaps/red-rock.png')
        this.items.redRockTexture.encoding = THREE.sRGBEncoding



        this.items.droneShadowTexture = this.textureLoader.load('/media/drone-shadow.png')
        this.items.droneShadowTexture.encoding = THREE.sRGBEncoding

        this.items.droneCompassTexture = this.textureLoader.load('/media/drone-compass.png')
        this.items.droneCompassTexture.encoding = THREE.sRGBEncoding
        this.items.clientLabelTexture = this.textureLoader.load('/media/client-label.png')
        this.items.clientLabelTexture.encoding = THREE.sRGBEncoding
        this.items.personalLabelTexture = this.textureLoader.load('/media/personal-label.png')
        this.items.personalLabelTexture.encoding = THREE.sRGBEncoding
        this.items.contactLabelTexture = this.textureLoader.load('/media/contact-label.png')
        this.items.contactLabelTexture.encoding = THREE.sRGBEncoding
        this.items.interestsLabelTexture = this.textureLoader.load('/media/interests-label.png')
        this.items.interestsLabelTexture.encoding = THREE.sRGBEncoding

        this.items.borderTexture = this.textureLoader.load('/media/border.png')
        this.items.borderTexture.encoding = THREE.sRGBEncoding
        this.items.borderTexture.offset.y = -0.1
        this.items.borderTexture.wrapS = THREE.RepeatWrapping
        this.items.borderTexture.repeat.x = 6

        this.items.bakedDroneTexture = this.textureLoader.load('drone-texture-final.jpg')
        this.items.bakedMainTexture = this.textureLoader.load('baked-8k-bright.jpg')

        this.items.bakedDroneTexture.flipY = false
        this.items.bakedMainTexture.flipY = false
        this.items.bakedDroneTexture.encoding = THREE.sRGBEncoding
        this.items.bakedMainTexture.encoding = THREE.sRGBEncoding
        this.items.bakedMainTexture.minFilter = THREE.NearestFilter

    }

    createMaterials(){
        this.materials.treeMaterial = new THREE.MeshMatcapMaterial({matcap: this.items.treeTexture})
        this.materials.rockMaterial = new THREE.MeshMatcapMaterial({matcap: this.items.rockTexture})
        this.materials.redRockMaterial = new THREE.MeshMatcapMaterial({matcap: this.items.redRockTexture})
        this.materials.stuccoMaterial = new THREE.MeshMatcapMaterial({matcap: this.items.stuccoTexture})


        this.materials.borderMaterials = [
            new THREE.MeshBasicMaterial({map: this.items.borderTexture, transparent: true, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: this.items.borderTexture, transparent: true, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: this.items.borderTexture, transparent: true, side: THREE.DoubleSide, visible: false}),
            new THREE.MeshBasicMaterial({map: this.items.borderTexture, transparent: true, side: THREE.DoubleSide, visible: false}),
            new THREE.MeshBasicMaterial({map: this.items.borderTexture, transparent: true, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: this.items.borderTexture, transparent: true, side: THREE.DoubleSide})
        ]

        this.materials.bakedDroneMaterial = new THREE.MeshBasicMaterial({map: this.items.bakedDroneTexture})
        this.materials.bakedMainMaterial = new THREE.MeshBasicMaterial({map: this.items.bakedMainTexture})
    }
}