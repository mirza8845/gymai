import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Fonts } from '../constants/theme';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CommonDropdown = ({ text, data = [] }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const renderItem = (item, index) => {
    if (typeof item === 'string') {
      return (
        <Text key={index} style={styles.item}>
          • {item}
        </Text>
      );
    } else if (typeof item === 'object' && item.name) {
      return (
        <Text key={index} style={styles.item}>
          • {item.name} {item.duration ? `- ${item.duration}` : ''}
        </Text>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.title}>{text}</Text>
        <Icon name={expanded ? 'up' : 'down'} size={18} color="white" />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          {data.length > 0 ? (
            data.map(renderItem)
          ) : (
            <Text style={styles.item}>No data available</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default CommonDropdown;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.SemiBold,
  },
  content: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  item: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: Fonts.Regular,
    marginBottom: 6,
  },
});
