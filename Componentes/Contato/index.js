import { Text, TouchableOpacity, View} from "react-native";
import styles from './styles';
import { FontAwesome, Entypo } from "@expo/vector-icons";

export default function Contato({ contato, removerElemento, editarContato }) {
    return(
    <View style={styles.contato} key={contato.codigo}>

    <Text style={styles.listaNome}>{contato.nome}</Text>
    <Text style={styles.listaEmail}>{contato.email}</Text>

    <View style={styles.dadosBotoesAcao}>
        <TouchableOpacity onPress={() => removerElemento(contato.codigo)}>
            <FontAwesome name="remove" size={32} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => editarContato(contato.codigo)}>
            <Entypo name="edit" size={32} color="black" />
        </TouchableOpacity>
    </View>
  </View>
    )
}
