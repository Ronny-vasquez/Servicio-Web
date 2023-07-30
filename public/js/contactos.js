const contactForm = document.getElementById("contactForm");
const contactTable = document.getElementById("contactTable");
const filterInput = document.getElementById("filterInput");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const firstName = document.getElementById("nombre").value;
  const lastName = document.getElementById("apellido").value;
  const phone = document.getElementById("telefono").value;

  saveContact(firstName, lastName, phone);
});

function displayContacts(contacts) {
  contactTable.innerHTML = `
    <tr>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Teléfono</th>
    </tr>
  `;

  contacts.forEach((contact) => {
    const newRow = contactTable.insertRow(-1);
    const nameCell = newRow.insertCell(0);
    const lastNameCell = newRow.insertCell(1);
    const phoneCell = newRow.insertCell(2);
    nameCell.innerHTML = contact.nombre;
    lastNameCell.innerHTML = contact.apellido;
    phoneCell.innerHTML = contact.telefono;
  });
}

function getContacts() {
  fetch("http://www.raydelto.org/agenda.php")
    .then((response) => response.json())
    .then((data) => displayContacts(data))
    .catch((error) => console.error("Error al obtener los contactos:", error));
}

function saveContact(firstName, lastName, phone) {
  const newContact = {
    nombre: firstName,
    apellido: lastName,
    telefono: phone,
  };

  fetch("http://www.raydelto.org/agenda.php", {
    method: "POST",
    body: JSON.stringify(newContact),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.resultado === "OK") {
        getContacts();
        contactForm.reset();
      } else {
        console.error("Error al guardar el contacto:", data.mensaje);
      }
    })
    .catch((error) => console.error("Error al guardar el contacto:", error));
}

function handleFilterChange(event) {
  const { value } = event.target;

  fetch("http://www.raydelto.org/agenda.php")
    .then((response) => response.json())
    .then((data) => {
      const filtered = data.filter(
        (contact) =>
          contact.nombre.toLowerCase().includes(value.toLowerCase()) ||
          contact.apellido.toLowerCase().includes(value.toLowerCase()) ||
          contact.telefono.includes(value)
      );
      displayContacts(filtered);
    })
    .catch((error) => console.error("Error al obtener los contactos:", error));
}

filterInput.addEventListener("input", handleFilterChange);

getContacts();
