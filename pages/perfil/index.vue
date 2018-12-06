<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 lg6>
            <v-card class="v-layout-item v-size-50 v-small-size-100">
                <v-card-title primary-title>
                    <div class="headline">Meu Perfil</div>
                </v-card-title>
                <v-card-text>
                    <v-card flat tile class="d-flex">
                        <button @click="clickImage">
                            <v-img
                                :src="form.avatar"
                                :lazy-src="form.avatar"
                                aspect-ratio="1"
                                max-height="200"
                                contain
                            >
                                <v-layout
                                    slot="progress"
                                    fill-height
                                    align-center
                                    justify-center
                                    ma-0
                                >
                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                </v-layout>
                            </v-img>
                        </button>
                    </v-card>
                    <input ref="input" type="file" accept="image/*" @change="onFileChange">
                    <v-form ref="form" v-model="valid" lazy-validation @keyup.native.enter="submit">
                        <v-text-field
                            v-model.trim="form.nome"
                            :rules="rules.nomeRules"
                            label="Nome e Sobrenome"
                            required
                            counter="30"
                            prepend-icon="face"
                            type="text"
                            name="nome"
                            autocomplete="name"
                        />
                        <v-text-field
                            v-model.trim="form.telefone"
                            :rules="rules.telefoneRules"
                            label="Telefone"
                            required
                            prepend-icon="phone"
                            type="text"
                            name="telefone"
                            mask="(##) #####-####"
                            autocomplete="phone"
                            hint="Seu telefone só será visível para usuários autenticados"
                        />
                        <v-text-field
                            v-model.trim="form.email"
                            :rules="rules.emailRules"
                            label="E-mail"
                            name="email"
                            required
                            prepend-icon="mail"
                            type="email"
                            autocomplete="email"
                            disabled
                        />
                    </v-form>
                </v-card-text>
                <div class="progress">
                    <v-progress-linear v-model="progresso" v-if="submitted" height="12"></v-progress-linear>
                </div>
                <v-card-actions>
                    <v-btn
                        @click="submit"
                        flat
                        color="primary"
                        :disabled="!valid"
                        :loading="submitted"
                    >Editar</v-btn>
                    <v-spacer/>
                    <v-btn
                        @click="clear"
                        flat
                        color="secondary"
                        :disabled="submitted"
                    >Desfazer Alterações</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import needAuth from "~/middleware/needAuth";

export default {
    name: "Perfil",
    middleware: needAuth,

    created() {
        this.setForm();
    },

    data() {
        return {
            form: {
                avatar: "",
                nome: "",
                telefone: "",
                email: "",
                arquivo: null
            },
            rules: {
                nomeRules: [
                    v => !!v || "Nome é obrigatório",
                    v => (v && v.length >= 5) || "Nome está muito curto",
                    v => (v && v.length <= 30) || "Nome está muito longo"
                ],
                telefoneRules: [
                    v => !!v || "Telefone é obrigatório",
                    v =>
                        (v && v.length === 10) ||
                        v.length === 11 ||
                        "Telefone inválido"
                ]
            },
            valid: true,
            submitted: false
        };
    },

    computed: {
        user() {
            return this.$store.getters.getLoggedUser;
        },
        progresso() {
            return this.$store.getters.getProgresso;
        }
    },

    methods: {
        submit() {
            this.submitted = true;

            const nome = this.form.nome;
            const telefone = this.form.telefone;
            const avatar = this.form.arquivo; // IMPORTANTE!!!

            if (this.$refs.form.validate()) {
                this.$store
                    .dispatch("editProfile", { nome, telefone, avatar })
                    .catch(erro => {
                        this.submitted = false;
                        this.$store.dispatch("notificacao", {
                            tipo: "error",
                            mensagem:
                                "Erro ao atualizar perfil: (" +
                                erro.code +
                                ") " +
                                erro.message
                        });
                    });
            } else {
                this.submitted = false;
            }
        },

        clear() {
            this.$refs.form.resetValidation();
            this.setForm();
        },

        setForm() {
            this.form = {
                nome: this.user.nome,
                avatar: this.user.avatar,
                email: this.user.email,
                telefone: this.user.telefone
            };
        },

        clickImage() {
            this.$refs.input.click();
        },

        onFileChange(e) {
            const files = e.target.files;
            if (files[0] !== undefined) {
                let imageName = files[0].name;
                if (imageName.lastIndexOf(".") <= 0) return;

                const fr = new FileReader();
                fr.readAsDataURL(files[0]);
                fr.addEventListener("load", () => {
                    this.form.avatar = fr.result; // arquivo a ser mostrado
                    this.form.arquivo = files[0]; // arquivo a se fazer upload
                });
            } else {
                this.form.arquivo = null;
            }
        }
    }
};
</script>

<style scoped>
form {
    margin: 20px;
}

input[type="file"] {
    position: absolute;
    left: -99999px;
}

.progress {
    margin: 0 40px;
}
</style>
