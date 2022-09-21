-> API PARA SCRAPPING E CANAIS NO TELEGRAM

- TODO - Reformular a integração com telegram.
- TODO - Subir para a Nuvem e Deploy
- TODO - Canal de Passagem


--------- Created : Maikon Weber e Douglas Moreira -----------------------------

- Instalando dependências para executar o Projeto.

     Para iniciar o projeto deve utilizar Node em qualquer versão disponivel e válida para projeto.
recomendo o uso do node 17 e npm 8.
     Deve instalar o node e npm após a instalação deve ir até a pasta raiz e exeutar o seguinte comando.

*** NPM INSTALL 
     > Este comando recebe todas as atualizações do projeto.

     Para rodar este projeto é necessário alguns serviços com banco de dados e redis e sistema de mensagaria.
para isso utilizamos o DOCKER para subir este serviços antes de inicir o projeto.
Pode rodar o seguinte comando depois de installar o DOCKER E DOCKER COMPOSE.
     

*** NPM RUN BUIL_DATABASE
     > Este comando executa o serviço do Postgres e RabbitMQ e Redis
          As credencias de acesso ao database se encontram no arquivosd docker-compose.yml

     O Database Postgres serve para armazenar os resultados que o scrap envia para server.
então tem a necessidade de rodar a migração do schema. 

+++ Necessidade de Introduzir o Sequelize para Migrations.
     Para migrar o Schema vocẽ pode utilizar o comando 
     psql -U roullet -d roullet -h roullet -p 5532 -f sql.sql -W
          passwors: roullet 

     Com isso já será possível ter o ambiente disponível...

Sobre os Arquivos: 

     classScrapper.js

     Este arquivo utiliza o puppeteer para abrir o Browser fazer login na Smash, e fazer scrapping das informações 
da Roletas e Cards utilizando a url da pagina é nessario instanciar a class e executar o metódo init.
     &&&  BUG REPORT : A evolution por algum motivo necessita que browser esteja em foco.
     por este motivo tenho trabalhado para descobrir este possível bug.
          $$$ Para não enviar o mesmo número muitas vezes ao servidor ele utiliza o redis e compara
          os valores salvo com os scrappados, e só envia caso valor for alterado.


     consumerFinished.js

     Este arquivo é uma class para fazer a conexão com RabbitMQ e processar as estráteǵias configuradas e desenvolvidas.     
sendo algumas funções realizam :
     > Pegar o Ultimo valor da Roleta no Database Válido.
     > Categorizar os Numeros em Colunas, Blocos, Vermelhos e etc.
     > Passar este valor e comparar com Padroes Necesários.
     > Salvar e Enviar este valores pelo REDIS e Posterior mente pelo RabbitMQ.

     ObjectDetect.js
     
     Este arquivo se conecta a fila do RabbitMQ e recebe o sinal e faz um fluxo de envio para Telegram.
Ele recebe um elemento filter que também vem do Database. O elemento Filter possue o filtros de possível roleta e 
estrategias e msg que poderam ser enviada ao canal,
     $$ Melhoria >  É possivel fazer mais funções internar para envio de img, sticker e etc


--------------------------------------------------------------------------------------------------------------------

----------------------------------------xxxx------------------------------------------------------------------------

--------------------------------------------------------------------------------------------------------------------






