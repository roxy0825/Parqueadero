import { View ,Text,TextInput,Button} from "react-native";

export default function Usuario ({navigation,route}){
    const[username,setUsername]= useState("");
  const [name , setName ] = useState("");
  const[password,setPassword]= useState("");
 
    return(
        <View style={styles.container}>
        <Text style={{marginBottom:20}}>Inicio de Sesión</Text>
        <TextInput
        style={{marginBottom:10}}
        label="nombre usuario"
        mode='outlined'
        left={<TextInput.Icon icon="account"/>}
        onChangeText={setUsername}
        keyboardType='alphanumeric'
        value={username}
        />
         <TextInput
        style={{marginBottom:10}}
        label="nombre Completo"
        mode='outlined'
        left={<TextInput.Icon icon="account"/>}
        onChangeText={setName}
        keyboardType='alphanumeric'
        value={name}
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
         
        }}>
      Iniciar Sesión
    </Button>
    <Text style={{color:'red'}}>{errormess}</Text>
        
      </View>
    );
  }
