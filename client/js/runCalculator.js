function calculateTargetGrade() {
    let currentGrade = parseFloat(document.getElementById('current-grade').value);
    let targetGrade = parseFloat(document.getElementById('target-grade').value);
    let weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(currentGrade) || isNaN(targetGrade) || isNaN(weight) || currentGrade < 0 || currentGrade > 100 || targetGrade < 0 || targetGrade > 100 || weight < 0 || weight > 100) {
        alert("Please enter valid values for all fields.");
        return;
    }

    let requiredGrade = (targetGrade - currentGrade * (1 - (weight / 100))) / (weight / 100);

    let resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `You need to score <strong>${requiredGrade.toFixed(2)}%</strong> on your final assignment to reach your target grade of ${targetGrade}%.`;
}

function clearFields() {
    document.getElementById('current-grade').value = '';
    document.getElementById('target-grade').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('result').style.display = 'none';
}
