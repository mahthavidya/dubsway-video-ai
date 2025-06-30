
import { Button, StyleSheet, Text, View ,FlatList,Image} from 'react-native'
import React,{useEffect, useState} from 'react'
// import { saveDocuments } from '@react-native-documents/picker'
import * as DocumentPicker from 'expo-document-picker'



const Home = () => {

  const [files, setFiles] = useState([])

  //
// const selectDoc = async()=>{
// //   try{[]
//  const doc= await DocumentPicker.getDocumentAsync({
//    type:'application/pdf'
//  })
//  console.log(doc)
//  if(!doc.canceled){
//   const {name, size,uri} = doc.assets[0]
//  }
//  console.log(doc)
// // console.log(doc)
// //   }
// // catch(err){


// }
// console.log("hello")
// alert("hello")
//}

const pickDocument = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*', // e.g. 'application/pdf' for only PDFs
      copyToCacheDirectory: true,
      multiple: true
    });

    if (result.canceled) {
      console.log('User cancelled document picker');
      return;
    }
    setFiles((prev) => [...prev, ...result.assets]);
  } catch (err) {
    console.error('Error picking document:', err);
  }
 
};

useEffect(()=>{
console.log("files",files)
},[files])

  return (
    <View style={styles.container}>
      <Text style={{color:'black',fontSize:28,textAlign:'center',marginVertical:20,marginTop:70}}> Document Picker
      
      </Text>
     <View>
      <Button title="select document" onPress={pickDocument}></Button>
     </View>
     <FlatList
        data={files}
        keyExtractor={(item, index) => item.uri + index}
        renderItem={({ item }) => (
          
        <View style={styles.gridItem}>
          <Image source={{ uri: item.uri}} style={styles.gridThumbnail} />
          {/* <Text >
            📄 {item.name} ({(item.size / 1024).toFixed(1)} KB)
          </Text> */}
           <Text>{item.name}</Text>
           </View>
        )}
      />
    </View>

    
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
   gridThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
})

