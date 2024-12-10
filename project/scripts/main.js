import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';
import { updateDisplay } from './display.js';

// Three.jsのセットアップ
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 600 / 350, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threeCanvas') });
renderer.setSize(600, 350);
renderer.shadowMap.enabled = true; // 影を有効化

// 地面の作成
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0x555555,
    metalness: 0.8, 
    roughness: 0.1, 
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true; // 地面が影を受け取る
scene.add(plane);

// ボールの作成
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    metalness: 0.8,  // 高い金属感
    roughness: 0.1,  // 滑らかで光沢のある表面
});
const ball = new THREE.Mesh(sphereGeometry, sphereMaterial);
ball.position.set(0, 1, 0);
ball.castShadow = true; // ボールが影を生成する
scene.add(ball);

// スポットライトの追加
const spotLight = new THREE.SpotLight(0xffffff, 10); // 強度を調整
spotLight.position.set(5, 10, 5);
spotLight.castShadow = true;
scene.add(spotLight);

// 環境光の追加
const ambientLight = new THREE.AmbientLight(0xffffff, 3); // 環境光を少し控えめに
scene.add(ambientLight);

// カメラの位置
camera.position.set(5, 5, 10);
camera.lookAt(0, 0, 0);

// シミュレーションパラメータ
let t = 0; // 時間
const g = 9.8;
const v0 = 10;
const angle = Math.PI / 4; // 45度
const velocity = {
    x: v0 * Math.cos(angle),
    y: v0 * Math.sin(angle),
    z: 0
};

// アニメーションループ
function animate() {
    t += 0.015;

    // ボールの位置を更新
    ball.position.x = velocity.x * t;
    ball.position.y = velocity.y * t - 0.5 * g * t ** 2;

    // 地面に到達したらリセット
    if (ball.position.y < 0) {
        t = 0;
        ball.position.set(0, 1, 0);
    }

    // Three.jsのレンダリング
    renderer.render(scene, camera);

    // データ表示を更新
    updateDisplay(ball.position.x, ball.position.y, t);

    requestAnimationFrame(animate);
}
animate();
