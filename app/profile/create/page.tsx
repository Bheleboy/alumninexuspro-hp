"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Plus, X, CheckCircle } from "lucide-react"
import Link from "next/link"

interface Education {
  school: string
  degree: string
  field: string
  startYear: string
  endYear: string
}

interface Employment {
  company: string
  title: string
  startYear: string
  endYear: string
  current: boolean
}

export default function ProfileCreation() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    role: "",
    linkedinUrl: "",
  })

  const [education, setEducation] = useState<Education[]>([
    { school: "", degree: "", field: "", startYear: "", endYear: "" },
  ])

  const [employment, setEmployment] = useState<Employment[]>([
    { company: "", title: "", startYear: "", endYear: "", current: false },
  ])

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const addEducation = () => {
    setEducation([...education, { school: "", degree: "", field: "", startYear: "", endYear: "" }])
  }

  const removeEducation = (index: number) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index))
    }
  }

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = education.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu))
    setEducation(updated)
  }

  const addEmployment = () => {
    setEmployment([...employment, { company: "", title: "", startYear: "", endYear: "", current: false }])
  }

  const removeEmployment = (index: number) => {
    if (employment.length > 1) {
      setEmployment(employment.filter((_, i) => i !== index))
    }
  }

  const updateEmployment = (index: number, field: keyof Employment, value: string | boolean) => {
    const updated = employment.map((emp, i) => (i === index ? { ...emp, [field]: value } : emp))
    setEmployment(updated)
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    const profileData = {
      ...formData,
      education,
      employment,
      submittedAt: new Date().toISOString(),
    }

    console.log("Profile submitted for verification:", profileData)
    // TODO: Submit to backend for admin verification
    alert("Profile submitted for verification! You'll receive an email when approved.")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-[#002366] mb-2">Personal Information</h2>
              <p className="text-gray-600">Let's start with the basics</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john.doe@university.edu"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
              <Input
                id="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-[#002366] mb-2">Education History</h2>
              <p className="text-gray-600">Add your educational background</p>
            </div>

            {education.map((edu, index) => (
              <Card key={index} className="border-2 border-gray-100">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Education {index + 1}</CardTitle>
                    {education.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>School/University *</Label>
                    <Input
                      value={edu.school}
                      onChange={(e) => updateEducation(index, "school", e.target.value)}
                      placeholder="Stanford University"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Degree *</Label>
                      <Select value={edu.degree} onValueChange={(value) => updateEducation(index, "degree", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select degree" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high_school">High School Diploma</SelectItem>
                          <SelectItem value="associate">Associate's Degree</SelectItem>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Field of Study</Label>
                      <Input
                        value={edu.field}
                        onChange={(e) => updateEducation(index, "field", e.target.value)}
                        placeholder="Computer Science"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Year</Label>
                      <Input
                        value={edu.startYear}
                        onChange={(e) => updateEducation(index, "startYear", e.target.value)}
                        placeholder="2018"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Year</Label>
                      <Input
                        value={edu.endYear}
                        onChange={(e) => updateEducation(index, "endYear", e.target.value)}
                        placeholder="2022"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outline"
              onClick={addEducation}
              className="w-full border-dashed border-2 border-gray-300 hover:border-[#D4AF37]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Education
            </Button>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-[#002366] mb-2">Employment History</h2>
              <p className="text-gray-600">Add your work experience</p>
            </div>

            {employment.map((emp, index) => (
              <Card key={index} className="border-2 border-gray-100">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Employment {index + 1}</CardTitle>
                    {employment.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEmployment(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company *</Label>
                      <Input
                        value={emp.company}
                        onChange={(e) => updateEmployment(index, "company", e.target.value)}
                        placeholder="Google"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Job Title *</Label>
                      <Input
                        value={emp.title}
                        onChange={(e) => updateEmployment(index, "title", e.target.value)}
                        placeholder="Software Engineer"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Year</Label>
                      <Input
                        value={emp.startYear}
                        onChange={(e) => updateEmployment(index, "startYear", e.target.value)}
                        placeholder="2022"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Year</Label>
                      <Input
                        value={emp.endYear}
                        onChange={(e) => updateEmployment(index, "endYear", e.target.value)}
                        placeholder="2024"
                        disabled={emp.current}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`current-${index}`}
                      checked={emp.current}
                      onChange={(e) => updateEmployment(index, "current", e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor={`current-${index}`}>I currently work here</Label>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outline"
              onClick={addEmployment}
              className="w-full border-dashed border-2 border-gray-300 hover:border-[#D4AF37]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Position
            </Button>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-[#002366] mb-2">Select Your Role</h2>
              <p className="text-gray-600">How would you like to be identified on the platform?</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Primary Role *</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Current Student</SelectItem>
                  <SelectItem value="recent_graduate">Recent Graduate (0-2 years)</SelectItem>
                  <SelectItem value="alumni">Alumni (2+ years)</SelectItem>
                  <SelectItem value="corporate_alumni">Corporate Alumni</SelectItem>
                  <SelectItem value="faculty">Faculty/Professor</SelectItem>
                  <SelectItem value="administrator">Administrator</SelectItem>
                  <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                  <SelectItem value="professional">Working Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#002366] mb-2">What happens next?</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Your profile will be reviewed by our verification team</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>We'll verify your education and employment history</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Once approved, your credentials will be logged on the Solana blockchain</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>You'll receive full access to the verified alumni network</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/auth" className="inline-flex items-center text-[#002366] hover:text-[#001a4d]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-serif font-bold text-[#002366]">Create Your Profile</h1>
              <Badge variant="outline" className="text-[#002366] border-[#002366]">
                Step {currentStep} of {totalSteps}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form Content */}
          <Card className="border-2 border-gray-100 shadow-lg">
            <CardContent className="p-8">{renderStep()}</CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="px-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={handleNext} className="bg-[#002366] hover:bg-[#001a4d] px-6">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-[#D4AF37] hover:bg-[#B8941F] text-black px-6">
                Submit for Verification
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
