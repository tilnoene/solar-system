import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three'

import Typewriter from 'typewriter-effect';
import Title from '../components/Title';

const Earth = ({ position, select, setSelect, night=false }) => {
    const ref = useRef();

    useFrame(() => (ref.current.rotation.y += 0.002));

    const textureEarthDay = useLoader(
        THREE.TextureLoader,
        '/textures/earth_texture_day.jpg'
    );

    const textureEarthNight = useLoader(
        THREE.TextureLoader,
        '/textures/earth_texture_night.jpg'
    );

    return (
        <mesh
            ref={ref}
            position={position}
            onClick={(e) => setSelect(!select)}
        >
            <Sphere args={[1, 200, 200]} scale={0.8}>
                <meshStandardMaterial 
                    attach='material'
                    map={night ? textureEarthNight : textureEarthDay}
                />
            </Sphere>

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
                                    strings: ['Júpiter'],
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

export default Earth;