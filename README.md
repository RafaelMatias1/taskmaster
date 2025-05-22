# 📱 TaskMaster

TaskMaster é um aplicativo mobile de gerenciamento de tarefas desenvolvido com **React Native** e **Expo**. Ele permite aos usuários adicionar, visualizar e organizar tarefas de forma intuitiva, usando uma interface moderna com navegação por abas.

---

## 🚀 Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/)** – Framework para desenvolvimento mobile com JavaScript.
- **[Expo](https://expo.dev/)** – Plataforma que facilita o desenvolvimento com React Native.
- **[React Navigation](https://reactnavigation.org/)** – Biblioteca para navegação entre telas.
- **React Native Gesture Handler**, **Reanimated**, **Screens** – Suporte à navegação fluida e gestos.

---

## 📂 Estrutura de Pastas

```
taskmaster/
├── App.js                 # Componente principal do app
├── index.js               # Ponto de entrada da aplicação
├── app.json               # Configurações do projeto Expo
├── package.json           # Dependências e scripts do projeto
├── /screens               # Telas principais da aplicação
│   ├── Tasks.js           # Tela de visualização de tarefas
│   ├── AddTask.js         # Tela de adição de novas tarefas
│   └── Profile.js         # Tela de perfil do usuário
└── /assets                # Imagens, ícones, etc.
```

---

## 📸 Funcionalidades

- ✅ **Listar Tarefas** – Veja todas as tarefas organizadas de forma clara.
- ➕ **Adicionar Tarefa** – Use um formulário simples para criar uma nova tarefa.
- 👤 **Perfil** – Visualize as informações do usuário.

---

## ▶️ Como Rodar o Projeto

### Pré-requisitos

- Node.js
- Expo CLI (`npm install -g expo-cli`)

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/RafaelMatias1/taskmaster
cd taskmaster
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o projeto:
```bash
npm start
```

4. Use o aplicativo Expo Go no seu dispositivo ou um emulador Android/iOS para escanear o QR code.

---

## 🧪 Testes

*Este projeto não possui testes automatizados incluídos até o momento.*

---

## 🛠️ Scripts Disponíveis

- `npm start` – Inicia o servidor de desenvolvimento Expo.
- `npm run android` – Abre o app no emulador Android.
- `npm run ios` – Abre o app no simulador iOS (somente Mac).
- `npm run web` – Executa o app no navegador.

---

## 📦 Dependências Principais

```json
{
  "react": "^18.x",
  "react-native": "0.73.x",
  "expo": "~50.x",
  "react-navigation": "^6.x",
  "react-native-screens": "~3.x",
  "react-native-gesture-handler": "~2.x"
}
```

---

## 🧑‍💻 Autor

Desenvolvido por [Rafael Matias Schimidt](https://github.com/RafaelMatias1). Sinta-se à vontade para contribuir!

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---
