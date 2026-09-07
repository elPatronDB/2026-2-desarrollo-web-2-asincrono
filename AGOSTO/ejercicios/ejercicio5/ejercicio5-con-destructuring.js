
//Con Destructuring
const lenguajes = ["JavaScript", "Python", "TypeScript", "Java", "C#"];

const [primerLenguaje, segundoLenguaje, tercerLenguaje] = lenguajes;

console.log("Valores extraídos:", primerLenguaje, segundoLenguaje, tercerLenguaje);


const cliente = {
    id: 101,
    nombre: "Alejandro",
    apellido: "Pérez",
    email: "alejandro.perez@example.com",
    membresia: "Premium",
    pais: "México"
};

const { id, nombre, email } = cliente;

console.log("Valores extraídos:", id, nombre, email)

function mostrarResumenCliente({ nombre, apellido, membresia }) {
    console.log(`Cliente: ${nombre} ${apellido} | Membresía: ${membresia}`);
}

mostrarResumenCliente(cliente);
