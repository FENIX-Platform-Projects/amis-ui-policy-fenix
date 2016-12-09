define([
    'jqxwidget',
    'loglevel',
    'utils/policy-data-object',
    'fx-common/bridge'

],function(Jqxwidget, log, Policy_data_object, Bridge){

    var wdsNew ='/new';

    var optionDefault = {

        environment : "production",  //environment : "develop"

        standard_preview_jqxgrid : 'standard_preview_jqxgrid',
        standard_preview : 'standard_preview',
        //It has to be filled by the caller
        button_preview_action_type : '',
        policy_data_object : '',
        bridge : '',
        datasource : 'POLICY',

        masterData : '',

        policy_domain_code : 1,
        commodity_domain_code : 1,
        commodity_class_code : "3,9,13,18,11,10,14,8",
        policy_type_code : ["1"],
        policy_measure_code:["1,2,3", "5,6"],
        country_code : "12",

        //Variables for the time
        //TO FILL START
        year_tab : '',
        year_list : '',
        start_date : '',
        end_date : '',

        default_start_date : '1995-01-01',
        default_end_date : '2025-01-01',
        //TO FILL END

        //To WDS
        base_ip_address    :  '168.202.36.186',
        base_ip_port    :  '10400',
        //base_ip_address    :  'statistics.amis-outlook.org',
        //base_ip_port    :  '80',

        url : {
            policyTable_url     :   wdsNew+'/wdspolicy/rest/policyservice/downloadPreviewPolicyTable',
            downloadPreview_url     :   wdsNew+'/wdspolicy/rest/policyservice/downloadPreview',
            codelist_url    :   'http://fenixservices.fao.org/d3s/msd/codes/filter', //NEW
            masterFromCplIdAndSubnational     :   wdsNew+'/wdspolicy/rest/policyservice/masterFromCplIdAndSubnational',
            masterFromCplId_url     :   wdsNew+'/wdspolicy/rest/policyservice/masterFromCplId'
        },

        //Utility variables
        importTariffs : 11,
        tariffQuotas : 12,

        cpl_id_list : ''
    };

    function PreviewTable(o){

        if (this.options == undefined) {
            this.options = {};
        }

        $.extend(true, this.options, optionDefault, o);
    }

    PreviewTable.prototype._init = function(){
        this._init_variables();
        $.proxy(this.preview_action(), this);
        //this._master_grid_creation3();
    }

    PreviewTable.prototype._init_variables = function(){
        this.options.policy_data_object = new Policy_data_object();
        this.options.bridge = new Bridge({
            environment : this.options.environment
        });
    }

    PreviewTable.prototype._preloadDownloadPreviewSuccess = function (resource) {

        log.info("_preloadDownloadPreviewSuccess");
        log.info(resource)

    };

    PreviewTable.prototype._preloadDownloadPreviewError = function (resource) {

        log.info("_preloadDownloadPreviewError");
        log.error(resource)
        return;
    };

    PreviewTable.prototype._preloadDownloadPreview = function () {

        //this

        return this.options.bridge.getProcessedResource({
            uid: "OECD_View_QueryDownload",
            body: [{
                "name": "filter",
                "parameters": {
                    "rows": {
                        "commoditydomain": {
                            "codes": [{
                                "uid": "OECD_CommodityDomain",
                                "version": "1.0",
                                "codes": [1]
                            }]
                        },
                        "policydomain": {
                            "codes": [{
                                "uid": "OECD_PolicyDomain",
                                "version": "1.0",
                                "codes": [1]
                            }]
                        }
                    },
                    "columns": ["policytype"]
                }
            }],
            params :  {
                language : "EN",
                dsd : true
            }
        })
    };

    PreviewTable.prototype._preloadDownloadPreview2 = function () {

        //return this.options.bridge.getCodeList({
        //    body: {
        //        uid: "UNECA_ISO3",
        //        level: 2
        //    }
        //})

        return this.options.bridge.getProcessedResource({
            //uid: "OECD_View_QueryDownload",
            //sid: [{uid: "OECD_View_QueryDownloadPreview"}, {uid: "OECD_View_QueryDownload"}],
            body:     [
                {
                    "name": "join",
                    "sid": [{"uid": "OECD_View_QueryDownloadPreview"}, {"uid": "OECD_View_QueryDownload"}],
                    "rid": {"uid": "masterPolicyJoin"},
                    "parameters": {
                        "joins" : [[{"type": "id", "value": "cpl_id"}], [{"type": "id", "value": "cpl_id"}]]
                    }
                }
            ]
            //params :  {
            //    language : "EN",
            //    dsd : true
            //}
        })
    };

    PreviewTable.prototype.preview_action = function()
    {
        //Loading Bar
        //NProgress.start();

        //Setting the properties for the time
        var self= this;
        var data = {"datasource":"POLICY","policy_domain_code":1,"commodity_domain_code":1,"commodity_class_code":"3,9,13,18,11,10,14,8","policy_type_code":["1"],"policy_measure_code":["1"],"country_code":"12","yearTab":"slider","year_list":"","start_date":"2007-01-01","end_date":"2018-01-28","cpl_id":"","commodity_id":"","policyTypesInfo":[]}

        log.info(this.options.policy_data_object)
        var data = this.options.policy_data_object.voObjectConstruction();
        data.datasource = this.options.datasource;
        data.yearTab = this.options.year_tab;
        data.year_list = this.options.year_list;
        data.start_date = this.options.start_date || this.options.default_start_date;
        data.end_date = this.options.end_date || this.options.default_end_date;

        this._preloadDownloadPreview().then(
            _.bind(this._preloadDownloadPreviewSuccess, this),
            _.bind(this._preloadDownloadPreviewError, this)
        );

        return;

        var payloadrest = JSON.stringify(data);
        /* Retrive UI structure from DB. */
        $.ajax({

            type: 'POST',
            url: 'http://'+this.options.base_ip_address+':'+this.options.base_ip_port+this.options.url.downloadPreview_url,
            data : {"pdObj": payloadrest},

            success : function(response) {

                /* Convert the response in an object, i needed. */
                var json = response;
                if (typeof(response) == 'string')
                    json = $.parseJSON(response);
//                for (var i = 0 ; i < json.length ; i++) {
//                    console.log(" "+json[i]);
//                }
                self.options.cpl_id_list=[];
                var cpl_id_list_String = '';
                if(json.length==0)
                {
                    //Case No cpl_id for this selection
                    var s = "<h1 class='fx_header_title'>No data available for the current selection...</h1>";
                    $('#'+self.options.standard_preview).children().remove();
                    $('#'+self.options.standard_preview).append(s);
                    //NProgress.done();
                }
                else
                {
                    //masterFromCplId_url
                    var s = '<div id='+self.options.standard_preview_jqxgrid+'></div>';
                    $('#'+self.options.standard_preview).children().remove();
                    $('#'+self.options.standard_preview).append(s);
                    var cpl_id_list_String ="";
                    for (var i = 0 ; i < json.length ; i++) {
                        self.options.cpl_id_list[i] = json[i];
                        if(cpl_id_list_String.length>0)
                        {
                            cpl_id_list_String += ', ';
                        }
                        cpl_id_list_String += "'"+self.options.cpl_id_list[i]+"'";
                    }

                    var forGetMasterData = self.options.policy_data_object.voObjectConstruction();
                    var country_code =[];

                    if((self.options.country_code!=null)&&(typeof self.options.country_code!="undefined"))
                    {
                        var data_country_code_array = self.options.country_code.split(",");
                        for(var icode = 0; icode<data_country_code_array.length; icode++){
                            country_code[icode] = ''+data_country_code_array[icode];
                        }
                    }
                    var body = {};
                    body.uid = "GAUL";
                    body.version = "2014";
                    body.codes = country_code;
                    // body.levels = 2;

                    var body2 = JSON.stringify(body);
                    //Getting GAUL code
                    $.ajax({
                        type: 'POST',
                        url: self.options.url.codelist_url,
                        data : body2,
                        contentType: 'application/json',
                        dataType:'json',
                        success : function(response) {
                            var json = response;
                            if (typeof(response) == 'string')
                                json = $.parseJSON(response);
                            var i=0;
                            //Subnational level 2
                            forGetMasterData.subnational = {};
                            //Subnational level 2
                            forGetMasterData.subnational_for_coutry = {};
                            //Subnational level 2
                            forGetMasterData.subnational_lev_3 = {};
                            //Subnational level 2
                            forGetMasterData.subnational_for_coutry_lev_3 = {};
                            //Country
                            forGetMasterData.country = {};

                            for(i=0; i<json.length;i++){
                                var country = json[i].code;
                                var country_title = json[i].title["EN"];
                                forGetMasterData.country[country]=country_title;
                                var children = json[i].children;
                                //Subnational level 2
                                for(var ichild = 0; ichild<children.length; ichild++){
                                    var child = children[ichild];
                                    var child_code = child.code;
                                    var child_name = child.title['EN'];
                                    forGetMasterData.subnational[child_code]=child_name;
                                    //console.log("country = "+country);
                                    if((forGetMasterData.subnational_for_coutry[country]!=null)&&(typeof forGetMasterData.subnational_for_coutry[country]!='undefined')){
                                        //forGetMasterData.subnational_for_coutry[country] = {};
                                        forGetMasterData.subnational_for_coutry[country][child_code]=child_name;
                                    }
                                    else{
                                        forGetMasterData.subnational_for_coutry[country] = {};
                                        forGetMasterData.subnational_for_coutry[country][child_code]=child_name;
                                    }

                                    //Check if there are children of the third level
                                    var children_lev_3 = json[i].children[ichild].children;
                                    //console.log(json[i].children[ichild])
                                    if((children_lev_3!=null)&&(typeof children_lev_3 !="undefined")){
                                        for(var ichild_lev_3 = 0; ichild_lev_3<children_lev_3.length; ichild_lev_3++){
                                            var child_lev_3 = children_lev_3[ichild_lev_3];
                                            var child_code_lev_3 = child_lev_3.code;
                                            var child_name_lev_3 = child_lev_3.title['EN'];
                                            forGetMasterData.subnational_lev_3[child_code_lev_3]=child_name_lev_3;
                                            //console.log("country = "+country);
                                            if((forGetMasterData.subnational_for_coutry_lev_3[country]!=null)&&(typeof forGetMasterData.subnational_for_coutry_lev_3[country]!='undefined')){
                                                //forGetMasterData.subnational_for_coutry[country] = {};
                                                forGetMasterData.subnational_for_coutry_lev_3[country][child_code_lev_3]=child_name_lev_3;
                                            }
                                            else{
                                                forGetMasterData.subnational_for_coutry_lev_3[country] = {};
                                                forGetMasterData.subnational_for_coutry_lev_3[country][child_code_lev_3]=child_name_lev_3;
                                            }
                                        }
                                    }
                                }
                            }

                            forGetMasterData.datasource = self.options.datasource;
                            forGetMasterData.cpl_id = cpl_id_list_String;
                            var payloadrestMasterData = JSON.stringify(forGetMasterData);
                            var payloadMap = JSON.stringify(forGetMasterData.subnational);
                            var payloadMap2 = JSON.stringify(forGetMasterData.subnational_for_coutry);
                            var payloadMap3 = JSON.stringify(forGetMasterData.subnational_lev_3);
                            var payloadMap4 = JSON.stringify(forGetMasterData.subnational_for_coutry_lev_3);

                            //Case Search
                            if((self.options.button_preview_action_type == "searchEditPolicy")||(self.options.button_preview_action_type == "searchCreatePolicy")){
                                $.proxy(self.getPolicyFromCpls(payloadrestMasterData), self);
                            }
                            else{
                                //Case Query and Download
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://'+self.options.base_ip_address+':'+self.options.base_ip_port+self.options.url.masterFromCplIdAndSubnational,
                                    data : {"pdObj": payloadrestMasterData, "map":payloadMap, "map2":payloadMap2, "map3":payloadMap3, "map4":payloadMap4},

                                    success : function(response) {
                                        /* Convert the response in an object, i needed. */
                                        var json = response;
                                        if (typeof(response) == 'string')
                                            json = $.parseJSON(response);

                                        //console.log(json);

                                        var mastertable_data = new Array();

                                        for (var i = 0 ; i < json.length ; i++) {
                                            var row = {};
                                            for (var j = 0 ; j < json[i].length ; j++) {
                                                if((json[i][j] == null)||(typeof json[i][j] == 'undefined')) {
                                                    json[i][j]="";
                                                }
                                                switch(j)
                                                {
                                                    case 0:
                                                        row["CplId"] = json[i][j];
                                                        break;
                                                    case 1:
                                                        row["CommodityId"] = json[i][j];
                                                        break;
                                                    case 2:
                                                        row["CountryCode"] = json[i][j];
                                                        break;
                                                    case 3:
                                                        row["CountryName"] = json[i][j];
                                                        break;
                                                    case 4:
                                                        row["SubnationalCode"] = json[i][j];
                                                        break;
                                                    case 5:
                                                        row["SubnationalName"] = json[i][j];
                                                        break;
                                                    case 6:
                                                        row["CommodityDomainCode"] = json[i][j];
                                                        break;
                                                    case 7:
                                                        row["CommodityDomainName"] = json[i][j];
                                                        break;
                                                    case 8:
                                                        row["CommodityClassCode"] = json[i][j];
                                                        break;
                                                    case 9:
                                                        row["CommodityClassName"] = json[i][j];
                                                        break;
                                                    case 10:
                                                        row["PolicyDomainCode"] = json[i][j];
                                                        break;
                                                    case 11:
                                                        row["PolicyDomainName"] = json[i][j];
                                                        break;
                                                    case 12:
                                                        row["PolicyTypeCode"] = json[i][j];
                                                        break;
                                                    case 13:
                                                        row["PolicyTypeName"] = json[i][j];
                                                        break;
                                                    case 14:
                                                        row["PolicyMeasureCode"] = json[i][j];
                                                        break;
                                                    case 15:
                                                        row["PolicyMeasureName"] = json[i][j];
                                                        break;
                                                    case 16:
                                                        row["PolicyConditionCode"] = json[i][j];
                                                        break;
                                                    case 17:
                                                        row["PolicyCondition"] = json[i][j];
                                                        break;
                                                    case 18:
                                                        row["IndividualPolicyCode"] = json[i][j];
                                                        break;
                                                    case 19:
                                                        row["IndividualPolicyName"] = json[i][j];
                                                        break;
                                                }
                                            }
                                            mastertable_data[i] = row;
                                        }
                                        $.proxy(self._master_grid_creation3(mastertable_data), self);
                                    },
                                    error : function(err,b,c) {
                                        alert(err.status + ", " + b + ", " + c);
                                    }
                                });
                            }
                        },
                        error : function(err,b,c) {
                            alert(err.status + ", " + b + ", " + c);
                        }});
                }
            },
            error : function(err,b,c) {
                alert(err.status + ", " + b + ", " + c);
            }
        });
    }

    PreviewTable.prototype.getPolicyFromCpls = function (payload) {
        var self = this;
        $.ajax({
            type: 'POST',
// url: ap_queryAndDownload.CONFIG.masterFromCplId_url,
            url: 'http://' + self.options.base_ip_address + ':' + self.options.base_ip_port + self.options.url.masterFromCplId_url,
            data: {"pdObj": payload},
            success: function (response) {
                /* Convert the response in an object, i needed. */
                var json = response;
                if (typeof(response) == 'string')
                    json = $.parseJSON(response);
                var mastertable_data = new Array();
                for (var i = 0; i < json.length; i++) {
                    var row = {};
                    for (var j = 0; j < json[i].length; j++) {
                        if ((json[i][j] == null) || (typeof json[i][j] == 'undefined')) {
                            json[i][j] = "";
                        }
                        switch (j) {
                            case 0:
//cpl_id[i] = json[i][j];
                                row["CplId"] = json[i][j];
                                break;
//                            case 1:
////cpl_code[i] = json[i][j];
//                                break;
                            case 1:
//commodity_id[i] = json[i][j];
                                row["CommodityId"] = json[i][j];
                                break;
                            case 2:
//country_code[i] = json[i][j];
                                row["CountryCode"] = json[i][j];
                                break;
                            case 3:
// country_name[i] = json[i][j];
                                row["CountryName"] = json[i][j];
                                break;
                            case 4:
//subnational_code[i] = json[i][j];
                                row["SubnationalCode"] = json[i][j];
                                break;
                            case 5:
// subnational_name[i] = json[i][j];
                                row["SubnationalName"] = json[i][j];
                                break;
                            case 6:
//commoditydomain_code[i] = json[i][j];
                                row["CommodityDomainCode"] = json[i][j];
                                break;
                            case 7:
//commoditydomain_name[i] = json[i][j];
                                row["CommodityDomainName"] = json[i][j];
                                break;
                            case 8:
//commodityclass_code[i] = json[i][j];
                                row["CommodityClassCode"] = json[i][j];
                                break;
                            case 9:
//commodityclass_name[i] = json[i][j];
                                row["CommodityClassName"] = json[i][j];
                                break;
                            case 10:
//policydomain_code[i] = json[i][j];
                                row["PolicyDomainCode"] = json[i][j];
                                break;
                            case 11:
// policydomain_name[i] = json[i][j];
                                row["PolicyDomainName"] = json[i][j];
                                break;
                            case 12:
//policytype_code[i] = json[i][j];
                                row["PolicyTypeCode"] = json[i][j];
                                break;
                            case 13:
// policytype_name[i] = json[i][j];
                                row["PolicyTypeName"] = json[i][j];
                                break;
                            case 14:
//policymeasure_code[i] = json[i][j];
                                row["PolicyMeasureCode"] = json[i][j];
                                break;
                            case 15:
// policymeasure_name[i] = json[i][j];
                                row["PolicyMeasureName"] = json[i][j];
                                break;
                            case 16:
//condition_code[i] = json[i][j];
                                row["PolicyConditionCode"] = json[i][j];
                                break;
                            case 17:
// condition[i] = json[i][j];
                                row["PolicyCondition"] = json[i][j];
                                break;
                            case 18:
//individualpolicy_code[i] = json[i][j];
                                row["IndividualPolicyCode"] = json[i][j];
                                break;
                            case 19:
// individualpolicy_name[i] = json[i][j];
                                row["IndividualPolicyName"] = json[i][j];
                                break;
                        }
                    }
                    mastertable_data[i] = row;
                }
                self._master_grid_creation3(mastertable_data);
            },
            error: function (err, b, c) {
                alert(err.status + ", " + b + ", " + c);
            }
        });
    };

    PreviewTable.prototype._master_grid_creation3 = function (dataBefore) {

        var self = this;

        //var dataBefore = [["4312","2357","12","Argentina","99","n.a","1","Agricultural","3","Maize","1","Trade","1","Export measures","1","Export prohibition","105","n.a.","999","n.a.",null],
        //    ["4356","2277","12","Argentina","99","n.a","1","Agricultural","3","Maize","1","Trade","1","Export measures","1","Export prohibition","105","n.a.","999","n.a.",null],
        //    ["4575","2365","12","Argentina","99","n.a","1","Agricultural","8","Maize + Wheat","1","Trade","1","Export measures","1","Export prohibition","105","n.a.","999","n.a.",null],
        //    ["4606","2277","12","Argentina","99","n.a","1","Agricultural","3","Maize","1","Trade","1","Export measures","1","Export prohibition","127","Organic maize and those shipments carried out in bags only","999","n.a.",null]];

        var data = this._data_format(dataBefore);
        log.info(data);

        this.options.masterData = data;
        //host_preview.masterData = data;
        var source =
        {
            datafields: [
                { name: 'CountryName' },
                { name: 'SubnationalName' },
                { name: 'CommodityClassName' },
                { name: 'CommodityId' },
                { name: 'PolicyDomainName' },
                { name: 'PolicyTypeName' },
                { name: 'PolicyMeasureName' },
                { name: 'PolicyCondition' },
                { name: 'IndividualPolicyName' },
                { name: 'CplId' }
            ],
            id: 'CplId',
            localdata: data,
            datatype: "array"
        };

        // create nested grid.
        var initrowdetails = function (index, parentElement, gridElement, record) {
//            console.log("INITROWDETAILS 2")
//            console.log(host_preview.masterData)
//            console.log(host_preview.masterData[index])
//            console.log(index)
//            console.log(parentElement)
//            console.log(gridElement)
//            console.log(record)
            log.info(this)
            log.info(self)
            $.proxy(self._build_policyTableGrid2(index, parentElement, gridElement, record), self)
            //this._build_policyTableGrid(index, parentElement, gridElement, record, host_preview, host);
        }

        var renderer = function (row, column, value) {
            return '<span class=fx_master_table_render>' + value + '</span>';
        };

        var $p =  $('#'+this.options.standard_preview_jqxgrid).parent();

        var $c = $("<div id=" + this.options.standard_preview_jqxgrid + "></div>");
        $("#" + this.options.standard_preview_jqxgrid).jqxGrid('destroy');

        if ($("#" + this.options.standard_preview_jqxgrid).length !== 0) {
            $("#" + this.options.standard_preview_jqxgrid).remove()
        }

        $p.append( $c );

        // create jqxgrid
        $('#'+this.options.standard_preview_jqxgrid).jqxGrid(
            {
                width: '100%',
                height: 370,
                source: source,
//                theme: theme,
                rowdetails: true,
                rowsheight: 35,
                initrowdetails: initrowdetails,
                rowdetailstemplate: { rowdetails: "<div id='grid' class=fx_master_table_row_details></div>", rowdetailsheight: 200, rowdetailshidden: true },
                enabletooltips: true,
                columnsheight: 35,
                rowsheight: 30,
                columnsresize: true,
                sortable: true,
                filterable: true,
                showfilterrow: true,
                ready: function () {
                    $("#" + self.options.standard_preview_jqxgrid).jqxGrid('showrowdetails', 0);
                },

                columns: [
                    { text: 'Country', width: '10%', datafield: 'CountryName', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer},
                    { text: 'Subnational level', datafield: 'SubnationalName', width: '10%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                    { text: 'Commodity Class', datafield: 'CommodityClassName', width: '15%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                    { text: 'Commodity ID', datafield: 'CommodityId', width: '10%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                    { text: 'Policy Domain', datafield: 'PolicyDomainName', width: '10%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                    { text: 'Policy Type', datafield: 'PolicyTypeName', width: '15%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                    { text: 'Policy Measure', datafield: 'PolicyMeasureName', width: '15%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                    { text: 'Condition', datafield: 'PolicyCondition', width: '15%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                    { text: 'Individual Policy', datafield: 'IndividualPolicyName', width: '15%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer }
                ]
            });
    };


    PreviewTable.prototype._build_policyTableGrid2 = function(index, parentElement, gridElement, record)
    {
        log.info("in _build_policyTableGrid2")
        log.info(this)
        log.info(self)

        var self = this;

        var id = record.uid.toString();

        log.info(this.options.policy_data_object)
        var data = this.options.policy_data_object.voObjectConstruction();
        data.datasource = this.options.datasource;
        //it could be 'slider' or 'classic'
        data.cpl_id = ''+record.CplId.toString();
        data.commodity_id = ''+record.CommodityId.toString();
        data.yearTab = this.options.year_tab;
        data.year_list = this.options.year_list;
//        data.start_date = host_preview.options.start_date;
//        data.end_date = host_preview.options.end_date;
//        data.start_date = host_preview.options.start_date || '1983-01-01';
//        data.end_date = host_preview.options.end_date || '2025-01-01';
        data.start_date = this.options.start_date || this.options.default_start_date;
        data.end_date = this.options.end_date || this.options.default_end_date;

        //this.options.policy_data_object = data;
        var payloadrest = JSON.stringify(data);

        log.info(data)
        log.info(payloadrest)

        payloadrest = {"datasource":"POLICY","policy_domain_code":1,"commodity_domain_code":1,"commodity_class_code":"3,9,13,18,11,10,14,8","policy_type_code":["1"],"policy_measure_code":["1"],"country_code":"12","yearTab":"slider","year_list":"","start_date":"2007-01-01","end_date":"2015-01-28","cpl_id":"","commodity_id":"","policyTypesInfo":[]}


        log.info(payloadrest)
        //        console.log("Before Policy Table Start");
//        console.log("data.datasource = "+data.datasource);
//        console.log("data.cpl_id = "+data.cpl_id);
//        console.log("data.commodity_id = "+data.commodity_id);
//        console.log("data.yearTab = "+data.yearTab);
//        console.log("data.year_list = "+data.year_list);
//        console.log("data.start_date = "+data.start_date);
//        console.log("data.end_date = "+data.end_date);
//        console.log("Before Policy Table End");
        log.info("before ajax call")
        log.info('http://' + this.options.base_ip_address + ':' + this.options.base_ip_port + this.options.url.policyTable_url)
        //$.ajax({
        //    type: 'POST',
        //    url: 'http://' + this.options.base_ip_address + ':' + this.options.base_ip_port + this.options.url.policyTable_url,
        //    data: {"pdObj": payloadrest},
        //
        //    success: function (response) {

                log.info("success ajax call")
        var response = [["POLICY_12_99_1_3_1_1_1_0","20957","4312","2357","HS2007","15071201",null,"n.a.","6/11/2007","11/11/2007","",null,"","Observed","",null,"To ensure the normal and transparent functioning of the agricultural export sector.","http://www.infoleg.gov.ar/infolegInternet/anexos/130000-134999/134245/norma.htm","Comercio Exterior","Resolución 333/2007","","6/11/2007","Yes","","","",null,null,null,"","OECD Export Restrictions","5","Introduction","","15071201","Aceite de maize a granel y/o en envases de 10 kg. ariba","www.infoleg.gov.ar_infolegInternet_anexos_130000-134999_134245_norma.pdf","","(-) Crude maize oil",null,"Crude maize(corn) oil",null,null,null],
            ["POLICY_12_99_1_3_1_1_1_0","20958","4312","2357","HS2007","15071201",null,"n.a.","12/11/2007",null,"",null,"elim","Observed","",null,"Facilitate exports without affecting the proper domestic supply.","http://www.infoleg.gov.ar/infolegInternet/anexos/130000-134999/134434/norma.htm","Comercio Exterior","Resolución 341/2007","","12/11/2007","","","","",null,null,null,"","OECD Export Restrictions","2","Elimination","","15071201","Aceite de maize a granel y/o en envases de 10 kg. ariba","www.infoleg.gov.ar_infolegInternet_anexos_130000-134999_134434_norma.pdf","","(-) Crude maize oil",null,"Crude maize (corn) oil",null,null,null]];

                /* Convert the response in an object, if needed. */
                var json = response;
                if (typeof(response) == 'string')
                    json = $.parseJSON(response);
                //  console.log("json ***"+json+"***");
                var metadata_id = [];
                var policy_id = [];
                var cpl_id = [];
                var commodity_id = [];
                var hs_version = [];
                var hs_code = [];
                var hs_suffix = [];
                var policy_element = [];
                var start_date = [];
                var end_date = [];
                var units = [];
                var value = [];
                var value_text = [];
                var value_type = [];
                var exemptions = [];
                var MinAVTariffValue = [];
                var notes = [];
                var link = [];
                var source = [];
                var title_of_notice = [];
                var legal_basis_name = [];
                var date_of_publication = [];
                var imposed_end_date = [];
                var second_generation_specific = [];
                var benchmark_tax = [];
                var benchmark_product = [];
                var tax_rate_biofuel = [];
                var tax_rate_benchmark = [];
                var start_date_tax = [];
                var benchmark_link = [];
                var original_dataset = [];
                var type_of_change_code = [];
                var type_of_change_name = [];
                var measure_description = [];
                var product_original_hs = [];
                var product_original_name = [];
                //var implementationprocedure = [];
                //var xs_yeartype = [];
                var link_pdf = [];
                var benchmark_link_pdf = [];
                var short_description = [];
                var shared_group_code = [];
                var description = [];
                var MaxAVTariffValue = [];
                var CountAVTariff = [];
                var CountNAVTariff = [];

                var policytable_data = new Array();
                for (var i = 0; i < json.length; i++) {
                    var row = {};
                    //row["CountryCode"] = record
                    //row["AdditionalInfoButton"] = "Show";
                    //row["AdditionalInfoButton"] = "Show";
                    //row["MetadataButton"] = "Show";
                    //row["EditButton"] = "Edit";
                    //row["DeleteButton"] = "Delete";
                    row["AdditionalInfoButton"] = "Show";
                    if((self.options.button_preview_action_type == "searchEditPolicy")||(self.options.button_preview_action_type == "searchCreatePolicy"))
                    {
                        row["MetadataButton"] = "Edit";
                    }
                    else{
                        row["MetadataButton"] = "Show";
                    }
                    //row["MetadataButton"] = "Edit";
                    row["EditButton"] = "Edit";
                    row["DeleteButton"] = "Delete";
                    for (var j = 0; j < json[i].length; j++) {
                        if ((json[i][j] == null) || (typeof json[i][j] == 'undefined')) {
                            json[i][j] = "";
                        }
                        switch (j) {
                            case 0:
                                metadata_id[i] = json[i][j];
                                row["Metadata_id"] = metadata_id[i];
                                break;
                            case 1:
                                policy_id[i] = json[i][j];
                                row["Policy_id"]= policy_id[i];
                                break;
                            case 2:
                                cpl_id[i] = json[i][j];
                                row["CplId"] = json[i][j];
                                break;
                            case 3:
                                commodity_id[i] = json[i][j];
                                //This is important for the Shared Group
                                row["CommodityId"] = json[i][j];
                                break;
                            case 4:
                                hs_version[i] = json[i][j];
                                row["HsVersion"] = json[i][j];
                                break;
                            case 5:
                                hs_code[i] = json[i][j];
                                row["HsCode"] = json[i][j];
                                break;
                            case 6:
                                hs_suffix[i] = json[i][j];
                                row["HsSuffix"] = json[i][j];
                                break;
                            case 7:
                                policy_element[i] = json[i][j];
                                row["PolicyElement"] = json[i][j];
                                break;
                            case 8:
                                start_date[i] = json[i][j];
                                row["StartDate"] = json[i][j];
                                break;
                            case 9:
                                end_date[i] = json[i][j];
                                row["EndDate"] = json[i][j];
                                break;
                            case 10:
                                units[i] = json[i][j];
                                row["Unit"] = json[i][j];
                                break;
                            case 11:
                                value[i] = json[i][j];
                                row["Value"] = json[i][j];
                                break;
                            case 12:
                                value_text[i] = json[i][j];
                                row["ValueText"] = json[i][j];
                                break;
                            case 13:
                                value_type[i] = json[i][j];
                                row["ValueType"] = json[i][j];
                                break;
                            case 14:
                                exemptions[i] = json[i][j];
                                row["Exemptions"] = json[i][j];
                                break;
                            case 15:
                                MinAVTariffValue[i] = json[i][j];
                                row["MinAVTariffValue"] = json[i][j];
                                break;
                            case 16:
                                notes[i] = json[i][j];
                                row["Notes"] = json[i][j];
                                break;
                            case 17:
                                link[i] = json[i][j];
                                row["Link"] = json[i][j];
                                break;
                            case 18:
                                source[i] = json[i][j];
                                row["Source"] = json[i][j];
                                break;
                            case 19:
                                title_of_notice[i] = json[i][j];
                                row["TitleOfNotice"] = json[i][j];
                                break;
                            case 20:
                                legal_basis_name[i] = json[i][j];
                                row["LegalBasisName"] = json[i][j];
                                break;
                            case 21:
                                date_of_publication[i] = json[i][j];
                                row["DateOfPublication"] = json[i][j];
                                break;
                            case 22:
                                imposed_end_date[i] = json[i][j];
                                row["ImposedEndDate"] = json[i][j];
                                break;
                            case 23:
                                second_generation_specific[i] = json[i][j];
                                break;
                            case 24:
                                benchmark_tax[i] = json[i][j];
                                break;
                            case 25:
                                benchmark_product[i] = json[i][j];
                                break;
                            case 26:
                                tax_rate_biofuel[i] = json[i][j];
                                break;
                            case 27:
                                tax_rate_benchmark[i] = json[i][j];
                                row["TaxRateBenchmark"] = json[i][j];
                                break;
                            case 28:
                                start_date_tax[i] = json[i][j];
                                row["StartDateTax"] = json[i][j];
                                break;
                            case 29:
                                benchmark_link[i] = json[i][j];
                                row["BenchmarkLink"] = json[i][j];
                                break;
                            case 30:
                                original_dataset[i] = json[i][j];
                                row["OriginalDataset"] = json[i][j];
                                break;
                            case 31:
                                type_of_change_code[i] = json[i][j];
                                break;
                            case 32:
                                type_of_change_name[i] = json[i][j];
                                row["TypeOfChangeName"] = json[i][j];
                                break;
                            case 33:
                                measure_description[i] = json[i][j];
                                row["MeasureDescription"] = json[i][j];
                                break;
                            case 34:
                                product_original_hs[i] = json[i][j];
                                row["ProductOriginalHs"] = json[i][j];
                                break;
                            case 35:
                                product_original_name[i] = json[i][j];
                                row["ProductOriginalName"] = json[i][j];
                                break;
                            //case 36:
                            //    implementationprocedure[i] = json[i][j];
                            //    row["ImplementationProcedure"] = json[i][j];
                            //    break;
                            //case 37:
                            //    xs_yeartype[i] = json[i][j];
                            //    row["XsYearType"] = json[i][j];
                            //    break;
                            case 36:
                                link_pdf[i] = json[i][j];
                                row["LinkPdf"] = json[i][j];
                                break;
                            case 37:
                                benchmark_link_pdf[i] = json[i][j];
                                row["BenchmarkLinkPdf"] = json[i][j];
                                break;
                            case 38:
                                short_description[i] = json[i][j];
                                row["ShortDescription"] = json[i][j];
                                break;
                            case 39:
                                shared_group_code[i] = json[i][j];
                                row["SharedGroupCode"] = json[i][j];
                                break;
                            case 40:
                                shared_group_code[i] = json[i][j];
                                row["Description"] = json[i][j];
                                break;
                            case 41:
                                shared_group_code[i] = json[i][j];
                                row["MaxAVTariffValue"] = json[i][j];
                                break;
                            case 42:
                                shared_group_code[i] = json[i][j];
                                row["CountAVTariff"] = json[i][j];
                                break;
                            case 43:
                                shared_group_code[i] = json[i][j];
                                row["CountNAVTariff"] = json[i][j];
                                break;
                        }
                    }
                    row["MasterIndex"] = index;
                    policytable_data[i]= row;
                }

                $.proxy(self._policy_grid_creation(policytable_data, parentElement, index), self)
        //self._policy_grid_creation(policytable_data, parentElement, index, self);
        //    },
        //    error : function(err,b,c) {
        //        alert(err.status + ", " + b + ", " + c);
        //    }
        //});

    }

    PreviewTable.prototype._build_policyTableGrid = function(index, parentElement, gridElement, record, host_preview, host)
    {
        var id = record.uid.toString();

        var data = host_preview.options.host_instance.options.host_policy_data_object.voObjectConstruction();
        data.datasource = host_preview.options.host_instance.options.datasource;
        //it could be 'slider' or 'classic'
        data.cpl_id = ''+record.CplId.toString();
        data.commodity_id = ''+record.CommodityId.toString();
        data.yearTab = host_preview.options.year_tab;
        data.year_list = host_preview.options.year_list;
//        data.start_date = host_preview.options.start_date;
//        data.end_date = host_preview.options.end_date;
//        data.start_date = host_preview.options.start_date || '1983-01-01';
//        data.end_date = host_preview.options.end_date || '2025-01-01';
        data.start_date = host_preview.options.start_date || host.options.default_start_date;
        data.end_date = host_preview.options.end_date || host.options.default_end_date;
        var payloadrest = JSON.stringify(data);

//        console.log("Before Policy Table Start");
//        console.log("data.datasource = "+data.datasource);
//        console.log("data.cpl_id = "+data.cpl_id);
//        console.log("data.commodity_id = "+data.commodity_id);
//        console.log("data.yearTab = "+data.yearTab);
//        console.log("data.year_list = "+data.year_list);
//        console.log("data.start_date = "+data.start_date);
//        console.log("data.end_date = "+data.end_date);
//        console.log("Before Policy Table End");

        $.ajax({
            type: 'POST',
//          url: ap_queryAndDownload.CONFIG.shareGroupCommodities_url+ '/' + ap_queryAndDownload.CONFIG.datasource+ '/' +ap_masterTableObject.CONFIG.commodity_id[commodity_index],
            url: 'http://' + host_preview.options.host_instance.options.base_ip_address + ':' + host_preview.options.host_instance.options.base_ip_port + host_preview.options.host_instance.options.policyTable_url,
            data: {"pdObj": payloadrest},

            success: function (response) {

                /* Convert the response in an object, if needed. */
                var json = response;
                if (typeof(response) == 'string')
                    json = $.parseJSON(response);
                //  console.log("json ***"+json+"***");
                var metadata_id = [];
                var policy_id = [];
                var cpl_id = [];
                var commodity_id = [];
                var hs_version = [];
                var hs_code = [];
                var hs_suffix = [];
                var policy_element = [];
                var start_date = [];
                var end_date = [];
                var units = [];
                var value = [];
                var value_text = [];
                var value_type = [];
                var exemptions = [];
                var MinAVTariffValue = [];
                var notes = [];
                var link = [];
                var source = [];
                var title_of_notice = [];
                var legal_basis_name = [];
                var date_of_publication = [];
                var imposed_end_date = [];
                var second_generation_specific = [];
                var benchmark_tax = [];
                var benchmark_product = [];
                var tax_rate_biofuel = [];
                var tax_rate_benchmark = [];
                var start_date_tax = [];
                var benchmark_link = [];
                var original_dataset = [];
                var type_of_change_code = [];
                var type_of_change_name = [];
                var measure_description = [];
                var product_original_hs = [];
                var product_original_name = [];
                //var implementationprocedure = [];
                //var xs_yeartype = [];
                var link_pdf = [];
                var benchmark_link_pdf = [];
                var short_description = [];
                var shared_group_code = [];
                var description = [];
                var MaxAVTariffValue = [];
                var CountAVTariff = [];
                var CountNAVTariff = [];

                var policytable_data = new Array();
                for (var i = 0; i < json.length; i++) {
                    var row = {};
                    //row["CountryCode"] = record
                    //row["AdditionalInfoButton"] = "Show";
                    //row["AdditionalInfoButton"] = "Show";
                    //row["MetadataButton"] = "Show";
                    //row["EditButton"] = "Edit";
                    //row["DeleteButton"] = "Delete";
                    row["AdditionalInfoButton"] = "Show";
                    if((host.options.button_preview_action_type == "searchEditPolicy")||(host.options.button_preview_action_type == "searchCreatePolicy"))
                    {
                        row["MetadataButton"] = "Edit";
                    }
                    else{
                        row["MetadataButton"] = "Show";
                    }
                    //row["MetadataButton"] = "Edit";
                    row["EditButton"] = "Edit";
                    row["DeleteButton"] = "Delete";
                    for (var j = 0; j < json[i].length; j++) {
                        if ((json[i][j] == null) || (typeof json[i][j] == 'undefined')) {
                            json[i][j] = "";
                        }
                        switch (j) {
                            case 0:
                                metadata_id[i] = json[i][j];
                                row["Metadata_id"] = metadata_id[i];
                                break;
                            case 1:
                                policy_id[i] = json[i][j];
                                row["Policy_id"]= policy_id[i];
                                break;
                            case 2:
                                cpl_id[i] = json[i][j];
                                row["CplId"] = json[i][j];
                                break;
                            case 3:
                                commodity_id[i] = json[i][j];
                                //This is important for the Shared Group
                                row["CommodityId"] = json[i][j];
                                break;
                            case 4:
                                hs_version[i] = json[i][j];
                                row["HsVersion"] = json[i][j];
                                break;
                            case 5:
                                hs_code[i] = json[i][j];
                                row["HsCode"] = json[i][j];
                                break;
                            case 6:
                                hs_suffix[i] = json[i][j];
                                row["HsSuffix"] = json[i][j];
                                break;
                            case 7:
                                policy_element[i] = json[i][j];
                                row["PolicyElement"] = json[i][j];
                                break;
                            case 8:
                                start_date[i] = json[i][j];
                                row["StartDate"] = json[i][j];
                                break;
                            case 9:
                                end_date[i] = json[i][j];
                                row["EndDate"] = json[i][j];
                                break;
                            case 10:
                                units[i] = json[i][j];
                                row["Unit"] = json[i][j];
                                break;
                            case 11:
                                value[i] = json[i][j];
                                row["Value"] = json[i][j];
                                break;
                            case 12:
                                value_text[i] = json[i][j];
                                row["ValueText"] = json[i][j];
                                break;
                            case 13:
                                value_type[i] = json[i][j];
                                row["ValueType"] = json[i][j];
                                break;
                            case 14:
                                exemptions[i] = json[i][j];
                                row["Exemptions"] = json[i][j];
                                break;
                            case 15:
                                MinAVTariffValue[i] = json[i][j];
                                row["MinAVTariffValue"] = json[i][j];
                                break;
                            case 16:
                                notes[i] = json[i][j];
                                row["Notes"] = json[i][j];
                                break;
                            case 17:
                                link[i] = json[i][j];
                                row["Link"] = json[i][j];
                                break;
                            case 18:
                                source[i] = json[i][j];
                                row["Source"] = json[i][j];
                                break;
                            case 19:
                                title_of_notice[i] = json[i][j];
                                row["TitleOfNotice"] = json[i][j];
                                break;
                            case 20:
                                legal_basis_name[i] = json[i][j];
                                row["LegalBasisName"] = json[i][j];
                                break;
                            case 21:
                                date_of_publication[i] = json[i][j];
                                row["DateOfPublication"] = json[i][j];
                                break;
                            case 22:
                                imposed_end_date[i] = json[i][j];
                                row["ImposedEndDate"] = json[i][j];
                                break;
                            case 23:
                                second_generation_specific[i] = json[i][j];
                                break;
                            case 24:
                                benchmark_tax[i] = json[i][j];
                                break;
                            case 25:
                                benchmark_product[i] = json[i][j];
                                break;
                            case 26:
                                tax_rate_biofuel[i] = json[i][j];
                                break;
                            case 27:
                                tax_rate_benchmark[i] = json[i][j];
                                row["TaxRateBenchmark"] = json[i][j];
                                break;
                            case 28:
                                start_date_tax[i] = json[i][j];
                                row["StartDateTax"] = json[i][j];
                                break;
                            case 29:
                                benchmark_link[i] = json[i][j];
                                row["BenchmarkLink"] = json[i][j];
                                break;
                            case 30:
                                original_dataset[i] = json[i][j];
                                row["OriginalDataset"] = json[i][j];
                                break;
                            case 31:
                                type_of_change_code[i] = json[i][j];
                                break;
                            case 32:
                                type_of_change_name[i] = json[i][j];
                                row["TypeOfChangeName"] = json[i][j];
                                break;
                            case 33:
                                measure_description[i] = json[i][j];
                                row["MeasureDescription"] = json[i][j];
                                break;
                            case 34:
                                product_original_hs[i] = json[i][j];
                                row["ProductOriginalHs"] = json[i][j];
                                break;
                            case 35:
                                product_original_name[i] = json[i][j];
                                row["ProductOriginalName"] = json[i][j];
                                break;
                            //case 36:
                            //    implementationprocedure[i] = json[i][j];
                            //    row["ImplementationProcedure"] = json[i][j];
                            //    break;
                            //case 37:
                            //    xs_yeartype[i] = json[i][j];
                            //    row["XsYearType"] = json[i][j];
                            //    break;
                            case 36:
                                link_pdf[i] = json[i][j];
                                row["LinkPdf"] = json[i][j];
                                break;
                            case 37:
                                benchmark_link_pdf[i] = json[i][j];
                                row["BenchmarkLinkPdf"] = json[i][j];
                                break;
                            case 38:
                                short_description[i] = json[i][j];
                                row["ShortDescription"] = json[i][j];
                                break;
                            case 39:
                                shared_group_code[i] = json[i][j];
                                row["SharedGroupCode"] = json[i][j];
                                break;
                            case 40:
                                shared_group_code[i] = json[i][j];
                                row["Description"] = json[i][j];
                                break;
                            case 41:
                                shared_group_code[i] = json[i][j];
                                row["MaxAVTariffValue"] = json[i][j];
                                break;
                            case 42:
                                shared_group_code[i] = json[i][j];
                                row["CountAVTariff"] = json[i][j];
                                break;
                            case 43:
                                shared_group_code[i] = json[i][j];
                                row["CountNAVTariff"] = json[i][j];
                                break;
                        }
                    }
                    row["MasterIndex"] = index;
                    policytable_data[i]= row;
                }

                host_preview._policy_grid_creation(policytable_data, parentElement, host_preview, host, index);
            },
            error : function(err,b,c) {
                alert(err.status + ", " + b + ", " + c);
            }
        });
    };

    PreviewTable.prototype._policy_grid_creation = function(policytable_data, parentElement, index)
    {
        log.info("in _policy_grid_creation")
        //"HsVersion", "HsCode", "HsSuffix", "PolicyElement", "StartDate", "EndDate", "Unit", "Value", "ValueText", "Exemptions", "ShortDescription"
        var policy_source = "";

        var info = this._getPolicyTable_datafields(policytable_data, this.options.masterData, this);
        //var info = $.proxy(this._getPolicyTable_datafields(policytable_data, this.options.masterData), this);
        log.info("in _policy_grid_creation after info")
        log.info(info);
        policy_source =
        {
            localdata: policytable_data,
            datatype: "array",
            id: "CommodityId",
            datafields: info.datafields
        };
        var grid = $($(parentElement).children()[0]);

        if (grid != null) {
            grid.jqxGrid({ source: policy_source, width: '95%',//theme: theme,
                height : 170,
                columnsheight: 40,
                enabletooltips: true,
                columnsresize: true,
                columns: info.columns,
                sortable: true
            });

            //grid.on('cellclick', function (event) {
            //    if(event.args.datafield=="SharedGroupCode"){
            //        var policy_grid = $($(parentElement).children()[0]);
            //        host_preview.buildShareGroupPolicyTables(host_preview, policy_grid, event);
            //    }
            //    else if(event.args.datafield=="AdditionalInfoButton"){
            //        var policy_grid = $($(parentElement).children()[0]);
            //        var policy_grid2 = $($(parentElement).children()[0]);
            //        var datarecord = policy_grid2.jqxGrid('getrowdata', event.args.rowindex);
            //        //console.log(host_preview.masterData[datarecord["MasterIndex"]])
            //
            //        var data_entry_obj = {};
            //        data_entry_obj["policy_data"] = datarecord;
            //        data_entry_obj["master_data"] = host_preview.masterData[datarecord["MasterIndex"]];
            //        console.log("Additional info obj")
            //        console.log(data_entry_obj)
            //        host_preview.buildAdditionalPolicyTables(host_preview, policy_grid, event);
            //    }
            //    else if(event.args.datafield=="EditButton"){
            //        var properties = {};
            //        var policy_grid = $($(parentElement).children()[0]);
            //        var datarecord = policy_grid.jqxGrid('getrowdata', event.args.rowindex);
            //        var data_entry_obj = {};
            //        data_entry_obj["policy_data"] = datarecord;
            //        data_entry_obj["master_data"] = host_preview.masterData[datarecord["MasterIndex"]];
            //        $('.previous_content').hide();
            //        $('body').trigger('EditSearchButton', data_entry_obj);
            //    }
            //    else if(event.args.datafield=="DeleteButton"){
            //        var policy_grid = $($(parentElement).children()[0]);
            //        var policy_grid2 = $($(parentElement).children()[0]);
            //        var datarecord = policy_grid2.jqxGrid('getrowdata', event.args.rowindex);
            //        var data_entry_obj = {};
            //        data_entry_obj["policy_data"] = datarecord;
            //        data_entry_obj["master_data"] = host_preview.masterData[datarecord["MasterIndex"]];
            //        alert("on delete action trigger")
            //        $('#delMod_submit').data('data-loggedUser', host.options.logged_user_code);
            //        $('body').trigger('DeleteSearchButton', data_entry_obj);
            //    }
            //    else if(event.args.datafield=="MetadataButton"){
            //        var policy_grid = $($(parentElement).children()[0]);
            //        var policy_grid2 = $($(parentElement).children()[0]);
            //        var datarecord = policy_grid2.jqxGrid('getrowdata', event.args.rowindex);
            //        var data_entry_obj = {};
            //        data_entry_obj["policy_data"] = datarecord;
            //        data_entry_obj["master_data"] = host_preview.masterData[datarecord["MasterIndex"]];
            //        $('body').trigger('MetadataButton', data_entry_obj);
            //        if((host.options.button_preview_action_type != "searchEditPolicy")&&(host.options.button_preview_action_type != "searchAddPolicy")&&(host.options.button_preview_action_type != "bulkAndDownloadPolicy")){
            //            host_preview.buildMetadataViewerTables(host, host_preview, policy_grid, event);
            //        }
            //    }
            //});
        }
    };

    //    HostUtility.prototype.getPolicyTable_datafields = function(data, export_type) {
    PreviewTable.prototype._getPolicyTable_datafields = function(data, masterData, self) {
        //console.log(data)
        //console.log(masterData)
        //Master data for the policy table element(upper line)
        var masterData = masterData[data[0]["MasterIndex"]];
        var info= new Object();

        var tooltiprenderer = function (element) {
            $(element).jqxTooltip({position: 'mouse', content: $(element).text() });
        }

//        var linkrenderer = function (row, column, value) {
//            return '<a style="margin-left: 4px; margin-top: 5px; float: left;">' + value + '</a>';
//        }
//
//        var linkrendererButton = function (row, column, value) {
//            return '<a style="margin-left: 8px; margin-top: 5px; float: left;">' + value + '</a>';
//        }

        var linkrenderer = function (row, column, value) {
            return '<a class=fx_policy_table_link_datafield>' + value + '</a>';
        }

        var linkrendererButton = function (row, column, value) {
            return '<a class=fx_policy_table_link_datafield_button>' + value + '</a>';
        }

        var datafields = new Array();
        var columns = new Array();
        var obj = { name: 'ShortDescription' };
        var obj2 = { text: 'Short Description', datafield: 'ShortDescription', rendered: tooltiprenderer };
        datafields.push(obj);
        columns.push(obj2);

        if((data[0]["SharedGroupCode"]!=null)&&(typeof data[0]["SharedGroupCode"]!="undefined")&&(data[0]["SharedGroupCode"].length>0)&&(data[0]["SharedGroupCode"]!= "none"))
        {
            //The element is a Shared Group
            //Insert Shared Group Code button
            obj = { name: 'SharedGroupCode' };
            datafields.push(obj);
            obj = { name: 'CommodityId'};
            datafields.push(obj);
            obj2 = { text: 'Shared Group', datafield: 'SharedGroupCode', cellsrenderer: linkrenderer };
            columns.push(obj2);
        }
        else{
            //No Shared Group
            obj = { name: 'HsCode' };
            datafields.push(obj);
            obj2 = { text: 'HS Code', datafield: 'HsCode', rendered: tooltiprenderer };
            columns.push(obj2);
            obj = { name: 'HsVersion' };
            datafields.push(obj);
            obj2 = { text: 'HS Version', datafield: 'HsVersion', rendered: tooltiprenderer };
            columns.push(obj2);
            //11;Import tariffs and 12;Tariff quotas
            if((masterData["PolicyMeasureCode"]!=null)&&(typeof masterData["PolicyMeasureCode"]!="undefined")&&((masterData["PolicyMeasureCode"]==self.options.importTariffs)||(masterData["PolicyMeasureCode"]==self.options.tariffQuotas)))
            {
                obj = { name: 'HsSuffix' };
                datafields.push(obj);
                obj2 = { text: 'HS Suffix', datafield: 'HsSuffix', rendered: tooltiprenderer };
                columns.push(obj2);
            }
        }

        obj = { name: 'StartDate' };
        datafields.push(obj);
        obj2 = { text: 'Start Date', datafield: 'StartDate', rendered: tooltiprenderer  };
        columns.push(obj2);
        obj = { name: 'EndDate' };
        datafields.push(obj);
        obj2 = { text: 'End Date', datafield: 'EndDate', rendered: tooltiprenderer  };
        columns.push(obj2);

        var combination = this._value_existence(data);
        if(combination==0)
        {
            //Value and Value Text
            obj = { name: 'Unit' };
            datafields.push(obj);
            obj2 = { text: 'Unit', datafield: 'Unit', rendered: tooltiprenderer  };
            columns.push(obj2);
            obj = { name: 'Value' };
            datafields.push(obj);
            obj2 = { text: 'Value', datafield: 'Value', rendered: tooltiprenderer  };
            columns.push(obj2);
            obj = { name: 'ValueText' };
            datafields.push(obj);
            obj2 = { text: 'Value Text', datafield: 'ValueText', rendered: tooltiprenderer  };
            columns.push(obj2);
        }
        else if(combination==1)
        {
            //No Value, No Value Text
        }
        else if(combination==2)
        {
            //Value
            obj = { name: 'Unit' };
            datafields.push(obj);
            obj2 = { text: 'Unit', datafield: 'Unit', rendered: tooltiprenderer  };
            columns.push(obj2);
            obj = { name: 'Value' };
            datafields.push(obj);
            obj2 = { text: 'Value', datafield: 'Value', rendered: tooltiprenderer  };
            columns.push(obj2);
        }
        else if(combination==3)
        {
            //Value Text
            obj = { name: 'ValueText' };
            datafields.push(obj);
            obj2 = { text: 'Value Text', datafield: 'ValueText', rendered: tooltiprenderer  };
            columns.push(obj2);
        }

//        if((data[0]["Value"]!=null)&&(typeof data[0]["Value"]!="undefined")&&(data[0]["Value"].length>0)&&(data[0]["Value"]!= "none"))
//        {
//            obj = { name: 'Value' };
//            obj2 = { text: 'Value', datafield: 'Value', rendered: tooltiprenderer  };
//        }
//        else{
//            obj = { name: 'ValueText' };
//            obj2 = { text: 'Value Text', datafield: 'ValueText', rendered: tooltiprenderer  };
//        }
//        datafields.push(obj);
//        columns.push(obj2);

        if((data[0]["Exemptions"]!=null)&&(typeof data[0]["Exemptions"]!="undefined")&&(data[0]["Exemptions"].length>0)&&(data[0]["Exemptions"]!= "none"))
        {
            obj = { name: 'Exemptions' };
            datafields.push(obj);
            obj2 = { text: 'Exemptions', datafield: 'Exemptions', rendered: tooltiprenderer  };
            columns.push(obj2);
        }

        if((data[0]["PolicyElement"]!=null)&&(typeof data[0]["PolicyElement"]!="undefined")&&(data[0]["PolicyElement"].length>0)&&(data[0]["PolicyElement"]!= "none"))
        {
            obj = { name: 'PolicyElement' };
            datafields.push(obj);
            obj2 = { text: 'Policy Element', datafield: 'PolicyElement', rendered: tooltiprenderer  };
            columns.push(obj2);
        }

        obj = { name: 'AdditionalInfoButton' };
        datafields.push(obj);
        obj2 = { text: 'Additional Info', datafield: 'AdditionalInfoButton', rendered: tooltiprenderer, cellsrenderer: linkrendererButton  };
        columns.push(obj2);


        //obj2 = { text: 'Metadata', datafield: 'MetadataButton', rendered: tooltiprenderer, cellsrenderer: linkrendererButton  };
        //columns.push(obj2);

        if((this.options.button_preview_action_type == "searchEditPolicy")||(this.options.button_preview_action_type == "searchCreatePolicy"))
        {
            obj = { name: 'EditButton' };
            datafields.push(obj);
            //obj2 = { text: 'Edit', datafield: 'EditButton', rendered: tooltiprenderer, cellsrenderer: linkrendererButton  };
            obj2 = { text: 'Policy', datafield: 'EditButton', rendered: tooltiprenderer, cellsrenderer: linkrendererButton  };
            columns.push(obj2);

            obj = { name: 'DeleteButton' };
            datafields.push(obj);
            obj2 = { text: 'Delete', datafield: 'DeleteButton', rendered: tooltiprenderer, cellsrenderer: linkrendererButton  };
            columns.push(obj2);
        }

        if(this.options.button_preview_action_type == "searchCreatePolicy") {
            obj = {name: 'MetadataButton'};
            datafields.push(obj);
            obj2 = {text: 'Metadata',
                datafield: 'MetadataButton',
                rendered: tooltiprenderer,
                cellsrenderer: linkrendererButton
            };
            columns.push(obj2);
        }

        //For the additional information window start
//        "ValueType","LocalCondition","Notes","Link","Source","TitleOfNotice","LegalBasisName","DateOfPublication","ImposedEndDate","SecondGenerationSpecific","BenchmarkTax",
//            "BenchmarkProduct","TaxRateBiofuel","TaxRateBenchmark","StartDateTax","BenchmarkLink","OriginalDataset","TypeOfChangeName","MeasureDescription",
//            "ProductOriginalHs","ProductOriginalName","ImplementationProcedure","XsYearType","LinkPdf","BenchmarkLinkPdf","ShortDescription","SharedGroupCode"
        obj = { name: 'CplId'};
        datafields.push(obj);
        obj = { name: 'Policy_id'};
        datafields.push(obj);
        obj = { name: 'Metadata_id'};
        datafields.push(obj);
        obj = { name: 'ValueType'};
        datafields.push(obj);
        obj = { name: 'MinAVTariffValue'};
        datafields.push(obj);
        obj = { name: 'MaxAVTariffValue'};
        datafields.push(obj);
        obj = { name: 'CountAVTariff'};
        datafields.push(obj);
        obj = { name: 'CountNAVTariff'};
        datafields.push(obj);
        obj = { name: 'Notes'};
        datafields.push(obj);
        obj = { name: 'Link'};
        datafields.push(obj);
        obj = { name: 'Source'};
        datafields.push(obj);
        obj = { name: 'TitleOfNotice'};
        datafields.push(obj);
        obj = { name: 'LegalBasisName'};
        datafields.push(obj);
        obj = { name: 'DateOfPublication'};
        datafields.push(obj);
        obj = { name: 'ImposedEndDate'};
        datafields.push(obj);
        obj = { name: 'SecondGenerationSpecific'};
        datafields.push(obj);
        obj = { name: 'BenchmarkTax'};
        datafields.push(obj);
        obj = { name: 'BenchmarkProduct'};
        datafields.push(obj);
        obj = { name: 'TaxRateBiofuel'};
        datafields.push(obj);
        obj = { name: 'TaxRateBenchmark'};
        datafields.push(obj);
        obj = { name: 'StartDateTax'};
        datafields.push(obj);
        obj = { name: 'BenchmarkLink'};
        datafields.push(obj);
        obj = { name: 'OriginalDataset'};
        datafields.push(obj);
        obj = { name: 'TypeOfChangeName'};
        datafields.push(obj);
        obj = { name: 'MeasureDescription'};
        datafields.push(obj);
        obj = { name: 'ProductOriginalHs'};
        datafields.push(obj);
        obj = { name: 'ProductOriginalName'};
        datafields.push(obj);
        //obj = { name: 'ImplementationProcedure'};
        //datafields.push(obj);
        //obj = { name: 'XsYearType'};
        //datafields.push(obj);
        obj = { name: 'LinkPdf'};
        datafields.push(obj);
        obj = { name: 'BenchmarkLinkPdf'};
        datafields.push(obj);
        obj = { name: 'ShortDescription'};
        datafields.push(obj);
        obj = { name: 'SharedGroupCode'};
        datafields.push(obj);
        obj = { name: 'Description'};
        datafields.push(obj);

        obj = { name: 'MasterIndex'};
        datafields.push(obj);
        //For the additional information window end
        var colNum = columns.length;
        var dim = 100/columns.length;

        //Add the dimension
        for(var i=0; i< colNum; i++)
        {
            columns[i].width = ''+dim+'%';
        }
        info.datafields = datafields;
        info.columns = columns;

        log.info(info);
        return info;
    }

    PreviewTable.prototype._value_existence = function(data) {
        var value_bool = false;
        var value_text_bool = false;
        var combination = -1;
        for(var iData=0; iData<data.length; iData++)
        {
            if((data[iData]["Value"]!=null)&&(typeof data[iData]["Value"]!="undefined")&&(data[iData]["Value"].length>0)&&(data[iData]["Value"]!= "none")&&(data[iData]["Value"]!= " "))
            {
                value_bool = true;
            }
//            else{
//                console.log("Value bool "+ value_bool);
//            }
            if((data[iData]["ValueText"]!=null)&&(typeof data[iData]["ValueText"]!="undefined")&&(data[iData]["ValueText"].length>0)&&(data[iData]["ValueText"]!= "none")&&(data[iData]["ValueText"]!= " "))
            {
                value_text_bool = true;
            }
        }

        //Choose the combination to show
        if((value_bool)&&(value_text_bool)){
            combination = 0;
        }
        else if((!value_bool)&&(!value_text_bool)){
            combination = 1;
        }
        else if(value_bool){
            combination = 2;
        }
        else{
            combination = 3;
        }

        return combination;
    }

    PreviewTable.prototype._data_format = function (json) {

        var mastertable_data = new Array();
        for (var i = 0; i < json.length; i++) {
            var row = {};
            for (var j = 0; j < json[i].length; j++) {
                if ((json[i][j] == null) || (typeof json[i][j] == 'undefined')) {
                    json[i][j] = "";
                }
                switch (j) {
                    case 0:
                        row["CplId"] = json[i][j];
                        break;
                    case 1:
                        row["CommodityId"] = json[i][j];
                        break;
                    case 2:
                        row["CountryCode"] = json[i][j];
                        break;
                    case 3:
                        row["CountryName"] = json[i][j];
                        break;
                    case 4:
                        row["SubnationalCode"] = json[i][j];
                        break;
                    case 5:
                        row["SubnationalName"] = json[i][j];
                        break;
                    case 6:
                        row["CommodityDomainCode"] = json[i][j];
                        break;
                    case 7:
                        row["CommodityDomainName"] = json[i][j];
                        break;
                    case 8:
                        row["CommodityClassCode"] = json[i][j];
                        break;
                    case 9:
                        row["CommodityClassName"] = json[i][j];
                        break;
                    case 10:
                        row["PolicyDomainCode"] = json[i][j];
                        break;
                    case 11:
                        row["PolicyDomainName"] = json[i][j];
                        break;
                    case 12:
                        row["PolicyTypeCode"] = json[i][j];
                        break;
                    case 13:
                        row["PolicyTypeName"] = json[i][j];
                        break;
                    case 14:
                        row["PolicyMeasureCode"] = json[i][j];
                        break;
                    case 15:
                        row["PolicyMeasureName"] = json[i][j];
                        break;
                    case 16:
                        row["PolicyConditionCode"] = json[i][j];
                        break;
                    case 17:
                        row["PolicyCondition"] = json[i][j];
                        break;
                    case 18:
                        row["IndividualPolicyCode"] = json[i][j];
                        break;
                    case 19:
                        row["IndividualPolicyName"] = json[i][j];
                        break;
                }
            }
            mastertable_data[i] = row;
        }
        return mastertable_data;
    }

    PreviewTable.prototype._master_grid_creation2 = function () {

        //var data = [["4312","2357","12","Argentina","99","n.a","1","Agricultural","3","Maize","1","Trade","1","Export measures","1","Export prohibition","105","n.a.","999","n.a.",null],
        //    ["4356","2277","12","Argentina","99","n.a","1","Agricultural","3","Maize","1","Trade","1","Export measures","1","Export prohibition","105","n.a.","999","n.a.",null],
        //    ["4575","2365","12","Argentina","99","n.a","1","Agricultural","8","Maize + Wheat","1","Trade","1","Export measures","1","Export prohibition","105","n.a.","999","n.a.",null],
        //    ["4606","2277","12","Argentina","99","n.a","1","Agricultural","3","Maize","1","Trade","1","Export measures","1","Export prohibition","127","Organic maize and those shipments carried out in bags only","999","n.a.",null]];

        var data = new Array();
        var firstNames = [
            "Andrew", "Nancy", "Shelley", "Regina", "Yoshi", "Antoni", "Mayumi", "Ian", "Peter", "Lars", "Petra", "Martin", "Sven", "Elio", "Beate", "Cheryl", "Michael", "Guylene"];
        var lastNames = [
            "Fuller", "Davolio", "Burke", "Murphy", "Nagase", "Saavedra", "Ohno", "Devling", "Wilson", "Peterson", "Winkler", "Bein", "Petersen", "Rossi", "Vileid", "Saylor", "Bjorn", "Nodier"];
        var productNames = [
            "Black Tea", "Green Tea", "Caffe Espresso", "Doubleshot Espresso", "Caffe Latte", "White Chocolate Mocha", "Cramel Latte", "Caffe Americano", "Cappuccino", "Espresso Truffle", "Espresso con Panna", "Peppermint Mocha Twist"];
        var priceValues = [
            "2.25", "1.5", "3.0", "3.3", "4.5", "3.6", "3.8", "2.5", "5.0", "1.75", "3.25", "4.0"];
        for (var i = 0; i < 100; i++) {
            var row = {};
            var productindex = Math.floor(Math.random() * productNames.length);
            var price = parseFloat(priceValues[productindex]);
            var quantity = 1 + Math.round(Math.random() * 10);
            row["firstname"] = firstNames[Math.floor(Math.random() * firstNames.length)];
            row["lastname"] = lastNames[Math.floor(Math.random() * lastNames.length)];
            row["productname"] = productNames[productindex];
            row["price"] = price;
            row["quantity"] = quantity;
            row["total"] = price * quantity;
            data[i] = row;
        }

        //host_preview.masterData = data;
        var source =
        {
            datafields: [
                { name: 'firstname' },
                { name: 'lastname' },
                { name: 'productname' },
                { name: 'price' },
                { name: 'quantity' },
                { name: 'total' }
                //{ name: 'CountryName' },
                //{ name: 'SubnationalName' },
                //{ name: 'CommodityClassName' },
                //{ name: 'CommodityId' },
                //{ name: 'PolicyDomainName' },
                //{ name: 'PolicyTypeName' },
                //{ name: 'PolicyMeasureName' },
                //{ name: 'PolicyCondition' },
                //{ name: 'IndividualPolicyName' },
               // { name: 'CplId' }
            ],
            //id: 'CplId',
            localdata: data,
            datatype: "array"
        };
//        var employeesAdapter = new $.jqx.dataAdapter(source);
        // create nested grid.
//        var initrowdetails = function (index, parentElement, gridElement, record) {
////            console.log("INITROWDETAILS 2")
////            console.log(host_preview.masterData)
////            console.log(host_preview.masterData[index])
////            console.log(index)
////            console.log(parentElement)
////            console.log(gridElement)
////            console.log(record)
//            host_preview.build_policyTableGrid(index, parentElement, gridElement, record, host_preview, host);
//        }

        var renderer = function (row, column, value) {
            return '<span class=fx_master_table_render>' + value + '</span>';
        };

        //var $p =  $("#" + host_preview.options.standard_preview_jqxgrid).parent();
        //
        //var $c = $("<div id=" + host_preview.options.standard_preview_jqxgrid + "></div>");
        //$("#" + host_preview.options.standard_preview_jqxgrid).jqxGrid('destroy');
        //
        //if ($("#" + host_preview.options.standard_preview_jqxgrid).length !== 0) {
        //    $("#" + host_preview.options.standard_preview_jqxgrid).remove()
        //}
        //
        //$p.append( $c );

        // create jqxgrid
        $(this.options.standard_preview_jqxgrid).jqxGrid(
            {
                width: '100%',
                height: 370,
                source: source,
                rowdetails: true,
                rowsheight: 35,
                //initrowdetails: initrowdetails,
                //rowdetailstemplate: { rowdetails: "<div id='grid' class=fx_master_table_row_details></div>", rowdetailsheight: 200, rowdetailshidden: true },
                enabletooltips: true,
                columnsheight: 35,
                rowsheight: 30,
                //columnsresize: true,
                //sortable: true,
                //filterable: true,
                //showfilterrow: true,
                //ready: function () {
                //    $("#" + host_preview.options.standard_preview_jqxgrid).jqxGrid('showrowdetails', 0);
                //},

                columns: [{
                    text: 'First Name',
                    datafield: 'firstname',
                    width: 100
                }, {
                    text: 'Last Name',
                    datafield: 'lastname',
                    width: 100
                }, {
                    text: 'Product',
                    datafield: 'productname',
                    width: 180
                }, {
                    text: 'Quantity',
                    datafield: 'quantity',
                    width: 80,
                    cellsalign: 'right'
                }, {
                    text: 'Unit Price',
                    datafield: 'price',
                    width: 90,
                    cellsalign: 'right',
                    cellsformat: 'c2'
                }, {
                    text: 'Total',
                    datafield: 'total',
                    width: 100,
                    cellsalign: 'right',
                    cellsformat: 'c2'
                }]

                //columns: [
                //    { text: 'Country', width: '10%', datafield: 'CountryName'},
                //    { text: 'Subnational level', datafield: 'SubnationalName', width: '10%'},
                //    { text: 'Commodity Class', datafield: 'CommodityClassName', width: '15%'},
                //    { text: 'Commodity ID', datafield: 'CommodityId', width: '10%'},
                //    { text: 'Policy Domain', datafield: 'PolicyDomainName', width: '10%'},
                //    { text: 'Policy Type', datafield: 'PolicyTypeName', width: '15%'},
                //    { text: 'Policy Measure', datafield: 'PolicyMeasureName', width: '15%'},
                //    { text: 'Condition', datafield: 'PolicyCondition', width: '15%'},
                //    { text: 'Individual Policy', datafield: 'IndividualPolicyName', width: '15%'}
                //
                //    //{ text: 'Country', width: '10%', datafield: 'CountryName', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer},
                //    //{ text: 'Subnational level', datafield: 'SubnationalName', width: '10%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                //    //{ text: 'Commodity Class', datafield: 'CommodityClassName', width: '15%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                //    //{ text: 'Commodity ID', datafield: 'CommodityId', width: '10%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                //    //{ text: 'Policy Domain', datafield: 'PolicyDomainName', width: '10%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                //    //{ text: 'Policy Type', datafield: 'PolicyTypeName', width: '15%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                //    //{ text: 'Policy Measure', datafield: 'PolicyMeasureName', width: '15%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                //    //{ text: 'Condition', datafield: 'PolicyCondition', width: '15%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                //    //{ text: 'Individual Policy', datafield: 'IndividualPolicyName', width: '15%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer }
                //]
            });

       // NProgress.done();
    };

    PreviewTable.prototype._master_grid_creation = function (data, host_preview, host) {

        host_preview.masterData = data;
        var source =
        {
            datafields: [
                { name: 'CountryName' },
                { name: 'SubnationalName' },
                { name: 'CommodityClassName' },
                { name: 'CommodityId' },
                { name: 'PolicyDomainName' },
                { name: 'PolicyTypeName' },
                { name: 'PolicyMeasureName' },
                { name: 'PolicyCondition' },
                { name: 'IndividualPolicyName' },
                { name: 'CplId' }
            ],
            id: 'CplId',
            localdata: data,
            datatype: "array"
        };
//        var employeesAdapter = new $.jqx.dataAdapter(source);
        // create nested grid.
        var initrowdetails = function (index, parentElement, gridElement, record) {
//            console.log("INITROWDETAILS 2")
//            console.log(host_preview.masterData)
//            console.log(host_preview.masterData[index])
//            console.log(index)
//            console.log(parentElement)
//            console.log(gridElement)
//            console.log(record)
            host_preview._build_policyTableGrid(index, parentElement, gridElement, record, host_preview, host);
        }

        var renderer = function (row, column, value) {
            return '<span class=fx_master_table_render>' + value + '</span>';
        };

        var $p =  $("#" + host_preview.options.standard_preview_jqxgrid).parent();

        var $c = $("<div id=" + host_preview.options.standard_preview_jqxgrid + "></div>");
        $("#" + host_preview.options.standard_preview_jqxgrid).jqxGrid('destroy');

        if ($("#" + host_preview.options.standard_preview_jqxgrid).length !== 0) {
            $("#" + host_preview.options.standard_preview_jqxgrid).remove()
        }

        $p.append( $c );

        // create jqxgrid
        $("#" + host_preview.options.standard_preview_jqxgrid).jqxGrid(
            {
                width: '100%',
                height: 370,
                source: source,
//                theme: theme,
                rowdetails: true,
                rowsheight: 35,
                initrowdetails: initrowdetails,
                rowdetailstemplate: { rowdetails: "<div id='grid' class=fx_master_table_row_details></div>", rowdetailsheight: 200, rowdetailshidden: true },
                enabletooltips: true,
                columnsheight: 35,
                rowsheight: 30,
                columnsresize: true,
                sortable: true,
                filterable: true,
                showfilterrow: true,
                ready: function () {
                    $("#" + host_preview.options.standard_preview_jqxgrid).jqxGrid('showrowdetails', 0);
                },

                columns: [
                    { text: 'Country', width: '10%', datafield: 'CountryName', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer},
                    { text: 'Subnational level', datafield: 'SubnationalName', width: '10%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                    { text: 'Commodity Class', datafield: 'CommodityClassName', width: '15%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                    { text: 'Commodity ID', datafield: 'CommodityId', width: '10%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                    { text: 'Policy Domain', datafield: 'PolicyDomainName', width: '10%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                    { text: 'Policy Type', datafield: 'PolicyTypeName', width: '15%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                    { text: 'Policy Measure', datafield: 'PolicyMeasureName', width: '15%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                    { text: 'Condition', datafield: 'PolicyCondition', width: '15%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer },
                    { text: 'Individual Policy', datafield: 'IndividualPolicyName', width: '15%', filtertype: 'textbox', filtercondition: 'starts_with', cellsrenderer: renderer }
                ]
            });

        NProgress.done();
    };

    return PreviewTable;

})