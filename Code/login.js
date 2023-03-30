function showPassword() {
    var passwordField = document.getElementById("password");
    var checkbox = document.getElementById("show-password");
    if (checkbox.checked) {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}