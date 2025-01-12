import React from 'react';

const PrivateInfoCard = () => {
  return (
    <div className="p-6 max-w-sm bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-muted-foreground">{company_name}</h3>
        <Badge variant="outline" className={cn(status === "aktiv" ? "bg-green-500 text-white" : "bg-red-500 text-white")}>
          {status}
        </Badge>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">Owner: <span className="font-semibold">{kampanya_egasi}</span></p>
        <p className="text-sm text-muted-foreground">Contact: <span className="font-semibold">{kontact}</span></p>
      </div>

      <div className="flex justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Monthly Income</p>
          <p className="text-lg font-semibold text-primary">${oylik_daromadi}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Software Usage</p>
          <p className="text-lg font-semibold text-primary">{soff_foydasi} GB</p>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PrivateInfoCard;