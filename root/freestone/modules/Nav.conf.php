<?PHP

	$this->tableNav = 'page';
	
	$this->idRoot = 0;//Niveau de base (non montr� dans le menu) dont tous les �l�ments du menu sont des childs
	
	//indique que dans le menu principal, les �l�ments du niveau x sont montr�s, et uniquement pour l'item actif
	$this->mainMenuRootLevel = 1;
	
	self::$maxLevels = 3;
	
	//liste des champs utilis�s
	$this->fields = array(
		'label' => 'menuLabel_'.VWebsite::$lang,//label du menu
		'pk' => 'id',//primary key de la table
		'link_parent' => 'parent',
		'urlExt' => 'externalURL',//url externe
		'secure' => '"0"',
		'extTab' => 'externalTable',//ch table extenre
		'extPK' => 'externalPK',//ch contenant le nom du PK d'un level externe
		'extClauses' => 'externalClauses',//ch contenant les clauses sql du select d'un level externe
		'extOrder' => 'externalOrder',//ch ordre quand table externe
		'extTemplate' => '`externalTemplate`',
		'boolAgglo' => 'externalGrouped',//indique si les recs externes sont agglom�r�s en un seul item au menu
		'order' => '`order`',//champ ordre
		'isChildDefault'=>'isChildDefault',//indique que cette page montre son premier child plutot qu'elle m�me dans le menu
		'cssId'=>'cssId',
	);
		
	
	class NavHooks {
				
	}