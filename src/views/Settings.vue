<template>
<div class="row">
    <div class="col-2 p-0">
    </div>
    <div class="col-7">
        <form class="d-flex flex-column">
        <label for="imgInput" class="form-label">Changer de photo de profil</label>
        <input type="file" id="imgInput" class="form-control" accept="image/png, image/jpeg" ref="imgfile">
        <button @click="uploadProfilePicture" class="btn btn-primary mt-3 align-self-end">Valider</button>
    </form>
    </div>
</div>
</template>

<script>
export default {
    name: "Settings",
    data(){
        return {
            
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
        }
    }
}
</script>

<style>

</style>