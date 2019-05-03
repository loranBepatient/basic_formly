(function() {
  var component = {
    templateUrl: "./scripts/components/rentalForm.component.html",
    controller: controller
  };

  controller.$inject = ["rentalInputs"];

  function controller(rentalInputs) {
    /* jshint validthis:true */
    var vm = this;

    vm.rental = {};
    vm.rentalFields = [];
    vm.$onInit = onInit;

    function onInit() {
      vm.rentalFields = [...rentalInputs.getFields()];
    }
  }
  angular.module("formlyApp").component("rentalForm", component);
})();
