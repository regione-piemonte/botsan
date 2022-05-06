# BotSan Widget

## Project Description
Webchat automatico utilizzato su alcuni servizi pubblicati sul portale Salute Piemonte capace di interpretare domande poste in linguaggio naturale e di dare una o più riposte pertinenti attraverso l'utilizzo di una piattaforma di Intelligenza Artificiale.

*BotSan Widget* è una componente di [SOL Assistenza Salute](https://github.com/regione-piemonte/SOLAssistenzaSalute)

## Configurations
Nei file di configurazione:

- `webpack/webpack.dev.env.js` (per l'installazione in locale e per la generazione della distribuzione per l'ambiente di sviluppo remoto)
- `webpack/webpack.test.env.js` (per la generazione della distribuzione per l'ambiente di test remoto)
- `webpack/webpack.prod.env.js` (per la generazione della distribuzione per l'ambiente di produzione)

valorizzare il parametro SERVER_API_URL con la URL che espone i servizi REST di Intelligenza Artificiale.

## Prerequisites
I prerequisiti per la compilazione e l'installazione della componente sono i seguenti:

### Software
- [Apache 2.4](https://www.apache.org)
- [Node.js >=8.9.0](https://nodejs.org)

## Installing
Per predisporre il progetto ed avviare il server in locale, mandare in esecuzione:

> installazione dipendenze
> ```npm install```
>
> per avviare il server locale su http://localhost:9000 e Webpack Server su http://localhost:9060 
>```npm run start```

## Deployment
Per eseguire la build del codice JS ed ottenere la distribuzione del software per l'ambiente di deployment, i comandi da utilizzare sono:
> build e dist per ambiente di sviluppo
> ```npm run webpack:build``` 
>
> build e dist per ambiente di test
> ```npm run webpack:test```
>
> build e dist per ambiente di produzione
> ```npm run webpack:prod```
>

Per tutti i comandi elencati, la distribuzione è prodotta nella directory `/build/resources/main/static/app`, il cui contenuto deve essere portato sull'ambiente di deployment.
Inoltre, nell'ambiente di deployment, in corrispondenza delle pagine HTML dove si vuole che appaia la live chat, è necessario inserire il seguente codice:

```
<html>
  <head>
    <link rel="stylesheet" href="https://<URL_ambiente_deployment>/botsan-widget.css">
  </head>
  <body>
    <div id="botsan-chat"></div>
    <script type="text/javascript" src="https://<URL_ambiente_deployment>/botsan-widget.js"></script>
  </body>
</html>
```

## Versioning
Per la gestione del codice sorgente viene utilizzata la metodologia [Semantic Versioning](https://semver.org/).

## Authors
Gli autori del **BotSan Widget** sono:

- [Angelo Salonia](mailto:angelo.salonia@consulenti.csi.it)
- [Carlo Peraudo](mailto:carlo.peraudo@csi.it)

## Copyrights
(C) Copyright 2022 Regione Piemonte

## License
Questo software è distribuito con licenza MIT.

Consulta il file [LICENSE](LICENSE) per i dettagli sulla licenza.

In [Bom.csv](Bom.csv) è presente l'elenco delle librerie esterne utilizzate dalla BotSan Widget.
