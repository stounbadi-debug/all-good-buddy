import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { PDFGenerator } from '@/utils/pdfGenerator';
import { ProjectsFilter } from '@/components/ProjectsFilter';
import { ProjectModal } from '@/components/ProjectModal';
import { PhotoGalleryModal } from '@/components/PhotoGalleryModal';
import { 
  User, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Award,
  Building,
  ExternalLink,
  Download,
  RefreshCw,
  CheckCircle,
  Sparkles,
  Star,
  Film,
  Users,
  Info,
  Camera,
  Play,
  Image as ImageIcon,
  Video,
  Eye,
  ChevronDown,
  Edit3,
  Save,
  X
} from 'lucide-react';

interface ProfileData {
  name?: string;
  description?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  url?: string;
  image?: string;
  coverPhoto?: string;
  skills?: string[];
  projects?: Array<{ name: string; role?: string; year?: string; coverImage?: string }>;
  experience?: Array<{ company: string; position: string; duration?: string }>;
  // Universal project fields
  knownFor?: Array<{ title: string; year?: string; role?: string; rating?: string; type?: string; coverImage?: string }>;
  filmography?: Array<{ title: string; year?: string; role?: string; type?: string; coverImage?: string }>;
  credits?: Array<{ title: string; year?: string; role?: string; category?: string; type?: string }>;
  ratings?: Array<{ title: string; rating: string }>;
  awards?: Array<{ name: string; year?: string; category?: string }>;
  personalDetails?: {
    birthDate?: string;
    birthYear?: string;
    birthPlace?: string;
    height?: string;
    relatives?: Array<{ name: string; relationship: string }>;
  };
  trivia?: string[];
  biography?: string;
  mediaContent?: {
    photos?: Array<{ url: string; alt: string; type: string }>;
    videos?: Array<{ title: string; thumbnail?: string; type: string }>;
  };
  generatedAt?: string;
  sourceUrl?: string;
  confidence?: number;
}

interface ProfileResultCardProps {
  profileData: ProfileData;
  onTryAnother: () => void;
  onExport: () => void;
}

export const ProfileResultCard: React.FC<ProfileResultCardProps> = ({ 
  profileData, 
  onTryAnother, 
  onExport 
}) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isBiographyExpanded, setIsBiographyExpanded] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{type: 'photo' | 'video', url: string, title: string} | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Modal states for clickable cards
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isPhotoGalleryOpen, setIsPhotoGalleryOpen] = useState(false);
  const [editedData, setEditedData] = useState(profileData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(profileData.filmography || []);
  const [filteredFeaturedWork, setFilteredFeaturedWork] = useState(profileData.knownFor || []);
  const { toast } = useToast();
  const confidenceScore = Math.round((profileData.confidence || 0) * 100);
  const confidenceColor = confidenceScore >= 80 ? 'text-success' : confidenceScore >= 60 ? 'text-warning' : 'text-destructive';

  // Handle field changes
  const handleFieldChange = (field: keyof ProfileData, value: any) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  // Handle nested field changes (e.g., personalDetails.birthDate)
  const handleNestedFieldChange = (parentField: keyof ProfileData, childField: string, value: any) => {
    setEditedData(prev => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField] as any),
        [childField]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  // Save changes
  const handleSaveChanges = () => {
    // Update the profile data (in real app, this would call an API)
    Object.assign(profileData, editedData);
    setIsEditing(false);
    setHasUnsavedChanges(false);
    
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    if (hasUnsavedChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to discard them?')) {
        setEditedData(profileData);
        setIsEditing(false);
        setHasUnsavedChanges(false);
      }
    } else {
      setEditedData(profileData);
      setIsEditing(false);
    }
  };

  const handlePDFExport = async () => {
    setIsGeneratingPDF(true);
    try {
      await PDFGenerator.generateProfilePDF(profileData);
      toast({
        title: "PDF Generated Successfully!",
        description: "Your profile has been downloaded as a PDF.",
      });
    } catch (error) {
      toast({
        title: "PDF Generation Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <Card className="shadow-xl-premium border-0 glass-premium overflow-hidden hover-lift">
        {/* Cover Photo Section */}
        <div className="relative h-48 sm:h-64 bg-gradient-to-br from-primary via-primary-hover to-primary/80 overflow-hidden">
          {/* Cover Photo Background */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
          
          {/* Future: User's cover photo will go here */}
          <div className="absolute inset-0 flex items-center justify-center text-white/20">
            <Camera className="w-16 h-16" />
          </div>
          
          {/* Profile Photo Overlay (positioned at bottom) */}
          <div className="absolute bottom-0 left-4 sm:left-8 transform translate-y-1/2 z-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-hover rounded-full blur-xl opacity-50"></div>
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full border-4 border-white shadow-xl-premium bg-white overflow-hidden">
                {profileData.image ? (
                  <img 
                    src={profileData.image} 
                    alt={profileData.name} 
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextElementSibling) {
                        (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 ${profileData.image ? 'hidden' : 'flex'}`}>
                  <User className="w-12 h-12 sm:w-16 sm:h-16 text-primary/40" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Header with premium gradient - Mobile Responsive */}
        <CardHeader className="gradient-shift text-white relative overflow-hidden p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24">
          {/* Background pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
          
          {/* Floating success indicator */}
          <div className="absolute top-4 right-4">
            <div className="float-animation">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-white/90 drop-shadow-lg" />
                <div className="absolute inset-0 blur-sm">
                  <Sparkles className="w-8 h-8 text-white/50" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                  <CheckCircle className="h-8 w-8 text-white drop-shadow-sm" />
                </div>
                <div>
                  <CardTitle className="text-white text-xl sm:text-2xl font-bold mb-1">Profile Generated Successfully</CardTitle>
                  <p className="text-white/80 text-xs sm:text-sm">AI analysis completed with high accuracy</p>
                </div>
              </div>
              
              <div className="text-left sm:text-right">
                <Badge className="bg-white/25 text-white border-white/40 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-lg font-semibold">
                  {confidenceScore}% confidence
                </Badge>
                <p className="text-white/70 text-xs mt-1">Quality Score</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-white/90 font-medium">Data Quality Assessment:</span>
              <div className="flex-1 max-w-48">
                <Progress 
                  value={confidenceScore} 
                  className="h-3 bg-white/20 border border-white/30" 
                />
              </div>
              <span className="text-white/80 text-sm font-medium">
                {confidenceScore >= 80 ? 'Excellent' : confidenceScore >= 60 ? 'Good' : 'Fair'}
              </span>
            </div>
          </div>
          
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/10 to-transparent"></div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 lg:p-10">
          <div className="space-y-8 lg:space-y-12">
            {/* Enhanced Profile Information - Mobile Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
              <div className="space-y-6 lg:space-y-8 animate-slide-in-left">
                {/* Premium Basic Info Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 gradient-premium rounded-xl">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">Personal Information</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Extracted profile details</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-3 sm:gap-5">
                    {(profileData.name || isEditing) && (
                      <div className="group p-4 sm:p-6 rounded-xl bg-gradient-to-br from-accent/20 via-accent/10 to-transparent hover:from-accent/30 hover:via-accent/20 hover:to-accent/5 transition-all duration-300 border border-accent/20 hover:border-accent/30 hover-lift">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          Full Name
                        </p>
                        {isEditing ? (
                          <Input
                            value={editedData.name || ''}
                            onChange={(e) => handleFieldChange('name', e.target.value)}
                            className="font-bold text-xl bg-background/50 border-primary/30 focus:border-primary"
                            placeholder="Enter full name"
                          />
                        ) : (
                          <p className="font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors duration-300">{profileData.name}</p>
                        )}
                      </div>
                    )}
                    
                    {(profileData.jobTitle || isEditing) && (
                      <div className="group p-4 sm:p-6 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:from-primary/20 hover:via-primary/10 hover:to-primary/5 transition-all duration-300 border border-primary/20 hover:border-primary/30 hover-lift">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          Profession
                        </p>
                        {isEditing ? (
                          <Input
                            value={editedData.jobTitle || ''}
                            onChange={(e) => handleFieldChange('jobTitle', e.target.value)}
                            className="font-bold text-lg bg-background/50 border-primary/30 focus:border-primary"
                            placeholder="Enter profession(s)"
                          />
                        ) : (
                          <p className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">{profileData.jobTitle}</p>
                        )}
                      </div>
                    )}
                    
                    {(profileData.personalDetails?.birthDate || profileData.personalDetails?.birthYear || isEditing) && (
                      <div className="group p-4 sm:p-6 rounded-xl bg-gradient-to-br from-success/10 via-success/5 to-transparent hover:from-success/20 hover:via-success/10 hover:to-success/5 transition-all duration-300 border border-success/20 hover:border-success/30 hover-lift">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-success"></div>
                          Born
                        </p>
                        {isEditing ? (
                          <Input
                            value={editedData.personalDetails?.birthDate || editedData.personalDetails?.birthYear || ''}
                            onChange={(e) => handleNestedFieldChange('personalDetails', 'birthDate', e.target.value)}
                            className="font-bold text-lg bg-background/50 border-success/30 focus:border-success"
                            placeholder="e.g., December 29, 1972"
                          />
                        ) : (
                          <p className="font-bold text-lg text-foreground group-hover:text-success transition-colors duration-300">
                            {profileData.personalDetails.birthDate || profileData.personalDetails.birthYear}
                          </p>
                        )}
                      </div>
                    )}
                    
                    {(profileData.personalDetails?.birthPlace || isEditing) && (
                      <div className="group p-4 sm:p-6 rounded-xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent hover:from-blue-500/20 hover:via-blue-500/10 hover:to-blue-500/5 transition-all duration-300 border border-blue-500/20 hover:border-blue-500/30 hover-lift">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          Birth Place
                        </p>
                        {isEditing ? (
                          <Input
                            value={editedData.personalDetails?.birthPlace || ''}
                            onChange={(e) => handleNestedFieldChange('personalDetails', 'birthPlace', e.target.value)}
                            className="font-bold text-lg bg-background/50 border-blue-500/30 focus:border-blue-500"
                            placeholder="e.g., London, England, UK"
                          />
                        ) : (
                          <p className="font-bold text-lg text-foreground group-hover:text-blue-500 transition-colors duration-300">{profileData.personalDetails.birthPlace}</p>
                        )}
                      </div>
                    )}

                    {(profileData.personalDetails?.height || isEditing) && (
                      <div className="group p-4 sm:p-6 rounded-xl bg-gradient-to-br from-warning/10 via-warning/5 to-transparent hover:from-warning/20 hover:via-warning/10 hover:to-warning/5 transition-all duration-300 border border-warning/20 hover:border-warning/30 hover-lift">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-warning"></div>
                          Height
                        </p>
                        {isEditing ? (
                          <Input
                            value={editedData.personalDetails?.height || ''}
                            onChange={(e) => handleNestedFieldChange('personalDetails', 'height', e.target.value)}
                            className="font-bold text-lg bg-background/50 border-warning/30 focus:border-warning"
                            placeholder="e.g., 6′ 0″ or 1.83 m"
                          />
                        ) : (
                          <p className="font-bold text-lg text-foreground group-hover:text-warning transition-colors duration-300">{profileData.personalDetails.height}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Skills Section */}
                {profileData.skills && profileData.skills.length > 0 && (
                  <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 gradient-premium rounded-xl">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">Skills & Expertise</h3>
                        <p className="text-sm text-muted-foreground">Professional capabilities</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      {profileData.skills.map((skill, index) => (
                        <Badge 
                          key={index}
                          variant="secondary" 
                          className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/15 to-primary/10 text-primary hover:from-primary/25 hover:to-primary/20 border border-primary/20 hover:border-primary/30 transition-all duration-300 cursor-default hover-lift"
                          style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Description and Personal Details */}
              <div className="space-y-6 lg:space-y-8 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                {/* Premium Biography Section with Expand/Collapse */}
                {(profileData.description || profileData.biography) && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 gradient-premium rounded-xl">
                          <Briefcase className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">Biography</h3>
                          <p className="text-sm text-muted-foreground">Professional overview</p>
                        </div>
                      </div>
                      
                      {(profileData.biography || profileData.description || '').length > 300 && (
                        <Button
                          onClick={() => setIsBiographyExpanded(!isBiographyExpanded)}
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary-hover"
                        >
                          {isBiographyExpanded ? 'Show Less' : 'Read Full Biography'}
                          <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${isBiographyExpanded ? 'rotate-180' : ''}`} />
                        </Button>
                      )}
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-muted/40 via-accent/20 to-muted/30 rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent rounded-2xl"></div>
                      
                      <div className="relative p-8 border border-accent/30 rounded-2xl backdrop-blur-sm">
                        {isEditing ? (
                          <div className="space-y-3">
                            <Textarea
                              value={editedData.biography || editedData.description || ''}
                              onChange={(e) => {
                                handleFieldChange('biography', e.target.value);
                                handleFieldChange('description', e.target.value);
                              }}
                              className="min-h-[200px] text-base font-medium bg-background/50 border-primary/30 focus:border-primary resize-y"
                              placeholder="Enter biography..."
                            />
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                Editing biography
                              </span>
                              <span>{(editedData.biography || editedData.description || '').length} characters</span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="prose prose-sm max-w-none">
                              <div className={`text-muted-foreground leading-relaxed text-base font-medium transition-all duration-300 ${
                                !isBiographyExpanded && (profileData.biography || profileData.description || '').length > 300 
                                  ? 'line-clamp-4 overflow-hidden' 
                                  : ''
                              }`}>
                                {profileData.biography || profileData.description}
                              </div>
                              
                              {!isBiographyExpanded && (profileData.biography || profileData.description || '').length > 300 && (
                                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-background to-transparent rounded-b-2xl pointer-events-none" />
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                <span>Extracted from source</span>
                              </div>
                              
                              <div className="text-xs text-muted-foreground/70">
                                {(profileData.biography || profileData.description || '').length} characters
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Media Gallery - Photos and Videos */}
                {profileData.mediaContent && (profileData.mediaContent.photos?.length > 0 || profileData.mediaContent.videos?.length > 0) && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 gradient-premium rounded-xl">
                        <Camera className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">Media Gallery</h3>
                        <p className="text-sm text-muted-foreground">Photos and videos from IMDB</p>
                      </div>
                    </div>
                    
                    {/* Photos Section */}
                    {profileData.mediaContent.photos && profileData.mediaContent.photos.length > 0 && (
                      <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                          <ImageIcon className="h-5 w-5 text-primary" />
                          <h4 className="font-semibold text-foreground">Photos ({profileData.mediaContent.photos.length})</h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                          {profileData.mediaContent.photos.slice(0, 8).map((photo, index) => (
                            <Dialog key={index}>
                              <DialogTrigger asChild>
                                <div 
                                  className="group relative aspect-square rounded-xl overflow-hidden border-2 border-accent/20 hover:border-primary/50 transition-all duration-300 hover-lift cursor-pointer"
                                  style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                  <img 
                                    src={photo.url} 
                                    alt={photo.alt}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-2 left-2 right-2">
                                      <div className="flex items-center justify-between">
                                        <Badge variant="secondary" className="text-xs bg-black/50 text-white border-0">
                                          Photo {index + 1}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-white">
                                          <Eye className="h-4 w-4" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
                                <div className="relative">
                                  <img 
                                    src={photo.url} 
                                    alt={photo.alt}
                                    className="w-full h-auto max-h-[85vh] object-contain"
                                  />
                                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                    <p className="text-white font-medium">{photo.alt}</p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          ))}
                        </div>
                        {profileData.mediaContent.photos.length > 8 && (
                          <div className="mt-4 text-center">
                            <Badge variant="outline" className="text-sm">
                              +{profileData.mediaContent.photos.length - 8} more photos available
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Videos Section */}
                    {profileData.mediaContent.videos && profileData.mediaContent.videos.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Video className="h-5 w-5 text-primary" />
                          <h4 className="font-semibold text-foreground">Videos ({profileData.mediaContent.videos.length})</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {profileData.mediaContent.videos.slice(0, 4).map((video, index) => (
                            <Dialog key={index}>
                              <DialogTrigger asChild>
                                <div 
                                  className="group relative aspect-video rounded-xl overflow-hidden border-2 border-accent/20 hover:border-primary/50 transition-all duration-300 hover-lift cursor-pointer bg-gradient-to-br from-accent/10 to-accent/5"
                                  style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                  {video.thumbnail ? (
                                    <img 
                                      src={video.thumbnail} 
                                      alt={video.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                      loading="lazy"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10">
                                      <Play className="h-12 w-12 text-primary/60" />
                                    </div>
                                  )}
                                  
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                                    <div className="absolute bottom-3 left-3 right-3">
                                      <h5 className="text-white font-medium text-sm line-clamp-2 mb-2">
                                        {video.title}
                                      </h5>
                                      <div className="flex items-center justify-between">
                                        <Badge variant="secondary" className="text-xs bg-black/50 text-white border-0">
                                          Video
                                        </Badge>
                                        <div className="flex items-center gap-1 text-white">
                                          <Play className="h-4 w-4" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Play button overlay */}
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                                      <Play className="h-6 w-6 text-white ml-1" />
                                    </div>
                                  </div>
                                </div>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] p-4">
                                <div className="space-y-4">
                                  <h3 className="text-lg font-semibold">{video.title}</h3>
                                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                                    {video.thumbnail ? (
                                      <img 
                                        src={video.thumbnail} 
                                        alt={video.title}
                                        className="w-full h-full object-cover rounded-lg"
                                      />
                                    ) : (
                                      <div className="text-center">
                                        <Play className="h-16 w-16 text-primary/60 mx-auto mb-2" />
                                        <p className="text-muted-foreground">Video Preview</p>
                                      </div>
                                    )}
                                  </div>
                                  <div className="text-center">
                                    <Badge variant="outline">{video.source || 'IMDB'}</Badge>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          ))}
                        </div>
                        {profileData.mediaContent.videos.length > 4 && (
                          <div className="mt-4 text-center">
                            <Badge variant="outline" className="text-sm">
                              +{profileData.mediaContent.videos.length - 4} more videos available
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Family/Relatives */}
                {profileData.personalDetails?.relatives && profileData.personalDetails.relatives.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 gradient-premium rounded-xl">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">Family</h3>
                        <p className="text-sm text-muted-foreground">Related individuals</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {profileData.personalDetails.relatives.map((relative, index) => (
                        <div key={index} className="group p-4 rounded-xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent hover:from-accent/20 hover:via-accent/10 hover:to-accent/5 transition-all duration-300 border border-accent/20 hover:border-accent/30 hover-lift">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-foreground">{relative.name}</span>
                            <Badge variant="outline" className="text-xs">{relative.relationship}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Work Section with Filter */}
            {profileData.knownFor && profileData.knownFor.length > 0 && (
              <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 gradient-premium rounded-xl">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Featured Work</h3>
                    <p className="text-sm text-muted-foreground">Highlighted projects and achievements</p>
                  </div>
                </div>

                {/* Filter Component for Featured Work */}
                {profileData.knownFor.length > 3 && (
                  <div className="mb-6">
                    <ProjectsFilter
                      items={profileData.knownFor}
                      onFilteredItemsChange={useCallback((filtered: any[]) => setFilteredFeaturedWork(filtered), [])}
                      placeholder="Search featured work..."
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredFeaturedWork.map((work, index) => (
                    <div 
                      key={index} 
                      className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 shadow-md hover:shadow-xl-premium transition-all duration-300 hover-lift cursor-pointer"
                      onClick={() => {
                        setSelectedProject(work);
                        setIsProjectModalOpen(true);
                      }}
                    >
                      {/* Project Cover Image */}
                      <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 overflow-hidden">
                        {work.coverImage ? (
                          <img 
                            src={work.coverImage} 
                            alt={work.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Film className="w-16 h-16 text-primary/30" />
                          </div>
                        )}
                        
                        {/* Rating Badge Overlay */}
                        {work.rating && work.rating !== 'N/A' && (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-black/70 text-white border-0 backdrop-blur-sm">
                              ⭐ {work.rating}
                            </Badge>
                          </div>
                        )}
                        
                        {/* Click to view overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Eye className="w-12 h-12 text-white" />
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5">
                        <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300 mb-2 line-clamp-2">
                          {work.title}
                        </h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                          {work.year && work.year !== 'N/A' && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {work.year}
                            </span>
                          )}
                          {work.role && work.role !== 'N/A' && (
                            <span className="font-medium text-primary/80">{work.role}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Section with Filter */}
            {profileData.filmography && profileData.filmography.length > 0 && (
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 gradient-premium rounded-xl">
                    <Film className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Projects</h3>
                    <p className="text-sm text-muted-foreground">All work and contributions ({profileData.filmography.length} entries)</p>
                  </div>
                </div>

                {/* Filter Component for Projects */}
                <div className="mb-6">
                  <ProjectsFilter
                    items={profileData.filmography}
                    onFilteredItemsChange={useCallback((filtered: any[]) => setFilteredProjects(filtered), [])}
                    placeholder="Search projects by title, role, or year..."
                  />
                </div>
                
                <div className="grid gap-3 max-h-96 overflow-y-auto pr-2">
                  {filteredProjects.map((project, index) => (
                    <div 
                      key={index} 
                      className="group p-5 rounded-xl bg-card border border-border hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300 hover-lift cursor-pointer"
                      onClick={() => {
                        setSelectedProject(project);
                        setIsProjectModalOpen(true);
                      }}
                    >
                      <div className="flex gap-4 items-start">
                        {/* Project Icon/Thumbnail */}
                        <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20">
                          {project.coverImage ? (
                            <img 
                              src={project.coverImage} 
                              alt={project.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <Film className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                          )}
                        </div>
                        
                        {/* Project Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                            {project.title}
                          </h4>
                          <div className="flex gap-3 text-sm text-muted-foreground mt-1.5 flex-wrap items-center">
                            {project.year && project.year !== 'N/A' && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {project.year}
                              </span>
                            )}
                            {project.role && project.role !== 'N/A' && (
                              <span className="font-medium">{project.role}</span>
                            )}
                            {project.type && project.type !== 'N/A' && (
                              <Badge variant="outline" className="text-xs">{project.type}</Badge>
                            )}
                          </div>
                        </div>
                        
                        {/* Click indicator */}
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Eye className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trivia Section */}
            {profileData.trivia && profileData.trivia.length > 0 && (
              <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 gradient-premium rounded-xl">
                    <Info className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Trivia</h3>
                    <p className="text-sm text-muted-foreground">Interesting facts</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {profileData.trivia.map((fact, index) => (
                    <div key={index} className="group p-6 rounded-xl bg-gradient-to-br from-warning/10 via-warning/5 to-transparent hover:from-warning/20 hover:via-warning/10 hover:to-warning/5 transition-all duration-300 border border-warning/20 hover:border-warning/30 hover-lift">
                      <p className="text-muted-foreground leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Source Information */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 gradient-premium rounded-xl">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Source Information</h3>
                  <p className="text-sm text-muted-foreground">Analysis metadata</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group p-6 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:from-primary/20 hover:via-primary/10 hover:to-primary/5 transition-all duration-300 border border-primary/20 hover:border-primary/30 hover-lift">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    Original URL
                  </p>
                  <a 
                    href={profileData.sourceUrl || profileData.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-hover font-semibold flex items-center gap-3 group-hover:gap-4 transition-all duration-300 hover-glow rounded-lg p-2 -m-2"
                  >
                    <span className="truncate text-sm">{profileData.sourceUrl || profileData.url}</span>
                    <ExternalLink className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
                
                <div className="group p-6 rounded-xl bg-gradient-to-br from-success/10 via-success/5 to-transparent hover:from-success/20 hover:via-success/10 hover:to-success/5 transition-all duration-300 border border-success/20 hover:border-success/30 hover-lift">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    Generated
                  </p>
                  <p className="font-semibold flex items-center gap-3 text-foreground group-hover:text-success transition-colors duration-300">
                    <Calendar className="h-5 w-5 text-success" />
                    {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Action Buttons - Mobile Responsive */}
            <div className="space-y-4 pt-6 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Button 
                  onClick={onExport}
                  className="h-14 text-sm font-bold rounded-xl gradient-premium hover:gradient-shift shadow-glow hover:shadow-xl-premium hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <div className="text-left">
                      <div>Export JSON</div>
                      <div className="text-xs opacity-90 font-normal">Raw Data</div>
                    </div>
                  </div>
                </Button>

                {isEditing ? (
                  <>
                    <Button 
                      onClick={handleSaveChanges}
                      className="h-14 text-sm font-bold rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-glow hover:shadow-xl-premium hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        <div className="text-left">
                          <div>Save Changes</div>
                          <div className="text-xs opacity-90 font-normal">
                            {hasUnsavedChanges ? 'Unsaved changes' : 'No changes'}
                          </div>
                        </div>
                      </div>
                    </Button>

                    <Button 
                      onClick={handleCancelEdit}
                      variant="outline"
                      className="h-14 text-sm font-semibold rounded-xl hover:bg-accent/50 border-2 border-border hover:border-destructive/30 hover-lift transition-all duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4" />
                        <div className="text-left">
                          <div>Cancel Edit</div>
                          <div className="text-xs opacity-70 font-normal">Discard changes</div>
                        </div>
                      </div>
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    variant="default"
                    className="h-14 text-sm font-semibold rounded-xl hover:bg-accent/50 border-2 border-border hover:border-primary/30 hover-lift transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <Edit3 className="w-4 h-4" />
                      <div className="text-left">
                        <div>Edit Profile</div>
                        <div className="text-xs opacity-70 font-normal">Modify details</div>
                      </div>
                    </div>
                  </Button>
                )}

                <Button 
                  onClick={handlePDFExport}
                  disabled={isGeneratingPDF}
                  className="h-14 text-sm font-bold rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-glow hover:shadow-xl-premium hover:scale-105 transition-all duration-300 disabled:opacity-50"
                >
                  <div className="flex items-center gap-2">
                    {isGeneratingPDF ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    <div className="text-left">
                      <div>Export PDF</div>
                      <div className="text-xs opacity-90 font-normal">
                        {isGeneratingPDF ? 'Generating...' : 'Portfolio'}
                      </div>
                    </div>
                  </div>
                </Button>
                
                <Button 
                  onClick={onTryAnother}
                  variant="outline"
                  className="h-14 text-sm font-semibold rounded-xl hover:bg-accent/50 border-2 border-border hover:border-primary/30 hover-lift transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    <div className="text-left">
                      <div>Try Another</div>
                      <div className="text-xs opacity-70 font-normal">New Analysis</div>
                    </div>
                  </div>
                </Button>
              </div>
              
              <p className="text-center text-xs text-muted-foreground/70 px-4">
                Comprehensive IMDB profile • {confidenceScore}% accuracy • ScrapingBee powered
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Modals */}
      {selectedProject && (
        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => {
            setIsProjectModalOpen(false);
            setSelectedProject(null);
          }}
          project={selectedProject}
        />
      )}
      
      {profileData.mediaContent?.photos && (
        <PhotoGalleryModal
          isOpen={isPhotoGalleryOpen}
          onClose={() => setIsPhotoGalleryOpen(false)}
          photos={profileData.mediaContent.photos}
          initialIndex={selectedPhotoIndex}
        />
      )}
    </div>
  );
};