import Bcrypt from 'bcrypt';

const AuthenticationConfig = {
    bcrypt: {
        saltWorkFactor: 10
    }
};

const HashPassword = (password: any) => {

    return new Promise((resolve, reject) => {

        Bcrypt.hash(password, AuthenticationConfig.bcrypt.saltWorkFactor, (err, hash) => {

            if (err) {
                return reject(err);
            }
            return resolve(hash);
        });

    });
};

const CompareHashPassword = (candidatePassword: any, hash: any) => {

    return new Promise((resolve, reject) => {

        Bcrypt.compare(candidatePassword, hash, (err, isMatch) => {

            if (err) {
                return reject(err);
            }
            return resolve(isMatch);
        });
    });
};

export { HashPassword, CompareHashPassword };