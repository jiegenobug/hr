const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    username: state => state.user.userInfo.username,
    userId: state => state.user.userInfo.Id
}
export default getters
