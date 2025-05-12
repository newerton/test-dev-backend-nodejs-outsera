# Golden Raspberry API

## Descrição
API RESTful para leitura da lista de indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards.

## Como rodar o projeto

1. Instale as dependências:

```sh
npm install
```

2. Inicie a aplicação:

```sh
npm run start
```

A API estará disponível em `http://localhost:3000`.

## Endpoints

### GET `/producers/intervals`
Retorna o(s) produtor(es) com maior e menor intervalo entre dois prêmios consecutivos.

#### Exemplo de resposta:
```json
{
  "min": [
    {
      "producer": "Producer Name",
      "interval": 1,
      "previousWin": 2000,
      "followingWin": 2001
    }
  ],
  "max": [
    {
      "producer": "Another Producer",
      "interval": 10,
      "previousWin": 1990,
      "followingWin": 2000
    }
  ]
}
```

## Testes de integração

Para rodar os testes:

```sh
npm test
```

## Observações
- O banco de dados é em memória (SQLite), não requer instalação externa.
- Os dados são carregados do arquivo `movielist.csv` ao iniciar a aplicação.

## Versões
- 1.0.0: Versão em Javascript (https://github.com/newerton/test-dev-backend-nodejs-outsera/tree/1.0.0)
- 2.0.0: Versão em Typescript (https://github.com/newerton/test-dev-backend-nodejs-outsera/tree/2.0.0)