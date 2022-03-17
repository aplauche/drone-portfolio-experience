import * as THREE from 'three'
import {gsap} from 'gsap'
import Experience from "../Experience";

import JoyStick from './joy'



export default class Controls {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.drone = this.experience.drone
        this.droneGroup = this.drone.droneGroup
        this.camera = this.experience.camera.cameraInstance

        this.keyState = {
            up: false,
            down: false,
            right: false,
            left: false
        }

        this.usingJoystick = false
        this.usingKeyboard = true

        this.joy = new JoyStick('joyDiv', {
            internalFillColor: 'rgba(128,102,77,0.25)',
            internalStrokeColor: 'rgba(128,102,77,0.85)',
            externalStrokeColor: 'rgba(128,102,77,0.85)' 
        });

        this.xCurrent = this.droneGroup.position.x
        this.zCurrent = this.droneGroup.position.z
        this.xTarget = this.droneGroup.position.x
        this.zTarget = this.droneGroup.position.z

        this.xCamTarget = this.camera.position.x
        this.zCamTarget = this.camera.position.z
        this.xCamCurrent = this.camera.position.x
        this.zCamCurrent = this.camera.position.z

        document.getElementById('joyDiv').addEventListener('mousedown', () => {
            if(!this.usingJoystick){
                this.usingJoystick = true
                this.usingKeyboard = false
            }
        
        })
        document.getElementById('joyDiv').addEventListener('touchstart', () => {
            if(!this.usingJoystick){
                this.usingJoystick = true
                this.usingKeyboard = false
            }
        
        })

        this.initKeyboardControls()
 
    }

    initKeyboardControls = () => {

        document.addEventListener("keydown", this.onDocumentKeyDown.bind(this), false);
        document.addEventListener("keyup", this.onDocumentKeyUp.bind(this), false);
    
    }

    onDocumentKeyDown(event) {
    
        if(this.usingJoystick){
            this.usingJoystick = false
            this.usingKeyboard = true
        }

        if(this.drone.compassVisible){
            this.drone.compassVisible = false
            gsap.to(this.drone.droneCompassLabels.scale, {y: 0})
            gsap.to(this.drone.droneCompass.scale, {x: 0, z: 0, y:0})
        }

        var keyCode = event.which;
            // up
        if (keyCode == 38) {
            this.keyState.up = true
            gsap.to(this.droneGroup.rotation, {x:-0.25})
            // down
        } else if (keyCode == 40) {
            this.keyState.down = true
            gsap.to(this.droneGroup.rotation, {x:0.25})
            // left
        } else if (keyCode == 37) {
            this.keyState.left = true
            gsap.to(this.droneGroup.rotation, {z:0.25})
            // right
        } else if (keyCode == 39) {
            this.keyState.right = true
            gsap.to(this.droneGroup.rotation, {z:-0.25})
        }
    }

    onDocumentKeyUp(event) {
        var keyCode = event.which;
            // up
        if (keyCode == 38) {
            this.keyState.up = false
            gsap.to(this.droneGroup.rotation, {x:0})
            // down
        } else if (keyCode == 40) {
            this.keyState.down = false
            gsap.to(this.droneGroup.rotation, {x:0})
            // left
        } else if (keyCode == 37) {
            this.keyState.left = false
            gsap.to(this.droneGroup.rotation, {z:0})
            // right
        } else if (keyCode == 39) {
            this.keyState.right = false
            gsap.to(this.droneGroup.rotation, {z:0})
        }
    }

    handleJoystick = (dir) => {

        if(this.drone.compassVisible){
            this.drone.compassVisible = false
            gsap.to(this.drone.droneCompassLabels.scale, {y: 0})
            gsap.to(this.drone.droneCompass.scale, {x: 0, z: 0, y:0})
        }
    
        this.keyState.down = false
        this.keyState.left = false
        this.keyState.up = false
        this.keyState.right = false
    
        if(dir.includes('N')){
            this.keyState.up = true;
            gsap.to(this.drone.droneGroup.rotation, {x:-0.25})
        }
        if(dir.includes('S')){
            this.keyState.down = true
            gsap.to(this.drone.droneGroup.rotation, {x:0.25})
        }
        if(dir.includes('W')){
            this.keyState.left = true
                gsap.to(this.drone.droneGroup.rotation, {z:0.25})
        }
        if(dir.includes('E')){
            this.keyState.right = true
                gsap.to(this.drone.droneGroup.rotation, {z:-0.25})
        }
        if(dir.includes('C')){
            gsap.to(this.drone.droneGroup.rotation, {z: 0, x: 0})
        }
    }

    update(){

        if(this.usingJoystick){
            this.handleJoystick(this.joy.GetDir())
        }

        var speed = 0.08;
    
        var ease = 0.06
        var camEase = 0.02
    
        if ( this.keyState.left ){
            this.xTarget -= speed ;
            this.xCamTarget -= speed ;
        }
        
        if ( this.keyState.right ){
            this.xTarget += speed;
            this.xCamTarget += speed;
        }
        if ( this.keyState.up ){
            this.zTarget -= speed ;
            this.zCamTarget -= speed ;
        }
        
        if ( this.keyState.down ){
            this.zTarget += speed;
            this.zCamTarget += speed;
        }
    
        this.xCurrent += (this.xTarget - this.xCurrent) * ease
        this.xCamCurrent += (this.xCamTarget - this.xCamCurrent) * camEase 
        this.zCurrent += (this.zTarget - this.zCurrent) * ease
        this.zCamCurrent += (this.zCamTarget - this.zCamCurrent) * camEase
        this.droneGroup.position.x = this.xCurrent
        this.droneGroup.position.z = this.zCurrent
        this.camera.position.z = this.zCamCurrent
        this.camera.position.x = this.xCamCurrent
    
        this.drone.droneShadow.position.x = this.droneGroup.position.x
        this.drone.droneShadow.position.z = this.droneGroup.position.z
    
    }


}