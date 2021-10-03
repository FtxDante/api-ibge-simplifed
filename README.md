# :globe_with_meridians: ​API simplificada do IBGE :globe_with_meridians:

*Essa API foi criada com o intuito de trazer apenas informações mais relevantes  de cidades Brasileiras, tendo em vista que a API original traz uma quantidade de dados desnecessários para a maioria das utilizações.*

## Como baixar e configurar :green_book: 

Antes de iniciar certifique-se de possuir o nodeJS e o NPM instalados em em sua maquina.

:warning: **OBS: por padrão o servidor irá rodar na porta 3000 do seu localhost.**

#### Usar é muito simples! :nerd_face:

Primeiro você deve clonar o repositório para sua máquina.

```bash
git clone https://github.com/FtxDante/api-ibge-simplifed
```

Com o repositório clonado, você deve instalar as dependências do projeto.

```bash
npm install
```

Aguarde as dependências serem instaladas, depois disso é só rodar o servidor.

```bash
npm start
```

:warning: OBS: para parar o servidor é só pressionar **CTRL + C** no terminal

#### Pronto, o servidor está pronto para uso! :happy:

## Como usar o servidor :large_blue_circle:

A rota que você deve acessar é a `localhost:3000/api/city`.

### Pesquisar na API: :mag_right:

* Pesquisar todas as cidades brasileiras:

```http
localhost:3000/api/city
```

* Pesquisar cidades por sigla:

```http
localhost:3000/api/city?uf=[SIGLA]
Exemplo:
localhost:3000/api/city?uf=CE
OBS: A sigla deve está em maiúsculas e ter apenas 2 caracteres

```

* Pesquisa cidades por nome:

```http
localhost:3000/api/city?name=[NOME]
Exemplo:
localhost:3000/api/city?name=São Paulo
OBS: A API respeita acentuações, mas também pesquisa por partes.
```

* Pesquisar cidades por nome do estado:

```http
localhost:3000/api/city?state=[NOME ESTADO]
Exemplo:
localhost:3000/api/city?state=CEARÁ
OBS: A API respeita acentuações, mas também pesquisa por partes.
```

* Pesquisar cidades por região:

```http
localhost:3000/api/city?region=[NOME ESTADO]
Exemplo:
localhost:3000/api/city?region=CEARÁ
OBS: Pesquisa por partes do nome.
```

