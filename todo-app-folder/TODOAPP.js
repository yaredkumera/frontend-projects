let tasks = []
let totaltasks = 0
let completedtask = 0

const addbtn = document.querySelector("#addbtn")
const input = document.querySelector("#input")
const container1 = document.querySelector("#container1")
const totaltaskEl = document.querySelector("#totaltask")       // renamed — was clashing
const completedtasksEl = document.querySelector("#completedtasks") // renamed

completedtasksEl.classList.add("completedtasks")

input.addEventListener("keyup", function(e) {
    if (e.key === "Enter") addbtn.click()
})
       const p= document.querySelector("p") 

addbtn.addEventListener("click", function() {
    if (input.value === "") {
       p.style.display="block"
p.innerHTML="please Enter Task first"
        return}
p.style.display="none"
    const id = Date.now()
    tasks.push({ id:id, task: input.value, complet: false })

    totaltasks = tasks.length
    totaltaskEl.textContent = "Total tasks added: " + totaltasks
    totaltaskEl.classList.add("totaltask")

    const container2 = document.createElement("div")
    const spantag = document.createElement("span")
    const donebtn = document.createElement("button")
    const deletebtn = document.createElement("button")

    container2.classList.add("container2")
    // container2.dataset.id = id     
    spantag.classList.add("spantag")
    donebtn.classList.add("donebtn")
    deletebtn.classList.add("deletebtn")

    spantag.textContent = input.value
    donebtn.textContent = "done"
    deletebtn.textContent = "delete"

    container2.appendChild(spantag)
    container2.appendChild(donebtn)
    container2.appendChild(deletebtn)
    container1.appendChild(container2)
    container1.classList.add("container1")

    input.value = ""

    donebtn.addEventListener("click", function() {
        spantag.classList.toggle("done")
p.style.display="none"
        tasks = tasks.map(t =>
            t.id === id ? { ...t, complet: !t.complet } : t
        )

        completedtask = tasks.filter(t => t.complet === true).length
        completedtasksEl.textContent = "Total completed tasks: " + completedtask
        console.log("tasks:", tasks)
    })

    deletebtn.addEventListener("click", function() {
        container2.remove()
        tasks = tasks.filter(t => t.id !== id)
p.style.display="none"
        totaltasks = tasks.length
        totaltaskEl.textContent = "Total tasks added: " + totaltasks
        completedtask = tasks.filter(t => t.complet === true).length
        completedtasksEl.textContent = "Total completed tasks: " + completedtask
        console.log("tasks after delete:", tasks)
    })
})
   