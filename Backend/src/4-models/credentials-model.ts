class CredentialsModel {

    public username: string;
    public password: string;

    public constructor(user: CredentialsModel) {
        this.username = user.username;
        this.password = user.password;
    }




}

export default CredentialsModel;