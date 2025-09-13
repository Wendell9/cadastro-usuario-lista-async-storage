import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f7', // Light gray background for a modern feel
        paddingTop: 50,
        alignItems: 'center',
        justifyContent: 'flex-start', // Align content to the top
        paddingHorizontal: 20,
    },
    tituloAgenda: {
        fontSize: 28, // Slightly larger font
        fontWeight: 'bold', // Make it stand out
        color: '#fff',
        backgroundColor: '#4a90e2', // A vibrant blue
        width: '100%',
        textAlign: 'center',
        paddingVertical: 15,
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden', // To ensure borderRadius works
    },
    caixaTexto: {
        borderColor: "#ccc", // Lighter border color
        borderWidth: 1,
        height: 50,
        width: '100%',
        paddingHorizontal: 15, // More padding
        borderRadius: 10,
        backgroundColor: '#fff',
        fontSize: 16,
        marginBottom: 15, // Space between inputs
    },
    botao: {
        width: '45%', // Make buttons wider
        height: 50,
        borderRadius: 25, // Pill shape for a softer look
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4a90e2',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    botaoApagarTudo: {
        backgroundColor: '#e74c3c', // A more vivid red
    },
    botoes: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '10%',
        width: '100%',
        marginTop: 20,
    },
    areaBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Space between buttons
        width: '100%',
        marginTop: 20,
    },
    textoBotao: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    listaContatos: {
        width: '100%',
        marginTop: 20,
    },
    contato: {
        backgroundColor: '#ffffff', // White background for list items
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 2,
    },
    listaNome: {
        flex: 1, // Let the name take up available space
        fontSize: 18,
        fontWeight: '500', // Medium weight
        color: '#333',
    },
    listaEmail: {
        flex: 1, // Let the name take up available space
        fontSize: 12,
        fontWeight: '500', // Medium weight
        color: '#333',
    },
    dadosBotoesAcao: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 80, // Fixed width for actions
    },
    labelCampo: {
        fontSize: 16, // Smaller label font
        color: '#555',
        marginBottom: 5,
    }
});

export default styles;