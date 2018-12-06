export default context => {
    if (!context.store.getters.getLoggedUser)
        context.redirect({
            name: "login",
            query: {
                redirect: context.route.path
            }
        });
};
