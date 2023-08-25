document.title = "FLORYPA";
const titulo = document.querySelector("h1 span"),
  tituloSecundario = document.querySelector("h2#secundario");

titulo.innerText = "FLORYPA";
tituloSecundario.innerText = "Bienvenido";

const btnSwal = document.getElementById("botonSwal"),
  btnToast = document.getElementById("botonToast"),
  horaActual = document.querySelector("#horaActual");

const creditCard = document.querySelector("#credit-card"),
  icons = document.querySelectorAll(".fa-brands");

btnSwal.addEventListener("click", () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
});

btnToast.addEventListener("click", () => {
  Toastify({
    text: "Producto agregado correctamente",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () { }, // Callback after click
  }).showToast();
});

const DateTime = luxon.DateTime;

const ahora = DateTime.now();


horaActual.value = ahora.toLocaleString(DateTime.TIME_SIMPLE);

const btnCalcular = document.querySelector("#calcular");
let dates = document.querySelectorAll('input[type="date"]');
let inicio = DateTime.now().toFormat("yyyy-MM-dd");
let fin = DateTime.now().plus({ months: 6 }).toFormat("yyyy-MM-dd");
dates.forEach((element) => {
  element.setAttribute("min", inicio);
  element.setAttribute("max", fin);
});

function calcularEstadia(checkIn, checkOut) {
  let total = checkOut.diff(checkIn);
  return total.as("days");
}

function calcularPrecioTotal(estadia, precio) {
  return estadia * precio;
}

btnCalcular.addEventListener("click", () => {
  let checkIn = DateTime.fromISO(document.getElementById("checkIn").value);
  let checkOut = DateTime.fromISO(document.getElementById("checkOut").value);

  let estadia = calcularEstadia(checkIn, checkOut);
  let precioTotal = calcularPrecioTotal(estadia, 7500);
  console.log(estadia);
  console.log(precioTotal);
  Swal.fire({
    title: "Resultado",
    text: `Tu estadía de ${estadia} días tiene un precio total de $${precioTotal}`,
    icon: "info",
    iconColor: "#00ff00",
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    position: "top-center",
    backdrop: "#445566aa",
  });
});
new Cleave("#card-number", {
  creditCard: true,
  onCreditCardTypeChanged: function (type) {
    console.log(type);
    switch (type) {
      case "visa":
        document.querySelector(".fa-cc-visa").classList.add("active");
        break;
      case "amex":
        document.querySelector(".fa-cc-amex").classList.add("active");
        break;
      case "diners":
        document.querySelector(".fa-cc-diners-club").classList.add("active");
        break;
      case "mastercard":
        document.querySelector(".fa-cc-mastercard").classList.add("active");
        break;
      default:
        if (type === "unknown") {
          icons.forEach((icon) => icon.classList.remove("active"));
        }
        break;
    }
  },
});
