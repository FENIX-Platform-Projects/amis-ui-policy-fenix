define([
    "jquery",
    "loglevel",
    "underscore",
    "../config/config",
    "../config/dataManagement/config",
    "../html/dataManagement/template.hbs",
    "../nls/labels"
], function ($, log, _, C, DMC, template, labels) {

    "use strict";

    var s = {
        EL: "#dataManagement",
        ERRORS : "[data-role='errors']"
    }

    function DataManagement() {

        console.clear();

        log.setLevel("silent");

        this._importThirdPartyCss();

        this._validateConfig();

        this._initVariables();
    }

    DataManagement.prototype._validateConfig = function () {

        if (!C.lang) {
            alert("Please specify a valid LANGUAGE in config/config.js");
        }
    };

    DataManagement.prototype._initVariables = function () {

        this.$el = $(s.EL);

        this.lang = C.lang.toLowerCase();
        this.environment = C.environment;
        this.cache = C.cache;
    };

    DataManagement.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');


        // //dropdown selector
        // require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");
        // //tree selector
        // require("../../node_modules/jstree/dist/themes/default/style.min.css");
        // //range selector
        // require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.css");
        // require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css");
        // //time selector
        // require("../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");
        // // fenix-ui-filter
        // require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");
        //
        // // fenix-ui-dropdown
        // require("../../node_modules/fenix-ui-dropdown/dist/fenix-ui-dropdown.min.css");
        //
        // // bootstrap-table
        // require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");
        // // // fenix-ui-catalog
        // require("../../node_modules/fenix-ui-catalog/dist/fenix-ui-catalog.min.css");
        //
        // //meta viewer requirements
        // require("jquery-treegrid-webpack/css/jquery.treegrid.css");

        //AMIS Policy CSS
        require("../css/amisPolicy.css");


    };

    return new DataManagement();
});