let membersBtn = document.querySelector(".members");
let membersScreen = document.querySelector(".membersScreen");
let spinnerScreen = document.querySelector(".spinerScreen");
let historyScreen = document.querySelector(".historyScreen");

function showScreen(screen){
  [membersScreen, spinnerScreen, historyScreen].forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

let totalAmountDisplay = document.querySelector(".totalAmount");
let totalMembersDisplay = document.querySelector(".totalMemb");
let historyBtn = document.querySelector(".history");
let currentRoundDisplay = document.querySelector(".currentRound");
let spinnerBtn = document.querySelector(".spiner");

let tableWrapper = document.querySelector(".tablewraper");
let workArea = document.querySelector(".workplace");
let addBtn = document.querySelector(".addbtn");
let storageKeys = { MEMBERS_KEY: "Membres", HISTORY_KEY: "HIStoriees" };
let actionsOnTable = document.querySelector(".actionsontable");
let { MEMBERS_KEY, HISTORY_KEY } = storageKeys;

let members = [
  { fullName: "Kebede Gemeda", id: "001", amount: 3000, payment: "paid" },
  { fullName: "Kebede Gemeda", id: "002", amount: 3000, payment: "paid" },
  { fullName: "Abebech Habte", id: "003", amount: 3000, payment: "paid" },
  { fullName: "Abebech Habte", id: "004", amount: 3000, payment: "paid" },
  { fullName: "Abebech Habte", id: "005", amount: 3000, payment: "paid" },
  { fullName: "Abebech Habte", id: "006", amount: 3000, payment: "paid" },
];

membersBtn.addEventListener("click", () => {
  saveToStorage(MEMBERS_KEY, members);
  members = loadFromStorage(MEMBERS_KEY);
  render(members, true);
  updateStats(MEMBERS_KEY);
  updateRoundDisplay();
  showScreen(membersScreen);
});

let roundHistory = [];
let mainTable = document.createElement("table");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

spinnerBtn.addEventListener("click", () => {
  spinnerScreen.innerHTML = "";
  showScreen(spinnerScreen);
  let spinnerEl = document.createElement("p");
  spinnerEl.classList.add("spine");
  spinnerScreen.appendChild(spinnerEl);

  loadFromStorage(MEMBERS_KEY);
  let winnerIndex = getRandomInt(0, members.length - 1);
  roundHistory = loadFromStorage(HISTORY_KEY);
    if (roundHistory.length >= members.length + 1) {
      clearStorage(HISTORY_KEY);
      roundHistory = [];
    }
  let searching = true;
  while (searching) {
    let alreadyWon = roundHistory.filter(h => Number(h.id) === Number(members[winnerIndex].id));
    if (alreadyWon.length > 0) {
      winnerIndex = getRandomInt(0, members.length - 1);
    } else {
      searching = false;
    }
  }

  setTimeout(() => {
    spinnerEl.style.display = "none";

    let paidMembers = members.filter(m => m.payment === "paid");
    roundHistory.push({
      ...members[winnerIndex],
      date: new Date().toLocaleDateString(),
      Recived: paidMembers.length * 3000
    });

    saveToStorage(HISTORY_KEY, roundHistory);
    loadFromStorage(HISTORY_KEY);

    let resultDiv = document.createElement("div");
    resultDiv.classList.add("resultContainer");
    console.log(members[winnerIndex].fullName, members[winnerIndex].id);
    resultDiv.innerHTML = "Current Reciver Name : " + members[winnerIndex].fullName + "<br>" + "ID :" + members[winnerIndex].id;



    spinnerScreen.appendChild(resultDiv);
    updateRoundDisplay();
  }, 2000);
});

historyBtn.addEventListener("click", () => {
  historyScreen.innerHTML = "";
  showScreen(historyScreen);

  let historyTable = document.createElement("table");
  let headerRow = document.createElement("tr");
  headerRow.innerHTML = `<th>round</th><th>Reciver Name</th><th>Recivers ID</th><th>Total amount they Recived</th><th>Date</th>`;
  historyTable.appendChild(headerRow);

  roundHistory = loadFromStorage(HISTORY_KEY);
  roundHistory.forEach((entry, index) => {
    let row = document.createElement("tr");
    let roundNumber = index + 1;
    row.innerHTML = `<th>${roundNumber}</th><td>${entry.fullName}</td><td>${entry.id}</td><td>${entry.Recived}</td><td>${entry.date}</td>`;
    historyTable.appendChild(row);
  });

  historyScreen.appendChild(historyTable);
  updateRoundDisplay();
});

function render(memberList, showHeader) {
  let dataToRender = memberList === "" ? members : memberList;
  mainTable.innerHTML = "";

  if (showHeader) {
    let headerRow = document.createElement("tr");
    headerRow.innerHTML = `<th></th> <th>fullName</th> <th>iqub id</th> <th>Fixed amounts per/month</th> <th>payment-status</th> `;
    mainTable.appendChild(headerRow);
  }

  dataToRender.forEach((memb, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `<th>${index + 1}.</th> <td>${memb.fullName}</td> <td>${memb.id}</td> <td>${memb.amount}</td> <td>${memb.payment}</td> `;
    mainTable.appendChild(row);
  });

  tableWrapper.appendChild(mainTable);
  updateRoundDisplay();
}

function clearStorage(key) {
  localStorage.removeItem(key);
}

let deleteBtn = document.querySelector(".deletememb");

deleteBtn.addEventListener("click", () => {
  workArea.innerHTML = "";
  let idInput = document.createElement("input");
  let confirmDeleteBtn = document.createElement("button");
  confirmDeleteBtn.textContent = "delete";
  idInput.placeholder = "enter id to delte";
  idInput.type = "number";

  confirmDeleteBtn.addEventListener("click", () => {
    let targetId = Number(idInput.value);
    members = members.filter(m => Number(m.id) !== targetId);
    saveToStorage(MEMBERS_KEY, members);
    members = loadFromStorage(MEMBERS_KEY);
    render(members, true);
    updateStats(MEMBERS_KEY);
    workArea.innerHTML = "";
  });

  workArea.appendChild(idInput);
  workArea.appendChild(confirmDeleteBtn);
  updateRoundDisplay();
});

addBtn.addEventListener("click", () => {
  workArea.innerHTML = "";
  let nameInput = document.createElement("input");
  let paymentInput = document.createElement("input");
  let confirmAddBtn = document.createElement("button");
  confirmAddBtn.innerHTML = "ADD";
  nameInput.placeholder = "fullName of new member";
  paymentInput.placeholder = "payment status paid/not paid";

  confirmAddBtn.addEventListener("click", () => {
    workArea.innerHTML = "";
    if (nameInput.value === "" || paymentInput.value === "")
      return alert("please fill both spaces");

    console.log(members);
    let newId = members.length + 1;
    let stillSearching = true;
    while (stillSearching) {
      for (let m of members) {
        if (Number(m.id) === Number(newId)) {
          stillSearching = true;
          newId++;
          break;
        } else {
          stillSearching = false;
        }
      }
    }

    let newMember = {
      fullName: nameInput.value,
      id: String(newId).padStart(3, "0"),
      amount: 3000,
      payment: paymentInput.value,
    };
    members.push(newMember);
    saveToStorage(MEMBERS_KEY, members);
    members = loadFromStorage(MEMBERS_KEY);
    render(members, true);
    updateStats(MEMBERS_KEY);
  });

  workArea.appendChild(nameInput);
  workArea.appendChild(paymentInput);
  workArea.appendChild(confirmAddBtn);
  updateRoundDisplay();
});

let updateBtn = document.querySelector(".updatememb");

updateBtn.addEventListener("click", () => {
  workArea.innerHTML = "";
  let idInput = document.createElement("input");
  let sendBtn = document.createElement("button");
  sendBtn.textContent = "send";
  idInput.type = "number";
  idInput.placeholder = "Enter id to update its contents";

  sendBtn.addEventListener("click", () => {
    workArea.innerHTML = "";
    let nameInput = document.createElement("input");
    let paymentInput = document.createElement("input");
    let finishBtn = document.createElement("button");
    finishBtn.textContent = "Finish";

    let targetMember = findMemberById(Number(idInput.value));
    if (targetMember === null) {
      alert("there is no member with ID =" + idInput.value + ",please add first ");
      return;
    }

    nameInput.value = targetMember.fullName;
    paymentInput.value = targetMember.payment;

    function findMemberIndex(id) {
      let index = 0;
      for (let m of members) {
        if (Number(m.id) === Number(id)) {
          return index;
        }
        index++;
      }
      return -1;
    }

    finishBtn.addEventListener("click", () => {
      let memberIndex = findMemberIndex(Number(idInput.value));
      if (memberIndex === -1) {
        alert("id not found");
        return;
      } else {
        members[memberIndex].fullName = nameInput.value;
        members[memberIndex].payment = paymentInput.value;
        saveToStorage(MEMBERS_KEY, members);
        members = loadFromStorage(MEMBERS_KEY);
        render(members, true);
        updateStats(MEMBERS_KEY);
        workArea.innerHTML = "";
      }
    });

    workArea.appendChild(nameInput);
    workArea.appendChild(paymentInput);
    workArea.appendChild(finishBtn);
  });

  workArea.appendChild(idInput);
  workArea.appendChild(sendBtn);
  updateRoundDisplay();
});

function findMemberById(id) {
  let found = members.filter(m => Number(m.id) === Number(id));
  return found.length > 0 ? found[0] : null;
}

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadFromStorage(key) {
  let saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
}

function updateStats(key) {
  let data = loadFromStorage(key);
  totalMembersDisplay.innerHTML = "Total-Members<br>" + data.length;
  let paidMembers = data.filter(m => m.payment === "paid");
  totalAmountDisplay.innerHTML = "Total-Amount<br>" + paidMembers.length * 3000;
}

render(loadFromStorage(MEMBERS_KEY), true);
updateStats(MEMBERS_KEY);

function updateRoundDisplay() {
  currentRoundDisplay.innerHTML = "Current-Round<br>" + (loadFromStorage(HISTORY_KEY).length + 1);
}

actionsOnTable.appendChild(workArea);