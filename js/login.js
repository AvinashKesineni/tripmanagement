function login(){
    var email = document.getElementById('email').value;
    var pass = document.getElementById('password').value;


    if(email === "" || pass === ""){
        alert("Email and Password Should not be empty");
        return false;
    }

    else{


    if(!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)){
        alert("Email Should be in proper format");
        return false;
    }

    else{
        alert('Logged in successfully');
        window.location.assign("file:///D:/VII%20SEM/Net%20Centric%20Programming/Project/index.html");
    }
}
}