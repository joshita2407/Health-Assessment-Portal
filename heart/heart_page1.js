document.getElementById("heart-disease-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Collect input values
    function validateForm(){
        let age = document.getElementById("age").value;
        let sex = document.getElementById("sex").value;
        let chestPain = document.getElementById("chestPain").value;
        let cholesterol = document.getElementById("cholesterol").value;
        let fbsOver120 = document.getElementById("fbsOver120").value;
        let ekg = document.getElementById("ekg").value;
        let maxHr = document.getElementById("maxHr").value;
        let exerciseAngina = document.getElementById("exerciseAngina").value;
    }
    // Store the values in local storage so that they can be accessed on the next page
    localStorage.setItem("age", age);
    localStorage.setItem("sex", sex);
    localStorage.setItem("chestPain", chestPain);
    localStorage.setItem("cholesterol", cholesterol);
    localStorage.setItem("fbsOver120", fbsOver120);
    localStorage.setItem("ekg", ekg);
    localStorage.setItem("maxHr", maxHr);
    localStorage.setItem("exerciseAngina", exerciseAngina);

    
    // Redirect to the result page
    window.location.href = "heart_page2.html";
});
