import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { ScrollView, Keyboard, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

// Defina o ícone do telefone. Você precisará de um ícone real ou de um local correto.
// Por exemplo: const iconTelefone = require('./caminho/para/seu/icone.png');
// Para este exemplo, vou usar apenas um ícone de texto.

const App = () => {
  const [codigo, setCodigo] = useState(''); // Use uma string vazia para o código para evitar confusão com o valor 0
  const [nome, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacao_senha, setConfirmacaoSenha] = useState("");
  const [contatos, setContatos] = useState([]);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const CONTATOS_KEY = "@contatos";

  // Carrega os dados na inicialização do componente
  useEffect(() => {
    carregaDados();
  }, []);

  const saveUserData = async () => {
    try {
      if (nome.trim() === "") {
        Alert.alert("Erro", "Por favor, preencha o nome.");
        return;
      }
      if (!validarEmail(email)) {
        Alert.alert("Erro", "Por favor, preencha um email válido");
        return;
      }
      if (senha.length < 5 || !verificarMaiuscula(senha) || !verificarNumero(senha)) {
        Alert.alert("Erro", "A senha deve ter no mínimo 5 caracteres, 1 maiúscula e 1 número.");
        return;
      }
      if (senha !== confirmacao_senha) {
        Alert.alert("Erro", "As senhas devem ser iguais");
        return;
      }
      if (parseInt(codigo, 10) < 0) {
        Alert.alert("Erro", "O código deve ser maior ou igual a 0");
        return;
      }

      // 1. Carregar a lista de contatos existente
      const existingContatosJSON = await AsyncStorage.getItem(CONTATOS_KEY);
      let contatosArray = existingContatosJSON ? JSON.parse(existingContatosJSON) : [];

      // 2. Criar ou atualizar o objeto de contato
      const isNewRecord = codigo != ""; // Se o código estiver vazio, é um novo registro
      let newContact = {
        codigo: isNewRecord ? createUniqueId() : codigo,
        nome,
        email,
        senha,
      };

      if (isNewRecord) {
        contatosArray.push(newContact); // Inclusão
      } else {
        const index = contatosArray.findIndex(c => c.codigo === codigo);
        if (index > -1) {
          contatosArray[index] = newContact; // Alteração
        } else {
          contatosArray.push(newContact); // Se não achou, adiciona como novo
        }
      }

      // 3. Salvar a lista completa de volta no AsyncStorage
      const jsonValue = JSON.stringify(contatosArray);
      await AsyncStorage.setItem(CONTATOS_KEY, jsonValue);

      // 4. Atualizar o estado e limpar o formulário
      setContatos(contatosArray);
      limpaCampos();

      Alert.alert('Sucesso', 'Dados salvos com sucesso!');
      Keyboard.dismiss();

    } catch (e) {
      Alert.alert('Erro', e.toString());
    }
  };

  function createUniqueId() {
    return Date.now().toString();
  }

  function verificarMaiuscula(str) {
    return /[A-Z]/.test(str);
  }

  function verificarNumero(str) {
    return /[0-9]/.test(str);
  }

  function validarEmail(email) {
    return emailRegex.test(email);
  }

  function limpaCampos() {
    setCodigo('');
    setUserName("");
    setEmail("");
    setSenha("");
    setConfirmacaoSenha("");
  }

  async function carregaDados() {
    try {
      const jsonValue = await AsyncStorage.getItem(CONTATOS_KEY);
      if (jsonValue != null) {
        setContatos(JSON.parse(jsonValue));
      } else {
        setContatos([]);
      }
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  function removerElemento(identificador) {
    Alert.alert('Atenção', 'Confirma a remoção do contato?',
      [
        { text: 'Sim', onPress: () => efetivaRemoverContato(identificador) },
        { text: 'Não', style: 'cancel' }
      ]
    );
  }

  async function efetivaRemoverContato(identificador) {
    try {
      const contatoAux = contatos.filter(contato => contato.codigo !== identificador);
      const jsonValue = JSON.stringify(contatoAux);
      await AsyncStorage.setItem(CONTATOS_KEY, jsonValue);
      setContatos(contatoAux);
      Alert.alert('Sucesso', 'Contato apagado com sucesso!');
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  function editarContato(identificador) {
    const contato = contatos.find(c => c.codigo === identificador);
    if (contato) {
      setCodigo(contato.codigo);
      setUserName(contato.nome);
      setEmail(contato.email);
      setSenha(contato.senha);
      setConfirmacaoSenha(contato.senha);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Código (preenchido automaticamente)"
        value={codigo.toString()}
        onChangeText={setCodigo}
        keyboardType="numeric"
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme sua senha"
        value={confirmacao_senha}
        onChangeText={setConfirmacaoSenha}
        secureTextEntry
      />
      <View style={styles.botoes}>
        <Button title="Salvar" onPress={saveUserData} />
        <Button title="Limpar" onPress={limpaCampos} />
      </View>
      <ScrollView style={styles.listaContatos} contentContainerStyle={{ alignItems: 'center' }} >
        {
          contatos.length > 0 ? (
            contatos.map((contato, index) => (
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
            ))
          ) : (
            <Text>Nenhum contato cadastrado.</Text>
          )
        }
      </ScrollView>
    </View>
  );
};

export default App;