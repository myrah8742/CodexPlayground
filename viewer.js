async function init() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
  camera.position.set(0, -500, 300);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 0, 1000);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  const response = await fetch('kachess.tif'); // Provide GeoTIFF here
  const arrayBuffer = await response.arrayBuffer();
  const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
  const image = await tiff.getImage();
  const rasters = await image.readRasters();
  const data = rasters[0];

  const widthRaster = image.getWidth();
  const heightRaster = image.getHeight();
  const geometry = new THREE.PlaneGeometry(widthRaster, heightRaster, widthRaster - 1, heightRaster - 1);

  // Elevation scaling factor
  const scaleZ = 5;
  for (let i = 0; i < geometry.attributes.position.count; i++) {
    const z = data[i];
    geometry.attributes.position.setZ(i, z / scaleZ);
  }
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({ color: 0x99ccff, side: THREE.DoubleSide, wireframe: false });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotateX(-Math.PI / 2);
  scene.add(mesh);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}

init().catch(console.error);
