# Structure du Projet Tic Tac Toe

## 📁 Organisation des dossiers

```
tic-tac-toe/
├── 📁 pages/           # Pages de l'application
│   └── index.vue       # Page d'accueil avec le jeu
├── 📁 components/      # Composants réutilisables
│   └── GameBoard.vue   # Composant du plateau de jeu
├── 📁 composables/     # Logique métier réutilisable
│   └── useGame.js      # Logique du jeu Tic Tac Toe
├── 📁 layouts/         # Layouts de l'application
├── 📁 utils/           # Fonctions utilitaires
├── 📁 types/           # Types TypeScript
├── 📁 assets/          # Ressources statiques
│   └── css/
│       └── tailwind.css
├── 📁 public/          # Fichiers publics
│   ├── favicon.svg
│   └── .nojekyll
├── app.vue             # Point d'entrée de l'application
├── nuxt.config.ts      # Configuration Nuxt
├── tailwind.config.js  # Configuration Tailwind
└── package.json        # Dépendances
```

## 🎯 Avantages de cette structure

### ✅ **Organisation claire**
- **`pages/`** : Chaque fichier = une route
- **`components/`** : Composants réutilisables
- **`composables/`** : Logique métier partagée
- **`layouts/`** : Templates de mise en page

### ✅ **Maintenabilité**
- Code séparé par responsabilité
- Logique du jeu isolée dans `useGame.js`
- Composants modulaires et réutilisables

### ✅ **Évolutivité**
- Facile d'ajouter de nouvelles pages
- Composants indépendants
- Logique centralisée

## 🔧 Utilisation

### Pages
```vue
<!-- pages/index.vue -->
<template>
  <div>
    <!-- Interface du jeu -->
  </div>
</template>

<script setup>
const { board, makeMove } = useGame()
</script>
```

### Composants
```vue
<!-- components/GameBoard.vue -->
<template>
  <div class="grid grid-cols-3">
    <!-- Plateau de jeu -->
  </div>
</template>

<script setup>
defineProps(['board'])
defineEmits(['move'])
</script>
```

### Composables
```javascript
// composables/useGame.js
export const useGame = () => {
  // Logique du jeu
  return { board, makeMove, resetGame }
}
```

## 🚀 Développement

1. **Ajouter une page** : Créer un fichier dans `pages/`
2. **Créer un composant** : Ajouter dans `components/`
3. **Logique métier** : Placer dans `composables/`
4. **Styles** : Utiliser Tailwind CSS

Cette structure suit les bonnes pratiques de Nuxt 3 et facilite la maintenance du code ! 🎮
