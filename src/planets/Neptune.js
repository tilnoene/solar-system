import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three'

import Typewriter from 'typewriter-effect';
import Title from '../components/Title';

const Neptune = ({ position, select, setSelect }) => {
    const ref = useRef();

    useFrame(() => (ref.current.rotation.y += 0.01));

    const textureNeptune = useLoader(
        THREE.TextureLoader,
        '/textures/neptune_texture.jpg'
    );

    return (
        <mesh
            ref={ref}
            position={position}
            onClick={(e) => setSelect(!select)}
        >
            <Sphere args={[1, 200, 200]}>
                <meshStandardMaterial 
                    map={textureNeptune}
                />
            </Sphere>

            <Html distanceFactor={10}>
                <Title translateY='14vh' >
                    <Typewriter
                        options={{
                            strings: ['CSS', 'Netuno'],
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
                                    strings: ['Netuno', 'matue está aqui'],
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

export default Neptune;