import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three'

import defaultCamera from '../defaultCamera';

import Typewriter from 'typewriter-effect';
import Title from '../components/Title';

const Pluto = (props) => {
    const dummy = new THREE.Vector3();
    const lookAtPos = new THREE.Vector3();
    const ref = useRef();
    // rotate
    useFrame(() => (ref.current.rotation.y += 0.01));

    const [selectPluto, setSelectPluto] = useState(false);

    useFrame((state, delta) => {
        const step = defaultCamera.step;
        if (selectPluto) {

        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, selectPluto ? 6 : 100, step);
        state.camera.position.lerp(dummy.set(selectPluto ? 25 : 10, selectPluto ? 1 : 5, selectPluto ? 0 : 10), step);
        
        state.camera.filmOffset = THREE.MathUtils.lerp(state.camera.filmOffset, selectPluto ? -5 : 0, step);

        lookAtPos.x = 0;

        state.camera.lookAt(lookAtPos);
        state.camera.updateProjectionMatrix();
        }
    });

    const texturePluto = useLoader(
        THREE.TextureLoader,
        '/textures/pluto_texture.jpg'
    );

    return (
        <mesh
            {...props}
            ref={ref}
            onClick={(e) => setSelectPluto(!selectPluto)}
        >
            <Sphere args={[1, 200, 200]} scale={0.4}>
                <meshStandardMaterial 
                    map={texturePluto}
                />
            </Sphere>

            {selectPluto && 
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
                                    strings: ['Plutão'],
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

export default Pluto;