<template>
    <v-snackbar :value="show" :bottom="true" :color="erro ? 'error' : 'success'">
        <v-icon left color="white">{{erro ? "error" : "check"}}</v-icon>
        {{ mensagem }}
    </v-snackbar>
</template>

<script>
export default {
    data: () => ({
        show: false,
        erro: false,
        mensagem: null
    })
};
</script>
