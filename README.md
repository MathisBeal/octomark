# 🚀 Octomark

<div align="center">
	<img src="https://raw.githubusercontent.com/MathisBeal/octomark/refs/heads/main/assets/octomark-logo.svg" alt="Octomark Logo" style="max-width:80%;  min-width: 60%; display:block; margin:auto;"/>
</div>

**Transformez vos fichiers Markdown en pages HTML élégantes avec le rendu exact de GitHub.**

`octomark` est un outil en ligne de commande (CLI) qui utilise l'API officielle de GitHub pour convertir vos fichiers `.md`. Il récupère et met en cache dynamiquement les feuilles de style de GitHub pour garantir que votre rendu est toujours identique à celui que vous voyez sur `github.com`.

---

## ✨ Points forts

- **Rendu Officiel** : Utilise l'API GitHub Markdown pour une fidélité de 100%.
- **Thèmes Variés** : Supporte tous les thèmes officiels (light, dark, dark_dimmed, etc.).
- **Cache Intelligent** : Les styles CSS sont stockés localement et mis à jour toutes les 24h.
- **Syntax Highlighting** : Coloration syntaxique complète pour tous les langages supportés par GitHub.
- **Alertes GitHub** : Support des blocs `> [!NOTE]`, `> [!TIP]`, etc.

---

## 🛠️ Installation

Vous pouvez installer `octomark` globalement via npm :

```bash
npm install -g octomark
```

Ou l'utiliser directement avec `npx` :

```bash
npx octomark README.md
```

---

## 📖 Utilisation

### Conversion simple

Génère un fichier `README.html` avec le thème clair par défaut :

```bash
octomark README.md
```

### Choisir un thème

```bash
octomark README.md --theme dark_high_contrast
```

### Liste des thèmes disponibles

```bash
octomark --list
```

### Gestion du cache

Si vous voulez forcer la mise à jour des styles ou vider le cache :

```bash
octomark README.md --force   # Force le téléchargement du CSS
octomark --clean             # Supprime tout le cache local
```

---

## ⚙️ Options du CLI

| Option    | Raccourci | Description                                     | Défaut         |
| --------- | --------- | ----------------------------------------------- | -------------- |
| `--theme` | `-t`      | Définit le thème GitHub à utiliser.             | `dark`         |
| `--list`  | `-l`      | Affiche la liste des thèmes supportés.          | -              |
| `--out`   | `-o`      | Nom du fichier HTML de sortie.                  | `[input].html` |
| `--force` | `-f`      | Ignore le cache et télécharge le CSS à nouveau. | `false`        |
| `--clean` | -         | Vide le dossier de cache `.css-cache`.          | -              |
| `--token` | -         | GitHub Token pour augmenter les limites d'API.  | -              |

---

## 🏗️ Comment ça marche ?

`octomark` repose sur deux piliers principaux de l'écosystème GitHub :

1. [**L'API GitHub Markdown**](https://docs.github.com/en/rest/markdown/markdown?apiVersion=2022-11-28#render-a-markdown-document) : Votre texte est envoyé aux serveurs de GitHub pour être transformé en HTML. C'est ce qui garantit que les fonctionnalités comme les tables, les task-lists ou les alertes sont rendues exactement comme sur le site.
2. [**`generate-github-markdown-css`**](https://github.com/sindresorhus/generate-github-markdown-css) : Cette excellente bibliothèque (par @sindresorhus) est utilisée pour extraire les styles CSS réels de GitHub. `octomark` les télécharge et les injecte directement dans la balise `<style>` du fichier HTML généré pour un résultat "tout-en-un" sans dépendances externes.

---

## 🔑 Limites de l'API (Rate Limiting)

Sans authentification, l'API GitHub limite les requêtes à **60 par heure**. Si vous convertissez de nombreux fichiers, vous pouvez utiliser un **Personal Access Token** :

```bash
octomark file.md --token YOUR_GITHUB_TOKEN
```

---

## 📄 Licence

Ce projet est sous licence **MIT**.
Réalisé avec ❤️ par MathisBEAL.

---
