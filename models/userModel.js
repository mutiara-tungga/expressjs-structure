var bookshelf = require('../bookshelf'),
    bcrypt = require('bcrypt');

var UserModel = bookshelf.Model.extend({
    tableName: 'users',
    initialize: function () {
        this.on('saving', this.assertEmailUnique); //sebelum melakukan saving melakukan assertEmailUnique
    },
    assertEmailUnique: function (model, attributes, options) {
        if (this.hasChanged('email')) { //bila ada perubahan pada email
            return Users
                .query('where', 'email', this.get('email'))
                // .fetch(_.pick(options || {}, 'transacting')) //transacting mksudnya adalah run query in transaction
                .fetch()
                .then(function (existingUser) {
                    if (existingUser) {
                        throw new Error('Email must unique');
                    }

                });
        }
    }
    //querying on this will constrain your query to the current record, you need to query from scratch, using plain User
});

hash = function (password) {
    return bcrypt.hashSync(password, 10);
}

exports.create = function (user, activationCode) {
    var data = {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        activation_code: activationCode
    }

    return new Promise(function (resolve, reject) {
        new UserModel(data)
            .save()
            .then(function (result) {
                resolve(result);
            }, function (error) {
                reject(error);
            })
    })
}

// exports.get = function (id, cb) {
//     db.fetch({ id: id }, function (err, docs) {
//         if (err) return cb(err)
//         cb(null, docs[0])
//     })
// }

// exports.authenticate = function (email, password) {
//     db.fetch({ email: email }, function (err, docs) {
//         if (err) return cb(err)
//         if (docs.length === 0) return cb()

//         user = docs[0]

//         if (user.password === hash(password)) {
//             cb(null, docs[0])
//         } else {
//             cb()
//         }
//     })
// }

exports.changePassword = function (id, password, cb) {
    db.update({ id: id }, { password: hash(password) }, function (err, affected) {
        if (err) return cb(err)
        cb(null, affected > 0)
    })
}