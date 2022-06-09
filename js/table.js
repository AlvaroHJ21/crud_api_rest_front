const loadTable = async () => {
    const data = await getData();
    console.log(data);

    let trHTML = "";
    let cont = 1;
    for (let object of data) {
        trHTML += `
        <tr>
            <td>${cont}</td>
            <td>${object["codalu"]}</td>
            <td>${object["nomalu"]}</td>
            <td>${object["apealu"]}</td>
            <td>${object["edad"]}</td>
            <td>
                <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#userUpdateModal" onclick="showUserEditBox('${object["id"]}')"><i class="fa-solid fa-pen-to-square"></i></button>
                <button type="button" class="btn btn-outline-danger" onclick="showUserDelete('${object["id"]}')"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>
        `;
        cont++;
    }
    document.getElementById("mytable").innerHTML = trHTML;
};

async function showUserDelete(id) {
    const result = await Swal.fire({
        title: "Estas seguro?",
        text: "Una vez eliminado no podras recuperarlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Si, eliminar!",
    });
    if (result.value) {
        const resp = await userDelete(id);
        if (resp.ok) {
            await loadTable();
            Swal.fire("Eliminado!", "Tu usuario ha sido eliminado.", "success");
        } else {
            Swal.fire("Error!", "No se pudo eliminar el usuario.", "error");
        }
    }
}

async function showUserEditBox(id) {
    const data = await getData();
    const user = data.find((user) => user.id == id);
    console.log(user);
    document.getElementById("codalu-2").value = user["codalu"];
    document.getElementById("nomalu-2").value = user["nomalu"];
    document.getElementById("apealu-2").value = user["apealu"];
    document.getElementById("edad-2").value = user["edad"];
    document
        .getElementById("btnActualizar")
        .setAttribute("onclick", `updateUser('${id}')`);
}

async function updateUser(id) {
    //obtener valores de los inputs que terminan en -2
    const codalu = document.getElementById("codalu-2").value;
    const nomalu = document.getElementById("nomalu-2").value;
    const apealu = document.getElementById("apealu-2").value;
    const edad = document.getElementById("edad-2").value;

    console.log("update user id: " + id);
    try {
        const result = await userPut(id, codalu, nomalu, apealu, edad);
        if (result.ok) {
            Swal.fire({
                icon: "success",
                title: "Usuario actualizado!",
                showConfirmButton: false,
                timer: 1500,
            });
            ocultarModal("userUpdateModal");
            loadTable();
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Hubo un error!",
            });
        }
    } catch (error) {
        console.log(error);
    }
}
loadTable();
