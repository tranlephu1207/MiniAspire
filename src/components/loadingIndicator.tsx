import * as React from 'react';
import {View, StyleSheet, ActivityIndicator, ColorValue} from 'react-native';

interface LoadingIndicatorProps {
  color?: ColorValue;
  size?: number | 'small' | 'large' | undefined;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

const LoadingIndicator: React.SFC<LoadingIndicatorProps> = (props) => (
  <View style={styles.container}>
    <ActivityIndicator {...props} />
  </View>
);

export default LoadingIndicator;
