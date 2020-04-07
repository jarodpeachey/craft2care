import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext({});

/**
 * Manages the shopping cart, which is persisted in local storage.
 * The cart and related methods are shared through context.
 */
const AppProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const ctx = {
    setShowSignupModal,
    setShowLoginModal,
    showSignupModal,
    showLoginModal
  };

  return (
    <AppContext.Provider value={{ ...ctx }}>{children}</AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.any.isRequired
};

export default AppProvider;
