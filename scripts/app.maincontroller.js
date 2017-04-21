(function(){
    'use strict';

    angular
        .module('formlyApp')
        .controller('MainController', controller)

    controller.$inject = ['province'];

    function controller(province) {
        /* jshint validthis:true */
        var vm = this;
        vm.provinces = []
        vm.setProvinces = setProvinces;


        function setProvinces () {
            province.getProvinces().then(function(province){
                console.log(province)
            })
        }
      
    }
})();