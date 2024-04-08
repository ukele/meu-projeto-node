# Especifica a imagem base
FROM node:14

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos do projeto para o contêiner
COPY . .

# Instala as dependências do projeto
RUN npm install

# Expõe a porta que o app vai rodar
EXPOSE 3000

# Comando para iniciar o app
CMD ["node", "app.js"]