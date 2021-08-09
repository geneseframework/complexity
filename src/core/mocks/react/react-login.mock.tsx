// import React, { useCallback, useEffect, useState } from 'framework';
// import { compose } from 'redux';
// import { connect } from 'framework-redux';
// import { Link, Router, withTranslation } from '#i18n';
// import url from '#config/url';
// import LoginForm from '#components/pages/user/login/LoginForm';
// import ModalConfirm from '#components/common/informationsElements/modal/ModalConfirm/ModalConfirm';
// import { useFetch } from '#components/customHooks';
// import { dispatchRegistrationEvent } from '#tags/common/registration.tags';
// import useModal from '#components/customHooks/useModal';
// import { Icon } from '#components/common';
//
// import {
//     StyledWrapper,
//     StyledRegistrationContainer,
//     StyledRegistrationContent,
//     StyledRegistrationButton,
//     StyledLoginContainer,
//     StyledCommonTitle,
//     StyledLinkContainer,
//     StyledLinkHelpMessage,
//     StyledAdminListWrapper,
// } from '#components/pages/user/login/LoginForm.styled';
// import { notify } from '#lib/notify/notify';
// import { validateAccount, sendConfirmationEmail, sendNotificationCompanyAdminApproval } from '#api/user/user.api';
// import Header from '#components/layout/Header';
// import {
//     errors,
//     ERRORS_WITH_LINK,
//     ERRORS_WITH_SPECIAL_MESSAGE,
//     ERROR_EMAIL_NOT_VERIFIED,
//     ERROR_WAITING_ADMIN_APPROVAL,
// } from '#constants/auth';
// import { authorizationMap } from '#constants/router';
// import { isAuthorized } from '#lib/userManager/userRights/userRightsManager';
// import externalUrls from '#config/externalUrls';
// import { isSSR, redirectionHelper } from '#lib/utils/next.utils';
// import { isUserConnectedValid } from '#lib/cookie/user.cookies';
//
// const NAMESPACES = ['login', 'validator'];
//
// function getErrorType(response) {
//     if (!response) {
//         return null;
//     }
//     return errors.find((error) => error.status === response?.data?.code)?.type;
// };
//
// const Login = ({ t, loginAction, signupToken, redirect, queryParams: { isFreeTrial } = {} }) => {
//     const validateAccountCallback = useCallback(() => signupToken && validateAccount(signupToken), [signupToken]);
//     const { openModal } = useModal();
//     const [messageError, setMessageError] = useState(null);
//     const [emailModal, setEmailModal] = useState(undefined);
//     const [adminList, setAdminList] = useState([]);
//     const [fetchData, , error] = useFetch(validateAccountCallback);
//
//     if (signupToken) {
//         if (error) {
//             notify.error(t('login:login.accountError'));
//         }
//         if (fetchData === '') {
//             notify.success(t('login:login.accountActivated'));
//         }
//     }
//
//     let redirectUrl;
//     if (redirect) {
//         // filter external urls (insecure)
//         const initialRedirectUrl = redirect.includes('://') ? undefined : { as: redirect, href: redirect };
//
//         // find the right url from redirect
//         redirectUrl = Object.values(url).reduce((acc, value) => {
//             const currUrl = value?.express ?? value;
//             const { as } = currUrl;
//             return as === redirect ? currUrl : acc;
//         }, initialRedirectUrl);
//     }
//
//     const resent = useCallback(async () => {
//         try {
//             if (messageError === ERROR_EMAIL_NOT_VERIFIED) {
//                 await sendConfirmationEmail(emailModal);
//             } else {
//                 await sendNotificationCompanyAdminApproval(emailModal);
//                 setAdminList([]);
//             }
//             setMessageError(null);
//             setEmailModal(undefined);
//         } catch (e) {
//             console.error(e);
//         }
//     }, [emailModal, messageError]);
//
//     useEffect(() => {
//         const prefetchUrl = redirectUrl ?? url.root.link();
//         Router.prefetch(prefetchUrl.href, prefetchUrl.as);
//     }, [redirectUrl]);
//
//     useEffect(() => {
//         if (messageError === ERROR_EMAIL_NOT_VERIFIED || messageError === ERROR_WAITING_ADMIN_APPROVAL) {
//             openModal({
//                 size: 'sm',
//                 content: (
//                     <>
//                         <p>{t(`login:login.modalError.${messageError}.content`)}</p>
//                         {messageError === ERROR_WAITING_ADMIN_APPROVAL && adminList && (
//                             <StyledAdminListWrapper>
//                                 <span>{t('login:login.modalError.waiting_admin_approval.admin')}</span>
//                                 {adminList.map((admin) => (
//                                     <div>
//                                         <Icon icon="person" />
//                                         <span>{admin}</span>
//                                     </div>
//                                 ))}
//                             </StyledAdminListWrapper>
//                         )}
//                     </>
//                 ),
//                 contentContainer: {
//                     component: ModalConfirm,
//                     props: {
//                         title: t(`login:login.messageError.${messageError}`),
//                         name: 'errorLoginModal',
//                         confirmButton: {
//                             text: t(`login:login.modalError.${messageError}.button`),
//                             onClick() {
//                                 resent();
//                             },
//                         },
//                         cancelButton: {
//                             hidden: true,
//                         },
//                         hiddenHelpText: false,
//                         customHelpText: (
//                             <StyledLinkHelpMessage {...externalUrls(t).contactUs}>
//                                 {t('login:login.modalError.email_not_verified.link')}
//                             </StyledLinkHelpMessage>
//                         ),
//                     },
//                 },
//             });
//         }
//     }, [messageError, adminList, openModal, resent, t]);
//
//     const onSubmit = async ({ ...values }) => {
//         setMessageError(null);
//         try {
//             const user = await loginAction(values);
//             if (redirect && redirectUrl) {
//                 const isSmartProtectedFeature = authorizationMap.get(redirect);
//                 if (isSmartProtectedFeature && !isAuthorized(user, redirect)) {
//                     window.location.href = externalUrls(t).pricingSmart.href;
//                 } else {
//                     Router.push(redirectUrl.href, redirectUrl.as);
//                 }
//             } else {
//                 const { href, as } = url.root.link({ ift: isFreeTrial });
//                 Router.push(href, as);
//             }
//             dispatchRegistrationEvent('signInLogin');
//             notify.success(t('common:common.notifications.successLogin'));
//         } catch (e) {
//             const errorType = getErrorType(e);
//             if (errorType === ERROR_EMAIL_NOT_VERIFIED) {
//                 setEmailModal(values.email);
//             }
//
//             if (errorType === ERROR_WAITING_ADMIN_APPROVAL) {
//                 const userCompanyAdminList = [];
//                 if (e?.response?.data?.extra) {
//                     e?.response?.data?.extra.map((admin) => userCompanyAdminList.push(`${admin.firstname} ${admin.lastname.charAt(0)}.`));
//                     setAdminList(userCompanyAdminList);
//                 }
//                 setEmailModal(values.email);
//             }
//
//             if (ERRORS_WITH_SPECIAL_MESSAGE.find((err) => err === errorType)) {
//                 setMessageError(errorType);
//             }
//         }
//     };
//
//     return (
//         <StyledWrapper>
//             <Header description={t('login:login.meta.description')} />
//             <StyledRegistrationContainer>
//                 <StyledCommonTitle>{t('login:login.newToUpply')}</StyledCommonTitle>
//                 <StyledRegistrationContent>
//                     <span>{t('login:login.access')}</span>
//                 </StyledRegistrationContent>
//                 <footer>
//                     <Link {...url.register.link(null, isFreeTrial)}>
//                         <a>
//                             <StyledRegistrationButton variant="primary">{t('login:login.createAccount')}</StyledRegistrationButton>
//                         </a>
//                     </Link>
//                 </footer>
//             </StyledRegistrationContainer>
//             <StyledLoginContainer>
//                 <LoginForm t={t} onSubmit={onSubmit} messageError={messageError} />
//                 <StyledLinkContainer isDisabled={ERRORS_WITH_LINK.find((err) => err === messageError)}>
//                     <Link as={url.forgottenPassword.as} href={url.forgottenPassword.href}>
//                         <a className="color-coral">{t('login:login.forgetPwd')}</a>
//                     </Link>
//                 </StyledLinkContainer>
//             </StyledLoginContainer>
//         </StyledWrapper>
//     );
// };
//
// Login.getInitialProps = async (ctx) => {
//     const namespaces = { namespacesRequired: NAMESPACES };
//
//     if (isSSR && isUserConnectedValid(ctx)) {
//         redirectionHelper(url.root.link(), ctx, ctx.query.ift && '?ift=1');
//         return { ...namespaces };
//     }
//     if (ctx.query && ctx.query.token) {
//         return { queryParams: { isFreeTrial: ctx.query.ift }, signupToken: ctx.query.token, ...namespaces };
//     }
//     return {
//         redirect: ctx.query.redirect,
//         ...namespaces,
//         queryParams: { isFreeTrial: ctx.query.ift },
//     };
// };
//
// const mapDispatchToProps = (dispatch) => ({
//     loginAction: dispatch.user.login,
// });
//
// export default compose(withTranslation(NAMESPACES), connect(null, mapDispatchToProps))(Login);
