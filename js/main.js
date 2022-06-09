const usermodal = document.getElementById("usermodal");
const btnGuardar = document.getElementById("btnGuardar");

function validarCampos(codalu, nomalu, apealu, edad) {
    //validar campos vacios
    if (codalu == "" || nomalu == "" || apealu == "" || edad == "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Los campo no pueden estar vacios!",
        });
        return false;
    }
    //validar edad
    if (edad < 0 || edad > 100) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Edad no permitida!",
        });
        return false;
    }
    //validar codigo
    if (codalu.length <= 3) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El codigo debe tener al menos 3 caracteres!",
        });
        return false;
    }
    //validar nombre
    if (nomalu.length < 3) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El nombre debe tener al menos 3 caracteres!",
        });
        return false;
    }
    //validar apellido
    if (apealu.length < 3) {
        Swal.fire({
            icon: "error",

            title: "Oops...",
            text: "El apellido debe tener al menos 3 caracteres!",
        });
        return false;
    }
    return true;
}

async function createUser() {
    const codalu = document.getElementById("codalu").value;
    const nomalu = document.getElementById("nomalu").value;
    const apealu = document.getElementById("apealu").value;
    const edad = document.getElementById("edad").value;

    if (validarCampos(codalu, nomalu, apealu, edad)) {
        const resp = await userPost(codalu, nomalu, apealu, edad);
        if (resp.ok) {
            Swal.fire({
                icon: "success",
                title: "Usuario creado!",
                showConfirmButton: false,
                timer: 1500,
            });
            ocultarModal("userCreateModal");
            loadTable();
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Hubo un error!",
            });
        }
    }
}

function ocultarModal(id) {
    const truck_modal = document.querySelector("#"+id);
    const modal = bootstrap.Modal.getInstance(truck_modal);
    modal.hide();
}
