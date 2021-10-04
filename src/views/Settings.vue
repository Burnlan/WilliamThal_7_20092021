<template>
<div class="row">
    <div class="col-md-2 p-0">
    </div>
    <div class="col-md-7">
        <h1>Gérez votre profile</h1>
        <form class="d-flex flex-column">
            <label for="imgInput" class="form-label">Changer de photo de profil</label>
            <input type="file" id="imgInput" class="form-control" accept="image/png, image/jpeg" ref="imgfile">
            <button @click="uploadProfilePicture" class="btn btn-primary mt-3 align-self-end">Valider</button>
        </form>
        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Supprimer mon compte</button>
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-body">
                <p>Attention, cette action est irréversible !</p>
                <p>Souhaitez-vous vraiment supprimer votre compte ?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Non</button>
                <button @click="deleteAccount" type="button" class="btn btn-danger">Supprimer mon compte</button>
            </div>
            </div>
        </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Settings",
    data(){
        return {
            deleteModal: false
        }
    },
    methods: {
        //function to upload a profile picture
        async uploadProfilePicture(e) {
            e.preventDefault();
            //we get the file
            let picture = this.$refs.imgfile.files[0];
            ///we send the file using formdata with key value of "image" as set in multer
            let formData = new FormData();
            formData.append("image", picture);
            let response = await fetch("http://localhost:3000/api/updateprofilepicture", {
                method: "POST",
                credentials: 'include',
                //Sends the data in json format
                body: formData
            })
            if(response.ok){
                let data = await response.json();
                console.log(data);
            }
        },
        async deleteAccount() {
            let response = await fetch("http://localhost:3000/api/delete", {
                method: "GET",
                credentials: 'include'
            })   
            if(response.ok) {
                //if the profile was deleted we redirect to the connection screen
                this.$router.push('Connection');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
h1 {
    font-size: 2rem;
}
</style>