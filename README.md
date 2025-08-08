# 🎮 Tic Tac Toe

Un jeu de Tic Tac Toe moderne et interactif développé avec Nuxt 3 et Vue 3, offrant une expérience de jeu fluide avec une interface utilisateur élégante.

## ✨ Fonctionnalités

### 🎯 **Modes de jeu**
- **vs IA** : Jouez contre une intelligence artificielle
- **vs Joueur** : Jouez à deux sur le même écran

### 🎨 **Interface moderne**
- Design responsive et adaptatif
- Mode sombre/clair automatique
- Animations fluides et transitions
- Interface utilisateur intuitive

### 🏆 **Fonctionnalités avancées**
- **Statistiques** : Suivi des victoires, défaites et matchs nuls
- **Annulation** : Possibilité d'annuler le dernier coup
- **Sauvegarde** : Les statistiques sont sauvegardées localement
- **Compteur de coups** : Suivi du nombre de coups joués

### 🎮 **Logique de jeu**
- Détection automatique des victoires
- Gestion des matchs nuls
- IA simple avec choix aléatoire
- Validation des mouvements

## 🛠️ Technologies utilisées

- **Frontend** : Nuxt 3, Vue 3
- **Styling** : Tailwind CSS
- **Stockage** : LocalStorage
- **Langage** : TypeScript

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
1. Le joueur X commence toujours
2. Cliquez sur une case vide pour placer votre symbole
3. Alignez 3 symboles identiques pour gagner
4. Si toutes les cases sont remplies sans gagnant, c'est un match nul

### Contrôles
- **Nouvelle partie** : Recommence une partie
- **Annuler** : Annule le dernier coup joué
- **Mode de jeu** : Bascule entre IA et joueur

### Statistiques
- Les victoires de X (bleu)
- Les matchs nuls (gris)
- Les victoires de O (rouge)

## 🎨 Fonctionnalités techniques

### Responsive design
- Interface optimisée pour mobile, tablette et desktop
- Grille de jeu adaptative
- Boutons et contrôles optimisés pour le tactile

### Performance
- Rendu optimisé avec Vue 3
- Animations fluides
- Chargement rapide

### Accessibilité
- Support du clavier
- Contrastes optimisés
- Textes lisibles

## 🔧 Configuration

### Variables d'environnement
Aucune variable d'environnement requise pour le moment.

### Personnalisation
Les couleurs et styles peuvent être modifiés dans :
- `assets/css/main.css` : Styles personnalisés
- `tailwind.config.js` : Configuration Tailwind
- `app.vue` : Interface principale

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🚀 Améliorations futures

- [ ] IA plus intelligente (algorithme minimax)
- [ ] Mode multijoueur en ligne
- [ ] Différents niveaux de difficulté
- [ ] Animations de victoire
- [ ] Sons et effets audio
- [ ] Mode tournoi
- [ ] Sauvegarde en ligne

---

## 👩‍💻 Auteur

**Développé avec ❤️ par Sarah T**

---

**Amusez-vous bien ! 🎮✨**
# tic-tac-toe
