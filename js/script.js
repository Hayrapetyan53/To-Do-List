//Add task
function addTask(){
  let task = document.getElementById('inp').value

  if(task === ''){
    alert('Input field required!!')
    return
  }

  let id = 1

  if(localStorage.getItem('id') != null){
    id = +localStorage.getItem('id') + 1
  }

  localStorage.setItem(`task_${id}`, task)
  localStorage.setItem(`id`, id)

  document.getElementById('inp').value = ''
  showTask()
}

//Show task
function showTask(){
  let id = localStorage.getItem('id')
  let taskList = document.getElementById('u')
  taskList.innerHTML = ''
  
  for(let i = 1; i <= id; i++){
    let done = ''
    let task = localStorage.getItem(`task_${i}`)
    if(localStorage.getItem(`done_${i}`) != null){
      done = 'l'
    }

    if(task != null){
      taskList.innerHTML += `
        <li class="${done}">
          <span onclick="doneTask(this, ${i})" class="text">${task}</span>
          <span class="close" onclick="removeTask(${i})">x</span>
        </li>
      `
    }

  }
}

//Done task
function doneTask(item, id){
  localStorage.setItem(`done_${id}`, id)
  item.parentElement.classList.toggle('l')

  if(item.parentElement.classList.contains('l') === false){
    localStorage.removeItem(`done_${id}`)
    item.parentElement.classList.remove('l')
  }

}

//Remove task
function removeTask(id){
  localStorage.removeItem(`task_${id}`)

  if(localStorage.length === 1){
    localStorage.removeItem('id')
  }

  localStorage.removeItem(`done_${id}`)
  
  showTask()
}

showTask()