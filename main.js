const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const fontLoader = new THREE.FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  const keywords = [
    // キーワードと球面座標（方位角と仰角）をオブジェクトとして配列に追加
    { text: 'AI', phi: 0, theta: 0 },
    // 他のキーワードと球面座標もここに追加していく...
  ];

  const radius = 1;
  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  keywords.forEach(keyword => {
    const textGeometry = new THREE.TextGeometry(keyword.text, {
      font: font,
      size: 0.05,
      height: 0.01,
    });

    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    
    // 球面座標をXYZ座標に変換
    const xPos = radius * Math.sin(keyword.phi) * Math.cos(keyword.theta);
    const yPos = radius * Math.sin(keyword.phi) * Math.sin(keyword.theta);
    const zPos = radius * Math.cos(keyword.phi);

    textMesh.position.set(xPos, yPos, zPos);
    scene.add(textMesh);
  });
});

camera.position.z = 2;

const animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

animate();
