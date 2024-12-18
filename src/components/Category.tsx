import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useGetCategoriesQuery } from '@/store/slice/products';

type CategoriesModalProps = {
  open: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void; // Функция для выбора категории
};

const CategoriesModal: React.FC<CategoriesModalProps> = ({ open, onClose, onSelectCategory }) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Категории</DialogTitle>
        </DialogHeader>
        {isLoading && <p>Загрузка...</p>}
        {error && <p>Произошла ошибка при загрузке категорий.</p>}
        <ul className="space-y-2">
          {categories?.map((category) => (
            <li
              key={category.id}
              className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => {
                onSelectCategory(category.name); // Установка категории
                onClose(); // Закрытие модалки
              }}
            >
              {category.img ? (
                <img src={category.img} alt={category.name} className="w-12 h-12 rounded" />
              ) : (
                <div className="w-12 h-12 bg-gray-300 rounded" />
              )}
              <span>{category.name}</span>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default CategoriesModal;
