# Démineur
Un jeu de démineur en JS avec une API
## Convention de code
Je compte faire des efforts en terme de respects des normes de code. Je compte utiliser dans un premier temps le use strict. Ensuite j'écrirai le noms des variables en français et j'utliserai le camelCase. Enfin, je vais essayer de commenter mon code afin de retranscrire ma logique.
## Première étape
Je compte dans un premier temps réaliser mon formulaire HTML en faisant choisir au joueur son pseudo, le nombre de ligne, et de colonne ainsi que le nombre de mine dans sa grille de jeu.

### récupération des valeurs des inputs
J'ai pu récupéré en ajoutant un écouteur sur le formulaire, les valeurs des inputs renseignés en console. Il faut que je puisse les utiliser dans l'api afin de générer la grille.

J'ai pu récupérer les datas de l'api. Il faut maintenant que je puisse les utiliser pour générer la grille. J'ai pensé à faire une fonction generateGrid. J'ai reçu un nombre de tableau qui correspond au nombre de rows, et dans chaque tableau il y ' a un nombre de chiffre qui correspond aux cols. Ces chiffres sont des 0 et des 1, les 1 correspondants surement au mine. Je dois d'abord générer la grid en fonction du nombre de rows et cols.

## Deuxième étape : générer la grille et mettre à jour les données des cases adjacentes
Il faut générer la grille souhaitée grâce à un appel à une api.
### Fonction generateGrid
 J'ai pu faire une fonction generateGrid pour afficher une grille en fonction des rows et des cols. Il me faut maintenant cibler les 1 qui représentent l'emplacement des mines.

### Fonction hasMines

 Il faut que je parcoure les rows et les cols et voir si il y a un 1. J'ai pu cibler la case renvoyé par l'api qui est data[i][j] que je parcours ds une double boucle pour parcourir chaque case de chaque ligne. A partir de la, il suffit de vérifier si la case est égale à 1, si oui il y a une mine. Pour le moment, j'ai ajouté une classe mined qui met la case en rouge. Finalement, cela est inutile de faire une fonction pour ça, j'ai mis tout dans la function generateGrid.

### Branche Adjacente
 J'ai mergé ma branche grille et j'en créer une nouvelle pour trouver l'algo qui déterminerai comment cibler les cases adjacentes les compter et faire apparaitre le chiffre sur la case. Je vais faire une fonction adjoiningMines. Il faut que dans cette fonction, je puisse déterminer si les cases qui sont adjacentes détiennent des mines et les compter. 
 Il y a 8 cases adjacentes, j'ai donc créer une variable newdata pour stocker les nouveaux tableaux mis à jour. Ensuite j'ai refait une doucble boucle pour parcourir chaque case adjacentes à une mine. Je pars de si data[i][j] === 1, j'ai exclu les undfined en ciblant les numbers, et j'ai incrémenter de 1 à chaque fois, pour enfin retourner de nouvelle donnée que je donnnes à ma fonction generateGrid.

 ## Mise à jour
### l'attribut isMined
 Je pensais avoir résolu l'algo mais que nenni. Le fait que l'api donne une data de 1 pour les cases avec des mines à largement compliquer l'algo. En effet, quand on incrémentait les cases adjacentes, cela créait beaucoup de cases à la valeur de 1 qui du coup entrainait des incrémentations intempestives. Apres avoir cherché des heures à trouver comment distinguer les cases contenant une mine, j'ai trouvé qu'on pouvait donner des attributs à une valeur d'un array, ce qui transforme cette donnée en objet. J'avais essayé avant d'attribuer une classe mais cela ne marchait pas data[i][j]classList.add ça marche pas. J'ai essayé de récupérer la colElement de la fonction generateGrid qui lui à la classe mined, mais vu que cette variable est définie à l'intérieure d'une fonction je ne pouvais pas la récupérer ds AjoigningMines(quel nom pourri mais bon je fais tout en anglais), la seul solution c'était l'attribut. Après avoir aussi tenté data[i][j].setAttribute ^^ qui bien sur ne marche pas, j'ai trouvé sur le net qu'on pouvait transformer une donnée en objet en lui donnant un attribut personnalisé. 
 ### faire des boucles dans des boucles
 En arrivant à distinguer les isMined il fallait trouvé comment incrémenter les case adjacentes en ommetant les cases isMined avec un if () continue qui skipp la condition de la suite de l'algo, j'ai trouvé que ma boucle de départ était redondante et j'ai pensé au tableau ou il y a 2 doubles boucles j'ai cherché des exemples sur le net j'ai trouvé la solution : la première double boucle permet de cibler une case la deuxième double boucle permet de cibler les cases adjacentes à +1 -1 ou 0 qui correspondait à mes précédents [i+1][j] ||ou [i-1][j+1] etc. Il fallait aussi ne pas oublier de skipper la case actuelle à x= 0 et y =0 et bien sur veillez à ne pas dépasser la grille et enfin incrémenter la case adjacente! du coup je merge cette branche interactions, qui est en faite la suite de l'algo. Il me reste à gérer les cliks je pense qu'il me faudra des attributs ou classe à ajouter ou cacher au clik.


## Gérer les intéractions avec le joueurs
Ici je dois gérer les intéractions avec l'utilisateur. Lorsqu'il clique sur une case, celle-ci doit découvrir le chiffre qui indique le nombre de mines adjacentes. Au départ, j'étais partie sur l'attribution d'une classe hidden sur la cellule qui devait caché la data et faire un remove au click, mais je me suis rendu comptre que le hiddent que ce soit display:none ou visibility hidden masquait la grille. Du coup, j'ai fais l'inverse. Je génère la grille sans data et je l'injecte au click.

### l'Explosions des cases avec aucune mines adjacentes.
Dans la règle du démineur quand on clique sur une case 0, les autres cases zéro sont découvertes. Il faut donc gérer cela.

## Interactions 2
J'ai réussi à terminer les interactions click avec le joueur, en prenant en compte le click droit et le click gauche. Le droit permet de mettre un drapeau sur les case où l'on suspecte la présence d'une mine.
Je merges cette branche, je me laisse pour la suite le problème de résoudre des erreurs qui arrivent lorsque l'on click entre les cases.

## Nouvelle branche Game
Je vais créer une branche afin de ranger tout ça. Je penses créer une classe Game, une classe API, et peut être une classe Player.

### Edit

Du coup j'ai réorganisé tout mon code en module avec une classe Api. Je vais peut etre modifier mon main en classe Game, ou faire une classe Game à part pour gérer le nombre de partie. Je ne penses pas avoir le temps de faire une classe Player. Ce fut très difficile pour moi de reprendre en module un code existant notamment à cause de la portée des variables et de comment bien importer tout cela. La prochaine fois, je réfléchirait à ça avant de coder plutôt que de me préoccuper de l'algo. Je reste donc sur la même branche j'aurai du l'appeler module au lieu de Game.

## Le vrai Game
Je vais donc maintenant gérer la fin de partie du coup quand le joueur tombe sur une mine ou que toute les cases non minés sont clické. Il faut que je penses partir sur une classe Game

J'ai pu gérer la fin de la partie en ajoutant des méthodes à la classe Game, afin de controler si le joueur à cliqué sur une mine ou si toute les cases ont été révélé.

# Conclusion

J'ai essayé de faire un bouton restart en fin de partie, je n'y suis pas arrivé.
Je ne suis pas parvenu à gérer la fin de partie, je n'arrives pas à savoir pourquoi. Quand je clique sur une mine cela met isMined false. Quand j'essaye de faire un cell.classList.contains('boom'), cela me met cell.classList undefined. La mise en place de classe et de module complique grandement la tache, je n'ai pas encore le niveau pour savoir gérer tout cela ( la portée des variables et des méthodes de class).
De même, la méthode restart ne fonctionne pas, j'arrives a regénérer le formulaire qui regénère la bonne taille de grille, mais je n'ai pas su réinjecter le nouveau tableau de date.

Je penses que vu le temps imparti j'ai fais ce que j'ai pu, mais même si cela s'avère etre un échec.
