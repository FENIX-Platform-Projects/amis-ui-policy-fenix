define([
    "jquery",
    "loglevel",
    "underscore",
    "../config/config",
    "../config/home/config",
    "../html/home/template.hbs",
    "../nls/labels"
], function ($, log, _, C, HC, template, labels) {

    "use strict";

    var s = {
        EL: "#home",
        ERRORS : "[data-role='errors']"
    }

    function Home() {

        console.clear();

        log.setLevel("silent");

        this._importThirdPartyCss();

        this._validateConfig();

        this._initVariables();
    }

    Home.prototype._validateConfig = function () {

        if (!C.lang) {
            alert("Please specify a valid LANGUAGE in config/config.js");
        }
    };

    Home.prototype._initVariables = function () {

        this.$el = $(s.EL);

        this.lang = C.lang.toLowerCase();
        this.environment = C.environment;
        this.cache = C.cache;
    };

    Home.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');

        //Swiper
        require('swiper/dist/css/swiper.css');

        //host override
        require('../css/amisPolicy.css');
    };

    return new Home();
});