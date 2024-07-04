import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    hobbies: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        hobbies: checked
          ? [...formData.hobbies, value]
          : formData.hobbies.filter((hobby) => hobby !== value)
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Aquí puedes agregar la lógica para enviar los datos al servidor.
  };

  return (
    <div className="App">
      <h1>Formulario Interactivo de prueba</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Género:</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
          />
          <label htmlFor="male">Masculino</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
          />
          <label htmlFor="female">Femenino</label>
        </div>
        <div>
          <label>Hobbies:</label>
          <input
            type="checkbox"
            id="reading"
            name="hobbies"
            value="reading"
            checked={formData.hobbies.includes('reading')}
            onChange={handleChange}
          />
          <label htmlFor="reading">Lectura</label>
          <input
            type="checkbox"
            id="traveling"
            name="hobbies"
            value="traveling"
            checked={formData.hobbies.includes('traveling')}
            onChange={handleChange}
          />
          <label htmlFor="traveling">Viajar</label>
          <input
            type="checkbox"
            id="coding"
            name="hobbies"
            value="coding"
            checked={formData.hobbies.includes('coding')}
            onChange={handleChange}
          />
          <label htmlFor="coding">Programación</label>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
