  import { StyleSheet, Text, View } from 'react-native';
  import { TextInput, Button, Checkbox} from 'react-native-paper';
  // Importar componentes para la navegación y generación de la pila de screens
  import { NavigationContainer } from '@react-navigation/native'
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import { MaterialIcons} from '@expo/vector-icons'
  import { useState } from 'react';
  import { Usuario } from './screens/Usuario';
  // Crear constante para generar las rutas de los screens

  export let users = [
    {username:'roxy',name:'Rosa gongora',password:'11', role:1},
    {username:'sebas',name:'Sebastian orozco',password:'22', role:2}
  ]

  const rents = [
    { rentnumber: 1, username: 'roxy', platenumber: 'ABC123', rentdate: '2022-05-01' },
    { rentnumber: 2, username: 'sebas', platenumber: 'DEF456', rentdate: '2022-05-02' },
  ];
  const cars = [
    {platenumber: 'ABC123', model: 'Toyota Corolla', available: true},
    {platenumber: 'DEF456', model: 'Honda Civic', available: true},
    
  ];


  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='HomeTabs'
        >
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{title:'Sistema Prueba'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


  function HomeScreen({navigation}){
    const[username,setusername]= useState("roxy");
    const [newUsername, setNewUsername] = useState("");
    const[password,setPassword]= useState("11");
    const[errormess,setErrormess]=useState('');
    

    const handleUsernameChange = (newUsername) => {
      if (/^[a-zA-Z0-9]+$/.test(newUsername) || newUsername === '') {
        setusername(newUsername);
        setErrormess('');
      } else {
        setErrormess('Ingrese sólo letras y números');
      }
    };

    return(
      <View style={styles.container}>
        <Text style={{marginBottom:20}}>Inicio de Sesión</Text>
        <TextInput
        style={{marginBottom:10}}
        label="username"
        mode='outlined'
        left={<TextInput.Icon icon="account"/>}
        onChangeText={handleUsernameChange}
        keyboardType='alphanumeric'
        value={username}
        />
        <TextInput
        style={{marginBottom:10}}
        label="Contraseña"
        mode='outlined'
        right={<TextInput.Icon icon="eye"/>}
        onChangeText={password=>setPassword(password)}
        value={password}
        secureTextEntry
        />
        <Button 
        icon="login" 
        mode="contained" 
        onPress={() => {
          let finduser = users.find(usr => usr.username== username && usr.password==password);
          if (finduser != undefined) {
                setErrormess('')
                const{name,username}=finduser
                setNewUsername('');
                setusername('');
                setPassword('');
                navigation.navigate('Car',{name:name,username:username})
          }else if (users.some(user => user.username === newUsername)){
            setErrormess('Nombre de usuario ya existe');
          }else{
                setErrormess('Nombre de usuario INVÁLIDO (s)')
          }
        }}>
      Iniciar Sesión
    </Button>
    <Text style={{color:'red'}}>{errormess}</Text>
        
      </View>
    );
  }


  function Rent({navigation}){
    const[rentnumber ,setRentnumber]= useState("");
    const [username , setUsername] = useState("");
    const[platenumber ,setPlatenumber]= useState("");
    const[rentdate ,setRentdate]=useState('');
    const[errormess,setErrormess]=useState('');
    

    const saveRent = () => {
      // Verificar que el usuario y número de placa existan en los arreglos respectivos
      const findUser = users.find(user => user.username === username);
      const findCar = cars.find(car => car.numeroPlaca === platenumber);

      if (!findUser) {
        setErrormess('Nombre de usuario INVÁLIDO');
        return;
      }

      if (!findCar) {
        setErrormess('Número de placa INVÁLIDO');
        return;
      }

      // Verificar que la placa del carro esté disponible
      const carIsAvailable = cars.find(car => car.numeroPlaca === platenumber && car.available === true);

      if (!carIsAvailable) {
        setErrormess('El carro no está disponible');
        return;
      }

      // Validar los demás datos
      if (!rentnumber || !rentdate) {
        setErrormess('Debe llenar todos los campos');
        return;
      }

      // Guardar el alquiler y marcar el carro como no disponible
      setErrormess('');
      const newRent = {rentnumber, username, platenumber, rentdate};
      rents.push(newRent)
      console.log(rents)
      const car = cars.find(car => car.numeroPlaca === platenumber);
      car.available = false; 

      // Limpiar los campos
      
      setRentnumber('');
      setUsername('');
      setPlatenumber('');
      setRentdate('');

      // Ir a la pantalla de carros
      navigation.navigate('Car', {name: findUser.name, username});
    };

    
    return(
      <View style={styles.container}>
        <Text style={{marginBottom:20}}>Registro del alguiler</Text>
        <TextInput
        style={{marginBottom:10}}
        label="Numero de alquiler"
        mode='outlined'
        left={<TextInput.Icon icon="account"/>}
        onChangeText={setRentnumber}
          keyboardType="numeric"
          value={rentnumber}
        />
        <TextInput
        style={{marginBottom:10}}
        label="Nombre de usuario"
        mode='outlined'
        right={<TextInput.Icon icon="account"/>}
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
        style={{marginBottom:10}}
        label="Numero de placa"
        mode='outlined'
        right={<TextInput.Icon icon="car"/>}
        onChangeText={setPlatenumber}
          value={platenumber}
        />
        <TextInput
        style={{marginBottom:10}}
        label="Fecha alguiler"
        mode='outlined'
        right={<TextInput.Icon icon="calendar"/>}
        onChangeText={setRentdate}
          value={rentdate}
        />
    <Button 
          icon="content-save" 
          mode="contained" 
          onPress={saveRent}>
          Guardar
        </Button>
        <Text style={{color:'red'}}>{errormess}</Text>
      </View>
  );
  }
    function Car({ navigation, route }) {
      const [numeroPlaca, setNumeroPlaca] = useState('');
      const [marcaAuto, setMarcaAuto] = useState('');
      const [check, setCheck] = useState(true);
      const [errores, setErrores] = useState('');
      
    
      console.log(numeroPlaca)
    
      const validarPlaca = () => {
        if (!numeroPlaca) {
          setErrores('El campo placa es obligatorios');
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
    

    const buscarCar  = () =>{
      console.log(cars)
          const carro=cars.find(car=>car.numeroPlaca == numeroPlaca)
          console.log(carro)
          if(carro){
            setMarcaAuto(carro.model);
            setCheck(carro.available);
            if (!carro.available) {
              setErrores('ESTE AUTO NO SE PUEDE RENTAR')
            }
          }
    }
      const guardarAlquiler = () => {
        setErrores('');
        
        if (validarPlaca() && validarMarca()) {
  
          const newCar = {numeroPlaca: numeroPlaca, model: marcaAuto, available: check};
          cars.push(newCar)
          setMarcaAuto('');
          setCheck(false)
          setNumeroPlaca('')
        }
      };
    
      return (
        <View style={styles.container}>
          <Text style={{ marginBottom: 20 }}>Registro de carros</Text>
          <TextInput
            style={{ marginBottom: 10 }}
            label="Número de placa"
            mode="outlined"
            left={<TextInput.Icon name="car" />}
            onChangeText={setNumeroPlaca}
            value={numeroPlaca}
          />
          <TextInput
            style={{ marginBottom: 10 }}
            label="Marca del auto"
            mode="outlined"
            right={<TextInput.Icon name="car" />}
            onChangeText={setMarcaAuto}
            value={marcaAuto}
          />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text >
          state
        </Text>
        <Checkbox
        status= {check === true ? 'checked':'unchecked'}
        onPress={()=>{
          setCheck(!check)
        }}
        />
        </View>
    
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
            onPress={
            buscarCar
            }
          >
            Buscar
          </Button>
        </View>
      );
    }


    //  function Usuario({ navigation, route }) {
    //   const [username, setUsername] = useState('');
    //   const [name, setName] = useState('');
    //   const [password, setPassword] = useState('');
    //   const [errores, setErrores] = useState('');
    
    //   const usuariosRegistrados = []; // lista de usuarios registrados
    
    //   const guardarUsuario = () => {
    //     // Validar campos
    //     if (!/^[a-zA-Z0-9]+$/.test(username)) {
    //       setErrores('El nombre de usuario solo debe contener letras y números');
    //       return;
    //     }
    
    //     if (usuariosRegistrados.includes(username)) {
    //       setErrores('El nombre de usuario ya existe');
    //       return;
    //     }
    
    //     if (!/^[a-zA-Z\s]+$/.test(name)) {
    //       setErrores('El nombre solo debe contener letras y espacios');
    //       return;
    //     }
    
    //     if (!/^[a-zA-Z0-9]+$/.test(password)) {
    //       setErrores('La contraseña solo debe contener letras y números');
    //       return;
    //     }
    
    //     // Guardar usuario
    //     // ...
    
    //     setErrores(''); // limpiar errores si todo está bien
    //   };
    
    //   return (
    //     <View style={styles.container}>
    //       <Text style={{ marginBottom: 20 }}>Registro de Usuario</Text>
    //       <TextInput
    //         style={{ marginBottom: 10 }}
    //         label="Nombre de usuario"
    //         mode="outlined"
    //         left={<TextInput.Icon name="numeric" />}
    //         onChangeText={setUsername}
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
    //         onChangeText={setPassword}
    //         value={password}
    //       />
    
    //       <Button
    //         icon="content-save"
    //         mode="contained"
    //         onPress={guardarUsuario}
    //       >
    //         Guardar
    //       </Button>
    //       {errores !== '' && <Text style={{ color: 'red' }}>{errores}</Text>}
    
    //       <Text style={{ marginTop: 20 }}>Listar usuarios:</Text>
    //       <Button
    //         mode="outlined"
    //         onPress={() => {
    //           // listar los usuarios
    //           // ...
    //         }}
    //       >
    //         Listar
    //       </Button>
    //     </View>
    //   );
    // }

  function HomeTabs(){
    return(
      <Tab.Navigator
        screenOptions={{
          headerShown:false,
          tabBarActiveTintColor:'red',
          tabBarInactiveTintColor:'gray',
          tabBarActiveBackgroundColor:'orange',
          tabBarInactiveBackgroundColor:'powderblue'
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen}
        initialParams={{users: users}}
        options={{
          tabBarStyle:{display:'none'},
          tabBarIcon: (tabInfo) => (<MaterialIcons name="home" size={22}/>)
        }}/>
        <Tab.Screen name="Rent" component={Rent} options={{
          tabBarIcon: (tabInfo) => (<MaterialIcons name="apps" size={22}/>)
        }}/>
        <Tab.Screen name="Car" component={Car} options={{
          tabBarIcon: (tabInfo) => (<MaterialIcons name="chat" size={22}/>)
        }}/>
        <Tab.Screen name="Usuario" component={Usuario} options={{
          tabBarIcon: (tabInfo) => (<MaterialIcons name="chat" size={22}/>)
        }}/>
      </Tab.Navigator>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
