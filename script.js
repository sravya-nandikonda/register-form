//<script src="script.js"></script>
const form=document.getElementById('form');
const username=document.getElementById('username');
const email=document.getElementById('email');
const password=document.getElementById('password');
const password2=document.getElementById('password2');

//to show an error message 
function showError(input,message)
{
     const formControl=input.parentElement;
     formControl.className='form-control error';
     const small=formControl.querySelector('small');//query selector can take a tag ,an id or a class
     small.innerText=message;
}

//to show a success
function showSuccess(input)
{
    const formControl=input.parentElement;
    formControl.className='form-control success';
}

// Check email is valid
function checkEmail(input) 
{   //the following is taken from stackoverflow..search for 'js email regex'
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim()))
    {
        showSuccess(input);
    }
    else{
        showError(input,'Email is not valid');
    }
}

//checkRequired function
function checkRequired(inputArr)
{
    
    inputArr.forEach(function(input)
    {
        if(input.value.trim()==='')
        {
             showError(input,`${getFieldName(input)} is required`);
           
        }
        
    });
    
}

//check length
function checkLength(input,min,max)
{
    if(input.value.length<min)
    {
       showError(input,`${getFieldName(input)} must be atleast ${min} characters`);
        //input.parentElement.small.innerText=input+" must be atleast"+ min+" characters";
    }
    else if(input.value.length>max)
    {
        showError(input,`${getFieldName(input)} must be less than ${max} characters`);
        //input.parentElement.small.innerText=input+" must not exceed"+ max+" characters";
    }
    else{
        showSuccess(input);
    }
}

//check passwords
function checkPasswordsMatch(input1,input2)
{
    if(input1.value!==input2.value)
    {
        showError(input2,"passwords do not match");
    }
    else if(input1.value.trim()!=='' && input1.value===input2.value){
        showSuccess(input2);
    }
}
 
//making first characters of input words to uppercase and using them in error messages
function getFieldName(input)
{
    return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}

//event listener
form.addEventListener('submit',function(e){
    e.preventDefault();
        checkRequired([username,email,password,password2]);
        checkLength(username,3,15);
        checkLength(password,8,25);
        checkEmail(email);
        checkPasswordsMatch(password,password2);
    
});


