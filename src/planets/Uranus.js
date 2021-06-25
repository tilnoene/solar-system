import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Ring, Html } from '@react-three/drei';
import * as THREE from 'three'

import defaultCamera from '../defaultCamera';

import Typewriter from 'typewriter-effect';
import Title from '../components/Title';

const Uranus = (props) => {
    const dummy = new THREE.Vector3();
    const lookAtPos = new THREE.Vector3();
    const ref = useRef();
    // rotate
    useFrame(() => (ref.current.rotation.y += 0.01));

    const [selectUranus, setSelectUranus] = useState(false);

    useFrame((state, delta) => {
        const step = defaultCamera.step;
        if (selectUranus) {
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, selectUranus ? 6 : 100, step);
        state.camera.position.lerp(dummy.set(selectUranus ? 25 : 10, selectUranus ? 1 : 5, selectUranus ? 0 : 10), step);
        
        state.camera.filmOffset = THREE.MathUtils.lerp(state.camera.filmOffset, selectUranus ? -5 : 0, step);

        lookAtPos.x = 0;
        //lookAtPos.z = selectUranus ? -2 : 0;

        state.camera.lookAt(lookAtPos);
        state.camera.updateProjectionMatrix();
        }
    });

    const textureUranus = useLoader(
        THREE.TextureLoader,
        '/textures/uranus_texture.jpg'
    );

    return (
        <mesh
            {...props}
            ref={ref}
            onClick={(e) => setSelectUranus(!selectUranus)}
        >
            <Sphere args={[1, 200, 200]}>
                <meshStandardMaterial 
                    map={textureUranus}
                />
            </Sphere>
            <Ring scale={1.4} rotation={[-0.4, 0, 0]} args={[1, 1.1, 200]}>
                <meshStandardMaterial attach='material' color='#83a5eb' side={THREE.DoubleSide} />
            </Ring>

            {selectUranus && 
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
                                strings: ['Uranus'],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </Title>
            </Html>}
        </mesh>
    );
}

export default Uranus;