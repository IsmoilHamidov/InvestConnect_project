import React from 'react';
import { Button } from './ui/button';

export const SearchProduct = () => {
  return (
    <div>
      <div className="flex gap-3 pt-36 pb-24 justify-center">
            <select className="border bg-background px-6 py-3 border-black rounded-[75px] text-primary">
              <option className="text-gray-700">Waar wil je investeren?</option>
              <option className="text-gray-700">Waar wil je investeren?</option>
              <option className="text-gray-700">Waar wil je investeren?</option>
            </select>
            

            <Button
              variant="secondary"
              className="rounded-[75px] p-6 text-white"
            >
              Investeringsaanbod
            </Button>
          </div>
    </div>
  );
};
