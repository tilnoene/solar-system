import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

import './styles.css';

import Sun from './planets/Sun';
import Mercury from './planets/Mercury';
import Venus from './planets/Venus';
import Earth from './planets/Earth';
import Mars from './planets/Mars';
import Jupiter from './planets/Jupiter';
import Saturn from './planets/Saturn';
import Uranus from './planets/Uranus';
import Neptune from './planets/Neptune';
import Pluto from './planets/Pluto';

const gap = 3;

ReactDOM.render(
    <Canvas>
        <OrbitControls 
            enablePan={false} 
            enableRotate={true} 
            autoRotate={false} 
        />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade />
        {/* <gridHelper /> */}

        <Suspense fallback={null}>
            <Sun position={[3.8*gap, 0, -3.8*gap]} />
            <Mercury position={[3*gap, 0, -3*gap]} />
            <Venus position={[2.4*gap, 0, -2.4*gap]} />
            <Earth position={[1.8*gap, 0, -1.8*gap]} />
            <Mars position={[1*gap, 0, -1*gap]} />
            <Jupiter position={[gap, 0, -gap]} />
            <Saturn position={[0, 0, 0]} />
            <Uranus position={[-gap, 0, gap]} />
            <Neptune position={[-2.3*gap, 0, 2.3*gap]} />
            <Pluto position={[-3*gap, 0, 3*gap]} />
        </Suspense>
    </Canvas>,
    document.getElementById('root')
)
