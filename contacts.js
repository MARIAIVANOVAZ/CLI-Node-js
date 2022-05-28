const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, 'utf8');
  const data = JSON.parse(contacts);
  console.table(data);
  return data;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();

  const contact = allContacts.find(contact => contact.id === contactId);
  console.log(contact);
  return contact ? contact : null;
}

async function addContact(name, email, phone) {
  const newContact = {
    id: uuid.v4(),
    name: name,
    email: email,

    phone: phone,
  };
  console.log(newContact);
  const allContacts = await listContacts();
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contactId === contact.id);
  const deletedContact = allContacts[index];
  if (index !== -1) {
    allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  }
  console.log(deletedContact);
  return deletedContact ? deletedContact : null;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
