import { View } from 'react-native';

import { Button, Text, TextInput } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";


import { styleAlert, styleInput, styles } from '../assets/css/styles';
import { useState } from 'react';
import { users } from '../App';

export const Usuario = ({ navigation }) => {
  const [ error, setError ] = useState('');

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      name: '',
      password: ''
    }
  });

  const onSubmit = ({ username, password, name }) => {
    const findUser = users.find(user => user.username === username && user.password === password);
    if (findUser) {
      setError(`El username ${username}, ya esta registrado`);
    } else {
      users.push({
        username,
        name,
        password
      });
      console.log(users)
      setError('')
      reset();
      navigation.navigate('Car');
    }

  }

  return (
    <View style={styles.container}>
      {
        error !== '' && <Text style={{ color: 'red', marginBottom: 20 }}>{error}</Text>
      }
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styleInput.widthInput}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            mode='outlined'
            label="Name"
            left={<TextInput.Icon icon='account-circle' />}
          />
        )}
        name="name"
      />
      {errors.name?.type === 'required' && <Text style={styleAlert.alert}>El name es obligatorio</Text>}
      {errors.name?.type === 'pattern' && <Text style={styleAlert.alert}>El name no permite caracteres especiasles</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[a-zA-Z0-9\ áéíóúÁÉÍÓÚñÑ\s]*$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styleInput.widthInput}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            mode='outlined'
            label="Usuario"
            left={<TextInput.Icon icon='account' />}
          />
        )}
        name="username"
      />
      {errors.username?.type === 'required' && <Text style={styleAlert.alert}>El username es obligatorio</Text>}
      {errors.username?.type === 'pattern' && <Text style={styleAlert.alert}>El username no permite caracteres especiasles</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[a-zA-Z0-9\ áéíóúÁÉÍÓÚñÑ\s]*$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styleInput.widthInput}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            secureTextEntry
            mode='outlined'
            label="Password"
            left={<TextInput.Icon icon='lock' />}
          />
        )}
        name="password"
      />
      {errors.password?.type === 'required' && <Text style={styleAlert.alert}>El password es obligatorio</Text>}
      {errors.password?.type === 'pattern' && <Text style={styleAlert.alert}>El username no permite caracteres especiasles</Text>}

      <View
        style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 20, margin: 20, justifyContent: 'space-evenly', width: '80%' }}
      >
        <Button
          icon="content-save" mode="contained"
          buttonColor='#2b78fd'
          onPress={handleSubmit(onSubmit)}
        >
          Registrar
        </Button>
        <Button
          buttonColor='#dc3545'
          icon="keyboard-return" mode="contained"
          onPress={() => navigation.navigate('Logout')}
        >
          Volver
        </Button>
      </View>


    </View>
  )
}