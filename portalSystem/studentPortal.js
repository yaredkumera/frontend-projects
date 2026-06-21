const loginbtn1 = document.querySelector(".loginbtn1");
const loginbtn2 = document.querySelector(".loginbtn2");
const register = document.querySelector(".register");
const submmit_reg = document.querySelector(".submmit_reg");
const stu_cont2 = document.querySelector(".stu_cont2");
const stu_cont1 = document.querySelector(".stu_cont1");
const login_card = document.querySelector(".login_card");
const registration = document.querySelector(".registration");
const body_ofdash_board = document.querySelector(".body_ofdash_board");
const dash_board = document.querySelector(".dash_board");
const header = document.querySelector(".header");
const idtoreg = document.querySelector(".idtoreg");
const password = document.querySelector(".password");
const rightSide = document.querySelector(".rightSide");
const leftSide = document.querySelector(".leftSide");
const toSeeResult = document.querySelector(".toSeeResult");
const table = document.querySelector("table");
const mathTBAName = document.querySelector(".mathTBAName");
const matOut20 = document.querySelector(".matOut20");
const matOut30 = document.querySelector(".matOut30");
const matOut50 = document.querySelector(".matOut50");
const mcrt = document.querySelector(".mcrt");
const m100 = document.querySelector(".m100");
const mgrd = document.querySelector(".mgrd");

const engTBAName = document.querySelector(".engTBAName");
const engOut20 = document.querySelector(".engOut20");
const engOut30 = document.querySelector(".engOut30");
const engOut50 = document.querySelector(".engOut50");
const ecrt = document.querySelector(".ecrt");
const e100 = document.querySelector(".e100");
const egrd = document.querySelector(".egrd");

const phyTBAName = document.querySelector(".phyTBAName");
const phyOut20 = document.querySelector(".phyOut20");
const phyOut30 = document.querySelector(".phyOut30");
const phyOut50 = document.querySelector(".phyOut50");
const pcrt = document.querySelector(".pcrt");
const p100 = document.querySelector(".p100");
const pgrd = document.querySelector(".pgrd");

const bioTBAName = document.querySelector(".bioTBAName");
const bioOut20 = document.querySelector(".bioOut20");
const bioOut30 = document.querySelector(".bioOut30");
const bioOut50 = document.querySelector(".bioOut50");
const bcrt = document.querySelector(".bcrt");
const b100 = document.querySelector(".b100");
const bgrd = document.querySelector(".bgrd");

const cheTBAName = document.querySelector(".cheTBAName");
const cheOut20 = document.querySelector(".cheOut20");
const cheOut30 = document.querySelector(".cheOut30");
const cheOut50 = document.querySelector(".cheOut50");
const ccrt = document.querySelector(".ccrt");
const c100 = document.querySelector(".c100");
const cgrd = document.querySelector(".cgrd");

const backtoinitial = document.querySelector(".backtoinitial");
const profile = document.querySelector(".profile");
const profilebody = document.querySelector(".profilebody");
const tablewraper = document.querySelector(".table-wraper");
const stuName = document.querySelector(".stuName");
const stuId = document.querySelector(".stuId");
const stuDep = document.querySelector(".stuDep");
const stuYear = document.querySelector(".stuYear");
const sgpa = document.querySelector(".sgpa");

// profile.addEventListener("click", () => {
//   tablewraper.style.display ="none";
//   profilebody.style.display ="flex";
// });
loginbtn1.addEventListener("click", () => {
  stu_cont2.style.display = "none";
  login_card.style.display = "flex";
});
backtoinitial.addEventListener("click", () => {
  login_card.style.display = "none";
  stu_cont2.style.display = "flex";
});
loginbtn2.addEventListener("click", async () => {
  const stu_password = password.value;
  const res = await fetch("studentPortal.json");
  const data = await res.json();

  const check = data.filter((r) => r.password === Number(stu_password));
  if (check.length > 0) {
    login_card.style.display = "none";
    dash_board.style.display = "flex";
    rightSide.style.display = "none";
  } else {
    alert("please make sure you are first registered");
    return;
  }
});

toSeeResult.addEventListener("click", async () => {
  const stu_password = password.value;
  const [res1, res2] = await Promise.all([
    fetch("resultDatabase.json"),
    fetch("studentPortal.json"),
  ]);
  if (!res1.ok || !res1.ok) {
    alert(
      "something went wrong" + res1.ok
        ? "response stutus is:" + res2.status
        : res2.ok
          ? res1.status
          : "but not with response status",
    );
    return;
  }
  const resultDatabase = await res1.json();
  const studentPortal = await res2.json();
  console.log(resultDatabase);
  console.log(studentPortal);
  const newdata = resultDatabase.filter(
    (id1) => id1.password === Number(stu_password),
  );
  const newdata2 = studentPortal.filter(
    (id1) => id1.password === Number(stu_password),
  );
  const { Name, id, year, Department } = newdata2[0];
  console.log(newdata2[0]);
  stuName.innerHTML = `Students Full Name :${Name}`;
  stuId.innerHTML = `Students id :${id}`;
  stuDep.innerHTML = `Department :${Department}`;
  stuYear.innerHTML = `Year :${year}`;
  //  l= {"TBA":["Dr. Alemu","Jhon T.(phd)","Mr Bahar H.","Mrs Alemitu T.","Dr Aster"],"Name":"Abel","password":2134,"id":"ugpr3310/17",
  //  "Math":[23,16,42],"English":[23,16,42],"physics":[23,16,42],"chemistry":[23,16,42],"biology":[23,16,42]}
  const {
    TBA: [tech1, tech2, tech3, tech4, tech5],
    Math: [Mmid, Massg, Mfin, mc],
    English: [Emid, Eassg, Efin, ec],
    physics: [Pmid, Passg, Pfin, pc],
    chemistry: [Cmid, Cassg, Cfin, cc],
    biology: [Bmid, Bassg, Bfin, bc],
  } = newdata[0];
  const total = (mid, ass, fin) => {
    if (mid === "-" || ass === "-" || fin === "-") {
      return "pending";
    } else {
      return (mid+ass+fin);
    }
  };
  const grade = (result) => {
    if (result==="pending") {
      return "pending";
    } else {
      const GRADE=Number(result)
      if(GRADE>=90) return "A+"
      else if(GRADE>=85) return "A"
      else if(GRADE>=80) return "A-"
      else if(GRADE>=75) return "B+"
      else if(GRADE>=70) return "B"
      else if(GRADE>=65) return "B-"
      else if(GRADE>=60) return "C+"
      else if(GRADE>=50) return "C"
      else if(GRADE>=45) return "C-"
      else if(GRADE>=40) return "D"
      else if(GRADE<=39) return "F"
    }
  };
  const returnpoint=(grade,Credit)=>{
     if(grade==="A+"||grade==="A") return Credit*4
     else if(grade==="A-") return Credit*3.75
     else if(grade==="B+") return Credit*3.5
     else if(grade==="B") return Credit*3.0
     else if(grade==="B-") return Credit*2.75
     else if(grade==="C+") return Credit*2.5
     else if(grade==="C") return Credit*2.0
     else if(grade==="C-") return Credit*1.5
     else if(grade==="D") return Credit
     else if(grade==="F") return Credit*0
     else if(grade==="pending") return "p"
     
  }
  const SGPAfuction=(mcrd,ecrd,bcrd,pcrd,ccrd,Mgrd,Egrd,Bgrd,Pgrd,Cgrd)=>{
      const M=returnpoint(Mgrd,mcrd)
      const E=returnpoint(Egrd,ecrd)
      const B=returnpoint(Bgrd,bcrd)
      const P=returnpoint(Pgrd,pcrd)
      const C=returnpoint(Cgrd,ccrd)
      const totcrd=(mcrd+ecrd+pcrd+ccrd+bcrd)
      if(M==="p"||E==="p"||P==="p"||C==="p"||B==="p"){
        return "pending"
      }else{
        return (M+E+B+P+C)/totcrd
      }
  }
  const Mtot = total(Mmid, Massg, Mfin);
  const Etot = total(Emid, Eassg, Efin);
  const Ptot = total(Pmid, Passg, Pfin);
  const Btot = total(Bmid, Bassg, Bfin);
  const Ctot = total(Cmid, Cassg, Cfin);

    const Mgrd = grade(Mtot);
  const Egrd = grade(Etot);
  const Pgrd = grade(Ptot);
  
  const Bgrd = grade(Btot);


  const Cgrd = grade(Ctot);
 const SGPA=SGPAfuction(mc,ec,bc,pc,cc,Mgrd,Egrd,Bgrd,Pgrd,Cgrd)
 setTimeout(()=>{
 sgpa.innerHTML="Semister GPA <br> "+SGPA

 },9000)
  mathTBAName.innerHTML = tech1;
  engTBAName.innerHTML = tech2;
  cheTBAName.innerHTML = tech3;
  phyTBAName.innerHTML = tech4;
  bioTBAName.innerHTML = tech5;

  matOut20.innerHTML = Massg;
  matOut30.innerHTML = Mmid;
  matOut50.innerHTML = Mfin;
  mcrt.innerHTML = mc;
  setTimeout(()=>{m100.innerHTML = Mtot;
mgrd.innerHTML=Mgrd},5000)

  engOut20.innerHTML = Eassg;
  engOut30.innerHTML = Emid;
  engOut50.innerHTML = Efin;
  ecrt.innerHTML = ec;
  e100.innerHTML = Etot;
egrd.innerHTML=Egrd
setTimeout(()=>{
  bioOut20.innerHTML = Bassg;
  bioOut30.innerHTML = Bmid;
  bioOut50.innerHTML = Bfin;
  bcrt.innerHTML = bc;
  b100.innerHTML = Btot;
bgrd.innerHTML=Bgrd
},8000)


  phyOut20.innerHTML = Passg;
  phyOut30.innerHTML = Pmid;
  phyOut50.innerHTML = Pfin;
  pcrt.innerHTML = pc;
  p100.innerHTML = Ptot;
pgrd.innerHTML=Pgrd

  cheOut20.innerHTML = Cassg;
  cheOut30.innerHTML = Cmid;
  cheOut50.innerHTML = Cfin;
  ccrt.innerHTML = cc;
  c100.innerHTML = Ctot;
cgrd.innerHTML=Cgrd

  rightSide.style.display = "flex";
  tablewraper.style.display = "flex";
  profilebody.style.display = "flex";
});
register.addEventListener("click", () => {
  stu_cont2.style.display = "none";
  registration.style.display = "flex";
});
submmit_reg.addEventListener("click", () => {
  registration.style.display = "none";
  dash_board.style.display = "flex";
});
