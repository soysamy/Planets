import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { fetchPlanets } from "../../data/PlanetsAPI";
import PlanetCard from "../../components/PlanetCard";

const HomeScreen = ({ navigation }) => {
  const [planets, setPlanets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // We load the planes data info here in the home screen
  useEffect(() => {
    const loadPlanets = async () => {
      const data = await fetchPlanets();
      setPlanets(data);
    };
    loadPlanets();
  }, []);

  // We filter the values here
  const filteredPlanets = planets.filter(planet => planet.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={styles.container}>
      {planets.length === 0 ? (
        <ActivityIndicator size="large" style={styles.ActivityIndicator} />
      ) : (
        <>
          <TextInput
            style={styles.search}
            placeholder="Search planets..."
            placeholderTextColor="#888"
            onChangeText={setSearchQuery}
          />
          <FlatList
            data={filteredPlanets}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PlanetCard
                planet={item}
                onPress={() => navigation.navigate("Detail", { planet: item })}
              />
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 10 },
  search: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  ActivityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  }
});

export default HomeScreen;