define([
    'loglevel',
    'jquery',
    'underscore',
    'fx-filter/start',
    'fx-common/utils',
    'test/models/test'
], function (log, $, _, Filter, Utils, TestModel) {

    'use strict';

    var s = {
        ALL: "#qEd_selectors",
        ALL_SUMMARY: "#qEd_selectors-summary"
    };

    function Test() { }

    Test.prototype.start = function () {

        log.trace("Test started");

        this._render();
    };

    Test.prototype._render = function () {

        this._bindEventListeners();

        var filter = this._renderAll();

        this._insertValues(filter);
    };

    Test.prototype._bindEventListeners = function () {

        $("#snippet-btn").on("click", function () {

            _.each(TestModel, function (obj, key) {

                var $snippet = $("<div class='col-xs-6'><code></code></div>");
                $snippet.find("code").html(JSON.stringify(obj));

                if ($("[data-selector='"+key+"']").length > 0 ){
                    $("[data-selector='"+key+"']").after($snippet);
                } else {
                    $("[data-semantic='"+key+"']").after($snippet);
                }

            })

        });

    };

    Test.prototype._renderAll = function () {

        var filter = new Filter({
            items: TestModel,
            el: s.ALL,
            //summaryEl: s.ALL_SUMMARY
        });

        return filter;
    };

    Test.prototype._insertValues = function(filter){

        var values = {
            values : {
                dropdown : ["item_1", "item_2"],
            },
            labels : {
                dropdown : {
                    item_1 : "Code One",
                    item_2 : "Code Two"
                }
            },
            valid : true
        }

        filter.setValues(values);

//        filter.filter.on("change", _.bind(function () {
//
//            var config = this._getOlapConfigFromFilter();
//
//            log.trace("Update chart");
//            log.trace(config);
////console.log("config2",config)
//            this.olap.update(config);
//        }, this));
        log.info("on");

        filter.on("change", function(){
            var values = filter.getValues();

            if(values.values.checkbox.length>0){
                //Call the method to set the source
            }

            log.info(values);
        });
    };

    return new Test();

});