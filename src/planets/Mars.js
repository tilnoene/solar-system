import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three'

import defaultCamera from '../defaultCamera';

import Typewriter from 'typewriter-effect';
import Title from '../components/Title';

const Mars = (props) => {
    const dummy = new THREE.Vector3();
    const lookAtPos = new THREE.Vector3();
    const ref = useRef();
    // rotate
    useFrame(() => (ref.current.rotation.y += 0.002));

    const [selectMars, setSelectMars] = useState(false);

    useFrame((state, delta) => {
        const step = defaultCamera.step;
        
        if (selectMars) {
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, selectMars ? 6 : defaultCamera.fov, step);
        state.camera.position.lerp(dummy.set(selectMars ? 25 : defaultCamera.position.z, selectMars ? 1 : defaultCamera.position.z, selectMars ? 0 : defaultCamera.position.z), step);
        
        state.camera.filmOffset = THREE.MathUtils.lerp(state.camera.filmOffset, selectMars ? -5 : 0, step);

        lookAtPos.x = 0;
        //lookAtPos.z = selectMars ? -2 : 0;

        state.camera.lookAt(lookAtPos);
        state.camera.updateProjectionMatrix();
        }
    });

    const textureMars = useLoader(
        THREE.TextureLoader,
        '/textures/mars_texture.jpg'
    );

    return (
        <mesh
            {...props}
            ref={ref}
            onClick={(e) => setSelectMars(!selectMars)}
        >
            <Sphere args={[1, 200, 200]} scale={0.8}>
                <meshStandardMaterial 
                    attach='material'
                    map={textureMars}
                />
            </Sphere>

            {selectMars && 
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

export default Mars;