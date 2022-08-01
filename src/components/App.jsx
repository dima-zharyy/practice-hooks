import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { MaterialEditorForm } from './MaterialEditorForm/MaterialEditorForm';
import { MaterialList } from './MaterialList/MaterialList';
import * as API from 'services/api';

export const App = () => {
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    API.getMaterials()
      .then(data => {
        console.log(data);
        setMaterials([...data]);
      })
      .catch(error => {
        setError(true);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const addMaterial = async values => {
    try {
      const material = await API.addMaterial(values);
      setMaterials(state => [...state, material]);
    } catch (error) {
      setError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  const deleteMaterial = async id => {
    try {
      await API.deleteMaterial(id);
      setMaterials(state => state.filter(item => item.id !== id));
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const updateMaterial = async fields => {
    try {
      const updatedMaterial = await API.updateMaterial(fields);
      setMaterials(state =>
        state.map(item => (item.id === fields.id ? updatedMaterial : item))
      );
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <Layout>
      <GlobalStyle />
      {error && (
        <p>
          Ой! Что-то пошло не так :( Перезагрузите страницу и попробуйте еще
          раз.
        </p>
      )}
      <MaterialEditorForm onSubmit={addMaterial} />
      {isLoading ? (
        <h1>{'Загружаем материалы'}</h1>
      ) : (
        <MaterialList
          items={materials}
          onDelete={deleteMaterial}
          onUpdate={updateMaterial}
        />
      )}
    </Layout>
  );
};
