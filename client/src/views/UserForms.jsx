import { LoginUserForm } from "../components/LoginUserForm";
import { RegisterUserForm } from "../components/RegisterUserForm";

const UserForms = () => {

    return (
    <div className="d-flex ">
        <div className="flex-grow-1">
        <RegisterUserForm/>
        </div>
        <div className="flex-grow-1">
        <LoginUserForm/>
        </div>
    </div>
    );
};

export default UserForms;