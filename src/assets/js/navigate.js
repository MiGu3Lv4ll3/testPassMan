var accountList = document.querySelector('#accounts'),
    accountInfo = document.querySelector('#information'),
    accountForm = document.querySelector('#form'),
    search = document.querySelector('#search'),
    back = document.querySelector('#back')

function navigateTo(section){
    switch (section) {
        case "accounts":
            accountList.removeAttribute('hidden')
            accountInfo.setAttribute('hidden', true)
            accountForm.setAttribute('hidden', true)
            back.setAttribute('hidden', true)
            search.removeAttribute('hidden')
            break;
    
        case "information":
            accountList.setAttribute('hidden', true)
            accountInfo.removeAttribute('hidden')
            accountForm.setAttribute('hidden', true)
            back.removeAttribute('hidden')
            search.setAttribute('hidden', true)
            break;

        case "form":
            accountList.setAttribute('hidden', true)
            accountInfo.setAttribute('hidden', true)
            accountForm.removeAttribute('hidden')
            back.removeAttribute('hidden')
            search.setAttribute('hidden', true)
            break;
    }
}

document.querySelector("#accountsList").addEventListener("click", (event)=>{
    let elementClasses = event.target.classList.value.split(" ")
    let verifyClass = elementClasses.includes("add-fav") 
    if (!verifyClass) {
        return
    }
    event.target.classList.toggle("favorite")
})