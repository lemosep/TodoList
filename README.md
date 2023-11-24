# TodoList

Lista de lembretes feita em JavaScript, é um simples webapp que cria tarefas e as organiza de acordo com a data selecionada.

## Ferramentas Utilizadas

Para este projeto, optei pelas seguintes ferramentas:

- **Front End**:
  - Templating com [Pug](https://pugjs.org/api/getting-started.html) para _Server-Side Rendering_.
  - Estilização com CSS.
- **Back-End**:
  - JavaScript
    - Framework [Express](https://expressjs.com/).
    - [Prisma](https://www.prisma.io/) ORM.
    - Verificação de tipos com [Zod](https://zod.dev/?id=introduction).
  - Banco de dados relacional [PostgreSQL](https://www.postgresql.org/).

## Premissas assumidas

- O usuário tem acesso a um browser.

- O usuário possui conhecimento em PostgreSQL, e está configurado em sua máquina.

- Os usuário possui NodeJS instalado em sua máquina, e sabe iniciar projetos de terceiros.

## Decisões de projeto

- Decidi fazer uma aplicação ao lado do servidor (Server-Side Rendering) pois o cliente estará recebendo uma página HTML completa já renderizada pelo servidor, isso implica que o conteúdo é carregado mais rápidamente pois não precisa esperar o carregamento de ferramentas JavaScript no front-end. E já que estou fazendo uma lista de tarefas, a experiência do usuário deve ser voltada para a adição e remoção de tarefas de forma limpa, e SSR garante que o display do usuário seja atualizado rapidamente.

- Utilização do framework Express para facilitar o desenvolvimento do servidor web.

- Utilização do Prisma como ORM para facilitar a interação com o banco de dados. Como é uma aplicação no lado do servidor (SSR) que se comunica com um banco de dados, Prisma é uma ótima escolha por sua facilidade de interação com o banco de dados e recursos avançados de ORM.

- Utilização do Zod para realizar a validação de tipos e garantir a integridade dos dados. JavaScript é uma linguagem de [tipagem fraca](https://www.ibm.com/docs/en/rbd/9.5.1.2?topic=parts-loose-types), e isso pode acarretar em erros que o desenvolvedor não percebe durante o desenvolvimento, tornando o código mais propenso á erros. Nese contexto, Zod atua como uma ferramenta de validação de _schemas_, promovendo assim uma maior segurança e consistência ao programar em JavaScript.

## Instruções para executar o sistema

### Configurando o Banco de dados

Antes de começar, certifique-se de que PostgreSQL está instalado em sua máquina. Depois, crie um novo banco de dados via `psql` ou por alguma interface, como [PGAdmin](https://www.pgadmin.org/). Aqui está um exemplo via psql:

```shell script
$ psql
```

Para criar uma nova base de dados, faça o seguinte:

```shell script
$ CREATE DATABASE todolist
```

### Executando o código

#### Clonando o repositório

Abra o repositório no Github, copie a URL de clone e digite o seguinte comando em seu terminal:

```bash
$ git clone https://github.com/lemosep/TodoList.git
```

Depois disso, navegue até o diretório do projeto:

```bash
$ cd  TodoList
```

#### Instalando as dependências necessárias

Para executar a aplicação, é necessário instalar os módulos dependentes, para isso rode o seguinte comando em seu terminal:

```bash
$ npm install
```

#### Configurando variáveis de ambiente

Para a aplicação funcionar, são necessárias algumas variáveis de ambiente. Crie um arquivo `.env` no diretório principal e siga o padrão do arquivo `.env.example`.

#### Inicializando o Prisma

Para que o Prisma ORM consiga fazer queries para o seu banco de dados, é necessário inicializá-lo via terminal pelo seguinte comando:

```bash
$ npx prisma generate
```

Para aplicar as migrations do Prisma no seu banco de dados local, rode:

```bash
$ npx prisma migrate dev
```

#### Iniciando a aplicação

Para iniciar a aplicação, rode:

```bash
$ npm run dev
```

#### Acessando no navegador

Acesse o app no navegador web através do endereço `http:://localhost:PORT`, sendo PORT o valor definido no arquivo `.env`.
