import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import {ImageBackground} from 'react-native';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const HomePage = () => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [result, setResult] = useState('');
  const [BGColor, setBgColor] = useState('#ffffff');
  const [submitButton, setSubmitButton] = useState(true);
  const [cancelButton, setCancelButton] = useState(true);
  const processLetters = () => {
    let name1 = firstName;
    let name2 = secondName;

    for (let i = 0; i < name1.length; i++) {
      name2 = name2.replace(name1[i], '');
    }

    if (name2.length > 0) {
      const flames = ['F', 'L', 'A', 'M', 'E', 'S'];
      while (flames.length > 1) {
        let letterIndex = (name2.length % flames.length) - 1;
        if (letterIndex < 0) {
          letterIndex = flames.length - 1;
        }
        flames.splice(letterIndex, 1);
      }

      const relationship = flames[0];

      switch (relationship) {
        case 'F':
          setResult('Friends');
          setBgColor('#f6ff60');
          break;
        case 'L':
          setResult('Love');
          setBgColor('#E48CA3');
          break;
        case 'A':
          setResult('Affection');
          setBgColor('#e5a3df');
          break;
        case 'M':
          setResult('Marriage');
          setBgColor('#135f77');
          break;
        case 'E':
          setResult('Enemy');
          setBgColor('#ff5555');
          break;
        case 'S':
          setResult('Sibling');
          setBgColor('#f1acc5');
          break;
      }
      toggleModal();
    } else {
      setResult('');
      setBgColor('#ffffff');
      toggleModal();
    }
  };
  const processReset = () => {
    setFirstName('');
    setSecondName('');
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (firstName.length > 2 && secondName.length > 2) {
      setSubmitButton(false);
      setCancelButton(false);
    } else {
      setSubmitButton(true);
      setCancelButton(true);
    }

    if (firstName.length > 0 || secondName.length > 0) {
      setCancelButton(false);
    }
  }, [secondName, firstName]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={isModalVisible}>
        <View
          style={{
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            width: ScreenWidth * 0.9,
            backgroundColor: BGColor || '#fff',
            height: ScreenHeight * 0.2,
          }}>
          <Text
            title="x"
            onPress={toggleModal}
            style={{
              top: 25,
              left: ScreenWidth * 0.4,
              paddingHorizontal: 12,
              textAlign: 'right',
              zIndex: 100,
              color: '#171515',
            }}>
            X
          </Text>
          <View>
            <View
              style={{
                ...styles.row,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {result.length > 0 ? (
                <>
                  <Text
                    style={{
                      fontSize: 16,
                      textTransform: 'uppercase',
                      alignContent: 'center',
                      textAlign: 'center',
                      paddingHorizontal: 30,
                    }}>
                    The relationship between{' '}
                    <Text
                      style={{
                        fontWeight: '600',
                        color: '#000',
                      }}>
                      {firstName}
                    </Text>{' '}
                    and{' '}
                    <Text
                      style={{
                        fontWeight: '600',
                        color: '#000',
                      }}>
                      {secondName}
                    </Text>{' '}
                    will end in
                  </Text>
                  <Text
                    style={{
                      fontSize: 30,
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#000',
                    }}>
                    {result}
                  </Text>
                </>
              ) : (
                <Text
                  style={{
                    fontSize: 17,
                    textTransform: 'capitalize',
                    textAlign: 'center',
                  }}>
                  {'Try different Name...'}
                </Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <View style={{...styles.row}}>
        <ImageBackground
          source={require('./assets/bg.jpeg')}
          style={{
            paddingTop: ScreenHeight * 0.3,
            paddingBottom: ScreenHeight * 0.4,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 60,
              fontWeight: '600',
              color: '#a6a6a6',
            }}>
            <Text style={{color: '#deb500'}}>F</Text>
            <Text style={{color: '#de4402'}}>L</Text>
            <Text style={{color: '#05ab0b'}}>A</Text>
            <Text style={{color: '#e5a3df'}}>M</Text>
            <Text style={{color: '#0b05ab'}}>E</Text>
            <Text style={{color: '#e600e6'}}>S</Text>
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            placeholder="Enter First Name"
            value={firstName}
          />
          <TextInput
            style={styles.input}
            onChangeText={setSecondName}
            value={secondName}
            placeholder="Enter Second Name"
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor: submitButton ? '#e3bcf5' : '#9b20d4',
                borderColor: submitButton ? '#e3bcf5' : '#9b20d4',
              }}
              onPress={processLetters}
              disabled={submitButton}>
              <Text style={{color: submitButton ? '#000' : '#FFF'}}>
                SUBMIT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor: cancelButton ? '#d9d9d9' : '#a6a6a6',
                borderColor: cancelButton ? '#d9d9d9' : '#a6a6a6',
              }}
              onPress={processReset}
              disabled={cancelButton}>
              <Text style={{color: cancelButton ? '#000' : '#fff'}}>RESET</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};
export default HomePage;

const styles = StyleSheet.create({
  row: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#9b20d4',
    backgroundColor: '#fff',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9b20d4',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    alignSelf: 'stretch',
  },
});