// history.js
$(document).ready(function() {
    function getHistory() {
        const history = localStorage.getItem('calcHistory');
        return history ? JSON.parse(history) : [];
    }

    function loadHistory() {
        const history = getHistory();
        const tableBody = $('#historyTable tbody');
        
        tableBody.empty();
        
        for (let i = history.length - 1; i >= 0; i--) {
            const item = history[i];
            const row = $('<tr></tr>');
            row.append($('<td></td>').text(item.timestamp));
            row.append($('<td></td>').text(item.expression));
            row.append($('<td></td>').text(item.result));
            tableBody.append(row);
        }
    }

    loadHistory();
});
