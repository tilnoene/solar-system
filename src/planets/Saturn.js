import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Ring, Html } from '@react-three/drei';
import * as THREE from 'three'

import defaultCamera from '../defaultCamera';

import Typewriter from 'typewriter-effect';
import Title from '../components/Title';

const Saturn = () => {
    const dummy = new THREE.Vector3();
    const lookAtPos = new THREE.Vector3();
    const ref = useRef();
    // rotate
    useFrame(() => (ref.current.rotation.y += 0.01));

    const [selectSaturn, setSelectSaturn] = useState(false);

    useFrame((state, delta) => {
        const step = defaultCamera.step;

        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, selectSaturn ? 6 : 42, step);
        state.camera.position.lerp(dummy.set(selectSaturn ? 25 : 10, selectSaturn ? 1 : 5, selectSaturn ? 0 : 10), step);
        
        state.camera.filmOffset = THREE.MathUtils.lerp(state.camera.filmOffset, selectSaturn ? 2 : 0, step);

        lookAtPos.x = 0;
        //lookAtPos.z = selectSaturn ? -2 : 0;

        state.camera.lookAt(lookAtPos);
        state.camera.updateProjectionMatrix();
    });

    const textureSaturn = useLoader(
        THREE.TextureLoader,
        '/textures/saturn_texture.jpg'
    );

    const textureSaturnRings = useLoader(
        THREE.TextureLoader,
        '/textures/saturn_rings.png'
    );

    return (
        <mesh
        ref={ref}
        onClick={(e) => setSelectSaturn(!selectSaturn)}
        >
            <Sphere args={[1, 200, 200]}>
                <meshStandardMaterial 
                    map={textureSaturn}
                />
            </Sphere>
            <Ring scale='1.2' rotation={[1.7, 0, 0]} args={[1, 1.6, 200]}>
                <meshStandardMaterial map={textureSaturnRings} side={THREE.DoubleSide} />
            </Ring>

            {selectSaturn && 
            <Html
                as='div'
                distanceFactor={12}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: '55px',
                }}
                >
                    <Title>
                        <Typewriter
                            options={{
                                strings: ['Saturno'],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </Title>
            </Html>}
        </mesh>
    );
}

export default Saturn;