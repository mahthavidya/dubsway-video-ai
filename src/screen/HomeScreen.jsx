import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
// ✅ Correct
import React, { useState } from 'react';


const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleSignUp = () =>{
    navigation.navigate("Signup")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dubsway</Text>
      <Image
        source={require("../assets/banner.png")}
        style={styles.bannerImage}
      />
      <Text style={styles.title}>Lorem Ipsum dolor.</Text>
      <Text style={styles.subTitle}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButtonWrapper} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign-up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  title: {
    color: colors.primary,
    fontSize: 28,
    marginVertical: 20,
    marginTop: 70,
  },
  bannerImage: {
    height: 280,
    width: 300,
    marginTop: 20,
  },
  title: {
    fontSize: 35,
    paddingHorizontal: 70,
    textAlign: "center",
    color: colors.primary,
    marginTop: 30,
  },
  subTitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: "center",
    color: colors.primary,
    marginTop: 10,
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.primary,
    width: "90%",
    height: 60,
    borderRadius: 100,
  },
  loginButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
  },
  signUpButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  signUpButtonText: {
    fontSize: 18,
  },
});
