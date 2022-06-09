const baseUrl = "http://127.0.0.1:8080"

//GET ALL USERS
const getData = async () => {
    try {
        const resp = await fetch("http://127.0.0.1:8080/api/users");
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//DELETE USER
const userDelete = async (id) => {
    console.log("eliminar usuario con el id: " + id);
    try {
        const resp = await fetch("http://127.0.0.1:8080/api/users/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return resp;
    } catch (error) {
        console.log(error);
    }
};

//POST USER
const userPost = async (codalu, nomalu, apealu, edad) => {
    try {
        const resp = await fetch("http://127.0.0.1:8080/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: uuid.v4(),
                codalu,
                nomalu,
                apealu,
                edad,
            }),
        });
        return resp;
    } catch (error) {
        console.log(error);
    }
};

//PUT USER
const userPut = async (id, codalu, nomalu, apealu, edad) => {
    try {
        const resp = await fetch("http://127.0.0.1:8080/api/users/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                codalu,
                nomalu,
                apealu,
                edad,
            }),
        });

        return resp;
    } catch (error) {
        console.log(error);
    }
};
