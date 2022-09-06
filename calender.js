const containerEl = document.getElementById('container')
const months = ["January", "Febuary", "March"," April", "May", "June", "July", "August", "September", "October", "November", "December"]
const monthDisplayEl = document.getElementById('month-display')
const yearDisplayEl = document.getElementById('year-display')
const chosenEl = document.getElementById('chosen')

let currentMonth = new Date().getMonth()+1
let currentYear = new Date().getFullYear()
const minimumDay = new Date().getDate()
const minimumMonth = new Date().getMonth()+1
const minimumYear =  new Date().getFullYear()
monthDisplayEl.textContent = `${months[currentMonth-1]}`
yearDisplayEl.textContent = `${currentYear}`
create()

function create(){
    monthDisplayEl.textContent = `${months[currentMonth-1]}`
    const boxes = document.querySelectorAll('.calender-row');
    boxes.forEach(box => {
        box.remove();
    });
    let year = currentYear;
    let month = currentMonth;
    let startingDay = new Date(year, month-1, 1).getDay()
    let currentDay = 1;
    let daysInMonth = new Date(year, month, 0).getDate()

    for(let i = 1; i <= 5; i++){
        let element = document.createElement("div");
        element.classList.add("row");
        element.classList.add("calender-row")
        let addHTML = ""
        if(i ==1 ){
            for(let i = 0; i < 7; i++)
            {
                if(i >= startingDay)
                {
                    if(currentDay < minimumDay && minimumMonth == currentMonth)
                    {
                        addHTML += `
                        <div class="col d-g">${currentDay}</div>
                        `
                        currentDay++;
                    }
                    else
                    {
                        addHTML += `
                        <div class="col d"><a class="text-decoration-none" href="#"  onclick="return setDate(${currentYear},${currentMonth},${currentDay})"><p class="pb-1 text-center border rounded-circle d-p">${currentDay}</p></a></div>
                        `
                        currentDay++;
                    }
                }
                else{
                    addHTML += `
                    <div class="col d-g"></div>
                    `
                }
            }
        }
        else{
            for(let i = 0; i < 7; i++)
            {
                if(currentDay <= daysInMonth)
                {
                    if(currentDay < minimumDay && minimumMonth == currentMonth)
                    {
                        addHTML += `
                        <div class="col d-g">${currentDay}</div>
                        `
                        currentDay++;
                    }
                    else
                    {
                        addHTML += `
                        <div class="col d">${currentDay}</div>
                        `
                        currentDay++;
                    }
                }
                else{
                    addHTML += `
                    <div class="col d-g"></div>
                    `
                }
            }
        }
        element.innerHTML = addHTML
        containerEl.appendChild(element);
    }
    console.log(currentDay)
    console.log(daysInMonth)
    if(currentDay <= daysInMonth)
    {
        let element = document.createElement("div");
        element.classList.add("row");
        element.classList.add("calender-row")
        let addHTML = ""
        for(let i = 0; i < 7; i++)
        {
            if(currentDay <= daysInMonth)
            {
                if(currentDay < minimumDay && minimumMonth == currentMonth)
                    {
                        addHTML += `
                        <div class="col d-g">${currentDay}</div>
                        `
                        currentDay++;
                    }
                    else
                    {
                        addHTML += `
                        <div class="col d">${currentDay}</div>
                        `
                        currentDay++;
                    }
            }
            else{
                addHTML += `
                <div class="col d-g"></div>
                `
            }
        }
        element.innerHTML = addHTML
        containerEl.appendChild(element);
    }
}

function increaseMonth(){
    currentMonth++
    if(currentMonth > 12){
        currentYear++
        yearDisplayEl.textContent = `${currentYear}`
        currentMonth = 1
        create()
    }
    else{
        create()
    }
}
function decreaseMonth(){
    if(currentYear == minimumYear && currentMonth > minimumMonth )
    {
        currentMonth--
        create()
    }
    else if(currentYear > minimumYear && currentMonth == 1)
    {
        currentYear--
        yearDisplayEl.textContent = `${currentYear}`
        currentMonth = 12
        create()
    }
    else if(currentYear > minimumYear){
        currentMonth--
        create()
    }
}

function setDate(year, month, day){
    chosenEl.textContent = `${month}-${day}-${year}`
}