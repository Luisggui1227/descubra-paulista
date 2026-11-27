# Testes dos fluxos principais — Descubra Paulista

Roteiro de testes dos fluxos principais. Cada passo foi executado no navegador simulando o usuário (cliques e digitação), no computador (1366 px) e no celular (390 px).

**Data do teste:** 27/11/2026
**Navegador:** Chromium (automatizado com Playwright), versão de produção (`npm run build`)
**Resultado geral:** 37 de 37 passos OK, nenhum erro de JavaScript no console

## 1. Cadastro

| # | Passo | Esperado | Resultado |
|---|---|---|---|
| 1.1 | Clicar em "Criar minha conta" com tudo vazio | Aparecem 4 mensagens de erro | OK |
| 1.2 | Digitar e-mail sem @ | "Informe um e-mail válido." | OK |
| 1.3 | Senha com menos de 6 caracteres | Erro de senha mínima | OK |
| 1.4 | Confirmação diferente da senha | "As senhas não conferem." | OK |
| 1.5 | Cadastrar com `demo@paulista.com` | "Este e-mail já está cadastrado." | OK |
| 1.6 | Cadastro completo, com interesses | Vai para o login com "Conta criada!" e o e-mail preenchido | OK |

## 2. Login e área restrita

| # | Passo | Esperado | Resultado |
|---|---|---|---|
| 2.1 | Abrir `/painel` sem estar logado | Vai para o login com aviso de área restrita | OK |
| 2.2 | Login com senha errada | "E-mail ou senha incorretos." | OK |
| 2.3 | Login com a conta criada | Abre o Painel com "Olá, (nome)!" | OK |
| 2.4 | Recarregar a página (F5) | Continua logado | OK |

## 3. Recuperação de senha

| # | Passo | Esperado | Resultado |
|---|---|---|---|
| 3.1 | "Esqueci minha senha" com e-mail inválido | Mensagem de erro | OK |
| 3.2 | E-mail válido → "Simular: abrir o link" | Mostra o passo 3 (nova senha) | OK |
| 3.3 | Salvar nova senha | Volta ao login; a nova senha funciona e a antiga não | OK |

## 4. Guia turístico

| # | Passo | Esperado | Resultado |
|---|---|---|---|
| 4.1 | Buscar "forte" | Só o Forte de Pau Amarelo | OK |
| 4.2 | Filtro "Praias" | Só praias | OK |
| 4.3 | Tocar no ♥ e abrir "Favoritos" | O lugar aparece nos favoritos | OK |
| 4.4 | "Ver detalhes" → "Adicionar ao roteiro" | Muda para "Está no seu roteiro" | OK |
| 4.5 | Abrir os detalhes de um lugar com foto | A foto aparece com o crédito do autor | OK |

## 5. Agenda de eventos

| # | Passo | Esperado | Resultado |
|---|---|---|---|
| 5.1 | Filtro "Música" | Só eventos de música | OK |
| 5.2 | Marcar "Só gratuitos" | Só eventos gratuitos | OK |
| 5.3 | Escolher "Janeiro de 2027" | Só eventos de janeiro | OK |
| 5.4 | Busca sem resultado → "Limpar filtros" | Volta a mostrar os 8 eventos | OK |
| 5.5 | "+ Salvar" em um evento | Botão vira "✓ Salvo" | OK |

## 6. Meu roteiro

| # | Passo | Esperado | Resultado |
|---|---|---|---|
| 6.1 | Salvar sem nome, data ou lugares | Mensagens de erro | OK |
| 6.2 | Data no passado | "A data não pode estar no passado." | OK |
| 6.3 | Adicionar lugar, pôr horário, mover ↑↓ e remover | A lista atualiza na hora | OK |
| 6.4 | Salvar | "Roteiro salvo!" | OK |
| 6.5 | Editar o nome e salvar de novo | O novo nome aparece no Painel | OK |

## 7. Painel e integração

| # | Passo | Esperado | Resultado |
|---|---|---|---|
| 7.1 | Abrir o Painel | Números de favoritos, eventos e paradas batem com o que foi salvo | OK |
| 7.2 | Clicar em um número | Abre a página correspondente | OK |
| 7.3 | Sugestões | Mostram lugares dos interesses do cadastro | OK |

## 8. Logout

| # | Passo | Esperado | Resultado |
|---|---|---|---|
| 8.1 | Clicar em "Sair" | Vai para o login com "Você saiu da sua conta com segurança." | OK |
| 8.2 | Voltar com o botão do navegador para `/painel` | Volta para o login | OK |
| 8.3 | Entrar com outro usuário | Não aparecem os dados do usuário anterior | OK |

## 9. Celular e responsividade

| # | Passo | Esperado | Resultado |
|---|---|---|---|
| 9.1 | Abrir no celular | Nada sai para fora da tela | OK |
| 9.2 | Tocar no menu ☰ | Abre a lista de páginas e o botão Sair | OK |
| 9.3 | Tocar em uma página do menu | O menu fecha e a página abre | OK |

## Observações

- No passo 8.2, depois de entrar de novo, o site volta para a página que a pessoa tentou abrir (comportamento esperado da rota protegida).
- Os dados ficam no `localStorage`; limpar os dados do navegador apaga os usuários cadastrados (protótipo sem back-end).

## Problemas encontrados

Nenhum problema encontrado nesta rodada.
