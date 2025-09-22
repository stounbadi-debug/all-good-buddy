// Enhanced Loading Components with Premium Animations
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2, Brain, Zap } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'electric';
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default',
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  const variantClasses = {
    default: 'text-muted-foreground',
    primary: 'text-primary',
    electric: 'text-electric'
  };

  return (
    <Loader2 
      className={cn(
        'animate-spin',
        sizeClasses[size],
        variantClasses[variant],
        className
      )} 
    />
  );
}

interface PremiumLoadingProps {
  message?: string;
  variant?: 'brain' | 'zap' | 'default';
  className?: string;
}

export function PremiumLoading({ 
  message = 'Processing...', 
  variant = 'default',
  className 
}: PremiumLoadingProps) {
  const Icon = variant === 'brain' ? Brain : variant === 'zap' ? Zap : Loader2;
  
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4 p-8", className)}>
      <div className="relative">
        <div className="absolute inset-0 animate-pulse-glow">
          <Icon className="w-10 h-10 text-primary animate-float" />
        </div>
        <Icon className="w-10 h-10 text-primary animate-spin" />
      </div>
      <div className="text-center">
        <p className="text-lg font-medium gradient-text animate-fade-in">
          {message}
        </p>
        <div className="flex justify-center mt-2">
          <div className="flex space-x-1 animate-pulse">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'avatar' | 'button';
}

export function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  const variantClasses = {
    card: 'h-32 w-full rounded-lg',
    text: 'h-4 w-3/4 rounded',
    avatar: 'h-12 w-12 rounded-full',
    button: 'h-10 w-24 rounded-md'
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-muted/50 via-muted/20 to-muted/50 bg-[length:200%_100%] animate-pulse-glow',
        variantClasses[variant],
        className
      )}
    />
  );
}

interface ProgressDotsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'electric' | 'gold';
}

export function ProgressDots({ size = 'md', color = 'primary' }: ProgressDotsProps) {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const colorClasses = {
    primary: 'bg-primary',
    electric: 'bg-electric',
    gold: 'bg-gold'
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            'rounded-full animate-bounce',
            sizeClasses[size],
            colorClasses[color]
          )}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="p-6 space-y-4 border rounded-lg bg-gradient-to-br from-card to-card/50 backdrop-blur-md animate-pulse">
      <div className="flex items-center space-x-4">
        <Skeleton variant="avatar" />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" className="w-1/2" />
          <Skeleton variant="text" className="w-3/4" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton variant="text" />
        <Skeleton variant="text" className="w-5/6" />
        <Skeleton variant="text" className="w-4/6" />
      </div>
      <div className="flex justify-between">
        <Skeleton variant="button" />
        <Skeleton variant="button" className="w-16" />
      </div>
    </div>
  );
}