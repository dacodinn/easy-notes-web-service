const notesList=document.getElementById('notes-list');/* выбираем список заметок */
const dateInput=document.getElementById('note-date');/* поле даты */
const textInput=document.getElementById('note-text');/* поле текста */
const addButton=document.getElementById('add-note');/* кнопка добавления */
function generateId(){/* функция генерации id */
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`;/* создаем строку из времени и случайности */
}/* конец функции */
function createNotePayload(date,text){/* функция создания объекта заметки */
  return {id:generateId(),date,text};/* возвращаем готовый объект */
}/* конец функции */
const demoNotes=[/* массив демонстрационных заметок */
  createNotePayload('2025-11-01','напомнить себе про креативный разбор идей'),/* первая заметка */
  createNotePayload('2025-11-05','проверить сделано ли домашнее задание по английскому '),/* вторая заметка */
  createNotePayload('2025-11-10','подготовить речь для презентации')/* третья заметка */
];/* завершили массив */
function formatDate(dateStr){/* функция форматирования даты */
  if(!dateStr){/* проверяем пустую строку */
    return '??.??.??';/* возвращаем заглушку */
  }/* конец условия */
  const parts=dateStr.split('-');/* делим строку на части */
  if(parts.length!==3){/* проверяем корректность */
    return '??.??.??';/* возвращаем заглушку */
  }/* конец условия */
  const [year,month,day]=parts;/* достаем год месяц день */
  return `${day}.${month}.${year}`;/* собираем привычный формат */
}/* конец функции */
function renderNotes(){/* функция отрисовки */
  notesList.innerHTML='';/* очищаем список */
  if(demoNotes.length===0){/* проверяем пустоту */
    const empty=document.createElement('li');/* создаем элемент */
    empty.className='empty-state';/* назначаем класс */
    empty.textContent='здесь пока пусто';/* текст пустоты */
    notesList.appendChild(empty);/* добавляем элемент */
    return;/* прекращаем выполнение */
  }/* конец условия */
  demoNotes.forEach(note=>{/* перебираем заметки */
    const item=document.createElement('li');/* создаем элемент списка */
    item.className='note-card';/* присваиваем класс */
    const dateBlock=document.createElement('div');/* блок даты */
    dateBlock.className='note-date';/* класс блока даты */
    dateBlock.textContent=formatDate(note.date);/* вставляем дату */
    const textBlock=document.createElement('div');/* блок текста */
    textBlock.className='note-text';/* класс текста */
    textBlock.textContent=note.text;/* вставляем текст */
    const deleteButton=document.createElement('button');/* создаем кнопку удаления */
    deleteButton.className='delete-note';/* добавляем класс кнопке */
    deleteButton.setAttribute('type','button');/* делаем кнопку не сабмитом */
    deleteButton.textContent='×';/* ставим символ крестика */
    deleteButton.addEventListener('click',()=>deleteNote(note.id));/* навешиваем обработчик удаления */
    item.appendChild(dateBlock);/* добавляем дату внутрь */
    item.appendChild(textBlock);/* добавляем текст внутрь */
    item.appendChild(deleteButton);/* добавляем кнопку внутрь */
    notesList.appendChild(item);/* добавляем карточку в список */
  });/* завершаем перебор */
}/* конец функции */
function addNote(){/* функция добавления */
  const dateValue=dateInput.value||new Date().toISOString().slice(0,10);/* берем дату или сегодняшнюю */
  const textValue=textInput.value.trim();/* берем текст */
  if(!textValue){/* проверяем пустоту */
    textInput.focus();/* возвращаем фокус */
    return;/* прекращаем выполнение */
  }/* конец условия */
  demoNotes.unshift(createNotePayload(dateValue,textValue));/* добавляем заметку в начало */
  textInput.value='';/* очищаем текстовое поле */
  renderNotes();/* перерисовываем список */
}/* конец функции */
function deleteNote(id){/* функция удаления заметки */
  const index=demoNotes.findIndex(note=>note.id===id);/* ищем заметку по id */
  if(index===-1){/* проверяем найден ли индекс */
    return;/* прекращаем выполнение если нет */
  }/* конец условия */
  demoNotes.splice(index,1);/* удаляем заметку из массива */
  renderNotes();/* перерисовываем список после удаления */
}/* конец функции */
function setDefaultDate(){/* функция установки даты по умолчанию */
  const today=new Date().toISOString().slice(0,10);/* получаем текущую дату */
  dateInput.value=today;/* устанавливаем дату в поле */
}/* конец функции */
addButton.addEventListener('click',addNote);/* вешаем обработчик клика */
textInput.addEventListener('keydown',event=>{/* слушаем ввод в поле */
  if(event.key==='Enter'){/* проверяем клавишу */
    addNote();/* вызываем добавление */
  }/* конец условия */
});/* конец обработчика */
document.addEventListener('DOMContentLoaded',()=>{/* ждем загрузки документа */
  setDefaultDate();/* устанавливаем дату */
  renderNotes();/* рендерим список */
});/* конец обработчика */
