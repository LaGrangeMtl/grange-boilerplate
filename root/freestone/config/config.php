<?PHP
	

    //ID of that client
    VEnv::$client = '{%= name %}';
    VEnv::$siteName = '{%= title %}';
	
	
	VEnv::addEnv('local', array('.freestone'), array(
		 //database config
		'dbUser' => 'root',
		'dbPass' => '',
		'dbName' => '{%= db_name %}',
		'cacheConfig' => array(
			'life' => 10,
			'noCacheVars' => false,
		),
		'isDev' => true,
	));
	
	//array of css to display in html fields of the admin
    VEnv::$pathCss = array();
    
	//indicate if we rewrite addresses for this website's pages.
	VEnv::$doRewrite = true;
	
	VEnv::$defaultID = 1;
	VEnv::$defaultLang = 'fr';
	VEnv::$defaultTable = 'page';
	
	VEnv::$salt = '{%= salt %}';
	
	//this field's value is appended to table name to get template file
	VEnv::$fieldBasedTplNames['page'] = 'template';
	
	VEnv::$cacheConfig = array(
		'life' => 86000,
		'noCacheVars' => false,
	);
	
	//configuratrion for shared views
	VEnv::$commonViewConfig = array(
		'alwaysShow'=>array('scriptsheader', 'header', 'footer'),
		'qstr' => array(
			'page' => "SELECT
				el.placeholder AS `item`, gr.placeholder AS `group`
				FROM commonel AS el
				INNER JOIN page_commonel_mtm AS lnk ON lnk.element_id = el.id
				LEFT JOIN commonel_group AS gr ON el.group_id = gr.id
				WHERE lnk.page_id = '{id}' 
				ORDER BY gr.id, el.`order`",
		),
		'customfunctions'=>false,
	);

	

