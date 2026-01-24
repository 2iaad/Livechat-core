/**
 * { timestamps: true }: This automatically adds two fields to every document:
 *       {
 *          "createdAt": "2025-01-01T10:00:00Z",
 *          "updatedAt": "2025-01-01T10:05:00Z"
 *       }
 */

import mongoose from "mongoose";

export const staticImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0QDRANDw0ODQ0NDQ0NDQ4NDRAODw8NFREWFhURExUYHSggGBolGxUTITEhJSkrLi4uFx8zODMsNyg5LjcBCgoKDg0OFQ8QFSsZFRktKzcrKysrLSsrKy0rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrLSsrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUCAwQGB//EADIQAQACAAMFBQcEAwEAAAAAAAABAgMEEQUhMUFREmFxgZEiMjOCobHRI0JSwWJy8BP/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAgED/8QAGREBAQEBAQEAAAAAAAAAAAAAAAEREjEC/9oADAMBAAIRAxEAPwD6YAtyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABLZXL4k8KW9JGtY2zl8SONLektUx13eIIEgxAAAAAAAAAAAAAAAAAAAAAJgB25TZ82jtW1rHTnLPZ2U1j/0tH+sT91nCbVyNeFgUr7tYjv03+rYkYpDDEwa296InxbAFXmdnab6TM/4yr5h6RX7RymsTevGOMdYVKmxVoShqQAYAAAAAAAAAAAAAAAANuWwu3eK8p4+DW79kU32t0iIgrYs4jSNI4QyBDoAAAAImEgKPP4PYxJ5RO+HMtdr03Vt0nRVKjnQBrAAAAAAAAAAAAAAAAErPZHC3jH2Vjv2TfS016xrHky+Ki1EJSsAAAAABxbV+H80KdZ7XxN1a9+qsVEfXoA1IAAAAAAAAAAAAAAACWeDiTW0W6Tr4taYB6LDvFoi0b4mNYZKjZ+b7E9m3uzw7pW1ZRXSVIA0AARM/TiTKs2jm9f06zu/dMfaG4y1y5vG7d5ty4R4NJqKQgAYAAAAAAAAAAAAAAAAJQAl05bOXpu416S5Qbq7ws9h259mekuiLRymPJ5xOs9ZZjenoptEcZiGjGzuHXnrPSN6km09Z9Qw6deaz1rbo9mvPrLkBrBADAAAAAAAAAAAAAAAAAAaDPDpa06VjWe53YGzed507o/JpIr9G2mVxLcKz9l1hZeleFYjv5trNVyp67NxOfZjz1Zxsu3849FqM1vMVU7Lt/OPRhbZuJHCYn6LgNOYob5XErxpPlvaZjru8XpGrEwKW41ifI1nLz4s8bZnOk6d0/lX4mHas6WiYn/uDdTjABrAAAAAAAAAAAAAAaOvKZK198+zXrznwbcjktfbtG7lXr4rSIZaqRhg4VaxpWNIbASoAAAAAAAAYYmHFo0tETDMBT5vIzXW1dbV+sfmHE9KrM9kv30jvmv8AcNlTYrQFIAAAAAAAAASA69n5Xtz2p92s+sufCw5taKxxn6d6+wcOK1iscIjRlqpGUJBKwAAAAAAAAAAAAAFTtHK9n26x7M8Y6S4Ho70iYmJjWJjSVDmMGaXms8uHfCpUfUagGpAAAAAAATALLZWDxxOu6P7lZNWXp2aVjpDaiukABoAAAAAAAAAAAAAA4Nq4OtYvHGvHwd7DEprEx1iYCvOjK8aTp0mY9GK3IAAAAAAbctTW9Y74anTs+P1a+cjYu0kCHQAAAAAAAAAAAAAAAABAKPPV0xbR36ud2bVj9X5Yca4530AGAAAADq2d8WPCQGxdgIdAAAAAAAAAAAAAAAABAAqNq/E+WHEC4530AGAAP//Z"

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePicture: {
            type: String,
            default: staticImage
        },
    },
    { timestamps: true }
)

/**
 * @param "User" name of the model to create, better to be UpperCase + singular.
 * @param "userSchema" name of schema
 * 
 * 
 *  A model is an object returned by mongoose.model("User", userSchema)
 *  it contains the schema + built in methods to manipulate the data the lives inside the mongoDB collection(MongoDB collection group of related documents stored inside a database)
 *  A model is just a gateway to database, it does not contain the data, data lifes in mongodb.
 * 
            MongoDB Server
            │
            └── Database
                │
                ├── users (collection)                                          ------------------> this is a MongoDB collection
                │     ├── { _id: 1, email: "a@mail.com", password: "..." }      ------------------> this is a document
                │     ├── { _id: 2, email: "b@mail.com", password: "..." }
                │     └── { _id: 3, email: "c@mail.com", password: "..." }
                │
                └── messages (collection)
                      ├── { _id: 1, from: "A", to: "B", content: "Hi" }
                      └── { _id: 2, from: "B", to: "A", content: "Hello" }

 *  What is a query?
 *      -> A request you send to the database to find, create, update, or delete data.
 */

const User = mongoose.model("User", userSchema)

export default User;