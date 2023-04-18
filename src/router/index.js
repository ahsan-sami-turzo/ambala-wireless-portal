import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";
import Userauth from "../auth/js/index";
import {store} from "../store/index"
import Body from "../components/body";
import Auth from "../auth/auth";

/* Auth */
import login from "../auth/login";
import Register from "../auth/register";
// import Register from "../pages/authentication/register_image2";


/* maintenance */
import Maintenance from "../pages/maintenance";

/* Error Pages */
import Error400 from "../errors/error_400";
import Error401 from "../errors/error_401";
import Error403 from "../errors/error_403";
import Error404 from "../errors/error_404";
import Error500 from "../errors/error_500";
import Error503 from "../errors/error_503";

/* comingsoon */
import ComingsoonSimple from "../pages/comingsoon/comingsoon_simple";
import ComingsoonImage from "../pages/comingsoon/comingsoon_image";
import ComingsoonVideo from "../pages/comingsoon/comingsoon_video";



/* Authentication */
import LoginOne from "../pages/authentication/login_one";
import LoginTwo from "../pages/authentication/login_two";
import LoginValidate from "../pages/authentication/login_with_validation";
import RegisterImage from "../pages/authentication/register_image";
import RegisterImage2 from "../pages/authentication/register_image2";
import Unlock from "../pages/authentication/unlock";
import ForgetPassword from "../pages/authentication/forget_password";
import ResetPassword from "../pages/authentication/reset_password";



//Notifier
import Dashboard from "../notifier/dashboard/default"
import SendSms from "../notifier/smsManagement/sendSms"
import DynamicSms from "../notifier/smsManagement/dynamicSms"
import SmsTemplate from "../notifier/smsTemplate/smsTemplate"
import PriceAndCoverage from "../notifier/priceAndCoverage/priceAndCoverage"
import ContactGroup from "../notifier/addressBook/contactGroup"
import ManageContact from "../notifier/addressBook/manageContact"
import Billing from "../notifier/billing/billing"
import TodaysReport from "../notifier/deliveryReport/todaysDeliveryReport"
import AllReport from "../notifier/deliveryReport/allTimeDeliveryReport"
import ChangePassword from "../notifier/user/changePassword"
import ApiDocumentation from "../notifier/documentation/apiDocumentation"
import logout from "../notifier/user/logout";
import ScheduleSms from "../notifier/smsManagement/sendScheduleSms"
// component

Vue.use(Router);

const routes = [
    //Notifier
    {
        path: "/auth",
        component: Auth,
        children: [
            {
                path: "login",
                name: "Login-1",
                component: login,
                meta: {
                    title: " login",
                },
            },
            {
                path: "register",
                name: "register1",
                component: Register,
                meta: {
                    title: " Register | Ambala",
                },
            },
            {
                path: "logout",
                name: "logout",
                component: logout,
                meta: {
                    title: " Register | Ambala",
                },
            },
        ],
    },
    { path: "", redirect: { name: "dashboard" } },
    {
        path: "/dashboard",
        component: Body,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "",
                name: "dashboard",
                component: Dashboard,
                meta: {
                    title: "Dashboard",
                },
            },
        ],
    },
    {
        path: "/messaging",
        component: Body,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "send",
                name: "send",
                component: SendSms,
                meta: {
                    title: "Send SMS",
                },
            },
            {
                path: "dynamic",
                name: "dynamic",
                component: DynamicSms,
                meta: {
                    title: "Dynamic SMS",
                },
            },
            {
                path: "schedule-sms",
                name: "ScheduleSMS",
                component: ScheduleSms,
                meta: {
                    title: "Schedule SMS",
                },
            },
        ],
    },
    {
        path: "/sms",
        component: Body,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "template",
                name: "smsTemplate",
                component: SmsTemplate,
                meta: {
                    title: "SMS TEMPLATE",
                },
            },
            {
                path: "price-and-coverage",
                name: "priceAndCoverage",
                component: PriceAndCoverage,
                meta: {
                    title: "Price & Coverage",
                },
            },
            {
                path: "billing",
                name: "billing",
                component: Billing,
                meta: {
                    title: "Billing",
                },
            },
        ],
    },
    {
        path: "/address-book",
        component: Body,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "contact-group",
                name: "contactGroup",
                component: ContactGroup,
                meta: {
                    title: "Contact Group",
                },
            },
            {
                path: "manage-contact",
                name: "manageContact",
                component: ManageContact,
                meta: {
                    title: "Manage Contact",
                },
            },
        ],
    },
    {
        path: "/report",
        component: Body,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "today",
                name: "today",
                component: TodaysReport,
                meta: {
                    title: "Today's Report",
                },
            },
            {
                path: "all",
                name: "all",
                component: AllReport,
                meta: {
                    title: "All Time Report",
                },
            },
        ],
    },
    {
        path: "/user",
        component: Body,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "change-password",
                name: "changePassword",
                component: ChangePassword,
                meta: {
                    title: "Change Password",
                },
            },
            {
                path: "all",
                name: "all",
                component: AllReport,
                meta: {
                    title: "All Time Report",
                },
            },
        ],
    },
    {
        path: "/developers",
        component: Body,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "api-documentation",
                name: "apiDocumentation",
                component: ApiDocumentation,
                meta: {
                    title: "API Documentation",
                },
            },

        ],
    },




    //Notifier -end
    // {
    //     path: "/dashboard",
    //     component: Body,
    //     meta: {
    //         requiresAuth: true,
    //     },
    //     children: [
    //         {
    //             path: "default",
    //             name: "default",
    //             component: Default,
    //             meta: {
    //                 title: "Default Dashboard | Cuba - Premium Admin Template",
    //             },
    //         },
    //         {
    //             path: "ecommerce",
    //             name: "ecommerce",
    //             component: Ecommerce,
    //             meta: {
    //                 title: "Ecommerce Dashboard | Cuba - Premium Admin Template",
    //             },
    //         },
    //     ],
    // },
    {
        path: "/error-400",
        name: "Error400",
        component: Error400,
        meta: {
            title: "Error400 | Cuba - Premium Admin Template",
        },
    },
    {
        path: "/error-401",
        name: "Error401",
        component: Error401,
        meta: {
            title: "Error401 | Cuba - Premium Admin Template",
        },
    },
    {
        path: "/error-403",
        name: "Error403",
        component: Error403,
        meta: {
            title: "Error403 | Cuba - Premium Admin Template",
        },
    },
    {
        path: "/error-404",
        name: "Error404",
        component: Error404,
        meta: {
            title: "Error404 | Cuba - Premium Admin Template",
        },
    },
    {
        path: "/error-500",
        name: "Error500",
        component: Error500,
        meta: {
            title: "Error500 | Cuba - Premium Admin Template",
        },
    },
    {
        path: "/error-503",
        name: "Error503",
        component: Error503,
        meta: {
            title: "Error503 | Cuba - Premium Admin Template",
        },
    },
    {
        path: "/maintenance",
        name: "Maintenance",
        component: Maintenance,
        meta: {
            title: "Maintenance | Cuba - Premium Admin Template",
        },
    },
    {
        path: "/comingsoon/comingsoon-simple",
        name: "ComingsoonSimple",
        component: ComingsoonSimple,
        meta: {
            title: "ComingsoonSimple | Cuba - Premium Admin Template",
        },
    },
    {
        path: "/comingsoon/comingsoon-image",
        name: "ComingsoonImage",
        component: ComingsoonImage,
        meta: {
            title: "ComingsoonImage | Cuba - Premium Admin Template",
        },
    },
    {
        path: "/comingsoon/comingsoon-video",
        name: "ComingsoonVideo",
        component: ComingsoonVideo,
        meta: {
            title: "ComingsoonVideo | Cuba - Premium Admin Template",
        },
    },
    {
        path: "/authentication/login/one",
        name: "LoginOne",
        component: LoginOne,
        meta: {
            title: "LoginOne | Cuba - Premium Admin Template",
        },
    },
    {
        path: "/authentication/login/two",
        name: "LoginTwo",
        component: LoginTwo,
        meta: {
            title: "LoginTwo | Cuba - Premium Admin Template",
        },
    },
    {
        path: "/authentication/login/validate",
        name: "LoginValidate",
        component: LoginValidate,
        meta: {
            title: "LoginValidate | Cuba - Premium Admin Template",
        },
    },
    {
        path: "/authentication/register/image",
        name: "RegisterImage",
        component: RegisterImage,
        meta: {
            title: "RegisterImage | Cuba - Premium Admin Template",
        },
    },
    {
        path: "/authentication/register/image2",
        name: "RegisterImage2",
        component: RegisterImage2,
        meta: {
            title: "RegisterImage2 | Cuba - Premium Admin Template",
        },
    },
    {
        path: "/authentication/unlockuser",
        name: "Unlock",
        component: Unlock,
        meta: {
            title: "Unlock | Cuba - Premium Admin Template",
        },
    },
    {
        path: "/authentication/forgetpassword",
        name: "ForgetPassword",
        component: ForgetPassword,
        meta: {
            title: "ForgetPassword | Cuba - Premium Admin Template",
        },
    },
    {
        path: "/authentication/resetpassword",
        name: "ResetPassword",
        component: ResetPassword,
        meta: {
            title: "ResetPassword | Cuba - Premium Admin Template",
        },
    },
];

const router = new Router({
    routes,
    base: process.env.BASE_URL,
    mode: "history",
    linkActiveClass: "active",
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
});

router.beforeEach((to, from, next) => {


    (to.name !== 'Login-1' && to.name!=='ForgetPassword'&& to.name!=='ResetPassword')? store.dispatch('authentication/isLoggedIn') : ''

    store.dispatch('authentication/isUserLoggedIn')
    const isLoggedIn = store.state.authentication.isUserLoggedIn
    //console.log(isLoggedIn)

    if (to.name === 'Login-1'||to.name === 'ForgetPassword' || to.name === 'ResetPassword' ||to.name === 'register1') {
        if (isLoggedIn) {
            return next({name: 'dashboard'})
        } else {
            next()
        }

    }else {
        if (isLoggedIn) {
                return next()
        } else {
            return next({name: 'Login-1'})
        }
    }

    // firebase.auth().onAuthStateChanged(() => {
    //     if (to.meta.title) document.title = to.meta.title;
    //     const CurrentUser = firebase.auth().currentUser;
    //     const path = ["/auth/login", "/auth/register"];
    //     const JWTuser = localStorage.getItem("user");
    //     if (
    //         path.includes(to.path) ||
    //         to.path === "/callback" ||
    //         CurrentUser ||
    //         Userauth.isAuthenticatedUser() ||
    //         JWTuser
    //     ) {
    //         return next();
    //     }
    //     next("/auth/login");
    // });
});

export default router;
