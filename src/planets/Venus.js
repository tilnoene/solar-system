import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three'

import defaultCamera from '../defaultCamera';

import Typewriter from 'typewriter-effect';
import Title from '../components/Title';

const Venus = (props) => {
    const dummy = new THREE.Vector3();
    const lookAtPos = new THREE.Vector3();
    const ref = useRef();
    // rotate
    useFrame(() => (ref.current.rotation.y += 0.01));

    const [selectVenus, setSelectVenus] = useState(false);
    
    useFrame((state, delta) => {
        const step = defaultCamera.step;
        if (selectVenus) {

        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, selectVenus ? 6 : 80, step);
        state.camera.position.lerp(dummy.set(selectVenus ? 25 : 10, selectVenus ? 1 : 5, selectVenus ? 0 : 10), step);
        
        state.camera.filmOffset = THREE.MathUtils.lerp(state.camera.filmOffset, selectVenus ? -5 : 0, step);

        lookAtPos.x = 0;
        //lookAtPos.z = selectVenus ? -2 : 0;

        state.camera.lookAt(lookAtPos);
        state.camera.updateProjectionMatrix();
        }
    });

    const textureVenus = useLoader(
        THREE.TextureLoader,
        '/textures/venus_texture.jpg'
    );

    return (
        <mesh
            {...props}
            ref={ref}
            onClick={(e) => setSelectVenus(!selectVenus)}
        >
            <Sphere args={[1, 200, 200]} scale={0.6} >
                <meshStandardMaterial 
                    map={textureVenus}
                />
            </Sphere>

            {selectVenus && 
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

export default Venus;