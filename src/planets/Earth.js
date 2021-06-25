import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three'

import defaultCamera from '../defaultCamera';

import Typewriter from 'typewriter-effect';
import Title from '../components/Title';

const Earth = (props) => {
    const dummy = new THREE.Vector3();
    const lookAtPos = new THREE.Vector3();
    const ref = useRef();
    const night = false;

    // rotate
    useFrame(() => (ref.current.rotation.y += 0.002));

    const [selectEarth, setSelectEarth] = useState(false);

    useFrame((state, delta) => {
        const step = defaultCamera.step;

        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, selectEarth ? 45 : defaultCamera.fov, step);
        state.camera.position.lerp(dummy.set(selectEarth ? 25 : defaultCamera.position.z, selectEarth ? 1 : defaultCamera.position.z, selectEarth ? 0 : defaultCamera.position.z), step);
        
        state.camera.filmOffset = THREE.MathUtils.lerp(state.camera.filmOffset, selectEarth ? 400 : 0, step);

        lookAtPos.x = 0;
        //lookAtPos.z = selectEarth ? -2 : 0;

        state.camera.lookAt(lookAtPos);
        state.camera.updateProjectionMatrix();
    });

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
            {...props}
            ref={ref}
            onClick={(e) => setSelectEarth(!selectEarth)}
        >
            <Sphere args={[1, 200, 200]} scale={0.8}>
                <meshStandardMaterial 
                    attach='material'
                    map={night ? textureEarthNight : textureEarthDay}
                />
            </Sphere>

            {selectEarth && 
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