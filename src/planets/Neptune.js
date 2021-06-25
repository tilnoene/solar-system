import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three'

import Typewriter from 'typewriter-effect';
import Title from '../components/Title';

const Neptune = (props) => {
    const dummy = new THREE.Vector3();
    const lookAtPos = new THREE.Vector3();
    const ref = useRef();
    // rotate
    useFrame(() => (ref.current.rotation.y += 0.01));

    const [selectNeptune, setSelectNeptune] = useState(false);
    
    useFrame((state, delta) => {
        const step = 0.1;

        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, selectNeptune ? 6 : 80, step);
        state.camera.position.lerp(dummy.set(selectNeptune ? 25 : 10, selectNeptune ? 1 : 5, selectNeptune ? 0 : 10), step);
        
        state.camera.filmOffset = THREE.MathUtils.lerp(state.camera.filmOffset, selectNeptune ? -5 : 0, step);

        lookAtPos.x = 0;
        //lookAtPos.z = selectNeptune ? -2 : 0;

        state.camera.lookAt(lookAtPos);
        state.camera.updateProjectionMatrix();
    });

    const textureNeptune = useLoader(
        THREE.TextureLoader,
        '/textures/neptune_texture.jpg'
    );

    return (
        <mesh
            {...props}
            ref={ref}
            onClick={(e) => setSelectNeptune(!selectNeptune)}
        >
            <Sphere args={[1, 200, 200]}>
                <meshStandardMaterial 
                    map={textureNeptune}
                />
            </Sphere>

            {selectNeptune && 
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

export default Neptune;