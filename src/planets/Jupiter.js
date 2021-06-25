import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three'

import defaultCamera from '../defaultCamera';

import Typewriter from 'typewriter-effect';
import Title from '../components/Title';

const Jupiter = (props) => {
    const dummy = new THREE.Vector3();
    const lookAtPos = new THREE.Vector3();
    const ref = useRef();
    // rotate
    useFrame(() => (ref.current.rotation.y += 0.002));

    const [selectJupiter, setSelectJupiter] = useState(false);

    
    useFrame((state, delta) => {
        const step = defaultCamera.step;
        if (selectJupiter) {
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, selectJupiter ? 45 : defaultCamera.fov, step);
        state.camera.position.lerp(dummy.set(selectJupiter ? 25 : defaultCamera.position.x, selectJupiter ? 1 : defaultCamera.position.y, selectJupiter ? 0 : defaultCamera.position.z), step);
        
        state.camera.filmOffset = THREE.MathUtils.lerp(state.camera.filmOffset, selectJupiter ? -5 : 0, step);

        lookAtPos.x = 0;
        //lookAtPos.z = selectJupiter ? -2 : 0;

        state.camera.lookAt(lookAtPos);
        state.camera.updateProjectionMatrix();
        }
    });

    const textureJupiter = useLoader(
        THREE.TextureLoader,
        '/textures/jupiter_texture.jpg'
    );

    return (
        <mesh
            {...props}
            ref={ref}
            onClick={(e) => setSelectJupiter(!selectJupiter)}
        >
            <Sphere args={[1, 200, 200]} scale={1.2}>
                <meshStandardMaterial 
                    attach='material'
                    map={textureJupiter}
                />
            </Sphere>

            {selectJupiter && 
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

export default Jupiter;