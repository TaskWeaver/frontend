import React, {useState} from 'react';
import {TextInput, View, Text} from 'react-native';

interface SignUpTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  validate?: (text: string) => boolean;
  invalidText?: string;
}

export default function SignUpTextInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  validate,
  invalidText,
}: SignUpTextInputProps) {
  const [isValid, setIsValid] = useState(true);

  const handleChangeText = (text: string) => {
    onChangeText(text);
    if (validate) {
      setIsValid(validate(text));
    }
  };

  return (
    <View style={{marginBottom: 16}}>
      <TextInput
        value={value}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={'#C7C7C9'}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: isValid ? '#C7C7C9' : 'red',
          paddingVertical: 14,
        }}
      />
      {!isValid && <Text style={{fontSize: 12, color: 'red', paddingVertical: 8}}>{invalidText}</Text>}
    </View>
  );
}
