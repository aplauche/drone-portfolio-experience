import * as THREE from 'three'
import Experience from "../Experience";
import {gsap} from 'gsap'

export default class RayCaster {
    constructor(){        
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.currentTarget = null

        this.raycaster = new THREE.Raycaster()

        this.hud = document.querySelector(`.hud-info`)
        this.title = this.hud.querySelector('.title')
        this.description = this.hud.querySelector('.hud-description')
        this.body = this.hud.querySelector('.hud-body')
        this.skills = this.hud.querySelector('.hud-skills')
        this.vid = document.querySelector(`.hud-video`)

        this.targetHTMLContent = {
            percepto: {
                title: 'Percepto',
                body: 'Designed website and social media assets for autonomous drone solution that provides security and inspection services to critical infrastructure.',
                skills: 'Web Design / Social Strategy',
                media: `
                <video loop playsinline autoplay>
                <source src="/media/percepto.mp4" type="video/mp4">
                Your browser does not support the video tag.
                </video>
                `
            },
            silo: {
                title: 'Silo CMS',
                body: 'Built custom CMS on Node.js with MongoDB on the backend to allow for easy headless React setups without relying on a third party CMS.',
                skills: 'UI Design / Full Stack Development',
                media: `
                <video loop playsinline autoplay>
                <source src="/media/silo.mp4" type="video/mp4">
                Your browser does not support the video tag.
                </video>
                `
            },
            cw: {
                title: 'Chlorophyll Water',
                body: 'Created custom Shopify storefront, created photo and video assets for social media, managed SEO strategy, and created packaging and labels.',
                skills: 'Marketing / Web Design / Photo & Video / SEO',
                media: `
                <video loop playsinline autoplay>
                <source src="/media/cw.mp4" type="video/mp4">
                Your browser does not support the video tag.
                </video>
                `
            },
            worldview: {
                title: 'WorldView',
                body: 'Created branding guideline and UI kit for both the marketing website and product portal based on user research. Developed website with custom WordPress theme from scratch.',
                skills: 'UI Design / UX Research / WordPress Development',
                media: `
                <video loop playsinline autoplay>
                <source src="/media/worldview.mp4" type="video/mp4">
                Your browser does not support the video tag.
                </video>
                `
            },
            korova: {
                title: 'Korova Unrivaled',
                body: 'Designed website and interactions and created custom WordPress to bring the site to life with backend that allowed for easy product management.',
                skills: 'UI Design / Web Animation / WordPress Development',
                media: `
                <video loop playsinline autoplay>
                <source src="/media/korova.mp4" type="video/mp4">
                Your browser does not support the video tag.
                </video>
                `
            },
            teslasuit: {
                title: 'Teslasuit',
                body: 'Created style guide and designed updated website. Developed a custom wordpress theme to implement designs.',
                skills: 'UI Design / Branding / WordPress Development',
                media: `
                <video loop playsinline autoplay>
                <source src="/media/teslasuit.mp4" type="video/mp4">
                Your browser does not support the video tag.
                </video>
                `
            },
            headless: {
                title: 'Headless Static Sites',
                body: 'I am passionate about the possibilities of JAMstack and headless architecture and work with frameworks like Next.js and 11ty to create performant secure sites with easy to manage backends through a variety of content management systems.',
                skills: '',
                media: ``
            },
            contact: {
                title: 'Contact Me',
                body: `
                 Visit my website at antonplauche.com and drop a message to get in touch!
                `,
                skills: '',
                media: ``
            },
        }

    }

    updateRaycastTarget(newTarget){
        this.prevTarget = this.currentTarget
        this.currentTarget = newTarget
    
        if(this.currentTarget != null){
            this.title.innerHTML = this.targetHTMLContent[this.currentTarget.userData.customId].title
            this.description.innerHTML = this.targetHTMLContent[this.currentTarget.userData.customId].body
            this.skills.innerHTML = this.targetHTMLContent[this.currentTarget.userData.customId].skills
            this.vid.innerHTML = this.targetHTMLContent[this.currentTarget.userData.customId].media
            gsap.to(newTarget.scale, {y: 1, duration: 0.3})
            gsap.to(this.title, {scaleY: 1, duration: 0.3})
            gsap.to(this.body, {translateX: 0, duration: 0.3, delay: 0.1})
            if(this.currentTarget.userData.customId != 'contact' && this.currentTarget.userData.customId != 'headless'){
                gsap.to(this.vid, {scaleX: 1, duration: 0.25, delay: 0.2})
            }  
        } else {
            setTimeout(() => {
                gsap.to(this.prevTarget.scale, {y: 0.0001, duration: 0.3})
                gsap.to('.hud-info .title', {scaleY: 0, duration: 0.3})
                gsap.to('.hud-info .hud-body', {translateX: '-200%', duration: 0.3})
                gsap.to('.hud-video', {scaleX: 0, duration: 0.3})
            },50)
    
        }
        
    }
    

    update(){
        if(this.experience.resources.loaded){
            this.raycaster.set(this.experience.drone.droneGroup.position, new THREE.Vector3(0,-1,0))
    
            const intersects = this.raycaster.intersectObjects(this.experience.targets.casterTargets)
        
            if(intersects.length > 0 && this.currentTarget != intersects[0].object){
                console.log(intersects[0].object.userData.customId)
                this.updateRaycastTarget(intersects[0].object)
            } else if(intersects.length == 0 && this.currentTarget != null) {
                this.updateRaycastTarget(null)
                console.log('null')
            }
        }
    }
}