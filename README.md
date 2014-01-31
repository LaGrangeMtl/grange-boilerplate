grange-boilerplate
==================
![Header La Grange](http://clients.la-grange.ca/grange/header_grange.jpg "Header La Grange")

Boilerplate pour les projets de [La Grange](http://la-grange.ca "La Grange").

Composera la structure de base des projets chez La Grange. Contiendra donc la structure
des dossiers, ainsi que les principales librairies JavaScript et LESS/CSS.

Notes importantes
-----------------
* Si un changement majeur de librairie est à faire, par exemple passer de Boostrap 2 à 3, le faire sur une nouvelle branche
	nommée selon la nomenclature suivante : dev_[librairie]_[versionX_to_versionY] ou [librairie] équivaudrais ici à boostrap et [versionX_to_versionY] à version2_to_version3. On ne peut merger que lorsqu'on est sur que tout est compatible et fonctionne comme il faut.
* Comme c'est un projet pour les ressources internes, la documentation sera faite en français.
* Il est important de bien documenter chaque ajout et modification majeure à ce projet sur le [système de documentation](http://workflow.grange "Documentation boilerplate") prévu à cet effet.
* Les librairies JS et LESS/CSS devraient être mises à jour le plus souvent possible
* Les modifications majeures du projets doivent être logger dans le CHANGELOG.md

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
