//get all the clients
var testData = [

	
	{
		"id" : 0,
		"first_name" : "Jeremy",
		"last_name" : "Oosterban",
		"stage" : 1,	
		"date_added": "2012-03-29T10:05:45-06:00",
		
		//basic
		"phone" : "14789999999",
		"email" : "MichiganFan@email",
		"street_address" : "123 Ooster Bouevarde",
		"city" : "Dayton",
		"state" : "Ohio",
		"zip" : "12345",

		"contractor": "Turtle Man",
		"contractor_phone": "14789999999",
		"contractor_email": "coolguy@email.com",
		
		
		"Projects" : [
			"Cabinets", "Floor"
		],
		
		//materials
		"materials_kit": "",
		"materials_van_other": "",
		"slab_num": "",
		"tile_bs": null,
		"slabrem_marked": true,
			"slabrem_marked_N": "",
		
		"profile_std": false,
		"profile_prem": true,
			"profile_prem_L": 12,
		"profile_rad": false,
			"profile_rad_L": null,
		"profile_backs": false,
		"profile_bars": true,
		
		//kitchen
		"kitchen_pkg": true,
		"kitchen_sink_num": "",
		"kitchen_grids": false,
		"kitchen_strainer": false,
		"kitchen_faucet_num": "",
		"kitchen_cutboard": false,
		"kitchen_soap_disp": false,
		"kitchen_cut_sink": 2,
		"kitchen_hole": 2,
		"kitchen_cook_top": false,
		"kitchen_brackets": true,
			"kitchen_brackets_qty": 8,
			"kitchen_brackets_size": 2,
			"kitchen_install": false,
		"kitchen_tear": "",
		"kitchen_plumb": "",
		
		//vanity
		"vanity_pkg": true,
		"vanity_cut_sink": 4,
		"vanity_hole": 3,	
		"vanity_sink_num": "",	
		"vanity_sink_qty": 2,
		"vanity_facuet_num": "",
		"vanity_facuet_qty": 2,
		"vanity_drain": false,
			"vanity_drain_qty": null,
		"vanity_tear": "",
		"vanity_plumb": "",
		
		//$$$
		"estimated_qty": 420.69,
		"actual_qty": 449.99,
		"estimate": "", //for the work?
		"installation_N": "",
		
		//availability + scheduling
		"availability": "",
			//schedule
		"schedule_template": "2012-06-02T10:05:45-06:00", 	"schedule_tear": null,
			"schedule_tear_con": null,
		"schedule_brackets": "2012-06-02T10:05:45-06:00",
			"schedule_brackets_con": true,
		"schedule_install_drop": "2012-06-02T10:05:45-06:00",
		"schedule_plumb": "2012-06-02T10:05:45-06:00",
			"schedule_plumb_con": false,
			//order + service
		"customer_inv_sent": "2012-06-02T10:05:45-06:00",
		"customer_conf_rvd": "2012-06-02T10:05:45-06:00",
		"customer_srv_call": "2012-06-02T10:05:45-06:00",
			"customer_srv_call_res": "y",
		"customer_srv_sch": "2012-06-02T10:05:45-06:00",
		"customer_srv_comp": true,
			"customer_srv_comp_D" : "2012-06-02T10:05:45-06:00",
			//customer picked up
		"picked_faucet": "2012-05-29T10:05:46-06:00",
		"picked_grid": "2012-06-02T10:05:45-06:00",
		"picked_strainer": "2012-06-02T10:05:45-06:00",
		"picked_brackets": "2012-06-02T10:05:45-06:00",
		"picked_counters": "2012-06-02T10:05:45-06:00",
		
		"fabricating": "GNS",
		"install": "Other",
		"sink_rvd": "2012-05-15T10:05:45-06:00", //custom sink recieved
		"mat_sent": "2012-05-15T10:05:45-06:00",
			"mat_sent_qty": 3,
		"sink_sent": "2012-05-15T10:05:45-06:00",
			"sink_sent_qty": 3,
		"ord_conf_sent": "2012-05-15T10:05:45-06:00",
		
		"rvd_layout": false,
		"notes": "he was very nice to me",
		"follow_up": "",
		
		//sid bar
		"in_cust": false,
		"quote_sent": "verbal",
		"quote_call": true,
		"invoice_num": "369643",
		"install_conf": true,
			"install_conf_D": "2012-06-26T10:05:45-06:00",
		"ask_feedback": true,
		"location": "Dayton",
		"acct": "2012-06-02T10:05:45-06:00",
		
		
		"comments": [
			"Client is color blind",
			"Client is only red-green color blind"
		]
	},
	
	{
		"id" : 0,
		"first_name" : "Jeremy",
		"last_name" : "Oosterban",
		"stage" : 1,	
		"date_added": "2012-03-29T10:05:45-06:00",
		
		//basic
		"phone" : "14789999999",
		"email" : "MichiganFan@email",
		"street_address" : "123 Ooster Bouevarde",
		"city" : "Dayton",
		"state" : "Ohio",
		"zip" : "12345",

		"contractor": "Turtle Man",
		"contractor_phone": "14789999999",
		"contractor_email": "coolguy@email.com",
		
		
		"Projects" : [
			"Cabinets", "Floor"
		],
		
		//materials
		"materials_kit": "",
		"materials_van_other": "",
		"slab_num": "",
		"tile_bs": null,
		"slabrem_marked": true,
			"slabrem_marked_N": "",
		
		"profile_std": false,
		"profile_prem": true,
			"profile_prem_L": 12,
		"profile_rad": false,
			"profile_rad_L": null,
		"profile_backs": false,
		"profile_bars": true,
		
		//kitchen
		"kitchen_pkg": true,
		"kitchen_sink_num": "",
		"kitchen_grids": false,
		"kitchen_strainer": false,
		"kitchen_faucet_num": "",
		"kitchen_cutboard": false,
		"kitchen_soap_disp": false,
		"kitchen_cut_sink": 2,
		"kitchen_hole": 2,
		"kitchen_cook_top": false,
		"kitchen_brackets": true,
			"kitchen_brackets_qty": 8,
			"kitchen_brackets_size": 2,
			"kitchen_install": false,
		"kitchen_tear": "",
		"kitchen_plumb": "",
		
		//vanity
		"vanity_pkg": true,
		"vanity_cut_sink": 4,
		"vanity_hole": 3,	
		"vanity_sink_num": "",	
		"vanity_sink_qty": 2,
		"vanity_facuet_num": "",
		"vanity_facuet_qty": 2,
		"vanity_drain": false,
			"vanity_drain_qty": null,
		"vanity_tear": "",
		"vanity_plumb": "",
		
		//$$$
		"estimated_qty": 420.69,
		"actual_qty": 449.99,
		"estimate": "", //for the work?
		"installation_N": "",
		
		//availability + scheduling
		"availability": "",
			//schedule
		"schedule_template": "2012-06-02T10:05:45-06:00", 	"schedule_tear": null,
			"schedule_tear_con": null,
		"schedule_brackets": "2012-06-02T10:05:45-06:00",
			"schedule_brackets_con": true,
		"schedule_install_drop": "2012-06-02T10:05:45-06:00",
		"schedule_plumb": "2012-06-02T10:05:45-06:00",
			"schedule_plumb_con": false,
			//order + service
		"customer_inv_sent": "2012-06-02T10:05:45-06:00",
		"customer_conf_rvd": "2012-06-02T10:05:45-06:00",
		"customer_srv_call": "2012-06-02T10:05:45-06:00",
			"customer_srv_call_res": "y",
		"customer_srv_sch": "2012-06-02T10:05:45-06:00",
		"customer_srv_comp": true,
			"customer_srv_comp_D" : "2012-06-02T10:05:45-06:00",
			//customer picked up
		"picked_faucet": "2012-05-29T10:05:46-06:00",
		"picked_grid": "2012-06-02T10:05:45-06:00",
		"picked_strainer": "2012-06-02T10:05:45-06:00",
		"picked_brackets": "2012-06-02T10:05:45-06:00",
		"picked_counters": "2012-06-02T10:05:45-06:00",
		
		"fabricating": "GNS",
		"install": "Other",
		"sink_rvd": "2012-05-15T10:05:45-06:00", //custom sink recieved
		"mat_sent": "2012-05-15T10:05:45-06:00",
			"mat_sent_qty": 3,
		"sink_sent": "2012-05-15T10:05:45-06:00",
			"sink_sent_qty": 3,
		"ord_conf_sent": "2012-05-15T10:05:45-06:00",
		
		"rvd_layout": false,
		"notes": "he was very nice to me",
		"follow_up": "",
		
		//sid bar
		"in_cust": false,
		"quote_sent": "verbal",
		"quote_call": true,
		"invoice_num": "369643",
		"install_conf": true,
			"install_conf_D": "2012-06-26T10:05:45-06:00",
		"ask_feedback": true,
		"location": "Dayton",
		"acct": "2012-06-02T10:05:45-06:00",
		
		
		"comments": [
			"Client is color blind",
			"Client is only red-green color blind"
		]
	}
	
];