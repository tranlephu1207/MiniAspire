import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Global from '../../src';

const boxShadow = (direction: string = '') => ({
  shadowColor: 'rgba(0, 0, 0, .4)',
  shadowOffset:
    direction === 'top' ? {width: 0, height: -2} : {width: 0, height: 2},
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 2,
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    bottom: '5%',
    right: 16,
    backgroundColor: Global.Colors.MAIN_GREEN,
    ...boxShadow(),
  },
});

interface CircleButtonProps {
  onPress: any;
  style?: any;
  iconProps?: any;
}

const CircleButton: React.SFC<CircleButtonProps> = ({
  onPress,
  style,
  iconProps,
}) => (
  <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
    <Icon name="plus" size={20} color="white" {...iconProps} />
  </TouchableOpacity>
);

export default CircleButton;
