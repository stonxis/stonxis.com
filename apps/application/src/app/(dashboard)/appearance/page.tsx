'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes";

export default function AppearancePage() {
  const { theme, setTheme } = useTheme()

  return (
    <section className="appearance-section space-y-6">
      <h1 className="text-2xl font-semibold">Appearance</h1>
      <div className="border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1px_1fr] gap-6">
          <div className="space-y-2">
            <h3 className="font-medium">Theme preferences</h3>
            <p className="text-sm text-muted-foreground">
              Customize the appearance of the platform by selecting the theme that best suits your style and visual comfort. Switch between light and dark modes or adjust color preferences to fit your needs.
            </p>
          </div>
          <Separator className="hidden md:block" orientation="vertical" />
          <div className="flex items-center justify-start md:justify-center">
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-[180px] cursor-pointer">
                <SelectValue>
                  {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light" className="cursor-pointer">Light</SelectItem>
                <SelectItem value="dark" className="cursor-pointer">Dark</SelectItem>
                <SelectItem value="system" className="cursor-pointer">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}
