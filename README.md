# Site du comité de quartier Fontaines Garonne

## Architecture

Il s'agit d'un site généré statiquement, c'est à dire qu'à chaque changement de
fichier (par l'interface d'administration ou depuis des `commit` sur Github),
une `action github` va s'enclencher, re-construire le site et le redéployer.

Pas de base de données, que des fichiers statiques.

## Utilisation pour l'administration

Se rendre dans le site et ajouter à la fin de l'url : `/admin/index.html`
Pour les identifiants, il convient de demander les accès au CA du comité de quartier.


## 🧞 Développement

Toutes les commandes sont définies à la racine du projet, dans `package.json`.
Depuis un terminal

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `yarn`                 | Installs dependencies                            |
| `yarn dev`             | Starts local dev server at `localhost:4321`      |
| `yarn build`           | Build your production site to `./dist/`          |
| `yarn preview`         | Preview your build locally, before deploying     |
| `yarn astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `yarn astro -- --help` | Get help using the Astro CLI                     |
