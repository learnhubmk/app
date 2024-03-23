'use client';

import { Suspense, useState } from 'react';
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Object3D } from 'three';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';

const Logo3D = () => {
  const loader = new GLTFLoader();
  // @ts-ignore
  const [models, setModels] = useState<[Object3D | null]>(null);
  // @ts-ignore
  loader.load('models/logo3d.glb', async (gltf) => {
    const loadedModels = await gltf.parser.getDependencies('node');
    setModels(loadedModels);
  });

  const renderModels =
    models &&
    models.map((model) => (
      // @ts-ignore
      // eslint-disable-next-line react/no-unknown-property
      <primitive object={model} />
    ));
  return (
    <div
      style={{ width: '100%', height: '400px', backgroundColor: '#121d36', marginBottom: '100px' }}
    >
      <Canvas camera={{ position: [0, 0, -0.8], near: 0.025 }}>
        <Suspense>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <ambientLight intensity={0.2} />
          {/* eslint-disable-next-line react/no-unknown-property */}
          <directionalLight position={[20, 0, 0]} intensity={1} />
          {/* eslint-disable-next-line react/no-unknown-property */}
          <directionalLight position={[-20, 0, 0]} intensity={1} />
          {renderModels && renderModels}
          {/* eslint-disable-next-line react/no-unknown-property */}
          <spotLight intensity={1} position={[0, 0, 0]} castShadow />
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={1} />
        <Stats />
      </Canvas>
    </div>
  );
};

export default Logo3D;
