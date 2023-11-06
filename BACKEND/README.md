# Api Kanban

O Api Kanban é uma api que permite gerenciar tarefas

Este projeto é construído com Express, Jest e  Typescript utiliza a última versão do Node.js (v18).

## Pré-requisitos

Para rodar este projeto, você precisará do seguinte instalado:

- Docker (para execução via Docker)
- Node.js v18.x.x (para execução sem Docker)

## Rodando com Docker

Para iniciar o projeto com Docker, você precisará ter o Docker instalado em sua máquina. Uma vez que você tenha o Docker, siga os passos abaixo:

1. Clone o repositório para a sua máquina local:

```bash
git clone https://github.com/guilhermesteve/Quadro-Kanban.git
cd  Quadro-Kanban/BACKEND
```

2. Construa e execute o container usando docker-compose:

```bash
docker-compose up --build   
```

O aplicativo agora estará rodando na porta 5001.

## Rodando sem Docker
Se preferir rodar o projeto sem Docker, siga os passos abaixo após clonar o repositório:

1. Instale as dependências:
```bash
npm install
```

2. Inicie o projeto:
```bash
npm run dev
```
O aplicativo agora estará rodando na porta 5001.


## Testando 
```bash
npm test
```

## Uso
No projeto você encontra um arquivo api.http, instalando a extensão *Rest Client* consiguirá testar todas as rotas
da api.

Essa Api utiliza Jwt Token que deverá ser passado em todas as rotas como *Bearer token*

### Obter token

```
(POST) http://0.0.0.0:5001/login/

{ "login":"admin", "password":"admin123"}
```

## API Endpoints

(GET)       http://0.0.0.0:5001/api/task
(POST)      http://0.0.0.0:5001/api/task
(PUT)       http://0.0.0.0:5001/api/task/{taskId}
(DELETE)    http://0.0.0.0:5001/api/task/{taskId}


### Consulte o arquivo api.http
Nesse arquivo **api.http** você encontra como realizar as requisições para os endpoints

## Autores
**Guilherme Soares** - *Desenvolvimento Inicial* - [github](https://github.com/guilhermesteve)

