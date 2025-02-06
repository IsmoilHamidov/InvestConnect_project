import { useState, useEffect } from "react";
import { useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";


type ProfileProjects = {
  id: number;
  name: string;
  location: string;
  price: number;
  image?: string;

  month: string;
  category: string;
}; 

export const useDragAndDrop = (apiHook: any) => {
  const { data, error, isLoading, refetch } = apiHook(undefined); 
  const [projects, setProjects] = useState<ProfileProjects[]>([]);

  useEffect(() => {
    if (data) {
      setProjects(data); 
    }
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const getTaskPos = (id: number) => projects.findIndex((project) => project.id === id);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id === over.id) return; 

    setProjects((prevProducts) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(prevProducts, originalPos, newPos);
    });
  };

  return {
    projects,
    isLoading,
    refetch,
    error,
    sensors,
    handleDragEnd,
  };
};
