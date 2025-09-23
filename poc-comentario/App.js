import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AvaliacaoScreen() {
  const [rating, setRating] = useState(0); // número de estrelas
  const [comment, setComment] = useState("");
  const [modalVisible, setModalVisible] = useState(true); // controla a tela de notificação
  const [step, setStep] = useState(1); // 1 = escolher estrelas, 2 = comentário

  const handleStarPress = (value) => {
    setRating(value);
    setStep(2); // depois que o usuário escolher, vai para os comentários
  };

  const handleAvaliar = () => {
    console.log("Avaliação enviada:", rating, "Comentário:", comment);
    setModalVisible(false);
  };

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.box}>
          {step === 1 && (
            <>
              <Text style={styles.title}>Avalie o serviço do profissional</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <TouchableOpacity key={value} onPress={() => handleStarPress(value)}>
                    <Ionicons
                      name={value <= rating ? "star" : "star-outline"}
                      size={40}
                      color="#f1c40f"
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.info}>Selecione de 1 a 5 estrelas</Text>
            </>
          )}

          {step === 2 && (
            <>
              <Text style={styles.title}>Deixe um comentário (opcional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Escreva seu comentário..."
                value={comment}
                onChangeText={setComment}
                multiline
              />

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#27ae60" }]}
                onPress={handleAvaliar}
              >
                <Text style={styles.buttonText}>
                  {comment.trim() ? "Avaliar e comentar" : "Avaliar sem comentar"}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  info: {
    textAlign: "center",
    fontSize: 14,
    color: "#555",
  },
  button: {
    backgroundColor: "#f39c12",
    padding: 14,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    minHeight: 70,
    marginBottom: 15,
  },
});
