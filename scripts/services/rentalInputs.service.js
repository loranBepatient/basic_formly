(function() {
  "use strict";
  angular.module("formlyApp").factory("rentalInputs", rentalForm);

  rentalForm.$inject = ["provincesService"];

  function rentalForm(provincesService) {
    var rentalFields = [
      {
        key: "first_name",
        type: "input",
        templateOptions: {
          type: "text",
          label: "First Name",
          placeholder: "Enter your first name",
          required: true
        }
      },
      {
        key: "gender",
        type: "radio",
        templateOptions: {
          label: "genre",
          labelProp: "value",
          valueProp: "id",
          options: [
            { value: "guy", id: "man", checked: true },
            { value: "girl", id: "woman" }
          ]
        }
      },
      {
        key: "last_name",
        type: "input",
        templateOptions: {
          type: "text",
          label: "Last Name",
          placeholder: "Enter your last name",
          required: true
        }
      },
      {
        key: "email",
        type: "input",
        templateOptions: {
          type: "email",
          label: "Email address",
          placeholder: "Enter your email address",
          required: true
        }
      },
      {
        key: "under25",
        type: "checkbox",
        templateOptions: {
          label: "Are you under 25 ? "
        },
        hideExpression: "!model.email"
      },
      {
        key: "province",
        type: "select",
        templateOptions: {
          label: "Province",
          options: provincesService.getProvinces()
        },
        hideExpression: "!model.email"
      },
      {
        key: "insurance",
        type: "input",
        templateOptions: {
          label: "Insurance Policy",
          placeholder: "Enter your insurance policy number"
        },
        hideExpression: "!model.under25 || !model.province",
        validators: {
          driversLicence: function($modelValue, $viewValue, scope) {
            var value = $modelValue || $viewValue;
            if (value) {
              return validateDriversLicence(value);
            }
          }
        },
        expressionProperties: {
          "templateOptions.disabled": function($viewValue, $modelValue, scope) {
            if (scope.model.province === "ontario") {
              return false;
            }
            return true;
          }
        }
      }
    ];

    var multiCheckbox = [
      {
        key: "selectedAnswer",
        type: "multiCheckbox",
        templateOptions: {
          required: true,
          label: "fsdfsdf",
          options: [
            {
              name: "ee",
              value: "ee"
            },
            {
              name: "dd",
              value: "dd"
            },
            {
              name: "tg",
              value: "tg"
            }
          ]
        }
      }
    ];

    return {
      getFields: getFields
    };

    function getFields() {
      // return rentalFields;
      return multiCheckbox;
    }

    function validateDriversLicence(value) {
      return /[A-Za-z]\d{4}[\s|\-]*\d{5}[\s|\-]*\d{5}$/.test(value);
    }
  }
})();
