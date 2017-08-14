# Node vs Python

Esse repositório tem como objetivo server de um mini benchmark para comparar o desempenho de uma pequena API que deve validar um json e salvar numa fila do RabbitMQ

## Endpoint

```
POST /api/tasks
```
As diferentes aplicações recebem o json enviado nesse endpoint, validam seu conteúdo (o json deve possuir a chave "foo") e enviam o json inteiro para o RabbitMQ, retornando o status 201 em caso de sucesso e 400 em caso de json inválido.

## Aplicações

Foram desenvolvidos versões nas seguintes linguagens e frameworks:

* Python + Flask (http://localhost:5000)
* Nodejs + Express (http://localhost:8000)
* Nodejs + Restify (http://localhost:8080)

## Executando

É necessário iniciar todos os containers:

``` bash
docker-compose up
```

O painel administrativo do RabbitMQ está disponível em http://localhost:15672/

```
Usuário: user
Senha: pass
```

Depois, podemos usar o aplicativo [ab](https://httpd.apache.org/docs/2.4/programs/ab.html) para testar as diferentes versões com uma carga paralela de requisições.

Os comandos abaixo enviam 2000 requisições (com dez paralelas por vez) para cada app.

``` bash
ab -p post-data -T application/json -c 10 -n 2000 http://localhost:5000/api/tasks
ab -p post-data -T application/json -c 10 -n 2000 http://localhost:8000/api/tasks
ab -p post-data -T application/json -c 10 -n 2000 http://localhost:8080/api/tasks
```

## Resultados

Com base nos testes superficiais realizados com o ab obtivemos o seguinte ranking de desempenho:

1. Nodejs + Restify
+ Nodejs + Express
+ Python + Flask
