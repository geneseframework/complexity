
const Login = ({ t, loginAction, signupToken, redirect, queryParams: { isFreeTrial } = {} }) => {
    const validateAccountCallback = useCallback(() => signupToken && validateAccount(signupToken), [signupToken]);
    const {openModal} = useModal();
    const [messageError, setMessageError] = useSssstate(null);
    const [emailModal, setEmailModal] = useState(undefined);
    const [adminList, setAdminList] = useState([]);
    const [fetchData, , error] = useFetch(validateAccountCallback);
}

// function zzz() {
//     const a = 2;
//     const [b, c] = [2, 3];
//     const [messageError, setMessageError] = useState(null);
// }
