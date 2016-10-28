'use strict';

var app = angular.module('myApp', []);

app.controller("DemoController", ["$scope", "MyFactory", function ($scope, MyFactory) {
        $scope.submit = function () {
            alert("Username: [" + $scope.username + "]\nPassword: [" + $scope.password + "]");
        }
        $scope.titleCase = function (input) {
            return MyFactory.titleCase(input);
        }
        $scope.camelCase = function(input) {
            return MyFactory.camelCase(input);
        }
        $scope.dashCase = function(input) {
            return MyFactory.dashCase(input);
        }
    }]);

app.filter("name", function () {
    return function (input) {
        return input.lastname + ", " + input.firstname;
    }
});

function capitalize(input) {
    var first = input.substring(0, 1).toUpperCase();
    return first + input.substring(1, input.length);
}

app.factory("MyFactory", function () {
    var factory = {};

    factory.titleCase = function (input) {
        var words = input.split(" ");
        var builtString = "";

        for (var i = 0; i < words.length-1; i++) {
            builtString += capitalize(words[i]) + " ";
        }
        builtString += capitalize(words[words.length-1]);
        
        return builtString;
    }
    
    factory.camelCase = function(input) {
        var words = input.split(" ");
        var builtString = "";
        
        builtString += words[0];
        if(words.length > 1) {
            for(var i = 1; i != words.length; i++) {
                builtString += capitalize(words[i]);
            }
        }
        
        return builtString;
    }
    
    factory.dashCase = function(input) {
        return input.toLowerCase().replace(/ /g, "-");
    }

    return factory;
})

app.directive("loginForm", function () {
    return {
        restrict: "E",
        templateUrl: "login.html",
        controller: "DemoController"
    }
});