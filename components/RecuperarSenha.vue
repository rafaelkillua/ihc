<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-btn slot="activator" color="secondary" flat outline>Recuperar senha</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">Recuperar Senha</span>
                </v-card-title>
                <div v-if="!finished">
                    <v-card-text>
                        <v-flex xs12>
                            <v-text-field v-model="email" label="Email*" required></v-text-field>
                        </v-flex>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat outline @click="fecharDialog">Fechar</v-btn>
                        <v-btn
                            color="primary"
                            @click="recuperarSenha"
                            :loading="submitted"
                        >Recuperar</v-btn>
                    </v-card-actions>
                </div>
                <div v-else>
                    <v-card-text>
                        <v-flex xs12>Um link para gerar uma nova senha foi enviada para seu e-mail!</v-flex>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat outline @click="fecharDialog">Fechar</v-btn>
                    </v-card-actions>
                </div>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            dialog: false,
            submitted: false,
            finished: false
        };
    },
    methods: {
        fecharDialog() {
            this.dialog = false;
            this.submitted = false;
        },
        recuperarSenha() {
            this.submitted = true;
            this.$store
                .dispatch("recuperarEmail", this.email)
                .then(() => {
                    this.finished = true;
                    this.email = "";
                    return this.dispatch("notificacao", {
                        tipo: "success",
                        mensagem: "E-mail enviado com sucesso!"
                    });
                })
                .catch(erro => {
                    this.submitted = false;
                    return this.dispatch("notificacao", {
                        tipo: "error",
                        mensagem:
                            "Erro ao recuperar e-mail: (" +
                            erro.code +
                            ") " +
                            erro.message
                    });
                });
        }
    }
};
</script>

<style scoped>
v-text-field {
    margin: 20px;
}
</style>
