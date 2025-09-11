import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface IntakeFormData {
  personal: {
    lonelyIsolated: boolean;
    notConfident: boolean;
    managing: {
      anger: boolean;
      stress: boolean;
      time: boolean;
    };
    hardTimeDecisions: boolean;
    sleepingProblems: boolean;
    worryOverthink: boolean;
    moodUnstable: boolean;
    suicidalThoughts: boolean;
    selfHarming: boolean;
    healthProblems: boolean;
    healthProblemsDetails: string;
  };
  interpersonal: {
    mentalDisorder: boolean;
    mentalDisorderDetails: string;
    drugPrescription: string;
    managingInterpersonal: {
      physical: boolean;
      verbal: boolean;
      psychological: boolean;
      emotional: boolean;
      sexual: boolean;
    };
    excessiveEngagement: string;
    cannotStop: string;
    beingBullied: boolean;
    peerPressure: boolean;
    romanticRelationships: boolean;
    difficultyWithOthers: boolean;
    makingFriends: boolean;
    discrimination: boolean;
    discriminationDetails: string;
  };
  family: {
    parentsSeparated: boolean;
    communicationDifficulty: boolean;
    communicationDetails: string;
    parentalExpectations: boolean;
    familyArguments: boolean;
    financialConcerns: boolean;
    familyIllness: boolean;
    noSupport: boolean;
    noTrustRespect: boolean;
    genderPreferenceDifficulty: boolean;
  };
  grief: {
    grieving: boolean;
    grievingDetails: string;
    griefExperiences: string;
  };
  academics: {
    worriedPerformance: boolean;
    fearOfFailing: boolean;
    notMotivated: boolean;
    notMotivatedDetails: string;
    tardiness: boolean;
    difficultyUnderstanding: boolean;
    dislikeCourse: boolean;
    wantToShift: boolean;
    notPersonalChoice: boolean;
  };
  career: {
    // Add career-related fields as needed
  };
  otherProblems: string;
}

const defaultFormData: IntakeFormData = {
  personal: {
    lonelyIsolated: false,
    notConfident: false,
    managing: {
      anger: false,
      stress: false,
      time: false,
    },
    hardTimeDecisions: false,
    sleepingProblems: false,
    worryOverthink: false,
    moodUnstable: false,
    suicidalThoughts: false,
    selfHarming: false,
    healthProblems: false,
    healthProblemsDetails: '',
  },
  interpersonal: {
    mentalDisorder: false,
    mentalDisorderDetails: '',
    drugPrescription: '',
    managingInterpersonal: {
      physical: false,
      verbal: false,
      psychological: false,
      emotional: false,
      sexual: false,
    },
    excessiveEngagement: '',
    cannotStop: '',
    beingBullied: false,
    peerPressure: false,
    romanticRelationships: false,
    difficultyWithOthers: false,
    makingFriends: false,
    discrimination: false,
    discriminationDetails: '',
  },
  family: {
    parentsSeparated: false,
    communicationDifficulty: false,
    communicationDetails: '',
    parentalExpectations: false,
    familyArguments: false,
    financialConcerns: false,
    familyIllness: false,
    noSupport: false,
    noTrustRespect: false,
    genderPreferenceDifficulty: false,
  },
  grief: {
    grieving: false,
    grievingDetails: '',
    griefExperiences: '',
  },
  academics: {
    worriedPerformance: false,
    fearOfFailing: false,
    notMotivated: false,
    notMotivatedDetails: '',
    tardiness: false,
    difficultyUnderstanding: false,
    dislikeCourse: false,
    wantToShift: false,
    notPersonalChoice: false,
  },
  career: {},
  otherProblems: '',
};

export function IntakeForm() {
  const [formData, setFormData] = useState<IntakeFormData>(defaultFormData);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  const handleCheckboxChange = (section: keyof IntakeFormData, field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedCheckboxChange = (section: keyof IntakeFormData, nestedField: string, field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedField]: {
          ...prev[section][nestedField],
          [field]: value
        }
      }
    }));
  };

  const handleInputChange = (section: keyof IntakeFormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const markSectionComplete = (section: string) => {
    setCompletedSections(prev => new Set(prev).add(section));
  };

  const isSectionComplete = (section: string) => completedSections.has(section);

  const handleSubmit = () => {
    console.log('Intake form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="bg-background rounded-lg p-6">
      <h1 className="text-lg font-bold mb-6">Intake Form</h1>
      
      <div className="flex mb-6 overflow-x-auto pb-2">
        {['personal', 'interpersonal', 'family', 'grief', 'academics', 'career', 'other'].map((section, index) => (
          <div key={section} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center mx-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isSectionComplete(section) 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {isSectionComplete(section) ? <CheckCircle size={16} /> : <Circle size={16} />}
              </div>
              <span className="text-xs mt-1 capitalize">{section}</span>
            </div>
            {index < 6 && <div className="w-8 h-0.5 bg-gray-200 mx-1" />}
          </div>
        ))}
      </div>

      <Accordion type="single" collapsible className="w-full">
        {/* Personal Section */}
        <AccordionItem value="personal">
          <AccordionTrigger className="text-m font-semibold cursor-pointer">
            <div className="flex items-center">
              {isSectionComplete('personal') ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 mr-2" />
              )}
              1. Personal
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <div className="space-y-3">
                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.personal.lonelyIsolated}
                    onCheckedChange={(checked) => handleCheckboxChange('personal', 'lonelyIsolated', checked === true)}
                  />
                  <span>I feel lonely and isolated</span>
                </Label>
                
                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.personal.notConfident}
                    onCheckedChange={(checked) => handleCheckboxChange('personal', 'notConfident', checked === true)}
                  />
                  <span>I do not feel confident by myself</span>
                </Label>

                <div>
                  <Label className="block mb-2">I struggle in managing my:</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ml-4">
                    <Label className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.personal.managing.anger}
                        onCheckedChange={(checked) => handleNestedCheckboxChange('personal', 'managing', 'anger', checked === true)}
                      />
                      <span>Anger</span>
                    </Label>
                    <Label className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.personal.managing.stress}
                        onCheckedChange={(checked) => handleNestedCheckboxChange('personal', 'managing', 'stress', checked === true)}
                      />
                      <span>Stress</span>
                    </Label>
                    <Label className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.personal.managing.time}
                        onCheckedChange={(checked) => handleNestedCheckboxChange('personal', 'managing', 'time', checked === true)}
                      />
                      <span>Time</span>
                    </Label>
                  </div>
                </div>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.personal.hardTimeDecisions}
                    onCheckedChange={(checked) => handleCheckboxChange('personal', 'hardTimeDecisions', checked === true)}
                  />
                  <span>I have a hard time making decisions</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.personal.sleepingProblems}
                    onCheckedChange={(checked) => handleCheckboxChange('personal', 'sleepingProblems', checked === true)}
                  />
                  <span>I have a problem in sleeping</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.personal.worryOverthink}
                    onCheckedChange={(checked) => handleCheckboxChange('personal', 'worryOverthink', checked === true)}
                  />
                  <span>I easily get worried or overthink</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.personal.moodUnstable}
                    onCheckedChange={(checked) => handleCheckboxChange('personal', 'moodUnstable', checked === true)}
                  />
                  <span>I have noticed that my mood is not stable</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.personal.suicidalThoughts}
                    onCheckedChange={(checked) => handleCheckboxChange('personal', 'suicidalThoughts', checked === true)}
                  />
                  <span>I think about committing suicide</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.personal.selfHarming}
                    onCheckedChange={(checked) => handleCheckboxChange('personal', 'selfHarming', checked === true)}
                  />
                  <span>I am committing self-harming activities</span>
                </Label>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.personal.healthProblems}
                      onCheckedChange={(checked) => handleCheckboxChange('personal', 'healthProblems', checked === true)}
                    />
                    <span>I am having medical health problems/specific</span>
                  </Label>
                  {formData.personal.healthProblems && (
                    <Input
                      placeholder="Please specify health problems"
                      value={formData.personal.healthProblemsDetails}
                      onChange={(e) => handleInputChange('personal', 'healthProblemsDetails', e.target.value)}
                    />
                  )}
                </div>
              </div>

              <Button onClick={() => markSectionComplete('personal')} className="mt-4">
                Mark as Complete
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Interpersonal Section */}
        <AccordionItem value="interpersonal">
          <AccordionTrigger className="text-m font-semibold cursor-pointer">
            <div className="flex items-center">
              {isSectionComplete('interpersonal') ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 mr-2" />
              )}
              2. Interpersonal
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.interpersonal.mentalDisorder}
                      onCheckedChange={(checked) => handleCheckboxChange('interpersonal', 'mentalDisorder', checked === true)}
                    />
                    <span>I am diagnosed with mental/behavioral disorder</span>
                  </Label>
                  {formData.interpersonal.mentalDisorder && (
                    <Input
                      placeholder="Specify disorder"
                      value={formData.interpersonal.mentalDisorderDetails}
                      onChange={(e) => handleInputChange('interpersonal', 'mentalDisorderDetails', e.target.value)}
                    />
                  )}
                </div>

                {formData.interpersonal.mentalDisorder && (
                  <div className="space-y-2">
                    <Label>My drug prescription is/are:</Label>
                    <Input
                      placeholder="List drug prescriptions"
                      value={formData.interpersonal.drugPrescription}
                      onChange={(e) => handleInputChange('interpersonal', 'drugPrescription', e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <Label className="block mb-2">I struggle in managing my:</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-4">
                    <Label className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.interpersonal.managingInterpersonal.physical}
                        onCheckedChange={(checked) => handleNestedCheckboxChange('interpersonal', 'managingInterpersonal', 'physical', checked === true)}
                      />
                      <span>Physical</span>
                    </Label>
                    <Label className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.interpersonal.managingInterpersonal.verbal}
                        onCheckedChange={(checked) => handleNestedCheckboxChange('interpersonal', 'managingInterpersonal', 'verbal', checked === true)}
                      />
                      <span>Verbal</span>
                    </Label>
                    <Label className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.interpersonal.managingInterpersonal.psychological}
                        onCheckedChange={(checked) => handleNestedCheckboxChange('interpersonal', 'managingInterpersonal', 'psychological', checked === true)}
                      />
                      <span>Psychological</span>
                    </Label>
                    <Label className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.interpersonal.managingInterpersonal.emotional}
                        onCheckedChange={(checked) => handleNestedCheckboxChange('interpersonal', 'managingInterpersonal', 'emotional', checked === true)}
                      />
                      <span>Emotional</span>
                    </Label>
                    <Label className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.interpersonal.managingInterpersonal.sexual}
                        onCheckedChange={(checked) => handleNestedCheckboxChange('interpersonal', 'managingInterpersonal', 'sexual', checked === true)}
                      />
                      <span>Sexual</span>
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>I have too much engagement in:</Label>
                  <Input
                    placeholder="Specify engagements"
                    value={formData.interpersonal.excessiveEngagement}
                    onChange={(e) => handleInputChange('interpersonal', 'excessiveEngagement', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>I cannot stop myself from using/doing:</Label>
                  <Input
                    placeholder="Specify behaviors"
                    value={formData.interpersonal.cannotStop}
                    onChange={(e) => handleInputChange('interpersonal', 'cannotStop', e.target.value)}
                  />
                </div>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.interpersonal.beingBullied}
                    onCheckedChange={(checked) => handleCheckboxChange('interpersonal', 'beingBullied', checked === true)}
                  />
                  <span>I am being bullied</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.interpersonal.peerPressure}
                    onCheckedChange={(checked) => handleCheckboxChange('interpersonal', 'peerPressure', checked === true)}
                  />
                  <span>I cannot handle peer pressure</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.interpersonal.romanticRelationships}
                    onCheckedChange={(checked) => handleCheckboxChange('interpersonal', 'romanticRelationships', checked === true)}
                  />
                  <span>I struggle handling romantic relationship</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.interpersonal.difficultyWithOthers}
                    onCheckedChange={(checked) => handleCheckboxChange('interpersonal', 'difficultyWithOthers', checked === true)}
                  />
                  <span>I have difficulty getting along with others</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.interpersonal.makingFriends}
                    onCheckedChange={(checked) => handleCheckboxChange('interpersonal', 'makingFriends', checked === true)}
                  />
                  <span>I have difficulty in making/developing friendships</span>
                </Label>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.interpersonal.discrimination}
                      onCheckedChange={(checked) => handleCheckboxChange('interpersonal', 'discrimination', checked === true)}
                    />
                    <span>I feel like I am being discriminated by others because of:</span>
                  </Label>
                  {formData.interpersonal.discrimination && (
                    <Input
                      placeholder="Specify reason for discrimination"
                      value={formData.interpersonal.discriminationDetails}
                      onChange={(e) => handleInputChange('interpersonal', 'discriminationDetails', e.target.value)}
                    />
                  )}
                </div>
              </div>

              <Button onClick={() => markSectionComplete('interpersonal')} className="mt-4">
                Mark as Complete
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Family Section */}
        <AccordionItem value="family">
          <AccordionTrigger className="text-m font-semibold cursor-pointer">
            <div className="flex items-center">
              {isSectionComplete('family') ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 mr-2" />
              )}
              3. Family
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <div className="space-y-3">
                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.family.parentsSeparated}
                    onCheckedChange={(checked) => handleCheckboxChange('family', 'parentsSeparated', checked === true)}
                  />
                  <span>My parents got separated</span>
                </Label>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.family.communicationDifficulty}
                      onCheckedChange={(checked) => handleCheckboxChange('family', 'communicationDifficulty', checked === true)}
                    />
                    <span>I have difficulty communicating with my family member/s</span>
                  </Label>
                  {formData.family.communicationDifficulty && (
                    <Input
                      placeholder="Specify which family members"
                      value={formData.family.communicationDetails}
                      onChange={(e) => handleInputChange('family', 'communicationDetails', e.target.value)}
                    />
                  )}
                </div>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.family.parentalExpectations}
                    onCheckedChange={(checked) => handleCheckboxChange('family', 'parentalExpectations', checked === true)}
                  />
                  <span>I have hard time dealing with my parent/guardian's expectations and demands</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.family.familyArguments}
                    onCheckedChange={(checked) => handleCheckboxChange('family', 'familyArguments', checked === true)}
                  />
                  <span>I have experienced frequent arguments / physical violence with a family member/s or relatives</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.family.financialConcerns}
                    onCheckedChange={(checked) => handleCheckboxChange('family', 'financialConcerns', checked === true)}
                  />
                  <span>Our family is having a financial concern</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.family.familyIllness}
                    onCheckedChange={(checked) => handleCheckboxChange('family', 'familyIllness', checked === true)}
                  />
                  <span>I am worried/troubled with a family member's illness</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.family.noSupport}
                    onCheckedChange={(checked) => handleCheckboxChange('family', 'noSupport', checked === true)}
                  />
                  <span>I do not receive emotional / academic support from my parents</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.family.noTrustRespect}
                    onCheckedChange={(checked) => handleCheckboxChange('family', 'noTrustRespect', checked === true)}
                  />
                  <span>I do not feel that I am being trusted / respected by my family member/s</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.family.genderPreferenceDifficulty}
                    onCheckedChange={(checked) => handleCheckboxChange('family', 'genderPreferenceDifficulty', checked === true)}
                  />
                  <span>I have hard time telling my family about my gender preference (Ex, Gay/Lesbian/LGBTQIA+)</span>
                </Label>
              </div>

              <Button onClick={() => markSectionComplete('family')} className="mt-4">
                Mark as Complete
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Grief/Bereavement Section */}
        <AccordionItem value="grief">
          <AccordionTrigger className="text-m font-semibold cursor-pointer">
            <div className="flex items-center">
              {isSectionComplete('grief') ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 mr-2" />
              )}
              4. Grief/Bereavement
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.grief.grieving}
                      onCheckedChange={(checked) => handleCheckboxChange('grief', 'grieving', checked === true)}
                    />
                    <span>I am grieving the death of my:</span>
                  </Label>
                  {formData.grief.grieving && (
                    <Input
                      placeholder="Specify relationship (e.g., parent, friend, etc.)"
                      value={formData.grief.grievingDetails}
                      onChange={(e) => handleInputChange('grief', 'grievingDetails', e.target.value)}
                    />
                  )}
                </div>

                {formData.grief.grieving && (
                  <div className="space-y-2">
                    <Label>Because of the grief / bereavement, I am experiencing:</Label>
                    <Input
                      placeholder="Describe your experiences"
                      value={formData.grief.griefExperiences}
                      onChange={(e) => handleInputChange('grief', 'griefExperiences', e.target.value)}
                    />
                  </div>
                )}
              </div>

              <Button onClick={() => markSectionComplete('grief')} className="mt-4">
                Mark as Complete
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Academics Section */}
        <AccordionItem value="academics">
          <AccordionTrigger className="text-m font-semibold cursor-pointer">
            <div className="flex items-center">
              {isSectionComplete('academics') ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 mr-2" />
              )}
              5. Academics
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <div className="space-y-3">
                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.academics.worriedPerformance}
                    onCheckedChange={(checked) => handleCheckboxChange('academics', 'worriedPerformance', checked === true)}
                  />
                  <span>I am overly worried about my academic performance</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.academics.fearOfFailing}
                    onCheckedChange={(checked) => handleCheckboxChange('academics', 'fearOfFailing', checked === true)}
                  />
                  <span>I have a fear of failing my examination</span>
                </Label>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.academics.notMotivated}
                      onCheckedChange={(checked) => handleCheckboxChange('academics', 'notMotivated', checked === true)}
                    />
                    <span>I am not motivated to study because of:</span>
                  </Label>
                  {formData.academics.notMotivated && (
                    <Input
                      placeholder="Specify reasons"
                      value={formData.academics.notMotivatedDetails}
                      onChange={(e) => handleInputChange('academics', 'notMotivatedDetails', e.target.value)}
                    />
                  )}
                </div>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.academics.tardiness}
                    onCheckedChange={(checked) => handleCheckboxChange('academics', 'tardiness', checked === true)}
                  />
                  <span>I have problem being on time in class</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.academics.difficultyUnderstanding}
                    onCheckedChange={(checked) => handleCheckboxChange('academics', 'difficultyUnderstanding', checked === true)}
                  />
                  <span>I have difficulty in understanding the class lesson/s</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.academics.dislikeCourse}
                    onCheckedChange={(checked) => handleCheckboxChange('academics', 'dislikeCourse', checked === true)}
                  />
                  <span>I do not like my course/program</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.academics.wantToShift}
                    onCheckedChange={(checked) => handleCheckboxChange('academics', 'wantToShift', checked === true)}
                  />
                  <span>I want to shift to another course/program</span>
                </Label>

                <Label className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.academics.notPersonalChoice}
                    onCheckedChange={(checked) => handleCheckboxChange('academics', 'notPersonalChoice', checked === true)}
                  />
                  <span>My course right now is not my personal choice/preference</span>
                </Label>
              </div>

              <Button onClick={() => markSectionComplete('academics')} className="mt-4">
                Mark as Complete
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Career Section */}
        <AccordionItem value="career">
          <AccordionTrigger className="text-m font-semibold cursor-pointer">
            <div className="flex items-center">
              {isSectionComplete('career') ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 mr-2" />
              )}
              6. Career
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">Career-related concerns will be added here.</p>
              <Button onClick={() => markSectionComplete('career')} className="mt-4">
                Mark as Complete
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Other Problems Section */}
        <AccordionItem value="other">
          <AccordionTrigger className="text-m font-semibold cursor-pointer">
            <div className="flex items-center">
              {isSectionComplete('other') ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 mr-2" />
              )}
              7. Other Problems
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <div className="space-y-3">
                <Label>Other problem/s you are experiencing that is not stated on the list above:</Label>
                <Textarea
                  placeholder="Type your message here."
                  value={formData.otherProblems}
                  onChange={(e) => handleInputChange('otherProblems' as any, 'otherProblems', e.target.value)}
                  className="h-32 resize-none"
                />
              </div>

              <Button onClick={() => markSectionComplete('other')} className="mt-4">
                Mark as Complete
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 flex justify-end ">
        <Button onClick={handleSubmit} size="lg" className="cursor-pointer">
          Save
        </Button>
      </div>
    </div>
  );
}