import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

import './styles.css';

import Loader from './Loader';
import SolarSystem from './SolarSystem';

ReactDOM.render(
    <Canvas>
        <OrbitControls 
            enablePan={false} 
            enableRotate={true}
            enableZoom={true} 
            autoRotate={false} 
        />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade />
        {/* <gridHelper /> */}

        <Suspense fallback={<Loader />}>
            <SolarSystem />
        </Suspense>
    </Canvas>,
    document.getElementById('root')
)
