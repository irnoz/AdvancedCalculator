// site.js
$(document).ready(function() {
    $('#calculatorForm').submit(function(event) {
        event.preventDefault();
        const expression = $('#expression').val();

        $.ajax({
            url: '/Home/Calculate',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ expression: expression }),
            success: function(result) {
                $('#result').text(result);
                addToHistory(expression, result);
            },
            error: function() {
                $('#result').text('Error calculating expression.');
            }
        });
    });

    function addToHistory(expression, result) {
        const timestamp = new Date().toISOString();
        const history = getHistory();
        history.push({ expression, result, timestamp });
        localStorage.setItem('calcHistory', JSON.stringify(history));
    }

    function getHistory() {
        const history = localStorage.getItem('calcHistory');
        return history ? JSON.parse(history) : [];
    }
});
