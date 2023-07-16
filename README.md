# demineur
Un jeu de démineur en JS avec une API
## Convention de code
Je compte faire des efforts en terme de respects des normes de code. Je compte utiliser dans un premier temps le use strict. Ensuite j'écrirai le noms des variables en français et j'utliserai le camelCase. Enfin, je vais essayer de commenter mon code afin de retranscrire ma logique.
## Première étape
Je compte dans un premier temps réaliser mon formulaire HTML en faisant choisir au joueur son pseudo, le nombre de ligne, et de colonne ainsi que le nombre de mine dans sa grille de jeu.

### récupération des valeurs des inputs
J'ai pu récupéré en ajoutant un écouteur sur le formulaire, les valeurs des inputs renseignés en console. Il faut que je puisse les utiliser dans l'api afin de générer la grille.

J'ai pu récupérer les datas de l'api. Il faut maintenant que je puisse les utiliser pour générer la grille. J'ai pensé à faire une fonction generateGrid. J'ai reçu un nombre de tableau qui correspond au nombre de rows, et dans chaque tableau il y ' a un nombre de chiffre qui correspond aux cols. Ces chiffres sont des 0 et des 1, les 1 correspondants surement au mine. Je dois d'abord générer la grid en fonction du nombre de rows et cols.

## Deuxième étape
Il faut générer la grille souhaitée grâce à un appel à une api.
