import * as THREE from 'three'

import {gsap} from 'gsap'



import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Drone from './World/Drone.js'
import Controls from './World/Controls.js'
import Resources from './Utils/Resources.js'
import Targets from './Utils/Targets.js'
import BuildingLogos from './Utils/BuildingLogos.js'
import SignalStrength from './Utils/SignalStrength.js'
import RayCaster from './Utils/RayCaster.js'



// turn into a singleton
let instance = null

export default class Experience {
    constructor(canvas){

        if(instance){
            return instance
        }

        instance = this

        // global access
        window.experience = this

        this.droneLoaded = false
        this.lockControls = true

        // props
        this.canvas = canvas

        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources()
        this.targets = new Targets()
        this.signal = new SignalStrength()
        this.buildingLogos = new BuildingLogos()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.drone = new Drone()

        this.raycaster = new RayCaster()

        // events
        this.sizes.on('resize', this.resize.bind(this))
        this.time.on('tick', this.tick.bind(this))

        this.introAnimation()
    }

    introAnimation(){
        const introTl = gsap.timeline()

        introTl
            .set(this.drone.droneGroup.position, {y: 0.25})
            .to(this.drone.droneGroup.position, {y: 8, duration: 2})
            .to(this.drone.droneShadow.scale, { x: 1, z:1, duration: 2}, '-=2')
            .to(this.drone.droneCompass.scale, {x: 1, z: 1, y: 1, duration: 1}, '-=0.75')
            .from(this.drone.droneCompassLabels.scale, {y: 0, duration: 1}, '-=0.5')
            .add(() => {
                this.lockControls = false
                this.controls = new Controls()
            })
            .to('.instructions', {opacity: 0, delay: 3})
    }

    resize(){
        console.log('resize triggered');
        this.camera.resizeCamera()
        this.renderer.resize()
    }

    tick(){
        console.log('tick occured');
        // this.camera.updateControls()
        // this.world.update()
        this.resources.items.borderTexture.offset.x = this.time.elapsed
        this.renderer.update()
        this.drone.update()
        if(this.lockControls == false){
            this.controls.update()
        }
        this.signal.update()
        this.raycaster.update()

    }

    // destroy(){
    //     this.sizes.off('resize')
    //     this.time.off('tick')

    //     // traverse the whole scene
    //     this.scene.traverse(child => {

    //         if(child instanceof THREE.Mesh){

    //             // get rid of geometries
    //             child.geometry.dispose()

    //             // go through each material item and check if the subitem has a dispose method
    //             for(const key in child.material){
    //                 const value = child.material[key]

    //                 if(value && typeof value.dispose === 'function'){
    //                     value.dispose()
    //                 }
    //             }
    //         }

    //     })

    //     this.camera.controls.dispose()
    //     this.renderer.instance.dispose()
        
    //     if(this.debug.active){
    //         this.debug.ui.destroy()
    //     }
    // }
}