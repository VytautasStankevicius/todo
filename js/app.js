
const addTask = (taskData, index) => {
  const taskID = allTasks.length;
  const tr = document.createElement('tr');
  tr.setAttribute('id', taskID);

  const tdCheckbox = document.createElement('td');
  const checkboxImg = document.createElement('img');

  if (taskData.isChecked) {
    checkboxImg.src = 'img/check.png';
  } else {
    checkboxImg.src = 'img/not-check.png';
  }

  checkboxImg.addEventListener('click', () => {
    taskData.isChecked = !taskData.isChecked;
    updateTask(taskData, index);
  })
  tdCheckbox.appendChild(checkboxImg)
  
  tr.appendChild(tdCheckbox);

  const tdSubject = document.createElement('td');
  tdSubject.innerText = taskData.subject;
  if (taskData.isChecked) {
    tdSubject.className = 'crossed'
  }
  tr.appendChild(tdSubject);

  const tdPriority = document.createElement('td');
  tdPriority.innerText = taskData.priority; // High, Medium, Low
  tdPriority.classList.add('priority', taskData.priority.toLowerCase());
  tr.appendChild(tdPriority);

  const tdDate = document.createElement('td');
  tdDate.innerText = taskData.date;
  tr.appendChild(tdDate);
// ---------------------------------------------------
  const tdStatus = document.createElement('td');
  tdStatus.innerText = taskData.status;
  tr.appendChild(tdStatus);

  // <input type="range" min="1" max="100" value="50">
  // https://www.w3schools.com/howto/howto_js_rangeslider.asp
  const tdPercent = document.createElement('td');
  const tdPercentSlider = document.createElement('input');
  tdPercentSlider.setAttribute('type', 'range');
  tdPercentSlider.setAttribute('min', 0);
  tdPercentSlider.setAttribute('max', 100);
  tdPercentSlider.setAttribute('value', taskData.percent);
  tdPercentSlider.addEventListener('change', (event) => {
    taskData.percent = event.target.valueAsNumber;
    if (taskData.percent === 100) {
      taskData.status = 'Complete'
    }
    if (taskData.percent === 0) {
      taskData.status = 'New'
    }
    if (taskData.percent > 0 && taskData.percent < 100) {
      taskData.status = 'In progress'
    }
    updateTask(taskData, index)
  });
  
  tdPercent.appendChild(tdPercentSlider);
  tr.appendChild(tdPercent);

  const tdModified = document.createElement('td');
  tdModified.innerText = taskData.modified;
  tr.appendChild(tdModified);

  const tdDelete = document.createElement('td');
  const tdDeleteBtn = document.createElement('button');
  tdDeleteBtn.innerText = 'Delete task';
  tdDeleteBtn.addEventListener('click', () => {
    deleteTask(index);
  })
  tdDeleteBtn.className = 'deleteButton'
  tdDelete.appendChild(tdDeleteBtn);
  tr.appendChild(tdDelete);
// ------------------------------------------------------
  const tableBody = document.getElementById('table-body');
  tableBody.appendChild(tr);
}

const deleteTask = (index) => {
  allTasks.splice(index, 1);
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
  window.location.reload();
}

const updateTask = (taskData, index) => {
  taskData.modified = new Date().toLocaleString();
  allTasks[index] = taskData;
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
  window.location.reload();
}

// new Date().toLocaleString()

document.getElementById('task-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const subject = document.getElementById('taskSubject');
  const priority = document.getElementById('taskPriority');
  const date = document.getElementById('taskDate');

  if (!subject || !priority || !date) {
    return;
  }

  const newTask = {
    isChecked: false,
    subject: subject.value,
    priority: priority.options[priority.selectedIndex].text,
    date: date.value,
    status: 'New',
    percent: 0,
    modified: ''
    // https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript
  };
  // addTask(newTask);

  allTasks.push(newTask);
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
  window.location.reload();
});

const lsTasks = localStorage.getItem('allTasks');
let allTasks = [];

if (lsTasks) {
  allTasks = JSON.parse(lsTasks);
}

allTasks.forEach((task, index) => {
  addTask(task, index);
});
