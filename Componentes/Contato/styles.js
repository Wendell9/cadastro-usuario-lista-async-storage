import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#f0f4f7", // Light gray background for a modern feel
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "flex-start", // Align content to the top
    paddingHorizontal: 20
  },
  tituloAgenda: {
    fontSize: 28, // Slightly larger font
    fontWeight: "bold", // Make it stand out
    color: "#fff",
    backgroundColor: "#6000faff", // A vibrant blue
    width: "100%",
    textAlign: "center",
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden", // To ensure borderRadius works
  },
  caixaTexto: {
    borderColor: "#ccc", // Lighter border color
    borderWidth: 1,
    height: 50,
    width: "100%",
    paddingHorizontal: 15, // More padding
    borderRadius: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 15, // Space between inputs
  },
  botao: {
    width: "100%", // Make buttons wider
    height: 50,
    borderRadius: 2, // Pill shape for a softer look
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2d0de6ff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  botaoApagarTudo: {
    backgroundColor: "#e74c3c", // A more vivid red
  },
  botoes: {
    flexDirection: "column",
    justifyContent: "center",
    gap: "10%",
    width: "100%",
    marginTop: 20,
  },
  areaBotoes: {
    flexDirection: "column",
    justifyContent: "center", // Space between buttons
    alignItems: "center",
    gap: "7%",
    width: "100%",
  },
  textoBotao: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  listaContatos: {
    width: "100%",
    height:"10%",
    marginTop: 20,
  },
  contato: {
    backgroundColor: "#ffffff", // White background for list items
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2,
  },
  listaNome: {
    flex: 1, // Let the name take up available space
    fontSize: 18,
    fontWeight: "500", // Medium weight
    color: "#333",
  },
  listaEmail: {
    flex: 1, // Let the name take up available space
    fontSize: 12,
    fontWeight: "500", // Medium weight
    color: "#333",
  },
  dadosBotoesAcao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: 80, // Fixed width for actions
  },
  labelCampo: {
    fontSize: 16, // Smaller label font
    color: "#555",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1, // Largura da borda
    borderColor: "black", // Cor da borda (cinza claro)
    borderRadius: 8, // Borda arredondada (opcional)
    padding: 10, // Espaçamento interno para o texto não colar na borda
    width: "100%",
    height: 40,
  },
  areaInput: {
    width: "100%",
    height: "35%",
    gap: "5%",
  }
});

export default styles;
