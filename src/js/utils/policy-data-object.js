define([
    'jquery'
], function($) {

    var optionsDefault = {

    }

    //text= Loads dependencies as plain text files.
    function PolicyDataObject(o) {
        if (this.options === undefined) {
            this.options = {};
        }
        $.extend(true, this.options, optionsDefault, o);
    }

    PolicyDataObject.prototype.voObjectConstruction = function(){

        var data={};
        data.datasource = "";
        data.policy_domain_code = "";
        data.commodity_domain_code = "";
        data.commodity_class_code = "";
        data.policy_type_code = [];
        data.policy_measure_code = [];
        data.country_code = "";
        //it could be 'slider' or 'classic'
        data.yearTab ="";
        data.year_list = "";
        data.start_date = "";
        data.end_date = "";
        //The format is this: 'code1', 'code2', 'code3'
        data.cpl_id = "";
        data.commodity_id = "";
        //This is an array of array with the association between policyType Code and array of policy measure code
        data.policyTypesInfo = [];


//        data.showNull = true;
//        data.showZeroes = true;
//        data.showOfficialflags = false;
//        data.thousandSeparator = "";
//        data.decimalseparator = ".";
//        data.showDec = "2";
//        data.datasetCodes = {};
//        data.applyOnlyYearFilter = false;
//        data.applyAllFiltersExceptYears = false;
//        data.applyAllFiltersExceptAggregrationType = false;
//        data.notApplyFilters = false;
//        data.applyAllFiltersExceptAreas = false;
//        data.showColumnHeaders = true;
//        data.tableHeaders = [];
//        data.tableSubHeaders = [];
//        data.tableContents = [];
        return data;
    };

    return PolicyDataObject;

});
