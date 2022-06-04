const nombre = d.getElementById("name");
const comentario = d.getElementById("coments");
const comentarios = d.getElementById("coments")
const comentariosDb = d.getElementById("coments-db")
const loading = d.getElementById("loading");

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

d.addEventListener("submit", (el) => {
  el.preventDefault();

  if (validarCampos(comentario, nombre)) {
    console.log(comentario.value, nombre.value);
    limpiarCampos(comentario, nombre);
    loading.classList.remove("d-none")
  }
});
