//Sin Destructuring
const lenguajes = ["JavaScript", "Python", "TypeScript", "Java", "C#"];

const primerLenguaje = lenguajes[0];
const segundoLenguaje = lenguajes[1];
const tercerLenguaje = lenguajes[2];

console.log("Valores extraídos:", primerLenguaje, segundoLenguaje, tercerLenguaje);


const cliente = {
    id: 101,
    nombre: "Alejandro",
    apellido: "Pérez",
    email: "alejandro.perez@example.com",
    membresia: "Premium",
    pais: "México"
};

const id = cliente.id;
const nombre = cliente.nombre;
const email = cliente.email;

console.log("Valores extraídos:", id, nombre, email);
    
function mostrarResumenCliente(datosCliente) {
    const nombreCliente = datosCliente.nombre;
    const apellidoCliente = datosCliente.apellido;
    const membresiaCliente = datosCliente.membresia;
    
    console.log(`Cliente: ${nombreCliente} ${apellidoCliente} | Membresía: ${membresiaCliente}`);
}

mostrarResumenCliente(cliente);
