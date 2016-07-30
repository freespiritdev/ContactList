'use strict'

$(() => {
  let contacts = contactsFromStorage();
  let $lis = contacts.map(contact => createLi(contact));
  $('#contactList').append($lis);

  $('#contactList').on('dblclick', 'li', removeContact);
  $('#contactList').on('click', 'button.edit', openEditModal);
  $
  ('#editContactForm').submit(saveUpdate); 
  $('#contactForm').submit(addContact);

});

function saveUpdate(){
  let index = $('#contactEditModal').data('index');
  let newContact = $('editContact').val();
}

function editContact(){
  
}

function openEditModal(){
  let index = $(this).parent().index();
  let contact = $(this).siblings('span').text();

  $('#editContact').val(contact);
  $('#contactEditModal').data('index', index);
  $('#contactEditModal').modal();
}
function removeContact(){
  let index = $(this).index();
  removeFromStorage(index);
  $(this).remove();
}

function removeFromStorage(index){
  let contacts = contactsFromStorage();
  contacts.splice(index, 1);
  writeToStorage(contacts);
}

function addContact(e){
  e.preventDefault();

  let firstName = $('#firstName').val();
  let lastName = $('#lastName').val();
  let phone = $('#phone').val();
  let email = $('#email').val();

  // let contact = firstName + ' ' + lastName + ' ' + email;
  let contact = $('#firstName').val() + " " + $('#lastName').val() + " " + $('#phone').val() + " " + $('#email').val();

  $('#firstName').val('');
  $('#lastName').val('');
   $('#phone').val('');
  $('#email').val('');

  let $li = createLi(contact);
  $('#contactList').append($li);
  addToStorage(contact);
}

function createLi(contact){
  let $li = $('#template').clone();
  $li.removeAttr('id');
  $li.children('.contact').text(contact);
  return $li;
}


function addToStorage(contact){
  let contacts = contactsFromStorage();

  contacts.push(contact);

  writeToStorage(contacts);
}

function writeToStorage(contacts){
  localStorage.contacts = JSON.stringify(contacts);
}

function contactsFromStorage(){
  let json = localStorage.contacts;
  let contacts;

  try{
    contacts = JSON.parse(json);
  }catch(event){
    contacts = [];
  }
  return contacts;
}