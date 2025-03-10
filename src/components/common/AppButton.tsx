import React from 'react';
import { useAppUrl } from '../../context/AppUrlContext';

interface AppButtonProps {
  /** The action type that determines the destination URL */
  action: 'login' | 'signup' | 'dashboard' | 'pricing' | string;
  
  /** Button display variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'light';
  
  /** Additional CSS class names */
  className?: string;
  
  /** Button content */
  children: React.ReactNode;
  
  /** Optional icon class (FontAwesome) */
  icon?: string;
  
  /** Whether to show the icon after the text (default is before) */
  iconAfter?: boolean;
  
  /** Optional onClick handler (if provided, will override the default link behavior) */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * AppButton component that automatically links to the correct app URL
 * based on the current environment (localhost vs production)
 */
const AppButton: React.FC<AppButtonProps> = ({
  action,
  variant = 'primary',
  className = '',
  children,
  icon,
  iconAfter = false,
  onClick
}) => {
  const { getActionUrl, isDevelopment } = useAppUrl();
  const destination = getActionUrl(action);
  const baseClass = `btn btn-${variant}`;
  const combinedClassName = className ? `${baseClass} ${className}` : baseClass;
  
  // Optional console log in development to verify URL
  if (isDevelopment && process.env.NODE_ENV === 'development') {
    console.log(`AppButton action "${action}" redirects to: ${destination}`);
  }
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };
  
  return (
    <a 
      href={destination} 
      className={combinedClassName}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      {!iconAfter && icon && <i className={`fas fa-${icon} ${iconAfter ? 'ms-2' : 'me-2'}`}></i>}
      {children}
      {iconAfter && icon && <i className={`fas fa-${icon} ${iconAfter ? 'ms-2' : 'me-2'}`}></i>}
    </a>
  );
};

export default AppButton; 