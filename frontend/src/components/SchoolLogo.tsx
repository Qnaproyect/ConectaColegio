import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { SCHOOL_LOGO, SCHOOL_NAME } from '../data/school';

interface Props {
  size?: number;
  radius?: number;
  iconSize?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function SchoolLogo({
  size = 34,
  radius = 10,
  iconSize,
  className,
  style,
}: Props) {
  const [fallo, setFallo] = useState(false);

  return (
    <span
      className={className ?? 'brand-logo'}
      style={{ width: size, height: size, borderRadius: radius, ...style }}
    >
      {fallo ? (
        <GraduationCap size={iconSize ?? Math.round(size * 0.59)} />
      ) : (
        <img
          src={SCHOOL_LOGO}
          alt={`Logo de ${SCHOOL_NAME}`}
          className="brand-logo-img"
          onError={() => setFallo(true)}
        />
      )}
    </span>
  );
}