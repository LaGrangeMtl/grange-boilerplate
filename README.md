grange-boilerplate
==================
![Header La Grange](http://clients.la-grange.ca/grange/grange_header.jpg "Header La Grange")

Boilerplate pour les projets de [La Grange](http://la-grange.ca "La Grange").

Compose la structure de base des projets chez La Grange. Contient donc la structure
des dossiers, ainsi que les principales librairies JavaScript et LESS/CSS.

Notes importantes
-----------------
* AVANT DE grunt-init UN PROJET, PULLEZ POUR ÊTRE SUR D'AVOIR LA BONNE VERSION
* Les librairies JS et LESS/CSS devraient être mises à jour le plus souvent possible
* Lors d'un commit, le faire le plus clair possible et mettre en détail les choses longues à expliquer dans le champ description pour qu'on puisse suivre les modifications facilement.
* Si un changement majeur de librairie est à faire, par exemple passer de Boostrap 2 à 3, le faire sur une nouvelle branche nommée selon la nomenclature suivante : dev_[librairie]\_[versionX_to_versionY] ou [librairie] équivaudrais ici à boostrap et [versionX_to_versionY] à version2_to_version3. On ne peut merger que lorsqu'on est sur que tout est compatible et fonctionne comme il faut.
* Il est important de bien documenter chaque ajout et modification majeure à ce projet qui affecte le _workflow_ sur le [système de documentation](http://workflow.grange "Documentation workflow") prévu à cet effet.

Structure des dossiers
----------------------
##### /css
Fichiers .css seulement

***
##### /less
Le fichier master.less sera situé à la racine de ce dossier. Les autres fichiers .less sont disposés selon cette structure :

* _/common_ :

	Ici, les fichiers communs à tous les projets, ex: "responsive.less", "reset.less", etc.

* _/website_ :

	Ici, les fichiers spécifiques à chaque projet, ex: "basic.less", "header.less", etc.

***
##### /img
Fichiers images seulement

***
##### /assets
Fonts et sons

***
##### /js
Le fichier main.js (app.js si le projet utilise Require.js) sera situé à la racine de ce dossier. Les autres fichiers .js sont disposés selon cette structure :

* _/vendor_ :

	Ici, les snippets, librairies et classes dont le code source n'est pas propriété de La Grange. Même si une librairie est liscencié sous MIT ou autre liscence libre, elle doit être mise dans ce dossier par soucis de clarté.

* _/grange_ :

	Ici, les snippets, librairies et classes propres à La Grange.

* _/[nom de dossier relatif au projet]_ :

	Ici, le code et classes spécifiques au projet. 
