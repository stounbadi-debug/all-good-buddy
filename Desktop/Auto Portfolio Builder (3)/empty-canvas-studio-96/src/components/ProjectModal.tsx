import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Film, Calendar, User, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    year?: string;
    role?: string;
    type?: string;
    rating?: string;
    coverImage?: string;
    description?: string;
    link?: string;
  };
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Project details for {project.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cover Image */}
          {project.coverImage && (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Project Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.year && project.year !== 'N/A' && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Calendar className="w-4 h-4" />
                  <p className="text-xs font-semibold uppercase tracking-wide">Year</p>
                </div>
                <p className="font-bold text-lg">{project.year}</p>
              </div>
            )}

            {project.role && project.role !== 'N/A' && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                <div className="flex items-center gap-2 text-accent-foreground mb-2">
                  <User className="w-4 h-4" />
                  <p className="text-xs font-semibold uppercase tracking-wide">Role</p>
                </div>
                <p className="font-bold text-lg">{project.role}</p>
              </div>
            )}

            {project.type && project.type !== 'N/A' && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
                <div className="flex items-center gap-2 text-secondary-foreground mb-2">
                  <Film className="w-4 h-4" />
                  <p className="text-xs font-semibold uppercase tracking-wide">Type</p>
                </div>
                <p className="font-bold text-lg">{project.type}</p>
              </div>
            )}

            {project.rating && project.rating !== 'N/A' && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
                <div className="flex items-center gap-2 text-yellow-600 mb-2">
                  <Star className="w-4 h-4 fill-current" />
                  <p className="text-xs font-semibold uppercase tracking-wide">Rating</p>
                </div>
                <p className="font-bold text-lg">⭐ {project.rating}</p>
              </div>
            )}
          </div>

          {/* Description (if available) */}
          {project.description && (
            <div className="p-6 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Film className="w-5 h-5" />
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {project.link && (
              <Button
                variant="default"
                className="flex-1"
                onClick={() => window.open(project.link, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on IMDB
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;

