 //Classess
class Budget {

constructor(budget){
this.budget =Number(budget);
this.budgetLeft = Number(this.budget);
}


//substract from the budget
substractFromBudget(amount){
return this.budgetLeft -= amount;
}


}


//everything related to HTML

class HTML {

     //inserts the budget when the user submites it
    insertBusget(amount){
        //insert into HTML
        budgetTotal.innerHTML = `${amount.budget}`;
        budgetLeft.innerHTML = `${amount.budgetLeft}`;
    }

//display message correct or invalid 
    prentMessage(message,className){
    
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center','alert',className);
        messageWrapper.appendChild(document.createTextNode(message));
        //insert into HTML
        document.querySelector('.primary').insertBefore(messageWrapper,addExpenseForm);


        //clear the error or sucees message after 3 seconds
        setTimeout(() => {
            document.querySelector('.primary .alert').remove();
            addExpenseForm.reset();
        },3000);
    }

   //display the expanses from the form into the list
   addExpenseToList(namee,amount) 
   {
       const  expensesList =  document.querySelector('#expenses ul');
       //cretae a li
       const li = document.createElement('li');
       li.className = "list-group-item d-flex justify-content-between align-items-center";
       li.innerHTML = `
               ${namee} 
               <span class="badge badge-primary badge-pill">$ ${amount}</span>
       `;
       expensesList.appendChild(li);
   }


   truckBudget(amount){
     const budgetLeftDollars = budget.substractFromBudget(amount);
     const budgetLeftStyle =  budgetLeft.parentElement.parentElement.classList;
     budgetLeft.innerHTML = `${budgetLeftDollars}`;
     //check when 25% is left 
     if((budget.budget / 4) > budgetLeftDollars){
        budgetLeftStyle.remove("alert-success","alert-warning");
        budgetLeftStyle.add("alert-danger")

     }else if((budget.budget / 2) > budgetLeftDollars) {
        budgetLeftStyle.remove("alert-success");
        budgetLeftStyle.add("alert-warning")
     }
   }

}


 

 // Variables

const addExpenseForm = document.querySelector("#add-expense"),
      budgetTotal    = document.querySelector("span#total"),
      budgetLeft     = document.querySelector("span#left");

   
let budget,userBudget;




//Instanciate The HTML class
const html = new HTML();


 //Event Listeners

 eventListeners();
function eventListeners(){

    //app Init
    document.addEventListener('DOMContentLoaded',e=>{
        //ask the visitor the weekly budget
        userBudget = prompt('what\'s your budget for this week ? ');
       //validate the user budget
       if(userBudget === null || userBudget === '' || userBudget === '0'){
        window.location.reload();
       }else {
            //budget is valid then instanciate the budget class
            budget = new Budget(userBudget);
            
            //instanciate HTML Class
            html.insertBusget(budget);
         
       }


    });

//when a new expenses is added
    addExpenseForm.addEventListener("submit",e => {
        e.preventDefault();
      //read the values from the budget form 
      
const expenseName = document.querySelector("#expense").value;
const amount  = document.querySelector("#amount").value;

if(expenseName === '' || amount === ''){
html.prentMessage("there was error , all the fields are mandatory","alert-danger");
}else {
    html.prentMessage("added...","alert-success");
    //add expenses to list :
  html.addExpenseToList(expenseName,amount);
  html.truckBudget(amount);
}

       
    })

}
