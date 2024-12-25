import {React, useState, useEffect} from 'react'
import Layout from '../../components/layout/layout'
import axios from 'axios'

export default function account() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    axios.get('http://localhost:4000/user', { withCredentials: true })
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
<h1>{user.name}</h1>
    </Layout>
  )
}
