const columns = document.querySelectorAll('.column');
let dragged = null;

document.addEventListener('dragstart', e => {
  if (e.target.classList.contains('task')) {
    dragged = e.target;
  }
});

document.addEventListener('dragover', e => {
  if (e.target.classList.contains('column')) {
    e.preventDefault();
  }
});

document.addEventListener('drop', e => {
  if (e.target.classList.contains('column')) {
    e.preventDefault();
    e.target.insertBefore(dragged, e.target.querySelector('.add-task'));
  }
});

document.querySelectorAll('.add-task').forEach(input => {
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter' && input.value.trim()) {
      const task = document.createElement('div');
      task.className = 'task';
      task.draggable = true;
      task.textContent = input.value.trim();
      input.parentElement.insertBefore(task, input);
      input.value = '';
    }
  });
});