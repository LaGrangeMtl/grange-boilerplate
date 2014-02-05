<?PHP

	$this->tableNav = 'page';
	
	$this->idRoot = 0;//Niveau de base (non montré dans le menu) dont tous les éléments du menu sont des childs
	
	//indique que dans le menu principal, les éléments du niveau x sont montrés, et uniquement pour l'item actif
	$this->mainMenuRootLevel = 1;
	
	self::$maxLevels = 3;
	
	//liste des champs utilisés
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
		'boolAgglo' => 'externalGrouped',//indique si les recs externes sont agglomérés en un seul item au menu
		'order' => '`order`',//champ ordre
		'isChildDefault'=>'isChildDefault',//indique que cette page montre son premier child plutot qu'elle même dans le menu
		'cssId'=>'cssId',
	);
	
	
	//$this->secondaryNav['top'] = array('root'=>193);
	
	
	class NavHooks {
		//limite le menu aux categories de documents dans lesquelles il y a des docs accessibles par ce user
		public static function parseExternalSQL($sql) {
			if($sql->getTable() == 'docs_categs') {
				
				$docsUserGroup = Hooks::getUserDocsGroup();
				if($docsUserGroup){
					$sql->addJoin('INNER', 'docs_documents AS `docs`', 'docs_categs.id = `docs`.categ');
					$sql->addJoin('INNER', 'docs_docgroupe_mtm AS `perms`', 'perms.doc = `docs`.id AND perms.groupe = ' . $docsUserGroup);
					//Utils::debug($sql);
					/*$qstr = $sql->getSQL();
					Utils::debug($qstr);/***/
				}			
			}
		}
		
	}