import blob_bg from "../assets/sign-in-page/blob.png";
import upper_left_paw_path from "../assets/sign-in-page/upper-left-paw-path.png";
import lower_right_paw_path from "../assets/sign-in-page/lower-right-paw-path.png";
import unleash_banner from "../assets/unleash_banner.png";
import animals_design from "../assets/sign-in-page/sign-in-page-animals.png"
import { FaUserLarge } from "react-icons/fa6";
import { IoIosLock, IoIosCloseCircle } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import "./styles/webpage.scss"
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { USER_ROLES } from "../variables/USER_ROLES";

/**
 * @typedef {"SIGN_IN" | "SIGN_UP"} ModeType
 */

/**
 * @param {{ mode: ModeType }} props
 */

export default function Login({ mode, accountStatus, accountType, profileData }) {

    const MOCK_ACCOUNTS = {
        "super_admin": {
            password: "password1234",
            role: USER_ROLES.SUPER_ADMIN,
            profileData: {
                pfp: null,
                username: "Super Admin"
            }
        },
        "marketing1": {
            password: "password1234",
            role: USER_ROLES.MARKETING_ADMIN,
            profileData: {
                pfp: null,
                username: "Marketing Admin"
            }
        },
        "merchant_account@gmail.com": {
            password: "password1234",
            role: USER_ROLES.MERCHANT,
            profileData: {
                pfp: null,
                username: "Merchant"
            }
        }
    }

    const navigate = useNavigate();
    const [signInError, setSignInError] = useState({ title: "", subtitle: "" });
    const [signInErrorStatus, setSignInErrorStatus] = useState(false);
    const [signUpPage, setSignUpPage] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const primaryButtonTrigger = () => {
        if (mode === "SIGN_IN") {
            var credentials = password === MOCK_ACCOUNTS[email]?.password;
            if (!credentials) incorrectCredentials();
            else {
                accountStatus.setter(true);
                accountType.setter(MOCK_ACCOUNTS[email].role);
                profileData.setter(MOCK_ACCOUNTS[email].profileData);
                navigate("/");
            }
        } else if (mode === "SIGN_UP") {
            switch (signUpPage) {
                case 1:
                    setSignUpPage(2);
                    /**
                     * temporarily store credentials.
                     * send OTP to email.
                     */
                    break;
                case 2:
                    setSignUpPage(3);
                    /**
                     * store credentials as merchant account.
                     */
                    break;
                case 3:
                    /**
                     * store profile details.
                     * show popup of successful account creation.
                     */
                    break;
                default:
                    /**
                     * DO NOTHING.
                     */
                    break;
            }
        }
    }

    const incorrectCredentials = () => {
        // set error message
        if (email === "") {
            setSignInError({ title: "Input credentials!", subtitle: "Please input your email." });
        } else if (password === "") {
            setSignInError({ title: "Input credentials!", subtitle: "Please input your password." });
        } else if (!MOCK_ACCOUNTS[email]) {
            setSignInError({ title: "Incorrect Email!", subtitle: "Email not registered in the system." });
        } else if (password !== MOCK_ACCOUNTS[email]?.password) {
            setSignInError({ title: "Incorrect Password!", subtitle: "Please make sure the password is correct." });
        }

        // show error
        setSignInErrorStatus(true);
        setTimeout(() => {
            setSignInErrorStatus(false);
        }, 2500);
    }

    return (
        <div className="bg-unleash-blue h-full min-h-[100vh] relative">
            {/* background design */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="bg-unleash-blue-light w-[32rem] h-[32rem] rounded-full absolute -left-32 -bottom-32" />
                <img src={blob_bg} alt="background element" className="top-0 right-0 absolute h-[100vh]" />
                <img src={upper_left_paw_path} alt="background element" className="top-8 left-8 absolute opacity-[.18] w-36" />
                <img src={lower_right_paw_path} alt="background element" className="bottom-8 right-80 absolute opacity-[.18] w-36" />
            </div>

            <div className="absolute top-7/12 left-1/2 -translate-1/2 w-md py-9 px-14 rounded-2xl flex flex-col gap-4 justify-center bg-website-light">
                <img
                    src={animals_design}
                    alt="background element"
                    className="w-full absolute top-0 left-0 transform -translate-y-full"
                />

                {/* Unleash Logo */}
                <img src={unleash_banner} alt="background element" className="h-10 w-fit" />

                <p className="font-montserrat text-base font-bold">
                    {
                        mode === "SIGN_IN" ?
                            "Log in to your Account."
                            :
                            "Sign Up"
                    }
                </p>

                {/* Merchant Sign Up */}
                {(mode === "SIGN_IN") && (<>
                    <div className="font-montserrat text-xs font-medium text-website-gray">
                        New here? Sign up as a Merchant!
                    </div>
                    <p
                        className="font-montserrat text-xs font-medium text-unleash-blue bg-website-gray-light border-[1px] border-unleash-blue rounded-sm w-full text-center py-4 cursor-pointer select-none hover:brightness-95"
                        onClick={() => navigate("/sign-up")}>
                        Sign up as a Merchant
                    </p>
                </>)
                }
                {/* line */}
                <div className="w-full h-[1px] bg-website-gray rounded-full"></div>

                {/* email & password input */}
                <Input type="text" label={mode === "SIGN_UP" ? "Email Address" : "Username"} id={mode === "SIGN_UP" ? "email_address" : "username"} LeftIcon={<FaUserLarge className="p-1" />} input={email} setInput={setEmail} />
                <Input type="password" label="Password" id="password" LeftIcon={<IoIosLock />} toggle input={password} setInput={setPassword} />
                {mode === "SIGN_UP" &&
                    <Input type="password" label="Confirm Password" id="confirm-password" LeftIcon={<IoIosLock />} toggle input={password} setInput={setPassword} />}

                {/* Primary Button */}
                <div className="w-full py-3 cursor-pointer hover:brightness-90 font-montserrat font-medium text-white bg-unleash-blue rounded-sm flex justify-center items-center text-xs"
                    onClick={() => primaryButtonTrigger()}>
                    {mode === "SIGN_UP" ? "Sign Up" : "Log in"}
                </div>

                {/* Secondary Button */}
                {mode === "SIGN_IN" && <div className={`w-full cursor-pointer hover:brightness-90 font-montserrat font-medium text-unleash-blue rounded-sm flex justify-center items-center text-sm brightness-95`}>
                    Forgot Password
                </div>}
            </div>

            <div className={`absolute flex flex-row z-20 justify-center items-center gap-6 top-20 left-1/2 -translate-x-1/2 py-4 px-4 rounded-2xl border-[1px] border-website-red-light w-md bg-website-light
                ${signInErrorStatus ? "animate-float-in-out" : "hidden"}`}>
                <IoIosCloseCircle className="w-10 h-10 text-website-red " />
                <div className="flex flex-col flex-1 font-montserrat">
                    <p className="font-semibold text-base text-black">{signInError.title}</p>
                    <p className="font-medium text-xs text-website-gray">{signInError.subtitle}</p>
                </div>
                <IoCloseOutline className="w-10 h-10 text-website-gray p-2" />
            </div>
        </div>
    )
}