# Quadro Kanban

O Quadro Kanban é uma aplicação web que permite gerenciar tarefas  usando o método Kanban.

Este projeto é construído com React e utiliza a última versão do Node.js (v18).

## Pré-requisitos

Para rodar este projeto, você precisará do seguinte instalado:

- Docker (para execução via Docker)
- Node.js v18.x.x (para execução sem Docker)
- você precisará iniciar antes a api que está na pasta BACKEND

## Rodando com Docker

Para iniciar o projeto com Docker, você precisará ter o Docker instalado em sua máquina. Uma vez que você tenha o Docker, siga os passos abaixo:

1. Clone o repositório para a sua máquina local:

```bash
git clone https://github.com/guilhermesteve/Quadro-Kanban.git
cd  Quadro-Kanban/FRONTEND
```

2. Construa e execute o container usando docker-compose:

```bash
docker-compose up --build   
```

O aplicativo agora estará rodando na porta 3000 e pode ser acessado através do navegador em http://localhost:3000.

## Rodando sem Docker
Se preferir rodar o projeto sem Docker, siga os passos abaixo após clonar o repositório:

1. Instale as dependências:
```bash
npm install
```

2. Inicie o projeto:
```bash
npm start
```
O aplicativo agora estará rodando na porta 3000 e pode ser acessado através do navegador em http://localhost:3000.

## Autores
**Guilherme Soares** - *Desenvolvimento Inicial* - [github](https://github.com/guilhermesteve)

