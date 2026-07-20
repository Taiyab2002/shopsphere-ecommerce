let users =
    JSON.parse(localStorage.getItem("users")) || [];


const registerForm =
    document.getElementById("register-form");


const loginForm =
    document.getElementById("login-form");



function saveUsers(){

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}



function setCurrentUser(user){

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

}



function getCurrentUser(){

    return JSON.parse(
        localStorage.getItem("currentUser")
    );

}



function goHome(){

    if(
        window.location.pathname.includes("/pages/")
    ){

        window.location.href =
            "../index.html";

    }

    else{

        window.location.href =
            "index.html";

    }

}



function logout(){

    localStorage.removeItem(
        "currentUser"
    );


    goHome();

}



/* ==========================
   REGISTER SYSTEM
========================== */


if(registerForm){


registerForm.addEventListener(
"submit",
function(e){


e.preventDefault();



const name =
document.getElementById("register-name")
.value
.trim();



const username =
document.getElementById("register-username")
.value
.trim()
.toLowerCase();



const identifier =
document.getElementById("register-email")
.value
.trim()
.toLowerCase();



const password =
document.getElementById("register-password")
.value;



const confirmPassword =
document.getElementById("register-confirm-password")
.value;



if(password !== confirmPassword){


alert(
"Passwords do not match!"
);


return;


}




const exists =
users.find(user =>


user.username === username ||

user.email === identifier ||

user.phone === identifier


);



if(exists){


alert(
"Account already exists!"
);


return;


}




let newUser = {


name:name,


username:username,


password:password


};




if(identifier.includes("@")){


newUser.email =
identifier;


}

else{


newUser.phone =
identifier;


}




users.push(newUser);



saveUsers();



alert(
"Registration successful! Please login."
);



window.location.href =
"login.html";



});

}
/* ==========================
   LOGIN SYSTEM
========================== */


function findUser(identifier, password){


identifier =
identifier.trim().toLowerCase();



return users.find(user =>


(
(user.email &&
 user.email.toLowerCase() === identifier)

||

(user.username &&
 user.username.toLowerCase() === identifier)

||

(user.phone &&
 user.phone === identifier)

)

&&

user.password === password



);



}



if(loginForm){


loginForm.addEventListener(
"submit",
function(e){


e.preventDefault();



const identifier =
document.getElementById("login-email")
.value
.trim();



const password =
document.getElementById("login-password")
.value;



const user =
findUser(
identifier,
password
);



if(!user){


alert(
"Invalid username, email or password."
);



return;


}



setCurrentUser(user);



alert(
"Login successful!"
);



goHome();



});

}






/* ==========================
   NAVBAR AUTH UI
========================== */


function initializeAuthUI(){


const currentUser =
getCurrentUser();



const loginLink =
document.getElementById("nav-login");



const registerLink =
document.getElementById("nav-register");



const userMenu =
document.getElementById("nav-user");



const userName =
document.getElementById("nav-username");



const logoutBtn =
document.getElementById("logout-btn");




if(!userMenu) return;




if(currentUser){



if(loginLink){

loginLink.style.display =
"none";

}



if(registerLink){

registerLink.style.display =
"none";

}



userMenu.style.display =
"block";



if(userName){

userName.textContent =
currentUser.name;

}



if(logoutBtn){


logoutBtn.onclick =
logout;


}



}



else{


userMenu.style.display =
"none";


}



}





document.addEventListener(
"DOMContentLoaded",
function(){


initializeAuthUI();


});
/* ==========================
   PASSWORD TOGGLE
========================== */


const togglePassword =
document.getElementById(
"toggle-password"
);



const passwordInput =
document.getElementById(
"login-password"
);



if(
togglePassword &&
passwordInput
){


togglePassword.addEventListener(
"click",
function(){



if(
passwordInput.type === "password"
){


passwordInput.type =
"text";



this.innerHTML =
'<i class="fas fa-eye-slash"></i>';



}

else{


passwordInput.type =
"password";



this.innerHTML =
'<i class="fas fa-eye"></i>';



}



});


}
/* ==========================
   CHECKOUT PROTECTION
========================== */


const currentUser =
getCurrentUser();



if(

window.location.pathname.includes(
"checkout.html"
)

&&

!currentUser

){


alert(
"Please login before checkout."
);



window.location.href =
"login.html";


}
