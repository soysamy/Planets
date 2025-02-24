import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const PlanetCard = ({ planet, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: planet.image }}
        style={styles.image}
      />
      <Text style={styles.name}>{planet.name}</Text>
    </TouchableOpacity>
  );
};


// The styling could go in a separate file but for simplicity of this test I will keep it like this.
const styles = StyleSheet.create({
  card: { 
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 10, 
    backgroundColor: "#222", 
    margin: 5, 
    borderRadius: 10 
  },
  image: { width: 100, height: 100, borderRadius: 50 },
  name: { 
    color: "#fff", 
    textAlign: "center", 
    marginTop: 5, 
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default PlanetCard;