'use client';

import { Suspense, useEffect, useState } from 'react';
import { Object3D } from 'three';
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';

const Logo3D = () => {
  const loader = new GLTFLoader();
  // @ts-ignore
  const [models, setModels] = useState<[Object3D | null]>(null);
  useEffect(() => {
    // @ts-ignore
    loader.load('models/logo3D_cool.glb', async (gltf) => {
      // TODO: rename variables to to match data being loaded
      const loadedModels = await gltf.parser.getDependencies('scene');
      setModels(loadedModels);
    });
  });

  const renderModels =
    models &&
    models.map((model) => (
      // @ts-ignore
      // eslint-disable-next-line react/no-unknown-property
      <primitive key={model?.id} object={model} rotation={[0, -Math.PI / 2, 0]} />
    ));
  return (
    <div
      style={{ width: '100%', height: '400px', backgroundColor: '#121d36', marginBottom: '100px' }}
    >
      <Canvas camera={{ position: [0, -0.3, -3], near: 0.025 }}>
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
        <OrbitControls autoRotate autoRotateSpeed={5} />
        {/* <OrbitControls /> */}
        <Stats />
      </Canvas>
    </div>
  );
};

export default Logo3D;
