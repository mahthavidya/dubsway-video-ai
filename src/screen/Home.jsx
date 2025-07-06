
import { Button, StyleSheet, Text, View ,FlatList,Image,TouchableOpacity} from 'react-native'

// ✅ Correct
import React, { useState } from 'react';

// import { saveDocuments } from '@react-native-documents/picker'
import * as DocumentPicker from 'expo-document-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
        1                                                                                       


const Home = () => {
 const [pdfFiles, setPdfFiles] = useState([]);
  const [files, setFiles] = useState([])
  const[token,setToken] = useState(null)



// const pickDocument = async () => {
//   try {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: '*/*', // e.g. 'application/pdf' for only PDFs
//       copyToCacheDirectory: true,
//       multiple: true
//     });

//     if (result.canceled) {
//       console.log('User cancelled document picker');
//       return;
//     }
//     // setFiles((prev) => [...prev, ...result.assets]);
//      setPdfFiles((prev) => [...prev, ...result.assets]);
//   } catch (err) {
//     console.error('Error picking document:', err);
//   }
 
// };



  const pickDocument = async () => {
    const userId = 123
    try {
      const res = await DocumentPicker.getDocumentAsync({
      type: '*/*', // e.g. 'application/pdf' for only PDFs
      copyToCacheDirectory: true,
      multiple: true
    });

       // File object structure
      const fileToUpload = {
        uri: res.uri,
        name: res.name,
        type: res.type || 'application/pdf',
      };

     // FormData with user_id and file
      const formData = new FormData();
      formData.append('user_id', userId); // 👈 Integer field
      formData.append('file', fileToUpload); // 👈 File field

      const response = await fetch('https://peace2024-dubswayvideoai.hf.space/api/auth/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();
      console.log('Upload response:', result);

      alert('Upload Success', 'File uploaded successfully');

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('Upload error:', err);
        Alert.alert('Upload Failed', err.message);
      }
    }
  };


const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { flex: 2 }]}>{item.name}</Text>
      <TouchableOpacity
        style={[styles.cell, styles.button]}
        // onPress={() => navigation.navigate('PDFViewer', { uri: item.uri })}
      >
        <Text style={styles.buttonText}>View</Text>
        
      </TouchableOpacity>
      
        <TouchableOpacity
        style={[styles.cell, styles.button]}
        // onPress={() => navigation.navigate('PDFViewer', { uri: item.uri })}
      >
        <Text style={styles.buttonText}>Delete</Text>
        
      </TouchableOpacity>
    </View>
  );

React.useEffect(()=>{
console.log("files",files)
},[files])


  React.useEffect(() => {
    console.log('useEffect is called when component mounts');
    const verifyToken = async () => {
      try{
 const value = await AsyncStorage.getItem('userToken');
 if(value !== null){
    console.log("token",value)
setToken(value)
 }

      }
      catch(e){
        console.log("Failed to retireve token",e)
      }
     };

    
    verifyToken();
   
  },[]);



  React.useEffect(()=>{
if(token && token !== null){
  console.log("token",token)
}
  },[token])
  //  useEffect(() => {
  //   console.log('useEffect is called when component mounts');

  //   // Simulating an async action
  //   const fetchData = async () => {
  //     console.log('Fetching data...');
  //     // e.g., await fetch('...')
  //   };

  //   fetchData();
  // }, []); // empty dependency = runs once on mount


  return (
    // <View style={styles.container}>
    //   <Text style={{color:'black',fontSize:28,textAlign:'center',marginVertical:20,marginTop:70}}> Document Picker
      
    //   </Text>
    //  <View>
    //   <Button title="select document" onPress={pickDocument}></Button>
    //  </View>
    //  <FlatList
    //     data={files}
    //     keyExtractor={(item, index) => item.uri + index}
    //     renderItem={({ item }) => (
          
    //     <View style={styles.gridItem}>
    //       {/* <Image source={{ uri: item.uri}} style={styles.gridThumbnail} /> */}
    //       <Text >
    //         📄 {item.name} ({(item.size / 1024).toFixed(1)} KB)
    //       </Text>
       
    //        </View>
    //     )}
    //   />
    // </View>

     <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
        <Text style={styles.uploadText}>Upload PDF</Text>
      </TouchableOpacity>

      <View style={styles.tableHeader}>
        <Text style={[styles.cell, { flex: 2, fontWeight: 'bold' }]}>File Name</Text>
        <Text style={[styles.cell, { fontWeight: 'bold' }]}>Action</Text>
      </View>

      <FlatList
        data={pdfFiles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No PDF files uploaded.</Text>}
      />
    </View>
  );
  
}

export default Home

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
    
//   },
//    gridThumbnail: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//   },
// })
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  uploadButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  uploadText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 20, color: '#999' },
});

