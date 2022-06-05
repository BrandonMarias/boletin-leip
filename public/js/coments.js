const nombre = d.getElementById("name");
const comentarios = d.getElementById("coments");
const comentario = d.getElementById("coment");
const comentariosDb = d.getElementById("coments-db");
const loading = d.getElementById("loading");

// const pathComent = "http://localhost:8087/api/coment";
const pathComent = "https://boletin-leip.herokuapp.com/api/coment";

const validarCampos = (...campos) => {
  campos.forEach((campo) => {
    if (!campo.value.trim()) return false;
  });
  return true;
};

const limpiarCampos = (...campos) => {
  campos.forEach((campo) => {
    campo.value = "";
  });
};

const crearComentarioEnviado = (coment) => {
  comentarios.innerHTML += `
  <div class="card mb-4">
                          <div class="card-header text-start text-bg">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                  class="bi bi-person-circle pe-2 " viewBox="0 0 16 16">
                                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                  <path fill-rule="evenodd"
                                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                              </svg>
                              ${coment.name}
                          </div>
                          <div class="card-body">
                              <p class="card-text text-start">${coment.coment}
                              </p>
                          </div>
                          <div class="card-footer text-muted d-flex justify-content-between align-items-center">
                              <div>${coment.date}</div>
                              <div class="love-buttom" data-love="love-buttom-${coment._id}" data-contador-love="contador-love-${coment._id}"
                                  id="${coment._id}">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                      class="bi bi-suit-heart-fill text-secondary mb-2" id="love-buttom-${coment._id}"
                                      viewBox="0 0 16 16">
                                      <path
                                          d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                                  </svg>
                                  <d class="h3 ps-5" id="contador-love-${coment._id}">0</d>
                              </div>
                          </div>
                      </div>
  `;
  loading.classList.add("d-none");
};

const enviarComentrios = (nombre, comentario) => {
  console.log(nombre, comentario);
  fetch(pathComent, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nombre.value,
      coment: comentario.value,
    }),
  })
    .then((resp) => resp.json())
    .then((resp) => crearComentarioEnviado(resp.newComent))
    .catch(console.warn());
};

d.addEventListener("submit", (el) => {
  el.preventDefault();

  if (validarCampos(comentario, nombre)) {
    loading.classList.remove("d-none");
    enviarComentrios(nombre, comentario);
    limpiarCampos(comentario, nombre);
  }
});

const actualizarComents = (coments = []) => {
  let htmlComents = "";
  coments.reverse();
  coments.forEach((coment) => {
    htmlComents += `
    <div class="card mb-4">
                            <div class="card-header text-start text-bg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    class="bi bi-person-circle pe-2 " viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fill-rule="evenodd"
                                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                                ${coment.name}
                            </div>
                            <div class="card-body">
                                <p class="card-text text-start">${coment.coment}
                                </p>
                            </div>
                            <div class="card-footer text-muted d-flex justify-content-between align-items-center">
                                <div>${coment.date}</div>
                                <div class="love-buttom" data-love="love-buttom-${coment._id}" data-contador-love="contador-love-${coment._id}"
                                    id="${coment._id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                        class="bi bi-suit-heart-fill text-secondary mb-2" id="love-buttom-${coment._id}"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                                    </svg>
                                    <d class="h3 ps-5" id="contador-love-${coment._id}">0</d>
                                </div>
                            </div>
                        </div>
    `;
  });

  comentariosDb.innerHTML = htmlComents;

  ////////
  cargarContadorLove();
};

const cargarComents = () => {
  fetch(pathComent)
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp.data);
      actualizarComents(resp.data);
    })
    .catch((error) => console.log(error));
};

cargarComents();
