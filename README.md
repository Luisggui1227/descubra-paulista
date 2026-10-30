# 🏖️ Descubra Paulista

> Turismo, cultura e lazer da cidade do Paulista na palma da mão.

Projeto da disciplina **Front-End Frameworks** — Uninassau
**Grupo 9 • Tema 4 — Turismo, Cultura e Lazer**

---

## 📌 O problema

Paulista tem praias, patrimônio histórico e cultura popular, mas quem mora ou visita a cidade não encontra essas informações reunidas em um só lugar.

- **Informação espalhada:** pontos turísticos, horários e formas de chegar ficam dispersos em redes sociais e sites desatualizados.
- **Eventos invisíveis:** shows, feiras e festas comunitárias são divulgados de última hora, e muita gente só fica sabendo depois.
- **Cultura pouco valorizada:** a história local e os espaços culturais são pouco conhecidos até pelos próprios moradores.
- **Pequenos negócios sem vitrine:** artesãos e empreendedores culturais têm dificuldade de alcançar turistas e o público local.

### Quem é afetado

| Público | Necessidade |
|---|---|
| Moradores | Descobrir opções de lazer perto de casa e saber o que está acontecendo na cidade |
| Visitantes e turistas | Ter um guia confiável: o que visitar, quando ir e como montar um roteiro |
| Empreendedores culturais | Ser encontrados por quem procura experiências, produtos e serviços locais |

## 💡 A solução

O **Descubra Paulista** é um aplicativo web que reúne em um só lugar o que fazer na cidade, com uma área restrita onde o usuário pode salvar preferências, roteiros e favoritos.

Visão completa do produto:

1. Guia digital com pontos turísticos, históricos e culturais
2. Agenda de eventos, shows, feiras e atividades comunitárias
3. Roteiros personalizados de turismo e lazer
4. Mapa interativo com fotos e curiosidades locais
5. Espaço para empreendedores culturais divulgarem serviços e produtos

## ✅ Features mínimas (escopo da primeira versão)

- [ ] **Login**: acesso à área restrita com e-mail e senha
- [ ] **Esqueci minha senha**: recuperação de acesso por e-mail
- [ ] **Logoff**: saída segura que encerra a sessão
- [ ] **Cadastro de usuário**: nome, e-mail, senha e interesses
- [ ] **Página de conteúdo do tema**: guia de pontos turísticos e culturais de Paulista

## 👥 Equipe

| Integrante | Responsabilidade principal |
|---|---|
| Luis Guilherme de Moraes Melo | Login + rotas protegidas da área restrita • coordenação do Trello |
| Arthur Ramos Pita | Cadastro de usuário (formulário e validações) |
| Esdras Victor Carvalho da Silva | Esqueci minha senha (solicitação e redefinição) |
| Kelvys Marcelo Soares Silva | Logoff + layout base (cabeçalho, menu e rodapé) |
| Kauã Henrique de Lima Santos | Página de conteúdo: guia de pontos turísticos |

Tarefas compartilhadas: README, apresentação e testes finais de cada feature.

## 🛠️ Tecnologias

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) para páginas públicas e área restrita
- Git e GitHub para versionamento
- Trello para gestão das tarefas

## 🗂️ Organização

- **Trello:** https://trello.com/b/yf9iLEdc
- **Fluxo de trabalho:** uma branch por feature (`feature/login`, `feature/cadastro`, `feature/esqueci-senha`, `feature/logoff`, `feature/guia`), com Pull Request revisado por outro integrante antes do merge na `main`.

## ▶️ Como rodar o projeto

> Disponível a partir da próxima entrega, quando o código for adicionado.

```bash
git clone https://github.com/Luisggui1227/descubra-paulista.git
cd descubra-paulista
npm install
npm run dev
```

## 📅 Cronograma

| Semana | Entrega |
|---|---|
| 1 (30/10/2026) | Apresentação do problema, quadro do Trello e repositório com README |
| Próximas | Protótipo das telas → autenticação (login, cadastro, esqueci a senha, logoff) → página de conteúdo |
