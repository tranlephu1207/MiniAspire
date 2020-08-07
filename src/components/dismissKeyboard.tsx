import * as React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

interface DismissKeyboardProps {
  children: JSX.Element;
}

const DismissKeyboard: React.SFC<DismissKeyboardProps> = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
