(function(){
    'use strict';
    console.clear();

    angular
        .module('formlyApp')
        .controller('MainController', controller)

    controller.$inject = ['province'];

    function controller(province) {
        /* jshint validthis:true */
        var vm = this;

        vm.rental = {};

        vm.rentalFields = [
            {
                key: 'first_name', 
                type: 'input', 
                templateOptions: {
                    type: 'text', 
                    label: 'First Name', 
                    placeholder: 'Enter your first name',
                    required: true
                }

            },
            {
                key: 'gender', 
                type: 'radio', 
                templateOptions: {
                    label: 'genre',
                    labelProp : 'value',
                    valueProp: 'id',
                    options: [
                        {value: 'guy',  id: 'man' , checked: true},
                        {value: 'girl', id: 'woman'}
                    
                    ]
                }
            },
            {
                key: 'last_name', 
                type: 'input', 
                templateOptions: {
                    type: 'text', 
                    label: 'Last Name', 
                    placeholder: 'Enter your last name',
                    required: true
                }

            },
            {
                key: 'email', 
                type: 'input', 
                templateOptions: {
                    type: 'email', 
                    label: 'Email address', 
                    placeholder: 'Enter your email address',
                    required: true
                }

            }, 
            {
                key: 'under25',
                type: 'checkbox', 
                templateOptions: {
                    label: 'Are you under 25 ? '
                },
                hideExpression: '!model.email'
            },
            {
                key:'province',
                type: 'select', 
                templateOptions: {
                    label: 'Province', 
                    options: province.getProvinces()
                }, 
                hideExpression: '!model.email'
            }, 
            {
                key:'insurance', 
                type:'input', 
                templateOptions: {
                    label: 'Insurance Policy', 
                    placeholder: 'Enter your insurance policy number'
                },
                hideExpression: '!model.under25 || !model.province',
                validators: {
                    driversLicence: function($modelValue, $viewValue, scope){
                        var value = $modelValue ||  $viewValue
                        if (value) {
                            return validateDriversLicence(value);
                        }
                    }
                },
                expressionProperties: {
                    'templateOptions.disabled': function($viewValue,$modelValue, scope){
                        if (scope.model.province === 'ontario'){
                            return false;
                        }
                        return true;
                    }
                }
            }
        ]

        function validateDriversLicence(value) {
            return /[A-Za-z]\d{4}[\s|\-]*\d{5}[\s|\-]*\d{5}$/.test(value)
        }
      
    }
})();