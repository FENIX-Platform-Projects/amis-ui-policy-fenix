/*global define, _:false, $, console, amplify, FM, THREE*/
define([
    'jquery',
    'views/base/view',
    'config/config',
    'config/events',
    'text!json/home/data_at_glance.json',
    'text!templates/home/home.hbs',
    'i18n!nls/labels',
    'handlebars',
    'fx-chart/config/renderers/highcharts_shared',
    'copyShader',
    'effectComposer',
    'maskPass',
    'renderPass',
    'shaderPass',
    'orbitControls',
    'threejs',
    'detector',
    'canvasRender',
    'highcharts',
    'projector',
    'tweenMax',
    'amplify'
], function ($, View, C, EVT, DATA, template, i18nLabels, Handlebars, chartTemplate) {

    'use strict';

    var s = {
        CHART_ONE: "#chart1",
        CHART_TWO: "#chart2",
        CHART_THREE: "#chart3",
        CHART_FOUR: "#chart4",
        CHART_TABS: '#home-charts-tab a[data-toggle="tab"]',
        ANIMATION_CONTAINER: "#animation-container"
    }, renderer, scena, camera, control, stats, controlliCamera, sfondoScena, cameraSfondo, composer, renderScene, containerWidth, containerHeight, terraMesh, nuvoleMesh;

    var mouseX = 0,
        mouseY = 0;

    var windowHalfX = window.innerWidth / 2,
        indowHalfY = window.innerHeight / 2;

    var HomeView = View.extend({

        autoRender: true,

        className: 'home',

        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            this.initWorldMap();

            //update State
            amplify.publish(EVT.STATE_CHANGE, {menu: 'home'});

            this.initVariables();

            this.bindEventListeners();

            this.configurePage();
        },

        initVariables: function () {
        },

        configurePage: function () {

            this.initCharts();
        },

        initCharts: function () {

            this.data = JSON.parse(DATA);

            for (var k in this.data['import']) {
                if (this.data['import'].hasOwnProperty(k)) {
                    this.data['import'][k].length = 9;
                    this.data['export'][k].length = 9;
                }
            }

            var series1GDP = [5.8, 6, 5.4, 3.4, 5.7, 2.8, 6.7, 3.5, 3.9],
                series2GDP = [5.6, 6.9, 10.7, 9.7, 8, 9.2, 9.2, 7, 7.2];

            $(s.CHART_ONE).highcharts($.extend(true, {}, chartTemplate, {
                title: {
                    text: 'Gross Domestic Product of Africa'
                },
                credits: {
                    enabled: false
                },

                xAxis: {
                    categories: [
                        '2006',
                        '2007',
                        '2008',
                        '2009',
                        '2010',
                        '2011',
                        '2012',
                        '2013',
                        '2014'
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Million AED'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [
                    {
                        name: 'GDP growth rates',
                        data: series1GDP
                    },
                    {
                        name: 'Inflation',
                        data: series2GDP
                    }]
            }));

            $(s.CHART_TWO).highcharts($.extend(true, {}, chartTemplate, {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Export of Goods and services from Africa'
                },
                credits: {
                    enabled: false
                },
                /*  colors: [ //Colori delle charts
                 '#a62d3e',
                 '#986e2e',
                 '#744490',
                 '#E10079',
                 '#2D1706',
                 '#F1E300',
                 '#F7AE3C',
                 '#DF3328'
                 ],*/
                xAxis: {
                    categories: [
                        'AMU',
                        'CAEMC',
                        'COMESA',
                        'ECCAS',
                        'ECOWAS',
                        'FRANC ZONE',
                        'SADC',
                        'WAEMU']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Millions of WSD'
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: "Export",
                    data: this.data.trade.import
                }]
            }));

            $(s.CHART_THREE).highcharts($.extend(true, {}, chartTemplate, {
                title: {
                    text: 'Gender parity index in Africa'
                },
                credits: {
                    enabled: false
                },

                xAxis: {
                    categories: ['2006',
                        '2007',
                        '2008',
                        '2009',
                        '2010',
                        '2011',
                        '2012',
                        '2013']
                },
                crosshair: true,

                yAxis: {
                    min: 0.75,
                    max: 1
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Gender parity index in primary',
                    data: this.data.education.primary
                },
                    {
                        name: 'Gender parity index in secondary',
                        data: this.data.education.secondary
                    }
                ]
            }));

            $(s.CHART_FOUR).highcharts($.extend(true, {}, chartTemplate, {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Import of Goods and services to Africa'
                },
                credits: {
                    enabled: false
                },
                /*  colors: [ //Colori delle charts
                 '#a62d3e',
                 '#986e2e',
                 '#744490',
                 '#E10079',
                 '#2D1706',
                 '#F1E300',
                 '#F7AE3C',
                 '#DF3328'
                 ],*/
                xAxis: {
                    categories: [
                        'AMU',
                        'CAEMC',
                        'COMESA',
                        'ECCAS',
                        'ECOWAS',
                        'FRANC ZONE',
                        'SADC',
                        'WAEMU']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Millions of WSD'
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: "Import",
                    data: this.data.trade.import
                }]
            }));

        },

        _traspostMatrix: function (key, type) {

            var result = [];

            var map = {
                "AFRICA": 0,
                "AMU": 1,
                "CAEMC": 2,
                "COMESA": 3,
                "ECCAS": 4,
                "ECOWAS": 5,
                "FRANC_ZONE": 6,
                "SADC": 7,
                "WAEMU": 8
            };

            var index = map[key];

            for (var field in this.data.trade[type]) {
                result.push(this.data.trade[type][field][index])
            }

            return result;

        },

        _prepareDataForTradeCharts: function () {

            var result = {};

            result['import'] = this.data.trade.import;
            result['export'] = this.data.trade.export;


            return result;


            var semiResult = {'export': {}, 'import': {}};

            for (var key in this.data.trade.export) {
                semiResult['export'][key] = this._traspostMatrix(key, 'export');
                semiResult['import'][key] = this._traspostMatrix(key, 'import');
            }

            //console.log(semiResult);

            this.data.trade = semiResult;

            for (var key in this.data.trade.import) {

                for (var i = 0; i < this.data.trade.import[key].length; i++) {

                    this.data.trade.import[key][i] = parseFloat(this.data.trade.import[key][i].toFixed(2));
                }

                result['import'].push({'name': key, 'data': this.data.trade.import[key]})
            }

            for (var key in this.data.trade.export) {

                for (var i = 0; i < this.data.trade.export[key].length; i++) {

                    this.data.trade.export[key][i] = parseFloat(this.data.trade.export[key][i].toFixed(2));
                }
                result['export'].push({'name': key, 'data': this.data.trade.export[key]})
            }


        },

        bindEventListeners: function () {

            var self = this;

            $(s.CHART_TABS).on('shown.bs.tab', function (e) {
                e.preventDefault();
                self.initCharts();
            });

        },

        unbindEventListeners: function () {

            $(s.CHART_TABS).off('shown.bs.tab');

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        },

        initWorldMap: function () {
            // Inizialization

            if (Detector.webgl) {

                renderer = new THREE.WebGLRenderer({
                    antialias: true
                });

                scena = new THREE.Scene();
                var container = document.getElementById('container');
                containerWidth = $('#container').width();
                containerHeight = $('#container').height();

                camera = new THREE.PerspectiveCamera(45, containerWidth / containerHeight, 0.1, 1000);

                renderer.setClearColor(0x000000, 1.0);
                renderer.setSize(containerWidth, containerHeight);
                renderer.shadowMapEnabled = true;

                cameraSfondo = new THREE.OrthographicCamera(
                    -window.innerWidth // LEFT This property defines the border for the leftmost position to be rendered.
                    , window.innerWidth // RIGHT This property defines the border for the rightmost position to be rendered.
                    , window.innerHeight // TOP This property defines the border for the topmost position to be rendered.
                    , -window.innerHeight // BOTTOM This property defines the border for the bottommost position to be rendered.
                    , -10000, 10000 //This property defines the point, based on the position of the camera, from where the scene will be rendered. , This property defines the point, based on position of the camera, to whic the scene will be rendered
                );

                cameraSfondo.position.z = 50;

                sfondoScena = new THREE.Scene();
                var materialColor = new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture('src/images/starry_background.jpg'),
                    depthTest: false
                }); /// DEPTH TEST FALSE SUPER IMPORTANT TO COMPOSING!!!

                var sfondoBG = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
                sfondoBG.position.z = -100;
                sfondoBG.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1); // LOOK AT THE SCALE!!!!!
                sfondoScena.add(sfondoBG);

                // texture

                var manager = new THREE.LoadingManager();

                manager.onProgress = function (item, loaded, total) {

                    /*
                     console.log(item, loaded, total);
                     console.log((loaded / total * 100) + '% loaded');
                     */

                    $('#preload-text').text((loaded / total * 100) + '% loaded'); // For preload

                };

                var self = this;

                manager.onLoad = function () {
                    // All the texure are loaded
                    /*
                     console.log('all Loaded');
                     */
                    $('#world-preload').removeClass('visible');


                    TweenMax.to(camera.position, 4, {
                        x: 23, z: -10, y: 0, onComplete: function () {
                            self.startHomeHeader();

                        }
                    });
                    //TweenMax.to(terraMesh.position, 5, {x: -3, z:-7,y:0 ,fov:10});
                };


                var nuvoleTexture = new THREE.Texture();
                var terraTexture = new THREE.Texture();
                var terraNormal = new THREE.Texture();
                var terraSpec = new THREE.Texture();


                var loader = new THREE.ImageLoader(manager);
                loader.load('src/images/fair_clouds_4k.png', function (image) {
                    nuvoleTexture.image = image;
                    nuvoleTexture.needsUpdate = true;
                });
                loader.load('src/images/earthmap4k.jpg', function (image) {
                    terraTexture.image = image;
                    terraTexture.needsUpdate = true;
                });
                loader.load('src/images/earth_normalmap_flat4k.jpg', function (image) {
                    terraNormal.image = image;
                    terraNormal.needsUpdate = true;
                });
                loader.load('src/images/earthspec4k.jpg', function (image) {
                    terraSpec.image = image;
                    terraSpec.needsUpdate = true;
                });

//        loader.load( 'images/earthmap4k.jpg', function ( image ) {
//
//            terraTexture.image = image;
//            terraTexture.needsUpdate = true;
//
//        } );


//
//        var onProgress = function ( xhr ) {
//            if ( xhr.lengthComputable ) {
//                var percentComplete = xhr.loaded / xhr.total * 100;
//                console.log( Math.round(percentComplete, 2) + '% downloaded' );
//            }
//        };
//
//        var onError = function ( xhr ) {
//        };


                // Create cloud material
                // var nuvoleTexture = THREE.ImageUtils.loadTexture('images/fair_clouds_4k.png');
                var nuvoleMateriale = new THREE.MeshPhongMaterial();

                nuvoleMateriale.map = nuvoleTexture;
                nuvoleMateriale.transparent = true;


                //Terra
                var sferaGeometria = new THREE.SphereGeometry(15, 30, 30); // Radius, number of width segment, number of height segment Only radius is required
                // Create earth material
                //var terraTexture = THREE.ImageUtils.loadTexture('images/earthmap4k.jpg');
                //var terraNormal = THREE.ImageUtils.loadTexture('images/earth_normalmap_flat4k.jpg');
                //var terraSpec = THREE.ImageUtils.loadTexture('images/earthspec4k.jpg');
                var terraMateriale = new THREE.MeshPhongMaterial(); // Reacts to lights

                terraMateriale.map = terraTexture;
                terraMateriale.normalMap = terraNormal;
                terraMateriale.normalScale = new THREE.Vector2(0.5, 0.7); // Scale of the bump effect
                terraMateriale.specularMap = terraSpec;
                terraMateriale.specular = new THREE.Color(0x00283a); // Color of the specular

                terraMesh = new THREE.Mesh(sferaGeometria, terraMateriale);
                terraMesh.name = 'terra';

                scena.add(terraMesh);

                //terraMesh.position.set(0,0, 0);

                // Nuvole
                var nuvoleGeometria = new THREE.SphereGeometry(sferaGeometria.parameters.radius * 1.02, sferaGeometria.parameters.widthSegments, sferaGeometria.parameters.heightSegments);
                nuvoleMesh = new THREE.Mesh(nuvoleGeometria, nuvoleMateriale);

                scena.add(nuvoleMesh);


                var luceDirezionale = new THREE.DirectionalLight(0xffffff, 1); // Color, intensity

                luceDirezionale.name = "direzionale";

                scena.add(luceDirezionale);
                /*
                 console.log(luceDirezionale.position);
                 */
                luceDirezionale.position.set(50, 40, 50);

                var luceAmbientale = new THREE.AmbientLight(0x666666); // Only light color

                scena.add(luceAmbientale);

                //controlliCamera = new THREE.OrbitControls(camera);
                camera.position.x = 15;
                camera.position.y = 16;
                camera.position.z = 13;
                camera.lookAt(scena.position);


//        control = new function () {
//            this.rotationSpeed = 0.005;
//            this.opacity = 0.6;
//            this.color = cuboMateriale.color.getHex();
//        };
//
//        addControlGui(control);
//        addStatsObject();

                // setup the composer steps
                // first render the background
                var bgPass = new THREE.RenderPass(sfondoScena, cameraSfondo);
                // next render the scene (rotating earth), without clearing the current output
                var renderPass = new THREE.RenderPass(scena, camera);
                renderPass.clear = false;
                // finally copy the result to the screen
                var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
                effectCopy.renderToScreen = true;

                // add these passes to the composer
                composer = new THREE.EffectComposer(renderer);
                composer.addPass(bgPass);
                composer.addPass(renderPass);
                composer.addPass(effectCopy);


                container.appendChild(renderer.domElement); //domElement is a property of WEBGLRender
                //$(window).mousemove(this.onDocumentMouseMove);
                window.addEventListener('resize', this.onWindowResize, false);
                this.renderScene();


                // uncomment if webgl is required
                //}else{
                //  Detector.addGetWebGLMessage();
                //  return true;
            } else {
                //console.log('dani purciaro computer vecchio')
                this.startHomeHeader();
                //renderer    = new THREE.CanvasRenderer();
            }

        },

        renderScene: function () {
            //controlliCamera.update();
            //stats.update();
            //var rotSpeed = 0.0005;
            //camera.position.x = camera.position.x * Math.cos(rotSpeed) + camera.position.z * Math.sin(rotSpeed);
            //camera.position.z = camera.position.z * Math.cos(rotSpeed) - camera.position.x * Math.sin(rotSpeed);
            //camera.position.x += ( mouseX - camera.position.x ) * .0005;
            //camera.position.y += ( - mouseY - camera.position.y ) * .005;
            camera.lookAt(scena.position);
            //console.log('x'+camera.position.x);
            //console.log('y'+camera.position.z);
            //console.log('z'+camera.position.y);
            renderer.render(scena, camera);
            renderer.autoClear = false;
            composer.render();

            requestAnimationFrame(this.renderScene.bind(this));

        },

        onWindowResize: function () {
            containerWidth = $('#container').width();
            containerHeight = $('#container').height();
            camera.aspect = containerWidth / containerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(containerWidth, containerHeight);

        },

        onDocumentMouseMove: function (event) {


            mouseX = ( event.clientX - windowHalfX ) / 8;
            //mouseY = ( event.clientY - windowHalfY ) / 4;

            /*
             console.log(mouseX * Math.PI / 180);
             */

            var rotazione = (mouseX * Math.PI / 180) / 20;
            //var rotazioneY = (mouseY * Math.PI / 180) / 10;

            terraMesh.rotation.y = rotazione;
            nuvoleMesh.rotation.y = rotazione;

            //terraMesh.rotation.z = rotazioneY;
            //nuvoleMesh.rotation.z = rotazioneY;

            //TweenMax.to(terraMesh.rotation, 4, {x: 23, z:-10,y:0 , onComplete:
            //    function () {
            //        self.startHomeHeader();
            //
            //    }
            //});


        },

        startHomeHeader: function () {
            TweenMax.to($('.world-fallback'), 1, {opacity: 1});
            TweenMax.to($('.welcome'), 1, {opacity: 1});
            TweenMax.to($('.home-logo, .topic-container'), 2, {opacity: 1, delay: .5});
            TweenMax.to($(' .one'), 2, {opacity: 1, delay: 1.3});
            TweenMax.to($(' .two'), 2, {opacity: 1, delay: 1.7});
            TweenMax.to($(' .three'), 2, {opacity: 1, delay: 2.0});
            TweenMax.to($(' .four'), 2, {opacity: 1, delay: 2.3});
            $('.carousel').carousel('cycle');

        }
    });

    return HomeView;
});
