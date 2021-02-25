import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
function TwoActivities() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="First" component={First} options={{title: 'Two Activities', headerTintColor: 'white', headerStyle: {backgroundColor: 'tomato'}}} />
      <Stack.Screen name="Second" component={Second} options={{title: 'Second Activity', headerTintColor: 'white', headerStyle: {backgroundColor: 'tomato'}}} />
    </Stack.Navigator>
  )
}

function First({route, navigation}) {
  const [message, setMessage] = useState('');
  let balas;
  if (route.params != null) {
    balas = route.params.balas;
  } else {
    balas = '';
  }
  const Sending = () => {
    navigation.navigate('Second',
      {pesan: message,}
    )
    setMessage('')
  }
  return(
    <View style={styles.container}>
      {balas != '' ? <View>
        <Text style={styles.title}>Relpy Received</Text>
        <Text>{`\t ${balas}`}</Text>
      </View> : null}
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder="Tulis Pesan Disini"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.button} onPress={Sending}>
          <Text style={styles.buttonText}>SEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function Second({route, navigation}) {
  const [reply, setReply] = useState('')
  const pesan = route.params.pesan;
  const Replying = () => {
    navigation.navigate('First', {
      balas: reply,
    });
    setReply('')
  }
  return(
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Message Received</Text>
        <Text>{'\t' + pesan}</Text>
      </View>
      <View style={styles.wrapper}>
        <TextInput style={styles.input} placeholder="Tulis Balasan Disini" onChangeText={text => setReply(text)} value={reply} />
        <TouchableOpacity style={styles.button} onPress={Replying}>
          <Text style={styles.buttonText}>REPLY</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 2,
  },
  wrapper: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin: 10,
    flexDirection: 'row',
    flex: 1,
  },
  input: {
    width: 200,
    height: 40,
    fontSize: 18,
    borderBottomWidth: 2
  },
  button: {
    backgroundColor: '#fc4444',
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
})

export default function App() {
  return(
    <NavigationContainer>
      <TwoActivities />
    </NavigationContainer>
  )
}