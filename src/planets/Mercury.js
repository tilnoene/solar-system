import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three'

import Typewriter from 'typewriter-effect';
import Title from '../components/Title';

const Mercury = ({ position, select, setSelect }) => {
    const ref = useRef();

    useFrame(() => (ref.current.rotation.y += 0.01));

    const textureMercury = useLoader(
        THREE.TextureLoader,
        '/textures/mercury_texture.jpg'
    );

    return (
        <mesh
            ref={ref}
            position={position}
            onClick={(e) => setSelect(!select)}
        >
            <Sphere args={[1, 200, 200]} scale={0.4} >
                <meshStandardMaterial 
                    map={textureMercury}
                />
            </Sphere>

            <Html distanceFactor={10}>
                <Title translateY='6.5vh' >
                    <Typewriter
                        options={{
                            strings: ['Scrum', 'Mercúrio'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </Title>
            </Html>

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
                                    strings: ['Netuno'],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </Title>
                </Html>
            }
        </mesh>
    );
}

export default Mercury;