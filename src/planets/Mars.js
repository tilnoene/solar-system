import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three'

import Typewriter from 'typewriter-effect';
import Title from '../components/Title';

const Mars = ({ position, select, setSelect }) => {
    const ref = useRef();

    useFrame(() => (ref.current.rotation.y += 0.002));

    const textureMars = useLoader(
        THREE.TextureLoader,
        '/textures/mars_texture.jpg'
    );

    return (
        <mesh
            ref={ref}
            position={position}
            onClick={(e) => setSelect(!select)}
        >
            <Sphere args={[1, 200, 200]} scale={0.7}>
                <meshStandardMaterial 
                    attach='material'
                    map={textureMars}
                />
            </Sphere>

            <Html distanceFactor={10}>
                <Title translateY='9vh'>
                    <Typewriter
                        options={{
                            strings: ['Ruby', 'Marte'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </Title>
            </Html>

            {select && 
                <Html
                    as='div'
                    distanceFactor={10}
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
                                    strings: ['Marte'],
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

export default Mars;