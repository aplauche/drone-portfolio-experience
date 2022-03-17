import * as THREE from 'three'
import Experience from "../Experience";
import {gsap} from 'gsap'

export default class SignalStrength {
    constructor(){
       
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.textures = this.experience.resources.items
        this.materials = this.experience.resources.materials

        this.signalHTML = document.getElementById('signal-percent')
        this.staticNoise = document.getElementById('noise')

        this.lostSignal = false
    }

    update() {
        this.strength = 100 - Math.round(this.experience.drone.droneGroup.position.distanceTo(new THREE.Vector3(0,5,0)))
        this.signalHTML.innerHTML = this.strength
        if (this.strength < 2 && this.lostSignal == false){
            this.lostSignal = true
            gsap.to(this.staticNoise, {backgroundColor: '#000', duration: 0.2})
            setTimeout(()=>{
                this.experience.drone.resetDrone()
                this.staticNoise.classList.remove('active')
                this.lostSignal = false
                gsap.to(this.staticNoise, {backgroundColor: 'transparent', duration: 0})
            },2000)
            
        }
        else if(this.strength < 25 && this.strength >= 2 && !this.staticNoise.classList.contains('active')){
            this.staticNoise.classList.add('active')
        } else if (this.strength >= 25){
            this.staticNoise.classList.remove('active')  
        }
        
    }
}