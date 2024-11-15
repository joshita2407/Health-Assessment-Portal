document.addEventListener("DOMContentLoaded", function () {
    // References to form elements and error spans
    const ageInput = document.getElementById("age");
    const genderSelect = document.getElementById("gender");
    const totBilirubinInput = document.getElementById("tot_bilirubin");
    const directBilirubinInput = document.getElementById("direct_bilirubin");
    const totProteinsInput = document.getElementById("tot_proteins");
    const albuminInput = document.getElementById("albumin");
    const agRatioInput = document.getElementById("ag_ratio");
    const sgptInput = document.getElementById("sgpt");
    const sgotInput = document.getElementById("sgot");
    const alkphosInput = document.getElementById("alkphos");

    const ageError = document.getElementById("age-error");
    const totBilirubinError = document.getElementById("tot-bilirubin-error");
    const directBilirubinError = document.getElementById("direct-bilirubin-error");
    const totProteinsError = document.getElementById("tot-proteins-error");
    const albuminError = document.getElementById("albumin-error");
    const agRatioError = document.getElementById("ag-ratio-error");
    const sgptError = document.getElementById("sgpt-error");
    const sgotError = document.getElementById("sgot-error");
    const alkphosError = document.getElementById("alkphos-error");

    // Validation functions
    function validateAge() {
        const age = ageInput.value.trim();
        if (!age || isNaN(age) || age <= 0) {
            ageError.style.display = "inline";
        } else {
            ageError.style.display = "none";
        }
    }

    function validateTotalBilirubin() {
        const totBilirubin = totBilirubinInput.value.trim();
        if (!totBilirubin || isNaN(totBilirubin) || totBilirubin <= 0) {
            totBilirubinError.style.display = "inline";
        } else {
            totBilirubinError.style.display = "none";
        }
    }

    function validateDirectBilirubin(){
        const directBilirubin = directBilirubinInput.value.trim();
        if (!directBilirubin || isNaN(directBilirubin) || directBilirubin <= 0) {
            directBilirubinError.style.display = "inline";
        } else {
            directBilirubinError.style.display = "none";
        }
    }

    function validateProteins() {
        const totProteins = totProteinsInput.value.trim();
        if (!totProteins || isNaN(totProteins) || totProteins <= 0) {
            totProteinsError.style.display = "inline";
        } else {
            totProteinsError.style.display = "none";
        }

        const albumin = albuminInput.value.trim();
        if (!albumin || isNaN(albumin) || albumin <= 0) {
            albuminError.style.display = "inline";
        } else {
            albuminError.style.display = "none";
        }
    }

    function validateAgRatio() {
        const agRatio = agRatioInput.value.trim();
        if (!agRatio || isNaN(agRatio) || agRatio <= 0) {
            agRatioError.style.display = "inline";
        } else {
            agRatioError.style.display = "none";
        }
    }

    function validateSGPT() {
        const sgpt = sgptInput.value.trim();
        if (!sgpt || isNaN(sgpt) || sgpt <= 0) {
            sgptError.style.display = "inline";
        } else {
            sgptError.style.display = "none";
        }
    }

    function validateSGOT() {
        const sgot = sgotInput.value.trim();
        if (!sgot || isNaN(sgot) || sgot <= 0) {
            sgotError.style.display = "inline";
        } else {
            sgotError.style.display = "none";
        }
    }

    function validateAlkphos() {
        const alkphos = alkphosInput.value.trim();
        if (!alkphos || isNaN(alkphos) || alkphos <= 0) {
            alkphosError.style.display = "inline";
        } else {
            alkphosError.style.display = "none";
        }
    }

    // Add event listeners for real-time validation
    ageInput.addEventListener("input", validateAge);
    genderSelect.addEventListener("change", function () {
        const gender = genderSelect.value.trim();
        const genderError = document.getElementById("gender-error");
        if (!gender) {
            genderError.style.display = "inline";
        } else {
            genderError.style.display = "none";
        }
    });
    totBilirubinInput.addEventListener("input", validateTotalBilirubin);
    directBilirubinInput.addEventListener("input", validateDirectBilirubin);
    totProteinsInput.addEventListener("input", validateProteins);
    albuminInput.addEventListener("input", validateProteins);
    agRatioInput.addEventListener("input", validateAgRatio);
    sgptInput.addEventListener("input", validateSGPT);
    sgotInput.addEventListener("input", validateSGOT);
    alkphosInput.addEventListener("input", validateAlkphos);

    // Form submission logic
    const form = document.getElementById("liver-disease-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Collect the input values
        const age = ageInput.value.trim();
        const gender = genderSelect.value.trim();
        const totBilirubin = totBilirubinInput.value.trim();
        const directBilirubin = directBilirubinInput.value.trim();
        const totProteins = totProteinsInput.value.trim();
        const albumin = albuminInput.value.trim();
        const agRatio = agRatioInput.value.trim();
        const sgpt = sgptInput.value.trim();
        const sgot = sgotInput.value.trim();
        const alkphos = alkphosInput.value.trim();

        // Check if there are any errors
        if (document.querySelectorAll("span[style='display: inline;']").length > 0) {
            alert("Please fix the errors before submitting.");
            return;
        }

        // Store the values in localStorage
        localStorage.setItem("age", age);
        localStorage.setItem("gender", gender);
        localStorage.setItem("tot_bilirubin", totBilirubin);
        localStorage.setItem("direct_bilirubin", directBilirubin);
        localStorage.setItem("tot_proteins", totProteins);
        localStorage.setItem("albumin", albumin);
        localStorage.setItem("ag_ratio", agRatio);
        localStorage.setItem("sgpt", sgpt);
        localStorage.setItem("sgot", sgot);
        localStorage.setItem("alkphos", alkphos);

        // Redirect to the next page
        console.log("Form submitted successfully. Redirecting to liver_p2.html...");
        window.location.href = "liver_p2.html";
    });
});
