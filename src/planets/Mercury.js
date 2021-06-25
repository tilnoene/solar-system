import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three'

import defaultCamera from '../defaultCamera';

import Typewriter from 'typewriter-effect';
import Title from '../components/Title';

const Mercury = (props) => {
    const dummy = new THREE.Vector3();
    const lookAtPos = new THREE.Vector3();
    const ref = useRef();
    // rotate
    useFrame(() => (ref.current.rotation.y += 0.01));

    const [selectMercury, setSelectMercury] = useState(false);
    
    useFrame((state, delta) => {
        const step = defaultCamera.step;

        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, selectMercury ? 6 : defaultCamera.fov, step);
        state.camera.position.lerp(dummy.set(selectMercury ? 25 : defaultCamera.position.z, selectMercury ? 1 : defaultCamera.position.z, selectMercury ? 0 : defaultCamera.position.z), step);
        
        state.camera.filmOffset = THREE.MathUtils.lerp(state.camera.filmOffset, selectMercury ? -5 : 0, step);

        lookAtPos.x = 0;
        //lookAtPos.z = selectMercury ? -2 : 0;

        state.camera.lookAt(lookAtPos);
        state.camera.updateProjectionMatrix();
    });

    const textureMercury = useLoader(
        THREE.TextureLoader,
        '/textures/mercury_texture.jpg'
    );

    return (
        <mesh
            {...props}
            ref={ref}
            onClick={(e) => setSelectMercury(!selectMercury)}
        >
            <Sphere args={[1, 200, 200]} scale={0.4} >
                <meshStandardMaterial 
                    map={textureMercury}
                />
            </Sphere>

            {selectMercury && 
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