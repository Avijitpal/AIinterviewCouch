import React, { useState } from 'react';
import { useInterviewStore } from '@/store/useInterviewStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { startInterview } from '@/services/api';


export default function JDInputForm() {
  const setJobInfo = useInterviewStore((state) => state.setJobInfo);
  const [form, setForm] = useState({ role: '', company: '', jd: '' });
  const setQuestions = useInterviewStore((state) => state.setQuestions);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const result = await startInterview(form); // This calls your Gemini backend
    if (result.questions) {
      setQuestions(result.questions); // Save AI questions to Zustand
    }
  } catch (error) {
    console.error("Failed to start interview:", error);
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-xl shadow-2xl border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Interview Context
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Target Role</Label>
                <Input 
                  id="role" 
                  placeholder="e.g. Frontend Engineer" 
                  value={form.role}
                  onChange={(e) => setForm({...form, role: e.target.value})}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  placeholder="e.g. Google" 
                  value={form.company}
                  onChange={(e) => setForm({...form, company: e.target.value})}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="jd">Job Description</Label>
              <Textarea 
                id="jd" 
                placeholder="Paste the requirements here..." 
                rows={6}
                value={form.jd}
                onChange={(e) => setForm({...form, jd: e.target.value})}
                className="bg-zinc-800 border-zinc-700 resize-none"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6">
              Analyze & Start Prep
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}