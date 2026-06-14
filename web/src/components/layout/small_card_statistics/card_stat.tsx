interface ICardOptions {
  icon: React.ReactNode;
  title: string;
  body: string;
  numberOf: string;
}

export const CardStatistics: React.FC<ICardOptions> = ({
  icon,
  title,
  body,
  numberOf,
}) => {
  return (
    <>
      <div
        className="group relative overflow-hidden bg-primary-500/10 rounded-xl border border-primary-200 p-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10 hover:border-primary-200"
      >
        <div className="absolute inset-0 bg-linear-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary-500 w-4 h-4">{icon}</span>
            <h3 className="text-primary-600 text-md font-medium tracking-wide uppercase ml-1">
            {title}
            </h3>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-primary-900 text-base font-medium break-words">
              {body}
            </p>
            <p className="text-primary-700 text-lg font-bold tabular-nums">
              {numberOf}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
