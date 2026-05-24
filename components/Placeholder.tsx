/**
 * Marca visualmente y semánticamente las zonas con material pendiente.
 * Reemplazar contenido real cuando llegue (foto, bio, copy).
 */
export function Placeholder({
  label,
  children,
  height,
}: {
  label: string;
  children?: React.ReactNode;
  height?: string;
}) {
  return (
    <div
      className="border border-dashed border-ceniza/50 bg-archivo/40 px-5 py-6 text-ceniza"
      style={height ? { minHeight: height } : undefined}
    >
      <p className="eyebrow text-bramante mb-2">Pendiente · {label}</p>
      {children && <div className="text-sm leading-relaxed">{children}</div>}
    </div>
  );
}
