<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
            <v-card class="v-layout-item v-size-50 v-small-size-100">
                <v-card-title primary-title>
                    <div class="headline">Cadastro</div>
                </v-card-title>
                <v-card-text>
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
                        />
                        <v-text-field
                            v-model.trim="form.senha"
                            :rules="rules.senhaRules"
                            label="Senha"
                            name="senha"
                            required
                            prepend-icon="lock"
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                            @click:append="showPassword = !showPassword"
                        />
                        <v-text-field
                            v-model.trim="form.repetirSenha"
                            :rules="rules.repetirSenhaRules"
                            :error-messages="confirmaSenha()"
                            label="Repetir senha"
                            name="repetirSenha"
                            required
                            prepend-icon="lock"
                            :type="showPassword ? 'text' : 'password'"
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        @click="submit"
                        flat
                        outline
                        color="primary"
                        :disabled="!valid"
                        :loading="submitted"
                    >Cadastrar</v-btn>
                    <v-spacer/>
                    <v-btn
                        to="/login"
                        nuxt
                        flat
                        outline
                        color="info"
                        :disabled="submitted"
                    >Faça Login</v-btn>
                    <v-spacer/>
                    <v-btn
                        @click="clear"
                        flat
                        outline
                        color="secondary"
                        :disabled="submitted"
                    >Resetar</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import needAnonymous from "~/middleware/needAnonymous";

export default {
    name: "Cadastro",
    middleware: needAnonymous,

    data() {
        return {
            form: {
                nome: "",
                telefone: "",
                email: "",
                senha: "",
                repetirSenha: ""
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
                ],
                emailRules: [
                    v => !!v || "E-mail é obrigatório",
                    v =>
                        (v &&
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                v
                            )) ||
                        "E-mail tem que ser válido"
                ],
                senhaRules: [
                    v => !!v || "Senha é obrigatória",
                    v =>
                        (v && v.length >= 8) ||
                        "Senha deve ter mais de 8 caracteres",
                    v =>
                        (v && v.length <= 20) ||
                        "Senha deve ter menos de 20 caracteres"
                ],
                repetirSenhaRules: [v => !!v || "Repetir senha é obrigatório"]
            },
            valid: true,
            showPassword: false,
            submitted: false
        };
    },

    computed: {
        user() {
            return !!this.$store.getters.getLoggedUser;
        }
    },

    methods: {
        confirmaSenha() {
            return this.form.repetirSenha === this.form.senha
                ? ""
                : "As senhas devem ser iguais";
        },
        submit() {
            this.submitted = true;

            const email = this.form.email;
            const senha = this.form.senha;
            const nome = this.form.nome;
            const telefone = this.form.telefone;

            if (this.$refs.form.validate()) {
                this.$store
                    .dispatch("signUp", { email, senha, nome, telefone })
                    .catch(erro => {
                        this.submitted = false;
                        this.$store.dispatch("notificacao", {
                            tipo: "error",
                            mensagem:
                                "Erro ao criar usuário: (" +
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
            this.$refs.form.reset();
        }
    }
};
</script>

<style scoped>
form {
    margin: 20px;
}
</style>
