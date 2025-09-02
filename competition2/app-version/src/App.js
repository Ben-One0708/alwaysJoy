import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// 導入頁面組件
import HomeScreen from './screens/HomeScreen';
import VocabularyQuizScreen from './screens/VocabularyQuizScreen';
import TeamCompetitionScreen from './screens/TeamCompetitionScreen';
import ProfileScreen from './screens/ProfileScreen';

// 創建導航棧
const Stack = createStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#667eea',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false, // 隱藏默認導航欄
            }}>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{title: 'Spelling Bee'}}
            />
            <Stack.Screen 
              name="VocabularyQuiz" 
              component={VocabularyQuizScreen}
              options={{title: '詞彙測驗'}}
            />
            <Stack.Screen 
              name="TeamCompetition" 
              component={TeamCompetitionScreen}
              options={{title: '團隊競賽'}}
            />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{title: '個人中心'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
