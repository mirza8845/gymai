import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React from 'react';
  import splash from '../../assets/images/splash.png';
  
  const Splash = () => {
    return (
      <View style={styles.container}>
        <Image source={splash} style={styles.image} resizeMode="cover" />
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default Splash;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 50,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    button: {
      backgroundColor:'black' , 
      paddingVertical: 10,
      paddingHorizontal: 70,
      borderRadius: 20,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 4,
      elevation: 10,
    },
    buttonText: {
      color: '#ffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  