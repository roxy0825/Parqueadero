import { View, Text, TextInput, Button} from 'react-native';
import { useState } from 'react';



export default function Car({ navigation, route }) {
  const [numeroPlaca, setNumeroPlaca] = useState('');
  const [marcaAuto, setMarcaAuto] = useState('');
  const [estado, setEstado] = useState('');
  const [errores, setErrores] = useState('');

  const validarPlaca = () => {
    if (numeroPlaca.length < 6) {
      setErrores('El número de placa debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  };

  const validarMarca = () => {
    if (marcaAuto === '') {
      setErrores('La marca del auto no puede estar vacía');
      return false;
    }
    return true;
  };

  const validarEstado = () => {
    if (estado === '') {
      setErrores('El estado del auto no puede estar vacío');
      return false;
    }
    if (estado !== 'disponible' && estado !== 'no disponible') {
      setErrores('El estado del auto debe ser "disponible" o "no disponible"');
      return false;
    }
    return true;
  };

  const guardarAlquiler = () => {
    setErrores('');
    if (validarPlaca() && validarMarca() && validarEstado()) {
      // guardar el alquiler en la base de datos
      // ...
      // redirigir a la pantalla de listar carros
      navigation.navigate('ListarCarros');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 20 }}>Registro de alquiler</Text>
      <TextInput
        style={{ marginBottom: 10 }}
        label="Número de placa"
        mode="outlined"
        left={<TextInput.Icon name="numeric" />}
        onChangeText={setNumeroPlaca}
        keyboardType="numeric"
        value={numeroPlaca}
      />
      <TextInput
        style={{ marginBottom: 10 }}
        label="Marca del auto"
        mode="outlined"
        right={<TextInput.Icon name="account" />}
        onChangeText={setMarcaAuto}
        value={marcaAuto}
      />
      <TextInput
        style={{ marginBottom: 10 }}
        label="Estado del auto"
        mode="outlined"
        right={<TextInput.Icon name="car" />}
        onChangeText={setEstado}
        value={estado}
      />

      <Button
        icon="content-save"
        mode="contained"
        onPress={guardarAlquiler}
      >
        Guardar
      </Button>
      {errores !== '' && <Text style={{ color: 'red' }}>{errores}</Text>}

      <Text style={{ marginTop: 20 }}>Listar carros:</Text>
      <Button
        mode="outlined"
        onPress={() => {
          // listar los carros
          // ...
        }}
      >
        Listar
      </Button>
    </View>
  );
}



