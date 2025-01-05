import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../components/layout/layout';

import { UserContext } from '../../context/userContext';

export default function Account() {
  const { user, loading, error } = useContext(UserContext);

  if (loading) {
    return (
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    );
  } 

  if (error) {
    return (
      <Layout>
        <h1>Error: {error}</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>{user ? user.name : 'Guest'}</h1>
    </Layout>
  );
}
