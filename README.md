# Compte rendu du projet d'architecutre distribuée et virtualisation.

Ce rapport documente la manière dont j'ai réalisé le projet du cours sur l'architecture distribuée et la virtualisation.
Voici le lien du repository du projet : https://github.com/WilliamsiNFINITE/projet_architecture_distribuee_virtualisation

## Sommaire

* [TD 1](#td-1)
* [TD 2](#td-2)
* [TD 3](#td-3)
* [TD 4](#td-4)
* [Usage](#usage)


## TD 1

- 1 : Mettez en place votre environnement de travail

Pour ce premier TD j'ai installé les éléments requis pour le bon fonctionnemenbt du projet (docker, fly.io, wsl).
Dans un second temps, j'ai initialisé le repository en y installant les dépendances avec npm, puis, j'ai executé les tests.

- 2 : Que pouvez-vous dire sur le fichier `package.json` ? Sur le fichier `package-lock.json` ?

Le fichier `package.json` contient le nom des dépendances du projets. Le fichier `package-lock.json` désigne les éléments nécessaires à tous les packages et dépendances avec plus de détail.

- 3 : L'installation de systeminformation avec la commande `npm install systeminformation` a ajouté cette dépendance dans le repository. 

```json
  "dependencies": {
    "systeminformation": "^5.12.13"
  }
```

`devDependency` designe les dépendances qui sont utilisées en local dans le cadre du développement de l'application et qui peuvent ne pas être utilisées en production. `dependency` sont les dépendances qu'on utilise pendant la production de l'application. 

- 4 : 

Difficulté : Appréhender les nouveaux outils. 

- 5 Testez le fonctionnement de votre application. Vous pouvez utiliser l’outil curl. À votre avis, pourquoi utilise-t-on ce formalisme pour construire l’URL de l’API ? 
A mon avis cet URL désigne une API dont la version est la numéro 1 et qui sert à recevoir les informations du système. 

- 6 Écrivez un jeu de tests pour votre application avec Jest, et vérifiez son exécution. Pourquoi écrit-on un tel jeu de tests ?
On écrit un jeu de test pour s'assurer du comportement de notre application. 


## TD 2

- 5 Analyse  

```console
PS C:\Users\Williams\Documents\GitHub\projet_architecture_distribuee_virtualisation> docker image history sysinfo-api:0.0.1
IMAGE          CREATED          CREATED BY                                      SIZE      COMMENT
4b0511d1ff4b   12 minutes ago   CMD ["npm" "run" "start"]                       0B        buildkit.dockerfile.v0
<missing>      12 minutes ago   RUN /bin/sh -c npm run build # buildkit         33.2kB    buildkit.dockerfile.v0
<missing>      12 minutes ago   RUN /bin/sh -c npm install # buildkit           511kB     buildkit.dockerfile.v0
<missing>      12 minutes ago   COPY . . # buildkit                             118MB     buildkit.dockerfile.v0
<missing>      12 minutes ago   USER node                                       0B        buildkit.dockerfile.v0
<missing>      32 minutes ago   RUN /bin/sh -c addgroup -S node && adduser -…   4.68kB    buildkit.dockerfile.v0
<missing>      32 minutes ago   RUN /bin/sh -c apk add npm # buildkit           81.9MB    buildkit.dockerfile.v0
<missing>      32 minutes ago   WORKDIR /app                                    0B        buildkit.dockerfile.v0
<missing>      3 months ago     /bin/sh -c #(nop)  CMD ["/bin/sh"]              0B
<missing>      3 months ago     /bin/sh -c #(nop) ADD file:f77e3f51f020890d2…   5.59MB
```

![image](https://user-images.githubusercontent.com/91114817/203292872-a4b26568-6608-4878-b11f-7468bacd1d55.png)

- 6 : 

![image](https://user-images.githubusercontent.com/91114817/203299616-d8e2cba5-fc6d-4eea-b0f5-fa23f17de902.png)

Diminuer la taille de notre image (Ici, on a fait une économie de 150Mb) sert à optimiser l'espace qu'elle occupe. En pratique cela se montre utile lorsqu'on travail dans un environnement limité en ressource mémoire.


- 8 Déployez un nouveau conteneur à partir de votre image publiée. Quelle commande utilisez-vous ?
On utilise la commande [`docker create`](https://docs.docker.com/engine/reference/commandline/create/#options)


## TD 3

Le workflow suivant a été écrit afin de satisfaire les demandes : activation lors d'un push sur la branche main, installations de node et des dépendances, lancement des tests et build de l'application.
```yaml

# workflow
name: CI
# event that triggers the workflow
# on push branch main
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
    #tests
    test:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v2
        - uses: actions/setup-node@v2
          with:
            node-version: '14'
        - name: install dependencies
          run: npm install
        - name: run tests
          run: npm run test

    #build
    build:
        needs: test
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v2
        - uses: actions/setup-node@v2
          with:
            node-version: '14'
        - name: install dependencies
          run: npm install
        - name: build app
          run: npm run build


```

On vérifie la bonne execution est le résultat du workflow en le plaçant dans un fichier .github/workflows et en allant dans l'onglet 'Actions' depuis notre repertoire github. 

![image](https://user-images.githubusercontent.com/91114817/204484789-32635474-a1fd-4644-8535-37d07e4d5280.png)


## TD 4

Le déploiement de l'application n'a pas été effectué



## Usage

Install development dependencies:

```
npm install
```

Lint, then format `src/*.ts` by making in-place fixes:

```
npm run lint && npm run format
# or:
npm run fix
```

Run unit test suites:

```
npm run test
```

View coverage of unit tests:

```
npm run test:coverage
```

Build `src/*.ts` files into `dist/*.js` files:

```
npm run build
```

Serve `dist/index.js` using `node` (for production):

```
npm run start
```

Monitor file changes and serve `src/index.ts` using `nodemon` with `ts-node` (for development):

```
npm run watch
```
