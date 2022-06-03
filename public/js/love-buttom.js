const d = document;
const path = "https://boletin-leip.herokuapp.com/api/love/";

const incrementarContador = (tarea = "") => {
  const url = path + tarea;
  fetch(url, { method: "PUT" })
    .then((msg) => console.log(msg))
    .catch((error) => console.log(error));
};

const decrementarContador = (tarea = "") => {
  const url = path + tarea;
  fetch(url, { method: "DELETE" })
    .then((msg) => console.log(msg))
    .catch((error) => console.log(error));
};

d.addEventListener(
  "click",
  (el) => {
    const [, , elemento] = el.composedPath();
    if (elemento.classList.contains("love-buttom")) {
      const idLove = elemento.getAttribute("data-love");
      const corazon = d.getElementById(idLove);
      const tarea = elemento.id;

      const idContador = elemento.getAttribute("data-contador-love");
      const contador = d.getElementById(idContador);

      if (corazon.classList.contains("text-secondary")) {
        corazon.classList.replace("text-secondary", "text-danger");
        contador.innerText = Number(contador.innerText) + 1;
        localStorage.setItem(idLove, "true");
        incrementarContador(tarea);
      } else {
        corazon.classList.replace("text-danger", "text-secondary");
        contador.innerText = Number(contador.innerText) - 1;
        localStorage.setItem(idLove, "false");
        decrementarContador(tarea);
      }
    }
  },
  true
);



const loveButtoms = d.querySelectorAll(".love-buttom");

loveButtoms.forEach((love) => {
  const idLove = love.getAttribute("data-love");

  if (localStorage.getItem(idLove) === "true") {
    const corazon = d.getElementById(idLove);
    corazon.classList.replace("text-secondary", "text-danger");
  }
});




const actualizarContadores = (datos = []) => {
  datos.forEach((dato) => {
    const loveButtom = d.getElementById(dato.nombre);
    if (loveButtom) {
      const idContador = loveButtom.getAttribute("data-contador-love");
      const contador = d.getElementById(idContador);
      contador.textContent = dato.contador;
    }
  });
};

const cargarContadorLove = () => {
  fetch(path)
    .then((resp) => resp.json())
    .then((resp) => actualizarContadores(resp.data))
    .catch((error) => console.log(error));
};

cargarContadorLove();
