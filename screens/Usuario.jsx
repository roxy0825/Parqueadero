// import { View, Text, TextInput, Button,StyleSheet} from 'react-native';
// import { useState } from 'react';





// export default function Usuario({ navigation, route }) {
//   const [username , setuSername] = useState('');
//   const [name , setName] = useState('');
//   const [password , setaPassword] = useState('');

//   return (
//     <View style={styles.container}>
//       <Text style={{ marginBottom: 20 }}>Registro de alquiler</Text>
//       <TextInput
//         style={{ marginBottom: 10 }}
//         label="Nombre de usuario"
//         mode="outlined"
//         left={<TextInput.Icon name="numeric" />}
//         onChangeText={setuSername}
//         keyboardType="numeric"
//         value={username}
//       />
//       <TextInput
//         style={{ marginBottom: 10 }}
//         label="Nombre usuario"
//         mode="outlined"
//         right={<TextInput.Icon name="account" />}
//         onChangeText={setName}
//         value={name}
//       />
//       <TextInput
//         style={{ marginBottom: 10 }}
//         label="Contraseña de usuario"
//         mode="outlined"
//         right={<TextInput.Icon name="car" />}
//         onChangeText={setaPassword}
//         value={password}
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
