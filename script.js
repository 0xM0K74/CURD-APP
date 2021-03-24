const formEmp = document.getElementById("formEmp");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const tableBody = document.querySelector("#example tbody");
const submit = document.getElementById("submit");
const contEdit = document.getElementById("contEdit");

class Employee {
    constructor(id, name, email, mobile) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
    }

    showData() {
        Employee.showHTML(this.id, this.name, this.email, this.mobile);
        return this;
    }
    storeEmployee() {
        const allData = JSON.parse(localStorage.getItem("employess")) ?? [] ;
        allData.push({ id: this.id, name: this.name, email: this.email, mobile: this.mobile });
        localStorage.setItem("employess", JSON.stringify(allData));
    }
    static showAllEmployess()
     {
        if(localStorage.getItem("employess"))
        {
        JSON.parse(localStorage.getItem("employess")).forEach((item) => {
            Employee.showHTML(item.id, item.name, item.email, item.mobile);

        });
        }
    }



    static showHTML(id, name, email, mobile) {
        const trEl = document.createElement("tr");
        trEl.innerHTML = "<tr><td>" + name + "</td><td>" + email + "</td><td>" + mobile + "</td><td><button class='edit' data-id=" + id + ">Edit</button><button class='delete' data-id=" + id + ">Delete</button></td></tr>"


        tableBody.appendChild(trEl);

    }

}
Employee.showAllEmployess();
formEmp.addEventListener("submit", (e) => {
    e.preventDefault();
    let id = Math.floor(Math.random() * 100000);
    const newEmp = new Employee(id, nameInput.value, emailInput.value, mobileInput.value);
    newEmp.showData().storeEmployee();
    nameInput.value = '';
    emailInput.value = '';
    mobileInput.value = '';




})

tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        let id = +e.target.getAttribute("data-id");
        let emps = JSON.parse(localStorage.getItem("employess"));
        let newData = emps.filter(item => item.id != id);
        localStorage.setItem("employess", JSON.stringify(newData));
        e.target.parentElement.parentElement.remove();
    }

    if (e.target.classList.contains("edit")) {
        let id = +e.target.getAttribute("data-id");
        let item = JSON.parse(localStorage.getItem("employess")).find(item => item.id === id);
        nameInput.value=item.name;
        emailInput.value = item.email;
        mobileInput.value = item.mobile;
        contEdit.value = id;
        submit.value = "Edit this data";


    }
})
