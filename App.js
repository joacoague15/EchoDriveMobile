import { Alert, Dimensions, View } from 'react-native';
import React, { useEffect, useRef } from "react";
import { GestureHandlerRootView, PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';

export default function App() {
    // PAY ATTENTION TO SOUND CLEANUP FOR RESOURCE MANAGEMENT

    const fingerMovementBlockerRef = useRef({
        swipeUp: true,
        swipeDown: true,
        swipeLeft: true,
        swipeRight: true,
        tap: true
    });
    const radioBlockerRef = useRef(true);

    const dangerInRightRef = useRef(false);
    const dangerInLeftRef = useRef(false);

    const userMoveRightCorrectlyRef = useRef(false);
    const userMoveLeftCorrectlyRef = useRef(false);
    const userShootRightCorrectlyRef = useRef(false);
    const userShootLeftCorrectlyRef = useRef(false);

    const carHealthRef = useRef(100);

    const gameOverRef = useRef(false);

    const TIME_USER_HAS_TO_REACT = 2000;

    const SWIPE_THRESHOLD = 10;

    const steeringSoundRef = useRef(null);
    const leftWarningSoundRef = useRef(null);
    const rightWarningSoundRef = useRef(null);

    const leftShootWarningRef = useRef(null);
    const rightShootWarningRef = useRef(null);
    const leftShootSoundRef = useRef(null);
    const rightShootSoundRef = useRef(null);

    // Preload sounds
    useEffect(() => {
        async function preloadSteeringSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/carSteering.mp3')
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

        preloadSteeringSound();
        preloadWarningLeftSound();
        preloadWarningRightSound();
        preloadLeftWarningShoot();
        preloadRightWarningShoot();
        preloadLeftShoot();
        preloadRightShoot();

        return () => {
            // Unload the sound from memory when component unmounts
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
        };
    }, []);

    const screenWidth = Dimensions.get('window').width;
    const onHandlerStateChange = async event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {

            // Is the finger swiping enough?
            if (Math.abs(event.nativeEvent.translationX) > SWIPE_THRESHOLD &&
                Math.abs(event.nativeEvent.translationY) > SWIPE_THRESHOLD) {
                if (event.nativeEvent.velocityX > 0 && !fingerMovementBlockerRef.current.swipeRight) {
                    await handleSteering('right');
                } else if (event.nativeEvent.velocityX < 0 && !fingerMovementBlockerRef.current.swipeLeft) {
                    await handleSteering('left');
                }

                // if (event.nativeEvent.velocityY > 0 && !fingerMovementBlockerRef.current.swipeDown) {
                //     Alert.alert('Swiped Down!');
                // } else if (event.nativeEvent.velocityY < 0 && !fingerMovementBlockerRef.current.swipeUp) {
                //     if (radioBlockerRef.current === false) {
                //         playRadio();
                //     }
                // }
            }
        }
    };

    const playRadio = () => {
        fingerMovementBlockerRef.current.swipeUp = true;
        radioBlockerRef.current = true;

        const playAudio = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/music1.m4a')
            );

            await sound.playAsync();
        }

        playAudio();
    }

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

    // PRESENTATION
        useEffect(() => {
            // const playPresentation1 = async () => {
            //     const { sound } = await Audio.Sound.createAsync(
            //         require('./assets/sounds/presentacion1.mp3')
            //     );
            //
            //     sound.setOnPlaybackStatusUpdate(playbackStatus => {
            //         if (playbackStatus.didJustFinish) {
            //             fingerMovementBlockerRef.current.tap = false;
            //         }
            //     });
            //
            //     await sound.playAsync();
            //
            // }
            //
            // playPresentation1();
            mechanicsTests();

        }, []);

    // CAR MOVING EFFECT
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

    const handleTapGesture = async event => {
        if (event.nativeEvent.state === State.ACTIVE) {
            const tapX = event.nativeEvent.x;

            if (tapX < screenWidth / 2) {
                await handleUserShoot('left');
            } else {
                await handleUserShoot('right');
            }
        }
    }

    const handleUserShoot = async (shootDirection) => {
        if (dangerInLeftRef.current === true) {
            dangerInLeftRef.current = false;

            if (shootDirection === 'left') {
                userShootLeftCorrectlyRef.current = true;
            }

            await leftShootSoundRef.current.setPositionAsync(0);
            await leftShootSoundRef.current.playAsync();
        }

        if (dangerInRightRef.current === true) {
            dangerInRightRef.current = false;

            if (shootDirection === 'right') {
                userShootRightCorrectlyRef.current = true;
            }

            await rightShootSoundRef.current.setPositionAsync(0);
            await rightShootSoundRef.current.playAsync();
        }
    }


    const mechanicsTests = async () => {

        await firstPart();

        await secondPartNotification();
    }

    const firstPart = () => {
        return new Promise((resolve) => {
            fingerMovementBlockerRef.current.swipeLeft = false;
            fingerMovementBlockerRef.current.swipeRight = false;

            const whereIsDanger = ['left', 'right'];

            let i = 0;
            const warningInterval = setInterval(() => {
                if (i >= 3 || gameOverRef.current === true) {
                    clearInterval(warningInterval);
                    resolve(); // Resolve the promise when the interval completes or game over
                    return;
                }
                thereIsDanger(whereIsDanger[Math.floor(Math.random() * whereIsDanger.length)], 'obstacle');
                i++;
            }, 6000);
        });
    }
    const secondPartNotification = async () => {
        fingerMovementBlockerRef.current.swipeLeft = true;
        fingerMovementBlockerRef.current.swipeRight = true;
        const playAudio = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/secondPartNotification.mp3')
            );

            sound.setOnPlaybackStatusUpdate(playbackStatus => {
                if (playbackStatus.didJustFinish) {
                    secondPart();
                }
            });

            await sound.playAsync();
        }

        playAudio();
    }

    const secondPart = () => {
        return new Promise((resolve) => {
            fingerMovementBlockerRef.current.tap = false;

            const whereIsDanger = ['left', 'right'];

            let i = 0;
            const warningInterval = setInterval(() => {
                if (i >= 3 || gameOverRef.current === true) {
                    clearInterval(warningInterval);
                    resolve(); // Resolve the promise when the interval completes or game over
                    return;
                }
                thereIsDanger(whereIsDanger[Math.floor(Math.random() * whereIsDanger.length)], 'shoot');
                i++;
            }, 6000);
        });
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
        setTimeout(() => {
            if (shootDirection === 'left') {
                if (userShootLeftCorrectlyRef.current === true) {
                    userShootLeftCorrectlyRef.current = false;
                } else {
                    userReceivedBullet();
                }
            }
        }, TIME_USER_HAS_TO_REACT);

        setTimeout(() => {
            if (shootDirection === 'right') {
                if (userShootRightCorrectlyRef.current === true) {
                    userShootRightCorrectlyRef.current = false;
                } else {
                    userReceivedBullet();
                }
            }
        }, TIME_USER_HAS_TO_REACT);
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
            gameOver();
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
        console.log('BULLET RECEIVED');
    }

    const gameOver = () => {
        const playAudio = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/explosion.mp3')
            );

            await sound.playAsync();
        }

        playAudio();
        gameOverRef.current = true;
    }

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