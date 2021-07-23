# Desafio 4 - N4


# Projeto Chapter 4 aglz-api-testing - Bootcamp Cypress - Turma 6 


## Bootcamp Agilizei 


![N|Solid](https://www.cypress.io/static/33498b5f95008093f5f94467c61d20ab/59c46/cypress-logo.webp)



Projeto desenvolvido para o bootcamp turma 6 agilizei - https://agilizei.com/agilizei-bootcamp/

# Desafio

  - Criar novos testes para api de treinamento
  - Subir o projeto para o github
  - Implementar a integração contínua usando o GhActions

# Passos para executar o projeto

## Tecnologias

  - Cypress @ 5.3.0
  - NodeJS @ v14.17.3
  - NPM @ 7.19.1

## Plugins

  - cypress-select-tests
  - cypress-grep
  - cy-spok
  
  # Validação dos Testes:

- Tentar alterar uma reserva inexistente -> 405
- Tentar alterar uma reserva sem token -> 403 
- Alterar uma reserva com sucesso- > 200 
- Excluir uma reserva com sucesso -> 201

## Itens do desafio: 

- Tentar alterar uma reserva com token invalido -> 403
- Tentar excluir uma reserva inexistente -> 405
- Tentar excluir uma reserva sem token -> 403
- Tentar excluir uma reserva com token invalido -> 403


## Passos para executar o projeto

  - Clonar o repositório
  - Dentro da raiz do projeto, executar o comando [npm install]
  - Executar os comandos a seguir para rodar os testes em modo headless nos navegadores:
  
    - Teste Healthcheck: [npm run test:healthcheck]
    - Teste de Contrato: [npm run test:contract]
    - Testes Funcionais: [npm run test:functional]
   

Caso deseje visualizar a reprodução dos vídeos após executar os testes em modo headless, basta acessar o diretório cypress/videos. 
A seguir seguem gifs com testes executados em modo headless via console do VScode. 

  - Testes em modo headless via console do VsCode ![headless](https://user-images.githubusercontent.com/84816792/126723238-5fe95dae-772b-4faf-8e0b-e0e45350a72a.gif)
  
  - Vídeo do teste Booking e Ping ![ping e booking](https://user-images.githubusercontent.com/84816792/126723279-94121080-2600-4481-93f7-f34ea45151f6.gif)


  
