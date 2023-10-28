(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const main="",SESSIONSTORAGE_KEY="operations",PI=Math.PI;function saveInSession(e,t){if(sessionStorage.getItem(e)){const n=JSON.parse(sessionStorage.getItem(e)).length>=5?JSON.parse(sessionStorage.getItem(e)).slice(-5):JSON.parse(sessionStorage.getItem(e)),a=[].concat(n,t);sessionStorage.setItem(e,JSON.stringify(a));return}sessionStorage.setItem(e,JSON.stringify(t))}function getFromSession(e){return sessionStorage.getItem(e)?JSON.parse(sessionStorage.getItem(e)):"El historial está vacío"}class Calculator{constructor(e,t){this.screen=e,this.ansScreen=t,this.response={exp:"",result:""}}factorialResolve(e){var t=e;if(e===0||e===1)return 1;for(;e>1;)e--,t*=e;return t}parseFactorialNumber(e){const t=/(\d+)!/,n=e.match(t);return n&&n[1]?n[1]:null}parseFactorial(){let e=this.response.exp;for(;e.includes("!");)e=e.replace(this.parseFactorialNumber(e).concat("!"),this.factorialResolve(this.parseFactorialNumber(e)));this.response.result=e}resolve(){this.update(),this.response.exp.includes("!")&&this.parseFactorial();try{this.response.exp.includes("!")||(this.response.result=eval(this.response.exp),this.screen.value=this.response.result)}catch(e){this.response.result="ERR! CHECK SYNTAXIS"}this.ansScreen.value="Ans =  "+this.response.result,saveInSession(SESSIONSTORAGE_KEY,this.response)}update(){this.response.exp=this.screen.value}writeAns(){const e=getFromSession(SESSIONSTORAGE_KEY).slice(-1)[0].result;this.screen.value+=e}}const screen=document.getElementById("screen"),ansScreen=document.getElementById("ans-screen"),history=document.getElementById("icon"),modal=document.getElementById("modal"),modalContent=document.getElementById("modal-content"),allButtons=Array.from(document.getElementsByTagName("button")),calc=new Calculator(screen,ansScreen);let flag=!1;function handleClick(e){switch(e.textContent){case"AC":screen.value="";break;case"C":screen.value=screen.value.substring(0,screen.value.length-1);break;case"ANS":calc.writeAns();break;case"cos":screen.value+="Math.cos(";break;case"log":screen.value+="Math.log(";break;case"tan":screen.value+="Math.tan(";break;case"sin":screen.value+="Math.sin(";break;case"√":screen.value+="Math.sqrt(";break;case"EXP":screen.value+=" * 10 ** ";break;case"^":screen.value+="**";break;case"𝝅":screen.value+=PI;break;case"=":flag=!0,calc.resolve();break;case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case"0":case"(":case")":!isNaN(screen.value.slice(-1))&&flag||screen.value.slice(-1)==="!"?(screen.value=e.textContent,flag=!1):screen.value+=e.textContent;break;default:screen.value+=e.textContent}}allButtons.forEach(e=>{e.addEventListener("click",()=>{handleClick(e)})});history.addEventListener("click",e=>{const t=e.clientX,n=e.clientY;modal.classList.contains("hidden")?modal.classList.replace("hidden","block"):modal.classList.replace("block","hidden"),modal.style.left=`${t}px`,modal.style.top=`${n}px`;const a=getFromSession(SESSIONSTORAGE_KEY);Array.isArray(a)?modalContent.innerHTML=a.map(s=>`<div class="flex items-center font-bold gap-2"><span class="font-bold px-4 py-2 border rounded-md bg-[#111827] border-[#4b5563] cursor-pointer">${s.exp}</span> = <span class="cursor-pointer font-bold px-4 py-2 border rounded-md bg-[#111827] border-[#4b5563]">${s.result}</span></div>`).join(""):typeof a=="object"?modalContent.innerHTML="El historial aún no está listo":modalContent.innerHTML=a});document.addEventListener("click",e=>{e.target!==modal&&e.target!==history&&!modal.contains(e.target)&&modal.classList.contains("block")&&modal.classList.replace("block","hidden")});modalContent.addEventListener("click",e=>{const t=e.target;screen.value=t.innerText});
