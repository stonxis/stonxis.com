'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState("all");
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [selectedSection, setSelectedSection] = useState("language");
  const [fontSize, setFontSize] = useState(16);
  const [autoSave, setAutoSave] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const saveSettings = (section: string, value: any) => {
    if (section === 'appearance' && value.theme) {
      setTheme(value.theme);
      localStorage.setItem('theme', value.theme);
    } else if (section === 'accessibility' && value.fontSize) {
      document.documentElement.style.setProperty('--base-font-size', `${value.fontSize}px`);
      localStorage.setItem('fontSize', value.fontSize.toString());
    }

    localStorage.setItem(section, JSON.stringify(value));
    toast.success(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved!`);
  };

  const handleSettingChange = (section: string, value: any) => {
    if (autoSave) {
      saveSettings(section, value);
    }
  };

  const handleSave = (section: string, value: any) => {
    saveSettings(section, value);
  };

  useEffect(() => {
    setMounted(true);
    
    const savedTheme = localStorage.getItem('theme');
    const savedFontSize = localStorage.getItem('fontSize');
    
    if (savedTheme) {
      setSelectedTheme(savedTheme);
      setTheme(savedTheme);
    }
    
    if (savedFontSize) {
      const size = parseInt(savedFontSize);
      setFontSize(size);
      document.documentElement.style.setProperty('--base-font-size', `${size}px`);
    }
  }, [setTheme]);

  useEffect(() => {
    if (mounted && selectedTheme) {
      handleSettingChange('appearance', { theme: selectedTheme });
    }
  }, [selectedTheme, mounted]);

  useEffect(() => {
    if (mounted) {
      handleSettingChange('accessibility', { fontSize });
    }
  }, [fontSize, mounted]);

  if (!mounted) return null;

  const sections = [
    'language',
    'notifications',
    'appearance',
    'accessibility',
    'preferences'
  ];

  const scrollToSection = (id: string) => {
    setSelectedSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = window.innerWidth >= 1024 ? 20 : 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const NavigationLinks = () => (
    <>
      <div className="lg:hidden">
        <Select value={selectedSection} onValueChange={scrollToSection}>
          <SelectTrigger className="w-full flex items-center justify-between">
            <SelectValue>
              {selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {sections.map((section) => (
              <SelectItem key={section} value={section}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="hidden lg:flex lg:flex-col lg:space-y-2">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`text-left px-4 py-2 rounded-lg transition-colors ${
              selectedSection === section 
                ? '' 
                : 'text-current/50'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>
    </>
  );

  return (
    <>
      <div className="border-b lg:hidden fixed top-15 left-0 right-0 z-10 bg-background p-4">
        <div className="container mx-auto max-w-6xl">
          <NavigationLinks />
        </div>
      </div>
      <main className="container mx-auto px-4 max-w-6xl pb-20">
        <div className="flex justify-between flex-col gap-4 lg:flex-row 2xl:mt-12 lg:mt-4">
          <div className="hidden lg:block sticky top-20 h-fit">
            <NavigationLinks />
          </div>

          <div className="space-y-8 flex-1 max-w-3xl mx-auto lg:mx-0 mt-24 lg:mt-12">
            {sections.map((section) => (
              <section
                key={section}
                id={section}
                className="space-y-6"
              >
                <div className="border rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1px_1fr] gap-8">
                    <div className="space-y-4">
                      <h3 className="font-medium text-xl capitalize">{section}</h3>
                      <p className="text-sm text-muted-foreground">
                        {section === 'language' && "Choose your preferred language for the platform interface."}
                        {section === 'notifications' && "Configure how you want to receive notifications from the platform."}
                        {section === 'appearance' && "Customize the appearance of the platform by selecting the theme that best suits your style."}
                        {section === 'accessibility' && "Adjust settings to make the platform more accessible for you."}
                        {section === 'preferences' && "Configure general platform preferences and behavior."}
                      </p>
                    </div>
                    <Separator className="hidden md:block" orientation="vertical" />
                    <div className="flex flex-col gap-6">
                      <div className="w-full">
                        {section === 'language' && (
                          <Select value={language} onValueChange={(value) => {
                            setLanguage(value);
                            handleSettingChange('language', value);
                          }}>
                            <SelectTrigger className="w-full cursor-pointer">
                              <SelectValue>
                                {language === 'en' ? 'English' : language === 'pt' ? 'Portuguese' : 'Spanish'}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="pt">Portuguese</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                            </SelectContent>
                          </Select>
                        )}

                        {section === 'notifications' && (
                          <div className="space-y-4 w-full">
                            <div className="flex items-center justify-between">
                              <span>Email Notifications</span>
                              <Switch
                                checked={emailNotifications}
                                onCheckedChange={(checked) => {
                                  setEmailNotifications(checked);
                                  handleSettingChange('notifications', { 
                                    notifications, 
                                    email: checked, 
                                    push: pushNotifications 
                                  });
                                }}
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Push Notifications</span>
                              <Switch
                                checked={pushNotifications}
                                onCheckedChange={(checked) => {
                                  setPushNotifications(checked);
                                  handleSettingChange('notifications', { 
                                    notifications, 
                                    email: emailNotifications, 
                                    push: checked 
                                  });
                                }}
                              />
                            </div>
                            <Select 
                              value={notifications} 
                              onValueChange={(value) => {
                                setNotifications(value);
                                handleSettingChange('notifications', {
                                  notifications: value,
                                  email: emailNotifications,
                                  push: pushNotifications
                                });
                              }}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {notifications === 'all' ? 'All notifications' :
                                    notifications === 'important' ? 'Important only' : 'None'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All notifications</SelectItem>
                                <SelectItem value="important">Important only</SelectItem>
                                <SelectItem value="none">None</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {section === 'appearance' && (
                          <Select 
                            value={selectedTheme} 
                            onValueChange={(value) => {
                              setSelectedTheme(value);
                              handleSettingChange('appearance', { theme: value });
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue>
                                {selectedTheme === 'light' ? 'Light' :
                                  selectedTheme === 'dark' ? 'Dark' : 'System'}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                        )}

                        {section === 'accessibility' && (
                          <div className="space-y-4 w-full">
                            <div className="space-y-2">
                              <label className="text-sm">Font Size</label>
                              <Slider
                                value={[fontSize]}
                                onValueChange={([value]) => {
                                  setFontSize(value);
                                  handleSettingChange('accessibility', { fontSize: value });
                                }}
                                min={12}
                                max={24}
                                step={1}
                              />
                              <span className="text-xs text-muted-foreground">
                                Current size: {fontSize}px
                              </span>
                            </div>
                          </div>
                        )}

                        {section === 'preferences' && (
                          <div className="space-y-4 w-full">
                            <div className="flex items-center justify-between">
                              <span>Auto-save</span>
                              <Switch
                                checked={autoSave}
                                onCheckedChange={(checked) => {
                                  setAutoSave(checked);
                                  handleSettingChange('preferences', { autoSave: checked });
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {!autoSave && (
                        <button
                          onClick={() => handleSave(section,
                            section === 'language' ? language :
                              section === 'notifications' ? { notifications, email: emailNotifications, push: pushNotifications } :
                                section === 'appearance' ? { theme: selectedTheme } :
                                  section === 'accessibility' ? { fontSize } :
                                    { autoSave }
                          )}
                          className="py-3 px-12 border rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-full"
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
