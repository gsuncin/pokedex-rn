import Skeleton from "@/components/Skeleton";
import { Link } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { PokemonInterface } from "./interfaces/Pokemon";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  skeletonCard: {
    marginBottom: 12,
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  skeletonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  skeletonLeft: {
    width: 4,
    height: "100%",
    borderRadius: 2,
    marginRight: 10,
    overflow: "hidden",
  },
  skeletonText: {
    height: 18,
    flex: 1,
    borderRadius: 6,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 8, // if your RN version supports it
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
  },
  pokemonCard: {
    marginBottom: 12,
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    textTransform: "capitalize",
  },
});

const PokemonList = () => {
  const [pokemons, setPokemons] = React.useState<PokemonInterface[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [pokemonAmount, setPokemonAmount] = React.useState(10);

  React.useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1000&order_by=name"
      );
      const data = await response.json();
      setPokemons(data.results);
      setPokemonAmount(data.count);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Total Pokémon Available:</Text>

        {loading ? (
          <Skeleton
            shape="circle"
            style={{ width: 24, height: 24 }}
            backgroundColor="#D1D5DB"
            foregroundColor="#F9FAFB"
          />
        ) : (
          <Text style={styles.headerText}>{pokemonAmount}</Text>
        )}
      </View>
      {loading ? (
      Array.from({ length: 10 }).map((_, i) => (
        <View key={`sk-${i}`} style={styles.skeletonCard}>
          <View style={styles.skeletonRow}>
            {/* left blue bar placeholder */}
            <Skeleton
              style={styles.skeletonLeft}
              backgroundColor="#CBD5E1"
              foregroundColor="#F8FAFC"
            />

            {/* name placeholder */}
            <Skeleton
              style={styles.skeletonText}
              backgroundColor="#D1D5DB"
              foregroundColor="#F9FAFB"
            />
          </View>
        </View>
      ))
    ) : (
      pokemons.map((pokemon, index) => (
        <Link
          href={{
            pathname: "/PokemonDetail",
            params: { name: pokemon.name, url: pokemon.url },
          }}
          asChild
          key={pokemon.name ?? index}
        >
          <Pressable style={styles.pokemonCard}>
            <Text style={styles.pokemonName}>{pokemon.name}</Text>
          </Pressable>
        </Link>
      ))
    )}
    </ScrollView>
  );
};

export default PokemonList;
