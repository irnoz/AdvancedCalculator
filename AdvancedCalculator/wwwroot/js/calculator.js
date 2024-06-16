// calculator.js
$(document).ready(function() {
    $(".calc-button").click(function() {
        var value = $(this).text();
        var expressionField = $("#expression");

        // If sin() or cos() is clicked, add it with parentheses
        if (value === "sin()" || value === "cos()") {
            expressionField.val(expressionField.val() + value.slice(0, -1) + "()");
        } else {
            expressionField.val(expressionField.val() + value);
        }
    });

    $("#calcForm").submit(function(event) {
        event.preventDefault();
        var expression = $("#expression").val();

        $.ajax({
            url: "/Home/Calculate",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ expression: expression }),
            success: function(response) {
                $("#result").text("Result: " + response.result);
                addHistoryItem(expression, response.result);
            },
            error: function() {
                $("#result").text("An error occurred. Please try again.");
            }
        });
    });

    function addHistoryItem(expression, result) {
        var history = localStorage.getItem('calcHistory') ? JSON.parse(localStorage.getItem('calcHistory')) : [];
        history.push({ expression: expression, result: result, timestamp: new Date().toLocaleString() });
        localStorage.setItem('calcHistory', JSON.stringify(history));
    }
});
