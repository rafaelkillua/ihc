export default context => {
    if (context.store.getters.getLoggedUser) context.redirect("/");
};
