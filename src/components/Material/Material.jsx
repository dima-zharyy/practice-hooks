import { useState } from 'react';

const EditMaterialModal = ({ onClose, onEdit }) => {
  return (
    <div>
      <h2>Модалка редактирования материала</h2>
      <button
        type="button"
        onClick={() => {
          onEdit();
          onClose();
        }}
      >
        Вот теперь точно редактировать
      </button>
      <button type="button" onClick={onClose}>
        Закрыть
      </button>
    </div>
  );
};

export const Material = ({ item, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <p>
        <b>Название:</b> {item.title}
      </p>
      <p>
        <b>Ссылка:</b> {item.link}
      </p>
      <p>
        <b>Описание:</b> {item.description}
      </p>
      <button type="button" onClick={() => onDelete(item.id)}>
        Удалить
      </button>
      <button type="button" onClick={() => setIsModalOpen(true)}>
        Редактировать
      </button>
      {isModalOpen && (
        <EditMaterialModal
          onClose={() => setIsModalOpen(false)}
          onEdit={() => onUpdate({ id: item.id, title: Date.now() })}
        />
      )}
    </div>
  );
};
