import '@/styles/index.scss';

import 'virtual:svg-icons-register';
import queryString from 'query-string';
import {
  // SignUpForm,
  compileSignUpFormMarkup,
  getFromLS,
  // setToLS,
} from 'mayanbet-sdk';
import '@/plugins';

import '@/js/modal';
import { openSignUpModal } from '@/js/sign-up';
// import '@/js/terms-and-privacy';
import useViewportSizes from '@/js/use-viewport-sizes';

useViewportSizes();

const searchString = queryString.parse(window.location.search);

const isAlreadyRegistered = getFromLS('isAlreadyRegistered');
if (isAlreadyRegistered && !searchString.debug) {
  searchString['sign-in'] = true;
  const stringifiedSearch = queryString.stringify(searchString);

  window.location.replace(
    `${import.meta.env.VITE_REDIRECT_URL}/?${stringifiedSearch}`,
  );
}

const FORM_NAME = 'desktopSignUp';

const markup = compileSignUpFormMarkup({
  formName: FORM_NAME,
  formClass: 'main__desktop-sign-up-form',
  title: 'Criar Sua Conta Grátis',
  isEmailOnFirstPosition: true,
});

const desktopSignUpWrapperRef = document.querySelector(
  '.js-desktop-sign-up-wrapper',
);

desktopSignUpWrapperRef.insertAdjacentHTML('beforeend', markup);

// new SignUpForm({
//   formRef: document.forms[FORM_NAME],
//   submitCallback: async () => {
//     setToLS('isAlreadyRegistered', true);
//   },
// });

const showAuthBtnRef = document.querySelector('.js-show-auth-btn');

showAuthBtnRef.addEventListener('click', openSignUpModal);
