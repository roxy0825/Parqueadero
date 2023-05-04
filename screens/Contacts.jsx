// import { View, Text, TextInput, Button,StyleSheet} from 'react-native';
// import { useState } from 'react';


// export default function Car({ navigation, route }) {
//   const [numeroPlaca, setNumeroPlaca] = useState('');
//   const [marcaAuto, setMarcaAuto] = useState('');
//   const [estado, setEstado] = useState('');
  


//   return (
//     <View style={styles.container}>
//       <Text style={{ marginBottom: 20 }}>Registro de Carro</Text>
//       <TextInput
//         style={{ marginBottom: 10 }}
//         label="Número de placa"
//         mode="outlined"
//         left={<TextInput.Icon name="numeric" />}
//         onChangeText={setNumeroPlaca}
//         keyboardType="numeric"
//         value={numeroPlaca}
//       />
//       <TextInput
//         style={{ marginBottom: 10 }}
//         label="Marca del auto"
//         mode="outlined"
//         right={<TextInput.Icon name="account" />}
//         onChangeText={setMarcaAuto}
//         value={marcaAuto}
//       />
//       <TextInput
//         style={{ marginBottom: 10 }}
//         label="Estado del auto"
//         mode="outlined"
//         right={<TextInput.Icon name="car" />}
//         onChangeText={setEstado}
//         value={estado}
//       />

//       <Button
//         icon="content-save"
//         mode="contained"
//         onPress={guardarAlquiler}
//       >
//         Guardar
//       </Button>
//       {errores !== '' && <Text style={{ color: 'red' }}>{errores}</Text>}

//       <Text style={{ marginTop: 20 }}>Listar carros:</Text>
//       <Button
//         mode="outlined"
//         onPress={() => {
//           // listar los carros
//           // ...
//         }}
//       >
//         Listar
//       </Button>
//     </View>
//   );
  
// }
// export const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         backgroundColor:'#fff',
//         alignItems:'center',
//         justifyContent:'center'
//     },
// })



