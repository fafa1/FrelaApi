### Documentação para o teste BACK END

Instalar os pacotes necessário para o funcionamento do serviço com o comando: _npm i_ 

logo em seguida executar o passo abaixo.

Para rodar o back-end executar o comanto: _npm start_


Foi criado um model (Users) contendo o _nome_, _email_, _password_ e os _token_ para armazenar os tokens gerados.
Foram criadas também funçoes de pre save, para gerar a encriptação da senha, hash.
Gerartoken para gerar o token de autenticação e findByCredenciais buscando o email e senha do usuario cadastrado.


Foi utilizado o mongodb atlas um serviço do mongo em nuvem, o ambiente foi configurado no arquivo _.env_, cuja a senha vem depois dos dois ponto  __cervejaapi__

No pacote package.json, foi configurado o start do projeto, sendo executado o arquivo env com as configurações do banco, e o nodemon (hotHeload)


No arquivo user.js foi configurado as rotas de _cadastro_ e _login_ para realizar o cadastro do usuário e login

a rota _home_, foi testado apenas no postman,
necessario enviar o token - __Bearer {token} não consegui testar com o front-end.

