# Sejam Bem vindos ao <strong>The Best Futebol Clube<strong> ⚽⭐

<div align="center" background-color="black">
<img src="./assets/negative_logo.png" alt="logo do projeto" height=200px aling=center>
</div>
<legenda>
<p>
The Best Futebol Club é um simulador do campeonato de futebol mais famoso do Brasil, o Brasileirão! 
crie e gerencie partidas e veja as perfomaces do seu time do coração em tempo real na tabela de classificação do temido e mais difícil campeonato do Brasil 🔥🇧🇷⭐
<br>


* Status do Projeto: 100% (Completo ✅) 

* Projeto FullStack Individual 

* Projeto desenvolvido para fins de aprendizagem 📚

* Link da aplicação <a>aqui</a> (EM MANUTENÇÃO⚠️)
</p>
<legenda/>
<div align="center">
<img src="./assets/gif%20da%20aplica%C3%A7%C3%A3o%20em%20funcionamento.gif">
</div>
<br/>

## Indice 📌
<a href="#Detalhes"> ✒️ Contexto</a>

<a href="#Projeto">💻 Como rodar o Projeto</a>

<a href="#Tecnologias">🧰Tecnologias Ultilizadas</a>

<a href="#Diario"> 🧭 Diário de Bordo</a>
<br/>

<h2 id="Detalhes">Contexto ✒️</h2>
Desenvolvi essa aplicação quando eu era aluno da <a style="color:#1EEFAF" href="https://www.betrybe.com/">Trybe</a>,
uma das melhores escolas de programação online do Brasil
no módulo deles de back-end.

nesse projeto desenvolvi uma `API Rest` em `Typescript` usando paradigma de `POO` (programação orientada a objetos) com os seus princípios `S.O.L.I.D` trabalhando encima da arquitetura `MSC` (Model Service Controller)
também usei o método `TDD` (Test Driven Development) no desenvolvimento de boa parte da aplicação, utilizei o `Docker` (docker-compose) para integrar toda a aplicação a funcionar e consumir um banco de dados `MySql` modelado por uma ORM `Sequelize`

<div align="center">
<img src="./assets/diagrama-er%20tbfc.png"/>
</div>

Essas são as rotas desenvolvidas por mim 
- rotas que possuem 🔑 precisam de um token válido para serem acessadas mais detalhes em "Como rodar o projeto" no tópico "Hora de rodar!"

- Sim essa Api poderia ter uma documentação, o motivo de não ter eu explico no tópico "Diario de Bordo"
<div align="center">
<img src="assets/rotas%20da%20aplica%C3%A7%C3%A3o.png"/>
</div>

Todo o projeto foi orquestrado atravéz de um README fornecido pela trybe, com suas devidas regras de negócios que deveriam ser implementadas nessa aplicação, um exemplo delas é um sistema de hierarquia onde para saber se um usuário é admin ou outra patente mais baixa, será necessário ser informado isso atráves de um token válido, que a própria aplicação cria, sempre que um login no sistema é bem sucedido, a aplicação pega as informações do usuário no banco de dados, e realiza a criação desse token `JWT`, a aplicação analisa esse token e dependendo da sua patente na aplicação, podera realizar alterações exclusivas de cada patente (Exemplo um usuário comum não pode alterar o placar de uma partida...só o administrador -Admin-)
por mais que essa aplicação seja fullstack, eu realizei apenas a implementação do back-end desse projeto, todo o front-end (tirando poucas coisas de estilização) a Trybe me forneceu já pronto.

<h2 id="Projeto">
Como rodar o Projeto 💻
</h2> 
<details>
 <summary>Requisitos mínimos</summary>
 Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.15.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16 --lts`
    - `nvm use 16`
    - `nvm alias default 16`

➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:
  * Use esse [link de referência para realizar a instalação corretamente no ubuntu](https://app.betrybe.com/course/back-end/docker/orquestrando-containers-com-docker-compose/6e8afaef-566a-47f2-9246-d3700db7a56a/conteudo/0006a231-1a10-48a2-ac82-9e03e205a231/instalacao/abe40727-6310-4ad8-bde6-fd1e919dadc0?use_case=side_bar);
  * Acesse o [link da documentação oficial com passos para desinstalar] (https://docs.docker.com/compose/install/#uninstallation) caso necessário.
 </details>
  <details>

 <summary>Instalação</summary> <br>
 Clone o repositório https://github.com/Rodrigo2k48/_The-Best-Futebol-Club_<br>
 
 - Em sequida, vá até a pasta raiz do projeto e rode o comando `npm install` ou `npm i` para instalar as dependências do projeto
 - Ainda na pasta raiz, rode `npm run compose:up` para subir as orquestrações Docker
 
 Por padrão, o front end ocupa a porta 3000, o back end 3001 e o db 3002

### Variaveis de Ambiente ⚙️ 
**No diretório `app/backend/` renomeie o arquivo `.env.example` para `.env` e configure os valores de acordo com o cenário do seu ambiente (credenciais de banco de dados, secrets desejadas e etc)**. Isso vai permitir que você inicialize a aplicação fora do _container_ e ela se conecte com seu banco local caso deseje.
 > `./app/backend/.env.example`
  ```txt
  JWT_SECRET=jwt_secret
  APP_PORT=3001
  DB_USER=seu_user
  DB_PASS=sua_senha
  DB_HOST=localhost
  DB_PORT=3306
  ```

  **⚠️ Não defina variável de ambiente para o nome do banco, o mesmo deve se manter com o nome `TRYBE_FUTEBOL_CLUBE`. ⚠️** 

 </details>
 
 <details>
  <summary>Hora de rodar!</summary> <br>
 
🚪**Front End:**
 - Acesse o caminho `http://localhost:3000/` no navegador que preferir;
 

🔙 **Back-end:**
 - Caso queira, é possível acessar no `http://localhost:3001/` através de algum cliente HTTP como Insomnia, Postman ou Thunder Client;
 
 
 📊 **Banco de dados:**
  - Possível acessar através do MySQL Workbench ou qualquer outro método de visualização de banco de dados;

 
🧪 **Testes:**
 - Com a aplicação em pé, basta rodar `npm test` na pasta raiz para rodar os testes de integração;

 🔑 **Token:**
 - Seguinte, para entrar na aplicação e necessário um login, vou deixar abaixo uns emails e umas senhas já registradas no banco de dados, assim que subirem a aplicação usem elas para ter a experiencia completa:
 ```bash
#  Usuario comum
email: user@user.com
senha: secret_user

# Administrator 
email: admin@admin.com
senha: secret_admin
 ```
 </details>

<h2 id="Tecnologias">Tecnologias Ultilizadas 🧰</h2>
 <details>
  <summary>Front-End</summary> 
  <br/>

   <img height="30em" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
   <img height="30em" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
   <br>
   <p>Framework e Linguagem de Programação usadas na criação das interfaces visuais e interativas da aplicação.</p>
   <br/>
   <img height="30em" src="https://img.shields.io/badge/-Axios-1b374b?style=for-the-badge&logo=Axios&logoColor=white"/>
   <p>
   Meu cliente HTTP para fazer requisições ao meu back-end.
   </p>
   <br/>
   <img height="30em" src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white"/>
   <p>
   Padronizador de boas práticas semânticas nos códigos front-end da aplicação.
   </p>
 </details>

  <details>
  <summary>Back-End</summary> 
  <br/>
   <img height="30em" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
   <p>
     Ambiente de execução do código JavaScript do lado servidor.
   </p>
   <br/>
   <img height="30em" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
   <p>ajuda a garantir a qualidade do código e a reduzir erros comuns que o javascript causa em ambiente de desenvolvimento</p>
   <br/>
  <img height="30em" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
   <p>Framework para a criação da API-Rest</p>
   <br/>
   <img height="30em" src="https://img.shields.io/badge/express-async errors-D94F78?style=for-the-badge"/>
   <p>Responsavel por me auxiliar nos tratamentos de exessões e erros no back-end</p>
   <br/>
   <img height="30em" src="https://img.shields.io/badge/MySQL-002133?style=for-the-badge&logo=mysql&logoColor=whit"/>
   <p>Banco de dados ultilizado para amarzenar os dados vindo do front-end</p>
   <br/>
   <img height="30em" src="https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue"/>
   <p>ORM ultilizado na aplicação, me permitindo usar o Javascript no backend para se conectar e operar o banco de dados.</p>
   <br/>
   <img height="30em" src="https://img.shields.io/badge/MySQL--2-002133?style=for-the-badge&logo=mysql&logoColor=whit"/>
   <p>Permite eu configurar e criar uma conexão com o banco de dados no ambiente Node</p>
   <br/>
   <img height="30em" src="https://img.shields.io/badge/JWT-jSON WEB TOKEN-9474F8?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"/> 
   <p>Responsavel por toda a parte de token, da criação até a autentificação</p>
   <br/>
   <img height="30em" src="https://img.shields.io/badge/Cors-002133?style=for-the-badge&logo=CORS&logoColor=whit"/>
   <p>
   Facilita a minha vida para o meu front-end aceitar requisições de um back-end com hospedagens diferentes da mesma origem (<a href="https://www.scaler.com/topics/nodejs/cors-in-node-js/">Cross-Origin Resource Sharing</a>)
   </p>
   <br/>
  <img height="30em" src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white"/>
   <p>
   Padronizador de boas práticas semânticas nos códigos back-end da aplicação.
   </p>
   <br/>
  <img height="30em" src="https://img.shields.io/badge/Dotenv-323330?style=for-the-badge&logo=dotenv&logoColor=yelow"/>
   <p>Para trabalhar com variaveis de ambiente</p>
 </details>
  <details>
  <summary>Testes</summary> 
  <details>
  <summary>Backend</summary>
  <br/>
   <img height="30em" src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
   <p>Framework de testes em Javascript que optei usar no axulio dos testes em back-end </p>
   <br/>
   <img height="30em" src="https://img.shields.io/badge/mocha.js-472D08?style=for-the-badge&logo=mocha&logoColor=Brown"/>
   <p>
   Para estruturar os meus testes de maneira assincrona com mais facilidade 
   </p>
   <br/>
   <img height="30em" src="https://img.shields.io/badge/chai.js-F7D4C7?style=for-the-badge&logo=chai&logoColor=black"/>
   <p>
   biblioteca de asserção que eu usei no TDD, (Poderia usar o Jest mas o chai é melhor nesse aspecto)
   </p>
     <br/>
   <img height="30em" src="https://img.shields.io/badge/chai-http-F7D4C7?style=for-the-badge&logo=chai&logoColor=black"/>
   <p>
   "Dando super poderes ao chai" para dar a capacidade de fazer testes de integração HTTP com asserções Chai.
   </p>
     <br/>
   <img height="30em" src="https://img.shields.io/badge/sinon.js-323330?style=for-the-badge&logo=sinon"/>
   <p>
    Responsavel pelos mocks e as funções dublê dos testes em back-end.
   </p>
     <br/>
   <img height="30em" src="https://img.shields.io/badge/nyc-4F3E66?style=for-the-badge&logo=nyc"/>
   <p>
    me ajuda a saber o real status do meu teste, se eu escrevi todos os casos de uso de uma determinada parte ou função do código, me ajudando a deixar ainda mais a minha aplicação mais confiavel (A imagem abaixo é graças a esse pacote npm).
   </p>
   <img alt="Porcentagem de cobertura" src="./assets/cobertura%20de%20testes.png"/>
   <p>Para ver essa mesma cobertura de testes, basta ir na pasta backend, e com o terminal usar o comando ´npm rum test:coverage´ </p>
<h5> ⚠️ Não existe testes aplicados no front-end, os motivos disso eu explico no tópico "Diário de bordo"</h5>
 </details>
 </details>

<h2 id="Diario">
Diário de Bordo 🧭
</h2>

```
08/06/2023 19:16PM - Ufa, finalmente eu consegui postar o meu primeiro projeto no github… por que dá demora?
o por que eu queria entregar algo bem feito, um projeto onde eu sei exatamente tudo oque está acontecendo,
e o meu primeiro projeto foi esse, o TFC trybe futebol clube (que apelidei de TBFC), estou orgulhoso pelos
meus feitos nesse projeto, é um bom projeto na minha opinião, mas ele não é perfeito, e isso é fantástico!
Mesmo ele tendo 100% de coveragenos testes e totalmente funcional, Enfim, consegui! Estou feliz, vou jogar
video game e tirar o dia de folga pra comemorar meu feito, e me preparar, porque esse não é o projeto final,
o The best Futebol Club vai ganhar uma versão em DDD, sim arquitetura Hexagonal ao em vez da MSC, e dessa vez
com o front-enddesenvolvido por mim, porque? Por que ele merece… foi um projeto muito incrível, e com certeza
esse daqui servirá muito bem de base para o The_best_futebol_clube_ddd,a partir daqui eu me despeço desse projeto,
não darei continuidade nesse daqui, e sim na nova versão em ddd que em breve sai.
```
