import { Alert, View } from 'react-native';
import React, {useEffect, useRef, useState} from "react";
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

    const TIME_USER_HAS_TO_REACT = 2000;

    const SWIPE_THRESHOLD = 10;
    const onHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {

            // Is the finger swiping enough?
            if (Math.abs(event.nativeEvent.translationX) < SWIPE_THRESHOLD &&
                Math.abs(event.nativeEvent.translationY) < SWIPE_THRESHOLD) {
            } else {
                if (event.nativeEvent.velocityX > 0 && !fingerMovementBlockerRef.current.swipeRight) {
                    handleSteering('right');
                } else if (event.nativeEvent.velocityX < 0 && !fingerMovementBlockerRef.current.swipeLeft) {
                    handleSteering('left');
                }
            }

            if (event.nativeEvent.velocityY > 0 && !fingerMovementBlockerRef.current.swipeDown) {
                Alert.alert('Swiped Down!');
            } else if (event.nativeEvent.velocityY < 0 && !fingerMovementBlockerRef.current.swipeUp) {
                if (radioBlockerRef.current === false) {
                    playRadio();
                }
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

    const handleSteering = (userSwipe) => {
        if (dangerInLeftRef.current === true) {
            dangerInLeftRef.current = false;

            if (userSwipe === 'right') {
                userMoveRightCorrectlyRef.current = true;
            }
            const playCarSteeringRight = async () => {
                const { sound } = await Audio.Sound.createAsync(
                    require('./assets/sounds/carSteeringRight.mp3')
                );

                await sound.playAsync();

            }

            playCarSteeringRight();
        }

        if (dangerInRightRef.current === true) {
            dangerInRightRef.current = false;

            if (userSwipe === 'left') {
                userMoveLeftCorrectlyRef.current = true;
            }

            const playCarSteeringRight = async () => {
                const { sound } = await Audio.Sound.createAsync(
                    require('./assets/sounds/carSteeringLeft.mp3')
                );

                await sound.playAsync();

            }

            playCarSteeringRight();
        }
    }

        useEffect(() => {
            const playPresentation1 = async () => {
                const { sound } = await Audio.Sound.createAsync(
                    require('./assets/sounds/presentacion1.mp3')
                );

                sound.setOnPlaybackStatusUpdate(playbackStatus => {
                    if (playbackStatus.didJustFinish) {
                        fingerMovementBlockerRef.current.tap = false;
                    }
                });

                await sound.playAsync();

            }

            playPresentation1();
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

    const handleTapGesture = event => {
        if (event.nativeEvent.state === State.ACTIVE) {
            if (fingerMovementBlockerRef.current.tap === false) {
                fingerMovementBlockerRef.current.tap = true;
                const playAudio = async () => {
                    const { sound } = await Audio.Sound.createAsync(
                        require('./assets/sounds/presentacion2.mp3')
                    );

                    sound.setOnPlaybackStatusUpdate(playbackStatus => {
                        if (playbackStatus.didJustFinish) {
                            startFirstMechanicExplanation();
                        }
                    });

                    await sound.playAsync();
                }

                playAudio();
            }
        }
    }

    const startFirstMechanicExplanation = () => {
        const playAudio = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/mechanicExplanation.mp3')
            );

            sound.setOnPlaybackStatusUpdate(playbackStatus => {
                if (playbackStatus.didJustFinish) {
                    startFirstMechanic();
                }
            });

            await sound.playAsync();
        }

        playAudio();
    }

    const startFirstMechanic = () => {
        fingerMovementBlockerRef.current.swipeLeft = false;
        fingerMovementBlockerRef.current.swipeRight = false;

        setTimeout(() => {
            thereIsDanger('left');
        }, 2000);

        setTimeout(() => {
            thereIsDanger('left');
        }, 8000);

        setTimeout(() => {
            thereIsDanger('right');
        }, 14000);

        setTimeout(() => {
            thereIsDanger('right');
        }, 20000);

        setTimeout(() => {
            thereIsDanger('left');
        }, 26000);

        setTimeout(() => {
            thereIsDanger('left');
        }, 32000);

        setTimeout(() => {
            thereIsDanger('right');
        }, 38000);

        setTimeout(() => {
            thereIsDanger('left');
        }, 44000);

        setTimeout(() => {
            thereIsDanger('right');
        }, 50000);

        setTimeout(() => {
            thereIsDanger('right');
        }, 56000);

        setTimeout(() => {
            thereIsDanger('right');
        }, 60000);

        setTimeout(() => {
            thereIsDanger('left');
        }, 66000);

        setTimeout(() => {
            thereIsDanger('right');
        }, 72000);

        setTimeout(() => {
            thereIsDanger('left');
        }, 78000);

        // setTimeout(() => {
        //     aiAskForRadio();
        // }, 32000);

    }

    const aiAskForRadio = () => {
        const playAudio = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/sounds/aiAskForMusicFirstTime.mp3')
            );

            sound.setOnPlaybackStatusUpdate(playbackStatus => {
                if (playbackStatus.didJustFinish) {
                    fingerMovementBlockerRef.current.swipeUp = false;
                    radioBlockerRef.current = false;
                }
            });

            await sound.playAsync();
        }

        playAudio();
    }

    const thereIsDanger = (whereIsTheDanger) => {
        if (whereIsTheDanger === 'left') {
            dangerInLeftRef.current = true;

            const playAudio = async () => {
                const { sound } = await Audio.Sound.createAsync(
                    require('./assets/sounds/warningLeft.mp3')
                );

                await sound.playAsync();
                handleSteeringResult('right');
            }

            playAudio();
        }

        if (whereIsTheDanger === 'right') {
            dangerInRightRef.current = true;

            const playAudio = async () => {
                const { sound } = await Audio.Sound.createAsync(
                    require('./assets/sounds/warningRight.mp3')
                );

                await sound.playAsync();
                handleSteeringResult('left');
            }

            playAudio();
        }
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
                        userMoveLeftCorrectlyRef.current = false;
                    } else {
                        crashHandler('left');
                    }
                }
            }, TIME_USER_HAS_TO_REACT);
    }

    const crashHandler = (crashPosition) => {
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