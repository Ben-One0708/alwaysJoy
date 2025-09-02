import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const menuItems = [
    {
      id: 1,
      title: '詞彙測驗',
      subtitle: 'Magazine Words',
      icon: 'book',
      color: ['#667eea', '#764ba2'],
      route: 'VocabularyQuiz',
    },
    {
      id: 2,
      title: '團隊競賽',
      subtitle: 'Team Competition',
      icon: 'group',
      color: ['#ff6b6b', '#ee5a52'],
      route: 'TeamCompetition',
    },
    {
      id: 3,
      title: '個人中心',
      subtitle: 'Profile & Settings',
      icon: 'person',
      color: ['#4CAF50', '#45a049'],
      route: 'Profile',
    },
  ];

  const renderMenuItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => navigation.navigate(item.route)}
      activeOpacity={0.8}>
      <LinearGradient
        colors={item.color}
        style={styles.menuItemGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={styles.menuItemContent}>
          <Icon name={item.icon} size={48} color="white" style={styles.menuIcon} />
          <Text style={styles.menuTitle}>{item.title}</Text>
          <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      {/* 背景漸層 */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.backgroundGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 標題區域 */}
        <View style={styles.header}>
          <Text style={styles.mainTitle}>Spelling Bee</Text>
          <Text style={styles.subtitle}>Choose your challenge</Text>
        </View>

        {/* 功能選單 */}
        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>

        {/* 底部信息 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '300',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 30,
  },
  menuItem: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  menuItemGradient: {
    padding: 30,
    borderRadius: 20,
  },
  menuItemContent: {
    alignItems: 'center',
  },
  menuIcon: {
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  menuSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
});

export default HomeScreen;
