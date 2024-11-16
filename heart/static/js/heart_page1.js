document.getElementById("heart-disease-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Collect input values
    let age = document.getElementById("age").value || 0;
    let sex = document.getElementById("sex").value || 0;
    let chestPain = document.getElementById("chestPain").value || 0;
    let trestbps = document.getElementById("trestbps").value || 0;
    let cholesterol = document.getElementById("cholesterol").value || 0;
    let fbsOver120 = document.getElementById("fbsOver120").value || 0;
    let ekg = document.getElementById("ekg").value || 0;
    let maxHr = document.getElementById("maxHr").value || 0;
    let exerciseAngina = document.getElementById("exerciseAngina").value || 0;
    let stDepression = document.getElementById("stDepression").value || 0;
    let slope = document.getElementById("slope").value || 0;
    let ca = document.getElementById("ca").value || 0;
    let thal = document.getElementById("thal").value || 0;

    // Store the values in local storage so they can be accessed on the next page
    localStorage.setItem("age", age);
    localStorage.setItem("sex", sex);
    localStorage.setItem("chestPain", chestPain);
    localStorage.setItem("trestbps", trestbps);
    localStorage.setItem("cholesterol", cholesterol);
    localStorage.setItem("fbsOver120", fbsOver120);
    localStorage.setItem("ekg", ekg);
    localStorage.setItem("maxHr", maxHr);
    localStorage.setItem("exerciseAngina", exerciseAngina);
    localStorage.setItem("stDepression", stDepression);
    localStorage.setItem("slope", slope);
    localStorage.setItem("ca", ca);
    localStorage.setItem("thal", thal);

    // Redirect to the result page
    window.location.href = "heart_page2.html";
});
