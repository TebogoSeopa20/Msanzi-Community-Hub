import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Briefcase, MapPin, Clock, DollarSign, TrendingUp, FileText, MessageCircle, BookOpen, Download, Star, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JobBoard = () => {
  const { toast } = useToast();
  const [cvDialogOpen, setCvDialogOpen] = useState(false);
  const [interviewDialogOpen, setInterviewDialogOpen] = useState(false);
  const [skillsDialogOpen, setSkillsDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showCvForm, setShowCvForm] = useState(false);

  // CV Form state
  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      summary: ""
    },
    experience: [
      {
        jobTitle: "",
        company: "",
        duration: "",
        description: ""
      }
    ],
    education: [
      {
        degree: "",
        institution: "",
        year: "",
        description: ""
      }
    ],
    skills: [""],
    languages: [""],
    references: [
      {
        name: "",
        position: "",
        company: "",
        contact: ""
      }
    ]
  });

  const jobs = [
    {
      title: "Software Developer",
      company: "TechSA Solutions",
      location: "Cape Town",
      type: "Full-time",
      salary: "R35,000 - R45,000",
      posted: "2 days ago",
      skills: ["React", "TypeScript", "Node.js"]
    },
    {
      title: "Marketing Assistant",
      company: "Digital Africa",
      location: "Johannesburg",
      type: "Part-time",
      salary: "R15,000 - R20,000",
      posted: "3 days ago",
      skills: ["Social Media", "Content Creation", "Analytics"]
    },
    {
      title: "Electrical Technician",
      company: "Power Solutions",
      location: "Durban",
      type: "Contract",
      salary: "R25,000 - R30,000",
      posted: "1 day ago",
      skills: ["Electrical Systems", "Maintenance", "Safety"]
    },
    {
      title: "Customer Service Rep",
      company: "Call Centre Plus",
      location: "Remote",
      type: "Full-time",
      salary: "R12,000 - R18,000",
      posted: "5 days ago",
      skills: ["Communication", "Problem Solving", "CRM"]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time": return "bg-green-100 text-green-700";
      case "Part-time": return "bg-blue-100 text-blue-700";
      case "Contract": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const cvTemplates = [
    { name: "Professional", description: "Clean and corporate design", popularity: 5 },
    { name: "Creative", description: "Modern and visually appealing", popularity: 4 },
    { name: "Simple", description: "Minimalist and easy to read", popularity: 5 },
    { name: "Executive", description: "For senior positions", popularity: 3 }
  ];

  const handleTemplateSelect = (templateName: string) => {
    setSelectedTemplate(templateName);
    setShowCvForm(true);
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, { jobTitle: "", company: "", duration: "", description: "" }]
    }));
  };

  const removeExperience = (index: number) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", year: "", description: "" }]
    }));
  };

  const removeEducation = (index: number) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    setCvData(prev => ({
      ...prev,
      skills: [...prev.skills, ""]
    }));
  };

  const removeSkill = (index: number) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addLanguage = () => {
    setCvData(prev => ({
      ...prev,
      languages: [...prev.languages, ""]
    }));
  };

  const removeLanguage = (index: number) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const addReference = () => {
    setCvData(prev => ({
      ...prev,
      references: [...prev.references, { name: "", position: "", company: "", contact: "" }]
    }));
  };

  const removeReference = (index: number) => {
    setCvData(prev => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index)
    }));
  };

  const generateAndDownloadCV = () => {
    // Create a simple HTML CV
    const cvHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${cvData.personalInfo.fullName} - CV</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
          .section { margin-bottom: 25px; }
          .section-title { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px; }
          .experience-item, .education-item, .reference-item { margin-bottom: 15px; }
          .skills-list, .languages-list { display: flex; flex-wrap: wrap; gap: 10px; }
          .skill-tag, .language-tag { background: #f0f0f0; padding: 5px 10px; border-radius: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${cvData.personalInfo.fullName}</h1>
          <p>${cvData.personalInfo.email} | ${cvData.personalInfo.phone}</p>
          <p>${cvData.personalInfo.address}</p>
        </div>
        
        ${cvData.personalInfo.summary ? `
        <div class="section">
          <h2 class="section-title">Professional Summary</h2>
          <p>${cvData.personalInfo.summary}</p>
        </div>
        ` : ''}
        
        <div class="section">
          <h2 class="section-title">Experience</h2>
          ${cvData.experience.map(exp => `
            <div class="experience-item">
              <h3>${exp.jobTitle} - ${exp.company}</h3>
              <p><strong>Duration:</strong> ${exp.duration}</p>
              <p>${exp.description}</p>
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <h2 class="section-title">Education</h2>
          ${cvData.education.map(edu => `
            <div class="education-item">
              <h3>${edu.degree} - ${edu.institution}</h3>
              <p><strong>Year:</strong> ${edu.year}</p>
              <p>${edu.description}</p>
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <h2 class="section-title">Skills</h2>
          <div class="skills-list">
            ${cvData.skills.filter(skill => skill.trim()).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Languages</h2>
          <div class="languages-list">
            ${cvData.languages.filter(lang => lang.trim()).map(lang => `<span class="language-tag">${lang}</span>`).join('')}
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">References</h2>
          ${cvData.references.map(ref => `
            <div class="reference-item">
              <h4>${ref.name}</h4>
              <p>${ref.position} - ${ref.company}</p>
              <p>Contact: ${ref.contact}</p>
            </div>
          `).join('')}
        </div>
      </body>
      </html>
    `;

    // Create and download the file
    const blob = new Blob([cvHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "CV Downloaded Successfully!",
      description: `Your ${selectedTemplate} CV has been generated and downloaded.`,
    });

    setCvDialogOpen(false);
    setShowCvForm(false);
    setSelectedTemplate("");
  };

  const interviewTips = [
    { category: "Preparation", tip: "Research the company thoroughly before your interview" },
    { category: "Appearance", tip: "Dress professionally and arrive 10-15 minutes early" },
    { category: "Communication", tip: "Maintain eye contact and speak clearly" },
    { category: "Questions", tip: "Prepare thoughtful questions about the role and company" },
    { category: "Follow-up", tip: "Send a thank-you email within 24 hours" }
  ];

  const skillsCourses = [
    { title: "Digital Marketing Fundamentals", duration: "4 weeks", level: "Beginner", enrolled: 1250 },
    { title: "Basic Computer Skills", duration: "3 weeks", level: "Beginner", enrolled: 2100 },
    { title: "Customer Service Excellence", duration: "2 weeks", level: "Intermediate", enrolled: 890 },
    { title: "Financial Literacy", duration: "5 weeks", level: "Beginner", enrolled: 1650 },
    { title: "Project Management Basics", duration: "6 weeks", level: "Intermediate", enrolled: 750 }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Briefcase className="h-6 w-6" />
            Job Opportunities
          </CardTitle>
          <CardDescription className="text-orange-600">
            Find local employment opportunities and career resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-orange-700">142</div>
              <div className="text-sm text-orange-600">Active job listings</div>
            </div>
            <Badge className="bg-orange-200 text-orange-800 border-orange-300">
              <TrendingUp className="h-3 w-3 mr-1" />
              Growing
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="font-semibold text-orange-700">45</div>
              <div className="text-sm text-orange-600">Tech Jobs</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-orange-700">38</div>
              <div className="text-sm text-orange-600">Retail</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-orange-700">32</div>
              <div className="text-sm text-orange-600">Healthcare</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-orange-700">27</div>
              <div className="text-sm text-orange-600">Education</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <CardDescription className="text-teal-600 font-medium">
                    {job.company}
                  </CardDescription>
                </div>
                <Badge className={getTypeColor(job.type)}>
                  {job.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{job.posted}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-sm">
                <DollarSign className="h-3 w-3 text-green-600" />
                <span className="font-medium text-green-700">{job.salary}</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                Apply Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Career Resources</CardTitle>
          <CardDescription>
            Tools and resources to help you find the right opportunity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Enhanced CV Builder Dialog */}
            <div className="p-4 bg-teal-50 rounded-lg">
              <h4 className="font-semibold text-teal-800 mb-2">CV Builder</h4>
              <p className="text-sm text-teal-600 mb-3">
                Create a professional CV with our easy-to-use templates
              </p>
              <Dialog open={cvDialogOpen} onOpenChange={setCvDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    Build CV
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      CV Builder
                    </DialogTitle>
                  </DialogHeader>
                  
                  {!showCvForm ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Choose a Template</h3>
                        <RadioGroup value={selectedTemplate} onValueChange={setSelectedTemplate}>
                          <div className="grid grid-cols-2 gap-3">
                            {cvTemplates.map((template, index) => (
                              <div key={index} className="border rounded-lg p-3 hover:border-teal-500 cursor-pointer transition-colors">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value={template.name} id={template.name} />
                                  <Label htmlFor={template.name} className="cursor-pointer flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="font-medium">{template.name}</h4>
                                      <div className="flex">
                                        {Array.from({ length: 5 }, (_, i) => (
                                          <Star key={i} className={`h-3 w-3 ${i < template.popularity ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                        ))}
                                      </div>
                                    </div>
                                    <p className="text-xs text-gray-600">{template.description}</p>
                                  </Label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="flex gap-3">
                        <Button 
                          onClick={() => selectedTemplate && handleTemplateSelect(selectedTemplate)} 
                          className="flex-1"
                          disabled={!selectedTemplate}
                        >
                          Continue with {selectedTemplate}
                        </Button>
                        <Button variant="outline" onClick={() => setCvDialogOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Fill Your CV Information</h3>
                        <Badge variant="outline">{selectedTemplate} Template</Badge>
                      </div>
                      
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-teal-700">Personal Information</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input 
                              id="fullName"
                              value={cvData.personalInfo.fullName}
                              onChange={(e) => setCvData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                              }))}
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input 
                              id="email"
                              type="email"
                              value={cvData.personalInfo.email}
                              onChange={(e) => setCvData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, email: e.target.value }
                              }))}
                              placeholder="john@example.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone *</Label>
                            <Input 
                              id="phone"
                              value={cvData.personalInfo.phone}
                              onChange={(e) => setCvData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, phone: e.target.value }
                              }))}
                              placeholder="+27 xx xxx xxxx"
                            />
                          </div>
                          <div>
                            <Label htmlFor="address">Address</Label>
                            <Input 
                              id="address"
                              value={cvData.personalInfo.address}
                              onChange={(e) => setCvData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, address: e.target.value }
                              }))}
                              placeholder="Cape Town, South Africa"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="summary">Professional Summary</Label>
                          <Textarea 
                            id="summary"
                            value={cvData.personalInfo.summary}
                            onChange={(e) => setCvData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, summary: e.target.value }
                            }))}
                            placeholder="Brief description of your professional background and goals..."
                            rows={3}
                          />
                        </div>
                      </div>

                      {/* Experience */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-teal-700">Work Experience</h4>
                          <Button variant="outline" size="sm" onClick={addExperience}>
                            <Plus className="h-4 w-4 mr-1" />
                            Add Experience
                          </Button>
                        </div>
                        {cvData.experience.map((exp, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <h5 className="font-medium">Experience {index + 1}</h5>
                              {cvData.experience.length > 1 && (
                                <Button variant="outline" size="sm" onClick={() => removeExperience(index)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label>Job Title *</Label>
                                <Input 
                                  value={exp.jobTitle}
                                  onChange={(e) => {
                                    const newExp = [...cvData.experience];
                                    newExp[index].jobTitle = e.target.value;
                                    setCvData(prev => ({ ...prev, experience: newExp }));
                                  }}
                                  placeholder="Software Developer"
                                />
                              </div>
                              <div>
                                <Label>Company *</Label>
                                <Input 
                                  value={exp.company}
                                  onChange={(e) => {
                                    const newExp = [...cvData.experience];
                                    newExp[index].company = e.target.value;
                                    setCvData(prev => ({ ...prev, experience: newExp }));
                                  }}
                                  placeholder="ABC Company"
                                />
                              </div>
                              <div>
                                <Label>Duration *</Label>
                                <Input 
                                  value={exp.duration}
                                  onChange={(e) => {
                                    const newExp = [...cvData.experience];
                                    newExp[index].duration = e.target.value;
                                    setCvData(prev => ({ ...prev, experience: newExp }));
                                  }}
                                  placeholder="Jan 2020 - Present"
                                />
                              </div>
                            </div>
                            <div>
                              <Label>Job Description</Label>
                              <Textarea 
                                value={exp.description}
                                onChange={(e) => {
                                  const newExp = [...cvData.experience];
                                  newExp[index].description = e.target.value;
                                  setCvData(prev => ({ ...prev, experience: newExp }));
                                }}
                                placeholder="Describe your responsibilities and achievements..."
                                rows={3}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Education */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-teal-700">Education</h4>
                          <Button variant="outline" size="sm" onClick={addEducation}>
                            <Plus className="h-4 w-4 mr-1" />
                            Add Education
                          </Button>
                        </div>
                        {cvData.education.map((edu, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <h5 className="font-medium">Education {index + 1}</h5>
                              {cvData.education.length > 1 && (
                                <Button variant="outline" size="sm" onClick={() => removeEducation(index)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label>Degree/Qualification *</Label>
                                <Input 
                                  value={edu.degree}
                                  onChange={(e) => {
                                    const newEdu = [...cvData.education];
                                    newEdu[index].degree = e.target.value;
                                    setCvData(prev => ({ ...prev, education: newEdu }));
                                  }}
                                  placeholder="Bachelor of Science"
                                />
                              </div>
                              <div>
                                <Label>Institution *</Label>
                                <Input 
                                  value={edu.institution}
                                  onChange={(e) => {
                                    const newEdu = [...cvData.education];
                                    newEdu[index].institution = e.target.value;
                                    setCvData(prev => ({ ...prev, education: newEdu }));
                                  }}
                                  placeholder="University of Cape Town"
                                />
                              </div>
                              <div>
                                <Label>Year *</Label>
                                <Input 
                                  value={edu.year}
                                  onChange={(e) => {
                                    const newEdu = [...cvData.education];
                                    newEdu[index].year = e.target.value;
                                    setCvData(prev => ({ ...prev, education: newEdu }));
                                  }}
                                  placeholder="2018"
                                />
                              </div>
                            </div>
                            <div>
                              <Label>Description</Label>
                              <Textarea 
                                value={edu.description}
                                onChange={(e) => {
                                  const newEdu = [...cvData.education];
                                  newEdu[index].description = e.target.value;
                                  setCvData(prev => ({ ...prev, education: newEdu }));
                                }}
                                placeholder="Relevant coursework, achievements, etc..."
                                rows={2}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Skills */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-teal-700">Skills</h4>
                          <Button variant="outline" size="sm" onClick={addSkill}>
                            <Plus className="h-4 w-4 mr-1" />
                            Add Skill
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {cvData.skills.map((skill, index) => (
                            <div key={index} className="flex gap-2">
                              <Input 
                                value={skill}
                                onChange={(e) => {
                                  const newSkills = [...cvData.skills];
                                  newSkills[index] = e.target.value;
                                  setCvData(prev => ({ ...prev, skills: newSkills }));
                                }}
                                placeholder="e.g., JavaScript, Communication"
                              />
                              {cvData.skills.length > 1 && (
                                <Button variant="outline" size="sm" onClick={() => removeSkill(index)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-teal-700">Languages</h4>
                          <Button variant="outline" size="sm" onClick={addLanguage}>
                            <Plus className="h-4 w-4 mr-1" />
                            Add Language
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {cvData.languages.map((language, index) => (
                            <div key={index} className="flex gap-2">
                              <Input 
                                value={language}
                                onChange={(e) => {
                                  const newLanguages = [...cvData.languages];
                                  newLanguages[index] = e.target.value;
                                  setCvData(prev => ({ ...prev, languages: newLanguages }));
                                }}
                                placeholder="e.g., English (Fluent), Afrikaans"
                              />
                              {cvData.languages.length > 1 && (
                                <Button variant="outline" size="sm" onClick={() => removeLanguage(index)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* References */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-teal-700">References</h4>
                          <Button variant="outline" size="sm" onClick={addReference}>
                            <Plus className="h-4 w-4 mr-1" />
                            Add Reference
                          </Button>
                        </div>
                        {cvData.references.map((ref, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <h5 className="font-medium">Reference {index + 1}</h5>
                              {cvData.references.length > 1 && (
                                <Button variant="outline" size="sm" onClick={() => removeReference(index)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label>Full Name</Label>
                                <Input 
                                  value={ref.name}
                                  onChange={(e) => {
                                    const newRefs = [...cvData.references];
                                    newRefs[index].name = e.target.value;
                                    setCvData(prev => ({ ...prev, references: newRefs }));
                                  }}
                                  placeholder="Jane Smith"
                                />
                              </div>
                              <div>
                                <Label>Position</Label>
                                <Input 
                                  value={ref.position}
                                  onChange={(e) => {
                                    const newRefs = [...cvData.references];
                                    newRefs[index].position = e.target.value;
                                    setCvData(prev => ({ ...prev, references: newRefs }));
                                  }}
                                  placeholder="Senior Manager"
                                />
                              </div>
                              <div>
                                <Label>Company</Label>
                                <Input 
                                  value={ref.company}
                                  onChange={(e) => {
                                    const newRefs = [...cvData.references];
                                    newRefs[index].company = e.target.value;
                                    setCvData(prev => ({ ...prev, references: newRefs }));
                                  }}
                                  placeholder="ABC Company"
                                />
                              </div>
                              <div>
                                <Label>Contact Info</Label>
                                <Input 
                                  value={ref.contact}
                                  onChange={(e) => {
                                    const newRefs = [...cvData.references];
                                    newRefs[index].contact = e.target.value;
                                    setCvData(prev => ({ ...prev, references: newRefs }));
                                  }}
                                  placeholder="jane@company.com or +27 xx xxx xxxx"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3 pt-4 border-t">
                        <Button onClick={generateAndDownloadCV} className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Generate & Download CV
                        </Button>
                        <Button variant="outline" onClick={() => setShowCvForm(false)}>
                          Back to Templates
                        </Button>
                        <Button variant="outline" onClick={() => {
                          setCvDialogOpen(false);
                          setShowCvForm(false);
                          setSelectedTemplate("");
                        }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Interview Tips Dialog */}
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Interview Tips</h4>
              <p className="text-sm text-orange-600 mb-3">
                Prepare for your next interview with expert advice
              </p>
              <Dialog open={interviewDialogOpen} onOpenChange={setInterviewDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Interview Success Tips
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-orange-800 mb-2">Essential Interview Tips</h3>
                      <div className="space-y-3">
                        {interviewTips.map((item, index) => (
                          <div key={index} className="flex gap-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <span className="font-medium text-orange-700">{item.category}:</span>
                              <span className="text-gray-700 ml-2">{item.tip}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button onClick={() => setInterviewDialogOpen(false)} className="w-full">
                      Got it!
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Skills Training Dialog */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Skills Training</h4>
              <p className="text-sm text-blue-600 mb-3">
                Free online courses to develop in-demand skills
              </p>
              <Dialog open={skillsDialogOpen} onOpenChange={setSkillsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    Start Learning
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Skills Training Courses
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600 mb-4">
                      Choose from our selection of free courses designed for the South African job market:
                    </div>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {skillsCourses.map((course, index) => (
                        <div key={index} className="border rounded-lg p-3 hover:border-blue-500 cursor-pointer transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{course.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {course.level}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span>📅 {course.duration}</span>
                            <span>👥 {course.enrolled} enrolled</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button className="flex-1" onClick={() => {
                        toast({
                          title: "Course Started!",
                          description: "You've been enrolled in your selected course.",
                        });
                        setSkillsDialogOpen(false);
                      }}>
                        Enroll Now
                      </Button>
                      <Button variant="outline" onClick={() => setSkillsDialogOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobBoard;
