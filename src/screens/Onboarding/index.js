import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import workout from '../../assets/images/workout.png';
import appleicon from '../../assets/images/appleVector.png';
import personsicon from '../../assets/images/personsVector.png';
import stepActive from '../../assets/images/stepperactive.png';
import stepInactive from '../../assets/images/stepperinactive.png';
import img2 from '../../assets/images/img2.png';
import img3 from '../../assets/images/img3.png'
import img1 from '../../assets/images/img1.png'
import { useNavigation } from '@react-navigation/native';

const steps = [
    {
        icon:workout,
        image: img1,
        text: 'Personalised workouts designed around your goals and lifestyle.',
    },
    {
        icon: appleicon,
        image: img2,
        text: 'Health & Nutrition advice to support your recovery',
    },
    {
        icon: personsicon,
        image: img3,
        text: 'Join Our Community, Reach Your Potential',
    },

];

const Onboarding = () => {
    const [stepIndex, setStepIndex] = useState(0);
    const navigation = useNavigation();

    const handleNext = () => {
        if (stepIndex < steps.length - 1) {
            setStepIndex(prev => prev + 1);
        } else {
            navigation.navigate('login');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={steps[stepIndex].image} style={styles.backgroundImage} resizeMode="cover" />
            <View style={styles.content}>
                <Image source={steps[stepIndex].icon} style={styles.logo} resizeMode="contain" />
                <Text style={styles.description}>{steps[stepIndex].text}</Text>

                <View style={styles.stepperline}>
                    {steps.map((_, index) => (
                        <Image
                            key={index}
                            source={index === stepIndex ? stepActive : stepInactive}
                            style={styles.stepIcon}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>
                        {stepIndex === steps.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Onboarding;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    logo: {
        width: 30,
        height: 50,
    },
    description: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        width:'80%'
    },
    stepperline: {
        flexDirection: 'row',
        marginBottom: 30,
        gap: 3,
    },
    stepIcon: {
        width: 18,
        height: 3,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        paddingVertical: 10,
        paddingHorizontal: 70,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '900',
        textAlign: 'center',
    },
});
