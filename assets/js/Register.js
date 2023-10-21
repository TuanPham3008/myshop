// Animation Register
const signUpBtn = document.getElementById('signUp');
const signInBtn = document.getElementById('signIn');
const containerRegister = document.getElementById('form-container');

signUpBtn.addEventListener('click', () => {
    containerRegister.classList.add('right-panel-active');
    localStorage.setItem('isSignUp', true);

});

signInBtn.addEventListener('click', () => {
    containerRegister.classList.remove('right-panel-active');
    localStorage.removeItem('isSignUp');
});

// Handle Palnel SignUp
var isSignUp = localStorage.getItem('isSignUp');
if(isSignUp == 'true') {
    containerRegister.classList.add('right-panel-active');
}

// Form SignUp
function ValidateSignUp(formSelector) {
    
    let userName = document.querySelector('.fullname');
    let emailSignup = document.querySelector('.email-signup');
    const pass = document.getElementById('password');

    /**
     * ======================================================================
     */

    // Lắng nghe 2 sự kiện của input
    var inputs = document.querySelectorAll('.form-register__input');
    for (var input of inputs) {
        input.onblur = handleValidate;
        input.oninput = handleClearError;
    }
    
    function handleValidate() {
        var errorMessage;
        var userNameValue = userName.value;
        let emailSignupValue = emailSignup.value;
        let passV = pass.value;
        if (userNameValue == '') {
            handleSetError(userName, 'Trường này không được để trống!');
            errorMessage = true;
        }

        if (emailSignupValue == '') {
            handleSetError(emailSignup, 'Trường này không được để trống!');
            errorMessage = true;
        } else if (!isEmail(emailSignupValue)) {
            handleSetError(emailSignup, 'Email không đúng định dạng!');
            errorMessage = true;
        }

        if (passV == '') {
            handleSetError(pass, 'Trường này không được để trống!');
            errorMessage = true;
        } else if (passV.length < 8) {
            handleSetError(pass, 'Mật khẩu cần ít nhất 8 ký tự!');
            errorMessage = true;
        }

        return !errorMessage;
    }

    function handleClearError(event) {
        let parentEle = event.target.parentElement;

        if (parentEle.classList.contains('invalid')) {
            parentEle.classList.remove('invalid');

            if (parentEle.querySelector('.form-message')) {
                parentEle.querySelector('.form-message').innerText = '';
            }
        }
    }

    function isEmail(email) {
        var checkEmail = /^[A-Za-z0-9_.]{6,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$/;
        return checkEmail.test(email);
    }

    function handleSetError(ele, errorMessage) {
        let parentEle = ele.parentElement;
        if (parentEle) {
            parentEle.classList.add('invalid');

            let formMessage = parentEle.querySelector('.form-message');
            if (formMessage) {
                formMessage.innerText = errorMessage;
            }
        }

    }

    

    // Xử lý submit form
    var formElement = document.querySelector(formSelector);

    formElement.onsubmit = (event) => {
        event.preventDefault();

        let isValid = true;

        if(!handleValidate()) {
            isValid = false;
        }
        
        
        if(isValid) {
            if(typeof this.onSubmit === 'function') {
                var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');

                // Cover "enableInputs" qua array => để dùng reduce
                //  => lấy all value của "enableInputs"
                var formValues = Array.from(enableInputs).reduce((values, input) => {
                    values[input.name] = input.value;
                    return values;
                }, {});
                this.onSubmit(formValues);

                // Show Message Success
                let successMes = document.querySelector('.message-success');
                successMes.style.display = 'block';
                successMes.textContent = 'Đăng ký thành công!';

                setTimeout(() => {
                    successMes.style.display = 'none';
                }, 1000)

                setTimeout(() => {
                    containerRegister.classList.remove('right-panel-active');
                    localStorage.removeItem('isSignUp');
                }, 1100)

            // Submit vs hành vi mặc định
            } else {
                formElement.submit();
            }
        }

    }
}

// ---------------------------------------------------------------------------------------------

// Form SignIn
function SignIn(formSelector) {
    const userName = document.querySelector('.username-signin');
    const pass = document.querySelector('.password-signin');
    const inputs = document.querySelectorAll('.form-signin__input');
    
    for(var input of inputs) {
        input.onblur = handleSignIn;
        input.oninput = handleClearError;
    }

    function handleSignIn() {
        let errMessage;
        let userNameValue = userName.value;
        let passValue = pass.value;

        var username = localStorage.getItem('userData');
        var userdata = JSON.parse(username);

        if(username == null) {

            // Show Message Warning
            let warningMes = formElement.querySelector('.message-warning');
            warningMes.style.display = 'block';
            warningMes.textContent = 'Vui Lòng Đăng ký tài khoản!';

            setTimeout(() => {
                warningMes.style.display = 'none';
            }, 1000)

            errMessage = true;
        }
        

        if(localStorage.getItem('userData')) {
            if(
                userNameValue !== userdata.username && 
                passValue !== userdata.password
            ) {
                handleSetError(userName, 'Vui Lòng Kiểm Tra Lại Tài Khoản Của Bạn')
                handleSetError(pass, 'Vui Lòng Kiểm Tra Lại Mật Khẩu Của Bạn')
                errMessage = true;
            }

            if(userNameValue !== userdata.username) {
                errMessage = true;
                handleSetError(userName, 'Vui Lòng Kiểm Tra Lại Tài Khoản Của Bạn')
    
            } else if(
                userNameValue == userdata.username && 
                passValue !== userdata.password
            ) {
                
                handleSetError(pass, 'Vui Lòng Kiểm Tra Lại Mật Khẩu Của Bạn')
                errMessage = true;

            } 
        }
        return !errMessage;
    } 

    function handleSetError(ele, errorMessage) {
        let parentEle = ele.parentElement;
        if (parentEle) {
            parentEle.classList.add('invalid');

            let formMessage = parentEle.querySelector('.form-message');
            if (formMessage) {
                formMessage.innerText = errorMessage;
            }
        }

    }

    function handleClearError(event) {
        let parentEle = event.target.parentElement;
        
        if (parentEle.classList.contains('invalid')) {
            parentEle.classList.remove('invalid');

            if (parentEle.querySelector('.form-message')) {
                parentEle.querySelector('.form-message').innerText = '';
            }
        }
    }


    const formElement = document.querySelector(formSelector);

    formElement.onsubmit = (event) => {
        event.preventDefault();

        let isValid = true;

        if(!handleSignIn()) {
            isValid =false;
        }

        if(isValid) {

            // Sau khi đăng nhập thành công
            setTimeout(() => {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = "../index.html"; 
            }, 1100);

            // Show Message Success
            let successMes = formElement.querySelector('.message-success');
            successMes.style.display = 'block';
            successMes.textContent = 'Đăng nhập thành công!';
            
            setTimeout(() => {
                successMes.style.display = 'none';
            }, 1000)

        }
    }

}