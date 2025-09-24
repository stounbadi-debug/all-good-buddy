import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
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
  Database,
  Globe,
  Edit3,
  Save,
  X,
  Trash2,
  Plus,
  Image,
  Play,
  Camera,
  Video,
  FileText,
  Eye,
  EyeOff
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MediaContent {
  photos: Array<{ url: string; alt: string; type: string }>;
  videos: Array<{ url: string; title: string; type: string; thumbnail?: string }>;
  trailers: Array<{ url: string; title: string; type: string; thumbnail?: string }>;
}

interface ProfileData {
  name?: string;
  description?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  image?: string;
  skills?: string[];
  projects?: Array<{ name: string; role?: string; year?: string; rating?: string }>;
  experience?: Array<{ company: string; position: string; duration?: string }>;
  knownFor?: Array<{ title: string; year?: string; role?: string; rating?: string }>;
  credits?: Array<{ title: string; year?: string; role?: string; type?: string; department?: string }>;
  mediaContent?: MediaContent;
  personalDetails?: {
    birthYear?: string;
    birthPlace?: string;
    height?: string;
    relatives?: Array<{ name: string; relationship: string }>;
  };
  trivia?: string[];
  biography?: string;
  confidence: number;
  sourceUrl: string;
  generatedAt: string;
  dataQuality?: {
    completeness: number;
    accuracy: number;
    consistency: number;
  };
  warnings?: string[];
  errors?: string[];
}

interface EnhancedProfileResultCardProps {
  profileData: ProfileData;
  onTryAnother: () => void;
  onExport: () => void;
  processingMode?: 'scrapingbee' | 'backend';
  onProfileUpdate?: (updatedProfile: ProfileData) => void;
}

export const EnhancedProfileResultCard: React.FC<EnhancedProfileResultCardProps> = ({ 
  profileData, 
  onTryAnother, 
  onExport, 
  processingMode = 'scrapingbee',
  onProfileUpdate
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profileData);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const confidenceValue = profileData?.confidence ?? 0.5;
  const confidenceColor = confidenceValue >= 0.8 ? 'text-green-600' : 
                         confidenceValue >= 0.6 ? 'text-yellow-600' : 'text-red-600';

  const handleSave = () => {
    if (onProfileUpdate) {
      onProfileUpdate(editedProfile);
    }
    setEditMode(false);
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setEditedProfile(profileData);
    setEditMode(false);
  };

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const removeArrayItem = (field: keyof ProfileData, index: number) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: (prev[field] as any[])?.filter((_, i) => i !== index)
    }));
  };

  const addArrayItem = (field: keyof ProfileData, newItem: any) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: [...(prev[field] as any[] || []), newItem]
    }));
  };

  return (
    <div className="animate-fade-in-up space-y-6 max-w-6xl mx-auto p-6">
      {/* Success Header with Edit Controls */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-green-800">Artist Profile Generated Successfully!</h2>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  {processingMode === 'backend' ? (
                    <>
                      <Database className="w-4 h-4" />
                      <span>Generated using Ujjual's AI Backend</span>
                    </>
                  ) : (
                    <>
                      <Globe className="w-4 h-4" />
                      <span>Generated using ScrapingBee + Enhanced AI</span>
                    </>
                  )}
                  <span className="mx-2">•</span>
                  <span className={`font-bold ${confidenceColor}`}>
                    {Math.round(confidenceValue * 100)}% confidence
                  </span>
                </div>
              </div>
            </CardTitle>
            
            <div className="flex gap-2">
              {!editMode ? (
                <Button onClick={() => setEditMode(true)} variant="outline" size="sm">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Profile Information */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Basic Info & Image */}
        <div className="space-y-6">
          <Card className="shadow-xl-premium border-0 glass-premium backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Artist Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Profile Image */}
              {editedProfile.image && (
                <div className="text-center">
                  <img 
                    src={editedProfile.image} 
                    alt={editedProfile.name} 
                    className="w-48 h-48 object-cover rounded-xl mx-auto shadow-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Name */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                {editMode ? (
                  <Input 
                    value={editedProfile.name || ''} 
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-xl font-bold">{editedProfile.name}</p>
                )}
              </div>

              {/* Job Title */}
              {editedProfile.jobTitle && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Profession</label>
                  {editMode ? (
                    <Input 
                      value={editedProfile.jobTitle || ''} 
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, jobTitle: e.target.value }))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-lg text-primary font-semibold">{editedProfile.jobTitle}</p>
                  )}
                </div>
              )}

              {/* Personal Details */}
              {editedProfile.personalDetails && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Personal Details</label>
                  <div className="space-y-1 text-sm">
                    {editedProfile.personalDetails.birthYear && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Born: {editedProfile.personalDetails.birthYear}</span>
                      </div>
                    )}
                    {editedProfile.personalDetails.birthPlace && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{editedProfile.personalDetails.birthPlace}</span>
                      </div>
                    )}
                    {editedProfile.personalDetails.height && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>Height: {editedProfile.personalDetails.height}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Media Gallery */}
          {editedProfile.mediaContent && (
            <Card className="shadow-xl-premium border-0 glass-premium backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Media Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Photos */}
                {editedProfile.mediaContent.photos?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Image className="w-4 h-4" />
                      Photos ({editedProfile.mediaContent.photos.length})
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {editedProfile.mediaContent.photos.slice(0, 6).map((photo, index) => (
                        <img 
                          key={index}
                          src={photo.url} 
                          alt={photo.alt}
                          className="w-full h-20 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                          onClick={() => window.open(photo.url, '_blank')}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Videos & Trailers */}
                {(editedProfile.mediaContent.videos?.length > 0 || editedProfile.mediaContent.trailers?.length > 0) && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      Videos & Trailers ({(editedProfile.mediaContent.videos?.length || 0) + (editedProfile.mediaContent.trailers?.length || 0)})
                    </h4>
                    <div className="space-y-2">
                      {editedProfile.mediaContent.trailers?.map((trailer, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                          <Play className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{trailer.title}</span>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => window.open(trailer.url, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                      {editedProfile.mediaContent.videos?.slice(0, 3).map((video, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                          <Video className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{video.title}</span>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => window.open(video.url, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Biography & Career */}
        <div className="lg:col-span-2 space-y-6">
          {/* Biography */}
          <Card className="shadow-xl-premium border-0 glass-premium backdrop-blur-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Biography
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection('biography')}
                >
                  {collapsedSections.biography ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>
            {!collapsedSections.biography && (
              <CardContent>
                {editMode ? (
                  <textarea 
                    value={editedProfile.description || ''} 
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full h-32 p-3 border rounded-lg resize-none"
                    placeholder="Enter biography..."
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {editedProfile.description || 'No biography available.'}
                  </p>
                )}
              </CardContent>
            )}
          </Card>

          {/* Known For */}
          {editedProfile.knownFor && editedProfile.knownFor.length > 0 && (
            <Card className="shadow-xl-premium border-0 glass-premium backdrop-blur-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Known For
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection('knownFor')}
                  >
                    {collapsedSections.knownFor ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              {!collapsedSections.knownFor && (
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {editedProfile.knownFor.map((item, index) => (
                      <div key={index} className="p-4 bg-muted/30 rounded-lg relative group">
                        {editMode && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                            onClick={() => removeArrayItem('knownFor', index)}
                          >
                            <Trash2 className="w-3 h-3 text-destructive" />
                          </Button>
                        )}
                        <div className="flex items-start gap-3">
                          <Film className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.title}</h4>
                            {item.year && (
                              <Badge variant="secondary" className="text-xs mt-1">
                                {item.year}
                              </Badge>
                            )}
                            {item.role && (
                              <p className="text-sm text-muted-foreground mt-1">
                                as {item.role}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          )}

          {/* Filmography */}
          {editedProfile.credits && editedProfile.credits.length > 0 && (
            <Card className="shadow-xl-premium border-0 glass-premium backdrop-blur-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Film className="w-5 h-5" />
                    Complete Filmography ({editedProfile.credits.length})
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection('credits')}
                  >
                    {collapsedSections.credits ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              {!collapsedSections.credits && (
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {editedProfile.credits.map((credit, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg group">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{credit.title}</h4>
                            {credit.year && (
                              <Badge variant="outline" className="text-xs">
                                {credit.year}
                              </Badge>
                            )}
                            {credit.department && (
                              <Badge variant="secondary" className="text-xs">
                                {credit.department}
                              </Badge>
                            )}
                          </div>
                          {credit.role && (
                            <p className="text-sm text-muted-foreground">
                              {credit.role}
                            </p>
                          )}
                        </div>
                        {editMode && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="opacity-0 group-hover:opacity-100"
                            onClick={() => removeArrayItem('credits', index)}
                          >
                            <Trash2 className="w-3 h-3 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-6">
        <Button onClick={onTryAnother} variant="outline" size="lg">
          <RefreshCw className="w-5 h-5 mr-2" />
          Try Another Profile
        </Button>
        <Button onClick={onExport} size="lg" className="gradient-premium hover:gradient-shift">
          <Download className="w-5 h-5 mr-2" />
          Export Profile
        </Button>
      </div>
    </div>
  );
};
