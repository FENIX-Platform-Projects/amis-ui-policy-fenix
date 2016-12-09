/*global requirejs, define*/
define([
    'loglevel',
    'jquery',
    'fx-dashboard/start',
    'text!test/html/uneca_education.hbs',
    'text!test/html/uneca_labour.hbs',
    'text!test/html/uneca_health.hbs',
    'text!test/html/ilo_labour.hbs',
    'test/models/uneca_education',
    'test/models/uneca_labour',
    'test/models/uneca_health',
    'test/models/ilo_labour',
], function (log, $, Dashboard, templateUnecaEducation, templateUnecaLabour, templateUnecaHealth, templateIloLabour, modelUnecaEducation, modelUnecaLabour, modelUnecaHealth, modelIloLabour ) {

    'use strict';

    var s = {
        CONTAINER: "#dashboard-container"
    };

    function Test() { }

    Test.prototype.start = function () {

        log.trace("Test started");

        this._attachTemplate( );

        //this._renderDashboardUnecaEducation();

        this._renderDashboardUnecaLabour();

        //this._renderDashboardUnecaHealth();

        //this._renderDashboardIloLabour();

    };

    Test.prototype._attachTemplate = function ( template ) {

        $(s.CONTAINER).html(template);

        log.info("Template attached successfully");

    };

    Test.prototype._renderDashboardUnecaEducation = function () {

        this._attachTemplate(templateUnecaEducation);

        this.dashboard = new Dashboard(modelUnecaEducation);

    };

    Test.prototype._renderDashboardUnecaLabour = function () {

        this._attachTemplate(templateUnecaLabour);

        this.dashboard = new Dashboard(modelUnecaLabour);

    };

    Test.prototype._renderDashboardUnecaHealth = function () {

        this._attachTemplate(templateUnecaHealth);

        this.dashboard = new Dashboard(modelUnecaHealth);

    };

    Test.prototype._renderDashboardIloLabour = function () {

        this._attachTemplate(templateIloLabour);

        this.dashboard = new Dashboard(modelIloLabour);

    };
    return new Test();
});
