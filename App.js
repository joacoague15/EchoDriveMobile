import { Alert, View } from 'react-native';
import React from "react";
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';

export default function App() {

    let swipeIsBlocked = {
        up: true,
        down: true,
        left: false,
        right: false
    };
    const onHandlerStateChange = event => {
        const { numberOfPointers } = event.nativeEvent;

        if (event.nativeEvent.oldState === State.ACTIVE) {
            if (event.nativeEvent.velocityX > 0 && !swipeIsBlocked.right) {
                Alert.alert('Swiped Right!');
            } else if (event.nativeEvent.velocityX < 0 && !swipeIsBlocked.left) {
                Alert.alert('Swiped Left!');
            }

            // if (event.nativeEvent.velocityY > 0 && !swipeIsBlocked.down) {
            //     Alert.alert('Swiped Down!');
            // } else if (event.nativeEvent.velocityY < 0 && !swipeIsBlocked.up && numberOfPointers === 2) {
            //     Alert.alert('Swiped Up!');
            // }
        }
    };

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
              <PanGestureHandler onHandlerStateChange={onHandlerStateChange}>
                  <View style={{ flex: 1, backgroundColor: 'black' }}>
                  </View>
              </PanGestureHandler>
          </View>
      </GestureHandlerRootView>
  );
}