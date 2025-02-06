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


  // Saving action in LocalStorage 
  useEffect(() => {
    const savedOrder = localStorage.getItem("projectsOrder");
    if (savedOrder) {
      setProjects(JSON.parse(savedOrder));
    } else if (data) {
      setProjects(data);
    }
  }, [data]);
  const getTaskPos = (id: number) => projects.findIndex((p) => p.id === id);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setProjects((prevProjects) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      const newOrder = arrayMove(prevProjects, originalPos, newPos);

      localStorage.setItem("projectsOrder", JSON.stringify(newOrder));
      return newOrder;
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
