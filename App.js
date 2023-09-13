import { Alert, View } from 'react-native';
import React, {useEffect, useRef, useState} from "react";
import { GestureHandlerRootView, PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';

export default function App() {
    // PAY ATTENTION TO SOUND CLEANUP FOR RESOURCE MANAGEMENT

// *Pantalla de inicio
//     IA: hola estas ahí? Toca al medio para iniciar (esto lo repite en bucle hasta que el jugador toca la pantalla)
//     IA: uf al fin reaccionas. Bueno en fin, Que tal? Soy la asistente virtual de los implantes de tus ojos. Ahora mismo se están actualizando y pueden tardar unas horas. Puedes llamarme inventar un nombre. Estamos en tu auto en medio de la autopista así que tendré que guiarte para que no choques. Espero lo hagas bien, hoy no quiero morir. Solo bromeo, ni siquiera nací, aunque me hubiera gustado.
//
//         Como sea, escucha atentamente, toca a la izquierda para ir a la izquierda. Vamos es muy simple.
//     *toca a la izquierda *
//
//     Muy bien, ahora toca a la derecha para ir a la derecha. Es como si el shampoo tuviera instrucciones.
//         toca a la derecha
//
//     Perfecto ya nos entendemos. Algo más, te voy a llamar usuario porque no tengo funcion personalizada, eso te pasa por comprar implantes en la calle.
//         Puedes tocar arriba, así escucharemos un poco la radio
//     toca arriba
//
//     Radio: 10 minutos para las 8 de la noche. En este bello 17 de noviembre (día de la entrega final del juego xd), estando a nada de fin de año. Ya se nos viene el 2080, que nos traerá esta nueva década?? Quedate con nosotros que en un ratito te contamos las tendencias para estos nuevos '80
//
//     IA: bien ahora tenemos contexto de la época, ya no importa la radio. Aunque puedes poner música si tocas ese mismo botón, eso compensará el no tener un soundtrack
//
//     toca arriba
//
//     *Créditos iniciales *

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
        // const { numberOfPointers } = event.nativeEvent;

        if (event.nativeEvent.oldState === State.ACTIVE) {

            // Is the finger swiping enough?
            if (Math.abs(event.nativeEvent.translationX) < SWIPE_THRESHOLD &&
                Math.abs(event.nativeEvent.translationY) < SWIPE_THRESHOLD) {
            } else {
                if (event.nativeEvent.velocityX > 0 && !fingerMovementBlockerRef.current.swipeRight) {
                    handleSteering();
                } else if (event.nativeEvent.velocityX < 0 && !fingerMovementBlockerRef.current.swipeLeft) {
                    handleSteering();
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

    const handleSteering = () => {
        if (dangerInLeftRef.current === true) {
            dangerInLeftRef.current = false;

            userMoveRightCorrectlyRef.current = true;
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

            userMoveLeftCorrectlyRef.current = true;

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
        }, 6000);

        setTimeout(() => {
            thereIsDanger('right');
        }, 10000);

        setTimeout(() => {
            thereIsDanger('right');
        }, 14000);

        setTimeout(() => {
            aiAskForRadio();
        }, 18000);

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

    const thereIsDanger = (position) => {
        if (position === 'left') {
            dangerInLeftRef.current = true;

            const playAudio = async () => {
                const { sound } = await Audio.Sound.createAsync(
                    require('./assets/sounds/warningLeft.mp3')
                );

                sound.setOnPlaybackStatusUpdate(playbackStatus => {
                    if (playbackStatus.didJustFinish) {
                        dangerInLeftRef.current = false;
                        handleSteeringResult('right');
                    }
                });

                await sound.playAsync();
            }

            playAudio();
        }

        if (position === 'right') {
            dangerInRightRef.current = true;

            const playAudio = async () => {
                const { sound } = await Audio.Sound.createAsync(
                    require('./assets/sounds/warningRight.mp3')
                );

                sound.setOnPlaybackStatusUpdate(playbackStatus => {
                    if (playbackStatus.didJustFinish) {
                        dangerInRightRef.current = false;
                        handleSteeringResult('left');
                    }
                });

                await sound.playAsync();
            }

            playAudio();
        }
    }

    const handleSteeringResult = (direction) => {
            setTimeout(() => {
                if (direction === 'left') {
                    if (userMoveLeftCorrectlyRef.current === true) {
                        alert("MOVED TO LEFT CORRECTLY!");
                    } else {
                        alert("STRESS INCREASED");
                    }
                }
            }, TIME_USER_HAS_TO_REACT);

            setTimeout(() => {
                if (direction === 'right') {
                    if (userMoveRightCorrectlyRef.current === true) {
                        alert("MOVED TO RIGHT CORRECTLY!");
                    } else {
                        alert("STRESS INCREASED");
                    }
                }
            }, TIME_USER_HAS_TO_REACT);
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