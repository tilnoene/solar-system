import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Ring, Html } from '@react-three/drei';
import * as THREE from 'three'

import Typewriter from 'typewriter-effect';
import Title from '../components/Title';

const Uranus = ({ position, select, setSelect }) => {
    const ref = useRef();

    useFrame(() => (ref.current.rotation.y += 0.01));

    const textureUranus = useLoader(
        THREE.TextureLoader,
        '/textures/uranus_texture.jpg'
    );

    return (
        <mesh
            ref={ref}
            position={position}
            onClick={(e) => setSelect(!select)}
        >
            <Sphere args={[1, 200, 200]}>
                <meshStandardMaterial 
                    map={textureUranus}
                />
            </Sphere>
            <Ring scale={1.4} rotation={[-0.4, 0, 0]} args={[1, 1.1, 200]}>
                <meshStandardMaterial attach='material' color='#83a5eb' side={THREE.DoubleSide} />
            </Ring>

            {select && 
            <Html
                as='div'
                distanceFactor={12}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "55px",
                }}
                >
                    <Title>
                        <Typewriter
                            options={{
                                strings: ['Uranus'],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </Title>
            </Html>}
        </mesh>
    );
}

export default Uranus;