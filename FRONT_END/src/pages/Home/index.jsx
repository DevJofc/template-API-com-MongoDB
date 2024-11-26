import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
//import Trash from '../../assets/trash.png';
import './styles.css';
import api from '../../services/api';

function Home() {

  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputEmail = useRef();
  const inputAge = useRef();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });

  async function getUsers() {
    try {
      const response = await api.get('/usuarios');
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };
  
  async function createUsers() {
    let name = inputName.current.value;
    let email = inputEmail.current.value;
    let age = inputAge.current.value;

    if(!name || !email || !age) {
      alert('Preencha todos os campos!');
      return;
    }
    
    await api.post('/usuarios', {
      name: name,
      email: email,
      age: age,
    });

    getUsers();
  };

  async function deleteUser(id) {
    try {
      await api.delete(`/usuarios/${id}`);
      getUsers();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);


  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/usuarios', formData);
      console.log('Usuário registrado com sucesso:', response.data);
      setFormData({
        name: '',
        email: '',
        age: '',
      
      });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="form-register">
        <form onSubmit={handleSubmit} className="form">
          <h2>Registro de Usuário</h2>
          
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder='João'
              required
              ref={inputName}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='joao@example.com'
              required
              ref={inputEmail}
            />
          </div>

          <div className="form-group">
            <label htmlFor="idade">Idade:</label>
            <input
              type="number"
              id="idade"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              placeholder='25'
              required
              ref={inputAge}
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="senha"
                name="senha"
                value="password"
                onChange={handleChange}
                required
              />
              <button 
                type="button" 
                className="toggle-password-btn"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <button type="button" onClick={createUsers}>Registrar</button>
        </form>
      </div>

      {/* <div className="form-login">
        <form className="form">
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            </div>
        </form>
      </div> */}

      {users.map((user) => (
        <div key={user.id} className="user-card">
          <p>Nome: <span>{user.name}</span></p>
          <p>Email: <span>{user.email}</span></p>
          <p>Idade: <span>{user.age}</span></p>
          <button className="btn-trash" type='button' onClick={() => deleteUser(user.id)}>Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;