import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import styles from "./styles";
import { ScrollView, Keyboard, Image, TouchableOpacity } from "react-native";
import * as DbService from './services/dbservice';
import Contato from './Componentes/Contato';

// Defina o ícone do telefone. Você precisará de um ícone real ou de um local correto.
// Por exemplo: const iconTelefone = require('./caminho/para/seu/icone.png');
// Para este exemplo, vou usar apenas um ícone de texto.

const App = () => {
  const [codigo, setCodigo] = useState(""); // Use uma string vazia para o código para evitar confusão com o valor 0
  const [nome, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacao_senha, setConfirmacaoSenha] = useState("");
  const [contatos, setContatos] = useState([]);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const CONTATOS_KEY = "@contatos";

  async function processamentoUseEffect() {
    try {
      await DbService.createTable();
      await carregaDados();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
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
      if (
        senha.length < 5 ||
        !verificarMaiuscula(senha) ||
        !verificarNumero(senha)
      ) {
        Alert.alert(
          "Erro",
          "A senha deve ter no mínimo 5 caracteres, 1 maiúscula e 1 número."
        );
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

      let isNewRecord = (codigo == "");

      let newContact = {
        codigo: isNewRecord ? createUniqueId() : codigo,
        nome,
        email,
        senha,
      };

      let resposta = false;

      if (isNewRecord) {
        resposta = await DbService.adicionaContato(newContact);
      } else {
        resposta = await DbService.alteraContato(newContact);
      }
      
      if (resposta)
        Alert.alert('Sucesso!');
      else
        Alert.alert('Falha!');

      Keyboard.dismiss();
      limpaCampos();
      await carregaDados();

    } catch (e) {
      Alert.alert("Erro", e.toString());
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
    setCodigo("");
    setUserName("");
    setEmail("");
    setSenha("");
    setConfirmacaoSenha("");
  }

  async function carregaDados() {
    try {
      console.log("carregando");
      let contatos = await DbService.obtemTodosContatos();
      setContatos(contatos);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  function removerElemento(identificador) {
    Alert.alert("Atenção", "Confirma a remoção do contato?", [
      {
        text: "Sim",
        onPress: () => efetivaRemoverContato(identificador),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  async function efetivaRemoverContato(identificador) {
    try {
      await DbService.excluiContato(identificador);
      Keyboard.dismiss();
      limpaCampos();
      await carregaDados();
      Alert.alert("Contato apagado com sucesso!!!");
    } catch (e) {
        Alert.alert("Erro", e.message); 
    }
  }

  function editarContato(codigo) {
    const contato = contatos.find(contato => contato.codigo == codigo);
    
    if (contato) {
      setCodigo(contato.codigo);
      setUserName(contato.nome);
      setEmail(contato.email);
      setSenha(contato.senha);
      setConfirmacaoSenha(contato.senha);
    }

    console.log(contato);
  }

    async function efetivaExclusao() {
    try {
      await DbService.excluiTodosContatos();
      await carregaDados();
    }
    catch (e) {
      Alert.alert(e);
    }
  }

  function apagarTudo() {
    if (
      Alert.alert(
        "Muita atenção!!!",
        "Confirma a exclusão de todos os contatos?",
        [
          {
            text: "Sim, confirmo!",
            onPress: () => {
              efetivaExclusao();
            },
          },
          {
            text: "Não!!!",
            style: "cancel",
          },
        ]
      )
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tituloAgenda}>Cadastro de Usuário</Text>

      <View style={styles.areaInput}>
        <TextInput
          style={styles.input}
          placeholder="Código (preenchido automaticamente)"
          value={(codigo ?? "").toString()}
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
      </View>

      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botao} onPress={() => saveUserData()}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => limpaCampos()}>
          <Text style={styles.textoBotao}>Limpar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, styles.botaoApagarTudo]}
          onPress={() => apagarTudo()}
        >
          <Text style={styles.textoBotao}>Apagar tudo</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.listaContatos}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {contatos.length > 0 ? (
          contatos.map((contato) => (
            <Contato contato={contato} key={contato.codigo}
              removerElemento={removerElemento} editarContato={editarContato} />
          ))
        ) : (
          <Text>Nenhum contato cadastrado.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default App;
