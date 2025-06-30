import { View, Text, TouchableOpacity ,StyleSheet,Image} from 'react-native'
import React,{useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../utils/colors'
import { TextInput } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {

    const[secureEntery , setSecureEntery] = useState(true)
    const navigation = useNavigation();

     const handleBackButton =()=>{
 navigation.navigate("HomeScreen")
    }

  return (
    <View style={styles.container}> 
        <TouchableOpacity>
      <Ionicons name={"arrow-back-outline"}color="#000" size={30} onPress={handleBackButton}/>
      <View style={styles.textContainer}>  
      <Text style={styles.textHeading}> Hey,</Text>
      <Text style={styles.textHeading}>Welcome</Text>
      <Text style={styles.textHeading}>Back</Text>
      </View>
      {/* form  */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
            <Ionicons name={'mail-outline'} size={25} color={colors.secondary}/>
            <TextInput style={styles.textInput} placeholder='Enter your email' keyboardType='email-address'/>
        </View>
        <View style={styles.inputContainer}>
        <Feather name="lock" size={25} color={colors.secondary}/>
            <TextInput style={styles.textInput} placeholder='Enter your password'   multiline={false}
        keyboardType="default"  secureTextEntry={secureEntery}/>
        <TouchableOpacity onPress={()=>{
            setSecureEntery((prev)=> !prev)
        }}>
 <SimpleLineIcons name="eye" color={colors.secondary} size={24} />
 </TouchableOpacity>

        </View>
        <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtonWrapper}>
            <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.continueText}>or continue with</Text>
      </View>
      <TouchableOpacity style={styles.googleButtonWrapper}> 
        <Image source={require("../assets/google.png")} style={styles.googleImage}/>
        <Text style={styles.googleText}>Google</Text>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Text>
            Don't have an account?
        </Text>
        <Text>Sign up</Text>
      </View>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen

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