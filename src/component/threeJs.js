import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import bmw from '../img/bmw.glb'
import lamborghini1 from '../img/lamborghini1.glb'
import lamborghini2 from '../img/lamborghini2.glb'
import room from '../img/room.glb'

const ThreeJs = () => {
    //render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    document.body.innerHTML="";
    document.body.appendChild(renderer.domElement);

    //scene
    const scene = new THREE.Scene();

    //camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );
    camera.position.z = 10;
    camera.position.y = 1;
    camera.position.x = 1;
    camera.lookAt(5,5,5)
        scene.add(camera)

    // 중앙 빛
    const Light1 = new THREE.PointLight('white',20)
    Light1.position.set(0,3.5,0)
    // 오른쪽 빛
    const Light2 = new THREE.PointLight('white',20)
    Light2.position.set(5,3.5,1)
    // 왼쪽 빛
    const Light3 = new THREE.PointLight('white',20)
    Light3.position.set(-5,3.5,1.5)

    scene.add(Light1,Light2,Light3);


    //오르빗 컨트롤
    const controls = new OrbitControls( camera, renderer.domElement );
    const newTarget = new THREE.Vector3(0, 0, 3);
    controls.target.copy(newTarget);

    //room 불러옴
    const room3d = new GLTFLoader();
    room3d.load(room, (gltf)=>{
        const room = gltf.scene.children[0];
        room.position.z =2
        scene.add(room)
    })
    //bmw 불러옴
    const bmw3d = new GLTFLoader();
    bmw3d.load(bmw, (gltf)=>{
        const bmw1 = gltf.scene.children[0];
        bmw1.position.y = 0.1
        bmw1.rotation.z = 9.6
        scene.add(bmw1)
    })
    //오른쪽 lamborghini1 불러옴
    const lamborghini1_3d = new GLTFLoader();
    lamborghini1_3d.load(lamborghini1, (gltf)=>{
        const lamborghini1 = gltf.scene.children[0];
        lamborghini1.position.x =4
        lamborghini1.position.y = 0.1
        lamborghini1.position.z =2
        lamborghini1.rotation.z = 1
        scene.add(lamborghini1)
    })
    //왼쪽 lamborghini2 불러옴
    const lamborghini2_3d = new GLTFLoader();
    lamborghini2_3d.load(lamborghini2, (gltf)=>{
        const lamborghini2 = gltf.scene.children[0];
        lamborghini2.position.x = -6
        lamborghini2.position.z = 1.5
        lamborghini2.rotation.z = 1
        lamborghini2.scale.set(0.5, 0.5, 0.5);
        scene.add(lamborghini2)
    })

    //애니메이션
    const clock = new THREE.Clock();
    const animate = ()=>{
        // const time = clock.getElapsedTime();
        controls.update()
        renderer.render(scene,camera);
        renderer.setAnimationLoop(animate)
    }
    animate()

    renderer.render(scene, camera)

    window.addEventListener('resize', ()=>{
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene,camera);
    });
    return (
        <section></section>
      );
}
 
export default ThreeJs;