import { Dimensions, View } from 'react-native';
import React, { useEffect, useRef } from "react";
import { GestureHandlerRootView, PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';

export default function App() {
    // NEW MUSICS (AI) ON THIRD MECHANIC
    // ADD EPIC SOUND FOR FIRST MECHANIC
    // ADD EPIC SOUND FOR SECOND MECHANIC
    // ADD START PRESENTATION
    // ADD TROYANO SCENE
    // Agregar imagen

    const fingerMovementBlockerRef = useRef({
        swipeUp: true,
        swipeDown: true,
        swipeLeft: true,
        swipeRight: true,
        tap: true
    });

    const carObstaclesSceneSoundRef = useRef(null);
    const shootingSceneSoundRef = useRef(null);

    const lailaPresentationRef = useRef(null);
    const firstFriendCallRef = useRef(null);
    const lailaSaysFirstObjetiveRef = useRef(null);
    const callEntranceEffectRef = useRef(null);

    const motorcyclesApproachingAlertRef = useRef(null);

    const lailaSaysNoMoreTrafficRef = useRef(null);
    const secondFriendCallRef = useRef(null);
    const lailaSaysPackageIsSecureRef = useRef(null);
    const dangerAlertRef = useRef(null);
    const lailaDetectsMotorcyclesRef = useRef(null);
    const lailaSaysWeAreSafeFromMotorcyclesRef = useRef(null);
    const thirdFriendCallRef = useRef(null);

    const presentation2Ref = useRef(null);
    const presentation3Ref = useRef(null);

    const dangerInRightRef = useRef(false);
    const dangerInLeftRef = useRef(false);

    const userMoveRightCorrectlyRef = useRef(false);
    const userMoveLeftCorrectlyRef = useRef(false);
    const userShootRightCorrectlyRef = useRef(false);
    const userShootLeftCorrectlyRef = useRef(false);

    const carHealthRef = useRef(100);

    const gameOverRef = useRef(false);

    const TIME_USER_HAS_TO_REACT = 4000;

    const SWIPE_THRESHOLD = 10;

    const steeringSoundRef = useRef(null);
    const leftWarningSoundRef = useRef(null);
    const rightWarningSoundRef = useRef(null);

    const leftShootWarningRef = useRef(null);
    const rightShootWarningRef = useRef(null);
    const leftShootSoundRef = useRef(null);
    const rightShootSoundRef = useRef(null);

    const bulletsEnemyReceivedLeftRef = useRef(0);
    const bulletsEnemyReceivedRightRef = useRef(0);

    const gunReloadSoundRef = useRef(null);

    const leftEnemyExplosionSoundRef = useRef(null);
    const rightEnemyExplosionSoundRef = useRef(null);

    const lighterSoundRef = useRef(null);
    const cigaretteSmokeSoundRef = useRef(null);
    const coughSoundRef = useRef(null);

    const howManyTimesUserSmokesCigaretteRef = useRef(0);

    const music1Ref = useRef(null);
    const music2Ref = useRef(null);
    const music3Ref = useRef(null);
    const changeMusicEffectRef = useRef(null);

    const mediumShieldsWarningRef = useRef(null);
    const criticalShieldsWarningRef = useRef(null);
    const noShieldsWarningRef = useRef(null);

    // Preload sounds
    useEffect(() => {
        async function preloadCarObstaclesSceneMusic() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/carObstaclesSceneMusic.mp3')
            );
            carObstaclesSceneSoundRef.current = sound;
        }

        async function preloadShootingSceneMusic() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/shootingSceneMusic.mp3')
            );
            shootingSceneSoundRef.current = sound;
        }

        async function preloadLailaPresentationSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/LailaPresentation.mp3')
            );
            lailaPresentationRef.current = sound;
        }

        async function preloadCallEntranceEffectSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/callEntranceEffect.wav')
            );
            callEntranceEffectRef.current = sound;
        }

        async function preloadFirstFriendCallSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/firstFriendCall.mp3')
            );
            firstFriendCallRef.current = sound;
        }

        async function preloadLailaSaysFirstObjetiveSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/LailaSaysFirstObjetive.mp3')
            );
            lailaSaysFirstObjetiveRef.current = sound;
        }

        async function preloadMotorcyclesApproachingSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/motorcyclesApproachingAlert.mp3')
            );
            motorcyclesApproachingAlertRef.current = sound;
        }

        async function preloadLailaSaysNoMoreTrafficSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/LailaSaysNoMoreTraffic.mp3')
            );
            lailaSaysNoMoreTrafficRef.current = sound;
        }

        async function preloadSecondFriendCallSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/secondFriendCall.mp3')
            );
            secondFriendCallRef.current = sound;
        }

        async function preloadLailaSaysPackageIsSecureSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/LailaSaysPackageIsSecure.mp3')
            );
            lailaSaysPackageIsSecureRef.current = sound;
        }

        async function preloadDangerAlert() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/dangerAlert.mp3')
            );
            dangerAlertRef.current = sound;
        }

        async function preloadLailaDetectsMotorcyclesSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/lailaDetectsMotorcycles.mp3')
            );
            lailaDetectsMotorcyclesRef.current = sound;
        }

        async function preloadLailaSaysWeAreSafeFromMotorcyclesSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/lailaSaysWeAreSafeFromMotorcycles.mp3')
            );
            lailaSaysWeAreSafeFromMotorcyclesRef.current = sound;
        }

        async function preloadThirdFriendCallSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/thirdFriendCall.mp3')
            );
            thirdFriendCallRef.current = sound;
        }

        async function preloadPresentation2Sound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/presentacion2.mp3')
            );
            presentation2Ref.current = sound;
        }

        async function preloadPresentation3Sound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/presentacion3.mp3')
            );
            presentation3Ref.current = sound;
        }
        async function preloadSteeringSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/carSteering.wav')
            );
            steeringSoundRef.current = sound;
        }

        async function preloadWarningLeftSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/warningLeft.mp3')
            );
            leftWarningSoundRef.current = sound;
        }

        async function preloadWarningRightSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/warningRight.mp3')
            );
            rightWarningSoundRef.current = sound;
        }

        async function preloadLeftWarningShoot() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/shootingWarningLeft.mp3')
            );
            leftShootWarningRef.current = sound;
        }

        async function preloadRightWarningShoot() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/shootingWarningRight.mp3')
            );
            rightShootWarningRef.current = sound;
        }

        async function preloadLeftShoot() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/leftShoot.mp3')
            );
            leftShootSoundRef.current = sound;
        }

        async function preloadRightShoot() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/rightShoot.mp3')
            );
            rightShootSoundRef.current = sound;
        }

        async function gunReload() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/gunReload.wav')
            );
            gunReloadSoundRef.current = sound;
        }

        async function leftEnemyExplosion() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/leftMotorcycleExplosion.mp3')
            );
            leftEnemyExplosionSoundRef.current = sound;
        }

        async function rightEnemyExplosion() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/rightMotorcycleExplosion.mp3')
            );
            rightEnemyExplosionSoundRef.current = sound;
        }

        async function preloadLighterSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/lighterSound.wav')
            );
            lighterSoundRef.current = sound;
        }

        async function preloadCigaretteSmokeSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/smokingSound.wav')
            );
            cigaretteSmokeSoundRef.current = sound;
        }

        async function preloadCoughSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/cough.wav')
            );
            coughSoundRef.current = sound;
        }

        async function preloadMusic1() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/music1.wav')
            );
            music1Ref.current = sound;
        }

        async function preloadMusic2() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/music2.wav')
            );
            music2Ref.current = sound;
        }

        async function preloadMusic3() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/music3.wav')
            );
            music3Ref.current = sound;
        }

        async function preloadChangeMusicEffect() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/changeMusicEffect.wav')
            );
            changeMusicEffectRef.current = sound;
        }

        async function preloadMediumShieldsWarning() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/mediumShieldsWarning.mp3')
            );
            mediumShieldsWarningRef.current = sound;
        }

        async function preloadCriticalShieldsWarning() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/criticalShieldsWarning.mp3')
            );
            criticalShieldsWarningRef.current = sound;
        }

        async function preloadNoShieldsWarning() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/noShieldsWarning.mp3')
            );
            noShieldsWarningRef.current = sound;
        }

        preloadCarObstaclesSceneMusic();
        preloadShootingSceneMusic();
        preloadLailaPresentationSound();
        preloadCallEntranceEffectSound();
        preloadFirstFriendCallSound();
        preloadLailaSaysFirstObjetiveSound();
        preloadMotorcyclesApproachingSound();
        preloadLailaSaysNoMoreTrafficSound();
        preloadSecondFriendCallSound();
        preloadLailaSaysPackageIsSecureSound();
        preloadDangerAlert();
        preloadLailaDetectsMotorcyclesSound();
        preloadLailaSaysWeAreSafeFromMotorcyclesSound();
        preloadThirdFriendCallSound();
        preloadPresentation2Sound();
        preloadPresentation3Sound();
        preloadSteeringSound();
        preloadWarningLeftSound();
        preloadWarningRightSound();
        preloadLeftWarningShoot();
        preloadRightWarningShoot();
        preloadLeftShoot();
        preloadRightShoot();
        gunReload();
        leftEnemyExplosion();
        rightEnemyExplosion();
        preloadLighterSound();
        preloadCigaretteSmokeSound();
        preloadCoughSound();
        preloadMusic1();
        preloadMusic2();
        preloadMusic3();
        preloadChangeMusicEffect();
        preloadMediumShieldsWarning();
        preloadCriticalShieldsWarning();
        preloadNoShieldsWarning();

        return () => {
            // Unload the sound from memory when component unmounts
            if (carObstaclesSceneSoundRef.current) {
                carObstaclesSceneSoundRef.current.unloadAsync();
            }

            if (shootingSceneSoundRef.current) {
                shootingSceneSoundRef.current.unloadAsync();
            }

            if (lailaPresentationRef.current) {
                lailaPresentationRef.current.unloadAsync();
            }

            if (callEntranceEffectRef.current) {
                callEntranceEffectRef.current.unloadAsync();
            }

            if (firstFriendCallRef.current) {
                firstFriendCallRef.current.unloadAsync();
            }

            if (lailaSaysFirstObjetiveRef.current) {
                lailaSaysFirstObjetiveRef.current.unloadAsync();
            }

            if (motorcyclesApproachingAlertRef.current) {
                motorcyclesApproachingAlertRef.current.unloadAsync();
            }

            if (lailaSaysNoMoreTrafficRef.current) {
                lailaSaysNoMoreTrafficRef.current.unloadAsync();
            }

            if (secondFriendCallRef.current) {
                secondFriendCallRef.current.unloadAsync();
            }

            if (lailaSaysPackageIsSecureRef.current) {
                lailaSaysPackageIsSecureRef.current.unloadAsync();
            }

            if (dangerAlertRef.current) {
                dangerAlertRef.current.unloadAsync();
            }

            if (lailaDetectsMotorcyclesRef.current) {
                lailaDetectsMotorcyclesRef.current.unloadAsync();
            }

            if (lailaSaysWeAreSafeFromMotorcyclesRef.current) {
                lailaSaysWeAreSafeFromMotorcyclesRef.current.unloadAsync();
            }

            if (thirdFriendCallRef.current) {
                thirdFriendCallRef.current.unloadAsync();
            }

            if (presentation2Ref.current) {
                presentation2Ref.current.unloadAsync();
            }

            if (presentation3Ref.current) {
                presentation3Ref.current.unloadAsync();
            }

            if (steeringSoundRef.current) {
                steeringSoundRef.current.unloadAsync();
            }

            if (leftWarningSoundRef.current) {
                leftWarningSoundRef.current.unloadAsync();
            }

            if (rightWarningSoundRef.current) {
                rightWarningSoundRef.current.unloadAsync();
            }

            if (leftShootSoundRef.current) {
                leftShootSoundRef.current.unloadAsync();
            }

            if (rightShootSoundRef.current) {
                rightShootSoundRef.current.unloadAsync();
            }

            if (leftShootWarningRef.current) {
                leftShootWarningRef.current.unloadAsync();
            }

            if (rightShootWarningRef.current) {
                rightShootWarningRef.current.unloadAsync();
            }

            if (gunReloadSoundRef.current) {
                gunReloadSoundRef.current.unloadAsync();
            }

            if (leftEnemyExplosionSoundRef.current) {
                leftEnemyExplosionSoundRef.current.unloadAsync();
            }

            if (rightEnemyExplosionSoundRef.current) {
                rightEnemyExplosionSoundRef.current.unloadAsync();
            }

            if (lighterSoundRef.current) {
                lighterSoundRef.current.unloadAsync();
            }

            if (cigaretteSmokeSoundRef.current) {
                cigaretteSmokeSoundRef.current.unloadAsync();
            }

            if (coughSoundRef.current) {
                coughSoundRef.current.unloadAsync();
            }

            if (music1Ref.current) {
                music1Ref.current.unloadAsync();
            }

            if (music2Ref.current) {
                music2Ref.current.unloadAsync();
            }

            if (music3Ref.current) {
                music3Ref.current.unloadAsync();
            }

            if (changeMusicEffectRef.current) {
                changeMusicEffectRef.current.unloadAsync();
            }
        };
    }, []);

    const screenWidth = Dimensions.get('window').width;
    const onHandlerStateChange = async event => {
        const { oldState, translationX, translationY, velocityX, velocityY } = event.nativeEvent;

        if (oldState === State.ACTIVE) {

            // Is the finger swiping enough?
            if (Math.abs(translationX) > SWIPE_THRESHOLD &&
                Math.abs(translationY) > SWIPE_THRESHOLD) {
                if (velocityX > 0 && !fingerMovementBlockerRef.current.swipeRight) {
                    await handleSteering('right');
                } else if (event.nativeEvent.velocityX < 0 && !fingerMovementBlockerRef.current.swipeLeft) {
                    await handleSteering('left');
                }

                if (velocityY > 0 && !fingerMovementBlockerRef.current.swipeDown) {
                    handleSwipeDown();
                } else if (velocityY < 0 && !fingerMovementBlockerRef.current.swipeUp) {
                    handleChangeMusic();
                }
            }
        }
    };

    const handleSteering = async (userSwipe) => {
        if (dangerInLeftRef.current === true) {
            dangerInLeftRef.current = false;

            if (userSwipe === 'right') {
                userMoveRightCorrectlyRef.current = true;
            }
            await steeringSoundRef.current.setPositionAsync(0);
            await steeringSoundRef.current.playAsync();
        }

        if (dangerInRightRef.current === true) {
            dangerInRightRef.current = false;

            if (userSwipe === 'left') {
                userMoveLeftCorrectlyRef.current = true;
            }
            await steeringSoundRef.current.setPositionAsync(0);
            await steeringSoundRef.current.playAsync();
        }
    }

        useEffect(() => {
            setTimeout(() => {
                callEntranceEffectRef.current.setPositionAsync(0);
                callEntranceEffectRef.current.playAsync();
            }, 80000);

            setTimeout(() => {
                firstFriendCallRef.current.setPositionAsync(0);
                firstFriendCallRef.current.playAsync();
            }, 80000 + 8000);

            setTimeout(() => {
                lailaPresentationRef.current.setPositionAsync(0);
                lailaPresentationRef.current.playAsync();
            }, 80000 + 8000 + 51000);

            setTimeout(() => {
                thirdMechanic();
            }, 80000 + 8000 + 51000 + 37000);

            setTimeout(async () => {
                endThirdMechanic();
                lailaSaysFirstObjetiveRef.current.setPositionAsync(0);
                lailaSaysFirstObjetiveRef.current.playAsync();
            }, 80000 + 8000 + 51000 + 37000 + 25000);

            setTimeout( () => {
                firstMechanic();
            }, 80000 + 8000 + 51000 + 37000 + 25000 + 21000);

        }, []);

    useEffect(() => {
        const carMoving = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/carMovingSound.wav')
            );

            await sound.setVolumeAsync(1);
            await sound.setIsLoopingAsync(true);
            await sound.playAsync();
        }

        carMoving();
    }, []);

    useEffect(() => {
        const gamePresentation = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/gamePresentation.mp3')
            );

            await sound.setVolumeAsync(1);
            await sound.playAsync();
        }

        gamePresentation();
    }, []);

    const handleTapGesture = async event => {
        if (event.nativeEvent.state === State.ACTIVE) {
            const tapX = event.nativeEvent.x;
            if (!fingerMovementBlockerRef.current.tap) {
                if (tapX < screenWidth / 2) {
                    await handleUserShoot('left');
                } else {
                    await handleUserShoot('right');
                }
            }
        }
    }

    const handleUserShoot = async (shootDirection) => {
        if (dangerInLeftRef.current === true) {
            if (shootDirection === 'left') {
                bulletsEnemyReceivedLeftRef.current = bulletsEnemyReceivedLeftRef.current + 1;
            }
        }

        if (dangerInRightRef.current === true) {
            if (shootDirection === 'right') {
                bulletsEnemyReceivedRightRef.current = bulletsEnemyReceivedRightRef.current + 1;
            }
        }

        if (shootDirection === 'left') {
            await leftShootSoundRef.current.setPositionAsync(0);
            await leftShootSoundRef.current.playAsync();

            await reload();
        }

        if (shootDirection === 'right') {
            await rightShootSoundRef.current.setPositionAsync(0);
            await rightShootSoundRef.current.playAsync();

            await reload();
        }
    }

    const reload = async () => {
        fingerMovementBlockerRef.current.tap = true;
        await gunReloadSoundRef.current.setPositionAsync(0);
        await gunReloadSoundRef.current.playAsync();

        setTimeout(() => {
            fingerMovementBlockerRef.current.tap = false;
        }, 1000);
    }

    const startSecuenceAfterFirstMechanic = async () => {
        await lailaSaysNoMoreTrafficRef.current.setPositionAsync(0);
        await lailaSaysNoMoreTrafficRef.current.playAsync();

        // ESCENA TROYANO

        setTimeout(async () => {
            await callEntranceEffectRef.current.setPositionAsync(0);
            await callEntranceEffectRef.current.playAsync();
        }, 12000);

        setTimeout(async () => {
            await secondFriendCallRef.current.setPositionAsync(0);
            await secondFriendCallRef.current.playAsync();
        }, 12000 + 8000);

        setTimeout(async () => {
            await lailaSaysPackageIsSecureRef.current.setPositionAsync(0);
            await lailaSaysPackageIsSecureRef.current.playAsync();
        }, 12000 + 8000 + 29000);

        setTimeout(() => {
            thirdMechanic();
        }, 12000 + 8000 + 29000 + 12000);

        setTimeout(async () => {
            endThirdMechanic();
            await dangerAlertRef.current.setPositionAsync(0);
            await dangerAlertRef.current.playAsync();
        }, 12000 + 8000 + 29000 + 12000 + 25000);

        setTimeout(async () => {
            await lailaDetectsMotorcyclesRef.current.setPositionAsync(0);
            await lailaDetectsMotorcyclesRef.current.playAsync();
        }, 12000 + 8000 + 29000 + 12000 + 45000 + 4000);

        setTimeout(async () => {
            await secondMechanic();
        }, 12000 + 8000 + 29000 + 12000 + 45000 + 4000 + 23000);
    }

    const startSecuenceAfterSecondMechanic = async () => {
        await lailaSaysWeAreSafeFromMotorcyclesRef.current.setPositionAsync(0);
        await lailaSaysWeAreSafeFromMotorcyclesRef.current.playAsync();

        setTimeout(async () => {
            callEntranceEffectRef.current.setPositionAsync(0);
            callEntranceEffectRef.current.playAsync();
        }, 17000);

        setTimeout(async () => {
            await thirdFriendCallRef.current.setPositionAsync(0);
            await thirdFriendCallRef.current.playAsync();
        }, 17000 + 8000);

    }

    const firstMechanic = () => {
        return new Promise((resolve) => {
            fingerMovementBlockerRef.current.swipeLeft = false;
            fingerMovementBlockerRef.current.swipeRight = false;

            carObstaclesSceneSoundRef.current.setPositionAsync(0);
            carObstaclesSceneSoundRef.current.setVolumeAsync(0.05);
            carObstaclesSceneSoundRef.current.setIsLoopingAsync(true);
            carObstaclesSceneSoundRef.current.playAsync();

            const whereIsDanger = ['left', 'right'];

            let i = 0;
            const warningInterval = setInterval(() => {
                if (i >= 10 || gameOverRef.current === true) {
                    carObstaclesSceneSoundRef.current.pauseAsync();
                    clearInterval(warningInterval);
                    resolve(); // Resolve the promise when the interval completes
                    startSecuenceAfterFirstMechanic();
                    return;
                }
                thereIsDanger(whereIsDanger[Math.floor(Math.random() * whereIsDanger.length)], 'obstacle');
                i++;
            }, 6000);
        });
    }
    const secondMechanic = () => {
        return new Promise((resolve) => {
            fingerMovementBlockerRef.current.tap = false;

            carObstaclesSceneSoundRef.current.setPositionAsync(0);
            carObstaclesSceneSoundRef.current.setVolumeAsync(0.2);
            carObstaclesSceneSoundRef.current.setIsLoopingAsync(true);
            carObstaclesSceneSoundRef.current.playAsync();

            const whereIsDanger = ['left', 'right'];

            let i = 0;
            const warningInterval = setInterval(() => {
                if (i >= 3 || gameOverRef.current === true) {
                    clearInterval(warningInterval);
                    resolve();
                    startSecuenceAfterSecondMechanic();
                    return;
                }
                thereIsDanger(whereIsDanger[Math.floor(Math.random() * whereIsDanger.length)], 'shoot');
                i++;
            }, 6000);
        });
    }
    const thirdMechanic = () => {
        fingerMovementBlockerRef.current.swipeDown = false;
        fingerMovementBlockerRef.current.swipeUp = false;
    }

    const endThirdMechanic = () => {
        fingerMovementBlockerRef.current.swipeDown = true;
        fingerMovementBlockerRef.current.swipeUp = true;

        music1Ref.current.pauseAsync();
        music2Ref.current.pauseAsync();
        music3Ref.current.pauseAsync();
    }

    const handleSwipeDown = async () => {
        if (howManyTimesUserSmokesCigaretteRef.current === 0) {
            fingerMovementBlockerRef.current.swipeDown = true;
            howManyTimesUserSmokesCigaretteRef.current = howManyTimesUserSmokesCigaretteRef.current + 1;

            await lighterSoundRef.current.setPositionAsync(0);
            await lighterSoundRef.current.setVolumeAsync(0.8);
            await lighterSoundRef.current.playAsync();
            fingerMovementBlockerRef.current.swipeDown = false;
        } else if (howManyTimesUserSmokesCigaretteRef.current > 0 && howManyTimesUserSmokesCigaretteRef.current < 3) {
            fingerMovementBlockerRef.current.swipeDown = true;
            howManyTimesUserSmokesCigaretteRef.current = howManyTimesUserSmokesCigaretteRef.current + 1;

            await cigaretteSmokeSoundRef.current.setPositionAsync(0);
            await cigaretteSmokeSoundRef.current.playAsync();
            fingerMovementBlockerRef.current.swipeDown = false;
        } else {
            fingerMovementBlockerRef.current.swipeDown = true;
            howManyTimesUserSmokesCigaretteRef.current = 0;

            await cigaretteSmokeSoundRef.current.setPositionAsync(0);
            await cigaretteSmokeSoundRef.current.playAsync();

            setTimeout(() => {
                coughSoundRef.current.setPositionAsync(0);
                coughSoundRef.current.playAsync();
                fingerMovementBlockerRef.current.swipeDown = false;

                howManyTimesUserSmokesCigaretteRef.current = 0;
            }, 4000);
        }
    }

    const handleChangeMusic = async () => {
        fingerMovementBlockerRef.current.swipeUp = true;

        await changeMusicEffectRef.current.setPositionAsync(0);
        await changeMusicEffectRef.current.setVolumeAsync(0.2);
        await changeMusicEffectRef.current.playAsync();

            await music1Ref.current.pauseAsync();
            await music2Ref.current.pauseAsync();
            await music3Ref.current.pauseAsync();

        setTimeout(async () => {
            const randomMusic = Math.floor(Math.random() * 3) + 1;

            switch(randomMusic) {
                case 1:
                    await music1Ref.current.setPositionAsync(0);
                    await music1Ref.current.setVolumeAsync(0.2);
                    await music1Ref.current.setIsLoopingAsync(true);
                    await music1Ref.current.playAsync();
                    break;
                case 2:
                    await music2Ref.current.setPositionAsync(0);
                    await music2Ref.current.setVolumeAsync(0.2);
                    await music2Ref.current.setIsLoopingAsync(true);
                    await music2Ref.current.playAsync();
                    break;
                case 3:
                    await music3Ref.current.setPositionAsync(0);
                    await music3Ref.current.setVolumeAsync(0.2);
                    await music3Ref.current.setIsLoopingAsync(true);
                    await music3Ref.current.playAsync();
                    break;
            }
        }, 1000);


        setTimeout(() => {
            fingerMovementBlockerRef.current.swipeUp = false;
        }, 2000);
    }
    const thereIsDanger = async (whereIsTheDanger, whichKindOfDanger) => {
        if (whichKindOfDanger === 'obstacle') {
            if (whereIsTheDanger === 'left') {
                dangerInLeftRef.current = true;

                handleSteeringResult('right');

                await leftWarningSoundRef.current.setPositionAsync(0);
                await leftWarningSoundRef.current.playAsync();
            }

            if (whereIsTheDanger === 'right') {
                dangerInRightRef.current = true;

                handleSteeringResult('left');

                await rightWarningSoundRef.current.setPositionAsync(0);
                await rightWarningSoundRef.current.playAsync();
            }
        }

        if (whichKindOfDanger === 'shoot') {
            if (whereIsTheDanger === 'left') {
                dangerInLeftRef.current = true;

                handleShootingResult('left');

                await leftShootWarningRef.current.setPositionAsync(0);
                await leftShootWarningRef.current.playAsync();
            }

            if (whereIsTheDanger === 'right') {
                dangerInRightRef.current = true;

                handleShootingResult('right');

                await rightShootWarningRef.current.setPositionAsync(0);
                await rightShootWarningRef.current.playAsync();
            }
        }
    }

    const handleShootingResult = (shootDirection) => {
        if (shootDirection === 'left') {
            if (userShootLeftCorrectlyRef.current === true) {
                userShootLeftCorrectlyRef.current = false;
            }
        }

        if (shootDirection === 'right') {
            if (userShootRightCorrectlyRef.current === true) {
                userShootRightCorrectlyRef.current = false;
            }
        }

        setTimeout(() => {
            if (bulletsEnemyReceivedLeftRef.current >= 2) {
                dangerInLeftRef.current = false;
                enemyDownLeft();
                bulletsEnemyReceivedLeftRef.current = 0;
            } else if (bulletsEnemyReceivedRightRef.current >= 2) {
                dangerInRightRef.current = false;
                ememyDownRight();
                bulletsEnemyReceivedRightRef.current = 0;
            } else {
                userReceivedBullet();
            }
        }, TIME_USER_HAS_TO_REACT);

    }

    const enemyDownLeft = async () => {
        await leftShootWarningRef.current.stopAsync();
        await leftEnemyExplosionSoundRef.current.setPositionAsync(0);
        await leftEnemyExplosionSoundRef.current.playAsync();
    }

    const ememyDownRight = async () => {
        await rightShootWarningRef.current.stopAsync();
        await rightEnemyExplosionSoundRef.current.setPositionAsync(0);
        await rightEnemyExplosionSoundRef.current.playAsync();
    }

    const handleSteeringResult = (carMoveDirection) => {
            setTimeout(() => {
                if (carMoveDirection === 'left') {
                    if (userMoveLeftCorrectlyRef.current === true) {
                        userMoveLeftCorrectlyRef.current = false;
                    } else {
                        crashHandler('right');
                    }
                }
            }, TIME_USER_HAS_TO_REACT);

            setTimeout(() => {
                if (carMoveDirection === 'right') {
                    if (userMoveRightCorrectlyRef.current === true) {
                        userMoveRightCorrectlyRef.current = false;
                    } else {
                        crashHandler('left');
                    }
                }
            }, TIME_USER_HAS_TO_REACT);
    }

    const crashHandler = (crashPosition) => {
        carHealthRef.current = carHealthRef.current - 15;

        if (carHealthRef.current < 100 && carHealthRef.current > 75) {
            lowDamageWarningPlay();
        } else if (carHealthRef.current < 50 && carHealthRef.current > 25) {
            mediumDamageWarningPlay();
        } else if (carHealthRef.current < 25 && carHealthRef.current > 0) {
            highDamageWarningPlay();
        } else if (carHealthRef.current <= 0) {
            // gameOver();
            highDamageWarningPlay();
        }

        if (crashPosition === 'right') {
                const playAudio = async () => {
                    const { sound } = await Audio.Sound.createAsync(
                        require('./assets/sounds/crashRightSide.mp3')
                    );

                    await sound.playAsync();
                }

                playAudio();
        }

        if (crashPosition === 'left') {
            const playAudio = async () => {
                const { sound } = await Audio.Sound.createAsync(
                    require('./assets/sounds/crashLeftSide.mp3')
                );

                    await sound.playAsync();
                }

                playAudio();
        }
    }

    const lowDamageWarningPlay = () => {
        const playAudio = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/lowDamageWarning.mp3')
            );

            await sound.playAsync();
        }

        playAudio();
    }

    const mediumDamageWarningPlay = () => {
        const playAudio = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/mediumDamageWarning.mp3')
            );

            await sound.playAsync();
        }

        playAudio();
    }

    const highDamageWarningPlay = () => {
        const playAudio = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/highDamageWarning.mp3')
            );

            await sound.playAsync();
        }

        playAudio();
    }

    const userReceivedBullet = () => {
        carHealthRef.current = carHealthRef.current - 15;

        if (carHealthRef.current < 100 && carHealthRef.current > 75) {
            mediumShieldsWarningRef.current.setPositionAsync(0);
            mediumShieldsWarningRef.current.playAsync();
        } else if (carHealthRef.current < 50 && carHealthRef.current > 25) {
            criticalShieldsWarningRef.current.setPositionAsync(0);
            criticalShieldsWarningRef.current.playAsync();
        } else if (carHealthRef.current < 25 && carHealthRef.current > 0) {
            noShieldsWarningRef.current.setPositionAsync(0);
            noShieldsWarningRef.current.playAsync();
        } else if (carHealthRef.current <= 0) {
            noShieldsWarningRef.current.setPositionAsync(0);
            noShieldsWarningRef.current.playAsync();
            // gameOver();
        }
    }

    // const gameOver = () => {
    //     const playAudio = async () => {
    //         const { sound } = await Audio.Sound.createAsync(
    //             require('./assets/sounds/explosion.mp3')
    //         );
    //
    //         await sound.playAsync();
    //     }
    //
    //     playAudio();
    //     gameOverRef.current = true;
    // }

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
              <TapGestureHandler onHandlerStateChange={handleTapGesture}>
                  <PanGestureHandler onHandlerStateChange={onHandlerStateChange}>
                      <View style={{ flex: 1, backgroundColor: 'black' }}>
                      </View>
                  </PanGestureHandler>
              </TapGestureHandler>
          </View>
      </GestureHandlerRootView>
  );
}