let c = -1
let selection = []
let body     = document.querySelector(".body")
let h10     = document.querySelector(".h10")
let header   = document.querySelector(".header")
let question = document.querySelector(".question")
let option1  = document.querySelector("#option1")
let option2  = document.querySelector("#option2")
let option3  = document.querySelector("#option3")
let option4  = document.querySelector("#option4")
let spanop1  = document.querySelector("#spanop1")
let spanop2  = document.querySelector("#spanop2")
let spanop3  = document.querySelector("#spanop3")
let spanop4  = document.querySelector("#spanop4")
let nextbtn  = document.querySelector(".next")

const q = [
    { q1: "What is 4 - 8?",   options: [879, 8798, -4, 4],  answer: -4  },
    { q1: "What is 4 + 8?",   options: [56, 87, 12, 4],     answer: 12  },
    { q1: "What is 4 * 100?", options: [56, 400, 12, 4],    answer: 400 },
]

const getquestion = () => {
    const selected = document.querySelector("input[name='option']:checked")

    if (c >= 0) {
        if (!selected) {
            alert("Please select an answer")
            return
        }
        selection.push(selected.value)
        selected.checked = false
    }

    c++

    if (c === q.length) {
        h10.innerHTML = `SENT`

body.style.display="none"
h10.style.display="block"
fetching()
return      
      

    }

    question.innerHTML = q[c].q1
    option1.value      = q[c].options[0]
    option2.value      = q[c].options[1]
    option3.value      = q[c].options[2]
    option4.value      = q[c].options[3]
    spanop1.innerHTML  = q[c].options[0]
    spanop2.innerHTML  = q[c].options[1]
    spanop3.innerHTML  = q[c].options[2]
    spanop4.innerHTML  = q[c].options[3]

    if (c === q.length - 1) nextbtn.innerHTML = "Submit"
}

const fetching = async () => {
    const res = await fetch("https://formspree.io/f/xzdqreyg", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name:    document.querySelector(".NAME").value,
            email:   document.querySelector(".EMAIL").value,
            score:   `${selection.length} / ${q.length}`,
            answers: selection.join(", ")
        })
    })
    const data =  res.json()
    if (res.ok) {
        h10.innerHTML = "✅ Results sent to your email!"
    } else {
        h10.innerHTML = "❌ Failed to send"
    }
}
let hideheader = () => {
    const name  = document.querySelector(".NAME").value.trim()
    const email = document.querySelector(".EMAIL").value.trim()

    if (!name || !email) {
alert("Please enter your name and email")
        return
    }

    header.style.display = "none"
    body.style.display   = "grid"
    getquestion()
}
    