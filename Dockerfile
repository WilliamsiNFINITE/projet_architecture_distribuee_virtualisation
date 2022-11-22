 # image de départ
 FROM alpine:3.15 as alpine

 # chemin de travail
 WORKDIR /app

 # installation des paquets système
 RUN apk add npm

 # ajout utilisateur node et groupe node
 RUN addgroup -S node && adduser -S -g node node

 # downgrade des privilèges
 USER node

 # copie des fichiers du dépôt
 COPY --chown=node:node . .

 # installation des dépendances avec npm
 RUN npm install

 # build avec npm
 RUN npm run build

 # exécution
 CMD ["npm", "run", "start"]


