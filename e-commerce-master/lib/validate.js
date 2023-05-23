export default function login_validate(values) {
    const errors = {};

    // email validation
    if (!values.email) {

        errors.email = "Required";

    } else if (

        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)

    ) {

        errors.email = "Invalid email address";

    }

    // password validation
    if (!values.password) {

        errors.password = "Required";

    } else if (

        values.password.length < 8 || values.password.length > 20

    ) {

        errors.password = "This passwordshould contain from 8 - 20 characters";

    } else if (

        values.password.includes(" ")

    ) {

        errors.password = "Invalid password";

    }

    return errors;
}



export function registerValidate(values) {
    const errors = {};

    // email validation
    if (!values.email) {

        errors.email = "Required";

    } else if (

        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)

    ) {

        errors.email = "Invalid email address";

    }

    // username validation
    if (!values.username) {

        errors.username = "Required";

    } else if (

        values.username.includes(" ")

    ) {

        errors.username = "Invalid username ...";

    }

    // password validation
    if (!values.password) {

        errors.password = "Required";

    } else if (

        values.password.length < 8 || values.password.length > 20

    ) {

        errors.password = "This passwordshould contain from 8 - 20 characters";

    } else if (

        values.password.includes(" ")

    ) {

        errors.password = "Invalid password";

    }

    // confirmpass validation
    if (!values.confirmpass) {

        errors.confirmpass = "Required";

    } else if (

        values.confirmpass !== values.password

    ) {

        errors.confirmpass = "Password does not match...";

    } else if (

        values.confirmpass.includes(" ")

    ) {

        errors.confirmpass = "Invalid confirm password";

    }

    return errors;
}