import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three'

import defaultCamera from '../defaultCamera';

import Typewriter from 'typewriter-effect';
import Title from '../components/Title';

const Sun = (props) => {
    const dummy = new THREE.Vector3();
    const lookAtPos = new THREE.Vector3();
    const ref = useRef();
    // rotate
    useFrame(() => (ref.current.rotation.y += 0.002));

    const [selectSun, setSelectSun] = useState(false);
    
    useFrame((state, delta) => {
        const step = defaultCamera.step;
        
        if (selectSun) {
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, selectSun ? 6 : 45, step);
        state.camera.position.lerp(dummy.set(selectSun ? 25 : 10, selectSun ? 1 : 5, selectSun ? 0 : 10), step);
        
        state.camera.filmOffset = THREE.MathUtils.lerp(state.camera.filmOffset, selectSun ? -5 : 0, step);

        lookAtPos.x = 0;
        //lookAtPos.z = selectSun ? -2 : 0;

        state.camera.lookAt(lookAtPos);
        state.camera.updateProjectionMatrix();
        }
    });

    const textureSun = useLoader(
        THREE.TextureLoader,
        '/textures/sun_texture.jpg'
    );

    return (
        <mesh
            {...props}
            ref={ref}
            onClick={(e) => setSelectSun(!selectSun)}
        >
            <Sphere args={[1, 200, 200]} scale={1.2}>
                <meshStandardMaterial 
                    attach='material'
                    map={textureSun}
                />
            </Sphere>

            {selectSun && 
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

export default Sun;