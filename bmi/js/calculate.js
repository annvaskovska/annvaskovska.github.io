var calc = calc || {};
(function(calc) {

    var heightField = document.getElementById("height");
    var weightField = document.getElementById("weight");
    var resultLabel = document.getElementById("result");
    var regex = /^[1-9]\d*$/;
    var table = document.querySelectorAll("[id^=node]");

    calc.validate = function(height, weight) {

        heightField.className = regex.test(height) ? "valid" : "error";
        weightField.className = regex.test(weight) ? "valid" : "error";
        return weightField.className == "valid" && heightField.className == "valid";

    };

    calc.highlight = function(index) {

        var nodeIndex = 0;
        if (index < 18.5) nodeIndex = 0; //node1
        else if (index > 18.49 && index < 25) nodeIndex = 1;
        else if (index > 24.99 && index < 30) nodeIndex = 2;
        else if (index > 29.99 && index < 35) nodeIndex = 3;
        else if (index > 34.99 && index < 40) nodeIndex = 4;
        else if (index > 39.99) nodeIndex = 5; //node6

        table[nodeIndex].className = "highlight-bg";

    };

    calc.calculate = function() {

        resultLabel.innerHTML = "Тут буде показано ваш ІМТ";

        for (var i = 0; i < table.length; i++) {
            table[i].className = "simple-bg";
        }


        if (calc.validate(heightField.value, weightField.value)) {
            var result = parseFloat(weightField.value) / Math.pow(parseFloat(heightField.value) / 100, 2);
            resultLabel.innerHTML = "Ваш ІМТ: " + result.toFixed(2);
            calc.highlight(result);
        }
    };

})(calc);

window.onload = function() {
    document.getElementById("calculate").addEventListener("click", calc.calculate);
};
