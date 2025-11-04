# 📱 Sistema Mobile de Controle de Turmas e Atividades – **Athena**

**Projeto desenvolvido como exercício de fixação e aprofundamento em JavaScript (React Native / Expo).**
O sistema tem como objetivo permitir que professores organizem suas turmas e atividades, promovendo maior controle sobre o planejamento educacional, especialmente em regiões que enfrentam falta de recursos tecnológicos.

---

## 🎯 **Objetivo**

Desenvolver um **sistema mobile** baseado no SAEP 2023.1 que possibilite:

* O **login de professores** autenticados;
* O **cadastro e listagem de turmas**;
* O **registro, edição e exclusão de atividades** para cada turma;
* O **logout seguro** do usuário autenticado.

---

## 🧩 **Contexto**

A ausência de sistemas de controle pedagógico em escolas de regiões remotas compromete a gestão do conhecimento e o acompanhamento das atividades.
O **Athena** surge como uma solução mobile simples, moderna e funcional que oferece aos professores uma ferramenta para organizar suas turmas e atividades com eficiência e praticidade.

---

## 🧠 **Funcionalidades**

### 🔐 1. Tela de Autenticação

* Campos: **E-mail** e **Senha**
* Botão **Entrar**: autentica no banco de dados via **Supabase**
* Redireciona para a tela principal do professor se a autenticação for válida
* Caso contrário, exibe mensagem de erro e mantém o usuário na tela de login
* **Credenciais de acesso padrão para testes:**

  * **E-mail:** [professor@gmail.com](mailto:professor@gmail.com)
  * **Senha:** 123456

---

### 🏫 2. Tela Principal do Professor

* Exibe o **nome do professor autenticado**
* Botão **Sair** (logout e destruição da sessão)
* Botão **Cadastrar Turma**
* Lista de turmas com:

  * **Número e nome da turma**
  * **Botão “Excluir”** com confirmação
  * **Botão “Visualizar”** para acessar as atividades

---

### 📝 3. Cadastro de Turma

* Campo de texto para o **nome da turma**
* Botão **Cadastrar**
* Salva no banco de dados associando a turma ao professor logado

---

### 📋 4. Listagem de Turmas

* Mostra todas as turmas pertencentes ao professor autenticado
* Permite:

  * **Exclusão de turmas**
  * **Acesso à tela de atividades da turma**

---

### ❌ 5. Exclusão de Turma

* Solicita **confirmação** antes de excluir
* Impede a exclusão se houver atividades associadas
* Exibe a mensagem:

  > “Você não pode excluir uma turma com atividades cadastradas.”

---

### 📚 6. Tela de Atividades da Turma

* Exibe o **nome da turma** e do **professor**
* Lista todas as atividades cadastradas
* Botões:

  * **Editar**
  * **Excluir**
  * **Cadastrar nova atividade**

---

### 🧾 7. Cadastro, Edição e Exclusão de Atividades

* Cada atividade contém:

  * **Número da atividade**
  * **Descrição**
* O professor pode:

  * **Cadastrar novas atividades**
  * **Editar descrições existentes**
  * **Excluir atividades**

---

### 🚪 8. Logout

* O botão **Sair** encerra a sessão do professor e o redireciona à tela de login.

---

## ⚙️ **Tecnologias Utilizadas**

| Categoria      | Tecnologia                                   |
| -------------- | -------------------------------------------- |
| Framework      | **React Native (Expo)**                      |
| Backend / Auth | **Supabase**                                 |
| Linguagem      | **JavaScript**                               |
| Interface      | **React Native Paper**, **React Navigation** |
| Armazenamento  | **Supabase Database**                        |
| Estilo         | **Styled Components** / **CSS-in-JS**        |
| Ícones         | **React Native Vector Icons**                |
| Alertas        | **SweetAlert / Alert API**                   |

---

## 🧑‍💻 **Como Executar o Projeto**

```bash
# Clonar o repositório
git clone https://github.com/seuusuario/athena-app.git

# Entrar na pasta do projeto
cd athena-app

# Instalar dependências
npm install

# Iniciar o projeto
npx expo start
```

**Credenciais de Teste:**

```
E-mail: professor@gmail.com
Senha: 123456
```

---

## 📸 **Screenshots**

| Tela       | Imagem                                 |
| ---------- | -------------------------------------- |
| Login      | ![Login](./Imagens%20APP/WhatsApp%20Image%202025-11-04%20at%2015.56.34%20(1).jpeg)          |
| Atividades | ![Atividades](./Imagens%20APP/WhatsApp%20Image%202025-11-04%20at%2015.56.34.jpeg) |
| Home | ![Atividades](./Imagens%20APP/WhatsApp%20Image%202025-11-04%20at%2015.56.35%20(1).jpeg) |

---

## 🧾 **Licença**

Este projeto foi desenvolvido para fins educacionais no contexto do **exercício de fixação e aprofundamento – Jogo em JS (SAEP 2023.1)**.

📘 **Autor:** Kaique Ferreira E Yago Moraes
📅 **Ano:** 2025
📍 **Instituição:** SENAI – Desenvolvimento de Sistemas