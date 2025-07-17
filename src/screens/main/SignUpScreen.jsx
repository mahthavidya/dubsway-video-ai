import { View, Text, TouchableOpacity ,StyleSheet,Image,ActivityIndicator} from 'react-native'
import React,{useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../utils/colors'
import { TextInput } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {


    const[secureEntery , setSecureEntery] = useState(true)
  const [formData, setFormData] = useState({
 
    email: '',
    password: '',
  });

// const[email , setEmail]= useState('')
// const[password , setPassword]= useState('')
const [loading, setLoading] = useState(false);
      const navigation = useNavigation();

    const handleBackButton =()=>{
 navigation.navigate("HomeScreen")
    }

    //


  const handleChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  




const handleSignUp = async () => {
  setLoading(true)
    const data = {
    
    email: formData.email,
    password: formData.password
  };
  try {
    const response = await fetch('https://peace2024-dubswayvideoai.hf.space/api/auth/signup',{
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
      );
      const result = await response.json();
    
   if (result && result.hasOwnProperty("user_id")) {
   
      alert( 'User already exists');
//         // Navigate to login or home screen
           navigation.navigate("Login")
         } else {
              
             alert( 'Already signup',"Go to login page");
            navigation.navigate("Login")
//         Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Network Error', error.message);
   }
   finally {
      setLoading(false); // Hide loader
    }
   
};

  return (
    <View style={styles.container}> 
        <TouchableOpacity>
      <Ionicons name={"arrow-back-outline"}color="#000" size={30} onPress={handleBackButton}/>
      <View style={styles.textContainer}>  
      <Text style={styles.textHeading}> Let's</Text>
      <Text style={styles.textHeading}>Get</Text>
      <Text style={styles.textHeading}>Started</Text>
      </View>
      {/* form  */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
            <Ionicons name={'mail-outline'} size={25} color={colors.secondary}/>
            <TextInput style={styles.textInput} placeholder='Enter your email' keyboardType='email-address'  value={formData.email}
        onChangeText={text => handleChange('email', text)} />
        </View>
          {/* <View style={styles.inputContainer}>
           
            <Feather name="phone" size={25} color={colors.secondary}/>
            <TextInput style={styles.textInput} placeholder='Enter your phone no' keyboardType='phone-pad' value={password} onChangeText={setPassword}/>
        </View> */}
        <View style={styles.inputContainer}>
        <Feather name="lock" size={25} color={colors.secondary}/>
            <TextInput style={styles.textInput} placeholder='Enter your password'   multiline={false}
        keyboardType="default"  secureTextEntry={secureEntery}   value={formData.password}
        onChangeText={text => handleChange('password', text)}/>
        <TouchableOpacity onPress={()=>{
            setSecureEntery((prev)=> !prev)
        }}>
 <SimpleLineIcons name="eye" color={colors.secondary} size={24} />
 </TouchableOpacity>

        </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
         <TouchableOpacity style={styles.loginButtonWrapper}>
            <Text style={styles.loginText} onPress={handleSignUp}>Sign Up</Text>
        </TouchableOpacity>)
    }

       
        <Text style={styles.continueText}>or continue with</Text>
      </View>
      <TouchableOpacity style={styles.googleButtonWrapper}> 
        <Image source={require("../assets/google.png")} style={styles.googleImage}/>
        <Text style={styles.googleText}>Google</Text>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Text>
           Already have an account!
        </Text>
        <Text>Login</Text>
      </View>
      </TouchableOpacity>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
   padding:20,
  },
  textContainer:{
    marginVertical:30
  },
  textHeading:{
    fontSize:30,
   
  },
  formContainer:{
    marginTop:20
  },
  inputContainer:{
    borderWidth:1,
    borderColor:colors.secondary,
    borderRadius:100,
    paddingHorizontal:20,
    flexDirection:'row',
    alignItems:'center',
    marginVertical:20
  },
  textInput:{
    flex:1,
    paddingHorizontal:10,
    height:50
  },
  forgotPassword:{
    textAlign:'right',
    color:colors.primary,
    marginVertical:10,
    fontSize:15
  },
  loginButtonWrapper:{
        backgroundColor:colors.primary,
        borderRadius:100,
        marginVertical:10

  },
  loginText:{
    color:colors.white,
    fontSize:18,
    textAlign:'center',
    padding:10
  },
  googleButtonWrapper:{
flexDirection:'row',
borderRadius:100,
borderWidth:2,
borderColor:colors.primary,
alignItems:'center',
padding:10,
gap:10,
justifyContent:'center',
marginTop:20

  },

  continueText:{
    textAlign:'center',
    fontSize:16,
    
  },
  googleImage:{
    height:30,
    width:20
  },
  googleText:{
 fontSize:20
  },
  footerContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:20,
    gap:2
  }
}
)