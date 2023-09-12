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

    const dangerInRightRef = useRef(false);
    const dangerInLeftRef = useRef(false);

    const SWIPE_THRESHOLD = 10;
    const onHandlerStateChange = event => {
        // const { numberOfPointers } = event.nativeEvent;

        if (event.nativeEvent.oldState === State.ACTIVE) {

            // Is the finger swiping enough?
            if (Math.abs(event.nativeEvent.translationX) < SWIPE_THRESHOLD &&
                Math.abs(event.nativeEvent.translationY) < SWIPE_THRESHOLD) {
            } else {
                if (event.nativeEvent.velocityX > 0 && !fingerMovementBlockerRef.current.swipeRight) {
                    if (dangerInLeftRef.current === true) {
                        dangerInLeftRef.current = false;
                        const playCarSteeringRight = async () => {
                            const { sound } = await Audio.Sound.createAsync(
                                require('./assets/sounds/carSteeringRight.mp3')
                            );

                            await sound.playAsync();

                        }

                        playCarSteeringRight();
                    }
                } else if (event.nativeEvent.velocityX < 0 && !fingerMovementBlockerRef.current.swipeLeft) {
                    Alert.alert('Swiped Left!');
                }
            }

            // if (event.nativeEvent.velocityY > 0 && !fingerMovementBlocker.down) {
            //     Alert.alert('Swiped Down!');
            // } else if (event.nativeEvent.velocityY < 0 && !fingerMovementBlocker.up && numberOfPointers === 2) {
            //     Alert.alert('Swiped Up!');
            // }
        }
    };

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

        thereIsDanger('left');
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
                    }
                });

                await sound.playAsync();
            }

            playAudio();
        }

        if (position === 'right') {
            dangerInLeftRef.current = true;

            const playAudio = async () => {
                const { sound } = await Audio.Sound.createAsync(
                    require('./assets/sounds/warningRight.mp3')
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