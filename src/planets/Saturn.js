import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Ring, Html } from '@react-three/drei';
import * as THREE from 'three'

import Typewriter from 'typewriter-effect';
import Title from '../components/Title';

const Saturn = ({ position, select, setSelect }) => {
    const ref = useRef();
    const refRing = useRef();

    useFrame(() => {
        ref.current.rotation.y += 0.01;
        refRing.current.rotation.z += 0.005;
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
            position={position}
            onClick={(e) => setSelect(!select)}
        >
            <Sphere args={[1, 200, 200]} ref={ref}>
                <meshStandardMaterial 
                    map={textureSaturn}
                />
            </Sphere>
            <Ring scale='1.2' rotation={[1.8, 0, 0]} args={[1, 1.6, 200]} ref={refRing}>
                <meshStandardMaterial map={textureSaturnRings} side={THREE.DoubleSide} />
            </Ring>

            {select && 
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