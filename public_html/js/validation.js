
function registrationValidation(){
    var error = 0;
    error += validateInput('login_cd', 'text', true);
    error += validateInput('password', 'text', true);
    error += validateInput('name', 'text', true);
    error += validateInput('email', 'text', true);
    error += validateInput('mobile', 'mobile', false);
    return error;
}

function validateInput(id, inputType, inputReq){
    error = 0;
    errorMsg = '';
    elem = document.getElementById(id);
    value = elem.value;
    if (inputReq && value ==='') {
        error ++;
        errorMsg = '<em>Field is empty. </em>';
    }else{
        switch (inputType) {
            case 'text':

                break;

            case 'email':
                var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value)) {
                    error ++;
                    errorMsg = "<em> email must include @. </em>";
                }
                break;
            case 'mobile':
                var phoneNumberPattern = /^[0-9]{10}$/;
                if (!phoneNumberPattern.test(value)) {
                    var nonDigitCharacter = value.replace(/[0-9]/g, '');
                    error ++;
                    if (nonDigitCharacter === "") {
                        errorMsg = "<em> Phone number must be exactly 10 digits </em>";
                    }else{
                        errorMsg = "<em> Contains character "+nonDigitCharacter+". Number only! </em>";
                    }
                }
                break;
            case 'postal':
                var postalCodeRegex = /^\d{4}$/;
                if (!postalCodeRegex.test(value)) {
                    error ++;
                    errorMsg = "<em> Postal code must be a 4 digit number </em>";
                }
                break;
            case 'password':
                const uppercaseRegex = /[A-Z]/;
                const lowercaseRegex = /[a-z]/;
                const numberRegex = /[0-9]/;
                const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
                // Check each condition
                const hasUppercase = uppercaseRegex.test(value);
                const hasLowercase = lowercaseRegex.test(value);
                const hasNumber = numberRegex.test(value);
                const hasSymbol = symbolRegex.test(value);
                const isLengthValid = value.length >= 8;
                errorMsg = '<em> Must include:'
                if (!hasUppercase) {
                    error++;
                    errorMsg += "Uppercase character";
                }
                if(!hasLowercase){
                    if (error > 0) {
                        errorMsg += ', ';
                    }
                    errorMsg += "Lowercase character";
                    error++;

                }
                if(!hasNumber){
                    if (error > 0) {
                        errorMsg += ', ';
                    }
                    errorMsg += "Number";
                    error++;
                }
                if(!hasSymbol){
                    if (error > 0) {
                        errorMsg += ', ';
                    }
                    errorMsg += "Symbol";
                    error++;
                }
                if(!isLengthValid){
                    if (error > 0) {
                        errorMsg += '<br>';
                    }
                    errorMsg += "Must has at least 8 characters.";
                    error++;
                }
                break;
        }
    }
    var errorMsgElem = document.createElement("span");
    var inputParent = elem.parentElement;
    inputParent.removeChild(inputParent.lastChild)
    if (error > 0) {
        errorMsgElem.innerHTML = errorMsg;
        errorMsgElem.classList.add("text-danger");
        errorMsgElem.classList.remove("text-success");
        elem.classList.add("invalid_form_input");
        
    }else{
        errorMsgElem.innerHTML = "Valid";
        errorMsgElem.classList.add("text-success");
        errorMsgElem.classList.remove("text-danger");
        elem.classList.remove("invalid_form_input");

    }
    inputParent.appendChild(errorMsgElem);
    return error;
}

function resetForm(event) {
    event.preventDefault();
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("unitCode").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("nameErrorMsg").innerHTML = "";
    document.getElementById("emailErrorMsg").innerHTML = "";
    document.getElementById("unitCodeErrorMsg").innerHTML = "";
    document.getElementById("phoneErrorMsg").innerHTML = "";

}

