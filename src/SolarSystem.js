import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import Sun from './planets/Sun';
import Mercury from './planets/Mercury';
import Venus from './planets/Venus';
import Earth from './planets/Earth';
import Mars from './planets/Mars';
import Jupiter from './planets/Jupiter';
import Saturn from './planets/Saturn';
import Uranus from './planets/Uranus';
import Neptune from './planets/Neptune';
import Pluto from './planets/Pluto';

const gap = 3;
const EPS = 1;

const defaultCamera = {
    fov: 42,
    filmOffset: 0,
    position: {
        x: 18,
        y: 1,
        z: 18
    },
    rotation: {
        x: 0,
        y: 0,
        z: 0
    }
};

const SolarSystem = () => {
    const [selectSun, setSelectSun] = useState(false);
    const [selectMercury, setSelectMercury] = useState(false);
    const [selectVenus, setSelectVenus] = useState(false);
    const [selectEarth, setSelectEarth] = useState(false);
    const [selectMars, setSelectMars] = useState(false);
    const [selectJupiter, setSelectJupiter] = useState(false);
    const [selectSaturn, setSelectSaturn] = useState(false);
    const [selectUranus, setSelectUranus] = useState(false);
    const [selectNeptune, setSelectNeptune] = useState(false);
    const [selectPluto, setSelectPluto] = useState(false);
    const [myCamera, setMyCamera] = useState(defaultCamera);

    const handleSelectSun = () => {
        setSelectSun(!selectSun);

        if (selectSun) {
            setMyCamera(defaultCamera);
        } else {
            setMyCamera({
                fov: 45,
                filmOffset: 1,
                position: {
                    x: 1,
                    y: 1,
                    z: 1
                }
            });
        }
    }

    const handleSelectMercury = () => {
        setSelectMercury(!selectMercury);

        if (selectMercury) {
            myCamera = defaultCamera;
        } else {
            myCamera = {
                fov: 45,
                filmOffset: 1,
                position: {
                    x: 1,
                    y: 1,
                    z: 1
                }
            }
        }
    }

    const handleSelectEarth = () => {
        setSelectEarth(!selectEarth);

        if (selectEarth) {
            setMyCamera(defaultCamera);
        } else {
            setMyCamera({
                fov: 42,
                filmOffset: 140,
                position: {
                    x: 1.6,
                    y: 0.5,
                    z: 1.6
                }
            });
        }
    }

    const handleSelectJupiter = (selected) => {
        setSelectJupiter(selected);

        if (selectJupiter) {
            setMyCamera(defaultCamera);
        } else {
            setMyCamera({
                fov: 42,
                filmOffset: 0,
                position: {
                    x: 1.6,
                    y: 0.5,
                    z: 1.6
                },
                rotation: {
                    x: 0,
                    y: 0.8,
                    z: 0
                }
            });
        }
    }

    const handleSelectSaturn = (selected) => {
        setSelectSaturn(selected);

        if (selectSaturn) {
            setMyCamera(defaultCamera);
        } else {
            setMyCamera({
                fov: 42,
                filmOffset: 25,
                position: {
                    x: 1.6,
                    y: 0.5,
                    z: 1.6
                },
                rotation: {
                    x: 0,
                    y: 0.8,
                    z: 0
                }
            });
        }
    }

    // camera
    const vec = new THREE.Vector3();
    useFrame((state) => {
        const step = 0.1;
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, myCamera.fov, step);
        state.camera.position.lerp(vec.set(myCamera.position.x, myCamera.position.y, myCamera.position.z), step);
        state.camera.filmOffset = THREE.MathUtils.lerp(state.camera.filmOffset, myCamera.filmOffset, step);
        
        state.camera.lookAt(0, 0, 0);

        state.camera.updateProjectionMatrix();
        
        //light.current.position.lerp(vec.set(tempcam.x, tempcam.y, tempcam.z), step)
    })

    return (
        <group>
            <Sun position={[EPS + 3.6*gap, 0, -3.6*gap - EPS]} select={selectSun} setSelect={handleSelectSun} />
            <Mercury position={[EPS + 2.8*gap, 0, -2.8*gap - EPS]} select={selectMercury} setSelect={handleSelectMercury} />
            <Venus position={[EPS + 2.2*gap, 0, -2.2*gap - EPS]} select={selectVenus} setSelect={setSelectVenus} />
            <Earth position={[EPS + 1.5*gap, 0, -1.5*gap - EPS]} select={selectEarth} setSelect={handleSelectEarth} />
            <Mars position={[EPS + 0.8*gap, 0, -0.8*gap - EPS]} select={selectMars} setSelect={setSelectMars} />
            <Jupiter position={[-0.1*gap + EPS , 0, 0.1*gap - EPS]} select={selectJupiter} setSelect={handleSelectJupiter} />
            <Saturn position={[-1.3*gap + EPS, 0, 1.3*gap - EPS]} select={selectSaturn} setSelect={handleSelectSaturn} />
            <Uranus position={[-2.5*gap + EPS, 0, 2.5*gap - EPS]} select={selectUranus} setSelect={setSelectUranus} />
            <Neptune position={[-3.6*gap + EPS, 0, 3.6*gap - EPS]} select={selectNeptune} setSelect={setSelectNeptune} />
            <Pluto position={[-4.4*gap + EPS, 0, 4.4*gap - EPS]} select={selectPluto} setSelect={setSelectPluto} />
        </group>
    );
}

export default SolarSystem;