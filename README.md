# 📱 TaskMaster – Gerenciador de Tarefas em React Native

TaskMaster é um aplicativo de gerenciamento de tarefas desenvolvido como parte de um teste técnico para a vaga de Desenvolvedor Front-End React Native. O projeto oferece autenticação de usuários e funcionalidades completas para gerenciamento de tarefas.

---

## 🚀 Tecnologias Utilizadas

- **React Native (Expo)** – Estrutura principal do app
- **Context API** – Gerenciamento global de autenticação e tarefas
- **React Navigation** – Navegação entre telas
- **Styled Components** – Estilização moderna e isolada
- **React Hook Form** – Manipulação e validação de formulários
- **Mock de API (local state)** – Simulação de requisições de autenticação e tarefas

---

## ✅ Funcionalidades Implementadas

### 📌 Autenticação
- Tela de Login
- Tela de Cadastro
- Validação de credenciais
- Logout
- Exclusão de conta

### 📌 Gerenciamento de Tarefas
- Listagem de tarefas
- Criação de novas tarefas
- Edição de tarefas existentes
- Exclusão de tarefas
- Marcação como concluída

> Todas essas operações são simuladas com mocks locais, preparando o sistema para futura integração com back-end real.

---

## 🧩 Arquitetura do Projeto

O projeto utiliza uma arquitetura modular baseada em **contextos separados** para autenticação e tarefas:

taskmaster/
├── App.js # Setup de navegação e providers
├── /contexts
│ ├── AuthContext.js # Lógica de login, registro e logout
│ └── TaskContext.js # CRUD e controle de tarefas
├── /screens # Telas principais
│ ├── LoginScreen.js
│ ├── RegisterScreen.js
│ ├── HomeScreen.js
│ ├── TaskFormScreen.js
│ └── ProfileScreen.js
├── /components # Componentes reutilizáveis (em progresso)
├── /assets # Ícones, imagens
└── README.md

---

## 🔐 Integração com Back-End (Mock)

Para simular as requisições de API:
- Autenticação é gerenciada localmente com `useState` (mock de token incluído)
- Tarefas são manipuladas via `TaskContext`, simulando endpoints de CRUD
- Estrutura preparada para substituição por serviços de API reais
- Tratamento de erros e estados de carregamento incluídos

### Exemplos de Mock
```js
// Criação de usuário
const userData = { name, email, password, token: 'mock-token-' + Date.now() };

// Criação de tarefa
const newTask = { id: Date.now(), title, description, completed: false };

📦 Instalação e Execução
Pré-requisitos
Node.js  (`v22.14.0`)

Expo CLI (npm install -g expo-cli)

git clone https://github.com/RafaelMatias1/taskmaster
cd taskmaster
npm install
npm start

Use o aplicativo Expo Go no seu smartphone ou um emulador Android/iOS para escanear o QR code.

---

🛠️ Scripts Disponíveis
npm start – Inicia o servidor de desenvolvimento

npm run android – Executa no emulador Android

npm run ios – Executa no simulador iOS (apenas em macOS)

npm run web – Abre no navegador

---

🤖 Decisões Técnicas
Context API: Por simplicidade e escalabilidade para um app de médio porte

Formik substituído por React Hook Form: Menor boilerplate e melhor integração com React Native

Sem Redux: Context API cobre as necessidades sem overhead adicional

Arquitetura por responsabilidade: Separação clara entre lógicas de autenticação e tarefas

Mock de dados: Facilita testes locais e prepara para APIs reais

---

📋 Desafios e Soluções
| Desafio                         | Solução                                             |
| ------------------------------- | --------------------------------------------------- |
| Redirecionamento após login     | Refatoração na navegação condicional em `App.js`    |
| Estado persistente de tarefas   | Implementado controle via `TaskContext`             |
| Feedback visual de carregamento | Uso de `isLoading` em contexto com delays simulados |

---

📲 APK / Demonstração
(📦 Inclua aqui o link para download do APK ou QR Code de build em produção via Expo)

---

👨‍💻 Autor
Desenvolvido por Rafael Matias Schimidt
Email: [rafamatiasschmidt@email.com]