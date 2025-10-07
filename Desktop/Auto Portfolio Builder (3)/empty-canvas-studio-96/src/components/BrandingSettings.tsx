import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Palette, Upload, Eye, Download, RotateCcw, CheckCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface BrandingConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  logoUrl: string;
  companyName: string;
  customDomain?: string;
  enabled: boolean;
}

const DEFAULT_BRANDING: BrandingConfig = {
  primaryColor: '#1a1a1a',
  secondaryColor: '#6366f1',
  accentColor: '#8b5cf6',
  textColor: '#ffffff',
  logoUrl: '',
  companyName: 'Auto Portfolio Builder',
  customDomain: '',
  enabled: false,
};

export const BrandingSettings: React.FC = () => {
  const [branding, setBranding] = useState<BrandingConfig>(DEFAULT_BRANDING);
  const [preview, setPreview] = useState(false);
  const { toast } = useToast();

  // Load branding from localStorage on mount
  useEffect(() => {
    const savedBranding = localStorage.getItem('brandingConfig');
    if (savedBranding) {
      try {
        const parsed = JSON.parse(savedBranding);
        setBranding(parsed);
        if (parsed.enabled) {
          applyBranding(parsed);
        }
      } catch (error) {
        console.error('Failed to load branding config:', error);
      }
    }
  }, []);

  // Apply branding to document
  const applyBranding = (config: BrandingConfig) => {
    const root = document.documentElement;
    root.style.setProperty('--brand-primary', config.primaryColor);
    root.style.setProperty('--brand-secondary', config.secondaryColor);
    root.style.setProperty('--brand-accent', config.accentColor);
    root.style.setProperty('--brand-text', config.textColor);
  };

  // Remove branding from document
  const removeBranding = () => {
    const root = document.documentElement;
    root.style.removeProperty('--brand-primary');
    root.style.removeProperty('--brand-secondary');
    root.style.removeProperty('--brand-accent');
    root.style.removeProperty('--brand-text');
  };

  // Handle branding update
  const handleUpdate = (field: keyof BrandingConfig, value: string | boolean) => {
    const updated = { ...branding, [field]: value };
    setBranding(updated);
    
    if (preview || updated.enabled) {
      applyBranding(updated);
    }
  };

  // Save branding configuration
  const handleSave = () => {
    try {
      localStorage.setItem('brandingConfig', JSON.stringify(branding));
      if (branding.enabled) {
        applyBranding(branding);
      } else {
        removeBranding();
      }
      toast({
        title: 'Branding Saved',
        description: 'Your white-label branding has been saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save branding configuration.',
        variant: 'destructive',
      });
    }
  };

  // Reset to default
  const handleReset = () => {
    setBranding(DEFAULT_BRANDING);
    removeBranding();
    localStorage.removeItem('brandingConfig');
    toast({
      title: 'Reset Complete',
      description: 'Branding has been reset to default.',
    });
  };

  // Export configuration
  const handleExport = () => {
    const dataStr = JSON.stringify(branding, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'branding-config.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: 'Export Complete',
      description: 'Branding configuration has been exported.',
    });
  };

  // Handle logo upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'Logo file must be less than 2MB.',
        variant: 'destructive',
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload an image file (PNG, SVG, or JPG).',
        variant: 'destructive',
      });
      return;
    }

    // Read file and create data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const logoUrl = e.target?.result as string;
      handleUpdate('logoUrl', logoUrl);
      toast({
        title: 'Logo Uploaded',
        description: 'Your logo has been uploaded successfully.',
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              White-Label Branding
            </CardTitle>
            <CardDescription>
              Customize the platform with your brand colors and logo
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={branding.enabled}
              onCheckedChange={(checked) => handleUpdate('enabled', checked)}
            />
            <Label>Enable Branding</Label>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="logo">Logo & Identity</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={branding.primaryColor}
                    onChange={(e) => handleUpdate('primaryColor', e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={branding.primaryColor}
                    onChange={(e) => handleUpdate('primaryColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={branding.secondaryColor}
                    onChange={(e) => handleUpdate('secondaryColor', e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={branding.secondaryColor}
                    onChange={(e) => handleUpdate('secondaryColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accentColor">Accent Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="accentColor"
                    type="color"
                    value={branding.accentColor}
                    onChange={(e) => handleUpdate('accentColor', e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={branding.accentColor}
                    onChange={(e) => handleUpdate('accentColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="textColor">Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="textColor"
                    type="color"
                    value={branding.textColor}
                    onChange={(e) => handleUpdate('textColor', e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={branding.textColor}
                    onChange={(e) => handleUpdate('textColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Colors will be applied to buttons, headers, and other UI elements throughout the platform.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="logo" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={branding.companyName}
                onChange={(e) => handleUpdate('companyName', e.target.value)}
                placeholder="Your Company Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customDomain">Custom Domain (Optional)</Label>
              <Input
                id="customDomain"
                value={branding.customDomain || ''}
                onChange={(e) => handleUpdate('customDomain', e.target.value)}
                placeholder="yourdomain.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Logo Upload</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('logo-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Recommended: PNG or SVG, max 2MB, min 100x100px
              </p>
            </div>

            {branding.logoUrl && (
              <div className="space-y-2">
                <Label>Logo Preview</Label>
                <div className="border rounded-lg p-4 bg-white flex items-center justify-center h-32">
                  <img
                    src={branding.logoUrl}
                    alt="Company Logo"
                    className="max-h-24 max-w-full object-contain"
                  />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <Label>Real-time Preview</Label>
              <Switch
                checked={preview}
                onCheckedChange={setPreview}
              />
            </div>

            <div className="border rounded-lg p-6 space-y-4" style={{
              backgroundColor: preview ? branding.primaryColor : undefined,
              color: preview ? branding.textColor : undefined,
            }}>
              {branding.logoUrl && (
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={branding.logoUrl}
                    alt="Logo"
                    className="h-12 object-contain"
                  />
                  <h2 className="text-2xl font-bold">{branding.companyName}</h2>
                </div>
              )}

              <div className="space-y-2">
                <Button
                  style={{
                    backgroundColor: preview ? branding.secondaryColor : undefined,
                    color: preview ? branding.textColor : undefined,
                  }}
                >
                  Primary Button
                </Button>
                <Button
                  variant="outline"
                  style={{
                    borderColor: preview ? branding.accentColor : undefined,
                    color: preview ? branding.accentColor : undefined,
                  }}
                >
                  Secondary Button
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Sample Card</CardTitle>
                  <CardDescription>This is how content cards will look</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Sample content with your branding applied.</p>
                </CardContent>
              </Card>
            </div>

            {preview && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Preview mode is active. Save your settings to apply them permanently.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex items-center gap-2 pt-4 border-t">
          <Button onClick={handleSave} className="flex-1">
            <CheckCircle className="h-4 w-4 mr-2" />
            Save Branding
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

