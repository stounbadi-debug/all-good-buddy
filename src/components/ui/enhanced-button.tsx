// Enhanced Button Component with Premium Animations
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  pulse?: boolean;
  glow?: boolean;
  gradient?: boolean;
}

export function EnhancedButton({
  children,
  loading = false,
  loadingText = 'Loading...',
  icon,
  rightIcon,
  pulse = false,
  glow = false,
  gradient = false,
  className,
  disabled,
  ...props
}: EnhancedButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Button
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        {
          'animate-pulse-glow': pulse,
          'hover:shadow-lg hover:shadow-primary/25': glow,
          'bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary': gradient,
          'hover:scale-[1.02] active:scale-[0.98]': !isDisabled,
          'opacity-50 cursor-not-allowed': isDisabled,
        },
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-2 relative z-10">
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {loadingText}
          </>
        ) : (
          <>
            {icon && <span className="animate-fade-in">{icon}</span>}
            {children}
            {rightIcon && <span className="animate-fade-in">{rightIcon}</span>}
          </>
        )}
      </div>
      
      {/* Animated background overlay */}
      {!isDisabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </Button>
  );
}

interface FloatingActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  tooltip?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'electric';
}

export function FloatingActionButton({
  onClick,
  icon,
  tooltip,
  position = 'bottom-right',
  size = 'md',
  variant = 'primary'
}: FloatingActionButtonProps) {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  const variantClasses = {
    default: 'bg-background border-border hover:bg-muted',
    primary: 'bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:shadow-primary/25',
    electric: 'bg-gradient-to-r from-electric to-electric/80 hover:shadow-lg hover:shadow-electric/25'
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed rounded-full shadow-lg border backdrop-blur-md transition-all duration-300',
        'hover:scale-110 active:scale-95 animate-float z-50',
        'group flex items-center justify-center',
        positionClasses[position],
        sizeClasses[size],
        variantClasses[variant]
      )}
      title={tooltip}
    >
      <span className="group-hover:animate-bounce transition-all duration-300">
        {icon}
      </span>
    </button>
  );
}