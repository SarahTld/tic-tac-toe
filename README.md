# 🎮 Tic Tac Toe

Un jeu de Tic Tac Toe moderne et interactif développé avec Nuxt 3 et Vue 3, offrant une expérience de jeu fluide avec une interface utilisateur élégante et des niveaux de difficulté variés.

## ✨ Fonctionnalités

### 🎯 **Modes de jeu**
- **vs IA** : Jouez contre une intelligence artificielle avec 4 niveaux de difficulté
- **vs Joueur** : Jouez à deux sur le même écran

### 🎨 **Interface moderne**
- Design glassmorphism avec effets de transparence
- Interface responsive et adaptative
- Animations fluides et transitions
- Logo personnalisé avec grille 3x3 stylisée
- Favicon SVG personnalisé

### 🏆 **Fonctionnalités avancées**
- **4 niveaux de difficulté** :
  - 🌱 **Facile** : IA qui joue aléatoirement
  - ⚡ **Moyen** : IA qui joue intelligemment 50% du temps
  - 🔥 **Difficile** : IA qui utilise une stratégie avancée
  - 💀 **Impossible** : IA invincible avec algorithme minimax complet
- **Statistiques** : Suivi des victoires, défaites et matchs nuls
- **Sauvegarde** : Les statistiques sont sauvegardées localement
- **Compteur de coups** : Suivi du nombre de coups joués

### 🎮 **Logique de jeu**
- Détection automatique des victoires
- Gestion des matchs nuls
- IA intelligente avec différents niveaux
- Validation des mouvements
- Affichage du statut de jeu en temps réel

## 🛠️ Technologies utilisées

- **Frontend** : Nuxt 3, Vue 3
- **Styling** : Tailwind CSS
- **Stockage** : LocalStorage
- **Langage** : TypeScript
- **Design** : Glassmorphism, CSS Grid, Flexbox

## 🚀 Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- npm, yarn, pnpm ou bun

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone [URL_DU_REPO]
cd tic-tac-toe
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

L'application sera accessible sur `http://localhost:3000`

## 📦 Build pour la production

```bash
npm run build
npm run preview
```

## 🎮 Comment jouer

### Règles du jeu
1. Le joueur 🔵 (X) commence toujours
2. Cliquez sur une case vide pour placer votre symbole
3. Alignez 3 symboles identiques pour gagner
4. Si toutes les cases sont remplies sans gagnant, c'est un match nul

### Contrôles
- **Nouvelle partie** : Recommence une partie
- **Mode de jeu** : Bascule entre IA et joueur
- **Niveau de difficulté** : Choisissez entre 4 niveaux (visible en mode IA)

### Niveaux de difficulté
- **🌱 Facile** : Parfait pour débuter
- **⚡ Moyen** : Défi équilibré
- **🔥 Difficile** : Pour les joueurs expérimentés
- **💀 Impossible** : L'IA ne peut jamais perdre

### Statistiques
- Les victoires de 🔵 (X)
- Les matchs nuls 🤝
- Les victoires de 🔴 (O)

## 🎨 Fonctionnalités techniques

### Design moderne
- Interface glassmorphism avec backdrop-blur
- Dégradés de couleurs cyan et rose
- Animations CSS fluides
- Logo SVG personnalisé
- Favicon SVG haute qualité

### Responsive design
- Interface optimisée pour mobile, tablette et desktop
- Grille de jeu adaptative
- Boutons et contrôles optimisés pour le tactile
- Layout en 3 colonnes sur grands écrans

### Performance
- Rendu optimisé avec Vue 3
- Animations fluides
- Chargement rapide
- Algorithme minimax optimisé

### Accessibilité
- Support du clavier
- Contrastes optimisés
- Textes lisibles
- Interface intuitive

## 🔧 Configuration

### Personnalisation
Les couleurs et styles peuvent être modifiés dans :
- `assets/css/tailwind.css` : Styles personnalisés
- `tailwind.config.js` : Configuration Tailwind
- `app.vue` : Interface principale
- `public/favicon.svg` : Favicon personnalisé

---

## 👩‍💻 Auteur

**Développé avec ❤️ par Sarah T**

---

**Amusez-vous bien ! 🎮✨**
