import React from "react";

interface InfoCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon }) => (
  <div className="group relative overflow-hidden bg-primary-500/10 backdrop-blur-xs rounded-xl border border-primary-200 p-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10 hover:border-primary-200">
    {/* Background gradient effect */}
    <div className="absolute inset-0 bg-linear-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Content container */}
    <div className="relative">
      {/* Title row with optional icon */}
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-primary-500 w-4 h-4">{icon}</span>}
        <h3 className="text-primary-600 text-md font-medium tracking-wide uppercase">
          {title}
        </h3>
      </div>

      {/* Value with dynamic styling based on content type */}
      <p
        className={`
        font-medium text-primary-900 break-words whitespace-normal
        ${typeof value === "number" ? "text-lg tabular-nums" : "text-base"}
      `}
      >
        {value}
      </p>
    </div>

    {/* Decorative corner accent */}
    <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary-100/50 rounded-full blur-xl group-hover:bg-primary-200/50 transition-colors duration-300" />
  </div>
);

export default InfoCard;
