const graphql = require('graphql');
const _ = require('lodash');
const userScheme = require('../models/UserSchema');
const Owner = require('../models/OwnerSchema');
var mongoose = require("mongoose");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

var TODO = mongoose.model('Todo', {
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    completed: Boolean
})


// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

var users = [
];

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        email_id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        password: { type: GraphQLString }
    })
});


const BuyerType = new GraphQLObjectType({
    name: 'buyer',
    fields: () => ({
        email_id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        rest_name: { type: GraphQLString },
        phone: { type: GraphQLString },
        rest_zip: { type: GraphQLString }
    })
});

const ItemType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        email_id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        password: { type: GraphQLString }
    })
});

const SectionType = new GraphQLObjectType({
    name: 'Section',
    fields: () => ({
        section_name: { type: GraphQLString }
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});



const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        },
        user: {
            type: UserType,
            args: { email_id: { type: GraphQLString }, password: { type: GraphQLString } },
            resolve(parent, args) {

                return new Promise((resolve, reject) => {
                    User.find({ email_id: args.email_id, password: args.password })
                        .then(user => {
                            let response = null;
                            console.log("found", JSON.stringify(user));
                            if (user.length === 0) {
                                reject("not found");
                            } else {
                                const retUser = { email_id: user[0].email_id, first_name: user[0].first_name, last_name: user[0].last_name }
                                console.log("found", retUser);
                                resolve(retUser);
                            }

                        });
                })
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return users;
            }
        },
        buyers: {
            type: new GraphQLList(BuyerType),
            resolve(parent, args) {
                return buyers;
            }
        },
        buyer: {
            type: BuyerType,
            args: { email_id: { type: GraphQLString }, password: { type: GraphQLString } },
            resolve(parent, args) {

                return new Promise((resolve, reject) => {
                    Owner.find({ email_id: args.email_id, password: args.password })
                        .then(owner => {
                            let response = null;
                            console.log("found", JSON.stringify(owner));
                            if (owner.length === 0) {
                                reject("not found");
                            } else {
                                const retOwner = { email_id: owner[0].email_id, first_name: owner[0].first_name, rest_name: owner[0].resturant_name }
                                console.log("found 123", retOwner);
                                resolve(retOwner);
                            }

                        });
                })
            }
        },
        getBuyer: {
            type: BuyerType,
            args: { email_id: { type: GraphQLString } },
            resolve(parent, args) {

                return new Promise((resolve, reject) => {
                    Owner.find({ email_id: args.email_id })
                        .then(owner => {
                            let response = null;
                            console.log("found", JSON.stringify(owner));
                            if (owner.length === 0) {
                                reject("not found");
                            } else {
                                const retOwner = { email_id: owner[0].email_id, first_name: owner[0].first_name, rest_name: owner[0].resturant_name, rest_zip: owner[0].resturant_zipcode, phone_num: owner[0].phone_num, last_name: owner[0].last_name, profile_image: user[0].profile_image }
                                console.log("found123", retOwner);
                                resolve(retOwner);
                            }

                        });
                })
            }
        },
        getUser: {
            type: UserType,
            args: { email_id: { type: GraphQLString } },
            resolve(parent, args) {

                return new Promise((resolve, reject) => {
                    User.find({ email_id: args.email_id })
                        .then(user => {
                            let response = null;
                            console.log("found", JSON.stringify(user));
                            if (user.length === 0) {
                                reject("not found");
                            } else {
                                const retUser = { email_id: user[0].email_id, first_name: user[0].first_name, last_name: user[0].last_name, phone_num: user[0].phone_num, profile_image: user[0].profile_image }
                                console.log("found 123", retUser);
                                resolve(retUser);
                            }

                        });
                })
            }
        },
        sections: {
            type: new GraphQLList(SectionType),
            resolve(parent, args) {
                return sections;
            }
        },
        section: {
            type: SectionType,
            args: { section_name: { type: GraphQLString }, email_id: { type: GraphQLString } },
            resolve(parent, args) {

                return new Promise((resolve, reject) => {
                    Owner.find({ "sections.$.section_name": args.section_name, email_id: args.email_id })
                        .then(section => {
                            let response = null;
                            console.log("found", JSON.stringify(section));
                            if (section.length === 0) {
                                reject("not found");
                            } else {
                                const resSection = { email_id: section[0].email_id, first_name: section[0].first_name, rest_name: section[0].resturant_name }
                                console.log("found 123", resSection);
                                resolve(resSection);
                            }

                        });
                })
            }
        },
    }
});

var count = 10;
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                let author = {
                    name: args.name,
                    age: args.age,
                    id: args.id
                };
                authors.push(author)
                console.log("Authors", authors);
                return author;
            }
        },

        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID },
            },
            resolve(parent, args) {
                let book = {
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                    id: count++
                }
                books.push(book);
                return book;
            }
        },

        addUser: {
            type: UserType,
            args: {
                email_id: { type: GraphQLString },
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args) {

                const user = {
                    email_id: args.email_id,
                    first_name: args.first_name,
                    last_name: args.last_name,
                    password: args.password
                }
                const newUser = new User({
                    first_name: args.first_name,
                    last_name: args.last_name,
                    email_id: args.email_id,
                    password: args.password
                });
                return new Promise((resolve, reject) => {
                    newUser.save((err, user) => {
                        let resp = null;
                        if (err) reject(err)
                        else {
                            resolve(user)
                        }

                    })
                })
            }
        },
        addBuyer: {
            type: BuyerType,
            args: {
                email_id: { type: GraphQLString },
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                rest_zip: { type: GraphQLString },
                rest_name: { type: GraphQLString },
                phone: { type: GraphQLString }
            },
            resolve(parent, args) {

                const owner = new Owner({
                    first_name: args.first_name,
                    last_name: args.last_name,
                    email_id: args.email_id,
                    resturant_zipcode: args.rest_zip,
                    resturant_name: args.rest_name,
                    phone: args.phone,
                    password: args.email_id
                });
                return new Promise((resolve, reject) => {
                    owner.save((err, user) => {
                        let resp = null;
                        if (err) reject(err)
                        else {
                            resolve(owner)
                        }
                    })
                })
            }
        },
        addSection: {
            type: SectionType,
            args: {
                section_name: { type: GraphQLString }, email_id: { type: GraphQLString }
            },
            resolve(parent, args) {
                const sec = new Owner({
                    section_name: msg.body.section_name
                });
                return new Promise((resolve, reject) => {
                    Owner.findOneAndUpdate(
                        { email_id: email_id },
                        {
                            $push: {
                                sections: { section_name: msg.body.section_name }
                            }
                        },
                        { upsert: true }
                    )
                })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});