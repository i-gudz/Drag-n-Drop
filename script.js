let listElement = document.querySelector('.tasks_list')
let taskElement = listElement.querySelectorAll('.task')

taskElement.forEach((task) => {
    task.draggable = true
    task.addEventListener('dragstart',()=>{
        task.classList.add('selected')
    })
    task.addEventListener('dragend',()=>{
        task.classList.remove('selected')
    })
})

function getNextElement(cursorPosition, currentElement){
    let currentElemenCoord = currentElement.getBoundingClientRect()
    let currentElementCenter = currentElemenCoord.y + currentElemenCoord.height/2
    let nextElement = (cursorPosition<currentElementCenter)?currentElement:currentElement.nextElementSibling
    return nextElement
}


listElement.addEventListener('dragover', (e) => {
    e.preventDefault()

    let activeElement = listElement.querySelector('.selected')
    let currentElement = e.target
    let isMoveable = activeElement !== currentElement && currentElement.classList.contains('task')
    
    if (!isMoveable) {
        return
    }

    let nextElement = getNextElement(e.clientY, currentElement)

    if(nextElement && 
        activeElement === nextElement.previousElementSibling || 
        activeElement === nextElement)
        {
        return
    }

    listElement.insertBefore(activeElement, nextElement)
})