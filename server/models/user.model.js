import { model, Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name is required no less than 1 character"],
            minlength: [1,"First Name is required no less than 1 character"]
        },
        lastName: {
            type: String,
            required: [true, "Last Name is required no less than 1 character"],
            minlength: [1,"Last Name is required no less than 1 character"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email"
            }
        },
        password: {
            type: String,
            required: [true, "Password is required and must match Confirm Password"],
            minlength: [8, "Password must be 8 characters or longer"]
        }
    }, { timestamps: true });

    userSchema.virtual('confirmPassword')
        .get(function () {
            return this._confirmPassword;
        })
        .set(function (value) {
            this._confirmPassword = value;
        });

    userSchema.pre('validate', function(next) {
        if (this.password !== this._confirmPassword) {
            this.invalidate('confirmPassword', 'Password must match confirm password');
        }
        next();
    });

    userSchema.pre('save', function(next) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
            next();
            });
        });

const User = model("users", userSchema)
export default User